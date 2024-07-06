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

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject} from 'vue';
const app = inject('ServiceContainer');
const {t} = app.i18n;

</script>
