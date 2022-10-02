<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ t('Upload files') }}</h3>
        <div class="mt-2">
          <div class="text-gray-500 mb-1">
            <div v-for="file in queue">
              <div :id="file.id"> {{ file.name }} ( {{ file.size }}) <b>{{ file.percent }}</b></div>
            </div>

            <div class="py-2" v-if="!queue.length">{{ t('No files selected!') }}</div>
          </div>
          <div class="text-gray-500" ref="container">
              <button ref="pickFiles"  type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                {{ t('Select Files') }}</button>
          </div>
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button :disabled="disableUploadButton" @click.prevent="handleUpload" type="button"
              :class="disableUploadButton ? 'bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500' : 'bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500'"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
        {{ t('Upload') }}</button>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{{ t('Cancel') }}</button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalUpload'
};
</script>


<script setup>
import plupload from 'plupload'
import VFModalLayout from './ModalLayout.vue';
import {inject, onMounted, ref} from 'vue';
import {useApiUrl} from '../../composables/useApiUrl.js';
import buildURLQuery from '../../utils/buildURLQuery.js';
import Message from '../Message.vue';
import {csrf} from '../../utils/ajax.js';

const emitter = inject('emitter');
const {apiUrl} = useApiUrl();
const {t} = inject('i18n');

const props = defineProps({
  current: Object
});

const uploader = ref(null);
const container = ref(null);
const pickFiles = ref(null);
const queue = ref([]);
const message = ref('');

const disableUploadButton = ref(true);

const handleUpload = () => {
  message.value = '';
  uploader.value.start();
};

const postData = inject('postData');

onMounted(() => {
  uploader.value = new plupload.Uploader({
    runtimes: 'html5',
    browse_button: pickFiles.value,
    container: container.value,
    max_file_size: '10mb',
    multiple_queues: true,
    file_data_name: 'file',
    url: apiUrl.value + '?' + buildURLQuery(Object.assign(postData, {q: 'upload', adapter: props.current.adapter, path: props.current.dirname})),
    // filters : [
    // 	{title : "Image files", extensions : "jpg,gif,png,jpeg"},
    // 	{title : "Zip files", extensions : "zip"}
    // ],
    headers: {
      ...(csrf && {'X-CSRF-Token' : csrf})
    },

    init: {
      PostInit: function () {
      },

      FilesAdded: function (up, files) {
        disableUploadButton.value = false;
        plupload.each(files, function (file) {
          queue.value.push({
            id: file.id,
            name: file.name,
            size: plupload.formatSize(file.size),
            percent: ''
          });
        });
      },

      UploadProgress: function (up, file) {
        queue.value[queue.value.findIndex((item) => item.id == file.id)].percent = file.percent + '%';
      },

      UploadComplete: function () {
        disableUploadButton.value = true;
        emitter.emit('vf-fetch', {params:{q: 'index', adapter: props.current.adapter, path: props.current.dirname}});
      },

      Error: function (up, err) {
        uploader.value.stop();
        message.value = t(JSON.parse(err.response).message);
      }
    }
  });

  uploader.value.init();
});
</script>
