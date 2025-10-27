<script setup lang="ts">
import {ref, inject, watch} from 'vue';

import SquarePlusSVG from "../assets/icons/plus.svg";
import SquareMinusSVG from "../assets/icons/minus.svg";
import LoadingSVG from "../assets/icons/loading.svg";
import upsert from "../utils/upsert";

const props = defineProps<{
  storage: string
  path: string
}>()

const app = inject('ServiceContainer');
const {t} = app.i18n;
const opened = defineModel();
const loading = ref(false)

// loading..

watch(() => opened.value, () =>
    getLoadedFolder()?.folders.length || fetchSubFolders()
); 

function getLoadedFolder() {
  return app.treeViewData.find((e: any) => e.path === props.path);
}

const fetchSubFolders = async () => {
  loading.value = true;
  try {
    // Use the adapter to list folders
    const data = await app.adapter.list({ path: props.path });
    const folders = data.files.filter((f: any) => f.type === 'dir');
    upsert(app.treeViewData, {path: props.path, type: 'dir', folders})
  } catch (e: any) {
    console.error('Failed to fetch subfolders:', e);
  } finally {
    loading.value = false;
  }
}
</script>


<template>
  <div class="vuefinder__folder-loader-indicator">

    <LoadingSVG v-if="loading" class="vuefinder__folder-loader-indicator--loading"/>
    <div class="vuefinder__folder-loader-indicator--icon" v-else>
      <SquareMinusSVG class="vuefinder__folder-loader-indicator--minus"
                      v-if="opened"/>
      <SquarePlusSVG class="vuefinder__folder-loader-indicator--plus" v-if="!opened"/>
    </div>

  </div>
</template>
