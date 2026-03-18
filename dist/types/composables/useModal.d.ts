import type { ConfigStore } from '../stores/config';
export default function useModal(config: ConfigStore): {
    visible: import("vue").Ref<boolean, boolean>;
    type: import("vue").ShallowRef<any, any>;
    data: import("vue").Ref<any, any>;
    open: (modal: any, payload?: any) => void;
    close: () => void;
    setEditMode: (mode: boolean) => void;
    editMode: import("vue").Ref<boolean, boolean>;
};
