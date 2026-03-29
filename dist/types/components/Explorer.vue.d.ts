import type { DirEntry, ItemDclickEvent } from '../types';
type __VLS_Props = {
    onFileDclick?: (event: ItemDclickEvent) => void;
    onFolderDclick?: (event: ItemDclickEvent) => void;
};
declare var __VLS_24: {
    app: any;
    config: any;
    item: DirEntry;
    view: "list" | "grid" | undefined;
}, __VLS_39: {
    app: any;
    config: any;
    item: DirEntry;
    view: "list" | "grid" | undefined;
};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_24) => any;
} & {
    icon?: (props: typeof __VLS_39) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
