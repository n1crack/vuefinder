import type { Component } from "vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceContainer = any;
import type { RequestConfig } from "./utils/ajax";
import type { Item as ContextMenuItem } from "./utils/contextmenu";
import type ServiceContainer from "./ServiceContainer";
import type { Theme } from "./utils/theme";


export type App = ReturnType<typeof ServiceContainer>

export interface VueFinderProps {
  id?: string;
  config?: Record<string, unknown>;
  request: string | RequestConfig;
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
}
