import { ref, shallowRef } from 'vue';
import type { ConfigStore } from '../stores/config';
import type { PreviewControls } from '../types/preview';

export default function useModal(config: ConfigStore) {
  const type = shallowRef<any>(null);
  const visible = ref(false);
  const data = ref<any>();
  const editMode = ref(false);
  // The currently mounted previewer's contract. Set via registerControls()
  // from a previewer's onMounted, cleared on unmount. The chrome reads this
  // to drive the [Edit] / [Save] / [Cancel] buttons.
  const controls = shallowRef<PreviewControls | null>(null);

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
    editMode.value = false;
    controls.value = null;
  };

  const setEditMode = (mode: boolean) => {
    editMode.value = mode;
  };

  const registerControls = (next: PreviewControls) => {
    controls.value = next;
  };

  const unregisterControls = (current: PreviewControls) => {
    // Guard so a stale unmount from a swapped-out previewer can't clear the
    // freshly-registered controls of its replacement.
    if (controls.value === current) controls.value = null;
  };

  return {
    visible,
    type,
    data,
    open,
    close,
    setEditMode,
    editMode,
    controls,
    registerControls,
    unregisterControls,
  };
}
