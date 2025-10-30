<script setup lang="ts">
import {computed, inject, onMounted, ref} from 'vue';
import { useApp } from '../composables/useApp';
import {useStore} from '@nanostores/vue';

import FolderSVG from "../assets/icons/folder.svg";
import OpenFolderSVG from "../assets/icons/open_folder.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import {OverlayScrollbars} from "overlayscrollbars";
import {useDragNDrop} from '../composables/useDragNDrop';
import type { TreeViewData, DirEntry } from '../types';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';

const app = useApp();
const fs = app.fs;
const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over'])
const showSubFolders = ref<Record<string, boolean>>({});
const {t} = app.i18n;

// Make path reactive
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

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
        theme: 'vf-scrollbars-theme',
      },
    });
  }
});
const treeSubFolders = computed(() => {
  const entry = app.treeViewData.find((e: TreeViewData) => e.path === props.path) as TreeViewData | undefined;
  return entry?.folders || [];
})
</script>

<template>
  <ul ref="parentSubfolderList" class="vuefinder__treesubfolderlist__container">
    <li v-if="!treeSubFolders.length">
        <div class="vuefinder__treesubfolderlist__no-folders">{{ t('No folders') }}</div>
    </li>
    <li
        v-for="item in treeSubFolders"
        :key="item.path"
        class="vuefinder__treesubfolderlist__item"
    >
      <div

          class="vuefinder__treesubfolderlist__item-content">
        <div
            class="vuefinder__treesubfolderlist__item-toggle"
            @click="showSubFolders[item.path] = !showSubFolders[item.path]"
        >
          <FolderLoaderIndicator :storage="storage" :path="item.path" v-model="showSubFolders[item.path]"/>
        </div>
        <div
            v-on="dragNDrop.events({
              ...item,
              dir: item.path,
              extension: '',
              file_size: null,
              last_modified: null,
              mime_type: null,
              visibility: 'public'
            } as DirEntry)"
            class="vuefinder__treesubfolderlist__item-link"
            :title="item.path"
            @dblclick="showSubFolders[item.path] = !showSubFolders[item.path]"
            @click="app.adapter.open(item.path)"
        >
          <div class="vuefinder__treesubfolderlist__item-icon">
            <OpenFolderSVG class="vuefinder__item-icon__folder--open" v-if="currentPath?.path === item.path"/>
            <FolderSVG class="vuefinder__item-icon__folder" v-else/>
          </div>
          <div
              class="vuefinder__treesubfolderlist__item-text"
              :class="{
              'vuefinder__treesubfolderlist__item-text--active': currentPath.path === item.path,
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

