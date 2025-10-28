import { BaseAdapter } from './Adapter';
import type {
  CloudAdapterConfig,
  FsData,
  UploadResult,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
} from './types';

/**
 * Cloud adapter for handling file operations via HTTP requests
 * This adapter makes API calls to backend endpoints
 */
export class CloudAdapter extends BaseAdapter {
  private config: CloudAdapterConfig;

  constructor(config: CloudAdapterConfig) {
    super();
    this.config = config;
  }

  /**
   * Get headers with authentication if token is provided
   */
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

  /**
   * Make an HTTP request
   */
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const fullUrl = `${this.config.baseURL}${url}`;
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * List files and folders at a given path
   */
  async list(params?: { path?: string }): Promise<FsData> {
    try {
      const queryParams = new URLSearchParams();
      
      // Path can contain storage info in format "storage://path/to/file"
      if (params?.path) {
        queryParams.append('path', params.path);
      }

      const url = queryParams.toString() 
        ? `${this.config.url.list}?${queryParams.toString()}`
        : this.config.url.list;

      return await this.request<FsData>(url, {
        method: 'GET',
      });
    } catch (error) {
      throw new Error(`Failed to list directory: ${(error as Error).message}`);
    }
  }

  /**
   * Upload files to a given path
   */
  async upload(params: { path?: string; files: File[] }): Promise<UploadResult> {
    try {
      this.validateParam(params.files, 'files');
      
      if (!Array.isArray(params.files) || params.files.length === 0) {
        throw new Error('At least one file must be provided');
      }

      const formData = new FormData();
      
      params.files.forEach((file) => {
        formData.append('files[]', file);
      });

      // Path can contain storage info in format "storage://path/to/file"
      if (params.path) {
        formData.append('path', params.path);
      }

      const response = await fetch(`${this.config.baseURL}${this.config.url.upload}`, {
        method: 'POST',
        body: formData,
        headers: {
          ...this.config.headers,
          ...(this.config.token && { Authorization: `Bearer ${this.config.token}` }),
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to upload files: ${(error as Error).message}`);
    }
  }

  /**
   * Delete files/folders
   */
  async delete(params: { path: string[] }): Promise<DeleteResult> {
    try {
      this.validateParam(params.path, 'path');
      
      if (!Array.isArray(params.path) || params.path.length === 0) {
        throw new Error('At least one path must be provided');
      }

      return await this.request<DeleteResult>(this.config.url.delete, {
        method: 'DELETE',
        body: JSON.stringify({
          paths: params.path,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to delete files: ${(error as Error).message}`);
    }
  }

  /**
   * Rename a file or folder
   */
  async rename(params: { path: string; item: string; name: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');
      this.validateParam(params.item, 'item');
      this.validateParam(params.name, 'name');
      this.validatePath(params.path);

      return await this.request<FileOperationResult>(this.config.url.rename, {
        method: 'PUT',
        body: JSON.stringify({
          path: params.path,
          item: params.item,
          name: params.name,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to rename file: ${(error as Error).message}`);
    }
  }

  /**
   * Copy files/folders to a destination
   */
  async copy(params: { path: string[]; destination: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');
      this.validateParam(params.destination, 'destination');

      return await this.request<FileOperationResult>(this.config.url.copy || this.config.url.upload, {
        method: 'POST',
        body: JSON.stringify({
          paths: params.path,
          destination: params.destination,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to copy files: ${(error as Error).message}`);
    }
  }

  /**
   * Move files/folders to a destination
   */
  async move(params: { path: string[]; destination: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');
      this.validateParam(params.destination, 'destination');

      return await this.request<FileOperationResult>(this.config.url.move || this.config.url.rename, {
        method: 'PUT',
        body: JSON.stringify({
          paths: params.path,
          destination: params.destination,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to move files: ${(error as Error).message}`);
    }
  }

  /**
   * Create a zip archive from files/folders
   */
  async zip(params: { path: string[] }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');

      return await this.request<FileOperationResult>(this.config.url.zip, {
        method: 'POST',
        body: JSON.stringify({
          paths: params.path,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to create archive: ${(error as Error).message}`);
    }
  }

  /**
   * Extract files from a zip archive
   */
  async unzip(params: { path: string[] }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');

      return await this.request<FileOperationResult>(this.config.url.unzip, {
        method: 'POST',
        body: JSON.stringify({
          paths: params.path,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to extract archive: ${(error as Error).message}`);
    }
  }

  /**
   * Create a new file
   */
  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.name, 'name');
      this.validateParam(params.path, 'path');

      return await this.request<FileOperationResult>(this.config.url.createFile, {
        method: 'POST',
        body: JSON.stringify({
          path: params.path,
          name: params.name,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to create file: ${(error as Error).message}`);
    }
  }

  /**
   * Create a new folder
   */
  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.name, 'name');
      this.validateParam(params.path, 'path');

      return await this.request<FileOperationResult>(this.config.url.createFolder, {
        method: 'POST',
        body: JSON.stringify({
          path: params.path,
          name: params.name,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to create folder: ${(error as Error).message}`);
    }
  }

  /**
   * Get preview URL for a file
   */
  getPreviewUrl(params: { path: string }): string {
    this.validatePath(params.path);
    
    const queryParams = new URLSearchParams({ path: params.path });

    return `${this.config.baseURL}${this.config.url.preview}?${queryParams.toString()}`;
  }

  /**
   * Get file content
   */
  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validatePath(params.path);
    
    const queryParams = new URLSearchParams({ path: params.path });
    const url = `${this.config.baseURL}${this.config.url.preview}?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get content: ${response.statusText}`);
    }
    
    const content = await response.text();
    
    return {
      content,
      mimeType: response.headers.get('Content-Type') || undefined,
    };
  }

  /**
   * Get download URL for a file
   */
  getDownloadUrl(params: { path: string }): string {
    this.validatePath(params.path);
    
    const queryParams = new URLSearchParams({ path: params.path });

    return `${this.config.baseURL}${this.config.url.download}?${queryParams.toString()}`;
  }
}

