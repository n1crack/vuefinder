import type { DirEntry } from '../types';
export type SortColumn = 'basename' | 'file_size' | 'last_modified' | 'path' | '';
export type SortOrder = 'asc' | 'desc' | '';
export interface SortState {
    active: boolean;
    column: SortColumn;
    order: SortOrder;
}
export interface CurrentPathState {
    storage: string;
    breadcrumb: {
        basename: string;
        name: string;
        path: string;
        type: 'dir' | 'file';
    }[];
    path: string;
}
export interface FilterState {
    kind: 'all' | 'files' | 'folders';
    showHidden: boolean;
}
export declare const createFilesStore: () => {
    files: import("nanostores").PreinitializedWritableAtom<DirEntry[]> & object;
    storages: import("nanostores").PreinitializedWritableAtom<string[]> & object;
    currentPath: import("nanostores").PreinitializedWritableAtom<string> & object;
    sort: import("nanostores").PreinitializedWritableAtom<SortState> & object;
    filter: import("nanostores").PreinitializedWritableAtom<FilterState> & object;
    selectedKeys: import("nanostores").PreinitializedWritableAtom<Set<string>> & object;
    selectedCount: import("nanostores").PreinitializedWritableAtom<number> & object;
    loading: import("nanostores").PreinitializedWritableAtom<boolean> & object;
    draggedItem: import("nanostores").PreinitializedWritableAtom<string | null> & object;
    clipboardItems: import("nanostores").PreinitializedWritableAtom<{
        type: "cut" | "copy";
        path: string;
        items: Set<DirEntry>;
    }> & object;
    path: any;
    sortedFiles: import("nanostores").ReadableAtom<DirEntry[]>;
    selectedItems: import("nanostores").ReadableAtom<DirEntry[]>;
    setPath: (value: string, addToHistory?: boolean) => void;
    setFiles: (newFiles: DirEntry[]) => void;
    setStorages: (newStorages: string[]) => void;
    setSort: (column: Exclude<SortColumn, "">, order: Exclude<SortOrder, "">) => void;
    toggleSort: (column: Exclude<SortColumn, "">) => void;
    clearSort: () => void;
    setFilter: (kind: "all" | "files" | "folders", showHidden: boolean) => void;
    clearFilter: () => void;
    select: (key: string, selectionMode?: "single" | "multiple") => void;
    selectMultiple: (keys: string[], selectionMode?: "single" | "multiple") => void;
    deselect: (key: string) => void;
    toggleSelect: (key: string, selectionMode?: "single" | "multiple") => void;
    selectAll: (selectionMode?: "single" | "multiple", app?: any) => void;
    isSelected: (key: string) => boolean;
    clearSelection: () => void;
    setSelection: (keys: string[]) => void;
    setSelectedCount: (count: number) => void;
    setLoading: (value: boolean) => void;
    isLoading: () => boolean;
    setClipboard: (type: "cut" | "copy", items: Set<string>) => void;
    createIsCut: (key: string) => import("nanostores").ReadableAtom<boolean>;
    createIsCopied: (key: string) => import("nanostores").ReadableAtom<boolean>;
    isCut: (key: string) => boolean;
    isCopied: (key: string) => boolean;
    clearClipboard: () => void;
    getClipboard: () => {
        type: "cut" | "copy";
        path: string;
        items: Set<DirEntry>;
    };
    setDraggedItem: (path: string | null) => void;
    getDraggedItem: () => string | null;
    clearDraggedItem: () => void;
    setReadOnly: (value: boolean) => void;
    getReadOnly: () => boolean;
    isReadOnly: (file: DirEntry) => boolean;
    goBack: () => void;
    goForward: () => void;
    canGoBack: import("nanostores").ReadableAtom<boolean>;
    canGoForward: import("nanostores").ReadableAtom<boolean>;
    navigationHistory: import("nanostores").PreinitializedWritableAtom<string[]> & object;
    historyIndex: import("nanostores").PreinitializedWritableAtom<number> & object;
};
