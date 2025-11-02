import { atom, computed, type StoreValue } from 'nanostores';
import type { DirEntry } from '../types';
import { useStore } from '@nanostores/vue';

export type SortColumn = 'basename' | 'file_size' | 'last_modified' | 'path' | '';
export type SortOrder = 'asc' | 'desc' | '';

export interface SortState {
  active: boolean;
  column: SortColumn;
  order: SortOrder;
}

export interface CurrentPathState {
  storage: string;
  breadcrumb: { basename: string; name: string; path: string; type: 'dir' | 'file' }[];
  path: string;
}

export interface FilterState {
  kind: 'all' | 'files' | 'folders';
  showHidden: boolean;
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
  const read_only = atom<boolean>(false);
  const files = atom<DirEntry[]>([]);
  const sort = atom<SortState>({ active: false, column: '', order: '' });
  const filter = atom<FilterState>({
    kind: 'all',
    showHidden: false,
  });
  const selectedKeys = atom<Set<string>>(new Set());
  const clipboardItems = atom<{ type: 'cut' | 'copy'; path: string; items: Set<DirEntry> }>({
    type: 'copy',
    path: '',
    items: new Set(),
  });
  const draggedItem = atom<string | null>(null);
  const selectedCount = atom<number>(0);
  const loading = atom<boolean>(false);

  // Navigation history
  const navigationHistory = atom<string[]>([]);
  const historyIndex = atom<number>(-1);

  // Path info (simple and robust)
  const path: StoreValue<CurrentPathState> = computed([currentPath], (currentPathValue) => {
    const raw = (currentPathValue ?? '').trim();
    const idx = raw.indexOf('://');
    const storage = idx >= 0 ? raw.slice(0, idx) : '';
    const remainder = idx >= 0 ? raw.slice(idx + 3) : raw;
    const segments = remainder.split('/').filter(Boolean);
    let acc = '';
    const breadcrumb = segments.map((seg) => {
      acc = acc ? `${acc}/${seg}` : seg;
      return {
        basename: seg,
        name: seg,
        path: storage ? `${storage}://${acc}` : acc,
        type: 'dir' as const,
      };
    });
    return { storage, breadcrumb, path: raw };
  });

  const sortedFiles = computed([files, sort, filter], (filesValue, sortValue, filterValue) => {
    let filteredFiles = filesValue;

    // Apply type filter
    if (filterValue.kind === 'files') {
      filteredFiles = filteredFiles.filter((f) => f.type === 'file');
    } else if (filterValue.kind === 'folders') {
      filteredFiles = filteredFiles.filter((f) => f.type === 'dir');
    }

    // Apply hidden files filter
    if (!filterValue.showHidden) {
      filteredFiles = filteredFiles.filter((f) => !f.basename.startsWith('.'));
    }

    // Apply sorting
    const { active, column, order } = sortValue;
    if (!active || !column) return filteredFiles;
    const direction = order === 'asc' ? 1 : -1;
    return filteredFiles.slice().sort((a, b) => compareValues(a[column], b[column]) * direction);
  });

  // Selection helpers
  const selectedItems = computed([files, selectedKeys], (filesValue, selectedKeysValue) => {
    if (selectedKeysValue.size === 0) return [];
    return filesValue.filter((f) => selectedKeysValue.has(f.path));
  });

  // Actions
  const setPath = (value: string, addToHistory?: boolean) => {
    const currentValue = currentPath.get();

    if ((addToHistory ?? true) && currentValue !== value) {
      const history = navigationHistory.get();
      const index = historyIndex.get();

      // Remove any forward history if we're not at the end
      if (index < history.length - 1) {
        history.splice(index + 1);
      }

      // If this is the first navigation, add current path to history
      if (history.length === 0 && currentValue) {
        history.push(currentValue);
      }

      // Add new path to history
      history.push(value);

      navigationHistory.set([...history]);
      historyIndex.set(history.length - 1);
    }

    currentPath.set(value);
  };

