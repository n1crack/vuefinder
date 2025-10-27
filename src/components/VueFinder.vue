<script setup lang="ts">
import {inject, onMounted, provide, watch, ref} from 'vue';
import {useStore} from '@nanostores/vue';
import ServiceContainer from '../ServiceContainer';
import {useHotkeyActions} from '../composables/useHotkeyActions';
import {useExternalDragDrop} from '../composables/useExternalDragDrop';
import {setTheme, type Theme} from '../utils/theme';

import MenuBar from '../components/MenuBar.vue';
import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';
import TreeView from '../components/TreeView.vue';
import ModalUpload from '../components/modals/ModalUpload.vue';
import {menuItems as contextMenuItems} from '../utils/contextmenu';
import type {VueFinderProps, DirEntry} from '../types';

const emit = defineEmits(['select', 'path-change', 'upload-complete', 'delete-complete', 'error', 'ready', 'file-dclick', 'folder-dclick'])

const props = withDefaults(defineProps<VueFinderProps>(), {
  id: 'vf',
  features: true,
  debug: false,
  theme: 'light',
  contextMenuItems: () => contextMenuItems,
  selectionMode: 'multiple',
  selectionFilterType: 'both',
  selectionFilterMimeIncludes: () => [],
})

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions') || {});
provide('ServiceContainer', app);
const config = app.config;

const fs = app.fs;

// Use nanostores reactive values for template reactivity
const configState = useStore(config.state);

useHotkeyActions(app);

const { 
  isDraggingExternal, 
  handleDragEnter, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop
} = useExternalDragDrop();

// Theme management
const currentTheme = ref<Theme>(props.theme as Theme);

// Initialize theme on mount
onMounted(() => {
  const vuefinderElement = document.querySelector('.vuefinder') as HTMLElement;
  if (vuefinderElement) {
    setTheme(props.theme as Theme, vuefinderElement);
    currentTheme.value = props.theme as Theme;
  }
});

// Watch for theme changes
watch(() => props.theme, (newTheme) => {
  if (newTheme && newTheme !== currentTheme.value) {
    const vuefinderElement = document.querySelector('.vuefinder') as HTMLElement;
    if (vuefinderElement) {
      setTheme(newTheme as Theme, vuefinderElement);
      currentTheme.value = newTheme as Theme;
    }
  }
}, { immediate: true });

// Provide theme management to child components
provide('currentTheme', currentTheme);
provide('setTheme', (theme: Theme) => {
  const vuefinderElement = document.querySelector('.vuefinder') as HTMLElement;
  if (vuefinderElement) {
    setTheme(theme, vuefinderElement);
    currentTheme.value = theme;
  }
});

/** @type {AbortController} */
let controller: AbortController | null = null;
app.emitter.on('vf-fetch-abort', () => {
  if (controller) {
    controller.abort();
  }
  fs.setLoading(false);
});

// Listen for upload-complete event
app.emitter.on('vf-upload-complete', (files: unknown) => {
  emit('upload-complete', files as DirEntry[]);
});

// Listen for delete-complete event
app.emitter.on('vf-delete-complete', (deletedItems: unknown) => {
  emit('delete-complete', deletedItems as DirEntry[]);
});

// Listen for custom double-click events
app.emitter.on('vf-file-dclick', (item: unknown) => {
  emit('file-dclick', item as DirEntry);
});

app.emitter.on('vf-folder-dclick', (item: unknown) => {
  emit('folder-dclick', item as DirEntry);
});

