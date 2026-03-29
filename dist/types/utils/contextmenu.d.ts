import type { App, DirEntry } from '../types';
export declare const ContextMenuIds: {
    readonly new_folder: "new_folder";
    readonly selectAll: "selectAll";
    readonly pinFolder: "pinFolder";
    readonly unpinFolder: "unpinFolder";
    readonly delete: "delete";
    readonly refresh: "refresh";
    readonly preview: "preview";
    readonly open: "open";
    readonly openDir: "openDir";
    readonly download: "download";
    readonly download_archive: "download_archive";
    readonly archive: "archive";
    readonly unarchive: "unarchive";
    readonly rename: "rename";
    readonly move: "move";
    readonly copy: "copy";
    readonly paste: "paste";
};
export type MenuContext = {
    searchQuery: string;
    items: DirEntry[];
    target: DirEntry | null;
};
export type Item = {
    id: string;
    title: (i18n: App['i18n']) => string;
    action: (app: App, selectedItems: DirEntry[]) => void;
    link?: (app: App, selectedItems: DirEntry[]) => void;
    show: (app: App, ctx: MenuContext) => boolean;
    order?: number;
};
export declare const menuItems: Item[];
