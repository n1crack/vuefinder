<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
        <div v-if="enabledPreview">
          <Text v-if="loadPreview('text')" :selection="selection" @load="setLoad(true)"/>
          <Image v-else-if="loadPreview('image')" :selection="selection" @load="setLoad(true)"/>
          <Video v-else-if="loadPreview('video')" :selection="selection" @load="setLoad(true)"/>
          <Audio v-else-if="loadPreview('audio')" :selection="selection" @load="setLoad(true)"/>
          <Pdf v-else-if="loadPreview('application/pdf')" :selection="selection" @load="setLoad(true)"/>
          <Default v-else :selection="selection" @load="setLoad(true)"/>
        </div>

        <div class="text-gray-700 dark:text-gray-200 text-sm">
          <div class="flex leading-5" v-if="loaded == false">
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
        <div><span class="font-bold pl-2">{{ t('File Size') }}: </span>{{ filesize(selection.item.file_size) }}</div>
        <div><span class="font-bold pl-2">{{ t('Last Modified') }}: </span> {{ datetimestring(selection.item.last_modified) }}</div>
      </div>

    <template v-slot:buttons>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">{{ t('Close') }}</button>
      <button type="button" @click="download()" class="vf-btn vf-btn-primary" v-if="features.includes(FEATURES.DOWNLOAD)">{{ t('Download') }}</button>
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

const emitter = inject('emitter')
const {t} = inject('i18n')
const loaded = ref(false);
const filesize = inject("filesize")
/** @type {import('../../utils/ajax.js').Requester} */
const requester = inject('requester');
/** @type {import('vue').Ref<String[]>} */
const features = inject('features');

const setLoad = (bool) => loaded.value = bool;

const props = defineProps({
  selection: Object
});

const loadPreview = (type) => (props.selection.item.mime_type ?? '').startsWith(type)

const download = () => {
  const url = requester.getDownloadUrl(props.selection.adapter, props.selection.item)
  emitter.emit('vf-download', url)
}

const enabledPreview = features.value.includes(FEATURES.PREVIEW)
if (!enabledPreview) {
  setLoad(true)
}
</script>
