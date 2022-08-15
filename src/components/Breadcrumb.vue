<template>
  <div class="flex p-2 bg-neutral-100 border-t border-b border-neutral-300 items-center select-none">
    <svg @click="emitter.emit('vf-fetch-index')"
        xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-700 hover:text-teal-700 cursor-pointer " viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
    <div class="flex leading-5">
      <div v-for="(item, index) in breadcrumb" :key="index">
        <span class="text-slate-700 mx-1">/</span>
        <span class="text-slate-700 hover:text-teal-700 cursor-pointer" :title="item.basename" @click="emitter.emit('vf-fetch-index', item)">{{ item.name }}</span>
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

import {inject, ref, watch} from 'vue';

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
            'type': 'folder'
          });
        }
      });

  if (links.length > 3) {
    links = links.slice(-4);
    links[0].name = '..';
  }

  breadcrumb.value = links;
});

</script>


