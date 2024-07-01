<template>
  <ModalLayout>
     <div class="vuefinder__message-modal__content">
       <div class="vuefinder__message-modal__icon-container">
         <svg xmlns="http://www.w3.org/2000/svg" class="vuefinder__message-modal__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
           <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
       </div>
       <div class="vuefinder__message-modal__text">
         <h3 class="vuefinder__message-modal__title" id="modal-title">{{ app.modal.data?.title ?? 'Title' }}</h3>
         <div class="vuefinder__message-modal__message">
           <p class="vuefinder__message-modal__description">{{ app.modal.data?.message ?? 'Message' }}</p>
         </div>
       </div>
     </div>
 
     <template v-slot:buttons>
       <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">
         {{ t('Close') }}</button>
     </template>
   </ModalLayout>
 </template>
 
 <style>
 .vuefinder__message-modal__content {
   @apply sm:flex sm:items-start;
 }
 
 .vuefinder__message-modal__icon-container {
   @apply mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10;
 }
 
 .vuefinder .vuefinder__message-modal__icon {
   @apply h-6 w-6 stroke-blue-600 dark:stroke-blue-100;
 }
 
 .vuefinder__message-modal__text {
   @apply mt-3 text-center sm:mt-0 sm:text-left w-full;
 }
 
 .vuefinder__message-modal__title {
   @apply text-lg leading-6 font-medium text-gray-900 dark:text-gray-400;
 }
 
 .vuefinder__message-modal__message {
   @apply mt-2;
 }
 
 .vuefinder__message-modal__description {
   @apply text-sm text-gray-500;
 }
 </style>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject} from 'vue';
const app = inject('ServiceContainer');
const {t} = app.i18n;

</script>
