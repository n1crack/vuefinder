<template>
  <div class="flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none  text-xs">
    <span :aria-label="t('Go up a directory')" data-microtip-position="bottom-right" role="tooltip">
      <svg
          @dragover="handleDragOver($event)"
          @drop="handleDropZone($event)"
          @click="!isGoUpAvailable() || emitter.emit('vf-fetch', {q: 'index', adapter: data.adapter, path:breadcrumb[breadcrumb.length-2]?.path ?? (getStore('adapter', 'local') + '://')} )"
          class="h-6 w-6 p-0.5 rounded"
          :class="isGoUpAvailable() ? 'text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer' : 'text-gray-400 dark:text-neutral-500'"
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </span>
    <div v-if="!searchMode" class="group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full" @click.self="enterSearchMode">
      <svg @click="emitter.emit('vf-fetch', {q: 'index', adapter: data.adapter})"
           class="h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer"
           xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>

      <div class="flex leading-5">
        <div v-for="(item, index) in breadcrumb" :key="index">
          <span class="text-neutral-300 dark:text-gray-600 mx-0.5">/</span>
          <span class="px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer" :title="item.basename" @click="emitter.emit('vf-fetch', {q: 'index', adapter: data.adapter, path:item.path})">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-else class="flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full">
      <svg
           class="h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20"
           xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input
          ref="searchInput"
          @keydown.esc="exitSearchMode"
          @blur="handleBlur"
          v-model="query"
          :placeholder="t('Search anything..')"
          class="py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent"
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

import {nextTick, ref, watch} from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef.js';

const emitter = inject('emitter');
const { getStore } = inject('storage');
const dirname = ref(null);
const breadcrumb = ref([]);
const searchMode = ref(false);
const searchInput = ref(null);

const props = defineProps({
  data: Object
});

const {t} = inject('i18n');

emitter.on('vf-explorer-update', () => {
  let items = [], links = [];
  dirname.value = props.data.dirname ?? (getStore('adapter', 'local') + '://');

  if (dirname.value.length == 0) {
    breadcrumb.value = [];
  }
  dirname.value
      .replace(getStore('adapter', 'local') + '://', '')
      .split('/')
      .forEach(function (item) {
        items.push(item);
        if (items.join('/') != '') {
          links.push({
            'basename': item,
            'name': item,
            'path': getStore('adapter', 'local') + '://' + items.join('/'),
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

emitter.on('vf-search-exit', () => {
  exitSearchMode();
});

const enterSearchMode = () => {
  searchMode.value = true;
  nextTick(() => searchInput.value.focus())
}

const query = useDebouncedRef('', 400);

watch(query, newQuery => {
  emitter.emit('vf-search-query', {newQuery});
});

const isGoUpAvailable = () => {
  return breadcrumb.value.length && !searchMode.value;
};

const handleDropZone = (e) => {
  e.preventDefault();
  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage != getStore('adapter', 'local'))) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  emitter.emit('vf-modal-show', {
    type: 'move',
    items: {from: draggedItems, to: breadcrumb.value[breadcrumb.value.length - 2] ?? {path: (getStore('adapter', 'local') + '://')}}
  });
};

const handleDragOver = (e) => {
  e.preventDefault();

  if (isGoUpAvailable()) {
    e.dataTransfer.dropEffect = 'copy';
  } else {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};

const handleBlur = () => {
  if (query.value == '') {
    exitSearchMode();
  }
}
</script>


