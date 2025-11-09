<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import type { StoreValue } from 'nanostores';
import Text from '../../components/previews/Text.vue';
import Image from '../../components/previews/Image.vue';
import Default from '../../components/previews/Default.vue';
import Video from '../../components/previews/Video.vue';
import Audio from '../../components/previews/Audio.vue';
import Pdf from '../../components/previews/Pdf.vue';
import datetimestring from '../../utils/datetimestring';
import type { DirEntry } from '../../types';

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;
const loaded = ref(false);
const getExtension = (path: string): string => {
  const name = (path || '').split('/').pop() || '';
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : '';
};

const extMatches = (type: string, ext: string): boolean => {
  if (!ext) return false;
  const image = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico', 'avif']);
  const video = new Set(['mp4', 'webm', 'ogg', 'ogv', 'mov', 'm4v']);
  const audio = new Set(['mp3', 'wav', 'ogg', 'oga', 'm4a', 'flac', 'aac']);
  const text = new Set([
    'txt',
    'md',
    'json',
    'js',
    'ts',
    'css',
    'scss',
    'html',
    'xml',
    'csv',
    'log',
    'yml',
    'yaml',
  ]);

  if (type === 'image') return image.has(ext);
  if (type === 'video') return video.has(ext);
  if (type === 'audio') return audio.has(ext);
  if (type === 'text') return text.has(ext);
  if (type === 'application/pdf') return ext === 'pdf';
  return false;
};

const loadPreview = (type: string) => {
  const mime = app.modal.data.item.mime_type;
  if (mime && typeof mime === 'string') return mime.startsWith(type);
  const ext = getExtension(app.modal.data.item.path);
  return extMatches(type, ext);
};

const enabledPreview = enabled('preview');
if (!enabledPreview) {
  loaded.value = true;
}

// Navigation logic - filter only files
const currentItem = computed(() => app.modal.data.item);
const files: StoreValue<DirEntry[]> = useStore(app.fs.sortedFiles);
const fileOnlyItems = computed(() => files.value.filter((f: DirEntry) => f.type === 'file'));
const currentIndex = computed(() =>
  fileOnlyItems.value.findIndex((f: DirEntry) => f.path === currentItem.value.path)
);

const canNavigatePrevious = computed(() => {
  return currentIndex.value > 0;
});

const canNavigateNext = computed(() => {
  return currentIndex.value < fileOnlyItems.value.length - 1;
});

const navigateToPrevious = () => {
  if (app.modal.editMode) return;
  if (!canNavigatePrevious.value) return;
  const previousItem = fileOnlyItems.value[currentIndex.value - 1];
  if (!previousItem) return;

  // Clear current selection
  app.fs.clearSelection();

  // Select the previous item
  app.fs.select(previousItem.path);

  // Update modal data instead of opening new modal
  app.modal.data.item = previousItem;
};

const navigateToNext = () => {
  if (app.modal.editMode) return;
  if (!canNavigateNext.value) return;
  const nextItem = fileOnlyItems.value[currentIndex.value + 1];
  if (!nextItem) return;

  // Clear current selection
  app.fs.clearSelection();

  // Select the next item
  app.fs.select(nextItem.path);

  // Update modal data instead of opening new modal
  app.modal.data.item = nextItem;
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
    <div class="vuefinder__preview-modal" tabindex="0" @keydown="handleKeydown">
      <!-- Navigation arrows - positioned on sides -->
      <div v-if="!app.modal.editMode" class="vuefinder__preview-modal__nav-overlay">
        <button
          :disabled="!canNavigatePrevious"
          class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left"
          :title="t('Previous file')"
          @click="navigateToPrevious"
        >
          <svg
            class="vuefinder__preview-modal__nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <button
          :disabled="!canNavigateNext"
          class="vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right"
          :title="t('Next file')"
          @click="navigateToNext"
        >
          <svg
            class="vuefinder__preview-modal__nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      <div class="vuefinder__preview-modal__content">
        <div v-if="enabledPreview">
          <Text
            v-if="loadPreview('text')"
            :key="`text-${currentItem.path}`"
            @success="loaded = true"
          />
          <Image
            v-else-if="loadPreview('image')"
            :key="`image-${currentItem.path}`"
            @success="loaded = true"
          />
          <Video
            v-else-if="loadPreview('video')"
            :key="`video-${currentItem.path}`"
            @success="loaded = true"
          />
          <Audio
            v-else-if="loadPreview('audio')"
            :key="`audio-${currentItem.path}`"
            @success="loaded = true"
          />
          <Pdf
            v-else-if="loadPreview('application/pdf')"
            :key="`pdf-${currentItem.path}`"
            @success="loaded = true"
          />
          <Default v-else :key="`default-${currentItem.path}`" @success="loaded = true" />
        </div>

        <div class="vuefinder__preview-modal__loading">
          <div v-if="loaded === false" class="vuefinder__preview-modal__loading-indicator">
            <svg
              class="vuefinder__preview-modal__spinner"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="vuefinder__preview-modal__spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="vuefinder__preview-modal__spinner-path"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ t('Loading') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="vuefinder__preview-modal__details">
      <div>
        <span class="font-bold">{{ t('File Size') }}: </span
        >{{ app.filesize(app.modal.data.item.file_size) }}
      </div>
      <div>
        <span class="pl-2 font-bold">{{ t('Last Modified') }}: </span>
        {{ datetimestring(app.modal.data.item.last_modified) }}
      </div>
    </div>
    <div v-if="enabled('download')" class="vuefinder__preview-modal__note">
      <span>{{
        t(
          'Download doesn\'t work? You can try right-click "Download" button, select "Save link as...".'
        )
      }}</span>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Close') }}
      </button>
      <a
        v-if="enabled('download')"
        target="_blank"
        class="vf-btn vf-btn-primary"
        :download="app.adapter.getDownloadUrl({ path: app.modal.data.item.path })"
        :href="app.adapter.getDownloadUrl({ path: app.modal.data.item.path })"
        >{{ t('Download') }}</a
      >
    </template>
  </ModalLayout>
</template>
