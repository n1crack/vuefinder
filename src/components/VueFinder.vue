<template>
  <div class="relative border rounded-md bg-white text-gray-800 border-neutral-300 min-w-min select-none" @mousedown="emitter.emit('vf-contextmenu-hide')">
      <v-f-toolbar/>
      <v-f-breadcrumb :items="fetchData"/>
      <v-f-explorer :view="view" :items="fetchData"/>
      <v-f-statusbar :data="fetchData"/>
  </div>

  <component v-if="modal.active" :is="'v-f-modal-'+ modal.type" :item="modal.data" />
  <v-f-context-menu/>
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {defineProps, inject, onMounted, provide, reactive, ref} from 'vue';
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
  }
})
let {store, setStore, clearStore} = useStorage(props.id)

provide('storage', useStorage(props.id))

setStore({storage: 'local'})


const fetchData = reactive({adapter:'local', storages: [], dirname: '.', files: []});

// View Management
const view = ref('grid');

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
  emitter.emit('vf-explorer-update')
}

emitter.on('vf-fetch-index', (item = null) => {
  ajax(props.url, 'get', {
    q: 'index',
    adapter: store.storage ?? fetchData.adapter ?? '',
    path: item?.path ?? ''
  })
      .then(response => response.json())
      .then(data => updateItems(data));
});


emitter.on('vf-adapter-changed', (adapter) => {
  ajax(props.url, 'get', {
    q: 'index',
    adapter,
    path: ''
  })
      .then(response => response.json())
      .then(data => {
        console.log('adapter-changed', adapter)
        updateItems(data);
      });
});


onMounted(() => {
  emitter.emit('vf-fetch-index')
});

</script>
