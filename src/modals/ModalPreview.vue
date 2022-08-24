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
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ selection.item.basename }}</h3>
        <div class="mt-2">
          <p>adapter: {{ selection.adapter }}</p>
          <p>path: {{ selection.item.path }}</p>
          <p>mime_type: {{ selection.item.mime_type }}</p>
          <div class="flex leading-5 text-gray-700 dark:text-gray-200" v-if="loaded == false">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25 stroke-blue-900 dark:stroke-blue-100" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading</span>
          </div>

          <Text v-if="loadPreview('text/plain')" :selection="selection" @load="loaded = true"/>

          <Image v-else-if="loadPreview('image/jpeg')" :selection="selection" @load="loaded = true"/>

          <Default v-else :selection="selection" @load="loaded = true"/>

        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
    </template>
  </v-f-modal>
</template>

<script>
export default {
  name: 'VFModalPreview'
};
</script>

<script setup>
import {ref} from 'vue';
import Text from '../previews/Text.vue';
import Image from '../previews/Image.vue';
import Default from '../previews/Default.vue';

const emitter = inject('emitter')
const loaded = ref(false);

const props = defineProps({
  selection: Object
});

const loadPreview = (type) => props.selection.item.mime_type == type

</script>
