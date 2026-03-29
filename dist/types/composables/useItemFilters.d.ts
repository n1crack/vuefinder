import type { DirEntry, App } from '../types';
/**
 * Composable for checking if an item is selectable based on filters
 */
export declare function useItemFilters(app: App): {
    isItemSelectable: (item: DirEntry | undefined) => {
        typeAllowed: boolean;
        mimeAllowed: boolean;
    };
    canSelectItem: (item: DirEntry | undefined) => boolean;
};
