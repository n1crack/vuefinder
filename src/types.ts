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
  onError?: (error: any) => void;
  onSelect?: SelectEvent;
  onPathChange?: UpdatePathEvent;
  onUploadComplete?: (files: DirEntry[]) => void;
  onDeleteComplete?: (deletedItems: DirEntry[]) => void;
  onReady?: () => void;
  /**
   * Handler for file double-click events
   * Receives a cancelable event object. Call event.preventDefault() to prevent default behavior.
   * @param event - Cancelable event object containing the file item
   */
  onFileDclick?: (event: CancelableDclickEvent) => void;
  /**
   * Handler for folder double-click events
   * Receives a cancelable event object. Call event.preventDefault() to prevent default behavior.
   * @param event - Cancelable event object containing the folder item
   */
  onFolderDclick?: (event: CancelableDclickEvent) => void;
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

export type SelectEvent = (items: DirEntry[]) => void;
export type UpdatePathEvent = (path: string) => void;

/**
 * Cancelable event object for double-click events
 * Allows handlers to prevent default behavior by calling preventDefault()
 */
export interface CancelableDclickEvent {
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

// Re-export feature types for convenience
export type { FeatureName, FeaturesConfig, FeaturesPreset } from './features';
