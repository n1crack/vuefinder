<template>
  <div
      class="flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm">
    <span :aria-label="t('Go up a directory')" data-microtip-position="bottom-right" role="tooltip">
      <GoUpSVG
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event)"
          @click="!isGoUpAvailable() || app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path:breadcrumb[breadcrumb.length-2]?.path ?? (app.adapter + '://')}} )"
          :class="isGoUpAvailable() ? 'text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer' : 'text-gray-400 dark:text-neutral-500'"
      />
    </span>
    <span :aria-label="t('Refresh')" data-microtip-position="bottom-right" role="tooltip" v-if="!app.loading">
      <HomeSVG
          @click="app.emitter.emit('vf-fetch',{params:{q: 'index', adapter: app.data.adapter, path: app.data.dirname}} );"/>
    </span>
    <span :aria-label="t('Cancel')" data-microtip-position="bottom-right" role="tooltip" v-else>
      <CloseSVG @click="app.emitter.emit('vf-fetch-abort')"/>
    </span>

    <div v-if="!searchMode" class="group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
         @click.self="enterSearchMode">
      <SearchSVG
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event, -1)"
          @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter}})"/>

      <div class="flex leading-6">
        <div v-for="(item, index) in breadcrumb" :key="index">
          <span class="text-neutral-300 dark:text-gray-600 mx-0.5">/</span>
          <span
              @dragover="(index === breadcrumb.length - 1) || handleDragOver($event)"
              @dragleave="(index === breadcrumb.length - 1) || handleDragLeave($event)"
              @drop="(index === breadcrumb.length - 1) || handleDropZone($event, index)"
              class="px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              :title="item.basename"
              @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path:item.path}})">{{
              item.name
            }}</span>
        </div>
      </div>

      <LoadingSVG v-if="app.loading"/>
    </div>
    <div v-else class="relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full">
      <div>
        <MagnifierSVG/>
      </div>
      <input
          ref="searchInput"
          @keydown.esc="exitSearchMode"
          @blur="handleBlur"
          v-model="query"
          :placeholder="t('Search anything..')"
          class="w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent"
          type="text">
      <ExitSVG @click="exitSearchMode"/>
    </div>
  </div>
</template>

<script setup>

import {inject, nextTick, ref, watch} from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef.js';
import {FEATURES} from "./features.js";
import ModalMove from "./modals/ModalMove.vue";
import HomeSVG from "./icons/home.svg";
import GoUpSVG from "./icons/go_up.svg";
import CloseSVG from "./icons/close.svg";
import SearchSVG from "./icons/search.svg";
import MagnifierSVG from "./icons/magnifier.svg";
import LoadingSVG from "./icons/loading.svg";
import ExitSVG from "./icons/exit.svg";

const dirname = ref(null);
const breadcrumb = ref([]);
const searchMode = ref(false);
const searchInput = ref(null);

const app = inject('ServiceContainer');
const {t} = app.i18n;

app.emitter.on('vf-explorer-update', () => {
  let items = [], links = [];
  dirname.value = app.data.dirname ?? (app.adapter + '://');

  if (dirname.value.length === 0) {
    breadcrumb.value = [];
  }
  dirname.value
      .replace(app.adapter + '://', '')
      .split('/')
      .forEach(function (item) {
        items.push(item);
        if (items.join('/') !== '') {
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

  app.modal.open(ModalMove, {items: {from: draggedItems, to: breadcrumb.value[index] ?? {path: (app.adapter + '://')}}})
};

const handleDragOver = (e) => {
  e.preventDefault();

  if (isGoUpAvailable()) {
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('bg-blue-200', 'dark:bg-slate-500');
  } else {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};
const handleDragLeave = (e) => {
  e.preventDefault();

  e.currentTarget.classList.remove('bg-blue-200', 'dark:bg-slate-500');

  if (isGoUpAvailable()) {
    e.currentTarget.classList.remove('bg-blue-200', 'dark:bg-slate-500');
  }
};

const handleBlur = () => {
  if (query.value === '') {
    exitSearchMode();
  }
}
</script>


