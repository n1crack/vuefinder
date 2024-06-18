<template>
  <div
      @click="showSubFolders = !showSubFolders"
      class="p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer">
    <div
        class="flex flex-1 space-x-1 items-center "
        :class="storage === app.fs.adapter ? 'text-gray-700/80 dark:text-gray-300/80 text-bold' : ''">
      <div class="h-5 w-5 shrink-0 " :class="storage === app.fs.adapter ? 'text-sky-500 dark:text-slate-300' : ''">
        <StorageSVG />
      </div>
      <div>{{ storage }}</div>
    </div>

    <div class="pointer-events-none pr-1">
      <FolderLoaderIndicator :adapter="storage" :path="storage + '://'" v-model="showSubFolders" />
    </div>
  </div>
  <TreeSubfolderList :adapter="storage" :path="storage + '://'" v-show="showSubFolders" class=" overflow-x-auto my-1"/>
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
</script>
