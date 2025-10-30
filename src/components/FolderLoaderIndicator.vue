<script setup lang="ts">
import { ref, inject, watch } from 'vue';

import SquarePlusSVG from '../assets/icons/plus.svg';
import SquareMinusSVG from '../assets/icons/minus.svg';
import LoadingSVG from '../assets/icons/loading.svg';
import upsert from '../utils/upsert';
import type { DirEntry } from '../types';
import { useApp } from '../composables/useApp';

const props = defineProps<{
  storage: string;
  path: string;
}>();

const app = useApp();
const opened = defineModel();
const loading = ref(false);

watch(
  () => opened.value,
  () => fetchSubFolders()
);

const fetchSubFolders = async () => {
  loading.value = true;
  try {
    const data = await app.adapter.list(props.path);
    const folders = data.files.filter((file: DirEntry) => file.type === 'dir');

    upsert(app.treeViewData, { path: props.path, type: 'dir', folders });
  } catch (e: unknown) {
    console.error('Failed to fetch subfolders:', e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="vuefinder__folder-loader-indicator">
    <LoadingSVG v-if="loading" class="vuefinder__folder-loader-indicator--loading" />
    <div v-else class="vuefinder__folder-loader-indicator--icon">
      <SquareMinusSVG v-if="opened" class="vuefinder__folder-loader-indicator--minus" />
      <SquarePlusSVG v-if="!opened" class="vuefinder__folder-loader-indicator--plus" />
    </div>
  </div>
</template>
