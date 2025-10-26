<script setup lang="ts">
import {inject, ref} from 'vue';
import {useStore} from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";
import NewFileSVG from "../../assets/icons/new_file.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const fs = app.fs;

const currentPath = useStore(fs.path);

const name = ref('');
const message = ref('');

const createFile = () => {
  if (name.value !== '') {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'newfile',
        m: 'post',
        path: currentPath.value.path,
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
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="vuefinder__new-file-modal__content">
        <div class="vuefinder__new-file-modal__form">
          <p class="vuefinder__new-file-modal__description">{{ t('Create a new file') }}</p>
          <input v-model="name" @keyup.enter="createFile"
                 class="vuefinder__new-file-modal__input" :placeholder="t('File Name')" type="text">
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="createFile" class="vf-btn vf-btn-primary">{{ t('Create') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>
