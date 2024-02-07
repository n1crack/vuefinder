<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ t('Upload Files') }}</h3>
        <div class="mt-2">
          <div
            ref="dropArea"
            class="flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer
              dark:border-gray-600 h-[120px]"
            @click="openFileSelector">
            <div class="pointer-events-none" v-if="hasFilesInDropArea">
              {{ t('Release to drop these files.') }}
            </div>
            <div class="pointer-events-none" v-else>
              <!--
              We can use uppy's localization here..
              {{ uppy.i18n('dropPasteFiles', {browseFiles: uppy.i18n('browseFiles')}) }}
              -->
              {{ t('Drag and drop the files/folders to here or click here.') }}
            </div>
          </div>
          <div ref="container" class="text-gray-500 mb-1">
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
          <div class="text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar">
            <div class="flex   hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300" :key="entry.id" v-for="entry in queue">
              <span class="rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default
                  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50
                  ">
                <span class="text-base m-auto"
                      :class="getClassNameForEntry(entry)"
                      v-text="getIconForEntry(entry)"></span>
              </span>
              <div class="ml-1 w-full h-fit">
                <div class="text-left hidden md:block">{{ title_shorten(entry.name, 40) }} ({{ entry.size }})</div>
                <div class="text-left md:hidden">{{ title_shorten(entry.name, 16) }} ({{ entry.size }})</div>
                <div class="flex break-all text-left" :class="getClassNameForEntry(entry)"> {{ entry.statusName }}
                  <b class="ml-auto" v-if="entry.status === definitions.QUEUE_ENTRY_STATUS.UPLOADING">{{ entry.percent }}</b>
                </div>
              </div>
              <button
                type="button"
                class="rounded w-5 h-5 border-1 text-base leading-none font-medium
                  focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600
                    ml-auto sm:text-xs hover:text-red-600"
                :class="uploading ? 'disabled:bg-gray-100 text-white text-opacity-50' : 'bg-gray-100'"
                :title="t('Delete')"
                :disabled="uploading"
                @click="remove(entry)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div class="py-2" v-if="!queue.length">{{ t('No files selected!') }}</div>
          </div>
<!-- No need this ? -->
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>
    <input ref="internalFileInput" type="file" multiple class="hidden">
    <!--suppress HtmlUnknownAttribute -->
    <input ref="internalFolderInput" type="file" multiple webkitdirectory class="hidden">

    <template v-slot:buttons>
      <button type="button" class="vf-btn vf-btn-primary" :disabled="uploading" @click.prevent="upload"
        :class="uploading ? 'bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500' : 'bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500'">
        {{ t('Upload') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" v-if="uploading" @click.prevent="cancel">{{ t('Cancel') }}</button>
      <button type="button" class="vf-btn vf-btn-secondary" v-else @click.prevent="close">{{ t('Close') }}</button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalUpload'
};
</script>

<script setup>
import Uppy from '@uppy/core';
import XHR from '@uppy/xhr-upload';
import VFModalLayout from './ModalLayout.vue';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import Message from '../Message.vue';
import { parse } from '../../utils/filesize.js';
import title_shorten from "../../utils/title_shorten.js";

const app = inject('ServiceContainer');
const {t} = app.i18n;

const uppyLocale = t("uppy");

const QUEUE_ENTRY_STATUS = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10,
}
const definitions = ref({ QUEUE_ENTRY_STATUS })

/** @type {import('vue').Ref<HTMLDivElement>} */
const container = ref(null);
/** @type {import('vue').Ref<HTMLInputElement>} */
const internalFileInput = ref(null);
/** @type {import('vue').Ref<HTMLInputElement>} */
const internalFolderInput = ref(null);
/** @type {import('vue').Ref<HTMLButtonElement>} */
const pickFiles = ref(null);
/** @type {import('vue').Ref<HTMLButtonElement>} */
const pickFolders = ref(null);
/** @type {import('vue').Ref<HTMLDivElement>} */
const dropArea = ref(null);
/**
 * @typedef {Object} QueueEntry
 * @property {String} id
 * @property {String} name File name
 * @property {String} size Formatted size
 * @property {?String} percent 0 to 100 progress value with "%" suffix
 * @property {Number} status Status, See QUEUE_ENTRY_STATUS
 * @property {String} statusName Status name
 * @property {File} originalFile
 */
/** @type {import('vue').Ref<QueueEntry[]>} */
const queue = ref([]);
const message = ref('');
const uploading = ref(false);
const hasFilesInDropArea = ref(false);

/**
 * Uploader instance
 * @type {?Uppy}
 */
let uppy;

/**
 * Find queue entry index by id
 *
 * <p>Yes calling this function is slow, but nobody is gonna use our stuff to upload over 100k files.</p>
 * @param {String} id
 * @return number index in queue
 */
