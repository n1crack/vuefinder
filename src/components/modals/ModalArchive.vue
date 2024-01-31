<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ t('Archive the files') }}</h3>
        <div class="mt-2">
          <div class="text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar" style="max-height: 200px;">
            <p v-for="item in items" class="flex text-sm text-gray-800 dark:text-gray-400">
              <svg v-if="item.type === 'dir'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span class="ml-1.5">{{ item.basename }}</span>
            </p>
          </div>
          <input v-model="name" @keyup.enter="archive"
                 class="my-1 px-2 py-1 border rounded  dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full"
                 :placeholder="t('Archive name. (.zip file will be created)')" type="text">

          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="archive" class="vf-btn vf-btn-primary">
        {{ t('Archive') }}</button>
      <button type="button" @click="app.emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">
        {{ t('Cancel') }}</button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalArchive'
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

const items = ref(app.modal.data.items);

const archive = () => {
  if (items.value.length) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'archive',
        m: 'post',
        adapter: app.adapter,
        path: app.data.dirname,
      },
      body: {
        items: items.value.map(({path, type}) => ({path, type})),
        name: name.value,
      },
      onSuccess: () => {
        app.emitter.emit('vf-toast-push', {label: t('The file(s) archived.')});
      },
      onError: (e) => {
        message.value = t(e.message);
      }
    });
  }
};

</script>
