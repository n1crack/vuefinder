<template>
  <div class="relative border rounded-md bg-white text-gray-800 border-neutral-300 min-w-min">
      <v-f-toolbar/>
      <v-f-breadcrumb/>
      <v-f-explorer :view="view"/>
      <v-f-statusbar/>
  </div>

  <component v-if="modal.active" :is="'v-f-modal-'+ modal.type" :item="modal.data" />
</template>

<script>
export default {
  name: 'VueFinder'
};
</script>

<script setup>
import {ref} from 'vue';

const emitter = inject('emitter')


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

</script>
