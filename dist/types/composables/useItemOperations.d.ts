import type { DirEntry, App, ItemDclickEvent } from '../types';
/**
 * Composable for item operations like opening items
 */
export declare function useItemOperations(app: App): {
    createCancelableEvent: (item: DirEntry) => ItemDclickEvent;
    openItem: (item: DirEntry, onFileDclick?: (event: ItemDclickEvent) => void, onFolderDclick?: (event: ItemDclickEvent) => void) => void;
};
