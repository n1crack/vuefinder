<script setup lang="ts">
import {inject} from 'vue';
import { useApp } from '../../composables/useApp';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";

import AboutSVG from "../../assets/icons/about.svg";

const app = useApp();
const {t} = app.i18n;
// About modal is now a simple info dialog

</script>

<template>
  <ModalLayout>
    <div class="vuefinder__about-modal__content">
      <ModalHeader :icon="AboutSVG" :title="'Vuefinder ' + app.version" />

      <div class="vuefinder__about-modal__main">
        <div class="vuefinder__about-modal__tab-content">
          <div class="vuefinder__about-modal__lead">
            {{ t('A modern, customizable file manager component built for Vue.') }}
          </div>
          <div class="vuefinder__about-modal__description">
            {{ t('If you like it, please follow and ⭐ star on GitHub.') }}
          </div>

          <div class="vuefinder__about-modal__links">
            <a href="https://vuefinder.ozdemir.be" class="vuefinder__about-modal__link-btn" target="_blank" rel="noopener noreferrer">
              {{ t('Project Home') }}
            </a>
            <a href="https://github.com/n1crack/vuefinder"  class="vuefinder__about-modal__link-btn" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>

          <div class="vuefinder__about-modal__meta">
            <div class="vuefinder__about-modal__meta-item">
              <span class="vuefinder__about-modal__meta-label">{{ t('Version') }}</span>
              <span class="vuefinder__about-modal__meta-value">{{ app.version }}</span>
            </div>
            <div class="vuefinder__about-modal__meta-item">
              <span class="vuefinder__about-modal__meta-label">{{ t('License') }}</span>
              <span class="vuefinder__about-modal__meta-value">MIT</span>
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


