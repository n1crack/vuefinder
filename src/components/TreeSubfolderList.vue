<template>
  <ul class="block">
    <li v-for="(item, index) in treeSubFolders"
        class="flex flex-col space-x-0.5 py-0.5 text-sm" :key="item.path">
      <div class="flex hover:text-sky-500 dark:hover:text-sky-200/50 rounded ">
        <div class="h-5 w-5 shrink-0">
          <FolderLoaderIndicator :adapter="adapter" :path="item.path" v-model="showSubFolders[item.path]" />
        </div>
        <div class="flex cursor-pointer"
            @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: props.adapter, path:item.path}})">
          <div class="h-5 w-5 shrink-0">
            <OpenFolderSVG v-if="app.fs.path === item.path"/>
            <FolderSVG v-else/>
          </div>
          <div class="text-nowrap">{{ item.basename }}</div>
        </div>
      </div>
      <div class="pl-4">
      <TreeSubfolderList :adapter="props.adapter" :path="item.path" v-show="showSubFolders[item.path]" />
      </div>
    </li>
  </ul>
</template>
<script setup>
import {computed, inject, ref} from 'vue';

import FolderSVG from "./icons/folder.svg";
import OpenFolderSVG from "./icons/open_folder.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";

const app = inject('ServiceContainer');

const showSubFolders = ref([]);

const props = defineProps({
  adapter: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  }
});

const treeSubFolders = computed(() => {
  return app.treeViewData.find(e => e.path === props.path)?.folders || [];
})
</script>
