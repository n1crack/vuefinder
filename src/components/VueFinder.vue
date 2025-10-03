<script setup lang="ts">
import {inject, onMounted, provide, ref, watch} from 'vue';
// @ts-ignore
import ServiceContainer from '@/ServiceContainer.js';
import {useHotkeyActions} from '@/composables/useHotkeyActions';
import {useCopyPaste} from '@/composables/useCopyPaste';

import Toolbar from '@/components/Toolbar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Explorer from '@/components/Explorer.vue';
import NewExplorer from '@/components/NewExplorer.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import Statusbar from '@/components/Statusbar.vue';
import TreeView from '@/components/TreeView.vue';
import {menuItems as contextMenuItems} from '@/utils/contextmenu';
import type {VueFinderProps} from '@/types';

const emit = defineEmits(['select', 'update:path'])

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
      click: (items) => {
        // items is an array of selected items
        //
      },
    }
  },
  loadingIndicator: 'circular',
  contextMenuItems: () => contextMenuItems,
})

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions'));
provide('ServiceContainer', app);
const {setStore} = app.storage;

//  Define root element
const root = ref(null);
app.root = root;

// Define dragSelect object
const ds = app.dragSelect;

useHotkeyActions(app);
useCopyPaste(app);

const updateItems = (data: any) => {
  Object.assign(app.fs.data, data);
  ds.clearSelection();
  ds.refreshSelection();
};

/** @type {AbortController} */
let controller: AbortController | null = null;
app.emitter.on('vf-fetch-abort', () => {
  if (controller) {
    controller.abort();
  }
  app.fs.loading = false;
});

// Fetch data
app.emitter.on('vf-fetch', ({params, body = null, onSuccess = null, onError = null, noCloseModal = false}: {
  params: any,
  body?: any,
  onSuccess?: any,
  onError?: any,
  noCloseModal?: boolean
}) => {
  if (['index', 'search'].includes(params.q)) {
    if (controller) {
      controller.abort();
    }
    app.fs.loading = true;
  }

  controller = new AbortController();
  const signal = controller.signal;
  app.requester.send({
    url: '',
    method: params.m || 'get',
    params,
    body,
    abortSignal: signal,
  }).then((data: any) => {
    app.fs.adapter = data.adapter;
    if (app.persist) {
      app.fs.path = data.dirname;
      setStore('path', app.fs.path);
    }


    if (!noCloseModal) {
      app.modal.close();
    }
    updateItems(data);
    if (onSuccess) {
      onSuccess(data);
    }
  }).catch((e: any) => {
    console.error(e)
    if (onError) {
      onError(e);
    } else {
      if (e.message) {
        app.emitter.emit('vf-toast-push', {label: e.message, type: 'error'})
      }
    }
  }).finally(() => {
    if (['index', 'search'].includes(params.q)) {
      app.fs.loading = false;
    }
  });
});

/**
 * fetchPath fetches the items of the given path
 * if no path is given, the backend should return the root of the current adapter
 * @param path {string | undefined} example: 'media://public'
 */
function fetchPath(path: string | undefined) {
  let pathExists: any = {};

  if (path && path.includes("://")) {
    pathExists = {
      adapter: path.split("://")[0],
      path: path
    };
  }

  app.emitter.emit('vf-fetch', {
    params: {q: 'index', adapter: app.fs.adapter, ...pathExists},
    onError: props.onError ?? ((e: any) => {
      if (e.message) {
        app.emitter.emit('vf-toast-push', {label: e.message, type: 'error'})
      }
    })
  });
}

// fetch initial data
onMounted(() => {
  // app.fs.adapter can be null at first, until we get the adapter list it will be the first one from response
  // later we can set default adapter from a prop value

  // if there is a path coming from the prop, we should use it.
  fetchPath(app.fs.path)

  // We re-fetch the data if the path prop is updated
  watch(() => props.path, (path) => {
    fetchPath(path)
  })

  // Emit select event
  ds.onSelect((items: any) => {
    emit('select', items);
  });

  // Emit update:path event
  watch(() => app.fs.data.dirname, (path) => {
    emit('update:path', path)
  })

});

</script>

<template>
  <div class="vuefinder" ref="root" tabindex="0">
    <div :class="app.theme.actualValue">
      <div
          :class="app.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'"
          :style="!app.fullScreen ? 'max-height: ' + maxHeight : ''"
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
    <NewExplorer/>
  </div>
</template>