function findQueueEntryIndexById(id) {
  return queue.value.findIndex((item) => item.id === id);
}

/**
 * Add file to uppy
 * @param {File} file
 * @param {?String} name file name with full relative path (like "dirA/dirB/file.xlsx" or just "file.xlsx")
 */
function addFile(file, name = null) {
  name = name != null ? name : (file.webkitRelativePath || file.name);
  uppy.addFile({
    name,
    type: file.type,
    data: file,
    source: 'Local',
  });
}

/**
 * Get dom class for entry
 * @param {QueueEntry} entry
 */
function getClassNameForEntry(entry) {
  switch (entry.status) {
    case QUEUE_ENTRY_STATUS.DONE:
      return 'text-green-600'
    case QUEUE_ENTRY_STATUS.ERROR:
      return 'text-red-600';
    case QUEUE_ENTRY_STATUS.CANCELED:
      return 'text-red-600';
    case QUEUE_ENTRY_STATUS.PENDING:
    default:
      return '';
  }
}

const getIconForEntry = (entry) =>{
  switch (entry.status) {
    case QUEUE_ENTRY_STATUS.DONE:
      return '✓'
    case QUEUE_ENTRY_STATUS.ERROR:
    case QUEUE_ENTRY_STATUS.CANCELED:
      return '!';
    case QUEUE_ENTRY_STATUS.PENDING:
    default:
      return '...';
  }
}

/**
 * Open file selector
 */
function openFileSelector() {
  pickFiles.value.click();
}

/**
 * Begin upload
 */
function upload() {
  if (uploading.value) {
    return;
  }
  if (!queue.value.filter(entry => entry.status !== QUEUE_ENTRY_STATUS.DONE).length) {
    message.value = t('Please select file to upload first.');
    return;
  }
  message.value = '';
  uppy.retryAll();
  uppy.upload();
}

/**
 * Cancel upload
 */
function cancel() {
  uppy.cancelAll({ reason: 'user' });
  queue.value.forEach(entry => {
    if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
      entry.status = QUEUE_ENTRY_STATUS.CANCELED;
      entry.statusName = t('Canceled');
    }
  });
  uploading.value = false;
}

/**
 * Remove a file from queue
 * @param {QueueEntry} file
 */
function remove(file) {
  if (uploading.value) {
    return;
  }
  uppy.removeFile(file.id, 'removed-by-user');
  queue.value.splice(findQueueEntryIndexById(file.id), 1);
}

/**
 * Clear queue
 * @param {boolean} onlySuccessful
 */
function clear(onlySuccessful) {
  if (uploading.value) {
    return;
  }
  uppy.cancelAll({ reason: 'user' });
  if (onlySuccessful) {
    const retryQueue = [];
    queue.value.forEach(entry => {
      if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
        retryQueue.push(entry);
      }
    });
    queue.value = [];
    retryQueue.forEach(entry => {
      addFile(entry.originalFile, entry.name);
    });
    return;
  }
  queue.value.splice(0);
}

/**
 * Close upload modal
 */
function close() {
  app.emitter.emit('vf-modal-close');
}

function buildReqParams() {
  return app.requester.transformRequestParams({
    url: '',
    method: 'post',
    params: { q: 'upload', adapter: app.data.adapter, path: app.data.dirname },
  });
}

