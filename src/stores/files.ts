import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { DirEntry } from '@/types';

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

export const useFilesStore = defineStore('files', () => {
  const currentPath = ref<string>('');
  const storages = ref<string[]>([]);
  const files = ref<DirEntry[]>([]);
  const sort = ref<SortState>({ active: false, column: '', order: '' });
  const selectedKeys = ref<Set<string>>(new Set());

  // Path info (simple and robust)
  const path = computed(() => {
    const raw = (currentPath.value || '').trim();
    const idx = raw.indexOf('://');
    const storage = idx >= 0 ? raw.slice(0, idx) : '';
    const remainder = idx >= 0 ? raw.slice(idx + 3) : raw;
    const segments = remainder.split('/').filter(Boolean);
    let acc = '';
    const breadcrumb = segments.map(seg => {
      acc = acc ? `${acc}/${seg}` : seg;
      return { basename: seg, name: seg, path: storage ? `${storage}://${acc}` : acc, type: 'dir' as const };
    });
    return { storage, breadcrumb, path: raw };
  });

  const sortedFiles = computed<DirEntry[]>(() => {
    const { active, column, order } = sort.value;
    if (!active || !column) return files.value;
    const direction = order === 'asc' ? 1 : -1;
    return files.value.slice().sort((a, b) => {
      let av: unknown;
      let bv: unknown;
      switch (column) {
        case 'basename':
          av = a.basename; bv = b.basename; break;
        case 'file_size':
          av = a.file_size ?? 0; bv = b.file_size ?? 0; break;
        case 'last_modified':
          av = a.last_modified ?? 0; bv = b.last_modified ?? 0; break;
        case 'path':
          av = a.path; bv = b.path; break;
        default:
          av = 0; bv = 0;
      }
      return compareValues(av, bv) * direction;
    });
  });

  const setPath = (value: string) => {
    currentPath.value = value;
  }

  function setFiles(newFiles: DirEntry[]) {
    files.value = newFiles ?? [];
  }
  
  function setStorages(newStorages: string[]) {
    storages.value = newStorages ?? [];
  }

  function setSort(column: Exclude<SortColumn, ''>, order: Exclude<SortOrder, ''>) {
    sort.value.active = true;
    sort.value.column = column;
    sort.value.order = order;
  }

  function toggleSort(column: Exclude<SortColumn, ''>) {
    if (sort.value.active && sort.value.column === column) {
      sort.value.active = sort.value.order === 'asc';
      sort.value.column = column;
      sort.value.order = 'desc';
    } else {
      sort.value.active = true;
      sort.value.column = column;
      sort.value.order = 'asc';
    }
  }

  function clearSort() {
    sort.value = { active: false, column: '', order: '' };
  }

  // Selection helpers
  const selectedItems = computed<DirEntry[]>(() => {
    if (selectedKeys.value.size === 0) return [];
    const keys = selectedKeys.value;
    return files.value.filter(f => keys.has(f.path));
  });

  const selectedCount = computed<number>(() => selectedKeys.value.size);

  function select(key: string) {
    selectedKeys.value.add(key);
  }

  function deselect(key: string) {
    selectedKeys.value.delete(key);
  }

  function toggleSelect(key: string) {
    if (selectedKeys.value.has(key)) {
      selectedKeys.value.delete(key);
    } else {
      selectedKeys.value.add(key);
    }
  }

  function clearSelection() {
    selectedKeys.value.clear();
  }

  function setSelection(keys: string[]) {
    selectedKeys.value = new Set(keys ?? []);
  }

  return {
    // State
    files,
    storages,
    path,
    sort, // sort state
    selectedKeys, // selected keys
    // Computed
    sortedFiles, // filtered and sorted files
    selectedItems, // selected items
    selectedCount, // count of selected items
    // Mutations
    setPath, // set the current path
    setFiles, // set the files
    setStorages, // set the storages
    setSort, // set the sort
    toggleSort, // toggle the sort
    clearSort, // clear the sort
    select, // select an item
    deselect, // deselect an item
    toggleSelect, // toggle the selection of an item
    clearSelection, // clear the selection
    setSelection, // set the selection
  };
});


