<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
        <div>
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
      <div class="p-2 flex font-normal break-all dark:text-gray-200 rounded text-xs">
        <div><span class="font-bold pl-2">File Size: </span>{{ filesize(selection.item.file_size) }}</div>
        <div><span class="font-bold pl-2">Last Modified: </span> {{ datetimestring(selection.item.last_modified) }}</div>
      </div>

    <template v-slot:buttons>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{{ t('Close') }}</button>
      <button type="button" @click="download()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{{ t('Download') }}</button>
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
import buildURLQuery from '../../utils/buildURLQuery.js';
import {useApiUrl} from '../../composables/useApiUrl.js';
import filesize from '../../utils/filesize.js';
import datetimestring from '../../utils/datetimestring.js';
const {apiUrl} = useApiUrl();
const emitter = inject('emitter')
const {t} = inject('i18n')
const loaded = ref(false);

const setLoad = (bool) => loaded.value = bool;

const props = defineProps({
  selection: Object
});

const loadPreview = (type) => (props.selection.item.mime_type ?? '').startsWith(type)

const download = () => {
  const url = apiUrl.value + '?' + buildURLQuery({q:'download', adapter: props.selection.adapter, path: props.selection.item.path});
  emitter.emit('vf-download', url)
}
</script>