onMounted(async () => {
  uppy = new Uppy({
    debug: app.debug,
    restrictions: {
      maxFileSize: parse(app.maxFileSize),
      //maxNumberOfFiles
      //allowedFileTypes
    },
    locale: uppyLocale,
    onBeforeFileAdded(file, files) {
      const duplicated = files[file.id] != null;
      if (duplicated) {
        const i = findQueueEntryIndexById(file.id);
        if (queue.value[i].status === QUEUE_ENTRY_STATUS.PENDING) {
          // Undocumented, as long as uppy don't change this we are good.
          message.value = uppy.i18n('noDuplicates', { fileName: file.name });
        }
        queue.value = queue.value.filter(entry => entry.id !== file.id);
      }
      // We only push the file in the end of queue, so user just need scroll down to find the newly selected stuff.
      queue.value.push({
        id: file.id,
        name: file.name,
        size: app.filesize(file.size),
        status: QUEUE_ENTRY_STATUS.PENDING,
        statusName: t('Pending upload'),
        percent: null,
        originalFile: file.data,
      });
      return true;
      // Uppy would only upload that file once even you call .addFile() twice in one row, nice.
    }
  });

  uppy.use(XHR, {
    endpoint: 'WILL_BE_REPLACED_BEFORE_UPLOAD',
    limit: 5,
    timeout: 0,
    getResponseError(responseText, _response) {
      /** @type {String} */
      let message;
      try {
        /** @type {*} */
        const body = JSON.parse(responseText);
        message = body.message;
      } catch (e) {
        message = t('Cannot parse server response.');
      }
      return new Error(message);
    },
  });
  uppy.on('restriction-failed', (upFile, error) => {
    //remove the restricted file.
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    remove(entry)
    message.value = error.message;
  });
  uppy.on('upload', () => {
    const reqParams = buildReqParams();
    uppy.setMeta({ ...reqParams.body });
    const xhrPlugin = uppy.getPlugin('XHRUpload');
    xhrPlugin.opts.method = reqParams.method;
    xhrPlugin.opts.endpoint = reqParams.url + '?' + new URLSearchParams(reqParams.params);
    xhrPlugin.opts.headers = reqParams.headers;
    uploading.value = true;
    queue.value.forEach(file => {
      if (file.status === QUEUE_ENTRY_STATUS.DONE) {
        return;
      }
      file.percent = null;
      file.status = QUEUE_ENTRY_STATUS.UPLOADING;
      file.statusName = t('Pending upload');
    });
  });
  uppy.on('upload-progress', (upFile, progress) => {
    // upFile.progress.percentage never updates itself during this callback, and progress param definition showed
    // some non exist properties, weird.
    const p = Math.floor(progress.bytesUploaded / progress.bytesTotal * 100);
    queue.value[findQueueEntryIndexById(upFile.id)].percent = `${p}%`;
  });
  uppy.on('upload-success',(upFile) => {
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    entry.status = QUEUE_ENTRY_STATUS.DONE;
    entry.statusName = t('Done');
  });
  uppy.on('upload-error', (upFile, error) => {
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    entry.percent = null;
    entry.status = QUEUE_ENTRY_STATUS.ERROR;
    // https://uppy.io/docs/uppy/#upload-error
    // noinspection JSUnresolvedReference
    if (error.isNetworkError) {
      entry.statusName = t(`Network Error, Unable establish connection to the server or interrupted.`);
    } else {
      entry.statusName = error ? error.message : t('Unknown Error');
    }
  });
  uppy.on('error', (error) => {
    message.value = error.message;
    uploading.value = false;
    app.emitter.emit('vf-fetch', {
      params: { q: 'index', adapter: app.data.adapter, path: app.data.dirname },
      noCloseModal: true,
    });
  })
  uppy.on('complete', () => {
    uploading.value = false;
    app.emitter.emit('vf-fetch', {
      params: { q: 'index', adapter: app.data.adapter, path: app.data.dirname },
      noCloseModal: true,
    });
  });

  pickFiles.value.addEventListener('click', () => {
    internalFileInput.value.click();
  })
  pickFolders.value.addEventListener('click', () => {
    internalFolderInput.value.click();
  });
  dropArea.value.addEventListener('dragover', ev => {
    ev.preventDefault();
    hasFilesInDropArea.value = true;
  });
  dropArea.value.addEventListener('dragleave', ev => {
    ev.preventDefault();
    hasFilesInDropArea.value = false;
  });
  /**
   * @callback ResultCallback
   * @param {FileSystemEntry|FileSystemDirectoryEntry|FileSystemFileEntry} fileSystemEntry
   * @param {File} file
   */
  /**
   * Iterate through all dirs & files, will invoke resultCallback multiple times when read file
   * @param {ResultCallback} resultCallback
   * @param {FileSystemEntry|FileSystemDirectoryEntry|FileSystemFileEntry} item
   */
  function scanFiles(resultCallback, item) {
    if (item.isFile) {
      item.file(f => resultCallback(item, f));
    }
    if (item.isDirectory) {
      item.createReader().readEntries((entries) => {
        entries.forEach((entry) => {
          scanFiles(resultCallback, entry);
        });
      });
    }
  }
  dropArea.value.addEventListener('drop', ev => {
    ev.preventDefault();
    hasFilesInDropArea.value = false;
    const trimFileName = /^[/\\](.+)/;
    [...ev.dataTransfer.items].forEach(item => {
      if (item.kind === "file") {
        scanFiles((entry, file) => {
          const matched = trimFileName.exec(entry.fullPath);
          addFile(file, matched[1]);
        }, item.webkitGetAsEntry());
      }
    });
  });

  /**
   * File <input> change handler
   * @param {Event} event
   * @param {HTMLInputElement} event.target
   */
  const onFileInputChange = ({ target }) => {
    const files = target.files;
    for (const file of files) {
      addFile(file);
    }
    target.value = '';
  };
  internalFileInput.value.addEventListener('change', onFileInputChange);
  internalFolderInput.value.addEventListener('change', onFileInputChange);
});

onBeforeUnmount(() => {
  uppy?.close({ reason: 'unmount' });
});
</script>
