<script setup lang="ts">
import { ref, computed } from 'vue';
import { useApp } from '../composables/useApp';
import { useStore } from '@nanostores/vue';

import StorageSVG from '../assets/icons/storage.svg';
import FolderLoaderIndicator from './FolderLoaderIndicator.vue';
import TreeSubfolderList from './TreeSubfolderList.vue';
import { useDragNDrop } from '../composables/useDragNDrop';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';

const app = useApp();
const fs = app.fs;
const showSubFolders = ref(false);
const props = defineProps<{
  storage: string;
}>();

const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);

// Make path reactive
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

// Computed for active state
const isActive = computed(() => {
  return props.storage === currentPath.value?.storage;
});

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
