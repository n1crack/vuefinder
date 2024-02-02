<template>
  <div class="flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm">
    <span :aria-label="t('Go up a directory')" data-microtip-position="bottom-right" role="tooltip">
      <svg
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event)"
          @click="!isGoUpAvailable() || app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path:breadcrumb[breadcrumb.length-2]?.path ?? (app.adapter + '://')}} )"
          class="h-6 w-6 p-0.5 rounded"
          :class="isGoUpAvailable() ? 'text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer' : 'text-gray-400 dark:text-neutral-500'"
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </span>
    <span :aria-label="t('Refresh')" data-microtip-position="bottom-right" role="tooltip" v-if="!app.loading">
      <svg @click="app.emitter.emit('vf-fetch',{params:{q: 'index', adapter: app.data.adapter, path: app.data.dirname}} );" class="h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 580 580" fill="currentColor">
        <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"></path>
      </svg>
    </span>
    <span :aria-label="t('Cancel')" data-microtip-position="bottom-right" role="tooltip" v-else>
      <svg @click="app.emitter.emit('vf-fetch-abort')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>

    <div v-if="!searchMode" class="group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" @click.self="enterSearchMode">
      <svg
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event, -1)"
          @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter}})"
           class="h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer"
           xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>

      <div class="flex leading-6">
        <div v-for="(item, index) in breadcrumb" :key="index">
          <span class="text-neutral-300 dark:text-gray-600 mx-0.5">/</span>
          <span
          @dragover="(index === breadcrumb.length - 1) || handleDragOver($event)"
          @dragleave="(index === breadcrumb.length - 1) || handleDragLeave($event)"
          @drop="(index === breadcrumb.length - 1) || handleDropZone($event, index)"
          class="px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer" :title="item.basename" @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path:item.path}})">{{ item.name }}</span>
        </div>
      </div>

      <svg class="animate-spin p-1 h-6 w-6 text-white ml-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  v-if="app.loading">
        <circle class="opacity-25 stroke-blue-900 dark:stroke-blue-100" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-else class="relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full">
      <div>
        <svg
           class="h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20"
           xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      </div>
      <input
          ref="searchInput"
          @keydown.esc="exitSearchMode"
          @blur="handleBlur"
          v-model="query"
          :placeholder="t('Search anything..')"
          class="w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent"
          type="text">
      <svg
          class="w-6 h-6 cursor-pointer"
          @click="exitSearchMode"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
</template>


<script>
export default {
  name: 'VFBreadcrumb',
};
</script>

<script setup>

import {inject, nextTick, ref, watch} from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef.js';
import {FEATURES} from "./features.js";

const dirname = ref(null);
const breadcrumb = ref([]);
const searchMode = ref(false);
const searchInput = ref(null);

const app = inject('ServiceContainer');
const {t} = app.i18n;

app.emitter.on('vf-explorer-update', () => {
  let items = [], links = [];
  dirname.value = app.data.dirname ?? (app.adapter + '://');

  if (dirname.value.length == 0) {
    breadcrumb.value = [];
  }
  dirname.value
      .replace(app.adapter + '://', '')
      .split('/')
      .forEach(function (item) {
        items.push(item);
        if (items.join('/') != '') {
          links.push({
            'basename': item,
            'name': item,
            'path': app.adapter + '://' + items.join('/'),
            'type': 'dir'
          });
        }
      });

  if (links.length > 4) {
    links = links.slice(-5);
    links[0].name = '..';
  }

  breadcrumb.value = links;
});

const exitSearchMode = () => {
  searchMode.value = false;
  query.value = '';
}

app.emitter.on('vf-search-exit', () => {
  exitSearchMode();
});

const enterSearchMode = () => {
  if (!app.features.includes(FEATURES.SEARCH)) {
    return;
  }
  searchMode.value = true;
  nextTick(() => searchInput.value.focus())
}

const query = useDebouncedRef('', 400);

watch(query, newQuery => {
  app.emitter.emit('vf-toast-clear');
  app.emitter.emit('vf-search-query', {newQuery});
});

const isGoUpAvailable = () => {
  return breadcrumb.value.length && !searchMode.value;
};

const handleDropZone = (e, index = null) => {
  e.preventDefault();

  handleDragLeave(e);

  index ??= breadcrumb.value.length - 2;

  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage !== app.adapter)) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  app.emitter.emit('vf-modal-show', {
    type: 'move',
    items: {from: draggedItems, to: breadcrumb.value[index] ?? {path: (app.adapter + '://')}}
  });
};

const handleDragOver = (e) => {
  e.preventDefault();


  if (isGoUpAvailable()) {
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('bg-blue-200','dark:bg-slate-500');
  } else {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};
const handleDragLeave = (e) => {
  e.preventDefault();

  e.currentTarget.classList.remove('bg-blue-200','dark:bg-slate-500');

  if (isGoUpAvailable()) {
    e.currentTarget.classList.remove('bg-blue-200','dark:bg-slate-500');
  }
};

const handleBlur = () => {
  if (query.value == '') {
    exitSearchMode();
  }
}
</script>


