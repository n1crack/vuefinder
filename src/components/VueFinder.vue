<template>
  <div class="vuefinder" ref="root">
    <div :class="app.theme.actualValue === 'dark' ? 'dark': ''">
      <div
          :class="app.fullScreen ? 'fixed w-screen inset-0 z-20' : 'relative rounded-md'"
          :style="!app.fullScreen ? 'max-height: ' + maxHeight : ''"
          class="border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')"
          @touchstart="app.emitter.emit('vf-contextmenu-hide')">
        <v-f-toolbar/>
        <v-f-breadcrumb/>
        <v-f-explorer/>
        <v-f-statusbar/>
      </div>

      <Transition name="fade">
        <component v-if="app.modal.active" :is="'v-f-modal-'+ app.modal.type"/>
      </Transition>

      <v-f-context-menu/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {inject, onMounted, provide, ref} from 'vue';
import ServiceContainer from "../ServiceContainer.js";

import VFToolbar from '../components/Toolbar.vue';
import VFBreadcrumb from '../components/Breadcrumb.vue';
import VFExplorer from '../components/Explorer.vue';
import VFContextMenu from '../components/ContextMenu.vue';
import VFStatusbar from '../components/Statusbar.vue';

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

// Translator
const {t} = app.i18n;

app.emitter.on('vf-modal-close', () => {
  app.modal.active = false;
});

app.emitter.on('vf-modal-show', (item) => {
  app.modal.active = true;
  app.modal.type = item.type;
  app.modal.data = item;
});

const updateItems = (data) => {
  Object.assign(app.data, data);
  app.emitter.emit('vf-nodes-selected', {});
  app.emitter.emit('vf-explorer-update');
};

app.emitter.on('vf-nodes-selected', (items) => {
  app.selectedItems = items;
  emit('select', items);
})

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
      app.emitter.emit('vf-modal-close');
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

  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.adapter, ...pathExists}});
});

</script>
