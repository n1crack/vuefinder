<script setup lang="ts">
import {computed, inject, ref, onMounted, onUnmounted} from 'vue';
import { useApp } from '../composables/useApp';
import {useStore} from '@nanostores/vue';
import StorageSVG from "../assets/icons/storage.svg";
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';

const app = useApp();
const {t} = app.i18n;
const fs = app.fs;

// Use nanostores reactive values for template reactivity
const sortedFiles = useStore(fs.sortedFiles);
const path = useStore(fs.path);
const selectedCount = useStore(fs.selectedCount);
const storages = useStore(fs.storages);
const selectedItems = useStore(fs.selectedItems);
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const handleStorageSelect = (event: Event) => {
  const storage = (event.target as HTMLSelectElement).value;
  app.adapter.open(storage + '://');
};

// Calculate total size of selected items
const totalSelectedSize = computed(() => {
  if (!selectedItems.value || selectedItems.value.length === 0) return 0;
  
  return selectedItems.value.reduce((total: number, item: any) => {
    return total + (item.file_size || 0);
  }, 0);
});

const storagesList = computed(() => storages.value as string[]);
const sortedFilesList = computed(() => sortedFiles.value as any[]);
const selectedCountNum = computed(() => (selectedCount.value as number) || 0);
const selectedItemsList = computed(() => selectedItems.value || []);

</script>


<template>
  <div class="vuefinder__status-bar__wrapper">
    <div class="vuefinder__status-bar__storage">
      <div class="vuefinder__status-bar__storage-container" :title="t('Storage')">
        <div class="vuefinder__status-bar__storage-icon">
          <StorageSVG/>
        </div>
        <select name="vuefinder-media-selector" :value="path.storage" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in storagesList" :value="storage" :key="storage">
            {{ storage }}
          </option>
        </select>
      </div>
        <div class="vuefinder__status-bar__info space-x-2">
          <span v-if="selectedCountNum === 0">{{ sortedFilesList.length }} {{ t('items') }}</span>
          <span v-else>
            {{ selectedCountNum }} {{ t('selected') }}
            <span v-if="totalSelectedSize" class="vuefinder__status-bar__size">
              {{ app.filesize(totalSelectedSize) }}
            </span>
          </span>
        </div>
    </div>

    <div class="vuefinder__status-bar__actions"> 
      <slot name="actions" :path="currentPath.path" :count="selectedCountNum || 0" :selected="selectedItemsList"></slot>
    </div>
  </div>
</template>
