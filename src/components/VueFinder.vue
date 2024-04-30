<template>
  <div class="vuefinder" ref="root">
    <div :class="app.theme.actualValue">
      <div
          :class="app.fullScreen ? 'fixed w-screen inset-0 z-20' : 'relative rounded'"
          :style="!app.fullScreen ? 'max-height: ' + maxHeight : ''"
          class="border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"
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
import {inject, onMounted, provide, ref} from 'vue';
import ServiceContainer from "../ServiceContainer.js";

import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';

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
    default: '.',
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
  Object.assign(app.data, data);
  app.emitter.emit('vf-explorer-update');
};

/** @type {AbortController} */
let controller;
app.emitter.on('vf-fetch-abort', () => {
  controller.abort();
  app.loading = false;
});

// Fetch data
app.emitter.on('vf-fetch', ({params, body = null, onSuccess = null, onError = null, noCloseModal = false}) => {
  if (['index', 'search'].includes(params.q)) {
    if (controller) {
      controller.abort();
    }
    app.loading = true;
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
    app.adapter = data.adapter;
    if (app.persist) {
      app.path = data.dirname;
      setStore('path', app.path);
    }

    if (['index', 'search'].includes(params.q)) {
      app.loading = false;
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

// Download
app.emitter.on('vf-download', (url) => {
  const $a = document.createElement('a');
  $a.style.display = 'none';
  $a.target = '_blank';
  $a.href = url;
  // Cross-origin this doesn't work, but at least this does bring up a new window.
  $a.download = url;
  app.root.appendChild($a);
  $a.click();
  $a.remove();
});

// fetch initial data
onMounted(() => {
  // app.adapter can be null at first, until we get the adapter list it will be the first one from response
  // later we can set default adapter from a prop value

  // if there is a path coming from the prop, we should use it.
  let pathExists = {};
  if (app.path.includes("://")) {
    pathExists = {
      adapter: app.path.split("://")[0],
      path: app.path
    };
  }

  // Emit select event
  ds.onSelect((items) => {
    emit('select', items);
  });

  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.adapter, ...pathExists}});
});

</script>
