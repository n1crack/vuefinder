<script setup lang="ts">
import {computed, ref, watch, onMounted} from 'vue';
import {useStore} from '@nanostores/vue';
import FolderSVG from '../../assets/icons/folder.svg';
import PlusSVG from "../../assets/icons/plus.svg";
import MinusSVG from "../../assets/icons/minus.svg";
import PinSVG from "../../assets/icons/pin.svg";
import {OverlayScrollbars} from 'overlayscrollbars';
import type {DirEntry} from '../../types';
import StorageSVG from '../../assets/icons/storage.svg';
import ModalTreeFolderItem from './ModalTreeFolderItem.vue';

import { useApp } from '../../composables/useApp';
const app = useApp();
const {t} = app.i18n;

const fs = app.fs;
const config = app.config;

// Props
defineProps<{
  modelValue: DirEntry | null
  showPinnedFolders?: boolean
  currentPath?: any
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: DirEntry | null]
  'selectAndClose': [value: DirEntry | null]
}>()

// Use nanostores reactive values for template reactivity
const sortedFiles = useStore(fs.sortedFiles);
const storages = useStore(fs.storages);
const storagesList = computed(() => storages.value || []);
const path = useStore(fs.path);

const modalContentElement = ref(null);

// Track expanded folders state
const expandedFolders = ref<Record<string, boolean>>({});

// Modal-specific tree data
const modalTreeData = ref<Record<string, DirEntry[]>>({});

// watch for changes in the fs.data
// update the modalTreeData
watch(sortedFiles, (newFiles: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const folders = newFiles.filter((e: DirEntry) => e.type === 'dir');
  const currentPath = path.value?.path || '';

  if (currentPath) {
    modalTreeData.value[currentPath] = folders.map((item: DirEntry) => ({
      ...item,
      type: 'dir' as const
    }));
  }
});

// Function to toggle folder expansion
const toggleFolder = (storage: string, folderPath: string) => {
  const key = `${storage}:${folderPath}`;

  // Toggle the expanded state - create a new object to ensure reactivity
  expandedFolders.value = {
    ...expandedFolders.value,
    [key]: !expandedFolders.value[key]
  };

  // Load subfolders if not already loaded and we're expanding
  if (expandedFolders.value[key] && !modalTreeData.value[folderPath]) {
    // Use a custom event that won't affect the main directory
    app.adapter.list(folderPath).then((result: { files: DirEntry[] }) => {
      const files = result.files || [];
      const folders = (files as DirEntry[]).filter((e: DirEntry) => e.type === 'dir');
      modalTreeData.value[folderPath] = folders.map((item: DirEntry) => ({
        ...item,
        type: 'dir' as const
      }));
    });

  }
};

// Function to get folders for a path
const getFoldersForPath = (folderPath: string): DirEntry[] => {
  return modalTreeData.value[folderPath] || [];
};

const selectFolder = (folder: DirEntry | null) => {
  if (!folder) return;
  emit('update:modelValue', folder);
}

const selectFolderAndClose = (folder: DirEntry | null) => {
  if (!folder) return;
  emit('update:modelValue', folder);
  emit('selectAndClose', folder);
}

const selectStorage = (storage: string) => {
  const storageItem: DirEntry = {
    storage: storage,
    path: storage + '://',
    basename: storage,
    type: 'dir' as const,
    extension: '',
    file_size: null,
    last_modified: null,
    mime_type: null,
    visibility: 'public',
    dir: storage + '://'
  };
  emit('update:modelValue', storageItem);
}

const selectStorageAndClose = (storage: string) => {
  const storageItem: DirEntry = {
    storage: storage,
    path: storage + '://',
    basename: storage,
    type: 'dir' as const,
    extension: '',
    file_size: null,
    last_modified: null,
    mime_type: null,
    visibility: 'public',
    dir: storage + '://'
  };
  emit('update:modelValue', storageItem);
  emit('selectAndClose', storageItem);
}

// Touch handling for mobile double-tap
let lastTouchTime = 0;
const DOUBLE_TAP_DELAY = 300; // milliseconds

