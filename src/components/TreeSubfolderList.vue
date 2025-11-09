<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useApp } from '../composables/useApp';
import { useStore } from '@nanostores/vue';

import FolderSVG from '../assets/icons/folder.svg';
import OpenFolderSVG from '../assets/icons/open_folder.svg';
import FolderLoaderIndicator from './FolderLoaderIndicator.vue';
import { OverlayScrollbars } from 'overlayscrollbars';
import { useDragNDrop } from '../composables/useDragNDrop';
import type { TreeViewData, DirEntry } from '../types';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';

const app = useApp();
const fs = app.fs;
const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);
const showSubFolders = ref<Record<string, boolean>>({});
const { t } = app.i18n;

// Make path reactive
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const props = defineProps<{
  storage: string;
  path: string;
}>();
const parentSubfolderList = ref(null);

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
  const entry = app.treeViewData.find((e: TreeViewData) => e.path === props.path) as
    | TreeViewData
    | undefined;
  const allFolders = entry?.folders || [];

  // Limit render to first 50 folders for performance at any level
  // This prevents rendering too many folders at once (e.g., 50k folders)
  if (allFolders.length > 50) {
    return allFolders.slice(0, 50);
  }

  return allFolders;
});

const totalFoldersCount = computed(() => {
  const entry = app.treeViewData.find((e: TreeViewData) => e.path === props.path) as
    | TreeViewData
    | undefined;
  return entry?.folders?.length || 0;
});

const showMoreFoldersNote = computed(() => {
  return totalFoldersCount.value > 50;
});
</script>

<template>
  <ul ref="parentSubfolderList" class="vuefinder__treesubfolderlist__container">
    <li v-if="!treeSubFolders.length">
      <div class="vuefinder__treesubfolderlist__no-folders">{{ t('No folders') }}</div>
    </li>
    <li v-for="item in treeSubFolders" :key="item.path" class="vuefinder__treesubfolderlist__item">
      <div class="vuefinder__treesubfolderlist__item-content">
        <div
          class="vuefinder__treesubfolderlist__item-toggle"
          @click="showSubFolders[item.path] = !showSubFolders[item.path]"
        >
          <FolderLoaderIndicator
            v-model="showSubFolders[item.path]"
            :storage="storage"
            :path="item.path"
          />
        </div>
        <div
          class="vuefinder__treesubfolderlist__item-link"
          :title="item.path"
          v-on="
            dragNDrop.events({
              ...item,
              dir: item.path,
              extension: '',
              file_size: null,
              last_modified: null,
              mime_type: null,
              visibility: 'public',
            } as DirEntry)
          "
          @dblclick="showSubFolders[item.path] = !showSubFolders[item.path]"
          @click="app.adapter.open(item.path)"
        >
          <div class="vuefinder__treesubfolderlist__item-icon">
            <OpenFolderSVG
              v-if="currentPath?.path === item.path"
              class="vuefinder__item-icon__folder--open"
            />
            <FolderSVG v-else class="vuefinder__item-icon__folder" />
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
        <TreeSubfolderList
          v-show="showSubFolders[item.path]"
          :storage="props.storage"
          :path="item.path"
        />
      </div>
    </li>
    <li v-if="showMoreFoldersNote" class="vuefinder__treesubfolderlist__more-note">
      <div class="vuefinder__treesubfolderlist__more-note-text">
        {{ t('... and %s more folders', totalFoldersCount - 50) }}
      </div>
    </li>
  </ul>
</template>
