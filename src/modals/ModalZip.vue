<template>
  <v-f-modal>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg class="h-6 w-6 stroke-red-600 dark:stroke-red-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">Archive files</h3>
        <div class="mt-2">
          <p v-for="item in items" class="flex text-sm text-gray-800 dark:text-gray-400">
            <svg v-if="item.type == 'dir'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            <span class="ml-1.5">{{ item.basename }}</span>

          </p>
          <p class="my-1 text-sm text-gray-500">Archive name. (.zip file will be created)</p>
          <input v-model="name" @keyup.enter="zip"
                 class="my-1 px-2 py-1 border rounded dark:bg-gray-500   dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full" placeholder="Name" type="text">
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="zip" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Archive!</button>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
    </template>
  </v-f-modal>
</template>

<script>
export default {
  name: 'VFModalZip'
};
</script>


<script setup>
import {ref} from 'vue';

const emitter = inject('emitter');
const {getStore} = inject('storage');

const props = defineProps({
  selection: Object,
  current: Object
});
const name = ref('');

const items = ref(props.selection.items);

const zip = () => {
  if (items.value.length) {
    emitter.emit('vf-fetch', {
      q: 'zip',
      adapter: getStore('adapter'),
      path: props.current.dirname,
      items: JSON.stringify(items.value.map(({path, type}) => ({path, type}))),
      name: name.value
    });
  }
};

</script>
