import type { DefineComponent } from 'vue';

// Component exports
export const VueFinder: DefineComponent;
export const VueFinderProvider: DefineComponent;

// Plugin export
export const VueFinderPlugin: {
  install(app: any, options?: { i18n?: Record<string, unknown>; locale?: string }): void;
};

// Default export
export default VueFinderPlugin;

// Driver classes
export class RemoteDriver {
  constructor(config?: import('./adapters/types').RemoteDriverConfig);
  list(params?: import('./adapters/types').ListParams): Promise<import('./types').FsData>;
  delete(
    params: import('./adapters/types').DeleteParams
  ): Promise<import('./adapters/types').DeleteResult>;
  rename(
    params: import('./adapters/types').RenameParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  copy(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  move(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  archive(
    params: import('./adapters/types').ArchiveParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  unarchive(params: {
    item: string;
    path: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFile(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFolder(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  getContent(params: { path: string }): Promise<import('./adapters/types').FileContentResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  search(params: import('./adapters/types').SearchParams): Promise<import('./types').DirEntry[]>;
  save(params: import('./adapters/types').SaveParams): Promise<string>;
}

export class ArrayDriver {
  constructor(config: import('./adapters/ArrayDriver').ArrayDriverConfig);
  list(params?: import('./adapters/types').ListParams): Promise<import('./types').FsData>;
  delete(
    params: import('./adapters/types').DeleteParams
  ): Promise<import('./adapters/types').DeleteResult>;
  rename(
    params: import('./adapters/types').RenameParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  copy(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  move(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  archive(
    params: import('./adapters/types').ArchiveParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  unarchive(params: {
    item: string;
    path: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFile(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFolder(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  getContent(params: { path: string }): Promise<import('./adapters/types').FileContentResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  search(params: import('./adapters/types').SearchParams): Promise<import('./types').DirEntry[]>;
  save(params: import('./adapters/types').SaveParams): Promise<string>;
}

export class IndexedDBDriver {
  constructor(config?: import('./adapters/types').IndexedDBDriverConfig);
  list(params?: import('./adapters/types').ListParams): Promise<import('./types').FsData>;
  delete(
    params: import('./adapters/types').DeleteParams
  ): Promise<import('./adapters/types').DeleteResult>;
  rename(
    params: import('./adapters/types').RenameParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  copy(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  move(
    params: import('./adapters/types').TransferParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  archive(
    params: import('./adapters/types').ArchiveParams
  ): Promise<import('./adapters/types').FileOperationResult>;
  unarchive(params: {
    item: string;
    path: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFile(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  createFolder(params: {
    path: string;
    name: string;
  }): Promise<import('./adapters/types').FileOperationResult>;
  getContent(params: { path: string }): Promise<import('./adapters/types').FileContentResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  search(params: import('./adapters/types').SearchParams): Promise<import('./types').DirEntry[]>;
  save(params: import('./adapters/types').SaveParams): Promise<string>;
}

// Context menu exports
export const contextMenuItems: import('./utils/contextmenu').Item[];
export const ContextMenuIds: {
  readonly new_folder: 'new_folder';
  readonly selectAll: 'selectAll';
  readonly pinFolder: 'pinFolder';
  readonly unpinFolder: 'unpinFolder';
  readonly delete: 'delete';
  readonly refresh: 'refresh';
  readonly preview: 'preview';
  readonly open: 'open';
  readonly openDir: 'openDir';
  readonly download: 'download';
  readonly download_archive: 'download_archive';
  readonly archive: 'archive';
  readonly unarchive: 'unarchive';
  readonly rename: 'rename';
  readonly move: 'move';
  readonly copy: 'copy';
  readonly paste: 'paste';
};

// Type exports from types.ts
export type {
  DirEntry,
  CancelableDclickEvent,
  VueFinderProps,
  FsData,
  SelectEvent,
  UpdatePathEvent,
} from './types';

// Type exports from adapters/types.ts
export type {
  Driver,
  ListParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  SearchParams,
  SaveParams,
  FileContentResult,
  DeleteResult,
  FileOperationResult,
  RemoteDriverConfig,
  RemoteDriverUrls,
  UploaderContext,
} from './adapters/types';

// Type exports from adapters/ArrayDriver.ts
export type { ArrayDriverConfig } from './adapters/ArrayDriver';

// Type exports from adapters/IndexedDBDriver.ts
export type { IndexedDBDriverConfig } from './adapters/IndexedDBDriver';

// Type exports from features.ts
export type { FeaturesConfig, FeaturesPreset, FeatureName } from './features';

// Type exports from stores/config.ts
export type {
  ConfigStore,
  ConfigState,
  ConfigDefaults,
  PersistenceConfigState,
  NonPersistenceConfigState,
} from './stores/config';

// Type exports from stores/theme.ts
export type { Theme } from './stores/theme';
