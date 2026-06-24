import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { App, DirEntry } from '../types';
import type { CurrentPathState } from '@/stores/files';
import { useApp } from './useApp';
import { useFeature } from './useFeature';
import { createNotifier } from '../utils/notify';

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
  const notify = createNotifier(app);
  const fs = app.fs;
  const config = app.config;
  const { enabled } = useFeature();

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
        app.modal.open('rename', { items: selectedItems.value });
        e.preventDefault();
      }
    }
    if (e.code === KEYBOARD_SHORTCUTS.DELETE) {
      if (selectedItems.value.length !== 0) {
        app.modal.open('delete', { items: selectedItems.value });
      }
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) app.modal.open('about');
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && enabled('search')) {
      // Open search modal
      app.modal.open('search');
      e.preventDefault();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
      config.toggle('showTreeView');
      e.preventDefault();
    }
    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_S) {
      app.modal.open('settings');
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
        app.modal.open('preview', {
          storage: fs.path.get().storage,
          item: selectedItems.value[0],
        });
      }
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_C && enabled('copy')) {
      if (selectedItems.value.length === 0) {
        notify.error(app.i18n.t('No items selected'));
        return;
      }
      fs.setClipboard('copy', new Set(selectedItems.value.map((item: any) => item.path)));
      notify.success(
        selectedItems.value.length === 1
          ? app.i18n.t('Item copied to clipboard')
          : app.i18n.t('%s items copied to clipboard', selectedItems.value.length)
      );
      e.preventDefault();
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_X && enabled('copy')) {
      if (selectedItems.value.length === 0) {
        notify.error(app.i18n.t('No items selected'));
        return;
      }
      fs.setClipboard('cut', new Set(selectedItems.value.map((item: any) => item.path)));
      notify.success(
        selectedItems.value.length === 1
          ? app.i18n.t('Item cut to clipboard')
          : app.i18n.t('%s items cut to clipboard', selectedItems.value.length)
      );
      e.preventDefault();
    }

    if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_V && enabled('copy')) {
      if (fs.getClipboard().items.size === 0) {
        notify.error(app.i18n.t('No items in clipboard'));
        return;
      }
      if (fs.getClipboard().path === fs.path.get().path) {
        notify.error(app.i18n.t('Cannot paste items to the same directory'));
        return;
      }
      if (fs.getClipboard().type === 'cut') {
        app.modal.open('move', {
          items: { from: Array.from(fs.getClipboard().items), to: fs.path.get() },
        });
        fs.clearClipboard();
        return;
      }
      if (fs.getClipboard().type === 'copy') {
        app.modal.open('copy', {
          items: { from: Array.from(fs.getClipboard().items), to: fs.path.get() },
        });
        return;
      }

      e.preventDefault();
    }

    // Plugin-contributed hotkeys (any action declaring a `hotkey`).
    const pluginActions = app.plugins?.actionRegistry.actions ?? [];
    for (const action of pluginActions) {
      const hk = action.hotkey;
      if (!hk || hk.code !== e.code) continue;
      if (!!hk.meta !== e.metaKey || !!hk.shift !== e.shiftKey || !!hk.alt !== e.altKey) continue;
      const ctx = {
        searchQuery: '',
        items: selectedItems.value,
        target: selectedItems.value[0] ?? null,
      };
      if (action.show(app, ctx)) {
        action.action(app, selectedItems.value);
        e.preventDefault();
      }
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