  const setFiles = (newFiles: DirEntry[]) => {
    files.set(newFiles ?? []);
  };

  const setStorages = (newStorages: string[]) => {
    storages.set(newStorages ?? []);
  };

  const setSort = (column: Exclude<SortColumn, ''>, order: Exclude<SortOrder, ''>) => {
    sort.set({ active: true, column, order });
  };

  const toggleSort = (column: Exclude<SortColumn, ''>) => {
    const currentSort = sort.get();
    if (currentSort.active && currentSort.column === column) {
      sort.set({
        active: currentSort.order === 'asc',
        column,
        order: 'desc',
      });
    } else {
      sort.set({
        active: true,
        column,
        order: 'asc',
      });
    }
  };

  const clearSort = () => {
    sort.set({ active: false, column: '', order: '' });
  };

  const setFilter = (kind: 'all' | 'files' | 'folders', showHidden: boolean) => {
    filter.set({ kind, showHidden });
  };

  const clearFilter = () => {
    filter.set({ kind: 'all', showHidden: false });
  };

  const select = (key: string, selectionMode: 'single' | 'multiple' = 'multiple') => {
    const currentKeys = new Set(selectedKeys.get());

    // In single selection mode, clear existing selection before adding new one
    if (selectionMode === 'single') {
      currentKeys.clear();
    }

    currentKeys.add(key);
    selectedKeys.set(currentKeys);
    selectedCount.set(currentKeys.size);
  };

  const deselect = (key: string) => {
    const currentKeys = new Set(selectedKeys.get());
    currentKeys.delete(key);
    selectedKeys.set(currentKeys);
    selectedCount.set(currentKeys.size);
  };

  const isSelected = (key: string) => {
    return selectedKeys.get().has(key);
  };

  const toggleSelect = (key: string, selectionMode: 'single' | 'multiple' = 'multiple') => {
    const currentKeys = new Set(selectedKeys.get());

    if (currentKeys.has(key)) {
      currentKeys.delete(key);
    } else {
      // In single selection mode, clear existing selection before adding new one
      if (selectionMode === 'single') {
        currentKeys.clear();
      }
      currentKeys.add(key);
    }
    selectedKeys.set(currentKeys);
    selectedCount.set(currentKeys.size);
  };

