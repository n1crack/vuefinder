import { QueryClient } from '@tanstack/vue-query';
import type { Adapter, UploadResult, DeleteResult, FileOperationResult, FileContentResult } from './types';
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
export const QueryKeys = {
  list: (path?: string) => ['adapter', 'list', path] as const,
  delete: (paths?: string[]) => ['adapter', 'delete', paths] as const,
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
  private onBeforeOpen?: () => void;
  private onAfterOpen?: (data: FsData) => void;

  constructor(adapter: Adapter, config: Partial<AdapterManagerConfig> = {}) {
    this.adapter = adapter;
    this.onBeforeOpen = config.onBeforeOpen;
    this.onAfterOpen = config.onAfterOpen;

    // Create QueryClient
    this.queryClient = config.queryClient || new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: config.refetchOnWindowFocus ?? false,
          staleTime: config.staleTime ?? 5 * 60 * 1000,
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
      onBeforeOpen: this.onBeforeOpen ?? (() => {}),
      onAfterOpen: this.onAfterOpen ?? (() => {}),
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
    const queryKey = QueryKeys.list(path);
     
    // Use ensureQueryData from TanStack Query
    return await this.queryClient.ensureQueryData({
      queryKey,
      queryFn: () => this.adapter.list({ path }),
      staleTime: this.config.staleTime,
    });
  }

  /**
   * Open a path and optionally update state
   * @param path 
   * @returns 
   */
  async open(path?: string): Promise<FsData> {
    if (this.onBeforeOpen) {
      this.onBeforeOpen();
    }
    const data = await this.list(path);
    
    // Update state if callback is provided
    if (this.onAfterOpen) {
      this.onAfterOpen(data);
    }
    
    return data;
  }

  /**
   * Upload files with optimistic updates
   */
  async upload(params: { path?: string; files: File[] }): Promise<UploadResult> {
    const result = await this.adapter.upload(params);
    
    // Invalidate and refetch list queries
    this.invalidateListQueries();
    
    // Optionally, update the cache optimistically
    const listKey = QueryKeys.list(params.path);
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
  async delete(params: { path: string[] }): Promise<DeleteResult> {
    const result = await this.adapter.delete(params);
    
    // Invalidate and refetch list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Rename a file or folder
   */
  async rename(params: { path: string; newName: string }): Promise<FileOperationResult> {
    const result = await this.adapter.rename(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Copy files to a destination
   */
  async copy(params: { path: string[]; destination: string }): Promise<FileOperationResult> {
    const result = await this.adapter.copy(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Move files to a destination
   */
  async move(params: { path: string[]; destination: string }): Promise<FileOperationResult> {
    const result = await this.adapter.move(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a zip archive
   */
  async zip(params: { path: string[] }): Promise<FileOperationResult> {
    const result = await this.adapter.zip(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Extract files from a zip archive
   */
  async unzip(params: { path: string[] }): Promise<FileOperationResult> {
    const result = await this.adapter.unzip(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a new file
   */
  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    const result = await this.adapter.createFile(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Create a new folder
   */
  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    const result = await this.adapter.createFolder(params);
    
    // Invalidate list queries
    this.invalidateListQueries();
    
    return result;
  }

  /**
   * Get preview URL
   */
  getPreviewUrl(params: { path: string }): string {
    return this.adapter.getPreviewUrl(params);
  }

  /**
   * Get file content (cached)
   */
  async getContent(params: { path: string }): Promise<FileContentResult> {
    const queryKey = ['adapter', 'content', params.path] as const;
    
    // Use ensureQueryData from TanStack Query
    return await this.queryClient.ensureQueryData({
      queryKey,
      queryFn: () => this.adapter.getContent(params),
      staleTime: this.config.staleTime,
    });
  }

  /**
   * Get download URL
   */
  getDownloadUrl(params: { path: string }): string {
    return this.adapter.getDownloadUrl(params);
  }

  /**
   * Invalidate all list queries
   */
  private invalidateListQueries(): void {
    this.queryClient.invalidateQueries({
      queryKey: ['adapter'],
      exact: false,
    });
  }


  /**
   * Clear all cached queries
   */
  clearCache(): void {
    this.queryClient.clear();
  }

}

