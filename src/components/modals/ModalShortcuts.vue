<script setup lang="ts">
import { inject } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import KeyboardIcon from '../../assets/icons/about.svg';

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;
</script>

<template>
  <ModalLayout>
    <div class="vuefinder__about-modal__content">
      <ModalHeader :icon="KeyboardIcon" :title="t('Shortcuts')"></ModalHeader>

      <div class="vuefinder__about-modal__main">
        <div class="vuefinder__about-modal__shortcuts">
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Refresh') }}</div>
            <div><kbd>⌘</kbd> + <kbd>R</kbd></div>
          </div>
          <div v-if="enabled('rename')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Rename') }}</div>
            <div><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd></div>
          </div>
          <div v-if="enabled('delete')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Delete') }}</div>
            <kbd>Del</kbd>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Escape') }}</div>
            <kbd>Esc</kbd>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Select All') }}</div>
            <div><kbd>⌘</kbd> + <kbd>A</kbd></div>
          </div>
          <div v-if="enabled('copy')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Cut') }}</div>
            <div><kbd>⌘</kbd> + <kbd>X</kbd></div>
          </div>
          <div v-if="enabled('copy')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Copy') }}</div>
            <div><kbd>⌘</kbd> + <kbd>C</kbd></div>
          </div>
          <div v-if="enabled('copy')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Paste') }}</div>
            <div><kbd>⌘</kbd> + <kbd>V</kbd></div>
          </div>
          <div v-if="enabled('search')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Search') }}</div>
            <div><kbd>⌘</kbd> + <kbd>F</kbd></div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Toggle Sidebar') }}</div>
            <div><kbd>⌘</kbd> + <kbd>E</kbd></div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Open Settings') }}</div>
            <div><kbd>⌘</kbd> + <kbd>S</kbd></div>
          </div>
          <div v-if="enabled('fullscreen')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Toggle Full Screen') }}</div>
            <div><kbd>⌘</kbd> + <kbd>Enter</kbd></div>
          </div>
          <div v-if="enabled('preview')" class="vuefinder__about-modal__shortcut">
            <div>{{ t('Preview') }}</div>
            <kbd>Space</kbd>
          </div>
        </div>
      </div>
    </div>
    <template #buttons>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Close') }}
      </button>
    </template>
  </ModalLayout>
</template>
