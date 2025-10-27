import type { DirEntry, FsData } from '../types';

// Re-export for convenience
export type { FsData };

/**
 * Configuration for Local Adapter
 */
export interface LocalAdapterConfig {
  root: string;
}

/**
 * URL configuration for Cloud Adapter endpoints
 */
export interface CloudAdapterUrls {
  list: string;
  upload: string;
  delete: string;
  rename: string;
  copy?: string;
  move?: string;
  zip: string;
  unzip: string;
  createFile: string;
  createFolder: string;
  preview: string;
  download: string;
}

/**
 * Configuration for Cloud Adapter
 */
export interface CloudAdapterConfig {
  baseURL: string;
  token?: string;
  url: CloudAdapterUrls;
  headers?: Record<string, string>;
}

/**
 * Result returned by upload operations
 */
export interface UploadResult {
  files: DirEntry[];
}

/**
 * Response from delete operations
 */
export interface DeleteResult {
  deleted: DirEntry[];
}

/**
 * Response from file operations
 */
export interface FileOperationResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

/**
 * Parameters for listing files
 */
export interface ListParams {
  path?: string;
}

/**
 * Parameters for upload operations
 */
export interface UploadParams {
  path?: string;
  files: File[];
}

/**
 * Parameters for delete operations
 */
export interface DeleteParams {
  path: string[];
}

/**
 * Parameters for rename operations
 */
export interface RenameParams {
  path: string;
  newName: string;
}

/**
 * Parameters for copy/move operations
 */
export interface TransferParams {
  path: string[];
  destination: string;
}

/**
 * Parameters for archive operations
 */
export interface ArchiveParams {
  path: string[];
}

/**
 * Result from getContent operations
 */
export interface FileContentResult {
  content: string;
  mimeType?: string;
}

/**
 * Adapter interface that all adapters must implement
 */
export interface Adapter {
  /**
   * List files and folders at a given path
   */
  list(params?: ListParams): Promise<FsData>;

  /**
   * Upload files to a given path
   */
  upload(params: UploadParams): Promise<UploadResult>;

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
  zip(params: ArchiveParams): Promise<FileOperationResult>;

  /**
   * Extract files from a zip archive
   */
  unzip(params: ArchiveParams): Promise<FileOperationResult>;

  /**
   * Create a new file
   */
  createFile(params: { path: string; name: string }): Promise<FileOperationResult>;

  /**
   * Create a new folder
   */
  createFolder(params: { path: string; name: string }): Promise<FileOperationResult>;

  /**
   * Get file content
   */
  getContent(params: { path: string }): Promise<FileContentResult>;

  /**
   * Get preview URL for a file
   */
  getPreviewUrl(params: { path: string }): string;

  /**
   * Get download URL for a file
   */
  getDownloadUrl(params: { path: string }): string;
}

/**
 * Base adapter error class
 */
export class AdapterError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AdapterError';
  }
}

