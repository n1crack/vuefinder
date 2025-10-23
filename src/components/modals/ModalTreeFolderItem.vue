<script setup lang="ts">
import {inject, ref, computed} from 'vue';
import {useStore} from '@nanostores/vue';
import FolderSVG from '../../assets/icons/folder.svg';
import OpenFolderSVG from '../../assets/icons/open_folder.svg';
import PlusSVG from "../../assets/icons/plus.svg";
import MinusSVG from "../../assets/icons/minus.svg";
import type {App, DirEntry} from '../../types';

const app = inject('ServiceContainer') as App;
const {t} = app.i18n;

const fs = app.fs;

// Props
const props = defineProps<{
  folder: DirEntry
  storage: string
  modelValue: DirEntry | null
  expandedFolders: Record<string, boolean>
  modalTreeData: Record<string, DirEntry[]>
  currentPath?: any
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: DirEntry | null]
  'selectAndClose': [value: DirEntry | null]
  'toggleFolder': [storage: string, folderPath: string]
}>()

// Use nanostores reactive values for template reactivity
const path = useStore(fs.path);

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

const subfolders = computed(() => {
  return props.modalTreeData[props.folder.path] || [];
});

const hasSubfolders = computed(() => {
  // Check if subfolders exist or if this folder can potentially have subfolders
  return subfolders.value.length > 0 || props.folder.type === 'dir';
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
</script>

<template>
  <div class="vuefinder__modal-tree__folder-item">
    <div class="vuefinder__modal-tree__folder-content">
      <div 
        v-if="hasSubfolders"
        class="vuefinder__modal-tree__folder-toggle"
        @click="toggleFolder"
      >
        <PlusSVG v-if="!isExpanded" class="vuefinder__modal-tree__folder-toggle-icon"/>
        <MinusSVG v-else class="vuefinder__modal-tree__folder-toggle-icon"/>
      </div>
      <div 
        v-else
        class="vuefinder__modal-tree__folder-spacer"
      ></div>
      
      <div
        class="vuefinder__modal-tree__folder-link"
        :class="{ 
          'vuefinder__modal-tree__folder-link--selected': isSelected,
          'vuefinder__modal-tree__folder-link--current': isCurrentPath
        }"
        @click="selectFolder"
        @dblclick="selectFolderAndClose"
      >
        <FolderSVG v-if="!isExpanded" class="vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"/>
        <OpenFolderSVG v-else class="vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"/>
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
        :modelValue="modelValue"
        :expandedFolders="expandedFolders"
        :modalTreeData="modalTreeData"
        :currentPath="currentPath"
        @update:modelValue="$emit('update:modelValue', $event)"
        @selectAndClose="$emit('selectAndClose', $event)"
        @toggleFolder="(storage, folderPath) => $emit('toggleFolder', storage, folderPath)"
      />
    </div>
  </div>
</template>
