import { BaseAdapter } from './Adapter';
import XHR from '@uppy/xhr-upload';
import type {
  RemoteDriverConfig,
  RemoteDriverUrls,
  FsData,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  DeleteParams,
  ArchiveParams,
  SaveParams,
  UploaderContext,
} from './types';
import { parseBackendError } from './types';
import type Uppy from '@uppy/core';

/**
 * Remote driver for handling file operations via HTTP requests
 * This driver makes API calls to backend endpoints
 */
export class RemoteDriver extends BaseAdapter {
  private config: RemoteDriverConfig & { url: RemoteDriverUrls; baseURL: string };

  /**
   * Default URL endpoints
   */
  private static readonly DEFAULT_URLS: RemoteDriverUrls = {
    list: '',
    upload: '/upload',
    delete: '/delete',
    rename: '/rename',
    copy: '/copy',
    move: '/move',
    archive: '/archive',
    unarchive: '/unarchive',
    createFile: '/create-file',
    createFolder: '/create-folder',
    preview: '/preview',
    download: '/download',
    search: '/search',
    save: '/save',
  };

  constructor(config: RemoteDriverConfig) {
    super();

    // Merge user-provided URLs with defaults
    const mergedUrls: RemoteDriverUrls = {
      ...RemoteDriver.DEFAULT_URLS,
      ...(config.url || {}),
    };

    this.config = {
      ...config,
      baseURL: config.baseURL || '',
      url: mergedUrls,
    };
  }

  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(baseURL?: string): void {
    this.config.baseURL = baseURL || '';
  }

  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(token?: string): void {
    this.config.token = token;
  }

  configureUploader(uppy: Uppy, context: UploaderContext) {
    const uploaderHeaders = this.getHeaders();
    delete uploaderHeaders['Content-Type'];

    uppy.use(XHR, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: 'file',
      bundle: false,
      headers: uploaderHeaders,
      formData: true,
    });

    uppy.on('upload', () => {
      const targetPath = context.getTargetPath();
      type FileWithId = { id: string };
      const filesWithId = uppy.getFiles() as FileWithId[];
      filesWithId.forEach((file) => {
        uppy.setFileMeta(file.id, { path: targetPath });
      });
    });
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
    };
    if (this.config.token) {
      headers['Authorization'] = `Bearer ${this.config.token}`;
    }
    return headers;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });
    if (!response.ok) {
      const text = await response.text();
      const errorMessage = parseBackendError(text, response.status, response.statusText);
      throw new Error(errorMessage);
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    // @ts-expect-error allow text responses
    return await response.text();
  }

  async list(params?: { path?: string }): Promise<FsData> {
    const queryParams = new URLSearchParams();
    if (params?.path) queryParams.append('path', params.path);
    const url = queryParams.toString()
      ? `${this.config.url.list}?${queryParams.toString()}`
      : this.config.url.list;
    return await this.request<FsData>(url, { method: 'GET' });
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    this.validateParam(params.items, 'items');
    this.validateParam(params.path, 'path');
    return await this.request<DeleteResult>(this.config.url.delete, {
      method: 'POST',
      body: JSON.stringify({ path: params.path, items: params.items }),
    });
  }

  async rename(params: { path: string; item: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.item, 'item');
    this.validateParam(params.name, 'name');
    this.validatePath(params.path);
    return await this.request<FileOperationResult>(this.config.url.rename, {
      method: 'POST',
      body: JSON.stringify({ path: params.path, item: params.item, name: params.name }),
    });
  }

  async copy(params: {
    path: string;
    sources: string[];
    destination: string;
  }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    this.validatePath(params.path);
    return await this.request<FileOperationResult>(this.config.url.copy, {
      method: 'POST',
      body: JSON.stringify({
        sources: params.sources,
        destination: params.destination,
        path: params.path,
      }),
    });
  }

  async move(params: {
    path: string;
    sources: string[];
    destination: string;
  }): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');
    this.validatePath(params.path);
    return await this.request<FileOperationResult>(this.config.url.move, {
      method: 'POST',
      body: JSON.stringify({
        sources: params.sources,
        destination: params.destination,
        path: params.path,
      }),
    });
  }

  async archive(params: ArchiveParams): Promise<FileOperationResult> {
    this.validateParam(params.items, 'items');
    this.validateParam(params.name, 'name');
    this.validateParam(params.path, 'path');
    return await this.request<FileOperationResult>(this.config.url.archive, {
      method: 'POST',
      body: JSON.stringify({ items: params.items, path: params.path, name: params.name }),
    });
  }

  async unarchive(params: { item: string; path: string }): Promise<FileOperationResult> {
    this.validateParam(params.item, 'item');
    this.validateParam(params.path, 'path');
    return await this.request<FileOperationResult>(this.config.url.unarchive, {
      method: 'POST',
      body: JSON.stringify({ item: params.item, path: params.path }),
    });
  }

  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.name, 'name');
    this.validateParam(params.path, 'path');
    return await this.request<FileOperationResult>(this.config.url.createFile, {
      method: 'POST',
      body: JSON.stringify({ path: params.path, name: params.name }),
    });
  }

  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.name, 'name');
    this.validateParam(params.path, 'path');
    return await this.request<FileOperationResult>(this.config.url.createFolder, {
      method: 'POST',
      body: JSON.stringify({ path: params.path, name: params.name }),
    });
  }

  getPreviewUrl(params: { path: string }): string {
    this.validatePath(params.path);
    const queryParams = new URLSearchParams({ path: params.path });
    return `${this.config.baseURL}${this.config.url.preview}?${queryParams.toString()}`;
  }

  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validatePath(params.path);
    const queryParams = new URLSearchParams({ path: params.path });
    const url = `${this.config.baseURL}${this.config.url.preview}?${queryParams.toString()}`;
    const response = await fetch(url, { headers: this.getHeaders() });
    if (!response.ok) {
      const text = await response.text();
      const errorMessage = parseBackendError(text, response.status, response.statusText);
      throw new Error(errorMessage);
    }
    const content = await response.text();
    return { content, mimeType: response.headers.get('Content-Type') || undefined };
  }

  getDownloadUrl(params: { path: string }): string {
    this.validatePath(params.path);
    const queryParams = new URLSearchParams({ path: params.path });
    return `${this.config.baseURL}${this.config.url.download}?${queryParams.toString()}`;
  }

  async search(params: {
    path?: string;
    filter: string;
    deep?: boolean;
    size?: 'all' | 'small' | 'medium' | 'large';
  }): Promise<import('../types').DirEntry[]> {
    const base = this.config.url.search;
    const query = new URLSearchParams();
    if (params.path) query.set('path', params.path);
    if (params.filter) query.set('filter', params.filter);
    if (params.deep) query.set('deep', '1');
    if (params.size && params.size !== 'all') query.set('size', params.size);
    const url = query.toString() ? `${base}?${query.toString()}` : base;
    const data = await this.request<{ files: import('../types').DirEntry[] }>(url, {
      method: 'GET',
    });
    return data.files || [];
  }

  async save(params: SaveParams): Promise<string> {
    this.validateParam(params.path, 'path');
    return await this.request(this.config.url.save, {
      method: 'POST',
      body: JSON.stringify({ path: params.path, content: params.content }),
      headers: this.getHeaders(),
    });
  }
}
