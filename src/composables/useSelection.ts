import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import { useApp } from '../composables/useApp';
import SelectionArea, { type AreaLocation, type SelectionEvent } from '@viselect/vanilla';
import type { DirEntry } from '../types';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';

export interface UseSelectionDeps<T> {
  itemsPerRow: Ref<number>;
  getItemPosition: (itemIndex: number) => { row: number; col: number };
  getItemsInRange: <U>(
    items: U[],
    minRow: number,
    maxRow: number,
    minCol: number,
    maxCol: number
  ) => U[];
  getKey: (item: T) => string;
  selectionObject: Ref<SelectionArea | null>;
  rowHeight: Ref<number>;
  itemWidth: number;
  osInstance?: Ref<ReturnType<typeof import('overlayscrollbars').OverlayScrollbars> | null>;
}

export function useSelection<T>(deps: UseSelectionDeps<T>) {
  const {
    itemsPerRow,
    getItemPosition,
    getItemsInRange,
    getKey,
    selectionObject,
    rowHeight,
    itemWidth,
    osInstance,
  } = deps;

  const explorerId = Math.floor(Math.random() * 2 ** 32).toString();
  const app = useApp();
  const fs = app.fs;

  const selectedKeys: StoreValue<Set<string>> = useStore(fs.selectedKeys);
  const sortedFiles: StoreValue<DirEntry[]> = useStore(fs.sortedFiles);

  const keyToItemMap = computed(() => {
    const map = new Map<string, DirEntry>();
    if (sortedFiles.value) {
      sortedFiles.value.forEach((file: DirEntry) => {
        map.set(getKey(file as T), file);
      });
    }
    return map;
  });

  const tempSelection = ref(new Set<string>());
  const isDragging = ref(false);
  const selectionStarted = ref(false);

  const extractIds = (els: Element[]): string[] => {
    return els.map((v) => v.getAttribute('data-key')).filter((v): v is string => Boolean(v));
  };

  const cleanupSelection = (event: SelectionEvent) => {
    event.selection.clearSelection(true, true);
  };

  const refreshSelection = (event: SelectionEvent) => {
    if (selectedKeys.value && selectedKeys.value.size > 0) {
      const allElements = document.querySelectorAll(`.file-item-${explorerId}[data-key]`);
      const elementsMap = new Map<string, Element>();
      allElements.forEach((el) => {
        const key = el.getAttribute('data-key');
        if (key) {
          elementsMap.set(key, el);
        }
      });

      const elementsToSelect: Element[] = [];
      selectedKeys.value.forEach((id: string) => {
        const el = elementsMap.get(id);
        if (el && isItemSelectable(id)) {
          elementsToSelect.push(el);
        }
      });

      elementsToSelect.forEach((el) => {
        event.selection.select(el, true);
      });
    }
  };

  const isItemSelectable = (key: string): boolean => {
    const item = keyToItemMap.value.get(key);
    if (!item) return false;

    const filterType = app.selectionFilterType;
    const allowedMimes = app.selectionFilterMimeIncludes;

    if (filterType === 'files' && item.type === 'dir') return false;
    if (filterType === 'dirs' && item.type === 'file') return false;

    if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
      if (item.type === 'dir') return true;

      if (!item.mime_type) return false;
      return allowedMimes.some((prefix: string) => item.mime_type?.startsWith(prefix));
    }

    return true;
  };

  const getSelectionRange = (selectionParam: Set<string>) => {
    if (selectionParam.size === 0) {
      return null;
    }

    const keyToIndexMap = new Map<string, number>();
    if (sortedFiles.value) {
      sortedFiles.value.forEach((f: DirEntry, index: number) => {
        keyToIndexMap.set(getKey(f as T), index);
      });
    }

    const ids = Array.from(selectionParam);
    const positions = ids
      .map((key) => {
        const index = keyToIndexMap.get(key) ?? -1;
        return index >= 0 ? getItemPosition(index) : null;
      })
      .filter((pos): pos is { row: number; col: number } => pos !== null);

    if (positions.length === 0) {
      return null;
    }

    const firstPos = positions[0]!;
    const minRow = positions.reduce((min, p) => (p.row < min ? p.row : min), firstPos.row);
    const maxRow = positions.reduce((max, p) => (p.row > max ? p.row : max), firstPos.row);
    const minCol = positions.reduce((min, p) => (p.col < min ? p.col : min), firstPos.col);
    const maxCol = positions.reduce((max, p) => (p.col > max ? p.col : max), firstPos.col);

    return { minRow, maxRow, minCol, maxCol };
  };

  const onBeforeStart = (event: SelectionEvent) => {
    if (app.selectionMode === 'single') {
      return false;
    }

    isDragging.value = false;
    if (!event.event?.metaKey && !event.event?.ctrlKey) {
      selectionStarted.value = true;
    }
    event.selection.resolveSelectables();
    cleanupSelection(event);
    refreshSelection(event);
  };

  const deltaY = ref(0);

  const getClientPoint = (rawEvent: Event): { x: number; y: number } | null => {
    const ev = rawEvent as unknown as TouchEvent | MouseEvent | undefined;
    if (ev && 'touches' in ev) {
      const t = ev.touches?.[0];
      if (t) return { x: t.clientX, y: t.clientY };
    }
    if (ev && 'changedTouches' in ev) {
      const ct = ev.changedTouches?.[0];
      if (ct) return { x: ct.clientX, y: ct.clientY };
    }
    if (ev && 'clientX' in (ev as MouseEvent) && 'clientY' in (ev as MouseEvent)) {
      const me = ev as MouseEvent;
      return { x: me.clientX, y: me.clientY };
    }
    return null;
  };

  const onStart = ({ event, selection }: SelectionEvent) => {
    deltaY.value =
      (selectionObject.value?.getAreaLocation().y1 ?? 0) -
      (app.root.getBoundingClientRect().top ?? 0);

    const selectionAreaContainerElement = document.querySelector(
      '.selection-area-container'
    ) as HTMLElement | null;
    if (selectionAreaContainerElement) {
      selectionAreaContainerElement.dataset.theme = app.theme.current;
    }
    if (app.selectionMode === 'single') {
      return;
    }

    const maybeTouch = event as unknown as TouchEvent | MouseEvent | undefined;
    if (maybeTouch && 'type' in maybeTouch && maybeTouch.type === 'touchend') {
      maybeTouch.preventDefault();
    }
    const mouse = event as MouseEvent | null;
    if (!mouse?.ctrlKey && !mouse?.metaKey) {
      fs.clearSelection();
      selection.clearSelection(true, true);
    }
    tempSelection.value.clear();
  };

  const onMove = (event: SelectionEvent) => {
    if (app.selectionMode === 'single') {
      return;
    }
    const addedData = extractIds(event.store.changed.added);
    const removedData = extractIds(event.store.changed.removed);

    selectionStarted.value = false;
    isDragging.value = true;

    addedData.forEach((id) => {
      if (selectedKeys.value && !selectedKeys.value.has(id) && isItemSelectable(id)) {
        tempSelection.value.add(id);
        fs.select(id, (app.selectionMode as 'single' | 'multiple') || 'multiple');
      }
    });

    removedData.forEach((id) => {
      const el = document.querySelector(`[data-key="${id}"]`);
      if (el && keyToItemMap.value.has(id)) {
        tempSelection.value.delete(id);
      }
      fs.deselect(id);
    });
    event.selection.resolveSelectables();

    refreshSelection(event);
  };

  const clearTempSelection = () => {
    tempSelection.value.clear();
  };

  const selectSelectionRange = (event: SelectionEvent) => {
    if (!event.event) {
      return;
    }
    console.log(selectionObject.value?.getAreaLocation());
    console.log('items per row', itemsPerRow.value);
    console.log('row height', rowHeight.value);
    console.log('item width', itemWidth);
    return;
  };

  const onStop = (event: SelectionEvent) => {
    selectSelectionRange(event);
    cleanupSelection(event);
    refreshSelection(event);
    fs.setSelectedCount(selectedKeys.value?.size || 0);

    isDragging.value = false;
  };

  const initializeSelectionArea = () => {
    // Get the actual scroll container - use OverlayScrollbars viewport if available
    let boundaries: string | HTMLElement | (string | HTMLElement)[] = ['.scroller-' + explorerId];

    if (osInstance?.value) {
      const { viewport } = osInstance.value.elements();
      if (viewport) {
        // Use the viewport element as boundary for SelectionArea scrolling
        boundaries = viewport;
      }
    }

    selectionObject.value = new SelectionArea({
      selectables: ['.file-item-' + explorerId + ':not(.vf-explorer-item--unselectable)'],
      boundaries: boundaries,
      selectionContainerClass: 'selection-area-container',
      behaviour: {
        overlap: 'invert',
        intersect: 'touch',
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 },
        },
      },
      features: {
        touch: true,
        range: true,
        deselectOnBlur: true,
        singleTap: {
          allow: false,
          intersect: 'native',
        },
      },
    });

    selectionObject.value.on('beforestart', onBeforeStart);
    selectionObject.value.on('start', onStart);
    selectionObject.value.on('move', onMove);
    selectionObject.value.on('stop', onStop);
  };

  const destroySelectionArea = () => {
    if (selectionObject.value) {
      selectionObject.value.destroy();
      selectionObject.value = null;
    }
  };

  const updateSelectionArea = () => {
    if (selectionObject.value) {
      const currentSelection: string[] = Array.from(
        (selectedKeys.value ?? new Set<string>()) as Set<string>
      );
      currentSelection.forEach((key) => {
        if (!isItemSelectable(key)) {
          fs.deselect(key);
        }
      });

      destroySelectionArea();
      initializeSelectionArea();
    }
  };

  const handleContentClick = (event: Event | PointerEvent) => {
    if (selectionStarted.value) {
      selectionObject.value?.clearSelection();
      clearTempSelection();
      selectionStarted.value = false;
    }
    const mouse = event as PointerEvent;
    if (
      !tempSelection.value.size &&
      !selectionStarted.value &&
      !mouse?.ctrlKey &&
      !mouse?.metaKey
    ) {
      fs.clearSelection();
      selectionObject.value?.clearSelection();
    }
  };

  onMounted(() => {
    const handleDragLeave = (e: Event) => {
      const ev = e as unknown as MouseEvent;
      if (!ev.buttons && isDragging.value) {
        isDragging.value = false;
      }
    };
    document.addEventListener('dragleave', handleDragLeave);

    onUnmounted(() => {
      document.removeEventListener('dragleave', handleDragLeave);
    });
  });

  return {
    explorerId,
    isDragging,
    initializeSelectionArea,
    updateSelectionArea,
    handleContentClick,
  };
}
