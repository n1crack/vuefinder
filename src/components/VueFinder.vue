<template>
  <div class="vuefinder">
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

      <component v-if="modal.active" :is="'v-f-modal-'+ modal.type" :selection="modal.data" :current="fetchData"/>
      <v-f-context-menu :current="fetchData"/>
      <iframe id="download_frame" style="display:none;"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {defineProps, onMounted, provide, reactive, ref} from 'vue';
import ajax from '../utils/ajax.js';
import mitt from 'mitt';
import {useStorage} from '../composables/useStorage.js';
import {useApiUrl} from '../composables/useApiUrl.js';
import VFToolbar from '../components/Toolbar.vue';
import VFExplorer from '../components/Explorer.vue';
import VFStatusbar from '../components/Statusbar.vue';
import VFBreadcrumb from '../components/Breadcrumb.vue';
import VFContextMenu from '../components/ContextMenu.vue';
import {useI18n} from '../composables/useI18n.js';

const props = defineProps({
  url: {
    type: [String],
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
  postData: {
    type: Object,
    default: {}
  }
});
const emitter = mitt();
const {setStore, getStore} = useStorage(props.id);
provide('emitter', emitter);
provide('storage', useStorage(props.id));
provide('postData', props.postData)

// Lang Management
const i18n = useI18n(props.id, props.locale, emitter);
const {t} = i18n;
provide('i18n', i18n);

const {apiUrl, setApiUrl} = useApiUrl();
setApiUrl(props.url)

const fetchData = reactive({adapter:'local', storages: [], dirname: '.', files: []});

// View Management
const view = ref(getStore('viewport', 'grid'));
const darkMode = ref(getStore('darkMode', props.dark));

emitter.on('vf-darkMode-toggle', () => {
  darkMode.value = !darkMode.value;
  setStore('darkMode', darkMode.value)
})

const loadingState = ref(false);

provide('loadingState', loadingState);

const fullScreen = ref(getStore('full-screen', false));

emitter.on('vf-fullscreen-toggle', () => {
   fullScreen.value = !fullScreen.value;
   setStore('full-screen', fullScreen.value)
})

emitter.on('vf-view-toggle', (newView) => {
  view.value = newView;
})

// Modal Management
const modal = reactive({
  active: false,
  type: 'delete',
  data: {}
})

emitter.on('vf-modal-close', () => {
  modal.active = false;
});

emitter.on('vf-modal-show', (item) => {
  modal.active = true;
  modal.type = item.type;
  modal.data = item;
});

const updateItems = (data) => {
  Object.assign(fetchData, data)
  emitter.emit('vf-nodes-selected', {});
  emitter.emit('vf-explorer-update');
}

let controller;
emitter.on('vf-fetch-abort', () => {
  controller.abort();
  loadingState.value = false;
});

emitter.on('vf-fetch', ({params, onSuccess = null, onError = null}) => {
  if (['index', 'search'].includes(params.q)) {
    if (controller) {
      controller.abort();
    }
    loadingState.value = true;
  }

  controller = new AbortController();
  const signal = controller.signal;
  ajax(apiUrl.value, {params, signal})
      .then(data => {
        if (['index', 'search'].includes(params.q)) {
          loadingState.value = false;
        }
        emitter.emit('vf-modal-close');
        updateItems(data);
        onSuccess(data);
      })
      .catch((e) => {
        if (onError) {
          onError(e);
        }
      })
      .finally(() => {
      });
});

emitter.on('vf-download', (url) => {
  document.getElementById('download_frame').src = url;
  emitter.emit('vf-modal-close')
});

onMounted(() => {
  emitter.emit('vf-fetch', {params: {q: 'index', adapter: (getStore('adapter', fetchData.adapter)) }})
});

</script>