  const selectAll = (selectionMode: 'single' | 'multiple' = 'multiple', app?: any) => {
    // In single selection mode, selectAll should only select the first item
    if (selectionMode === 'single') {
      const firstFile = files.get()[0];
      if (firstFile) {
        const firstKey = firstFile.path;
        selectedKeys.set(new Set([firstKey]));
        selectedCount.set(1);
      }
    } else {
      // Apply selection filters if available
      if (
        app?.selectionFilterType ||
        (app?.selectionFilterMimeIncludes && app.selectionFilterMimeIncludes.length > 0)
      ) {
        const selectableKeys = files
          .get()
          .filter((file) => {
            const filterType = app.selectionFilterType;
            const allowedMimes = app.selectionFilterMimeIncludes;

            // Check type filter
            if (filterType === 'files' && file.type === 'dir') return false;
            if (filterType === 'dirs' && file.type === 'file') return false;

            // Check MIME filter - only apply to files, not directories
            if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
              // If it's a directory, MIME filters don't apply - it's always selectable
              if (file.type === 'dir') {
                // Directory is always selectable when MIME filters are active
              } else {
                // For files, check MIME type
                if (!file.mime_type) return false; // No MIME type means not selectable when MIME filters are active
                return allowedMimes.some((prefix: string) => file.mime_type?.startsWith(prefix));
              }
            }

            return true;
          })
          .map((f) => f.path);

        selectedKeys.set(new Set(selectableKeys));
        selectedCount.set(selectableKeys.length);
      } else {
        // No filters, select all
        const allKeys = new Set(files.get().map((f) => f.path));
        selectedKeys.set(allKeys);
        selectedCount.set(allKeys.size);
      }
    }
  };

  const clearSelection = () => {
    selectedKeys.set(new Set());
    selectedCount.set(0);
  };

  const setSelection = (keys: string[]) => {
    const newKeys = new Set(keys ?? []);
    selectedKeys.set(newKeys);
    selectedCount.set(newKeys.size);
  };

  const setSelectedCount = (count: number) => {
    selectedCount.set(count);
  };

  const setLoading = (value: boolean) => {
    loading.set(!!value);
  };

  const isLoading = (): boolean => {
    return loading.get();
  };

  const setClipboard = (type: 'cut' | 'copy', items: Set<string>) => {
    const copiedItems = files.get().filter((f) => items.has(f.path));
    clipboardItems.set({
      type,
      path: path.get().path,
      items: new Set(copiedItems),
    });
  };

  // Reactive versions that return computed atoms
  const createIsCut = (key: string) => {
    return computed([clipboardItems], (clipboard) => {
      return clipboard.type === 'cut' && Array.from(clipboard.items).some((f) => f.path === key);
    });
  };

  const createIsCopied = (key: string) => {
    return computed([clipboardItems], (clipboard) => {
      return clipboard.type === 'copy' && Array.from(clipboard.items).some((f) => f.path === key);
    });
  };

  // helper reactive
  const isCut = (key: string): boolean => {
    const isItemCutStore = createIsCut(key);
    const isItemCut: StoreValue<boolean> = useStore(isItemCutStore);
    return isItemCut.value ?? false;
  };

  const isCopied = (key: string): boolean => {
    const isItemCopiedStore = createIsCopied(key);
    const isItemCopied: StoreValue<boolean> = useStore(isItemCopiedStore);
    return isItemCopied.value ?? false;
  };

  const clearClipboard = () => {
    clipboardItems.set({ type: 'copy', path: '', items: new Set() });
  };

  const getClipboard = () => {
    return clipboardItems.get();
  };

  const setDraggedItem = (path: string | null) => {
    draggedItem.set(path);
  };

  const getDraggedItem = () => {
    return draggedItem.get();
  };

  const clearDraggedItem = () => {
    draggedItem.set(null);
  };

  // Navigation functions
  const goBack = () => {
    const history = navigationHistory.get();
    const index = historyIndex.get();

    if (index > 0) {
      const newIndex = index - 1;
      const newPath = history[newIndex];
      if (newPath) {
        historyIndex.set(newIndex);
        setPath(newPath, false); // Don't add to history when navigating
      }
    }
  };

  const goForward = () => {
    const history = navigationHistory.get();
    const index = historyIndex.get();

    if (index < history.length - 1) {
      const newIndex = index + 1;
      const newPath = history[newIndex];
      if (newPath) {
        historyIndex.set(newIndex);
        setPath(newPath, false); // Don't add to history when navigating
      }
    }
  };

  const canGoBack = computed([historyIndex], (index) => index > 0);
  const canGoForward = computed(
    [navigationHistory, historyIndex],
    (history, index) => index < history.length - 1
  );

  const setReadOnly = (value: boolean) => {
    read_only.set(value);
  };

  const getReadOnly = () => {
    return read_only.get();
  };

  const isReadOnly = (file: DirEntry) => {
    // Check if the current path is read-only
    const currentPathReadOnly = read_only.get();
    if (currentPathReadOnly) {
      return true;
    }

    // Check if the specific file/folder is read-only
    return file.read_only ?? false;
  };

  return {
    // Atoms (state)
    files,
    storages,
    currentPath,
    sort,
    filter,
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
    setFilter,
    clearFilter,
    select,
    deselect,
    toggleSelect,
    selectAll,
    isSelected,
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
    setReadOnly,
    getReadOnly,
    isReadOnly,

    // Navigation
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    navigationHistory,
    historyIndex,
  };
};
