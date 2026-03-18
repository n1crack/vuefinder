import type { DirEntry } from '../../types.ts';
interface Props {
    item: DirEntry;
    index: number;
    selectedIndex: number;
    expandedPaths: Set<string>;
    activeDropdown: string | null;
    selectedItemDropdownOption: string | null;
}
declare const __VLS_export: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    preview: (item: DirEntry) => any;
    select: (index: number) => any;
    selectWithDropdown: (index: number) => any;
    togglePathExpansion: (path: string) => any;
    toggleItemDropdown: (path: string, event: MouseEvent) => any;
    "update:selectedItemDropdownOption": (value: string | null) => any;
    copyPath: (item: DirEntry) => any;
    openContainingFolder: (item: DirEntry) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onPreview?: ((item: DirEntry) => any) | undefined;
    onSelect?: ((index: number) => any) | undefined;
    onSelectWithDropdown?: ((index: number) => any) | undefined;
    onTogglePathExpansion?: ((path: string) => any) | undefined;
    onToggleItemDropdown?: ((path: string, event: MouseEvent) => any) | undefined;
    "onUpdate:selectedItemDropdownOption"?: ((value: string | null) => any) | undefined;
    onCopyPath?: ((item: DirEntry) => any) | undefined;
    onOpenContainingFolder?: ((item: DirEntry) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