// Fetch data
app.emitter.on('vf-fetch', (event: unknown) => {
  const {params, onSuccess = null, onError = null, dontCloseModal = false, dontChangePath = false} = event as {
    params: Record<string, unknown>,
    body?: unknown,
    onSuccess?: ((data: unknown) => void) | null,
    onError?: ((error: unknown) => void) | null,
    dontCloseModal?: boolean
    dontChangePath?: boolean
  };

  // Use adapter for index operation
  if (params.q === 'index') {
    if (!dontChangePath) {
      if (controller) {
        controller.abort();
      }
      fs.setLoading(true);
    }

    controller = new AbortController();

    // Use adapter for listing
    const path = params.path as string | undefined;
    app.adapter.list(path)
      .then((responseData) => {
        if (!dontChangePath) {
          fs.setPath(responseData.dirname);
          if (config.get('persist')) {
            config.set('path', responseData.dirname);
          }
          fs.setReadOnly(responseData.read_only ?? false);

          if (!dontCloseModal) {
            app.modal.close();
          }
          fs.setFiles(responseData.files);
          fs.clearSelection();
          fs.setSelectedCount(0);
          fs.setStorages(responseData.storages);
        }
        if (onSuccess) {
          onSuccess(responseData);
        }
      })
      .catch((e: unknown) => {
        console.error(e);
        if (onError) {
          onError(e);
        } else {
          if (e && typeof e === 'object' && 'message' in e) {
            app.emitter.emit('vf-toast-push', {label: (e as {message: string}).message, type: 'error'});
          }
        }
        emit('error', e);
      })
      .finally(() => {
        fs.setLoading(false);
      });
    return;
  }

  // For now, only index is implemented with adapter
  const error = new Error('Operation not yet implemented with adapter');
  if (onError) {
    onError(error);
  } else {
    app.emitter.emit('vf-toast-push', {label: error.message, type: 'error'});
  }
  emit('error', error);
});

/**
 * fetchPath fetches the items of the given path
 * if no path is given, the backend should return the root of the current storage
 * @param path {string | undefined} example: 'media://public'
 */
function fetchPath(path: string | undefined) {
  app.emitter.emit('vf-fetch', {
    params: {q: 'index', path},
    onError: props.onError ?? ((e: unknown) => {
      if (e && typeof e === 'object' && 'message' in e) {
        app.emitter.emit('vf-toast-push', {label: (e as {message: string}).message, type: 'error'})
      }
    })
  });
}

// fetch initial data
onMounted(() => {
    watch(() => config.get('path'), (path: string | undefined) => {
        fetchPath(path)
    })

    const initialPath = config.get('persist') ? config.get('path') : (config.get('initialPath') ?? '');
    fs.setPath(initialPath); 
    fetchPath(initialPath);

  // Emit path-change event based on store path
  fs.path.listen((path: {path: string}) => {
    emit('path-change', path.path)
  })
  
  // Emit select event based on store selected items
  fs.selectedItems.listen((items) => {
    emit('select', items);
  })
  
  // Emit ready event when VueFinder is initialized
  emit('ready')
});


  // External drag & drop handler
  const handleExternalDrop = async (e: DragEvent) => {
    const droppedFiles = await handleDrop(e);
    if (droppedFiles.length > 0) {
      app.modal.open(ModalUpload);

      setTimeout(() => {
        app.emitter.emit('vf-external-files-dropped', droppedFiles.map(f => f.file));
      }, 100);
    }
  };
</script>

<template>
  <div class="vuefinder vuefinder__main" ref="root" tabindex="0" 
       @dragenter="handleDragEnter" 
       @dragover="handleDragOver" 
       @dragleave="handleDragLeave"
       @drop="handleExternalDrop"
       :class="{ 'vuefinder--dragging-external': isDraggingExternal }">
    <div :class="currentTheme" style="height: 100%; width: 100%;">
      <div
          :class="(configState as any)?.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'"
          class="vuefinder__main__container"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')"
          @touchstart="app.emitter.emit('vf-contextmenu-hide')"
      >
        <!-- External Drag Drop Overlay -->
        <div v-if="isDraggingExternal" class="vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative">
          <div class="vuefinder__external-drop-message">
            {{ app.i18n.t('Drag and drop the files/folders to here.') }}
          </div>
        </div>
        
        <MenuBar/>
        <Toolbar/>
        <Breadcrumb/>
        <div class="vuefinder__main__content">
          <TreeView/>
          <Explorer 
            :on-file-dclick="props.onFileDclick"
            :on-folder-dclick="props.onFolderDclick"
          >
            <template #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </Explorer>
        </div>
        <Statusbar>
          <template #actions="slotProps">
            <slot name="status-bar" v-bind="slotProps" />
          </template>
        </Statusbar>
      </div>
      <Teleport to="body">
        <Transition name="fade">
            <Component v-if="app.modal.visible" :is="app.modal.type"/>
        </Transition>
       </Teleport>
      <ContextMenu/>
    </div>

  </div>
</template>
