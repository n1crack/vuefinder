<template>
  <div class="relative border rounded-md bg-white text-gray-800 border-neutral-300 min-w-min select-none" @mousedown="emitter.emit('vf-contextmenu-hide')">
      <v-f-toolbar/>
      <v-f-breadcrumb :items="items"/>
      <v-f-explorer :view="view" :items="items"/>
      <v-f-statusbar/>
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
import {onMounted, ref} from 'vue';
import ajax from '../utils/ajax.js'

const emitter = inject('emitter')

const items = ref({dirname: '.', files: []});

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
  items.value = data;
  emitter.emit('vf-explorer-update')
}

emitter.on('vf-fetch-index', (item = null) => {
  ajax('http://vuefinder-php.test', 'get', {
    q: 'index',
    path: item?.path ?? ''
  })
      .then(response => response.json())
      .then(data => updateItems(data));
});

onMounted(() => {
  emitter.emit('vf-fetch-index')
});

</script>
