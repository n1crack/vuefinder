import {computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref, type TemplateRef} from 'vue';

export interface VirtualColumnsOptions {
    scrollContainer: TemplateRef<HTMLElement>;
    itemWidth?: number;
    rowHeight?: number | Ref<number>;
    overscan?: number;
    containerPadding?: number;
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
    getItemsInRange: <T>(items: T[], minRow: number, maxRow: number, minCol: number, maxCol: number) => T[];
    getItemPosition: (itemIndex: number) => { row: number; col: number };
    getContainerHeight: () => number;
}

export default function useVirtualColumns<T = unknown>(
    items: Ref<T[]>,
    options: VirtualColumnsOptions
): VirtualColumnsReturn {
    const { 
        scrollContainer,
        itemWidth = 120,
        rowHeight = 100,
        overscan = 2,
        containerPadding = 48,
    } = options;

    const getRowHeight = (): number => {
        return typeof rowHeight === 'number' ? rowHeight : (rowHeight as Ref<number>).value;
    };

    // Refs
    const scrollTop = ref(0);
    const itemsPerRow = ref(6);
    const containerHeightRef = ref(600);
    let resizeObserver: ResizeObserver | null = null;

    // Computed properties
    const totalRows = computed(() => Math.ceil(items.value.length / itemsPerRow.value));
    const totalHeight = computed(() => totalRows.value * getRowHeight());

    const visibleRange = computed(() => {
        const rh = getRowHeight();
        const start = Math.max(0, Math.floor(scrollTop.value / rh) - overscan);
        const end = Math.min(totalRows.value, Math.ceil((scrollTop.value + containerHeightRef.value) / rh) + overscan);
        return {start, end};
    });

    const visibleRows = computed(() => {
        const {start, end} = visibleRange.value;
        return Array.from({length: end - start}, (_, i) => start + i);
    });

    // Helper functions
    const getContainerHeight = (): number => {
        return containerHeightRef.value;
    };

    const updateItemsPerRow = () => {
        if (scrollContainer.value) {
            const width = scrollContainer.value.clientWidth - containerPadding;
            itemsPerRow.value = Math.max(Math.floor(width / itemWidth), 2);
        }
    }

    const handleScroll = (event: Event) => {
        const target = event.target as HTMLElement;
        scrollTop.value = target.scrollTop;
    };

    // React to items change (e.g., data loaded or filtered)
    watch(() => items.value.length, () => {
        updateItemsPerRow();
    });

    const getRowItems = <T>(items: T[], rowIndex: number): T[] => {
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
            col: itemIndex % itemsPerRow.value
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
        getContainerHeight
    };
}
