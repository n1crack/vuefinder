<template>
  <div class="pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between bg-gray-100 dark:bg-[#2e3c51] border-b dark:border-gray-600 ">
    <div class="flex flex-1 space-x-1 items-center cursor-pointer"
         :class="storage === app.fs.adapter ? 'text-gray-700/80 dark:text-gray-300/80 text-bold' : ''"
         @click="handleStorageSelect(storage)">
      <div class="h-5 w-5 shrink-0 " :class="storage === app.fs.adapter ? 'text-sky-500 dark:text-slate-300' : ''">
        <StorageSVG />
      </div>
      <div>{{ storage }}</div>
    </div>

    <div>
      <FolderLoaderIndicator :adapter="storage" :path="storage + '://'" v-model="showSubFolders" />
    </div>
  </div>
  <TreeSubfolderList :adapter="storage" :path="storage + '://'" v-show="showSubFolders" class=" overflow-x-auto"/>
</template>
<script setup>
import {inject, ref} from 'vue';

import StorageSVG from "./icons/storage.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import TreeSubfolderList from "./TreeSubfolderList.vue";

const app = inject('ServiceContainer');
const showSubFolders = ref(false);
const props = defineProps({
  storage: {
    type: String,
    required: true,
  },
});

const handleStorageSelect = (adapter) => {
  app.fs.adapter = adapter;
  showSubFolders.value = !showSubFolders.value;
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: adapter}});
  app.storage.setStore('adapter', adapter);
};



</script>
