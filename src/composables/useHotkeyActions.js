import {onMounted, onUnmounted} from 'vue';
import {FEATURES} from "../features.js";
import ModalAbout from "../components/modals/ModalAbout.vue";
import ModalDelete from "../components/modals/ModalDelete.vue";
import ModalRename from "../components/modals/ModalRename.vue";

const KEYBOARD_SHORTCUTS = {
    ESCAPE: 'Escape',
    F2: 'F2',
    F5: 'F5',
    DELETE: 'Delete',
    ENTER: 'Enter',
    BACKSLASH: 'Backslash',
    KEY_A: 'KeyA',
    KEY_E: 'KeyE',
    KEY_F: 'KeyF',
};

export function useHotkeyActions(app) {
    // This function is used to handle keyboard shortcuts in the application.
    const handleKeyboardShortcuts = (e) => {
        if (e.code === KEYBOARD_SHORTCUTS.ESCAPE) {
            app.modal.close();
            app.root.focus();
        }

        if (app.modal.visible) {
            return;
        }

        if (app.fs.searchMode) {
            return;
        }

        if (e.code === KEYBOARD_SHORTCUTS.F2 && app.features.includes(FEATURES.RENAME)) {
            (app.dragSelect.getCount() !== 1) || app.modal.open(ModalRename, {items: app.dragSelect.getSelected()})
        }

        if (e.code === KEYBOARD_SHORTCUTS.F5) {
            app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
        }

        if (e.code === KEYBOARD_SHORTCUTS.DELETE) {
            (!app.dragSelect.getCount()) || app.modal.open(ModalDelete, {items: app.dragSelect.getSelected()})
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) {
            app.modal.open(ModalAbout)
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && app.features.includes(FEATURES.SEARCH)) {
            app.fs.searchMode = true;
            e.preventDefault();
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
            app.showTreeView = !app.showTreeView;
            app.storage.setStore('show-tree-view', app.showTreeView);
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.ENTER) {
            app.fullScreen = !app.fullScreen;
            app.root.focus();
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) {
            app.dragSelect.selectAll();
            e.preventDefault()
        }
    };

    onMounted(() => {
        app.root.addEventListener("keydown", handleKeyboardShortcuts);
    });
}
