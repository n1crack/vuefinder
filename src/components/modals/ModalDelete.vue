<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-6 w-6 stroke-red-600 dark:stroke-red-200" fill="none" viewBox="0 0 24 24" stroke="none" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ t('Delete files') }}</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">{{ t('Are you sure you want to delete these files?') }}</p>
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
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="remove" class="vf-btn vf-btn-danger">
        {{ t('Yes, Delete!') }}</button>
      <button type="button" @click="app.emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">
        {{ t('Cancel') }}</button>
      <div class="m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center">{{ t('This action cannot be undone.') }}</div>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalDelete'
};
</script>


<script setup>
import VFModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';

const app = inject('ServiceContainer');
const {getStore} = app.storage;
const {t} = app.i18n;

const items = ref(app.modal.data.items);
const message = ref('');

const remove = () => {

  if (items.value.length) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'delete',
        m: 'post',
        adapter: app.adapter,
        path: app.data.dirname,
      },
      body: {
        items: items.value.map(({path, type}) => ({path, type})),
      },
      onSuccess: () => {
        app.emitter.emit('vf-toast-push', {label: t('Files deleted.')});
      },
      onError: (e) => {
        message.value = t(e.message);
      }
    });
  }
};

</script>
