<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useApp } from '../composables/useApp';
import { useStore } from '@nanostores/vue';

import StorageSVG from '../assets/icons/storage.svg';
import FolderLoaderIndicator from './FolderLoaderIndicator.vue';
import TreeSubfolderList from './TreeSubfolderList.vue';
import { useDragNDrop } from '../composables/useDragNDrop';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';
import type { ConfigState } from '../stores/config';

const app = useApp();
const fs = app.fs;
const config = app.config;
const props = defineProps<{
  storage: string;
}>();
const configState: StoreValue<ConfigState> = useStore(config.state);

const hasExpandedPathInStorage = computed(() => {
  const expandedPaths = configState.value.expandedTreePaths || [];
  const storagePrefix = `${props.storage}://`;
  return expandedPaths.some(
    (path: string) => path === storagePrefix || path.startsWith(`${storagePrefix}`)
  );
});

const showSubFolders = ref(configState.value.expandTreeByDefault || hasExpandedPathInStorage.value);

const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);

// Make path reactive
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

// Computed for active state
const isActive = computed(() => {
  return props.storage === currentPath.value?.storage;
});

watch(
  () => ({
    expandTreeByDefault: configState.value.expandTreeByDefault,
    hasExpandedPathInStorage: hasExpandedPathInStorage.value,
  }),
  (value) => {
    if (value.expandTreeByDefault || value.hasExpandedPathInStorage) {
      showSubFolders.value = true;
    }
  }
);

const item = {
  storage: props.storage,
  path: props.storage + '://',
  dir: props.storage + '://',
  type: 'dir' as const,
  basename: props.storage,
  extension: '',
  file_size: null,
  last_modified: null,
  mime_type: null,
  visibility: 'public',
};

/**
 * If the storage is active the visibilty of the subfolders gets toggled, otherwise the storage will become active
 * @param storage {string}
 */
function selectOrToggle(storage: string) {
  if (storage === currentPath.value?.storage) {
    // toggle list of subfolders
    showSubFolders.value = !showSubFolders.value;
  } else {
    // select storage
    app.adapter.open(storage + '://');
  }
}
</script>
<template>
  <div class="vuefinder__treestorageitem__header" @click="selectOrToggle(storage)">
    <div
      class="vuefinder__treestorageitem__info"
      :class="isActive ? 'vuefinder__treestorageitem__info--active' : ''"
      v-on="dragNDrop.events(item)"
    >
      <div
        class="vuefinder__treestorageitem__icon"
        :class="isActive ? 'vuefinder__treestorageitem__icon--active' : ''"
      >
        <StorageSVG />
      </div>
      <div>{{ storage }}</div>
    </div>

    <div class="vuefinder__treestorageitem__loader" @click.stop="showSubFolders = !showSubFolders">
      <FolderLoaderIndicator v-model="showSubFolders" :storage="storage" :path="storage + '://'" />
    </div>
  </div>
  <TreeSubfolderList
    v-show="showSubFolders"
    :storage="storage"
    :path="storage + '://'"
    class="vuefinder__treestorageitem__subfolder"
  />
</template>
