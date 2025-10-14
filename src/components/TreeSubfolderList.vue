<script setup lang="ts">
import {computed, inject, onMounted, ref} from 'vue';
import {useStore} from '@nanostores/vue';

import FolderSVG from "../assets/icons/folder.svg";
import OpenFolderSVG from "../assets/icons/open_folder.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import {OverlayScrollbars} from "overlayscrollbars";
import {useDragNDrop} from '../composables/useDragNDrop';

const app = inject('ServiceContainer');
const fs = app.fs;
const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])
const showSubFolders = ref<Record<string, boolean>>({});

// Make path reactive
const currentPath = useStore(fs.path);

const props = defineProps<{
  storage: string
  path: string
}>()
const parentSubfolderList = ref(null)

onMounted(() => {
  // only initialize overlay scrollbars for the root folder
  if (props.path === props.storage + '://' && parentSubfolderList.value) {
    OverlayScrollbars(parentSubfolderList.value, {
      scrollbars: {
        theme: 'vf-theme-dark dark:vf-theme-light',
      },
    });
  }
});
const treeSubFolders = computed(() => {
  return app.treeViewData.find((e: {path: string, folders: Array<{storage: string, path: string, basename: string, type: 'dir'}>}) => e.path === props.path)?.folders || [];
})
</script>

<template>
  <ul ref="parentSubfolderList" class="vuefinder__treesubfolderlist__container">
    <li
        v-for="item in treeSubFolders"
        :key="item.path"
        class="vuefinder__treesubfolderlist__item"
    >
      <div
          v-on="dragNDrop.events({...item, type: 'dir'})"
          class="vuefinder__treesubfolderlist__item-content">
        <div
            class="vuefinder__treesubfolderlist__item-toggle"
            @click="showSubFolders[item.path] = !showSubFolders[item.path]"
        >
          <FolderLoaderIndicator :storage="storage" :path="item.path" v-model="showSubFolders[item.path]"/>
        </div>
        <div
            class="vuefinder__treesubfolderlist__item-link"
            :title="item.path"
            @dblclick="showSubFolders[item.path] = !showSubFolders[item.path]"
            @click="app.emitter.emit('vf-fetch', {params:{q: 'index', storage: props.storage, path:item.path}})"
        >
          <div class="vuefinder__treesubfolderlist__item-icon">
            <OpenFolderSVG v-if="currentPath?.path === item.path"/>
            <FolderSVG v-else/>
          </div>
          <div
              class="vuefinder__treesubfolderlist__item-text"
              :class="{
              'vuefinder__treesubfolderlist__item-text--active': currentPath?.path === item.path,
            }"
          >
            {{ item.basename }}
          </div>
        </div>
      </div>
      <div class="vuefinder__treesubfolderlist__subfolder">
        <TreeSubfolderList :storage="props.storage" :path="item.path" v-show="showSubFolders[item.path]"/>
      </div>
    </li>
  </ul>
</template>

