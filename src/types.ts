import type { Ref } from 'vue';
import type { Item as ContextMenuItem } from './utils/contextmenu';
import ServiceContainer from './ServiceContainer';
import type { Driver } from './adapters';
import type { ConfigDefaults } from './stores/config';
import type { FeaturesConfig, FeaturesPreset } from './features';

export type App = ReturnType<typeof ServiceContainer>;

export interface VueFinderProps {
  id: string;
  driver: Driver;
  config?: ConfigDefaults;
  features?: FeaturesPreset | FeaturesConfig;
  debug?: boolean;
  locale?: string;
  contextMenuItems?: ContextMenuItem[];
  selectionMode?: 'single' | 'multiple';
  selectionFilterType?: 'files' | 'dirs' | 'both';
  selectionFilterMimeIncludes?: string[];
  /**
   * Columns shown after the Name column in the list view.
   * Accepts the built-in `'size'` and `'date'` columns and custom column definitions.
   * When omitted, the default Size and Date columns are shown.
   */
  listColumns?: ListColumnDef[];
  onError?: (error: any) => void;
  onSelect?: SelectEvent;
  onPathChange?: UpdatePathEvent;
  onUploadComplete?: (files: DirEntry[]) => void;
  onDeleteComplete?: (deletedItems: DirEntry[]) => void;
  onNotify?: NotifyEvent;
  onReady?: () => void;
  /**
   * Handler for file double-click events
   * Receives a cancelable event object. Call event.preventDefault() to prevent default behavior.
   * @param event - Cancelable event object containing the file item
   */
  onFileDclick?: (event: ItemDclickEvent) => void;
  /**
   * Handler for folder double-click events
   * Receives a cancelable event object. Call event.preventDefault() to prevent default behavior.
   * @param event - Cancelable event object containing the folder item
   */
  onFolderDclick?: (event: ItemDclickEvent) => void;
  /**
   * Custom uploader configuration (optional)
   * If provided, will override adapter's configureUploader
   */
  customUploader?: (
    uppy: any,
    context: {
      getTargetPath: () => string;
    }
  ) => void;
}

/** Columns that ship with VueFinder and can be referenced by name in `listColumns`. */
export type BuiltinListColumn = 'size' | 'date';

/** Custom column for the list view. */
export interface ListColumn {
  /** Unique column id. Also passed to the `list-cell` slot. */
  key: string;
  /** Header text. It is passed through the translation function, so locale keys work too. */
  label: string;
  /** Returns the cell text for an entry. `null` and `undefined` render an empty cell. */
  value: (item: DirEntry) => string | number | boolean | null | undefined;
  /** Makes the header clickable to sort by this column. */
  sortable?: boolean;
  /** Value used for sorting. Defaults to `value`. Numbers sort numerically, strings case-insensitively. */
  sortValue?: (item: DirEntry) => string | number | null | undefined;
  /** CSS grid track size of the column, e.g. `'120px'` or `'minmax(0, 1fr)'`. Defaults to `'8rem'`. */
  width?: string;
  /** Text alignment of the header and cells. Defaults to `'left'`. */
  align?: 'left' | 'center' | 'right';
}

export type ListColumnDef = BuiltinListColumn | ListColumn;

export type SelectEvent = (items: DirEntry[]) => void;
export type UpdatePathEvent = (path: string) => void;
export type NotifyEvent = (notification: NotifyPayload) => void;

export interface NotifyPayload {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface VueFinderComposable {
  refresh: () => Promise<void>;
  open: (path: string) => Promise<void>;
  preview: (path: string) => void;
  notify: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
  getPath: () => string;
  /** Reactive current directory path. Updates as the user navigates. */
  path: Readonly<Ref<string>>;
  select: (paths: string[]) => void;
  selectOne: (path: string) => void;
  clearSelection: () => void;
  getSelectedPaths: () => string[];
  createFolder: (name: string, path?: string) => Promise<void>;
  createFile: (name: string, path?: string) => Promise<void>;
  delete: (paths: string[], path?: string) => Promise<void>;
  rename: (itemPath: string, newName: string, path?: string) => Promise<void>;
  copy: (sources: string[], destination: string, path?: string) => Promise<void>;
  move: (sources: string[], destination: string, path?: string) => Promise<void>;
  getFiles: () => DirEntry[];
  getStorages: () => string[];
  isLoading: () => boolean;
  isReadOnly: () => boolean;
}

/**
 * Double-click event object carrying the clicked item
 * Allows handlers to prevent default behavior by calling preventDefault()
 */
export interface ItemDclickEvent {
  /** The file or folder that was double-clicked */
  item: DirEntry;
  /** Whether the default behavior was prevented */
  defaultPrevented: boolean;
  /** Prevents the default behavior from executing */
  preventDefault(): void;
}

export type DirEntryType = 'file' | 'dir';

export interface DirEntry {
  dir: string;
  basename: string;
  extension: string;
  path: string;
  storage: string;
  type: DirEntryType;
  file_size: number | null;
  last_modified: number | null;
  mime_type: string | null;
  read_only?: boolean;
  visibility: string;
  previewUrl?: string;
  thumbnailUrl?: string;
}

export interface StorageInfo {
  filesystem?: string;
}

export interface PinnedFolder {
  path: string;
  storage: string;
  basename: string;
  type: 'dir';
}

export interface TreeViewFolder {
  storage: string;
  path: string;
  basename: string;
  type: 'dir';
}

export interface TreeViewData {
  path: string;
  folders: TreeViewFolder[];
}

export interface FsData {
  storages: string[];
  dirname: string;
  files: DirEntry[];
  read_only?: boolean;
}

export interface MenuItem {
  id?: string;
  label?: string;
  type?: 'separator';
  items?: MenuItem[];
  action?: () => void;
  enabled?: () => boolean;
  hidden?: () => boolean;
  checked?: () => boolean;
}

// Re-export feature types for convenience
export type { FeatureName, FeaturesConfig, FeaturesPreset } from './features';
