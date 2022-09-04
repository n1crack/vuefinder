<template>
  <div
      :class="fullScreen.value ?  'fixed' : 'absolute'"
      class=" bottom-0 max-w-fit flex-inline bottom-0 left-1/2 -translate-x-1/2">
    <div v-for="(message, index) in messageQueue"
         :class="getTypeClass(message.type)"
         class=" mx-auto my-1 py-1 px-2 min-w-max bg-gray-50 border text-xs rounded">
       {{ message.label }} index: {{ index }}
      <span> X </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFToast.vue'
};
</script>

<script setup>
import {ref} from 'vue';

const {getStore, setStore} = inject('storage');

const fullScreen = ref(getStore('full-screen', false));

const getTypeClass = (type) => {
  if (type == 'error') {
    return 'text-red-400 border-red-400';
  }
  return 'text-lime-600 border-lime-600';
};

const messageQueue = ref([
  {label: 'Toast Test', type: 'error'},
  {label: 'Toast Test 2 xyz', type: 'success'}
]);
</script>
