import type { DirEntry } from '../../types';
type __VLS_Props = {
    folder: DirEntry;
    storage: string;
    modelValue: DirEntry | null;
    expandedFolders: Record<string, boolean>;
    modalTreeData: Record<string, DirEntry[]>;
    currentPath?: any;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: DirEntry | null) => any;
    selectAndClose: (value: DirEntry | null) => any;
    toggleFolder: (storage: string, folderPath: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: DirEntry | null) => any) | undefined;
    onSelectAndClose?: ((value: DirEntry | null) => any) | undefined;
    onToggleFolder?: ((storage: string, folderPath: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
