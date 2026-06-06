import type { ConfigStore } from '../stores/config';
import type { PreviewControls } from '../types/preview';
export default function useModal(config: ConfigStore): {
    visible: import("vue").Ref<boolean, boolean>;
    type: import("vue").ShallowRef<any, any>;
    data: import("vue").Ref<any, any>;
    open: (modal: any, payload?: any) => void;
    close: () => void;
    setEditMode: (mode: boolean) => void;
    editMode: import("vue").Ref<boolean, boolean>;
    controls: import("vue").ShallowRef<PreviewControls | null, PreviewControls | null>;
    registerControls: (next: PreviewControls) => void;
    unregisterControls: (current: PreviewControls) => void;
};
