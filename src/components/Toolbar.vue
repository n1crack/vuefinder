<template>
  <div class="border-neutral-300 flex justify-between items-center py-1 text-sm">
    <div class="flex text-center">

        <div class="mx-1.5"
             aria-label="New Folder" data-microtip-position="bottom" role="tooltip"
             @click="emitter.emit('vf-modal-show', {type:'new-folder', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        </div>

        <div class="mx-1.5"
             aria-label="New File" data-microtip-position="bottom" role="tooltip"
             @click="emitter.emit('vf-modal-show', {type:'new-file', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div class="mx-1.5"
             aria-label="Rename" data-microtip-position="bottom" role="tooltip"
             @click="(selectedItems.length != 1) || emitter.emit('vf-modal-show', {type:'rename', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
                :class="(selectedItems.length == 1) ? 'cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100' : 'stroke-gray-200  dark:stroke-gray-600'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div class="mx-1.5"
             aria-label="Delete" data-microtip-position="bottom" role="tooltip"
             @click="(!selectedItems.length) || emitter.emit('vf-modal-show', {type:'delete', items: selectedItems})">
            <svg xmlns="http://www.w3.org/2000/svg"
                 :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100' : 'stroke-gray-200  dark:stroke-gray-600'"
                 class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
        <div class="mx-1.5"
             aria-label="Upload" data-microtip-position="bottom" role="tooltip"
             @click="emitter.emit('vf-modal-show', {type:'upload', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>

        <div class="mx-1.5" v-if="selectedItems.length == 1 && selectedItems[0].mime_type == 'application/zip'"
             aria-label="Unrchive" data-microtip-position="bottom" role="tooltip"
              @click="(!selectedItems.length) || emitter.emit('vf-modal-show', {type:'unarchive', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100' : 'stroke-gray-200  dark:stroke-gray-600'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>

        <div class="mx-1.5" v-else
             aria-label="Archive" data-microtip-position="bottom" role="tooltip"
              @click="(!selectedItems.length) || emitter.emit('vf-modal-show', {type:'archive', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100' : 'stroke-gray-200  dark:stroke-gray-600'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>

    </div>

    <div class="flex text-center items-center justify-end">
      <div class="mx-1.5"
             aria-label="Dark Mode" data-microtip-position="bottom" role="tooltip">
        <svg @click="emitter.emit('vf-darkMode-toggle')" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300">
          <g class="dark:opacity-0"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path><path d="M12 4v.01M17.66 6.345l-.007.007M20.005 12.005h-.01M17.66 17.665l-.007-.007M12 20.01V20M6.34 17.665l.007-.007M3.995 12.005h.01M6.34 6.344l.007.007" fill="none"></path></g><g class="opacity-0 dark:opacity-100"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>
          <path d="M12 3v1M18.66 5.345l-.828.828M21.005 12.005h-1M18.66 18.665l-.828-.828M12 21.01V20M5.34 18.666l.835-.836M2.995 12.005h1.01M5.34 5.344l.835.836" fill="none"></path>
        </g>
        </svg>
      </div>
        <div class="mx-1.5"
             aria-label="Change View" data-microtip-position="bottom" role="tooltip"
             @click="emitter.emit('vf-view-toggle', view == 'list' ? 'grid' : 'list')">

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5" v-if="view == 'grid'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5" v-if="view == 'list'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFToolbar'
};
</script>

<script setup>
import {ref} from 'vue';

const emitter = inject('emitter')

const {getStore, setStore} = inject('storage')

const view = ref(getStore('viewport', 'grid'));

const selectedItems = ref([]);

emitter.on('vf-nodes-selected', (items) => {
  selectedItems.value = items;
})

emitter.on('vf-view-toggle', (newView) => {
  setStore('viewport', newView)
  view.value = newView;
})
</script>
