<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ t('New File') }}</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">{{ t('Create a new file') }}</p>
          <input v-model="name" @keyup.enter="createFile"
                 class="px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full" :placeholder="t('File Name')" type="text">
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>

        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="createFile" class="vf-btn vf-btn-primary">
        {{ t('Create') }}
      </button>
      <button type="button" @click="app.emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">
        {{ t('Cancel') }}
      </button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalNewFile'
};
</script>


<script setup>
import VFModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';

const app = inject('ServiceContainer');
const {getStore} = app.storage;
const {t} = app.i18n;

const name = ref('');
const message = ref('');

const createFile = () => {
  if (name.value != '') {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'newfile',
        m: 'post',
        adapter: app.adapter,
        path: app.data.dirname,
      },
      body: {
        name: name.value
      },
      onSuccess: () => {
        app.emitter.emit('vf-toast-push', {label: t('%s is created.', name.value)});
      },
      onError: (e) => {
        message.value = t(e.message);
      }
    });
  }
};

</script>
