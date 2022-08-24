<template>
  <v-f-modal>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">New File</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">Create a new file</p>
          <input v-model="name" @keyup.enter="createFile"
                 class="px-2 py-1 border rounded dark:bg-gray-500   dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full" placeholder="File Name" type="text">
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="createFile" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Create!</button>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
    </template>
  </v-f-modal>
</template>

<script>
export default {
  name: 'VFModalNewFile'
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

const createFile = () => {
  if (name.value != '') {
    emitter.emit('vf-fetch', {
      q: 'newfile',
      adapter: getStore('adapter'),
      path: props.current.dirname,
      name: name.value
    });
  }
};

</script>
