<script setup lang="ts">
import {inject, onMounted, onUnmounted, ref} from 'vue';
import {useStore} from '@nanostores/vue';
import Message from '../../components/Message.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalTreeSelector from "./ModalTreeSelector.vue";
import useUpload from '../../composables/useUpload';
import title_shorten from "../../utils/title_shorten";
import UploadSVG from "../../assets/icons/upload.svg";
import type {DirEntry} from '../../types';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const fs = app.fs;
const currentPath = useStore(fs.path);

// Target folder selection
const target = ref<DirEntry>(currentPath.value);
const showTreeSelector = ref(false);

// Simple function to split storage and path
const getTargetParts = () => {
  const path = target.value.path;
  if (!path) return { storage: 'local', path: '' };
  
  // For storage roots like "local://", just return the storage name
  if (path.endsWith('://')) {
    return { storage: path.replace('://', ''), path: '' };
  }
  
  // Split storage and path
  const parts = path.split('://');
  return { 
    storage: parts[0] || 'local', 
    path: parts[1] || '' 
  };
};

const selectTargetFolder = (folder: DirEntry | null) => {
  if (folder) {
    target.value = folder;
  }
};

const selectTargetFolderAndClose = (folder: DirEntry | null) => {
  if (folder) {
    target.value = folder;
    showTreeSelector.value = false;
  }
};

const {
  container,
  internalFileInput,
  internalFolderInput,
  pickFiles,
  queue,
  message,
  uploading,
  hasFilesInDropArea,
  definitions,
  openFileSelector,
  upload: originalUpload,
  cancel,
  remove,
  clear,
  close,
  getClassNameForEntry,
  getIconForEntry,
  addExternalFiles,
} = useUpload();

// Override upload function to use target folder
const upload = () => {
  // Update the upload function to use the selected target folder
  originalUpload(target.value);
};

// Dışarıdan gelen dosyaları dinle
onMounted(() => {
  app.emitter.on('vf-external-files-dropped', (event: unknown) => {
    addExternalFiles(event as File[]);
  });
});

onUnmounted(() => {
  app.emitter.off('vf-external-files-dropped');
});

// Dropdown state
const showActions = ref(false);

// Close dropdown on outside click (handle both mobile and desktop menus)
const actionsMenuMobileRef = ref<HTMLElement | null>(null);
const actionsMenuDesktopRef = ref<HTMLElement | null>(null);
const onClickOutside = (e: MouseEvent) => {
  if (!showActions.value) return;
  const target = e.target as Node;
  const inMobile = actionsMenuMobileRef.value?.contains(target) ?? false;
  const inDesktop = actionsMenuDesktopRef.value?.contains(target) ?? false;
  if (!inMobile && !inDesktop) showActions.value = false;
};
onMounted(() => document.addEventListener('click', onClickOutside));
onUnmounted(() => document.removeEventListener('click', onClickOutside));

</script>

