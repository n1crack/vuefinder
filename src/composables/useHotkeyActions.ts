import {onMounted, onBeforeUnmount} from 'vue';
import {useStore} from '@nanostores/vue';
import {FEATURES} from "../features";
import ModalAbout from "../components/modals/ModalAbout.vue";
import ModalDelete from "../components/modals/ModalDelete.vue";
import ModalRename from "../components/modals/ModalRename.vue";
import ModalPreview from "../components/modals/ModalPreview.vue";
import ModalMove from '../components/modals/ModalMove.vue';
import ModalCopy from '../components/modals/ModalCopy.vue';

const KEYBOARD_SHORTCUTS = {
    ESCAPE: 'Escape', F2: 'F2', F5: 'F5', DELETE: 'Delete', ENTER: 'Enter',
    BACKSLASH: 'Backslash', KEY_A: 'KeyA', KEY_E: 'KeyE', KEY_F: 'KeyF',
    SPACE: 'Space', KEY_C: 'KeyC', KEY_X: 'KeyX', KEY_V: 'KeyV',
} as const;

export function useHotkeyActions(app: any) {
    const search = app.search;
    const fs = app.fs;
    const config = app.config;
    
    // Use nanostores reactive values
    const searchState = useStore(search.state);
    const selectedItems = useStore(fs.selectedItems);
    
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
        if (e.code === KEYBOARD_SHORTCUTS.ESCAPE) { 
            app.modal.close(); 
            (app.root as HTMLElement).focus(); 
        }
        if (app.modal.visible) return;
        if (searchState.value?.searchMode) return;
        if (e.code === KEYBOARD_SHORTCUTS.F2 && app.features.includes(FEATURES.RENAME)) {
            if (selectedItems.value.length === 1) {
                app.modal.open(ModalRename, {items: selectedItems.value})
            }
        }
        if (e.code === KEYBOARD_SHORTCUTS.F5) {
            app.emitter.emit('vf-fetch', {params: {q: 'index', storage: fs.path.get().storage, path: fs.path.get().path}});
        }
        if (e.code === KEYBOARD_SHORTCUTS.DELETE) { 
            if (selectedItems.value.length === 0) {
                app.modal.open(ModalDelete, {items: selectedItems.value})
            }
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.BACKSLASH) app.modal.open(ModalAbout)
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_F && app.features.includes(FEATURES.SEARCH)) {
            search.enterSearchMode(); 
            e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_E) {
            config.toggle('showTreeView'); 
            e.preventDefault();
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.ENTER) { 
            config.toggle('fullScreen');
            (app.root as HTMLElement).focus(); 
        }
        if (e.ctrlKey && e.code === KEYBOARD_SHORTCUTS.KEY_A) {
            fs.selectAll();
            e.preventDefault()
        }
        if (e.code === KEYBOARD_SHORTCUTS.SPACE) {
            if (selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir') {
                app.modal.open(ModalPreview, {storage: fs.path.get().storage, item: selectedItems.value[0]})
            }
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_C) {
            if (selectedItems.value.length === 0) {
                app.emitter.emit('vf-toast-push', {type: 'error', label: app.i18n.t('No items selected')});
                return;
            };
            fs.setClipboard('copy', new Set(selectedItems.value.map(item => item.path)));
            app.emitter.emit('vf-toast-push', {label: selectedItems.value.length === 1 ? app.i18n.t('Item copied to clipboard') : app.i18n.t('%s items copied to clipboard', selectedItems.value.length)});
            e.preventDefault();
        }

        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_X) {
            if (selectedItems.value.length === 0) {
                app.emitter.emit('vf-toast-push', {type: 'error', label: app.i18n.t('No items selected')});
                return;
            };
            fs.setClipboard('cut', new Set(selectedItems.value.map(item => item.path)));
            app.emitter.emit('vf-toast-push', {label: selectedItems.value.length === 1 ? app.i18n.t('Item cut to clipboard') : app.i18n.t('%s items cut to clipboard', selectedItems.value.length)});
            e.preventDefault();
        }
        
        if (e.metaKey && e.code === KEYBOARD_SHORTCUTS.KEY_V) {
            if (fs.getClipboard().items.size === 0) {
                app.emitter.emit('vf-toast-push', {type: 'error', label: app.i18n.t('No items in clipboard')});
                return;
            };
            if (fs.getClipboard().path === fs.path.get().path) {
                app.emitter.emit('vf-toast-push', {type: 'error', label: app.i18n.t('Cannot paste items to the same directory')});
                return;
            };
            if (fs.getClipboard().type === 'cut') {
                app.modal.open(ModalMove, {items: {from: fs.getClipboard().items, to: fs.path}});
                fs.clearClipboard();
                return;
            };
            if (fs.getClipboard().type === 'copy') {
                app.modal.open(ModalCopy, {items: {from: fs.getClipboard().items, to: fs.path}});
                return;
            };
            
            e.preventDefault();
        }
    };

    onMounted(() => { app.root.addEventListener("keydown", handleKeyboardShortcuts); });
    onBeforeUnmount(() => { app.root.removeEventListener("keydown", handleKeyboardShortcuts)})
}


