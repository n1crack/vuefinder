<script setup lang="ts">
import {inject, ref, computed, onMounted} from 'vue';
import {useStore} from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import Text from '../../components/previews/Text.vue';
import Image from '../../components/previews/Image.vue';
import Default from '../../components/previews/Default.vue';
import Video from '../../components/previews/Video.vue';
import Audio from '../../components/previews/Audio.vue';
import Pdf from '../../components/previews/Pdf.vue';
import datetimestring from '../../utils/datetimestring';
import {FEATURES} from "../../features";
import type { DirEntry } from '../../types';

const app = inject('ServiceContainer')
const {t} = app.i18n
const loaded = ref(false);
const loadPreview = (type: string) => (app.modal.data.item.mime_type ?? '').startsWith(type)

const enabledPreview = app.features.includes(FEATURES.PREVIEW)
if (!enabledPreview) {
  loaded.value = true;
}

// Navigation logic - filter only files
const currentItem = computed(() => app.modal.data.item);
const files = useStore(app.fs.sortedFiles);
const fileOnlyItems = computed(() => files.value.filter((f: DirEntry) => f.type === 'file'));
const currentIndex = computed(() => fileOnlyItems.value.findIndex((f: DirEntry) => f.path === currentItem.value.path));

const canNavigatePrevious = computed(() => {
  return currentIndex.value > 0;
});

const canNavigateNext = computed(() => {
  return currentIndex.value < fileOnlyItems.value.length - 1;
});

const navigateToPrevious = () => {
  if (app.modal.editMode.value) return;
  if (!canNavigatePrevious.value) return;
  const previousItem = fileOnlyItems.value[currentIndex.value - 1];
  
  // Clear current selection
  app.fs.clearSelection();
  
  // Select the previous item
  app.fs.select(previousItem.path);
  
  // Update modal data instead of opening new modal
  app.modal.data.item = previousItem;
  app.modal.data.storage = app.modal.data.storage;
};

const navigateToNext = () => {
  if (app.modal.editMode.value) return;
  if (!canNavigateNext.value) return;
  const nextItem = fileOnlyItems.value[currentIndex.value + 1];
  
  // Clear current selection
  app.fs.clearSelection();
  
  // Select the next item
  app.fs.select(nextItem.path);
  
  // Update modal data instead of opening new modal
  app.modal.data.item = nextItem;
  app.modal.data.storage = app.modal.data.storage;
};

// Keyboard navigation for preview
const handleKeydown = (event: KeyboardEvent) => {
  // Handle ESC key to close modal
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    app.modal.close();
    return;
  }
  
  // Handle arrow keys for navigation
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'ArrowLeft') {
      navigateToPrevious();
    } else {
      navigateToNext();
    }
  }
};

onMounted(() => {
  // Focus the modal for keyboard events
  const modalWrapper = document.querySelector('.vuefinder__preview-modal');
  if (modalWrapper) {
    (modalWrapper as HTMLElement).focus();
  }
});
</script>

<template>
  <ModalLayout>
    <div class="vuefinder__preview-modal" @keydown="handleKeydown" tabindex="0">
      <!-- Navigation arrows - positioned on sides -->
      <div class="vuefinder__preview-modal__nav-overlay" v-if="!app.modal.editMode">
        <button 
          @click="navigateToPrevious" 
          :disabled="!canNavigatePrevious"
          class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left"
          :title="t('Previous file')"
        >
          <svg class="vuefinder__preview-modal__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <button
          @click="navigateToNext" 
          :disabled="!canNavigateNext"
          class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right"
          :title="t('Next file')"
        >
          <svg class="vuefinder__preview-modal__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

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