<template>
  <ModalLayout :showDragOverlay="hasFilesInDropArea" :dragOverlayText="t('Release to drop these files.')">
    <div>
      <ModalHeader :icon="UploadSVG" :title="t('Upload Files')"></ModalHeader>
      <div class="vuefinder__upload-modal__content relative">
        <!-- Target Folder Selection - Compact version above dropzone -->
        <div class="vuefinder__upload-modal__target-section">
          <div class="vuefinder__upload-modal__target-label">{{ t('Hedef Klasör') }}</div>
          <div class="vuefinder__upload-modal__target-container">
            <div
                class="vuefinder__upload-modal__target-display"
                @click="showTreeSelector = !showTreeSelector"
            >
              <div class="vuefinder__upload-modal__target-path">
                <span class="vuefinder__upload-modal__target-storage">{{ getTargetParts().storage }}://</span>
                <span v-if="getTargetParts().path" class="vuefinder__upload-modal__target-folder">{{ getTargetParts().path }}</span>
              </div>
              <span class="vuefinder__upload-modal__target-badge">{{ t('Browse') }}</span>
            </div>
          </div>

          <!-- Tree selector -->
          <div 
            class="vuefinder__upload-modal__tree-selector"
            :class="showTreeSelector ? 'vuefinder__upload-modal__tree-selector--expanded' : 'vuefinder__upload-modal__tree-selector--collapsed'"
          >
            <ModalTreeSelector
                v-model="target"
                :show-pinned-folders="true"
                @update:modelValue="selectTargetFolder"
                @selectAndClose="selectTargetFolderAndClose"
            />
          </div>
        </div>

        <!-- Drag and drop hint -->
        <div class="hidden sm:block text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
          {{ t('You can drag & drop files anywhere while this modal is open.') }}
        </div>

        <!-- Container for programmatic hooks -->
        <div ref="container" class="hidden"></div>
        <div class="vuefinder__upload-modal__file-list vf-scrollbar">
          <div class="vuefinder__upload-modal__file-entry" :key="entry.id" v-for="entry in queue">
            <span class="vuefinder__upload-modal__file-icon" :class="getClassNameForEntry(entry)">
              <span class="vuefinder__upload-modal__file-icon-text" v-text="getIconForEntry(entry)"></span>
            </span>
            <div class="vuefinder__upload-modal__file-info">
              <div class="vuefinder__upload-modal__file-name hidden md:block">{{ title_shorten(entry.name, 40) }}
                ({{ entry.size }})
              </div>
              <div class="vuefinder__upload-modal__file-name md:hidden">{{ title_shorten(entry.name, 16) }}
                ({{ entry.size }})
              </div>
              <div class="vuefinder__upload-modal__file-status" :class="getClassNameForEntry(entry)">
                {{ entry.statusName }}
                <b class="ml-auto" v-if="entry.status === definitions.QUEUE_ENTRY_STATUS.UPLOADING">{{
                    entry.percent
                  }}</b>
              </div>
            </div>
            <button type="button" class="vuefinder__upload-modal__file-remove" :class="uploading ? 'disabled' : ''"
                    :title="t('Delete')" :disabled="uploading" @click="remove(entry)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="vuefinder__upload-modal__file-remove-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="py-2" v-if="!queue.length">{{ t('No files selected!') }}</div>
        </div>

        <Message v-if="message.length" @hidden="message=''" error>{{ message }}</Message>
      </div>
    </div>
    <input ref="internalFileInput" type="file" multiple class="hidden">
    <input ref="internalFolderInput" type="file" multiple webkitdirectory class="hidden">

    <template v-slot:buttons>
      <!-- Mobile group: above Upload -->
      <div class="sm:hidden relative w-full mb-2" ref="actionsMenuMobileRef">
        <div :class="['vuefinder__upload-actions','vuefinder__upload-actions--block', showActions ? 'vuefinder__upload-actions--ring' : '']">
          <button type="button" class="vuefinder__upload-actions__main" @click="openFileSelector()">{{ t('Select Files') }}</button>
          <button type="button" class="vuefinder__upload-actions__trigger" @click.stop="showActions = !showActions" aria-haspopup="menu" :aria-expanded="showActions ? 'true' : 'false'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" /></svg>
          </button>
        </div>
        <div v-if="showActions" class="vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2">
          <button type="button" class="vuefinder__upload-actions__item" @click="openFileSelector(); showActions=false">{{ t('Select Files') }}</button>
          <button type="button" class="vuefinder__upload-actions__item" @click="internalFolderInput?.click(); showActions=false">{{ t('Select Folders') }}</button>
          <div class="vuefinder__upload-actions__separator"></div>
          <button type="button" class="vuefinder__upload-actions__item" :disabled="uploading" @click="clear(false); showActions=false">{{ t('Clear all') }}</button>
          <button type="button" class="vuefinder__upload-actions__item" :disabled="uploading" @click="clear(true); showActions=false">{{ t('Clear only successful') }}</button>
        </div>
      </div>

      <button type="button" class="vf-btn vf-btn-primary" :disabled="uploading || !queue.length" @click.prevent="upload">
        {{ t('Upload') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" v-if="uploading" @click.prevent="cancel">{{ t('Cancel') }}</button>
      <button type="button" class="vf-btn vf-btn-secondary" v-else @click.prevent="close">{{ t('Close') }}</button>

      <!-- Desktop group: far left (row-reverse makes last child appear leftmost) -->
      <div class="hidden sm:block relative mr-auto" ref="actionsMenuDesktopRef">
        <div class="vuefinder__upload-actions" :class="showActions ? 'vuefinder__upload-actions--ring' : ''">
          <button ref="pickFiles" type="button" class="vuefinder__upload-actions__main">{{ t('Select Files') }}</button>
          <button type="button" class="vuefinder__upload-actions__trigger" @click.stop="showActions = !showActions" aria-haspopup="menu" :aria-expanded="showActions ? 'true' : 'false'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd" /></svg>
          </button>
        </div>
        <div v-if="showActions" class="vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0">
          <button type="button" class="vuefinder__upload-actions__item" @click="openFileSelector(); showActions=false">{{ t('Select Files') }}</button>
          <button type="button" class="vuefinder__upload-actions__item" @click="internalFolderInput?.click(); showActions=false">{{ t('Select Folders') }}</button>
          <div class="vuefinder__upload-actions__separator"></div>
          <button type="button" class="vuefinder__upload-actions__item" :disabled="uploading" @click="clear(false); showActions=false">{{ t('Clear all') }}</button>
          <button type="button" class="vuefinder__upload-actions__item" :disabled="uploading" @click="clear(true); showActions=false">{{ t('Clear only successful') }}</button>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>
