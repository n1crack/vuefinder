import type { ComputedRef, Ref } from 'vue';
/**
 * Contract a preview component implements so the modal chrome (top bar)
 * can drive its edit lifecycle uniformly — regardless of whether the
 * previewer is a text editor, image cropper, csv editor, etc.
 *
 * The chrome reads the reactive fields to render the [Edit] / [Save] /
 * [Cancel] buttons and the dirty-state indicator, and calls the methods
 * when the user activates them.
 *
 * Non-editable previewers (PDF, Video, Audio, Default) register with
 * `isEditable` always false and no-op handlers; the chrome hides Edit.
 */
export interface PreviewControls {
    /** Whether this previewer supports edit mode at all (feature flag aware). */
    isEditable: ComputedRef<boolean> | Ref<boolean>;
    /** Whether the previewer is currently in edit mode. */
    isEditing: ComputedRef<boolean> | Ref<boolean>;
    /** Whether the user has made unsaved changes in edit mode. */
    isDirty: ComputedRef<boolean> | Ref<boolean>;
    /**
     * Label for the primary commit action — "Save" for text, "Crop" for
     * image, etc. Used as the [Save]-position button label. null when not
     * editable.
     */
    primaryActionLabel: ComputedRef<string | null> | Ref<string | null>;
    /** Enter edit mode. */
    enterEdit: () => void | Promise<void>;
    /** Commit the current edit (e.g. save text, apply crop). */
    commitEdit: () => void | Promise<void>;
    /** Discard the edit and return to view mode. */
    cancelEdit: () => void | Promise<void>;
    /**
     * Optional extra info rows the chrome appends to the [i] popover.
     * Used by Image to expose intrinsic width × height, by Video to expose
     * duration, etc. — anything that can't be known until the asset loads.
     */
    extraInfo?: ComputedRef<Array<{
        label: string;
        value: string;
    }>> | Ref<Array<{
        label: string;
        value: string;
    }>>;
}
