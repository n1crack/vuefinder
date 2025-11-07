import type { DirEntry, FsData } from '../types';

// Re-export for convenience
export type { FsData };

/**
 * Configuration for IndexedDB Driver
 * Note: The actual IndexedDBDriverConfig is exported from IndexedDBDriver.ts
 */
export interface IndexedDBDriverConfig {
  dbName?: string;
  storage?: string;
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
export interface DeleteResult {
  deleted: DirEntry[];
}

/**
 * Response from file operations
 */
export interface FileOperationResult {
  files: DirEntry[];
  storages: Storage[];
  read_only: boolean;
  dirname: string;
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
  path: string;
  files: File[];
}

/**
 * Parameters for delete operations
 */
export interface DeleteParams {
  path: string;
  items: { path: string; type: string }[];
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
  sources: string[];
  destination: string;
}

/**
 * Parameters for archive operations
 */
export interface ArchiveParams {
  items: { path: string; type: string }[];
  path: string;
  name: string;
}

export interface SearchParams {
  path?: string;
  filter: string;
  deep?: boolean;
  size?: 'all' | 'small' | 'medium' | 'large';
}

export interface SaveParams {
  path: string; // full file path including storage
  content: string;
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
  unarchive(params: { item: string; path: string }): Promise<FileOperationResult>;

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
  error?: string | { message?: string; code?: string };
  errors?: Array<{ message?: string; field?: string }>;
  detail?: string;
  title?: string;
}

/**
 * Parse backend error response and extract standardized error message
 * Handles various backend error formats and always returns a string message
 */
export function parseBackendError(
  responseText: string | null,
  statusCode: number,
  statusText: string
): string {
  // Default fallback message
  const defaultMessage = `HTTP ${statusCode}: ${statusText}`;

  if (!responseText) {
    return defaultMessage;
  }

  // Try to parse as JSON
  try {
    const error: BackendErrorResponse = JSON.parse(responseText);

    // Check for direct message field
    if (error.message) {
      return error.message;
    }

    // Check for error field (can be string or object)
    if (error.error) {
      if (typeof error.error === 'string') {
        return error.error;
      }
      if (error.error.message) {
        return error.error.message;
      }
    }

    // Check for errors array (validation errors)
    if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      const messages = error.errors.map((e) => e.message).filter((m): m is string => !!m);
      if (messages.length > 0) {
        return messages.join(', ');
      }
    }

    // Check for other common fields
    if (error.detail) {
      return error.detail;
    }
    if (error.title) {
      return error.title;
    }

    // If JSON but no recognized fields, return the text
    return responseText;
  } catch {
    // Not JSON, return as plain text
    return responseText || defaultMessage;
  }
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
