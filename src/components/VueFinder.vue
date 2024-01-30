<template>
  <div class="vuefinder" ref="root">
    <div :class="darkMode ? 'dark': ''">
      <div
          :class="fullScreen ? 'fixed w-screen inset-0 z-20' : 'relative rounded-md'"
          :style="!fullScreen ? 'max-height: ' + maxHeight : ''"
          class="border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"
          @mousedown="emitter.emit('vf-contextmenu-hide')" @touchstart="emitter.emit('vf-contextmenu-hide')">
        <v-f-toolbar :data="fetchData" />
        <v-f-breadcrumb :data="fetchData"/>
        <v-f-explorer :view="view" :data="fetchData"/>
        <v-f-statusbar :data="fetchData"/>
      </div>

      <Transition name="fade">
       <component v-if="modal.active" :is="'v-f-modal-'+ modal.type" :selection="modal.data" :current="fetchData"/>
      </Transition>

      <v-f-context-menu :current="fetchData"/>

      <iframe ref="downloadFrame" style="display:none;"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {computed, onMounted, provide, reactive, ref, watch} from 'vue';
import mitt from 'mitt';
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
  usePropDarkMode: {
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
const emitter = mitt();
const {setStore, getStore} = useStorage(props.id);
const adapter =ref(getStore('adapter'));

const emit = defineEmits(['select'])

/** @type import('vue').Ref<HTMLDivElement> */
const root = ref(null);
provide('root', root);
provide('emitter', emitter);
provide('storage', useStorage(props.id));
provide('adapter', adapter);
provide('maxFileSize', props.maxFileSize);
provide('usePropDarkMode', props.usePropDarkMode);
provide('debug', props.debug);
// use reactive instead of ref to be able to use one object for all components

// Requester
const requester = buildRequester(props.request);
provide('requester', requester);

// Features
/** @type {import('vue').Ref<String[]>} */
const features = ref([]);
if (Array.isArray(props.features)) {
  features.value.push(...props.features);
} else if (props.features === true) {
  features.value.push(...FEATURE_ALL_NAMES);
}
provide('features', features);

// Lang Management
const i18n = useI18n(props.id, props.locale, emitter);
const {t} = i18n;
provide('i18n', i18n);

const fetchData = reactive({adapter: adapter.value, storages: [], dirname: '.', files: []});

// View Management
const view = ref(getStore('viewport', 'grid'));
// dark mode
const darkMode = props.usePropDarkMode ? computed(() => props.dark) : ref(getStore('darkMode', props.dark));
provide('darkMode', darkMode);

emitter.on('vf-darkMode-toggle', () => {
  darkMode.value = !darkMode.value;
  setStore('darkMode', darkMode.value);
});

// unit switcher (for example: GB vs GiB)
const metricUnits = ref(getStore('metricUnits', false));
provide('metricUnits', metricUnits);
import { format as filesizeDefault, metricFormat as filesizeMetric } from './../utils/filesize.js'
const filesize = ref(metricUnits.value ?  filesizeMetric  : filesizeDefault)
watch(metricUnits, (value) => {
  filesize.value = value ?  filesizeMetric  : filesizeDefault
})
provide('filesize', filesize);

emitter.on('vf-metric-units-saved', (value) => {
  metricUnits.value = value;
  setStore('metricUnits', value);
});

const loadingState = ref(false);
provide('loadingState', loadingState);

const fullScreen = ref(getStore('full-screen', false));

emitter.on('vf-fullscreen-toggle', () => {
  fullScreen.value = !fullScreen.value;
  setStore('full-screen', fullScreen.value);
});

emitter.on('vf-view-toggle', (newView) => {
  view.value = newView;
});

// Modal Management
const modal = reactive({
  active: false,
  type: 'delete',
  data: {}
});

emitter.on('vf-modal-close', () => {
  modal.active = false;
});

emitter.on('vf-modal-show', (item) => {
  modal.active = true;
  modal.type = item.type;
  modal.data = item;
});

const updateItems = (data) => {
  Object.assign(fetchData, data);
  emitter.emit('vf-nodes-selected', {});
  emitter.emit('vf-explorer-update');
};

emitter.on('vf-nodes-selected', (items) => {
  emit('select', items);
})

/** @type {AbortController} */
let controller;
emitter.on('vf-fetch-abort', () => {
  controller.abort();
  loadingState.value = false;
});

emitter.on('vf-fetch', ({params, body = null, onSuccess = null, onError = null, noCloseModal = false}) => {
  if (['index', 'search'].includes(params.q)) {
    if (controller) {
      controller.abort();
    }
    loadingState.value = true;
  }

  controller = new AbortController();
  const signal = controller.signal;
  requester.send({
    url: '',
    method: params.m || 'get',
    params,
    body,
    abortSignal: signal,
  }).then(data => {
    adapter.value = data.adapter;
    if (['index', 'search'].includes(params.q)) {
      loadingState.value = false;
    }
    if (!noCloseModal) {
      emitter.emit('vf-modal-close');
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

/** @type {import('vue').Ref<HTMLIFrameElement>} */
const downloadFrame = ref(null)

emitter.on('vf-download', (url) => {
  downloadFrame.value.src = url;
  emitter.emit('vf-modal-close');
});

onMounted(() => {
  emitter.emit('vf-fetch', {params: {q: 'index', adapter: (adapter.value)}});
});

</script>