const handleFolderTouch = (folder: DirEntry | null) => {
  if (!folder) return;
  const currentTime = Date.now();
  if (currentTime - lastTouchTime < DOUBLE_TAP_DELAY) {
    // Double tap detected
    selectFolderAndClose(folder);
  } else {
    // Single tap
    selectFolder(folder);
  }
  lastTouchTime = currentTime;
}

const handleStorageTouch = (storage: string) => {
  const currentTime = Date.now();
  if (currentTime - lastTouchTime < DOUBLE_TAP_DELAY) {
    // Double tap detected
    selectStorageAndClose(storage);
  } else {
    // Single tap
    selectStorage(storage);
  }
  lastTouchTime = currentTime;
}

onMounted(() => {
  if (modalContentElement.value) {
    OverlayScrollbars(modalContentElement.value, {
      overflow: {
        x: 'hidden',
      },
      scrollbars: {
        theme: 'vf-scrollbars-theme',
      },
    });
  }
});
</script>

<template>
  <div class="vuefinder__modal-tree">
    <div class="vuefinder__modal-tree__header">
      <div class="vuefinder__modal-tree__title">{{ t('Select Target Folder') }}</div>
    </div>

    <div ref="modalContentElement" class="vuefinder__modal-tree__content">
      <!-- Pinned folders -->
      <div v-if="showPinnedFolders && config.get('pinnedFolders').length" class="vuefinder__modal-tree__section">
        <div class="vuefinder__modal-tree__section-title">{{ t('Pinned Folders') }}</div>
        <div class="vuefinder__modal-tree__list">
          <div
              v-for="folder in config.get('pinnedFolders')"
              :key="folder.path"
              class="vuefinder__modal-tree__item"
              @click="selectFolder(folder)"
              @dblclick="selectFolderAndClose(folder)"
              @touchend="handleFolderTouch(folder)"
              :class="{ 'vuefinder__modal-tree__item--selected': modelValue?.path === folder.path }"
          >
            <FolderSVG class="vuefinder__modal-tree__icon vuefinder__item-icon__folder"/>
            <div class="vuefinder__modal-tree__text">{{ folder.basename }}</div>
            <div class="vuefinder__modal-tree__text-storage">{{ folder.storage }}</div>
            <PinSVG class="vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin"/>
          </div>
        </div>
      </div>
      
      <div class="vuefinder__modal-tree__section-title">{{ t('Storages') }}</div>

      <!-- Storage roots with expandable subfolders -->
      <div class="vuefinder__modal-tree__section"
           v-for="storage in storagesList" :key="storage">
        <div class="vuefinder__modal-tree__list">
          <!-- Storage Root Item -->
          <div class="vuefinder__modal-tree__storage-item">
            <div class="vuefinder__modal-tree__storage-content">
              <div class="vuefinder__modal-tree__storage-toggle"
                   @click.stop="toggleFolder(storage, storage + '://')">
                <PlusSVG v-if="!expandedFolders[`${storage}:${storage}://`]"
                         class="vuefinder__modal-tree__toggle-icon"/>
                <MinusSVG v-else class="vuefinder__modal-tree__toggle-icon"/>
              </div>
              <div
                  class="vuefinder__modal-tree__storage-link"
                  @click="selectStorage(storage)"
                  @dblclick="selectStorageAndClose(storage)"
                  @touchend="handleStorageTouch(storage)"
                  :class="{ 'vuefinder__modal-tree__storage-link--selected': modelValue?.path === storage + '://' }"
              >
                <StorageSVG class="vuefinder__modal-tree__storage-icon"/>
                <span class="vuefinder__modal-tree__storage-text">{{ storage }}</span>
              </div>
            </div>

            <!-- Subfolders using recursive component -->
            <div v-if="expandedFolders[`${storage}:${storage}://`]" class="vuefinder__modal-tree__subfolders">
              <ModalTreeFolderItem
                v-for="folder in getFoldersForPath(storage + '://')"
                :key="folder.path"
                :folder="folder"
                :storage="storage"
                :modelValue="modelValue"
                :expandedFolders="expandedFolders"
                :modalTreeData="modalTreeData"
                :currentPath="currentPath"
                @update:modelValue="selectFolder"
                @selectAndClose="selectFolderAndClose"
                @toggleFolder="toggleFolder"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
