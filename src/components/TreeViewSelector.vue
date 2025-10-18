<script setup lang="ts">
import {inject, ref, watch, onMounted} from 'vue';
import {useStore} from '@nanostores/vue';
import FolderSVG from '../assets/icons/folder.svg';
import OpenFolderSVG from '../assets/icons/open_folder.svg';
import PlusSVG from "../assets/icons/plus.svg";
import MinusSVG from "../assets/icons/minus.svg";
import PinSVG from "../assets/icons/pin.svg";
import {OverlayScrollbars} from 'overlayscrollbars';
import type {App, DirEntry} from '../types';
import StorageSVG from '../assets/icons/storage.svg';

const app = inject('ServiceContainer') as App;
const {t} = app.i18n;

const fs = app.fs;
const config = app.config;

// Props
defineProps<{
  modelValue: DirEntry | null
  showPinnedFolders?: boolean
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: DirEntry | null]
  'selectAndClose': [value: DirEntry | null]
}>()

// Use nanostores reactive values for template reactivity
const sortedFiles = useStore(fs.sortedFiles);
const storages = useStore(fs.storages);
const path = useStore(fs.path);

const compactContentElement = ref(null);

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

  // Toggle the expanded state
  expandedFolders.value[key] = !expandedFolders.value[key];

  // Load subfolders if not already loaded and we're expanding
  if (expandedFolders.value[key] && !modalTreeData.value[folderPath]) {
    // Use a custom event that won't affect the main directory
    app.emitter.emit('vf-fetch-modal', {
      params: {
        q: 'index',
        storage: storage,
        path: folderPath
      },
      onSuccess: (data: { files: DirEntry[] }) => {
        // Store the data in modalTreeData instead of changing main directory
        if (data.files) {
          const folders = data.files.filter((e: DirEntry) => e.type === 'dir');
          modalTreeData.value[folderPath] = folders.map((item: DirEntry) => ({
            ...item,
            type: 'dir' as const
          }));
        }
      }
    });
  }
};

// Function to get folders for a path
const getFoldersForPath = (folderPath: string): DirEntry[] => {
  return modalTreeData.value[folderPath] || [];
};

// Function to render folder tree recursively
const renderFolderTree = (folders: DirEntry[], storage: string, depth: number = 0): Array<{
  folder: DirEntry,
  isExpanded: boolean,
  subfolders: DirEntry[],
  depth: number
}> => {
  return folders.map(folder => {
    const subfolders = getFoldersForPath(folder.path);
    const key = `${storage}:${folder.path}`;
    const isExpanded = expandedFolders.value[key] || false;

    return {
      folder,
      isExpanded,
      subfolders,
      depth
    };
  });
};

const selectFolder = (folder: DirEntry) => {
  emit('update:modelValue', folder);
}

