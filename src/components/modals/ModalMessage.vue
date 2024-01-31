<template>
 <v-f-modal-layout>
    <div class="sm:flex sm:items-start ">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{  app.modal.data?.title ?? 'Title' }}</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">{{  app.modal.data?.message ?? 'Message' }}</p>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="app.emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">
        {{ t('Close') }}</button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalMessage'
};
</script>

<script setup>
import VFModalLayout from './ModalLayout.vue';
import {inject} from 'vue';
const app = inject('ServiceContainer');
const {t} = app.i18n;

</script>
