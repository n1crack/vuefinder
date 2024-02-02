<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
        <div v-if="enabledPreview">
          <Text v-if="loadPreview('text')" @success="loaded = true"/>
          <Image v-else-if="loadPreview('image')" @success="loaded = true"/>
          <Video v-else-if="loadPreview('video')" @success="loaded = true"/>
          <Audio v-else-if="loadPreview('audio')" @success="loaded = true"/>
          <Pdf v-else-if="loadPreview('application/pdf')" @success="loaded = true"/>
          <Default v-else @success="loaded = true"/>
        </div>

        <div class="text-gray-700 dark:text-gray-200 text-sm">
          <div class="flex leading-5" v-if="loaded === false">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25 stroke-blue-900 dark:stroke-blue-100" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ t('Loading') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs">
      <div><span class="font-bold">{{ t('File Size') }}: </span>{{ app.filesize(app.modal.data.item.file_size) }}</div>
      <div><span class="font-bold pl-2">{{ t('Last Modified') }}: </span> {{ datetimestring(app.modal.data.item.last_modified) }}</div>
    </div>
    <div class="text-xs text-gray-600 dark:text-gray-400" v-if="app.features.includes(FEATURES.DOWNLOAD)">
      <span>{{ t('Download doesn\'t work? You can try right-click "Download" button, select "Save link as...".') }}</span>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="app.emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">{{ t('Close') }}</button>
      <a
        target="_blank"
        class="vf-btn vf-btn-primary"
        :download="app.requester.getDownloadUrl(app.modal.data.adapter, app.modal.data.item)"
        :href="app.requester.getDownloadUrl(app.modal.data.adapter, app.modal.data.item)"
        v-if="app.features.includes(FEATURES.DOWNLOAD)">{{ t('Download') }}</a>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalPreview'
};
</script>

<script setup>
import {inject, ref} from 'vue';
import VFModalLayout from './ModalLayout.vue';
import Text from '../previews/Text.vue';
import Image from '../previews/Image.vue';
import Default from '../previews/Default.vue';
import Video from '../previews/Video.vue';
import Audio from '../previews/Audio.vue';
import Pdf from '../previews/Pdf.vue';
import datetimestring from '../../utils/datetimestring.js';
import {FEATURES} from "../features.js";

const app = inject('ServiceContainer')
const {t} = app.i18n
const loaded = ref(false);
const loadPreview = (type) => (app.modal.data.item.mime_type ?? '').startsWith(type)

const download = () => {
  const url = app.requester.getDownloadUrl(app.modal.data.adapter, app.modal.data.item);
  app.emitter.emit('vf-download', url);
}

const enabledPreview = app.features.includes(FEATURES.PREVIEW)
if (!enabledPreview) {
  loaded.value = true;
}
</script>
