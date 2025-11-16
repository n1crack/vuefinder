import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue';
import { useApp } from '../composables/useApp';
import SelectionArea, { type AreaLocation, type SelectionEvent } from '@viselect/vanilla';
import type { DirEntry } from '../types';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';

export interface UseSelectionDeps<T> {
  itemsPerRow: Ref<number>;
  totalHeight: Ref<number>;
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
    totalHeight,
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

    const container = document.querySelector('.scroller-' + explorerId) as HTMLElement;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;

    // Get scroll position
    let scrollTop = container.scrollTop;

    // Use OverlayScrollbars viewport if available
    if (osInstance?.value) {
      const { viewport } = osInstance.value.elements();
      if (viewport) {
        scrollTop = viewport.scrollTop;
      }
    }

    const areaLocation = selectionObject.value?.getAreaLocation();
    if (!areaLocation) {
      return;
    }
    const pointMinX = Math.min(areaLocation.x1, areaLocation.x2);
    const pointMinY = scrollTop + Math.min(areaLocation.y1, areaLocation.y2);
    const pointMaxX = Math.max(areaLocation.x1, areaLocation.x2);
    const pointMaxY = scrollTop + Math.max(areaLocation.y1, areaLocation.y2);

    const gap = 4;

    // console.log('pointMinX', pointMinX - containerX - gap);
    // console.log('pointMinY', pointMinY - containerY - gap);
    // console.log('pointMaxX', pointMaxX - containerX - gap);
    // console.log('pointMaxY', pointMaxY - containerY - gap);
    // console.log('scrollTop', scrollTop);

    let colMin = Math.floor((pointMinX - containerX - gap) / itemWidth);
    let colMax = Math.floor((pointMaxX - containerX - gap) / itemWidth);

    const selectedColMin = pointMinX - containerX - gap - colMin * itemWidth;
    const selectedColMax = pointMaxX - containerX - gap - colMax * itemWidth;

    // console.log('selectedColMin', selectedColMin);
    // console.log('selectedColMax', selectedColMax);

    if (selectedColMin > itemWidth - gap) {
      colMin = colMin + 1;
    }
    if (selectedColMax < gap) {
      colMax = colMax - 1;
    }

    const colSafeMin = Math.max(0, colMin);
    const colSafeMax = Math.min(itemsPerRow.value - 1, colMax);

    let rowMin = Math.floor((pointMinY - containerY - gap) / rowHeight.value);
    let rowMax = Math.floor((pointMaxY - containerY - gap) / rowHeight.value);

    const selectedRowMin = pointMinY - containerY - gap - rowMin * rowHeight.value;
    const selectedRowMax = pointMaxY - containerY - gap - rowMax * rowHeight.value;
    const maximumRowCount = Math.floor((totalHeight.value - gap) / rowHeight.value);

    if (selectedRowMin > rowHeight.value - gap) {
      rowMin = rowMin + 1;
    }

    if (selectedRowMax < gap) {
      rowMax = rowMax - 1;
    }

    const rowSafeMin = Math.max(0, rowMin);
    const rowSafeMax = Math.min(rowMax, maximumRowCount);

    console.log('colMin', colSafeMin);
    console.log('colMax', colSafeMax);
    console.log('rowMin', rowSafeMin);
    console.log('rowMax', rowSafeMax);

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
