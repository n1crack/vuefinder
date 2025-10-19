<script setup lang="ts">
import {inject, onMounted, onUnmounted} from 'vue';
import Message from '../../components/Message.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";
import ModalLayout from '../../components/modals/ModalLayout.vue';
import useUpload from '../../composables/useUpload';
import title_shorten from "../../utils/title_shorten";
import UploadSVG from "../../assets/icons/upload.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;

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
  upload,
  cancel,
  remove,
  clear,
  close,
  getClassNameForEntry,
  getIconForEntry,
  addExternalFiles,
} = useUpload();

// Dışarıdan gelen dosyaları dinle
onMounted(() => {
  app.emitter.on('vf-external-files-dropped', (files: File[]) => {
    addExternalFiles(files);
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
