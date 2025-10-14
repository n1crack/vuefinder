<script setup lang="ts">
import {inject, ref} from 'vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import Text from '../../components/previews/Text.vue';
import Image from '../../components/previews/Image.vue';
import Default from '../../components/previews/Default.vue';
import Video from '../../components/previews/Video.vue';
import Audio from '../../components/previews/Audio.vue';
import Pdf from '../../components/previews/Pdf.vue';
import datetimestring from '../../utils/datetimestring';
import {FEATURES} from "../../features";

const app = inject('ServiceContainer')
const {t} = app.i18n
const loaded = ref(false);
const loadPreview = (type: string) => (app.modal.data.item.mime_type ?? '').startsWith(type)

const enabledPreview = app.features.includes(FEATURES.PREVIEW)
if (!enabledPreview) {
  loaded.value = true;
}
</script>

<template>
  <ModalLayout>
    <div>
      <div class="vuefinder__preview-modal__content">
        <div v-if="enabledPreview">
          <Text v-if="loadPreview('text')" @success="loaded = true"/>
          <Image v-else-if="loadPreview('image')" @success="loaded = true"/>
          <Video v-else-if="loadPreview('video')" @success="loaded = true"/>
          <Audio v-else-if="loadPreview('audio')" @success="loaded = true"/>
          <Pdf v-else-if="loadPreview('application/pdf')" @success="loaded = true"/>
          <Default v-else @success="loaded = true"/>
        </div>

        <div class="vuefinder__preview-modal__loading">
          <div class="vuefinder__preview-modal__loading-indicator" v-if="loaded === false">
            <svg class="vuefinder__preview-modal__spinner" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="vuefinder__preview-modal__spinner-circle" cx="12" cy="12" r="10" stroke="currentColor"
                      stroke-width="4"></circle>
              <path class="vuefinder__preview-modal__spinner-path" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ t('Loading') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="vuefinder__preview-modal__details">
      <div><span class="font-bold">{{ t('File Size') }}: </span>{{ app.filesize(app.modal.data.item.file_size) }}</div>
      <div><span class="font-bold pl-2">{{ t('Last Modified') }}: </span>
        {{ datetimestring(app.modal.data.item.last_modified) }}
      </div>
    </div>
    <div class="vuefinder__preview-modal__note" v-if="app.features.includes(FEATURES.DOWNLOAD)">
      <span>{{
          t('Download doesn\'t work? You can try right-click "Download" button, select "Save link as...".')
        }}</span>
    </div>

    <template v-slot:buttons>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">{{ t('Close') }}</button>
      <a
          target="_blank"
          class="vf-btn vf-btn-primary"
          :download="app.requester.getDownloadUrl(app.modal.data.storage, app.modal.data.item)"
          :href="app.requester.getDownloadUrl(app.modal.data.storage, app.modal.data.item)"
          v-if="app.features.includes(FEATURES.DOWNLOAD)">{{ t('Download') }}</a>
    </template>
  </ModalLayout>
</template>
