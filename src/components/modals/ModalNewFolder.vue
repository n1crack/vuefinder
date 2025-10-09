<script setup lang="ts">
import {inject, ref} from 'vue';
import Message from '@/components/Message.vue';
import ModalLayout from '@/components/modals/ModalLayout.vue';
import ModalHeader from "@/components/modals/ModalHeader.vue";
import NewFolderSVG from "@/assets/icons/new_folder.svg";
import { useFilesStore } from '@/stores/files';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const fs = useFilesStore();

const name = ref('');
const message = ref('');

const createFolder = () => {
  if (name.value !== '') {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'newfolder',
        m: 'post',
        adapter: fs.path.storage,
        path: fs.path.path,
      },
      body: {
        name: name.value
      },
      onSuccess: () => {
        app.emitter.emit('vf-toast-push', {label: t('%s is created.', name.value)});
      },
      onError: (e: any) => {
        message.value = t(e.message);
      }
    });
  }
};

</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="NewFolderSVG" :title="t('New Folder')"></ModalHeader>
      <div class="vuefinder__new-folder-modal__content">
        <div class="vuefinder__new-folder-modal__form">
          <p class="vuefinder__new-folder-modal__description">{{ t('Create a new folder') }}</p>
          <input v-model="name" @keyup.enter="createFolder"
                 class="vuefinder__new-folder-modal__input" :placeholder="t('Folder Name')" type="text">
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="createFolder" class="vf-btn vf-btn-primary">{{ t('Create') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>
