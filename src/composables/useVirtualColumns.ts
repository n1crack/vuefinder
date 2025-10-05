import {computed, onMounted, onUnmounted, ref, type Ref} from 'vue';

export interface VirtualColumnsOptions {
    itemWidth?: number;
    rowHeight?: number;
    overscan?: number;
    containerPadding?: number;
}

export interface VirtualColumnsReturn {
    scrollContainer: Ref<HTMLElement | null>;
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
}

export default function useVirtualColumns<T = any>(
    items: Ref<T[]>,
    options: VirtualColumnsOptions = {}
): VirtualColumnsReturn {
    const {
        itemWidth = 120,
        rowHeight = 100,
        overscan = 2,
        containerPadding = 48
    } = options;

    // Refs
    const scrollContainer = ref<HTMLElement | null>(null);
    const scrollTop = ref(0);
    const itemsPerRow = ref(6);

    // Computed properties
    const totalRows = computed(() => Math.ceil(items.value.length / itemsPerRow.value));
    const totalHeight = computed(() => totalRows.value * rowHeight);

    const visibleRange = computed(() => {
        const start = Math.max(0, Math.floor(scrollTop.value / rowHeight) - overscan);
        const end = Math.min(totalRows.value, Math.ceil((scrollTop.value + getContainerHeight()) / rowHeight) + overscan);
        return {start, end};
    });

    const visibleRows = computed(() => {
        const {start, end} = visibleRange.value;
        return Array.from({length: end - start}, (_, i) => start + i);
    });

    // Helper functions
    const getContainerHeight = (): number => {
        return scrollContainer.value?.clientHeight || 600;
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
    onMounted(() => {
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateItemsPerRow);
    });

    return {
        scrollContainer,
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
        getItemPosition
    };
}
