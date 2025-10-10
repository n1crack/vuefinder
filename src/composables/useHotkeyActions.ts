import {onMounted, onBeforeUnmount} from 'vue';
import {FEATURES} from "../features";
import ModalAbout from "@/components/modals/ModalAbout.vue";
import ModalDelete from "@/components/modals/ModalDelete.vue";
import ModalRename from "@/components/modals/ModalRename.vue";
import ModalPreview from "@/components/modals/ModalPreview.vue";
import { useSearchStore } from '@/stores/search';
import { useFilesStore } from '@/stores/files';
import { useConfigStore } from '@/stores/config';

const KEYBOARD_SHORTCUTS = {
    ESCAPE: 'Escape', F2: 'F2', F5: 'F5', DELETE: 'Delete', ENTER: 'Enter',
    BACKSLASH: 'Backslash', KEY_A: 'KeyA', KEY_E: 'KeyE', KEY_F: 'KeyF',
    SPACE: 'Space',
} as const;

export function useHotkeyActions(app: any) {
    const search = useSearchStore();
    const fs = useFilesStore();
    const config = useConfigStore();
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
        if (e.code === KEYBOARD_SHORTCUTS.ESCAPE) { app.modal.close(); (app.root as HTMLElement).focus(); }
        if (app.modal.visible) return;
        if (search.searchMode) return;
        if (e.code === KEYBOARD_SHORTCUTS.F2 && app.features.includes(FEATURES.RENAME)) {
            if (fs.selectedItems.length === 1) {
                app.modal.open(ModalRename, {items: fs.selectedItems})
            }
        }
        if (e.code === KEYBOARD_SHORTCUTS.F5) {
            app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: fs.path.storage, path: fs.path.path}});
        }
        if (e.code === KEYBOARD_SHORTCUTS.DELETE) { 
            if (fs.selectedItems.length === 0) {
                app.modal.open(ModalDelete, {items: fs.selectedItems})
            }
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) app.modal.open(ModalAbout)
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && app.features.includes(FEATURES.SEARCH)) {
            search.enterSearchMode(); e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
            config.toggle('showTreeView'); 
            e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.ENTER) { 
            config.toggle('fullScreen');
            (app.root as HTMLElement).focus(); 
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) { app.emitter.emit('vf-select-all'); e.preventDefault() }
        if (e.code === KEYBOARD_SHORTCUTS.SPACE) {
            if (fs.selectedItems.length === 1 && fs.selectedItems[0]?.type !== 'dir') {
                app.modal.open(ModalPreview, {adapter: fs.path.storage, item: fs.selectedItems[0]})
            }
        }
    };

    onMounted(() => { app.root.addEventListener("keydown", handleKeyboardShortcuts); });
    onBeforeUnmount(() => { app.root.removeEventListener("keydown", handleKeyboardShortcuts)})
}


