/**
 * VueFinder Adapters
 *
 * This module provides adapter classes for handling file operations
 * in different environments (local and cloud).
 *
 * @example
 * // Using RemoteDriver
 * import { RemoteDriver } from '@vuefinder/adapters';
 *
 * const adapter = new RemoteDriver({
 *   baseURL: '/api/cloud',
 *   token: 'XYZ',
 *   url: {
 *     list: '/api/files',
 *     upload: '/api/files/upload',
 *     delete: '/api/files/delete',
 *     rename: '/api/files/rename',
 *     archive: '/api/files/archive',
 *     unarchive: '/api/files/unarchive',
 *     createFile: '/api/files/create-file',
 *     createFolder: '/api/files/create-folder',
 *     preview: '/api/files/preview',
 *     download: '/api/files/download'
 *   }
 * });
 *
 * @example
 * // Using LocalDriver (in-memory)
 * import { LocalDriver } from '@vuefinder/adapters';
 *
 * const adapter = new LocalDriver({
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
export { LocalDriver } from './LocalDriver';
export { RemoteDriver } from './RemoteDriver';

// Export adapter manager
export { AdapterManager, QueryKeys } from './AdapterManager';
export type { AdapterManagerConfig } from './AdapterManager';

// Export types
export type {
  Driver,
  LocalAdapterConfig,
  RemoteDriverConfig,
  RemoteDriverUrls,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ListParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  AdapterError,
  FsData,
} from './types';