const selectFolderAndClose = (folder: DirEntry) => {
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


onMounted(() => {
  if (compactContentElement.value) {
    OverlayScrollbars(compactContentElement.value, {
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
  <div class="vuefinder__treeview__compact">
    <div class="vuefinder__treeview__compact-header">
      <div class="vuefinder__treeview__compact-title">{{ t('Select Target Folder') }}</div>
    </div>

    <div ref="compactContentElement" class="vuefinder__treeview__compact-content">
      <!-- Pinned folders -->
      <div v-if="showPinnedFolders && config.get('pinnedFolders').length" class="vuefinder__treeview__compact-section">
        <div class="vuefinder__treeview__compact-section-title">{{ t('Pinned Folders') }}</div>
        <div class="vuefinder__treeview__compact-list">
          <div
              v-for="folder in config.get('pinnedFolders')"
              :key="folder.path"
              class="vuefinder__treeview__compact-item"
              @click="selectFolder(folder)"
              @dblclick="selectFolderAndClose(folder)"
              :class="{ 'vuefinder__treeview__compact-item--selected': modelValue?.path === folder.path }"
          >
            <FolderSVG class="vuefinder__treeview__compact-icon"/>
            <span class="vuefinder__treeview__compact-text">{{ folder.basename }}</span>
            <PinSVG class="vuefinder__treeview__compact-icon vuefinder__treeview__compact-icon--pin"/>
          </div>
        </div>
      </div>
      <div class="vuefinder__treeview__compact-section-title">{{ t('Storages') }}</div>

      <!-- Storage roots with expandable subfolders -->
      <div class="vuefinder__treeview__compact-section"
           v-for="storage in (Array.isArray(storages) ? storages : storages.value || [])" :key="storage">
        <div class="vuefinder__treeview__compact-list">
          <!-- Storage Root Item - Same design as subfolders -->
          <div class="vuefinder__treeview__compact-folder-item">
            <div class="vuefinder__treeview__compact-folder-content">
              <div class="vuefinder__treeview__compact-folder-toggle"
                   @click.stop="toggleFolder(storage, storage + '://')">
                <PlusSVG v-if="!expandedFolders[`${storage}:${storage}://`]"
                         class="vuefinder__treeview__compact-toggle-icon"/>
                <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
              </div>
              <div
                  class="vuefinder__treeview__compact-folder-link"
                  @click="selectStorage(storage)"
                  @dblclick="selectStorageAndClose(storage)"
                  :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === storage + '://' }"
              >
                <StorageSVG class="vuefinder__treeview__compact-storage-icon"/>
                <span class="vuefinder__treeview__compact-folder-text">{{ storage }}</span>
              </div>
            </div>

            <!-- Subfolders -->
            <div v-if="expandedFolders[`${storage}:${storage}://`]" class="vuefinder__treeview__compact-subfolders">
              <div
                  v-for="folderData in renderFolderTree(getFoldersForPath(storage + '://'), storage, 1)"
                  :key="folderData.folder.path"
                  class="vuefinder__treeview__compact-folder-item"
              >
                <div class="vuefinder__treeview__compact-folder-content">
                  <div class="vuefinder__treeview__compact-folder-toggle"
                       @click="toggleFolder(storage, folderData.folder.path)">
                    <PlusSVG v-if="!folderData.isExpanded" class="vuefinder__treeview__compact-toggle-icon"/>
                    <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
                  </div>
                  <div
                      class="vuefinder__treeview__compact-folder-link"
                      @click="selectFolder(folderData.folder)"
                      @dblclick="selectFolderAndClose(folderData.folder)"
                      :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === folderData.folder.path }"
                  >
                    <FolderSVG v-if="!folderData.isExpanded" class="vuefinder__treeview__compact-folder-icon"/>
                    <OpenFolderSVG v-else class="vuefinder__treeview__compact-folder-icon"/>
                    <span class="vuefinder__treeview__compact-folder-text">{{ folderData.folder.basename }}</span>
                  </div>
                </div>

                <!-- Recursive subfolders -->
                <div v-if="folderData.isExpanded && folderData.subfolders.length"
                     class="vuefinder__treeview__compact-subfolders">
                  <div
                      v-for="subfolderData in renderFolderTree(folderData.subfolders, storage, folderData.depth + 1)"
                      :key="subfolderData.folder.path"
                      class="vuefinder__treeview__compact-folder-item"
                  >
                    <div class="vuefinder__treeview__compact-folder-content">
                      <div class="vuefinder__treeview__compact-folder-toggle"
                           @click="toggleFolder(storage, subfolderData.folder.path)">
                        <PlusSVG v-if="!subfolderData.isExpanded" class="vuefinder__treeview__compact-toggle-icon"/>
                        <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
                      </div>
                      <div
                          class="vuefinder__treeview__compact-folder-link"
                          @click="selectFolder(subfolderData.folder)"
                          @dblclick="selectFolderAndClose(subfolderData.folder)"
                          :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === subfolderData.folder.path }"
                      >
                        <FolderSVG v-if="!subfolderData.isExpanded" class="vuefinder__treeview__compact-folder-icon"/>
                        <OpenFolderSVG v-else class="vuefinder__treeview__compact-folder-icon"/>
                        <span class="vuefinder__treeview__compact-folder-text">{{
                            subfolderData.folder.basename
                          }}</span>
                      </div>
                    </div>

                    <!-- Level 3 subfolders -->
                    <div v-if="subfolderData.isExpanded && subfolderData.subfolders.length"
                         class="vuefinder__treeview__compact-subfolders">
                      <div
                          v-for="level3Data in renderFolderTree(subfolderData.subfolders, storage, subfolderData.depth + 1)"
                          :key="level3Data.folder.path"
                          class="vuefinder__treeview__compact-folder-item"
                      >
                        <div class="vuefinder__treeview__compact-folder-content">
                          <div class="vuefinder__treeview__compact-folder-toggle"
                               @click="toggleFolder(storage, level3Data.folder.path)">
                            <PlusSVG v-if="!level3Data.isExpanded" class="vuefinder__treeview__compact-toggle-icon"/>
                            <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
                          </div>
                          <div
                              class="vuefinder__treeview__compact-folder-link"
                              @click="selectFolder(level3Data.folder)"
                              @dblclick="selectFolderAndClose(level3Data.folder)"
                              :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === level3Data.folder.path }"
                          >
                            <FolderSVG v-if="!level3Data.isExpanded" class="vuefinder__treeview__compact-folder-icon"/>
                            <OpenFolderSVG v-else class="vuefinder__treeview__compact-folder-icon"/>
                            <span class="vuefinder__treeview__compact-folder-text">{{
                                level3Data.folder.basename
                              }}</span>
                          </div>
                        </div>

                        <!-- Level 4 subfolders -->
                        <div v-if="level3Data.isExpanded && level3Data.subfolders.length"
                             class="vuefinder__treeview__compact-subfolders">
                          <div
                              v-for="level4Data in renderFolderTree(level3Data.subfolders, storage, level3Data.depth + 1)"
                              :key="level4Data.folder.path"
                              class="vuefinder__treeview__compact-folder-item"
                          >
                            <div class="vuefinder__treeview__compact-folder-content">
                              <div class="vuefinder__treeview__compact-folder-toggle"
                                   @click="toggleFolder(storage, level4Data.folder.path)">
                                <PlusSVG v-if="!level4Data.isExpanded"
                                         class="vuefinder__treeview__compact-toggle-icon"/>
                                <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
                              </div>
                              <div
                                  class="vuefinder__treeview__compact-folder-link"
                                  @click="selectFolder(level4Data.folder)"
                                  @dblclick="selectFolderAndClose(level4Data.folder)"
                                  :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === level4Data.folder.path }"
                              >
                                <FolderSVG v-if="!level4Data.isExpanded"
                                           class="vuefinder__treeview__compact-folder-icon"/>
                                <OpenFolderSVG v-else class="vuefinder__treeview__compact-folder-icon"/>
                                <span class="vuefinder__treeview__compact-folder-text">{{
                                    level4Data.folder.basename
                                  }}</span>
                              </div>
                            </div>

                            <!-- Level 5 subfolders -->
                            <div v-if="level4Data.isExpanded && level4Data.subfolders.length"
                                 class="vuefinder__treeview__compact-subfolders">
                              <div
                                  v-for="level5Data in renderFolderTree(level4Data.subfolders, storage, level4Data.depth + 1)"
                                  :key="level5Data.folder.path"
                                  class="vuefinder__treeview__compact-folder-item"
                              >
                                <div class="vuefinder__treeview__compact-folder-content">
                                  <div class="vuefinder__treeview__compact-folder-toggle"
                                       @click="toggleFolder(storage, level5Data.folder.path)">
                                    <PlusSVG v-if="!level5Data.isExpanded"
                                             class="vuefinder__treeview__compact-toggle-icon"/>
                                    <MinusSVG v-else class="vuefinder__treeview__compact-toggle-icon"/>
                                  </div>
                                  <div
                                      class="vuefinder__treeview__compact-folder-link"
                                      @click="selectFolder(level5Data.folder)"
                                      @dblclick="selectFolderAndClose(level5Data.folder)"
                                      :class="{ 'vuefinder__treeview__compact-folder-link--selected': modelValue?.path === level5Data.folder.path }"
                                  >
                                    <FolderSVG v-if="!level5Data.isExpanded"
                                               class="vuefinder__treeview__compact-folder-icon"/>
                                    <OpenFolderSVG v-else class="vuefinder__treeview__compact-folder-icon"/>
                                    <span class="vuefinder__treeview__compact-folder-text">{{
                                        level5Data.folder.basename
                                      }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
