import { ref, shallowRef } from 'vue';
import type { ConfigStore } from '../stores/config';

export default function useModal(config: ConfigStore) {
  const type = shallowRef<any>(null);
  const visible = ref(false);
  const data = ref<any>();
  const editMode = ref(false);

  const open = (modal: any, payload: any = null) => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = 'hidden';
    }
    visible.value = true;
    type.value = modal;
    data.value = payload;
  };

  const close = () => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = '';
    }
    visible.value = false;
    type.value = null;
  };

  const setEditMode = (mode: boolean) => {
    editMode.value = mode;
  };

  return { visible, type, data, open, close, setEditMode, editMode };
}
