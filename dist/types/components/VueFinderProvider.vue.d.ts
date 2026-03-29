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
};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_9) => any;
} & {
    'status-bar'?: (props: typeof __VLS_12) => any;
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
