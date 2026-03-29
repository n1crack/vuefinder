import { type Ref } from 'vue';
import type { StoreValue } from 'nanostores';
import type { DirEntry, App } from '../types';
import type SelectionAraa from '@viselect/vanilla';
/**
 * Composable for handling item events (click, double-click, context menu)
 */
export declare function useItemEvents(app: App, explorerId: string, sortedFiles: StoreValue<DirEntry[]>, selectedKeys: StoreValue<Set<string>>, selectionObject: Ref<SelectionAraa | null>, onFileDclick?: (event: any) => void, onFolderDclick?: (event: any) => void): {
    handleItemClick: (event: Event | MouseEvent | TouchEvent) => void;
    handleItemDblClick: (event: MouseEvent | TouchEvent) => void;
    handleItemContextMenu: (event: MouseEvent | TouchEvent) => void;
    handleContentContextMenu: (event: MouseEvent | TouchEvent) => void;
    getSelectedItems: () => DirEntry[];
};
