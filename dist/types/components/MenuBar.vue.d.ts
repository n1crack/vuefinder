declare var __VLS_1: {
    menuItems: import("..").MenuItem[];
}, __VLS_3: {
    menuItems: import("..").MenuItem[];
    handleMenuAction: (action?: () => void) => void;
}, __VLS_5: {
    menuItems: import("..").MenuItem[];
};
type __VLS_Slots = {} & {
    'menubar-start'?: (props: typeof __VLS_1) => any;
} & {
    'menu-items'?: (props: typeof __VLS_3) => any;
} & {
    'menubar-end'?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
