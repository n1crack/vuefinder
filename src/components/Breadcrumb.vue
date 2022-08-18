<template>
  <div class="flex p-1.5 bg-neutral-100 border-t border-b border-neutral-300 items-center select-none ">
    <svg @click="!breadcrumb.length || emitter.emit('vf-fetch-index', breadcrumb[breadcrumb.length-2] )" xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 p-0.5 rounded" :class="breadcrumb.length ? 'text-slate-700 hover:bg-neutral-300 cursor-pointer' : 'text-gray-400'" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
    </svg>
    <div class="flex bg-white items-center rounded p-1 ml-2 w-full">
      <svg @click="emitter.emit('vf-fetch-index')"
           class="h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 cursor-pointer"
           xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      <div class="flex leading-5">
        <div v-for="(item, index) in breadcrumb" :key="index">
          <span class="text-neutral-300 mx-0.5">/</span>
          <span class="px-1.5 py-1 text-slate-700 hover:bg-neutral-100 rounded cursor-pointer" :title="item.basename" @click="emitter.emit('vf-fetch-index', item)">{{ item.name }}</span>
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

import {inject, ref} from 'vue';

const emitter = inject('emitter');
const dirname = ref(null);
const base = ref(null);
const breadcrumb = ref([]);

emitter.on('vf-fetch-index', (item = null) => {
  base.value = '.';
  dirname.value = item?.path ?? '';

  let items = [], links = [],
      root = '^' + base.value.replace(/([^\w ])/, '\\$1') + '\/?',
      regex = new RegExp(root, 'i'),
      path = dirname.value.replace(regex, '');

  if (path.length == 0) {
    breadcrumb.value = [];
  }
  path.split('/')
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
  breadcrumb.value = links;
});

</script>


