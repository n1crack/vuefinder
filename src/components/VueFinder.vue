<script setup lang="ts">
import {inject, onMounted, provide, watch} from 'vue';
import {useStore} from '@nanostores/vue';
import ServiceContainer from '../ServiceContainer';
import {useHotkeyActions} from '../composables/useHotkeyActions';

import MenuBar from '../components/MenuBar.vue';
import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';
import TreeView from '../components/TreeView.vue';
import {menuItems as contextMenuItems} from '../utils/contextmenu';
import type {VueFinderProps, DirEntry} from '../types';

const emit = defineEmits(['select', 'path-change', 'upload-complete', 'delete-complete', 'error', 'ready', 'file-dclick', 'folder-dclick'])

const props = withDefaults(defineProps<VueFinderProps>(), {
  id: 'vf',
  persist: false,
  path: '',
  features: true,
  debug: false,
  theme: 'system',
  locale: undefined as string | undefined,
  maxFileSize: '10mb',
  fullScreen: false,
  showTreeView: false,
  pinnedFolders: () => [],
  showThumbnails: true,
  loadingIndicator: 'linear',
  contextMenuItems: () => contextMenuItems,
})

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions') || {});
provide('ServiceContainer', app);
const config = app.config;

const fs = app.fs;

// Use nanostores reactive values for template reactivity
const configState = useStore(config.state);

useHotkeyActions(app);

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
  const {params, body = null, onSuccess = null, onError = null, dontCloseModal = false, dontChangePath = false} = event as {
    params: Record<string, unknown>,
    body?: unknown,
    onSuccess?: ((data: unknown) => void) | null,
    onError?: ((error: unknown) => void) | null,
    dontCloseModal?: boolean
    dontChangePath?: boolean
  };
  // Fill missing storage/path for common queries
 if (!dontChangePath) {
  if (['index', 'search'].includes(params.q as string)) {
    if (controller) {
      controller.abort();
    }
    fs.setLoading(true);
  }
 }

  controller = new AbortController();
  const signal = controller.signal;
  app.requester.send({
    url: '',
    method: (params.m as 'get' | 'post' | 'put' | 'delete' | 'patch') || 'get',
    params: params as Record<string, string | null | undefined>,
    body: body as Record<string, string | null | undefined> | FormData | undefined,
    abortSignal: signal,
  }).then((data) => {
    const responseData = data as Record<string, unknown>;
    if (!dontChangePath) {
      fs.setPath(responseData.dirname as string);
      if (config.get('persist')) {
         config.set('path', responseData.dirname as string);
      }

      if (!dontCloseModal) {
        app.modal.close();
      }
      // Sync store path from backend dirname so breadcrumbs render correctly
      fs.setFiles(responseData.files as DirEntry[]);

      fs.clearSelection();
      fs.setSelectedCount(0);
      fs.setStorages(responseData.storages as string[]);
    }
    if (onSuccess) {
      onSuccess(responseData);
    }
  }).catch((e: unknown) => {
    console.error(e)
    if (onError) {
      onError(e);
    } else {
      if (e && typeof e === 'object' && 'message' in e) {
        app.emitter.emit('vf-toast-push', {label: (e as {message: string}).message, type: 'error'})
      }
    }
    // Emit error event
    emit('error', e)
  }).finally(() => {
    if (['index', 'search'].includes(params.q as string)) {
      fs.setLoading(false);
    }
  });
});

/**
 * fetchPath fetches the items of the given path
 * if no path is given, the backend should return the root of the current storage
 * @param path {string | undefined} example: 'media://public'
 */
function fetchPath(path: string | undefined) {
  let pathExists: Record<string, unknown> = {};

  if (path && path.includes("://")) {
    pathExists = {
      storage: path.split("://")[0],
      path: path
    };
  } 

  app.emitter.emit('vf-fetch', {
    params: {q: 'index', storage: fs.path.get().storage, ...pathExists},
    onError: props.onError ?? ((e: unknown) => {
      if (e && typeof e === 'object' && 'message' in e) {
        app.emitter.emit('vf-toast-push', {label: (e as {message: string}).message, type: 'error'})
      }
    })
  });
}

// fetch initial data
onMounted(() => {
    watch(() => props.path, (path) => {
        fetchPath(path)
    })

    const initialPath = config.get('persist') ? config.get('path') : props.path;
    fs.setPath(initialPath); 
    fetchPath(initialPath);

  // Emit path-change event based on store path
  fs.path.listen((path) => {
    emit('path-change', path.path)
  })
  
  // Emit select event based on store selected items
  fs.selectedItems.listen((items) => {
    emit('select', items);
  })
  
  // Emit ready event when VueFinder is initialized
  emit('ready')
  

});

</script>

<template>
  <div class="vuefinder vuefinder__main" ref="root" tabindex="0">
    <div :class="app.theme.actualValue" style="height: 100%; width: 100%;">
      <div
          :class="(configState as any)?.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'"
          class="vuefinder__main__container"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')"
          @touchstart="app.emitter.emit('vf-contextmenu-hide')"
      >
        <MenuBar/>
        <Toolbar/>
        <Breadcrumb/>
        <div class="vuefinder__main__content">
          <TreeView/>
          <Explorer 
            :on-file-dclick="props.onFileDclick"
            :on-folder-dclick="props.onFolderDclick"
          />
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
