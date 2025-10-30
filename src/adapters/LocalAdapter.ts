import type { DirEntry } from '../types';
import { BaseAdapter } from './Adapter';
import type {
  LocalAdapterConfig,
  FsData,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ArchiveParams,
  SaveParams,
} from './types';

/**
 * Local adapter for handling file operations in the browser's local environment
 * This adapter uses the File System Access API where available
 */
export class LocalAdapter extends BaseAdapter {
  private config: LocalAdapterConfig;

  constructor(config: LocalAdapterConfig) {
    super();
    this.config = config;
  }

  /**
   * List files and folders at a given path
   */
  async list(params?: { path?: string }): Promise<FsData> {
    try {
      // Parse path to extract storage and actual path
      const { path } = this.parsePath(params?.path);

      // In a real local implementation, you would use File System Access API
      // or local storage to list files
      // For now, we'll throw an error indicating this needs to be implemented
      throw new Error(
        'LocalAdapter.list() is not yet implemented. Local file access requires File System Access API or backend proxy.',
      );
    } catch (error) {
      throw new Error(`Failed to list directory: ${(error as Error).message}`);
    }
  }

  /**
   * Delete files/folders
   */
  async delete(params: { items: { path: string; type: string }[] }): Promise<DeleteResult> {
    try {
      this.validateParam(params.items, 'items');

      // Validate that items array is not empty
      if (!Array.isArray(params.items) || params.items.length === 0) {
        throw new Error('At least one item must be provided');
      }

      // In a real local implementation, you would delete files from local storage
      throw new Error('LocalAdapter.delete() is not yet implemented.');
    } catch (error) {
      throw new Error(`Failed to delete files: ${(error as Error).message}`);
    }
  }

  /**
   * Rename a file or folder
   */
  async rename(params: { path: string; name: string }): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');
      this.validateParam(params.name, 'name');
      this.validatePath(params.path);

      throw new Error('LocalAdapter.rename() is not yet implemented.');
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

      throw new Error('LocalAdapter.copy() is not yet implemented.');
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

      throw new Error('LocalAdapter.move() is not yet implemented.');
    } catch (error) {
      throw new Error(`Failed to move files: ${(error as Error).message}`);
    }
  }

  /**
   * Create a zip archive from files/folders
   */
  async archive(params: ArchiveParams): Promise<FileOperationResult> {
    try {
      this.validateParam(params.path, 'path');
      this.validateParam(params.items, 'items');
      this.validateParam(params.name, 'name');

      throw new Error('LocalAdapter.archive() is not yet implemented.');
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

      throw new Error('LocalAdapter.unarchive() is not yet implemented.');
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

      throw new Error('LocalAdapter.createFile() is not yet implemented.');
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

      throw new Error('LocalAdapter.createFolder() is not yet implemented.');
    } catch (error) {
      throw new Error(`Failed to create folder: ${(error as Error).message}`);
    }
  }

  /**
   * Get preview URL for a file
   */
  getPreviewUrl(params: { path: string }): string {
    this.validatePath(params.path);

    // Return a URL that can be used to preview the file locally
    // This would typically use object URLs or File System Access API
    const { path, storage } = this.parsePath(params.path);
    const fullPath = this.combinePath(storage, path);

    // Return empty string as local preview URLs need to be generated dynamically
    return '';
  }

  /**
   * Get file content
   */
  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validatePath(params.path);

    // In a real local implementation, you would read file content
    throw new Error('LocalAdapter.getContent() is not yet implemented.');
  }

  /**
   * Get download URL for a file
   */
  getDownloadUrl(params: { path: string }): string {
    this.validatePath(params.path);

    // Return a URL that can be used to download the file locally
    const { path, storage } = this.parsePath(params.path);
    const fullPath = this.combinePath(storage, path);

    // Return empty string as local download URLs need to be generated dynamically
    return '';
  }

  /**
   * Search files (not implemented for local)
   */
  async search(params: {
    path?: string;
    filter: string;
    deep?: boolean;
    size?: 'all' | 'small' | 'medium' | 'large';
  }): Promise<DirEntry[]> {
    throw new Error('LocalAdapter.search() is not yet implemented.');
  }

  /**
   * Save content to file (not implemented for local)
   */
  async save(params: SaveParams): Promise<string> {
    throw new Error('LocalAdapter.save() is not yet implemented.');
  }
}
