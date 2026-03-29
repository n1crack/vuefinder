import { BaseAdapter } from './Adapter';
import type { RemoteDriverConfig, FsData, DeleteResult, FileOperationResult, FileContentResult, DeleteParams, ArchiveParams, SaveParams, UploaderContext } from './types';
import type Uppy from '@uppy/core';
/**
 * Remote driver for handling file operations via HTTP requests
 * This driver makes API calls to backend endpoints
 */
export declare class RemoteDriver extends BaseAdapter {
    private config;
    /**
     * Default URL endpoints
     */
    private static readonly DEFAULT_URLS;
    constructor(config: RemoteDriverConfig);
    /**
     * Set or update the base URL for API requests
     */
    setBaseURL(baseURL?: string): void;
    /**
     * Set or update the authentication token
     * Pass undefined to remove the token
     */
    setToken(token?: string): void;
    configureUploader(uppy: Uppy, context: UploaderContext): void;
    private getHeaders;
    private request;
    list(params?: {
        path?: string;
    }): Promise<FsData>;
    delete(params: DeleteParams): Promise<DeleteResult>;
    rename(params: {
        path: string;
        item: string;
        name: string;
    }): Promise<FileOperationResult>;
    copy(params: {
        path?: string;
        sources: string[];
        destination: string;
    }): Promise<FileOperationResult>;
    move(params: {
        path?: string;
        sources: string[];
        destination: string;
    }): Promise<FileOperationResult>;
    archive(params: ArchiveParams): Promise<FileOperationResult>;
    unarchive(params: {
        item: string;
        path: string;
    }): Promise<FileOperationResult>;
    createFile(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    createFolder(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    getPreviewUrl(params: {
        path: string;
    }): string;
    getContent(params: {
        path: string;
    }): Promise<FileContentResult>;
    getDownloadUrl(params: {
        path: string;
    }): string;
    search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: 'all' | 'small' | 'medium' | 'large';
    }): Promise<import('../types').DirEntry[]>;
    save(params: SaveParams): Promise<string>;
}
