import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { App, DirEntry } from '../types';
import ModalAbout from '../components/modals/ModalAbout.vue';
import ModalDelete from '../components/modals/ModalDelete.vue';
import ModalRename from '../components/modals/ModalRename.vue';
import ModalPreview from '../components/modals/ModalPreview.vue';
import ModalMove from '../components/modals/ModalMove.vue';
import ModalCopy from '../components/modals/ModalCopy.vue';
import ModalSearch from '../components/modals/ModalSearch.vue';
import ModalSettings from '../components/modals/ModalSettings.vue';
import type { CurrentPathState } from '@/stores/files';
import { useApp } from './useApp';
import { useFeatures } from './useFeatures';

const KEYBOARD_SHORTCUTS = {
  ESCAPE: 'Escape',
  DELETE: 'Delete',
  ENTER: 'Enter',
  BACKSLASH: 'Backslash',
  KEY_A: 'KeyA',
  KEY_E: 'KeyE',
  KEY_F: 'KeyF',
  SPACE: 'Space',
  KEY_C: 'KeyC',
  KEY_X: 'KeyX',
  KEY_V: 'KeyV',
  KEY_S: 'KeyS',
  KEY_R: 'KeyR',
} as const;

export function useHotkeyActions() {
  const app: App = useApp();
  const fs = app.fs;
  const config = app.config;
  const { enabled } = useFeatures();

  const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

  // Use nanostores reactive values
  const selectedItems: StoreValue<DirEntry[]> = useStore(fs.selectedItems);

  const handleKeyboardShortcuts = (e: KeyboardEvent) => {
    if (e.code === KEYBOARD_SHORTCUTS.ESCAPE) {
      app.modal.close();
      app.root.focus();
    }
    if (app.modal.visible) return;
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_R && !e.shiftKey) {
      app.adapter.invalidateListQuery(currentPath.value.path);
      app.adapter.open(currentPath.value.path);
      e.preventDefault();
    }
    if (e.metaKey && e.shiftKey && e.code === KEYBOARD_SHORTCUTS.KEY_R && enabled('rename')) {
      if (selectedItems.value.length === 1) {
        app.modal.open(ModalRename, { items: selectedItems.value });
        e.preventDefault();
      }
    }
    if (e.code === KEYBOARD_SHORTCUTS.DELETE) {
      if (selectedItems.value.length !== 0) {
        app.modal.open(ModalDelete, { items: selectedItems.value });
      }
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) app.modal.open(ModalAbout);
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && enabled('search')) {
      // Open search modal
      app.modal.open(ModalSearch);
      e.preventDefault();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
      config.toggle('showTreeView');
      e.preventDefault();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_S) {
      app.modal.open(ModalSettings);
      e.preventDefault();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.ENTER) {
      config.toggle('fullScreen');
      app.root.focus();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) {
      fs.selectAll(app.selectionMode || 'multiple', app);
      e.preventDefault();
    }
    if (e.code === KEYBOARD_SHORTCUTS.SPACE) {
      if (selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir') {
        app.modal.open(ModalPreview, {
          storage: fs.path.get().storage,
          item: selectedItems.value[0],
        });
      }
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_C && enabled('copy')) {
      if (selectedItems.value.length === 0) {
        app.emitter.emit('vf-toast-push', {
          type: 'error',
          label: app.i18n.t('No items selected'),
        });
        return;
      }
      fs.setClipboard('copy', new Set(selectedItems.value.map((item: any) => item.path)));
      app.emitter.emit('vf-toast-push', {
        label:
          selectedItems.value.length === 1
            ? app.i18n.t('Item copied to clipboard')
            : app.i18n.t('%s items copied to clipboard', selectedItems.value.length),
      });
      e.preventDefault();
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_X && enabled('copy')) {
      if (selectedItems.value.length === 0) {
        app.emitter.emit('vf-toast-push', {
          type: 'error',
          label: app.i18n.t('No items selected'),
        });
        return;
      }
      fs.setClipboard('cut', new Set(selectedItems.value.map((item: any) => item.path)));
      app.emitter.emit('vf-toast-push', {
        label:
          selectedItems.value.length === 1
            ? app.i18n.t('Item cut to clipboard')
            : app.i18n.t('%s items cut to clipboard', selectedItems.value.length),
      });
      e.preventDefault();
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_V && enabled('copy')) {
      if (fs.getClipboard().items.size === 0) {
        app.emitter.emit('vf-toast-push', {
          type: 'error',
          label: app.i18n.t('No items in clipboard'),
        });
        return;
      }
      if (fs.getClipboard().path === fs.path.get().path) {
        app.emitter.emit('vf-toast-push', {
          type: 'error',
          label: app.i18n.t('Cannot paste items to the same directory'),
        });
        return;
      }
      if (fs.getClipboard().type === 'cut') {
        app.modal.open(ModalMove, {
          items: { from: Array.from(fs.getClipboard().items), to: fs.path.get() },
        });
        fs.clearClipboard();
        return;
      }
      if (fs.getClipboard().type === 'copy') {
        app.modal.open(ModalCopy, {
          items: { from: Array.from(fs.getClipboard().items), to: fs.path.get() },
        });
        return;
      }

      e.preventDefault();
    }
  };

  onMounted(async () => {
    // Wait for next tick to ensure app.root is set by VueFinder
    await nextTick();
    if (!app.root) {
      console.warn('app.root is not available. Event listeners will not be attached.');
      return;
    }
    app.root.addEventListener('keydown', handleKeyboardShortcuts);
  });
  onBeforeUnmount(() => {
    if (app.root) {
      app.root.removeEventListener('keydown', handleKeyboardShortcuts);
    }
  });
}
