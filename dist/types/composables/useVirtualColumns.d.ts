import { type Ref, type ComputedRef, type TemplateRef } from 'vue';
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
    visibleRange: Ref<{
        start: number;
        end: number;
    }>;
    visibleRows: Ref<number[]>;
    updateItemsPerRow: () => void;
    handleScroll: (event: Event) => void;
    getRowItems: <T>(items: T[], rowIndex: number) => T[];
    getItemsInRange: <T>(items: T[], minRow: number, maxRow: number, minCol: number, maxCol: number) => T[];
    getItemPosition: (itemIndex: number) => {
        row: number;
        col: number;
    };
    getContainerHeight: () => number;
}
export default function useVirtualColumns<T = unknown>(items: Ref<T[]>, // Accept only Vue refs (including computed)
options: VirtualColumnsOptions): VirtualColumnsReturn;
