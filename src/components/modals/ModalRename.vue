<script setup lang="ts">
import {inject, ref} from 'vue';
import {useStore} from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";
import RenameSVG from "../../assets/icons/rename.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const fs = app.fs;
const currentPath = useStore(fs.path);

const item = ref(app.modal.data.items[0]);
const name = ref(item.value.basename);
const message = ref('');

const rename = () => {
  if (name.value != item.value.basename) {
    app.adapter.rename({
      path: currentPath.value.path,
      item: item.value.path,
      name: name.value
    }).then((result) => {
      app.emitter.emit('vf-toast-push', {label: t('%s is renamed.', name.value)});
      app.fs.setFiles(result.files);
      app.modal.close();
    }).catch((e: any) => {
      app.emitter.emit('vf-toast-push', {label: t(e.message), type: 'error'});
    });
  }
};

</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="RenameSVG" :title="t('Rename')"></ModalHeader>
      <div class="vuefinder__rename-modal__content">
        <div class="vuefinder__rename-modal__item">
          <p class="vuefinder__rename-modal__item-info">
            <svg v-if="item.type === 'dir'" class="vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            <svg v-else class="vuefinder__rename-modal__icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="vuefinder__rename-modal__item-name">{{ item.basename }}</span>
          </p>
          <input v-model="name" @keyup.enter="rename" class="vuefinder__rename-modal__input" placeholder="Name"
                 type="text">
          <message v-if="message.length" @hidden="message=''" error>{{ message }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="rename" class="vf-btn vf-btn-primary">{{ t('Rename') }}</button>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
    </template>
  </ModalLayout>
</template>
