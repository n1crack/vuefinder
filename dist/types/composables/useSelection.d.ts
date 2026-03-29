import { type Ref, type ComputedRef } from 'vue';
import SelectionArea from '@viselect/vanilla';
export interface UseSelectionDeps<T> {
    itemsPerRow: Ref<number>;
    totalHeight: Ref<number>;
    getItemPosition: (itemIndex: number) => {
        row: number;
        col: number;
    };
    getItemsInRange: <U>(items: U[], minRow: number, maxRow: number, minCol: number, maxCol: number) => U[];
    getKey: (item: T) => string;
    selectionObject: Ref<SelectionArea | null>;
    rowHeight: Ref<number> | ComputedRef<number>;
    itemWidth: number | Ref<number> | ComputedRef<number>;
    osInstance?: Ref<ReturnType<typeof import('overlayscrollbars').OverlayScrollbars> | null>;
}
export declare function useSelection<T>(deps: UseSelectionDeps<T>): {
    explorerId: string;
    isDragging: Ref<boolean, boolean>;
    initializeSelectionArea: () => void;
    updateSelectionArea: () => void;
    handleContentClick: (event: Event | PointerEvent) => void;
};
