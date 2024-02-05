<template>
  <div class="border-neutral-300 flex justify-between items-center py-1 text-sm">
    <div class="flex text-center" v-if="!searchQuery.length">
        <div class="mx-1.5"
             :aria-label="t('New Folder')" data-microtip-position="bottom-right" role="tooltip"
             v-if="app.features.includes(FEATURES.NEW_FOLDER)"
             @click="app.emitter.emit('vf-modal-show', {type:'new-folder', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        </div>

        <div class="mx-1.5"
             :aria-label="t('New File')" data-microtip-position="bottom" role="tooltip"
             v-if="app.features.includes(FEATURES.NEW_FILE)"
             @click="app.emitter.emit('vf-modal-show', {type:'new-file', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        <div class="mx-1.5"
             :aria-label="t('Rename')" data-microtip-position="bottom" role="tooltip"
             v-if="app.features.includes(FEATURES.RENAME)"
             @click="(selectedItems.length != 1) || app.emitter.emit('vf-modal-show', {type:'rename', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
                :class="(selectedItems.length == 1) ? 'cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300' : 'stroke-gray-200  dark:stroke-gray-700'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>

        <div class="mx-1.5"
             :aria-label="t('Delete')" data-microtip-position="bottom" role="tooltip"
             v-if="app.features.includes(FEATURES.DELETE)"
             @click="(!selectedItems.length) || app.emitter.emit('vf-modal-show', {type:'delete', items: selectedItems})">
            <svg xmlns="http://www.w3.org/2000/svg"
                 :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300' : 'stroke-gray-200  dark:stroke-gray-700'"
                 class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </div>

        <div class="mx-1.5"
             :aria-label="t('Upload')" data-microtip-position="bottom" role="tooltip"
             v-if="app.features.includes(FEATURES.UPLOAD)"
             @click="app.emitter.emit('vf-modal-show', {type:'upload', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div class="mx-1.5" v-if="app.features.includes(FEATURES.UNARCHIVE) && selectedItems.length == 1 && selectedItems[0].mime_type == 'application/zip'"
             :aria-label="t('Unarchive')" data-microtip-position="bottom" role="tooltip"
              @click="(!selectedItems.length) || app.emitter.emit('vf-modal-show', {type:'unarchive', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300' : 'stroke-gray-200  dark:stroke-gray-700'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <div class="mx-1.5" v-if="app.features.includes(FEATURES.ARCHIVE)"
             :aria-label="t('Archive')" data-microtip-position="bottom" role="tooltip"
              @click="(!selectedItems.length) || app.emitter.emit('vf-modal-show', {type:'archive', items: selectedItems})">
          <svg xmlns="http://www.w3.org/2000/svg"
               :class="(selectedItems.length) ? 'cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300' : 'stroke-gray-200  dark:stroke-gray-700'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>

    </div>

    <div class="flex text-center" v-else>
      <div class="pl-2"> {{ t('Search results for') }} <span class="dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded">{{ searchQuery }}</span></div>
       <svg
            class="animate-spin p-0.5 h-5 w-5 text-white ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  v-if="app.loading">
        <circle class="opacity-25 stroke-blue-900 dark:stroke-blue-100" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div class="flex text-center items-center justify-end">
         <div v-if="app.features.includes(FEATURES.FULL_SCREEN)" class="mx-1.5" :aria-label="t('Toggle Full Screen')" data-microtip-position="bottom-left" role="tooltip"
               @click="toggleFullScreen">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
                <path v-if="app.fullScreen" stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          </div>

        <div class="mx-1.5"
             :aria-label="t('Change View')" data-microtip-position="bottom-left" role="tooltip"
             @click="searchQuery.length || toggleView()">

          <svg xmlns="http://www.w3.org/2000/svg"
               :class="(!searchQuery.length) ? 'cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300' : 'stroke-gray-200  dark:stroke-gray-700'"
               class="h-6 w-6 md:h-8 md:w-8 m-auto" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
              <path v-if="app.view === 'grid'" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              <path v-if="app.view === 'list'"  stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
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
import {inject, ref} from 'vue';
import { FEATURES } from "./features.js";

const app = inject('ServiceContainer');
const {setStore} = app.storage;
const {t} = app.i18n;

const selectedItems = ref([]);
const searchQuery = ref('');

app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

const toggleFullScreen = () => {
  app.fullScreen = !app.fullScreen;
  setStore('full-screen', app.fullScreen);
  app.emitter.emit('vf-fullscreen-toggle');
}

app.emitter.on('vf-nodes-selected', (items) => {
  selectedItems.value = items;
})

// View Management
const toggleView = () => {
  app.view = app.view === 'list' ? 'grid' : 'list';
  setStore('viewport', app.view)
};

</script>
