<script setup lang="ts">
import {inject, onMounted, provide, ref, useTemplateRef, watch} from 'vue';
import ServiceContainer from '@/ServiceContainer';
import {useHotkeyActions} from '@/composables/useHotkeyActions';

import Toolbar from '@/components/Toolbar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Explorer from '@/components/Explorer.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Statusbar from '@/components/Statusbar.vue';
import TreeView from '@/components/TreeView.vue';
import {menuItems as contextMenuItems} from '@/utils/contextmenu';
import type {VueFinderProps, DirEntry} from '@/types';
import { useFilesStore } from '@/stores/files';
import { useConfigStore } from '@/stores/config';

const emit = defineEmits(['select', 'update:path'])

const config = useConfigStore();


const props = withDefaults(defineProps<VueFinderProps>(), {
  id: 'vf',
  persist: false,
  path: '',
  features: true,
  debug: false,
  theme: 'system',
  locale: undefined as string | undefined,
  maxHeight: '600px',
  maxFileSize: '10mb',
  fullScreen: false,
  showTreeView: false,
  pinnedFolders: () => [],
  showThumbnails: true,
  selectButton: () => {
    return {
      active: false,
      multiple: false,
      click: () => {
        // items is an array of selected items
        //
      },
    }
  },
  loadingIndicator: 'linear',
  contextMenuItems: () => contextMenuItems,
})

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions'));
provide('ServiceContainer', app);

const fs = useFilesStore();

useHotkeyActions(app);

/** @type {AbortController} */
let controller: AbortController | null = null;
app.emitter.on('vf-fetch-abort', () => {
  if (controller) {
    controller.abort();
  }
  fs.setLoading(false);
});

// Fetch data
app.emitter.on('vf-fetch', ({params, body = null, onSuccess = null, onError = null, noCloseModal = false}: {
  params: Record<string, unknown>,
  body?: unknown,
  onSuccess?: ((data: unknown) => void) | null,
  onError?: ((error: unknown) => void) | null,
  noCloseModal?: boolean
}) => {
  // Fill missing adapter/path for common queries
 
  if (['index', 'search'].includes(params.q as string)) {
    if (controller) {
      controller.abort();
    }
    fs.setLoading(true);
  }

  controller = new AbortController();
  const signal = controller.signal;
  app.requester.send({
    url: '',
    method: params.m || 'get',
    params,
    body,
    abortSignal: signal,
  }).then((data: Record<string, unknown>) => {
    fs.setPath(data.dirname as string);
    if (config.persist) {
       config.set('path', data.dirname as string);
    }

    if (!noCloseModal) {
      app.modal.close();
    }
    // Sync store path from backend dirname so breadcrumbs render correctly
    fs.setFiles(data.files as DirEntry[]);

    fs.clearSelection();
    fs.setSelectedCount(0);
    fs.setStorages(data.storages as string[]);
    if (onSuccess) {
      onSuccess(data);
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
  }).finally(() => {
    if (['index', 'search'].includes(params.q as string)) {
      fs.setLoading(false);
    }
  });
});

/**
 * fetchPath fetches the items of the given path
 * if no path is given, the backend should return the root of the current adapter
 * @param path {string | undefined} example: 'media://public'
 */
function fetchPath(path: string | undefined) {
  let pathExists: Record<string, unknown> = {};

  if (path && path.includes("://")) {
    pathExists = {
      adapter: path.split("://")[0],
      path: path
    };
  } 

  app.emitter.emit('vf-fetch', {
    params: {q: 'index', adapter: fs.path.storage, ...pathExists},
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

    const path = config.persist ? config.path : props.path;
    fs.setPath(path); 
    fetchPath(path);

  // Selection events from Explorer
  app.emitter.on('vf-select', (items: unknown[]) => {
    (app as Record<string, unknown>).selectedItems = items;
    emit('select', items);
  });

  // Emit update:path event based on store path
  watch(() => fs.path.path, (path) => {
    emit('update:path', path)
  })

  watch(() => fs.selectedItems, (value) => {
    emit('select', value);
  })

});

</script>

<template>
  <div class="vuefinder" ref="root" tabindex="0">
    <div :class="app.theme.actualValue">
      <div
          :class="config.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'"
          :style="!config.fullScreen ? 'max-height: ' + maxHeight : ''"
          class="vuefinder__main__container"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')"
          @touchstart="app.emitter.emit('vf-contextmenu-hide')"
      >
        <Toolbar/>
        <Breadcrumb/>
        <div class="vuefinder__main__content">
          <TreeView/>
          <Explorer/>
        </div>
        <Statusbar/>
      </div>
      <Transition name="fade">
        <Component v-if="app.modal.visible" :is="app.modal.type"/>
      </Transition>

      <ContextMenu/>
    </div>

  </div>
</template>
