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
  pickFolders,
  dropArea,
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

</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="UploadSVG" :title="t('Upload Files')"></ModalHeader>
      <div class="vuefinder__upload-modal__content">
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

        <div class="vuefinder__upload-modal__drop-area" ref="dropArea" @click="openFileSelector">
          <div class="pointer-events-none" v-if="hasFilesInDropArea">
            {{ t('Release to drop these files.') }}
          </div>
          <div class="pointer-events-none" v-else>
            {{ t('Drag and drop the files/folders to here or click here.') }}
          </div>
        </div>
        <div ref="container" class="vuefinder__upload-modal__buttons">
          <button ref="pickFiles" type="button" class="vf-btn vf-btn-secondary">
            {{ t('Select Files') }}
          </button>
          <button ref="pickFolders" type="button" class="vf-btn vf-btn-secondary">
            {{ t('Select Folders') }}
          </button>
          <button type="button" class="vf-btn vf-btn-secondary" :disabled="uploading" @click="clear(false)">
            {{ t('Clear all') }}
          </button>
          <button type="button" class="vf-btn vf-btn-secondary" :disabled="uploading" @click="clear(true)">
            {{ t('Clear only successful') }}
          </button>
        </div>
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
      <button type="button" class="vf-btn vf-btn-primary" :disabled="uploading" @click.prevent="upload">
        {{ t('Upload') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" v-if="uploading" @click.prevent="cancel">{{
          t('Cancel')
        }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" v-else @click.prevent="close">{{ t('Close') }}</button>
    </template>
  </ModalLayout>
</template>
