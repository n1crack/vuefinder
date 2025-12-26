import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type Ref,
  type ComputedRef,
  type TemplateRef,
} from 'vue';

export interface VirtualColumnsOptions {
  scrollContainer: TemplateRef<HTMLElement>;
  itemWidth?: number | Ref<number> | ComputedRef<number>;
  rowHeight?: number | Ref<number> | ComputedRef<number>;
  overscan?: number;
  containerPadding?: number | Ref<number> | ComputedRef<number>;
  lockItemsPerRow: Ref<boolean> | ComputedRef<boolean>;
}

export interface VirtualColumnsReturn {
  scrollTop: Ref<number>;
  itemsPerRow: Ref<number>;
  totalRows: Ref<number>;
  totalHeight: Ref<number>;
  visibleRange: Ref<{ start: number; end: number }>;
  visibleRows: Ref<number[]>;
  updateItemsPerRow: () => void;
  handleScroll: (event: Event) => void;
  getRowItems: <T>(items: T[], rowIndex: number) => T[];
  getItemsInRange: <T>(
    items: T[],
    minRow: number,
    maxRow: number,
    minCol: number,
    maxCol: number
  ) => T[];
  getItemPosition: (itemIndex: number) => { row: number; col: number };
  getContainerHeight: () => number;
}

// (Nanostores support removed; only Vue refs are accepted.)

export default function useVirtualColumns<T = unknown>(
  items: Ref<T[]>, // Accept only Vue refs (including computed)
  options: VirtualColumnsOptions
): VirtualColumnsReturn {
  const {
    scrollContainer,
    itemWidth = 100,
    rowHeight,
    overscan = 2,
    containerPadding = 48,
    lockItemsPerRow,
  } = options;

  // Convert Nanostores atom to Vue ref if needed
  const itemsRef: Ref<T[]> = items;

  const getRowHeight = (): number => {
    if (typeof rowHeight === 'number') return rowHeight;
    return (rowHeight as Ref<number> | ComputedRef<number>).value;
  };

  const getItemWidth = (): number => {
    if (!itemWidth) return 100;
    if (typeof itemWidth === 'number') return itemWidth;
    return (itemWidth as Ref<number> | ComputedRef<number>).value;
  };

  const getContainerPadding = (): number => {
    if (!containerPadding) return 0;
    if (typeof containerPadding === 'number') return containerPadding;
    return (containerPadding as Ref<number> | ComputedRef<number>).value;
  };

  // Refs
  const scrollTop = ref(0);
  const itemsPerRow = ref(6);
  const containerHeightRef = ref(600);
  let resizeObserver: ResizeObserver | null = null;

  // Computed properties
  const totalRows = computed(() => Math.ceil(itemsRef.value.length / itemsPerRow.value));
  const totalHeight = computed(() => totalRows.value * getRowHeight());

  const visibleRange = computed(() => {
    const rh = getRowHeight();
    const start = Math.max(0, Math.floor(scrollTop.value / rh) - overscan);
    const end = Math.min(
      totalRows.value,
      Math.ceil((scrollTop.value + containerHeightRef.value) / rh) + overscan
    );
    return { start, end };
  });

  const visibleRows = computed(() => {
    const { start, end } = visibleRange.value;
    return Array.from({ length: end - start }, (_, i) => start + i);
  });

  // Helper functions
  const getContainerHeight = (): number => {
    return containerHeightRef.value;
  };

  const isLocked = (): boolean => {
    return typeof lockItemsPerRow === 'object' ? lockItemsPerRow.value : false;
  };

  const updateItemsPerRow = () => {
    if (isLocked()) {
      itemsPerRow.value = 1;
      return;
    }
    if (scrollContainer.value) {
      const padding = getContainerPadding();
      const width = scrollContainer.value.clientWidth - padding;
      const iw = getItemWidth();
      if (iw > 0) {
        itemsPerRow.value = Math.max(Math.floor(width / iw), 2);
      }
    }
  };

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    scrollTop.value = target.scrollTop;
  };

  // React to items change (e.g., data loaded or filtered)
  watch(
    () => itemsRef.value.length,
    () => {
      updateItemsPerRow();
    }
  );

  // React to itemWidth changes (e.g., config changes)
  if (itemWidth && typeof itemWidth !== 'number') {
    watch(itemWidth as Ref<number> | ComputedRef<number>, () => {
      updateItemsPerRow();
    });
  }

  // React to containerPadding changes (e.g., config changes)
  if (containerPadding && typeof containerPadding !== 'number') {
    watch(containerPadding as Ref<number> | ComputedRef<number>, () => {
      updateItemsPerRow();
    });
  }

  // React to rowHeight changes (e.g., config changes)
  if (rowHeight && typeof rowHeight !== 'number') {
    watch(rowHeight as Ref<number> | ComputedRef<number>, () => {
      // Row height change doesn't affect itemsPerRow, but triggers recalculation
      // This ensures totalHeight is recalculated
    });
  }

  const getRowItems = <T>(items: T[], rowIndex: number): T[] => {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    const startIndex = rowIndex * itemsPerRow.value;
    return items.slice(startIndex, startIndex + itemsPerRow.value);
  };

  const getItemsInRange = <T>(
    items: T[],
    minRow: number,
    maxRow: number,
    minCol: number,
    maxCol: number
  ): T[] => {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    const result: T[] = [];

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const index = row * itemsPerRow.value + col;
        if (index < items.length && items[index]) {
          result.push(items[index]);
        }
      }
    }

    return result;
  };

  const getItemPosition = (itemIndex: number): { row: number; col: number } => {
    return {
      row: Math.floor(itemIndex / itemsPerRow.value),
      col: itemIndex % itemsPerRow.value,
    };
  };

  // Lifecycle
  onMounted(async () => {
    await nextTick();
    if (scrollContainer.value) {
      containerHeightRef.value = scrollContainer.value.clientHeight || 600;
    }
    updateItemsPerRow();
    window.addEventListener('resize', () => {
      if (scrollContainer.value) {
        containerHeightRef.value = scrollContainer.value.clientHeight || 600;
      }
      updateItemsPerRow();
    });
    if (scrollContainer.value && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          containerHeightRef.value = Math.round(entry.contentRect.height);
        }
        updateItemsPerRow();
      });
      resizeObserver.observe(scrollContainer.value);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerRow);
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  return {
    scrollTop,
    itemsPerRow,
    totalRows,
    totalHeight,
    visibleRange,
    visibleRows,
    updateItemsPerRow,
    handleScroll,
    getRowItems,
    getItemsInRange,
    getItemPosition,
    getContainerHeight,
  };
}
