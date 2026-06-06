import { type StyleValue } from 'vue';
type __VLS_Props = {
    showDragOverlay?: boolean;
    dragOverlayText?: string;
    /**
     * Intercept Esc / overlay-click. If provided, called instead of
     * `app.modal.close()`. Owner is responsible for actually closing once
     * any guard (e.g. dirty-discard confirm) passes.
     */
    onRequestClose?: () => void;
    /**
     * Inline style applied to the modal body card. Used by ModalPreview to
     * translate the entire box during swipe-to-navigate. Touch event handlers
     * also forward here so the whole card responds to drag.
     */
    bodyStyle?: StyleValue;
    bodyClass?: string;
    onBodyTouchstart?: (e: TouchEvent) => void;
    onBodyTouchmove?: (e: TouchEvent) => void;
    onBodyTouchend?: (e: TouchEvent) => void;
    onBodyTouchcancel?: (e: TouchEvent) => void;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    buttons?: (props: typeof __VLS_3) => any;
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
