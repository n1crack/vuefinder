import type { VueFinderProps } from '../types';
declare var __VLS_9: {
    app: any;
    config: any;
    item: import("../types").DirEntry;
    view: "list" | "grid" | undefined;
}, __VLS_12: {
    path: any;
    count: number;
    selected: any;
}, __VLS_15: {
    menuItems: import("../types").MenuItem[];
}, __VLS_18: {
    menuItems: import("../types").MenuItem[];
    handleMenuAction: (action?: () => void) => void;
}, __VLS_21: {
    menuItems: import("../types").MenuItem[];
}, __VLS_24: {}, __VLS_27: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_9) => any;
} & {
    'status-bar'?: (props: typeof __VLS_12) => any;
} & {
    'menubar-start'?: (props: typeof __VLS_15) => any;
} & {
    'menu-items'?: (props: typeof __VLS_18) => any;
} & {
    'menubar-end'?: (props: typeof __VLS_21) => any;
} & {
    'toolbar-items'?: (props: typeof __VLS_24) => any;
} & {
    'breadcrumb-actions'?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: import("vue").DefineComponent<VueFinderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<VueFinderProps> & Readonly<{}>, {
    debug: boolean;
    selectionMode: "single" | "multiple";
    selectionFilterType: "files" | "dirs" | "both";
    selectionFilterMimeIncludes: string[];
    contextMenuItems: import("../index.ts").Item[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
