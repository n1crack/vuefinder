<template>
  <div class="vuefinder" ref="root" tabindex="0">
    <div :class="app.theme.actualValue">
      <div
          :class="app.fullScreen ? 'fixed w-screen inset-0 z-20' : 'relative rounded'"
          :style="!app.fullScreen ? 'max-height: ' + maxHeight : ''"
          class="border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')"
          @touchstart="app.emitter.emit('vf-contextmenu-hide')">
        <Toolbar/>
        <Breadcrumb/>
        <Explorer/>
        <Statusbar/>
      </div>

      <Transition name="fade">
        <Component v-if="app.modal.visible" :is="app.modal.type"/>
      </Transition>

      <ContextMenu/>
    </div>
  </div>
</template>

<script setup>
import {computed, inject, onMounted, onUnmounted, provide, ref} from 'vue';
import ServiceContainer from "../ServiceContainer.js";

import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';
import ModalDelete from "./modals/ModalDelete.vue";
import ModalAbout from './modals/ModalAbout.vue';

const emit = defineEmits(['select'])

const props = defineProps({
  id: {
    type: String,
    default: 'vf'
  },
  request: {
    type: [String, Object],
    required: true,
  },
  persist: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: '',
  },
  features: {
    type: [Array, Boolean],
    default: true,
  },
  debug: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'system',
  },
  locale: {
    type: String,
    default: null
  },
  maxHeight: {
    type: String,
    default: '600px'
  },
  maxFileSize: {
    type: String,
    default: '10mb'
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  showThumbnails: {
    type: Boolean,
    default: true
  },
  selectButton: {
    type: Object,
    default(rawProps) {
      return {
        active: false,
        multiple: false,
        click: (items) => {
          // items is an array of selected items
          // 
        },
        ...rawProps,
      }
    },
  },
});

const shortcutsListener = (e) => {
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
        app.modal.close();
        root.value.focus();
    }

    if (app.modal.visible) {
        return;
    }
    if (e.key === 'F5') {
        console.log('F5 refresh');
        app.emitter.emit('vf-fetch', { params: { q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname } });
    }

    if (e.key === 'Delete') {
        console.log('Delete key pressed');
        (!app.dragSelect.getCount()) || app.modal.open(ModalDelete, { items: app.dragSelect.getSelected() })
    }

    if (e.metaKey && e.code === 'Backslash') {
        console.log('Open Settings');
        app.modal.open(ModalAbout)
    }

    if (e.metaKey && e.code === 'KeyF') {
        console.log('Search mode');
        app.fs.searchMode = true;
        e.preventDefault();
    }

    if (e.metaKey && e.code === 'KeyA') {
        console.log('Select All');
        app.dragSelect.selectAll();
        e.preventDefault()
    }
};

onMounted(() => {
    root.value.addEventListener("keydown", shortcutsListener);
});

onUnmounted(() => {
    root.value.removeEventListener("keydown", shortcutsListener);
});

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions'));
provide('ServiceContainer', app);
const {setStore} = app.storage;

//  Define root element
const root = ref(null);
app.root = root;

// Define dragSelect object
const ds = app.dragSelect;

const updateItems = (data) => {
  Object.assign(app.fs.data, data);
  ds.clearSelection();
  ds.refreshSelection();
};

/** @type {AbortController} */
let controller;
app.emitter.on('vf-fetch-abort', () => {
  controller.abort();
  app.fs.loading = false;
});

// Fetch data
app.emitter.on('vf-fetch', ({params, body = null, onSuccess = null, onError = null, noCloseModal = false}) => {
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
  }).then(data => {
    app.fs.adapter = data.adapter;
    if (app.persist) {
      app.fs.path = data.dirname;
      setStore('path', app.fs.path);
    }

    if (['index', 'search'].includes(params.q)) {
      app.fs.loading = false;
    }
    if (!noCloseModal) {
      app.modal.close();
    }
    updateItems(data);
    if (onSuccess) {
      onSuccess(data);
    }
  }).catch((e) => {
    console.error(e)
    if (onError) {
      onError(e);
    }
  });
});

// fetch initial data
onMounted(() => {
  // app.fs.adapter can be null at first, until we get the adapter list it will be the first one from response
  // later we can set default adapter from a prop value

  // if there is a path coming from the prop, we should use it.
  let pathExists = {};

  if (app.fs.path.includes("://")) {
    pathExists = {
      adapter: app.fs.path.split("://")[0],
      path: app.fs.path
    };
  }

  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, ...pathExists}});

  // Emit select event
  ds.onSelect((items) => {
    emit('select', items);
  });

});

</script>
