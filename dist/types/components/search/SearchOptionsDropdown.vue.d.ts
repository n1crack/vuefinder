interface Props {
    visible: boolean;
    disabled?: boolean;
    sizeFilter: 'all' | 'small' | 'medium' | 'large';
    selectedOption: string | null;
}
declare const __VLS_export: import("vue").DefineComponent<Props, {
    cleanup: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    keydown: (event: KeyboardEvent) => any;
    "update:visible": (value: boolean) => any;
    "update:sizeFilter": (value: "small" | "all" | "medium" | "large") => any;
    "update:selectedOption": (value: string | null) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onUpdate:sizeFilter"?: ((value: "small" | "all" | "medium" | "large") => any) | undefined;
    "onUpdate:selectedOption"?: ((value: string | null) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
