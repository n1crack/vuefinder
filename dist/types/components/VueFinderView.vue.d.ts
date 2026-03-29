import type { VueFinderProps, DirEntry } from '../types';
import 'vue-sonner/style.css';
declare var __VLS_28: {
    app: any;
    config: any;
    item: DirEntry;
    view: "list" | "grid" | undefined;
}, __VLS_37: {
    path: any;
    count: number;
    selected: any;
};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_28) => any;
} & {
    'status-bar'?: (props: typeof __VLS_37) => any;
};
declare const __VLS_base: import("vue").DefineComponent<VueFinderProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (...args: any[]) => void;
    select: (...args: any[]) => void;
    "path-change": (...args: any[]) => void;
    "upload-complete": (...args: any[]) => void;
    "delete-complete": (...args: any[]) => void;
    notify: (...args: any[]) => void;
    ready: (...args: any[]) => void;
    "file-dclick": (...args: any[]) => void;
    "folder-dclick": (...args: any[]) => void;
    "update:locale": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<VueFinderProps> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onPath-change"?: ((...args: any[]) => any) | undefined;
    "onUpload-complete"?: ((...args: any[]) => any) | undefined;
    "onDelete-complete"?: ((...args: any[]) => any) | undefined;
    onNotify?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    "onFile-dclick"?: ((...args: any[]) => any) | undefined;
    "onFolder-dclick"?: ((...args: any[]) => any) | undefined;
    "onUpdate:locale"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
