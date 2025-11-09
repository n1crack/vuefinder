<script setup lang="ts">
import { inject, ref, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';
import FolderSVG from '../../assets/icons/folder.svg';
import OpenFolderSVG from '../../assets/icons/open_folder.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import MinusSVG from '../../assets/icons/minus.svg';
import type { DirEntry } from '../../types';

import { useApp } from '../../composables/useApp';
const app = useApp();
const { t } = app.i18n;

const fs = app.fs;

// Props
const props = defineProps<{
  folder: DirEntry;
  storage: string;
  modelValue: DirEntry | null;
  expandedFolders: Record<string, boolean>;
  modalTreeData: Record<string, DirEntry[]>;
  currentPath?: any;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: DirEntry | null];
  selectAndClose: [value: DirEntry | null];
  toggleFolder: [storage: string, folderPath: string];
}>();

// Use nanostores reactive values for template reactivity
const path: StoreValue<CurrentPathState> = useStore(fs.path);

// Computed properties
const isExpanded = computed(() => {
  const key = `${props.storage}:${props.folder.path}`;
  return props.expandedFolders[key] || false;
});

const isSelected = computed(() => {
  return props.modelValue?.path === props.folder.path;
});

const isCurrentPath = computed(() => {
  return props.currentPath?.path === props.folder.path;
});

const allSubfolders = computed(() => {
  return props.modalTreeData[props.folder.path] || [];
});

const subfolders = computed(() => {
  const allFolders = allSubfolders.value;

  // Limit render to first 50 folders for performance at any level
  // This prevents rendering too many folders at once (e.g., 50k folders)
  if (allFolders.length > 50) {
    return allFolders.slice(0, 50);
  }

  return allFolders;
});

const totalSubfoldersCount = computed(() => {
  return allSubfolders.value.length;
});

const showMoreFoldersNote = computed(() => {
  return totalSubfoldersCount.value > 50;
});

const hasSubfolders = computed(() => {
  // Check if subfolders exist or if this folder can potentially have subfolders
  return allSubfolders.value.length > 0 || props.folder.type === 'dir';
});

// Methods
const toggleFolder = () => {
  emit('toggleFolder', props.storage, props.folder.path);
};

const selectFolder = () => {
  emit('update:modelValue', props.folder);
};

const selectFolderAndClose = () => {
  emit('update:modelValue', props.folder);
  emit('selectAndClose', props.folder);
};

// Touch handling for mobile double-tap
let lastTouchTime = 0;
const DOUBLE_TAP_DELAY = 300; // milliseconds

const handleFolderTouch = () => {
  const currentTime = Date.now();
  if (currentTime - lastTouchTime < DOUBLE_TAP_DELAY) {
    // Double tap detected
    selectFolderAndClose();
  } else {
    // Single tap
    selectFolder();
  }
  lastTouchTime = currentTime;
};
</script>

<template>
  <div class="vuefinder__modal-tree__folder-item">
    <div class="vuefinder__modal-tree__folder-content">
      <div v-if="hasSubfolders" class="vuefinder__modal-tree__folder-toggle" @click="toggleFolder">
        <PlusSVG v-if="!isExpanded" class="vuefinder__modal-tree__folder-toggle-icon" />
        <MinusSVG v-else class="vuefinder__modal-tree__folder-toggle-icon" />
      </div>
      <div v-else class="vuefinder__modal-tree__folder-spacer"></div>

      <div
        class="vuefinder__modal-tree__folder-link"
        :class="{
          'vuefinder__modal-tree__folder-link--selected': isSelected,
          'vuefinder__modal-tree__folder-link--current': isCurrentPath,
        }"
        @click="selectFolder"
        @dblclick="selectFolderAndClose"
        @touchend="handleFolderTouch"
      >
        <FolderSVG
          v-if="!isExpanded"
          class="vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
        />
        <OpenFolderSVG
          v-else
          class="vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
        />
        <span class="vuefinder__modal-tree__folder-text">{{ folder.basename }}</span>
      </div>
    </div>

    <!-- Recursive subfolders -->
    <div v-if="isExpanded && hasSubfolders" class="vuefinder__modal-tree__subfolders">
      <ModalTreeFolderItem
        v-for="subfolder in subfolders"
        :key="subfolder.path"
        :folder="subfolder"
        :storage="storage"
        :model-value="modelValue"
        :expanded-folders="expandedFolders"
        :modal-tree-data="modalTreeData"
        :current-path="currentPath"
        @update:model-value="$emit('update:modelValue', $event)"
        @select-and-close="$emit('selectAndClose', $event)"
        @toggle-folder="(storage, folderPath) => $emit('toggleFolder', storage, folderPath)"
      />
      <div v-if="showMoreFoldersNote" class="vuefinder__modal-tree__more-note">
        <div class="vuefinder__modal-tree__more-note-text">
          {{ t('... and %s more folders', totalSubfoldersCount - 50) }}
        </div>
      </div>
    </div>
  </div>
</template>
