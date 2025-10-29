// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type { Item as ContextMenuItem } from "./utils/contextmenu";
import ServiceContainer from "./ServiceContainer";
import type { Theme } from "./stores/theme";
import type { Adapter } from "./adapters";


export type App = ReturnType<typeof ServiceContainer>

export interface VueFinderProps {
  id?: string;
  config?: Record<string, unknown>;
  adapter: Adapter;
  features?: boolean | string[];
  debug?: boolean;
  theme?: Theme;
  locale?: string;
  contextMenuItems?: ContextMenuItem[];
  selectionMode?: "single" | "multiple";
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
  customUploader?: (uppy: any, context: { getTargetPath: () => string; getHeaders: () => Record<string, string>; t: (key: string) => string }) => void;
}

export type SelectEvent = (items: DirEntry[]) => void;
export type UpdatePathEvent = (path: string) => void;

export type DirEntryType = 'file' | 'dir'

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
  filesystem?: string
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
  storage: string;
  storages: string[];
  storage_info: Record<string, StorageInfo>;
  dirname: string;
  files: DirEntry[];
  read_only?: boolean;
}
