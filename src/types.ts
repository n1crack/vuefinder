import type { Component } from "vue";
// Using value-less import type to avoid bundler resolution for SFC type
import type VueFinder from "./components/VueFinder.vue"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceContainer = any;
import type { RequestConfig } from "./utils/ajax";
import type { Item as ContextMenuItem } from "./utils/contextmenu";

export type App = ReturnType<any>

export interface VueFinderProps {
  id?: string;
  request: string | RequestConfig;
  persist?: boolean;
  path?: string;
  features?: boolean | string[];
  debug?: boolean;
  theme?: "system" | "light" | "dark";
  locale?: string;
  maxHeight?: string;
  maxFileSize?: string;
  fullScreen?: boolean;
  showTreeView?: boolean;
  pinnedFolders?: string[];
  showThumbnails?: boolean;
  selectButton?: SelectButton;
  loadingIndicator?: "circular" | "linear";
  contextMenuItems?: ContextMenuItem[];
  onError?: (error: any) => void;
  onSelect?: SelectEvent;
  'onUpdate:path'?: UpdatePathEvent;
  icon?: CustomIcon
}

export type SelectEvent = (items: DirEntry[]) => void;
export type UpdatePathEvent = (path: string) => void;
export type CustomIcon = (app: App, item: DirEntry) => {is: string | Component, props?: any} | undefined;

export type DirEntryType = 'file' | 'dir'

export interface DirEntry {
  basename: string;
  extension: string;
  path: string;
  storage: string;
  type: DirEntryType;
  file_size: number | null;
  last_modified: number | null;
  mime_type: string | null;
  visibility: string;
}

export type SelectButton = {
  /**
   * show select button
   */
  active: boolean;
  /**
   * allow multiple selection
   */
  multiple: boolean;
  /**
   * handle click event
   */
  click: (items: DirEntry[], event: any) => void;
};

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
  adapter: string;
  path: string;
  basename: string;
  type: 'dir';
}

export interface TreeViewData {
  path: string;
  folders: TreeViewFolder[];
}

export interface FsData {
  adapter: string;
  storages: string[];
  storage_info: Record<string, StorageInfo>;
  dirname: string;
  files: DirEntry[];
}
