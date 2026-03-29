import type { DirEntry } from '../types';
type __VLS_Props = {
    rowIndex: number;
    rowHeight: number;
    view: 'grid' | 'list';
    itemsPerRow?: number;
    items: DirEntry[];
    showThumbnails?: boolean;
    showPath?: boolean;
    isDraggingItem: (path: string | null) => boolean;
    isSelected: (path: string) => boolean;
    dragNDropEvents: (item: DirEntry) => Record<string, any>;
    explorerId: string;
};
declare var __VLS_14: {
    app: any;
    config: any;
    item: DirEntry;
    view: "list" | "grid" | undefined;
};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: Event | MouseEvent | TouchEvent) => any;
    contextmenu: (event: MouseEvent | TouchEvent) => any;
    dblclick: (event: MouseEvent | TouchEvent) => any;
    dragend: (event: DragEvent) => any;
    dragstart: (event: DragEvent) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: Event | MouseEvent | TouchEvent) => any) | undefined;
    onContextmenu?: ((event: MouseEvent | TouchEvent) => any) | undefined;
    onDblclick?: ((event: MouseEvent | TouchEvent) => any) | undefined;
    onDragend?: ((event: DragEvent) => any) | undefined;
    onDragstart?: ((event: DragEvent) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
