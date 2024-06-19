<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
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
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';
import ModalHeader from "./ModalHeader.vue";
import NewFileSVG from "../icons/new_file.svg";

const app = inject('ServiceContainer');
const {getStore} = app.storage;
const {t} = app.i18n;

const name = ref('');
const message = ref('');

const createFile = () => {
  if (name.value !== '') {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'newfile',
        m: 'post',
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
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
