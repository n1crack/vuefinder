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
    BACKSLASH: 'Backslash',
    KEY_F: 'KeyF',
    KEY_A: 'KeyA',
};

export function useHotkeyActions(app) {
    // This function is used to handle keyboard shortcuts in the application.
    const handleKeyboardShortcuts = (e) => {
        if (e.key === KEYBOARD_SHORTCUTS.ESCAPE) {
            app.modal.close();
            app.root.focus();
        }

        if (app.modal.visible) {
            return;
        }

        if (e.key === KEYBOARD_SHORTCUTS.F2 && app.features.includes(FEATURES.RENAME)) {
            (app.dragSelect.getCount() !== 1) || app.modal.open(ModalRename, {items: app.dragSelect.getSelected()})
        }

        if (e.key === KEYBOARD_SHORTCUTS.F5) {
            app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
        }

        if (e.key === KEYBOARD_SHORTCUTS.DELETE) {
            (!app.dragSelect.getCount()) || app.modal.open(ModalDelete, {items: app.dragSelect.getSelected()})
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) {
            app.modal.open(ModalAbout)
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_F) {
            app.fs.searchMode = true;
            e.preventDefault();
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) {
            app.dragSelect.selectAll();
            e.preventDefault()
        }
    };

    onMounted(() => {
        app.root.addEventListener("keydown", handleKeyboardShortcuts);
    });

    onUnmounted(() => {
        app.root.removeEventListener("keydown", handleKeyboardShortcuts);
    });
}
