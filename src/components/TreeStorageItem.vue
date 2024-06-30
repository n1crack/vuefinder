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

<style>
.vuefinder__treestorageitem__header {
  @apply p-1 py-1.5 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex justify-between bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer;
}

.vuefinder__treestorageitem__info {
  @apply flex flex-1 space-x-1 items-center;
}

.vuefinder__treestorageitem__info--active {
  @apply text-gray-700/80 dark:text-gray-300/80 font-bold;
}

.vuefinder__treestorageitem__icon {
  @apply h-5 w-5 shrink-0;
}

.vuefinder__treestorageitem__icon--active {
  @apply text-sky-500 dark:text-slate-300;
}

.vuefinder__treestorageitem__loader {
  @apply pointer-events-none pr-1;
}

.vuefinder__treestorageitem__subfolder {
  @apply overflow-x-auto my-1;
}
</style>

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
