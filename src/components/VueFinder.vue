<template>
  <div class="vuefinder" ref="root">
    <div :class="app.darkMode ? 'dark': ''">
      <div
          :class="app.fullscreen ? 'fixed w-screen inset-0 z-20' : 'relative rounded-md'"
          :style="!app.fullscreen ? 'max-height: ' + maxHeight : ''"
          class="border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"
          @mousedown="app.emitter.emit('vf-contextmenu-hide')" @touchstart="app.emitter.emit('vf-contextmenu-hide')">
        <v-f-toolbar :data="fetchData" />
        <v-f-breadcrumb :data="fetchData"/>
        <v-f-explorer :data="fetchData"/>
        <v-f-statusbar :data="fetchData"/>
      </div>

      <Transition name="fade">
       <component v-if="app.modal.active" :is="'v-f-modal-'+ app.modal.type" :selection="app.modal.data" :current="fetchData"/>
      </Transition>

      <v-f-context-menu :current="fetchData"/>

      <downloader />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {computed, inject, onMounted, provide, reactive, ref, watch} from 'vue';
import { buildRequester } from '../utils/ajax.js';
import {useStorage} from '../composables/useStorage.js';
import VFToolbar from '../components/Toolbar.vue';
import VFExplorer from '../components/Explorer.vue';
import VFStatusbar from '../components/Statusbar.vue';
import VFBreadcrumb from '../components/Breadcrumb.vue';
import VFContextMenu from '../components/ContextMenu.vue';
import {useI18n} from '../composables/useI18n.js';
import { FEATURE_ALL_NAMES } from "./features.js";

const props = defineProps({
  request: {
    type: [String, Object],
    required: true,
  },
  features: {
    type: [Array, Boolean],
    default: true,
  },
  debug: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: 'vf'
  },
  dark: {
    type: Boolean,
    default: false
  },
  locale: {
      type: String,
      default: 'en'
  },
  maxHeight: {
    type: String,
    default: '600px'
  },
  maxFileSize: {
    type: String,
    default: '10mb'
  },
});
const {getStore} = useStorage(props.id);
const adapter =ref(getStore('adapter'));

const emit = defineEmits(['select'])

/** @type import('vue').Ref<HTMLDivElement> */

provide('storage', useStorage(props.id));
provide('adapter', adapter);
provide('maxFileSize', props.maxFileSize);
provide('debug', props.debug);
// use reactive instead of ref to be able to use one object for all components

// the object is passed to all components as props
const app = inject('VueFinder');

// Requester
app.requester = buildRequester(props.request);

//  Define root element
const root = ref(null);
app.root = root;

// Features
if (Array.isArray(props.features)) {
  app.features.push(...props.features);
} else if (props.features === true) {
  app.features.push(...FEATURE_ALL_NAMES);
}

// Lang Management
const i18n = useI18n(props.id, props.locale, app.emitter);
const {t} = i18n;
provide('i18n', i18n);

const fetchData = reactive({adapter: adapter.value, storages: [], dirname: '.', files: []});

// Dark mode todo: add system dark mode detection
app.darkMode = ref(getStore('darkMode', props.dark));

// unit switcher (for example: GB vs GiB)
app.metricUnits = getStore('metricUnits', false);
import { format as filesizeDefault, metricFormat as filesizeMetric } from './../utils/filesize.js'
import Downloader from "./Downloader.vue";
app.filesize = app.metricUnits ?  filesizeMetric  : filesizeDefault;

app.emitter.on('vf-modal-close', () => {
  app.modal.active = false;
});

app.emitter.on('vf-modal-show', (item) => {
  app.modal.active = true;
  app.modal.type = item.type;
  app.modal.data = item;
});

const updateItems = (data) => {
  Object.assign(fetchData, data);
  app.emitter.emit('vf-nodes-selected', {});
  app.emitter.emit('vf-explorer-update');
};

app.emitter.on('vf-nodes-selected', (items) => {
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
    adapter.value = data.adapter;
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

// fetch initial data
onMounted(() => {
  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: (adapter.value)}});
});

</script>
