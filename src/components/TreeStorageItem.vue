
<script setup lang="ts">
import {inject, ref} from 'vue';

import StorageSVG from "@/assets/icons/storage.svg";
import FolderLoaderIndicator from "./FolderLoaderIndicator.vue";
import TreeSubfolderList from "./TreeSubfolderList.vue";
import {useDragNDrop} from '../composables/useDragNDrop';

const app = inject('ServiceContainer');
const {setStore} = app.storage;
const showSubFolders = ref(false);
const props = defineProps<{
  storage: string
}>()

const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])

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
  if (storage === app.fs.adapter) {
    // toggle list of subfolders
    showSubFolders.value = !showSubFolders.value
  } else {
    // select storage
    app.emitter.emit('vf-search-exit');
    app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: storage}});
    setStore('adapter', storage);
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
      :class="storage === app.fs.adapter ? 'vuefinder__treestorageitem__info--active' : ''"
    >
      <div
        class="vuefinder__treestorageitem__icon"
        :class="storage === app.fs.adapter ? 'vuefinder__treestorageitem__icon--active' : ''"
      >
        <StorageSVG />
      </div>
      <div>{{ storage }}</div>
    </div>

    <div class="vuefinder__treestorageitem__loader" @click.stop="showSubFolders = !showSubFolders">
      <FolderLoaderIndicator :adapter="storage" :path="storage + '://'" v-model="showSubFolders" />
    </div>
  </div>
  <TreeSubfolderList :adapter="storage" :path="storage + '://'" v-show="showSubFolders" class="vuefinder__treestorageitem__subfolder" />
</template>

