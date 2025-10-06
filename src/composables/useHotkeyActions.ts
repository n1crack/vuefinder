import {onMounted, onBeforeUnmount} from 'vue';
import {FEATURES} from "../features";
import ModalAbout from "@/components/modals/ModalAbout.vue";
import ModalDelete from "@/components/modals/ModalDelete.vue";
import ModalRename from "@/components/modals/ModalRename.vue";
import type { App } from "../types";
import ModalPreview from "@/components/modals/ModalPreview.vue";

const KEYBOARD_SHORTCUTS = {
    ESCAPE: 'Escape', F2: 'F2', F5: 'F5', DELETE: 'Delete', ENTER: 'Enter',
    BACKSLASH: 'Backslash', KEY_A: 'KeyA', KEY_E: 'KeyE', KEY_F: 'KeyF',
    SPACE: 'Space',
} as const;

export function useHotkeyActions(app: App) {
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
        if (e.code === KEYBOARD_SHORTCUTS.ESCAPE) { app.modal.close(); (app.root as HTMLElement).focus(); }
        if (app.modal.visible) return;
        if (app.fs.searchMode) return;
        if (e.code === KEYBOARD_SHORTCUTS.F2 && app.features.includes(FEATURES.RENAME)) {
            (app.selected.length !== 1) || app.modal.open(ModalRename, {items: app.selected})
        }
        if (e.code === KEYBOARD_SHORTCUTS.F5) {
            app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
        }
        if (e.code === KEYBOARD_SHORTCUTS.DELETE) {
            (!app.selected.length) || app.modal.open(ModalDelete, {items: app.selected})
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) app.modal.open(ModalAbout)
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && app.features.includes(FEATURES.SEARCH)) {
            app.fs.searchMode = true; e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
            app.showTreeView = !app.showTreeView; app.storage.setStore('show-tree-view', app.showTreeView); e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.ENTER) { app.fullScreen = !app.fullScreen; (app.root as HTMLElement).focus(); }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) { app.emitter.emit('vf-select-all'); e.preventDefault() }
        if (e.code === KEYBOARD_SHORTCUTS.SPACE) {
            (app.selected.length !== 1) || app.modal.open(ModalPreview, {adapter: app.fs.adapter, item: app.selected[0]})
        }
    };

    onMounted(() => { app.root.addEventListener("keydown", handleKeyboardShortcuts); });
    onBeforeUnmount(() => { app.root.removeEventListener("keydown", handleKeyboardShortcuts)})
}


