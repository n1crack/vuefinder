import type { 
  Adapter,
  UploadResult,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  DeleteParams,
  ArchiveParams,
} from './types';
import type { FsData } from '../types';

/**
 * Base abstract adapter class that provides common functionality
 * for all adapter implementations
 */
export abstract class BaseAdapter implements Adapter {
  /**
   * Validate that required parameters are provided
   */
  protected validateParam(param: unknown, name: string): void {
    if (param === undefined || param === null) {
      throw new Error(`${name} is required`);
    }
  }

  /**
   * Validate that a file path is provided
   */
  protected validatePath(path: string): void {
    if (!path || typeof path !== 'string') {
      throw new Error('Path must be a non-empty string');
    }
  }

  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  protected parsePath(inputPath?: string): { storage?: string; path?: string } {
    if (!inputPath) {
      return {};
    }

    if (inputPath.includes('://')) {
      const [storage, ...pathParts] = inputPath.split('://');
      return { storage, path: pathParts.join('://') };
    }

    return { path: inputPath };
  }

  /**
   * Combine storage and path into a single path string
   */
  protected combinePath(storage?: string, path?: string): string {
    if (storage && path) {
      return `${storage}://${path}`;
    }
    return path || '';
  }

  /**
   * List files and folders at a given path
   */
  abstract list(params?: { path?: string }): Promise<FsData>;

  /**
   * Upload files to a given path
   */
  abstract upload(params: { path?: string; files: File[] }): Promise<UploadResult>;

  /**
   * Delete files/folders
   */
  abstract delete(params: DeleteParams): Promise<DeleteResult>;

  /**
   * Rename a file or folder
   */
  abstract rename(params: { path: string; name: string }): Promise<FileOperationResult>;

  /**
   * Copy files/folders to a destination
   */
  abstract copy(params: { sources: string[]; destination: string }): Promise<FileOperationResult>;

  /**
   * Move files/folders to a destination
   */
  abstract move(params: { sources: string[]; destination: string }): Promise<FileOperationResult>;

  /**
   * Create a zip archive from files/folders
   */
  abstract archive(params: ArchiveParams): Promise<FileOperationResult>;

  /**
   * Extract files from a zip archive
   */
  abstract unarchive(params: { item: string; path: string }): Promise<FileOperationResult>;

  /**
   * Create a new file
   */
  abstract createFile(params: { path: string; name: string }): Promise<FileOperationResult>;

  /**
   * Create a new folder
   */
  abstract createFolder(params: { path: string; name: string }): Promise<FileOperationResult>;

  /**
   * Get preview URL for a file
   */
  abstract getPreviewUrl(params: { path: string }): string;

  /**
   * Get file content
   */
  abstract getContent(params: { path: string }): Promise<FileContentResult>;

  /**
   * Get download URL for a file
   */
  abstract getDownloadUrl(params: { path: string }): string;
}

