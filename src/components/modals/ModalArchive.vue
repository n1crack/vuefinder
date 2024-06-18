<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="ArchiveSVG" :title="t('Archive the files')"></ModalHeader>

      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">

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
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">
        {{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>

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
