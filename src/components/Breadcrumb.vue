<template>
  <div class="flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-900 items-center select-none ">
    <svg
        @dragover="handleDragOver($event)"
        @drop="handleDropZone($event)"
        @click="!breadcrumb.length || emitter.emit('vf-fetch', {q: 'index', adapter: data.adapter, path:breadcrumb[breadcrumb.length-2]?.path ?? ''} )"
        class="h-6 w-6 p-0.5 rounded"
        :class="breadcrumb.length ? 'text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer' : 'text-gray-400 dark:text-neutral-500'"
        xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
    </svg>
    <div class="flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full">
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
  </div>
</template>


<script>
export default {
  name: 'VFBreadcrumb',
};
</script>

<script setup>

import {ref} from 'vue';

const props = defineProps({
  data: Object
});

const emitter = inject('emitter');
const { getStore } = inject('storage');
const dirname = ref(null);
const breadcrumb = ref([]);

emitter.on('vf-explorer-update', (data) => {
  let items = [], links = [];
  dirname.value = props.data.dirname ?? '';

  if (dirname.value.length == 0) {
    breadcrumb.value = [];
  }
  dirname.value.split('/')
      .forEach(function (item) {
        items.push(item);
        if (items.join('/') != '') {
          links.push({
            'basename': item,
            'name': item,
            'path': items.join('/'),
            'type': 'dir'
          });
        }
      });

  if (links.length > 4) {
    links = links.slice(-5);
    links[0].name = '..';
  }
  console.log(links);
  breadcrumb.value = links;
});

const handleDropZone = (e) => {
  e.preventDefault();
  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage != getStore('adapter'))) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  emitter.emit('vf-modal-show', {
    type: 'move',
    items: {from: draggedItems, to: breadcrumb.value[breadcrumb.value.length - 2] ?? {path: '/'}}
  });
};

const handleDragOver = (e) => {
  e.preventDefault();

  if (breadcrumb.value.length < 1) {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};
</script>


