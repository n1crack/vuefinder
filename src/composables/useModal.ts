import { ref, shallowRef, type Component } from 'vue';
import type { Emitter } from 'mitt';
import type { ConfigStore } from '../stores/config';
import type { PreviewControls } from '../types/preview';
import type { ModalKey, ModalRegistry } from '../plugins/modalRegistry';
import { emitHook } from '../plugins/hooks';

export default function useModal(
  config: ConfigStore,
  registry: ModalRegistry,
  emitter: Emitter<Record<string, unknown>>
) {
  const type = shallowRef<any>(null);
  // The key the modal was opened with (null when opened by raw component).
  // Plugin outlets read this to look up region extensions.
  const key = shallowRef<ModalKey | null>(null);
  const visible = ref(false);
  const data = ref<any>();
  // A per-operation bag of extra values. Modal extension fields (injected via
  // plugins through `ctx.extras`) write here; the modal's action handler passes
  // it into the adapter/driver call, and RemoteDriver forwards it to the backend
  // as extra request fields. Reset on every open so values don't leak between
  // operations.
  const extras = ref<Record<string, unknown>>({});
  const editMode = ref(false);
  // The currently mounted previewer's contract. Set via registerControls()
  // from a previewer's onMounted, cleared on unmount. The chrome reads this
  // to drive the [Edit] / [Save] / [Cancel] buttons.
  const controls = shallowRef<PreviewControls | null>(null);

  // Accepts either a stable ModalKey (resolved through the registry, so plugin
  // overrides apply) or a raw component (back-compat / ad-hoc modals).
  const open = (modal: ModalKey | Component, payload: any = null) => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = 'hidden';
    }
    visible.value = true;
    extras.value = {};
    if (registry.isModalKey(modal)) {
      key.value = modal;
      type.value = registry.resolve(modal);
    } else {
      key.value = null;
      type.value = modal;
    }
    data.value = payload;
    emitHook(emitter, 'modalOpen', { key: key.value });
  };

  const close = () => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = '';
    }
    const closedKey = key.value;
    visible.value = false;
    type.value = null;
    key.value = null;
    emitHook(emitter, 'modalClose', { key: closedKey });
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
    key,
    data,
    extras,
    open,
    close,
    setEditMode,
    editMode,
    controls,
    registerControls,
    unregisterControls,
  };
}
