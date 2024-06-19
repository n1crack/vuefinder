<template>
  <ul ref="parentSubfolderList" class="block">
    <li v-for="(item, index) in treeSubFolders"
        class="flex flex-col space-x-0.5 py-0.5 text-sm" :key="item.path">
      <div class="flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded ">
        <div class="h-5 w-5 shrink-0"  @click="showSubFolders[item.path] = !showSubFolders[item.path]">
          <FolderLoaderIndicator :adapter="adapter" :path="item.path" v-model="showSubFolders[item.path]" />
        </div>
        <div class="flex cursor-pointer" :title="item.path"
            @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: props.adapter, path:item.path}})">
          <div class="h-5 w-5 shrink-0">
            <OpenFolderSVG v-if="app.fs.path === item.path"/>
            <FolderSVG v-else/>
          </div>
          <div class="text-nowrap pr-4" :class="{'underline decoration-blue-300 dark:decoration-gray-400' : app.fs.path === item.path}">{{ item.basename }}</div>
        </div>
      </div>
      <div class="pl-4">
        <TreeSubfolderList :adapter="props.adapter" :path="item.path" v-show="showSubFolders[item.path]" />
      </div>
    </li>
  </ul>
</template>
<script setup>
import {computed, inject, onMounted, ref} from 'vue';

import FolderSVG from "./icons/folder.svg";
import OpenFolderSVG from "./icons/open_folder.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import {OverlayScrollbars} from "overlayscrollbars";

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
const parentSubfolderList = ref(null)

onMounted(() => {
  // only initialize overlay scrollbars for the root folder
  if (props.path === props.adapter + '://') {
    OverlayScrollbars(parentSubfolderList.value, {
      scrollbars: {
        theme: 'vf-theme-dark dark:vf-theme-light',
      },
    });
  }
});
const treeSubFolders = computed(() => {
  return app.treeViewData.find(e => e.path === props.path)?.folders || [];
})
</script>
