import { QueryClient } from '@tanstack/vue-query';
import type { Adapter, UploadResult, DeleteResult, FileOperationResult } from './types';
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
}

/**
 * Keys for query and mutation caching
 */
export const QueryKeys = {
  list: (storage?: string, path?: string) => ['adapter', 'list', storage, path] as const,
  delete: (storage?: string, paths?: string[]) => ['adapter', 'delete', storage, paths] as const,
  upload: () => ['adapter', 'upload'] as const,
  rename: () => ['adapter', 'rename'] as const,
  copy: () => ['adapter', 'copy'] as const,
  move: () => ['adapter', 'move'] as const,
  zip: () => ['adapter', 'zip'] as const,
  unzip: () => ['adapter', 'unzip'] as const,
  createFile: () => ['adapter', 'createFile'] as const,
  createFolder: () => ['adapter', 'createFolder'] as const,
};

/**
 * AdapterManager wraps an Adapter with TanStack Query for enhanced functionality
 * including caching, optimistic updates, and error handling.
 */
export class AdapterManager {
  private adapter: Adapter;
  private queryClient: QueryClient;
  private config: Required<AdapterManagerConfig>;

  constructor(adapter: Adapter, config: Partial<AdapterManagerConfig> = {}) {
    this.adapter = adapter;
    this.queryClient = config.queryClient || new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: config.refetchOnWindowFocus ?? false,
          staleTime: config.staleTime ?? 5 * 60 * 1000, // 5 minutes
          retry: config.retry ?? 2,
        },
        mutations: {
          retry: config.retry ?? 1,
        },
      },
    });

    this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: config.refetchOnWindowFocus ?? false,
      staleTime: config.staleTime ?? 5 * 60 * 1000,
      cacheTime: config.cacheTime ?? 10 * 60 * 1000,
      retry: config.retry ?? 2,
    };
  }

  /**
   * Get the underlying adapter instance
   */
  getAdapter(): Adapter {
    return this.adapter;
  }

  /**
   * Get the query client instance
   */
  getQueryClient(): QueryClient {
    return this.queryClient;
  }

  /**
   * List files with caching and automatic refetching
   */
  async list(path?: string): Promise<FsData> {
    const queryKey = QueryKeys.list(undefined, path);
    
    // Try to get cached data first
    const cachedData = this.queryClient.getQueryData<FsData>(queryKey);
    if (cachedData) {
      return cachedData;
    }

    // Fetch fresh data - only pass path parameter
    const data = await this.adapter.list({ path });
    
    // Cache the result
    this.queryClient.setQueryData(queryKey, data);
    
    return data;
  }

  /**
   * Upload files with optimistic updates
   */
  async upload(params: { storage?: string; path?: string; files: File[] }): Promise<UploadResult> {
    const result = await this.adapter.upload(params);
    
    // Invalidate and refetch list queries
    this.invalidateListQueries();
    
    // Optionally, update the cache optimistically
    const listKey = QueryKeys.list(params.storage, params.path);
    const existingData = this.queryClient.getQueryData<FsData>(listKey);
    
    if (existingData && result.files) {
      const updatedData: FsData = {
        ...existingData,
        files: [...existingData.files, ...result.files],
      };
      this.queryClient.setQueryData(listKey, updatedData);
    } else {
      // Refetch the list
      await this.queryClient.refetchQueries({ queryKey: listKey });
    }
    
    return result;
  }

  /**
   * Delete files with optimistic updates
   */
  async delete(params: { storage?: string; path: string[] }): Promise<DeleteResult> {
    const result = await this.adapter.delete(params);
    
    // Invalidate and refetch list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Rename a file or folder
   */
  async rename(params: { storage?: string; path: string; newName: string }): Promise<FileOperationResult> {
    const result = await this.adapter.rename(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Copy files to a destination
   */
  async copy(params: { storage?: string; path: string[]; destination: string }): Promise<FileOperationResult> {
    const result = await this.adapter.copy(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Move files to a destination
   */
  async move(params: { storage?: string; path: string[]; destination: string }): Promise<FileOperationResult> {
    const result = await this.adapter.move(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a zip archive
   */
  async zip(params: { storage?: string; path: string[] }): Promise<FileOperationResult> {
    const result = await this.adapter.zip(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Extract files from a zip archive
   */
  async unzip(params: { storage?: string; path: string[] }): Promise<FileOperationResult> {
    const result = await this.adapter.unzip(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a new file
   */
  async createFile(params: { storage?: string; path: string; name: string }): Promise<FileOperationResult> {
    const result = await this.adapter.createFile(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a new folder
   */
  async createFolder(params: { storage?: string; path: string; name: string }): Promise<FileOperationResult> {
    const result = await this.adapter.createFolder(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Get preview URL
   */
  getPreviewUrl(params: { storage?: string; path: string }): string {
    return this.adapter.getPreviewUrl(params);
  }

  /**
   * Get download URL
   */
  getDownloadUrl(params: { storage?: string; path: string }): string {
    return this.adapter.getDownloadUrl(params);
  }

  /**
   * Invalidate all list queries
   */
  private invalidateListQueries(): void {
    this.queryClient.invalidateQueries({
      queryKey: ['adapter', 'list'],
      exact: false,
    });
  }

  /**
   * Prefetch list data for better UX
   */
  async prefetchList(path?: string): Promise<void> {
    const queryKey = QueryKeys.list(undefined, path);
    
    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => this.adapter.list({ path }),
    });
  }

  /**
   * Remove specific query from cache
   */
  removeQuery(path?: string): void {
    const queryKey = QueryKeys.list(undefined, path);
    this.queryClient.removeQueries({ queryKey });
  }

  /**
   * Get cached data without refetching
   */
  getCachedList(path?: string): FsData | undefined {
    const queryKey = QueryKeys.list(undefined, path);
    return this.queryClient.getQueryData<FsData>(queryKey);
  }

  /**
   * Set data manually in cache
   */
  setCachedList(data: FsData, path?: string): void {
    const queryKey = QueryKeys.list(undefined, path);
    this.queryClient.setQueryData(queryKey, data);
  }

  /**
   * Clear all cached queries
   */
  clearCache(): void {
    this.queryClient.clear();
  }

}

