<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="ArchiveSVG" :title="t('Download archive')"></ModalHeader>
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
      <a
        target="_blank"
        class="vf-btn vf-btn-primary"
        :download="getDownloadUrl(app.modal.data.adapter, app.modal.data.item)"
        :href="getDownloadUrl(app.modal.data.adapter, app.modal.data.item)">{{ t('Download') }}</a>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Cancel') }}</button>
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

const getDownloadUrl = () => {
  const transform = app.requester.transformRequestParams({
    url: '',
    method: 'get',
    params: { 
      q: 'download_archive', 
      adapter: app.fs.adapter,
      path: app.fs.data.dirname, 
      name: name.value, 
      paths: JSON.stringify(items.value.map(({path}) => path)) 
    }
  });
  return transform.url + '?' + new URLSearchParams(transform.params).toString()
}

</script>
