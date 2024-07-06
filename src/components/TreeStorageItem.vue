<template>
  <div
    @click="showSubFolders = !showSubFolders"
    class="vuefinder__treestorageitem__header"
  >
    <div
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

    <div class="vuefinder__treestorageitem__loader">
      <FolderLoaderIndicator :adapter="storage" :path="storage + '://'" v-model="showSubFolders" />
    </div>
  </div>
  <TreeSubfolderList :adapter="storage" :path="storage + '://'" v-show="showSubFolders" class="vuefinder__treestorageitem__subfolder" />
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
