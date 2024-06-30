<template>
  <ul ref="parentSubfolderList" class="vuefinder__treesubfolderlist__container">
    <li
      v-for="(item, index) in treeSubFolders"
      :key="item.path"
      class="vuefinder__treesubfolderlist__item"
    >
      <div class="vuefinder__treesubfolderlist__item-content">
        <div
          class="vuefinder__treesubfolderlist__item-toggle"
          @click="showSubFolders[item.path] = !showSubFolders[item.path]"
        >
          <FolderLoaderIndicator :adapter="adapter" :path="item.path" v-model="showSubFolders[item.path]" />
        </div>
        <div
          class="vuefinder__treesubfolderlist__item-link"
          :title="item.path"
          @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: props.adapter, path:item.path}})"
        >
          <div class="vuefinder__treesubfolderlist__item-icon">
            <OpenFolderSVG v-if="app.fs.path === item.path" />
            <FolderSVG v-else />
          </div>
          <div
            class="vuefinder__treesubfolderlist__item-text"
            :class="{
              'vuefinder__treesubfolderlist__item-text--active': app.fs.path === item.path,
            }"
          >
            {{ item.basename }}
          </div>
        </div>
      </div>
      <div class="vuefinder__treesubfolderlist__subfolder">
        <TreeSubfolderList :adapter="props.adapter" :path="item.path" v-show="showSubFolders[item.path]" />
      </div>
    </li>
  </ul>
</template>

<style>
.vuefinder__treesubfolderlist__container {
  @apply block;
}

.vuefinder__treesubfolderlist__item {
  @apply flex flex-col space-x-0.5 py-0.5 text-sm;
}

.vuefinder__treesubfolderlist__item-content {
  @apply flex hover:text-sky-700 dark:hover:text-sky-200/50 rounded;
}

.vuefinder__treesubfolderlist__item-toggle {
  @apply h-5 w-5 shrink-0;
}

.vuefinder__treesubfolderlist__item-link {
  @apply flex cursor-pointer;
}

.vuefinder__treesubfolderlist__item-icon {
  @apply h-5 w-5 shrink-0;
}

.vuefinder__treesubfolderlist__item-text {
  @apply text-nowrap pr-4;
}

.vuefinder__treesubfolderlist__item-text--active {
  @apply underline decoration-blue-300 dark:decoration-gray-400;
}

.vuefinder__treesubfolderlist__subfolder {
  @apply pl-4;
}
</style>


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
