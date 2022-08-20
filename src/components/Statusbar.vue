<template>
  <div class="p-1 text-xs border-t border-neutral-300 dark:border-gray-700 flex justify-between select-none">
    <div class="flex leading-5 items-center">
      <div class="mx-2" aria-label="Storage" data-microtip-position="top" role="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
      <select v-model="adapter" @change="handleStorageSelect" class="text-slate-500 dark:text-neutral-50 dark:bg-gray-700 font-bold rounded pl-2 pr-8">
        <option v-for="storage in data.storages" :value="storage">
          {{ storage }}
        </option>
      </select>

     <span class="ml-3"> {{ selectedItemCount > 0 ? selectedItemCount + ' items selected.' : '' }} </span>
    </div>
    <div class="flex leading-5 items-center">
      <span @click="emitter.emit('vf-modal-show', {type:'message', title:'Vuefinder 1.0', message: 'Vuefinder is a file manager component for vue 3.'})">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFStatusbar'
};
</script>

<script setup>
import {ref} from 'vue';

const props = defineProps({
  data: Object
});

const emitter = inject('emitter');
const {getStore, setStore} = inject('storage');
const selectedItemCount = ref(0);
const adapter = ref(getStore('adapter') ?? props.data.adapter);

const handleStorageSelect = () => {
  emitter.emit('vf-fetch-index', {adapter: adapter.value});
  setStore('adapter', adapter.value)
};

emitter.on('vf-nodes-selected', (items) => {
  selectedItemCount.value = items.length;
})
</script>

