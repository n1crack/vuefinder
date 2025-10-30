<script setup lang="ts">
import { inject, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import NewFileSVG from '../../assets/icons/new_file.svg';
import type { FileOperationResult } from '../../adapters';

import { useApp } from '../../composables/useApp';
const app = useApp();
const { t } = app.i18n;
const fs = app.fs;

const currentPath = useStore(fs.path);

const name = ref('');
const message = ref('');

const createFile = () => {
  if (name.value !== '') {
    app.adapter
      .createFile({
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
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="vuefinder__new-file-modal__content">
        <div class="vuefinder__new-file-modal__form">
          <p class="vuefinder__new-file-modal__description">{{ t('Create a new file') }}</p>
          <input
            v-model="name"
            class="vuefinder__new-file-modal__input"
            :placeholder="t('File Name')"
            type="text"
            @keyup.enter="createFile"
          />
          <message v-if="message.length" error @hidden="message = ''">{{ message }}</message>
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" @click="createFile">
        {{ t('Create') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
