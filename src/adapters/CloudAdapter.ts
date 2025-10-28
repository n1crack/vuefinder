import {BaseAdapter} from './Adapter';
import XHR from '@uppy/xhr-upload';
import type {
    CloudAdapterConfig,
    FsData,
    UploadResult,
    DeleteResult,
    FileOperationResult,
    FileContentResult,
    DeleteParams,
    ArchiveParams,
    SaveParams,
    UploaderContext,
} from './types';
import type Uppy from '@uppy/core';
import type {Meta, UppyFile} from '@uppy/core';

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
     * Configure the uploader (Uppy instance)
     */
    configureUploader(uppy: Uppy, context: UploaderContext) {
        const uploaderHeaders = this.getHeaders();
        delete uploaderHeaders['Content-Type'];

        uppy.use(XHR, {
            endpoint: `${this.config.baseURL}${this.config.url.upload}`,
            fieldName: 'file',
            bundle: false,
            headers: uploaderHeaders,
        });

        // Set file metadata on upload
        uppy.on('upload', () => {
            const targetPath = context.getTargetPath();
            uppy.getFiles().forEach((file: UppyFile<Meta, Record<string, never>>) => {
                uppy.setFileMeta(file.id, {path: targetPath});
            });
        });
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
            // Try JSON first, then fallback to text for backend plain responses
            try {
                const error = await response.json();
                throw new Error((error && (error.message || error.error)) || `HTTP ${response.status}: ${response.statusText}`);
            } catch {
                const text = await response.text();
                throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
            }
        }

        // Parse by content-type; fallback to text if not JSON
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return await response.json();
        }
        // @ts-expect-error allow text responses to pass through when caller doesn't use the value
        return await response.text();
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
                    ...(this.config.token && {Authorization: `Bearer ${this.config.token}`}),
                },
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({message: 'Unknown error'}));
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
    async delete(params: DeleteParams): Promise<DeleteResult> {
        try {
            this.validateParam(params.items, 'items');
            this.validateParam(params.path, 'path');

            return await this.request<DeleteResult>(this.config.url.delete, {
                method: 'DELETE',
                body: JSON.stringify({
                    path: params.path,
                    items: params.items,
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
                method: 'POST',
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
    async copy(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
        try {
            this.validateParam(params.sources, 'sources');
            this.validateParam(params.destination, 'destination');

            return await this.request<FileOperationResult>(this.config.url.copy, {
                method: 'POST',
                body: JSON.stringify({
                    sources: params.sources,
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
    async move(params: { sources: string[]; destination: string }): Promise<FileOperationResult> {
        try {
            this.validateParam(params.sources, 'sources');
            this.validateParam(params.destination, 'destination');

            return await this.request<FileOperationResult>(this.config.url.move, {
                method: 'POST',
                body: JSON.stringify({
                    sources: params.sources,
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
    async archive(params: ArchiveParams): Promise<FileOperationResult> {
        try {
            this.validateParam(params.items, 'items');
            this.validateParam(params.name, 'name');
            this.validateParam(params.path, 'path');

            return await this.request<FileOperationResult>(this.config.url.archive, {
                method: 'POST',
                body: JSON.stringify({
                    items: params.items,
                    path: params.path,
                    name: params.name,
                }),
            });
        } catch (error) {
            throw new Error(`Failed to create archive: ${(error as Error).message}`);
        }
    }

    /**
     * Extract files from a zip archive
     */
    async unarchive(params: { item: string; path: string }): Promise<FileOperationResult> {
        try {
            this.validateParam(params.item, 'item');
            this.validateParam(params.path, 'path');

            return await this.request<FileOperationResult>(this.config.url.unarchive, {
                method: 'POST',
                body: JSON.stringify({
                    item: params.item,
                    path: params.path,
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

        const queryParams = new URLSearchParams({path: params.path});

        return `${this.config.baseURL}${this.config.url.preview}?${queryParams.toString()}`;
    }

    /**
     * Get file content
     */
    async getContent(params: { path: string }): Promise<FileContentResult> {
        this.validatePath(params.path);

        const queryParams = new URLSearchParams({path: params.path});
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

        const queryParams = new URLSearchParams({path: params.path});

        return `${this.config.baseURL}${this.config.url.download}?${queryParams.toString()}`;
    }

    /**
     * Search files (GET with query params)
     */
    async search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: 'all' | 'small' | 'medium' | 'large'
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

    /**
     * Save content to file
     */
    async save(params: SaveParams): Promise<string> {
        this.validateParam(params.path, 'path');

        return await this.request(this.config.url.save, {
            method: 'POST',
            body: JSON.stringify({path: params.path, content: params.content}),
            headers: this.getHeaders(),
        });
    }
}

