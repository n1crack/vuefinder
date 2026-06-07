import type { DirEntry, FsData } from '../types';
export type { FsData };
/**
 * Configuration for IndexedDB Driver
 * Note: The actual IndexedDBDriverConfig is exported from IndexedDBDriver.ts
 */
export interface IndexedDBDriverConfig {
    dbName?: string;
    storage?: string;
    storages?: string[];
    readOnly?: boolean;
    version?: number;
}
/**
 * URL configuration for Cloud Adapter endpoints
 */
export interface RemoteDriverUrls {
    list: string;
    upload: string;
    delete: string;
    rename: string;
    copy: string;
    move: string;
    archive: string;
    unarchive: string;
    createFile: string;
    createFolder: string;
    preview: string;
    download: string;
    search: string;
    save: string;
}
/**
 * Configuration for Cloud Adapter
 */
export interface RemoteDriverConfig {
    baseURL?: string;
    token?: string;
    url?: Partial<RemoteDriverUrls>;
    headers?: Record<string, string>;
}
/**
 * Response from delete operations
 */
export interface DeleteResult extends FileOperationResult {
    deleted?: DirEntry[];
}
/**
 * Response from file operations
 */
export interface FileOperationResult {
    files: DirEntry[];
    storages: string[];
    read_only: boolean;
    dirname: string;
}
/**
 * Parameters for listing files
 */
export interface ListParams {
    path?: string;
    signal?: AbortSignal;
}
/**
 * Parameters for upload operations
 */
export interface UploadParams {
    path: string;
    files: File[];
}
/**
 * Parameters for delete operations
 */
export interface DeleteParams {
    path: string;
    items: {
        path: string;
        type: string;
    }[];
}
/**
 * Parameters for rename operations
 */
export interface RenameParams {
    path: string;
    item: string;
    name: string;
}
/**
 * Parameters for copy/move operations
 */
export interface TransferParams {
    path?: string;
    sources: string[];
    destination: string;
}
/**
 * Parameters for archive operations
 */
export interface ArchiveParams {
    items: {
        path: string;
        type: string;
    }[];
    path: string;
    name: string;
    /**
     * Optional destination folder where the resulting archive should be written.
     * When omitted, the backend writes the archive into `path` (the current folder).
     * Sent forward-compatibly so backends that adopt it can place archives in a
     * user-chosen folder.
     */
    destination?: string;
}
/**
 * Parameters for unarchive operations
 */
export interface UnarchiveParams {
    item: string;
    path: string;
    /**
     * Optional destination folder where the archive contents should be extracted.
     * When omitted, the backend extracts into `path` (the current folder).
     * Sent forward-compatibly so backends that adopt it can extract into a
     * user-chosen folder.
     */
    destination?: string;
}
export interface SearchParams {
    path?: string;
    filter: string;
    deep?: boolean;
    size?: 'all' | 'small' | 'medium' | 'large';
    signal?: AbortSignal;
}
export interface SaveParams {
    path: string;
    content: string;
    signal?: AbortSignal;
}
/**
 * Parameters for getContent operations
 */
export interface GetContentParams {
    path: string;
    signal?: AbortSignal;
}
/**
 * Result from getContent operations
 */
export interface FileContentResult {
    content: string;
    mimeType?: string;
}
/**
 * Uploader context provided to configureUploader
 */
export interface UploaderContext {
    getTargetPath: () => string;
}
/**
 * Driver interface that all drivers must implement
 */
export interface Driver {
    /**
     * Configure the uploader (Uppy instance)
     * This allows adapters to customize upload behavior
     */
    configureUploader?: (uppy: any, context: UploaderContext) => void;
    /**
     * List files and folders at a given path
     */
    list(params?: ListParams): Promise<FsData>;
    /**
     * Delete files/folders
     */
    delete(params: DeleteParams): Promise<DeleteResult>;
    /**
     * Rename a file or folder
     */
    rename(params: RenameParams): Promise<FileOperationResult>;
    /**
     * Copy files/folders to a destination
     */
    copy(params: TransferParams): Promise<FileOperationResult>;
    /**
     * Move files/folders to a destination
     */
    move(params: TransferParams): Promise<FileOperationResult>;
    /**
     * Create a zip archive from files/folders
     */
    archive(params: ArchiveParams): Promise<FileOperationResult>;
    /**
     * Extract files from a zip archive
     */
    unarchive(params: UnarchiveParams): Promise<FileOperationResult>;
    /**
     * Create a new file
     */
    createFile(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    /**
     * Create a new folder
     */
    createFolder(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    /**
     * Get file content
     */
    getContent(params: GetContentParams): Promise<FileContentResult>;
    /**
     * Get preview URL for a file
     */
    getPreviewUrl(params: {
        path: string;
    }): string;
    /**
     * Get download URL for a file
     */
    getDownloadUrl(params: {
        path: string;
    }): string;
    /**
     * Search for files
     */
    search(params: SearchParams): Promise<DirEntry[]>;
    /**
     * Save text/binary content to a file path
     */
    save(params: SaveParams): Promise<string>;
}
/**
 * Backend error response formats that can be received
 */
export interface BackendErrorResponse {
    message?: string;
    error?: string | {
        message?: string;
        code?: string;
    };
    errors?: Array<{
        message?: string;
        field?: string;
    }>;
    detail?: string;
    title?: string;
}
/**
 * Parse backend error response and extract standardized error message
 * Handles various backend error formats and always returns a string message
 */
export declare function parseBackendError(responseText: string | null, statusCode: number, statusText: string): string;
/**
 * Base adapter error class
 */
export declare class AdapterError extends Error {
    code?: string | undefined;
    statusCode?: number | undefined;
    constructor(message: string, code?: string | undefined, statusCode?: number | undefined);
}
