/**
 * VueFinder Adapters
 * 
 * This module provides adapter classes for handling file operations
 * in different environments (local and cloud).
 * 
 * @example
 * // Using CloudAdapter
 * import { CloudAdapter } from '@vuefinder/adapters';
 * 
 * const adapter = new CloudAdapter({
 *   baseURL: '/api/cloud',
 *   token: 'XYZ',
 *   url: {
 *     list: '/api/files',
 *     upload: '/api/files/upload',
 *     delete: '/api/files/delete',
 *     rename: '/api/files/rename',
 *     zip: '/api/files/zip',
 *     unzip: '/api/files/unzip',
 *     createFile: '/api/files/create-file',
 *     createFolder: '/api/files/create-folder',
 *     preview: '/api/files/preview',
 *     download: '/api/files/download'
 *   }
 * });
 * 
 * @example
 * // Using LocalAdapter
 * import { LocalAdapter } from '@vuefinder/adapters';
 * 
 * const adapter = new LocalAdapter({
 *   root: '/my-files'
 * });
 * 
 * @example
 * // Creating a custom adapter
 * import { BaseAdapter } from '@vuefinder/adapters';
 * 
 * class MyCustomAdapter extends BaseAdapter {
 *   async list(params) {
 *     // Your custom implementation
 *   }
 *   // ... implement other required methods
 * }
 */

// Export base classes
export { BaseAdapter } from './Adapter';

// Export adapter implementations
export { LocalAdapter } from './LocalAdapter';
export { CloudAdapter } from './CloudAdapter';

// Export adapter manager
export { AdapterManager, QueryKeys } from './AdapterManager';
export type { AdapterManagerConfig } from './AdapterManager';

// Export types
export type {
  Adapter,
  LocalAdapterConfig,
  CloudAdapterConfig,
  CloudAdapterUrls,
  UploadResult,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ListParams,
  UploadParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  AdapterError,
  FsData,
} from './types';

