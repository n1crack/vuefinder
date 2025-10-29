<script setup lang="ts">
import {inject} from 'vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";
import KeyboardIcon from "../../assets/icons/about.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
</script>

<template>
  <ModalLayout>
    <div class="vuefinder__about-modal__content">
      <ModalHeader :icon="KeyboardIcon" :title="t('Shortcuts')"></ModalHeader>

      <div class="vuefinder__about-modal__main">
        <div class="vuefinder__about-modal__shortcuts">
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Rename') }}</div>
            <kbd>F2</kbd>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            <div>{{ t('Refresh') }}</div>
            <kbd>F5</kbd>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Delete') }}
            <kbd>Del</kbd>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Escape') }}
            <div>
              <kbd>Esc</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Select All') }}
            <div>
              <kbd>Ctrl</kbd> + <kbd>A</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Search') }}
            <div>
              <kbd>Ctrl</kbd> + <kbd>F</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Toggle Sidebar') }}
            <div>
              <kbd>Ctrl</kbd> + <kbd>E</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Open Settings') }}
            <div>
              <kbd>Ctrl</kbd> + <kbd>,</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Toggle Full Screen') }}
            <div>
              <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
            </div>
          </div>
          <div class="vuefinder__about-modal__shortcut">
            {{ t('Preview') }}
            <div>
              <kbd>Space</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:buttons>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">
        {{ t('Close') }}
      </button>
    </template>
  </ModalLayout>
</template>


