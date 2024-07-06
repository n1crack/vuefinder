<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="UnarchiveSVG" :title="t('Unarchive')"></ModalHeader>
      <div class="vuefinder__unarchive-modal__content">
        <div class="vuefinder__unarchive-modal__items">
          <p v-for="item in items" class="vuefinder__unarchive-modal__item">
            <svg v-if="item.type === 'dir'" class="vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <svg v-else class="vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span class="vuefinder__unarchive-modal__item-name">{{ item.basename }}</span>
          </p>
          <p class="vuefinder__unarchive-modal__info">{{ t('The archive will be unarchived at')}} ({{app.fs.data.dirname}})</p>

          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="unarchive" class="vf-btn vf-btn-primary">{{ t('Unarchive') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';
import ModalHeader from "./ModalHeader.vue";
import UnarchiveSVG from "../icons/unarchive.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;

const item = ref(app.modal.data.items[0]);
const message = ref('');

// todo: get zip folder content
const items = ref([]);

const unarchive = () => {
  app.emitter.emit('vf-fetch', {
    params: {
      q: 'unarchive',
      m: 'post',
      adapter: app.fs.adapter,
      path: app.fs.data.dirname,
    },
    body: {
      item: item.value.path
    },
    onSuccess: () => {
      app.emitter.emit('vf-toast-push', {label: t('The file unarchived.')});
    },
    onError: (e) => {
      message.value = t(e.message);
    }
  });
};

</script>
