<script setup lang="ts">
import { inject, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import NewFolderSVG from '../../assets/icons/new_folder.svg';

import { useApp } from '../../composables/useApp';
const app = useApp();
const { t } = app.i18n;
const fs = app.fs;

const currentPath = useStore(fs.path);

const name = ref('');
const message = ref('');

const createFolder = () => {
  if (name.value !== '') {
    app.adapter
      .createFolder({
        path: currentPath.value.path,
        name: name.value,
      })
      .then((result: any) => {
        app.emitter.emit('vf-toast-push', { label: t('%s is created.', name.value) });
        app.fs.setFiles(result.files);
        app.modal.close();
      })
      .catch((e: any) => {
        app.emitter.emit('vf-toast-push', { label: t(e.message), type: 'error' });
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
          <input
            v-model="name"
            class="vuefinder__new-folder-modal__input"
            :placeholder="t('Folder Name')"
            type="text"
            autofocus
            @keyup.enter="createFolder"
          />
          <message v-if="message.length" error @hidden="message = ''">{{ message }}</message>
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" @click="createFolder">
        {{ t('Create') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
