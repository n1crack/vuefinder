import type { Item as ContextMenuItem } from './utils/contextmenu';
import ServiceContainer from './ServiceContainer';
import type { Driver } from './adapters';
import type { ConfigDefaults } from './stores/config';
import type { FeaturesConfig, FeaturesPreset } from './features';

export type App = ReturnType<typeof ServiceContainer>;

export interface VueFinderProps {
  id?: string;
  config?: ConfigDefaults;
  driver?: Driver;
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
  onFileDclick?: (item: DirEntry) => void;
  onFolderDclick?: (item: DirEntry) => void;
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
