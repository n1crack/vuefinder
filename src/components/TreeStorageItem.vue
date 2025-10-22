
<script setup lang="ts">
import {inject, ref, computed} from 'vue';
import {useStore} from '@nanostores/vue';

import StorageSVG from "../assets/icons/storage.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import TreeSubfolderList from "./TreeSubfolderList.vue";
import {useDragNDrop} from '../composables/useDragNDrop';

const app = inject('ServiceContainer');
const fs = app.fs;
const showSubFolders = ref(false);
const props = defineProps<{
  storage: string
}>()

const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over'])

// Make path reactive
const currentPath = useStore(fs.path);

// Computed for active state
const isActive = computed(() => {
  return props.storage === currentPath.value?.storage;
});

const item = {
  storage: props.storage,
  path: (props.storage + '://'),
  type: 'dir' as const,
  basename: props.storage,
  extension: '',
  file_size: null,
  last_modified: null,
  mime_type: null,
  visibility: 'public'
}

/**
 * If the storage is active the visibilty of the subfolders gets toggled, otherwise the storage will become active
 * @param storage {string}
 */
function selectOrToggle(storage: string) {
  if (storage === currentPath.value?.storage) {
    // toggle list of subfolders
    showSubFolders.value = !showSubFolders.value
  } else {
    // select storage
    app.emitter.emit('vf-search-exit');
    app.emitter.emit('vf-fetch', {params:{q: 'index', storage: storage}});
  }
}

</script>
<template>
  <div
    @click="selectOrToggle(storage)"
    class="vuefinder__treestorageitem__header"
  >
    <div
      v-on="dragNDrop.events(item)"
      class="vuefinder__treestorageitem__info"
        :class="isActive ? 'vuefinder__treestorageitem__info--active' : ''"
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
      <FolderLoaderIndicator :storage="storage" :path="storage + '://'" v-model="showSubFolders" />
    </div>
  </div> 
  <TreeSubfolderList :storage="storage" :path="storage + '://'" v-show="showSubFolders" class="vuefinder__treestorageitem__subfolder" />
</template>

