<script setup lang="ts">
import {inject} from 'vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from "../../components/modals/ModalHeader.vue";

import AboutSVG from "../../assets/icons/about.svg";

const app = inject('ServiceContainer');
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
            A modern, customizable file manager component built for Vue.
          </div>
          <div class="vuefinder__about-modal__description">
            Organize, preview, and manage your files through a beautiful, reactive interface — just like a native file explorer.
          </div>
          <div class="vuefinder__about-modal__description">
            Easily integrate it into your app, connect to any storage (local, S3, etc.), and craft your own cloud experience with full control over uploads, search, and customization.
          </div>

          <div class="vuefinder__about-modal__description">
            If you like it, please follow and ⭐ star on GitHub.
          </div>

          <div class="vuefinder__about-modal__links">
            <a href="https://vuefinder.ozdemir.be" class="vuefinder__about-modal__link-btn" target="_blank" rel="noopener noreferrer">
              Project Home
            </a>
            <a href="https://github.com/n1crack/vuefinder" class="vuefinder__about-modal__link-btn" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>

          <div class="vuefinder__about-modal__meta">
            <div class="vuefinder__about-modal__meta-item">
              <span class="vuefinder__about-modal__meta-label">Version</span>
              <span class="vuefinder__about-modal__meta-value">{{ app.version }}</span>
            </div>
            <div class="vuefinder__about-modal__meta-item">
              <span class="vuefinder__about-modal__meta-label">License</span>
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


