import { atom, computed} from 'nanostores'
import type {DirEntry} from '@/types';
import { useStore } from '@nanostores/vue';

export type SortColumn = 'basename' | 'file_size' | 'last_modified' | 'path' | '';
export type SortOrder = 'asc' | 'desc' | '';

interface SortState {
    active: boolean;
    column: SortColumn;
    order: SortOrder;
}

function compareValues(a: unknown, b: unknown): number {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    const an = Number(a) || 0;
    const bn = Number(b) || 0;
    return an === bn ? 0 : an < bn ? -1 : 1;
}

export const createFilesStore = () => {
    // Create atoms for state
    const currentPath = atom<string>('');
    const storages = atom<string[]>([]);
    const files = atom<DirEntry[]>([]);
    const sort = atom<SortState>({active: false, column: '', order: ''});
    const selectedKeys = atom<Set<string>>(new Set());
    const clipboardItems = atom<{type: 'cut' | 'copy', path: string, items: Set<DirEntry>}>({
        type: 'copy',
        path: '',
        items: new Set(),
    });
    const draggedItem = atom<string | null>(null);
    const selectedCount = atom<number>(0);
    const loading = atom<boolean>(false);

    // Path info (simple and robust)
    const path = computed([currentPath], (currentPathValue) => {
        const raw = (currentPathValue || 'local://').trim();
        const idx = raw.indexOf('://');
        const storage = idx >= 0 ? raw.slice(0, idx) : '';
        const remainder = idx >= 0 ? raw.slice(idx + 3) : raw;
        const segments = remainder.split('/').filter(Boolean);
        let acc = '';
        const breadcrumb = segments.map(seg => {
            acc = acc ? `${acc}/${seg}` : seg;
            return {basename: seg, name: seg, path: storage ? `${storage}://${acc}` : acc, type: 'dir' as const};
        });
        return {storage, breadcrumb, path: raw};
    });

    const sortedFiles = computed([files, sort], (filesValue, sortValue) => {
        const {active, column, order} = sortValue;
        if (!active || !column) return filesValue;
        const direction = order === 'asc' ? 1 : -1;
        return filesValue.slice().sort((a, b) => compareValues(a[column], b[column]) * direction);
    });

    // Selection helpers
    const selectedItems = computed([files, selectedKeys], (filesValue, selectedKeysValue) => {
        if (selectedKeysValue.size === 0) return [];
        return filesValue.filter(f => selectedKeysValue.has(f.path));
    });

    // Actions
    const setPath = (value: string) => {
        currentPath.set(value);
    }

    const setFiles = (newFiles: DirEntry[]) => {
        files.set(newFiles ?? []);
    }

    const setStorages = (newStorages: string[]) => {
        storages.set(newStorages ?? []);
    }

    const setSort = (column: Exclude<SortColumn, ''>, order: Exclude<SortOrder, ''>) => {
        sort.set({active: true, column, order});
    }

    const toggleSort = (column: Exclude<SortColumn, ''>) => {
        const currentSort = sort.get();
        if (currentSort.active && currentSort.column === column) {
            sort.set({
                active: currentSort.order === 'asc',
                column,
                order: 'desc'
            });
        } else {
            sort.set({
                active: true,
                column,
                order: 'asc'
            });
        }
    }

    const clearSort = () => {
        sort.set({active: false, column: '', order: ''});
    }

    const select = (key: string) => {
        const currentKeys = new Set(selectedKeys.get());
        currentKeys.add(key);
        selectedKeys.set(currentKeys);
        selectedCount.set(currentKeys.size);
    }

    const deselect = (key: string) => {
        const currentKeys = new Set(selectedKeys.get());
        currentKeys.delete(key);
        selectedKeys.set(currentKeys);
        selectedCount.set(currentKeys.size);
    }

    const toggleSelect = (key: string) => {
        const currentKeys = new Set(selectedKeys.get());
        if (currentKeys.has(key)) {
            currentKeys.delete(key);
        } else {
            currentKeys.add(key);
        }
        selectedKeys.set(currentKeys);
        selectedCount.set(currentKeys.size);
    }

    const selectAll = () => {
        const allKeys = new Set(files.get().map(f => f.path));
        selectedKeys.set(allKeys);
        selectedCount.set(allKeys.size);
    }

    const clearSelection = () => {
        selectedKeys.set(new Set());
        selectedCount.set(0);
    }

    const setSelection = (keys: string[]) => {
        const newKeys = new Set(keys ?? []);
        selectedKeys.set(newKeys);
        selectedCount.set(newKeys.size);
    }

    const setSelectedCount = (count: number) => {
        selectedCount.set(count);
    }

    const setLoading = (value: boolean) => {
        loading.set(!!value);
    }

    const isLoading = (): boolean => {
        return loading.get();
    }

    const setClipboard = (type: 'cut' | 'copy', items: Set<string>) => {
        const copiedItems = files.get().filter(f => items.has(f.path));
        clipboardItems.set({
            type, 
            path: path.get().path,
            items: new Set(copiedItems)
        });
    }

    // Reactive versions that return computed atoms
    const createIsCut = (key: string) => {
        return computed([clipboardItems], (clipboard) => {
            return clipboard.type === 'cut' && Array.from(clipboard.items).some(f => f.path === key);
        });
    }

    const createIsCopied = (key: string) => {
        return computed([clipboardItems], (clipboard) => {
            return clipboard.type === 'copy' && Array.from(clipboard.items).some(f => f.path === key);
        });
    }

    // helper reactive
    const isCut = (key: string): boolean => {
        const isItemCutStore = createIsCut(key);
        const isItemCut = useStore<boolean>(isItemCutStore);
        return isItemCut.value ?? false;
    }

    const isCopied = (key: string): boolean => {
        const isItemCopiedStore = createIsCopied(key);
        const isItemCopied = useStore<boolean>(isItemCopiedStore);
        return isItemCopied.value ?? false;
    }

    const clearClipboard = () => {
        clipboardItems.set({type: 'copy', path: '', items: new Set()});
    }

    const getClipboard = () => {
        return clipboardItems.get();
    }

    const setDraggedItem = (path: string | null) => {
        draggedItem.set(path);
    }

    const getDraggedItem = () => {
        return draggedItem.get();
    }

    const clearDraggedItem = () => {
        draggedItem.set(null);
    }

    return {
        // Atoms (state)
        files,
        storages,
        currentPath,
        sort,
        selectedKeys,
        selectedCount,
        loading,
        draggedItem,
        clipboardItems,
        
        // Computed values
        path,
        sortedFiles,
        selectedItems,
        
        // Actions
        setPath,
        setFiles,
        setStorages,
        setSort,
        toggleSort,
        clearSort,
        select,
        deselect,
        toggleSelect,
        selectAll,
        clearSelection,
        setSelection,
        setSelectedCount,
        setLoading,
        isLoading,
        setClipboard,
        createIsCut,
        createIsCopied,
        isCut,
        isCopied,
        clearClipboard,
        getClipboard,
        setDraggedItem,
        getDraggedItem,
        clearDraggedItem,
    };
}
 