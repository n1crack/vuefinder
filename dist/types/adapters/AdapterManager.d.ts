import { QueryClient } from '@tanstack/vue-query';
import type { Driver, DeleteResult, FileOperationResult, FileContentResult, DeleteParams, ArchiveParams, SaveParams, RenameParams, TransferParams } from './types';
import type { FsData } from '../types';
/**
 * Configuration for AdapterManager
 */
export interface AdapterManagerConfig {
    /**
     * Query client for TanStack Query
     * If not provided, a default one will be created
     */
    queryClient?: QueryClient;
    /**
     * Whether to enable refetching on window focus
     */
    refetchOnWindowFocus?: boolean;
    /**
     * Default stale time for queries (in milliseconds)
     */
    staleTime?: number;
    /**
     * Default cache time for queries (in milliseconds)
     */
    cacheTime?: number;
    /**
     * Whether to retry failed requests
     */
    retry?: boolean | number;
    /**
     * Callback to update state when data is fetched
     * This allows the adapter to trigger state updates without being coupled to VueFinder
     */
    onBeforeOpen?: () => void;
    onAfterOpen?: (data: FsData) => void;
}
/**
 * Keys for query and mutation caching
 */
export declare const QueryKeys: {
    list: (path?: string) => readonly ["adapter", "list", string | undefined];
    search: (path?: string, filter?: string, deep?: boolean, size?: string) => readonly ["adapter", "search", string | undefined, string | undefined, boolean | undefined, string | undefined];
    delete: (paths?: string[]) => readonly ["adapter", "delete", string[] | undefined];
    rename: () => readonly ["adapter", "rename"];
    copy: () => readonly ["adapter", "copy"];
    move: () => readonly ["adapter", "move"];
    archive: () => readonly ["adapter", "archive"];
    unarchive: () => readonly ["adapter", "unarchive"];
    createFile: () => readonly ["adapter", "createFile"];
    createFolder: () => readonly ["adapter", "createFolder"];
};
/**
 * AdapterManager wraps a Driver with TanStack Query for enhanced functionality
 * including caching, optimistic updates, and error handling.
 */
export declare class AdapterManager {
    private driver;
    private queryClient;
    private config;
    private onBeforeOpen?;
    private onAfterOpen?;
    constructor(adapter: Driver, config?: Partial<AdapterManagerConfig>);
    /**
     * Get the underlying driver instance
     */
    getDriver(): Driver;
    /**
     * Get the query client instance
     */
    getQueryClient(): QueryClient;
    /**
     * List files with caching and automatic refetching
     */
    list(path?: string): Promise<FsData>;
    /**
     * Open a path and optionally update state
     * @param path
     * @returns
     */
    open(path?: string): Promise<FsData>;
    /**
     * Delete files with optimistic updates
     */
    delete(params: DeleteParams): Promise<DeleteResult>;
    /**
     * Rename a file or folder
     */
    rename(params: RenameParams): Promise<FileOperationResult>;
    /**
     * Copy files to a destination
     */
    copy(params: TransferParams): Promise<FileOperationResult>;
    /**
     * Move files to a destination
     */
    move(params: TransferParams): Promise<FileOperationResult>;
    /**
     * Create a zip archive
     */
    archive(params: ArchiveParams): Promise<FileOperationResult>;
    /**
     * Extract files from a zip archive
     */
    unarchive(params: {
        item: string;
        path: string;
    }): Promise<FileOperationResult>;
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
     * Get file content (cached)
     */
    getContent(params: {
        path: string;
    }): Promise<FileContentResult>;
    /**
     * Get preview URL
     */
    getPreviewUrl(params: {
        path: string;
    }): string;
    /**
     * Get download URL
     */
    getDownloadUrl(params: {
        path: string;
    }): string;
    /**
     * Search files (cached per path+filter)
     */
    search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: 'all' | 'small' | 'medium' | 'large';
    }): Promise<import('../types').DirEntry[]>;
    /**
     * Save content to file (and invalidate list cache)
     */
    save(params: SaveParams): Promise<string>;
    /**
     * Invalidate all list queries
     */
    private invalidateListQueries;
    invalidateListQuery(path?: string): void;
    /**
     * Clear all cached queries
     */
    clearCache(): void;
}
