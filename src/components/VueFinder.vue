<template>
  <div :class="darkMode ? 'dark': ''">
    <button @click="darkMode = !darkMode">Dark Toggle</button>
    <div
        class="relative border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 min-w-min select-none"
        @mousedown="emitter.emit('vf-contextmenu-hide')">
      <v-f-toolbar/>
      <v-f-breadcrumb :data="fetchData"/>
      <v-f-explorer :view="view" :data="fetchData"/>
      <v-f-statusbar :data="fetchData"/>
    </div>

    <component v-if="modal.active" :is="'v-f-modal-'+ modal.type" :item="modal.data"/>
    <v-f-context-menu/>
  </div>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {defineProps, inject, nextTick, onMounted, provide, reactive, ref} from 'vue';
import ajax from '../utils/ajax.js';
import mitt from 'mitt';
import {useStorage} from '../composables/useStorage.js';

const emitter = mitt();
provide('emitter', emitter);

const props = defineProps({
  url : {
    type: [String],
  },
  id: {
    type: String,
    default: 'vf'
  },
  dark: {
    type: Boolean,
    default: false
  }
})
const {getStore} = useStorage(props.id);
provide('storage', useStorage(props.id));

const fetchData = reactive({adapter:'local', storages: [], dirname: '.', files: []});

// View Management
const view = ref('grid');

const darkMode = ref(props.dark)

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
  modal.type = item.type;
  modal.data = item;
  modal.active = true;
});

const updateItems = (data) => {
  Object.assign(fetchData, data)
  emitter.emit('vf-explorer-update', data)
}

emitter.on('vf-fetch-index', ({adapter, item = null}) => {
  ajax(props.url, 'get', {
    q: 'index',
    adapter: adapter,
    path: item?.path ?? ''
  })
      .then(response => response.json())
      .then(data => {
        updateItems(data);
      });
});


emitter.on('vf-adapter-changed', (adapter) => {
  ajax(props.url, 'get', {
    q: 'index',
    adapter,
    path: ''
  })
      .then(response => response.json())
      .then(data => {
        // console.log('adapter-changed', adapter)
        updateItems(data);
      });
});


onMounted(() => {
  emitter.emit('vf-fetch-index', {adapter: getStore('adapter') ?? fetchData.adapter })
});

</script>
