<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="ArchiveSVG" :title="t('Archive the files')"></ModalHeader>
      <div class="vuefinder__archive-modal__content">
        <div class="vuefinder__archive-modal__form">
          <div class="vuefinder__archive-modal__files vf-scrollbar">
            <p v-for="item in items" class="vuefinder__archive-modal__file">
              <svg v-if="item.type === 'dir'" class="vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else class="vuefinder__archive-modal__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span class="vuefinder__archive-modal__file-name">{{ item.basename }}</span>
            </p>
          </div>
          <input v-model="name" @keyup.enter="archive"
                 class="vuefinder__archive-modal__input"
                 :placeholder="t('Archive name. (.zip file will be created)')" type="text">
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="archive" class="vf-btn vf-btn-primary">{{ t('Archive') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>

<style>
.vuefinder__archive-modal__content {
  @apply mt-3 text-center sm:mt-0 sm:text-left w-full;
}

.vuefinder__archive-modal__form {
  @apply mt-2;
}

.vuefinder__archive-modal__files {
  @apply text-gray-500 text-sm mb-1 overflow-auto;
  max-height: 200px;
}

.vuefinder__archive-modal__file {
  @apply flex text-sm text-gray-800 dark:text-gray-400;
}

.vuefinder__archive-modal__icon {
  @apply h-5 w-5 text-neutral-500;
}

.vuefinder .vuefinder__archive-modal__icon--dir {
  @apply fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500;
}

.vuefinder__archive-modal__file-name {
  @apply ml-1.5;
}

.vuefinder .vuefinder__archive-modal__input {
  @apply my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:border-gray-600 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full;
}
</style>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import Message from '../Message.vue';
const app = inject('ServiceContainer');
const {t} = app.i18n;
import ArchiveSVG from "../icons/archive.svg";
import ModalHeader from "./ModalHeader.vue";

const name = ref('');
const message = ref('');

const items = ref(app.modal.data.items);

const archive = () => {
  if (items.value.length) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'archive',
        m: 'post',
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
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
