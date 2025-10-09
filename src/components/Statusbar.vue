<script setup lang="ts">
import {computed, inject} from 'vue';
import ModalAbout from "./modals/ModalAbout.vue";
import StorageSVG from "@/assets/icons/storage.svg";
import AboutSVG from "@/assets/icons/about.svg";
import { useFilesStore } from '@/stores/files';
import { useSearchStore } from '@/stores/search';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const {setStore} = app.storage;
const fs = useFilesStore();
const search = useSearchStore();

const handleStorageSelect = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: value}});
  setStore('adapter', value);
};


const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple ? fs.selectedCount > 0 : fs.selectedCount === 1;
  return app.selectButton.active && selectionAllowed;
});

</script>


<template>
  <div class="vuefinder__status-bar__wrapper">
    <div class="vuefinder__status-bar__storage">
      <div class="vuefinder__status-bar__storage-container" :title="t('Storage')">
        <div class="vuefinder__status-bar__storage-icon">
          <StorageSVG/>
        </div>
        <select name="vuefinder-media-selector" :value="fs.path.storage" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in fs.storages" :value="storage" :key="storage">
            {{ storage }}
          </option>
        </select>
      </div>
      <div class="vuefinder__status-bar__info">
        <span v-if="search.hasQuery">{{ fs.files.length }} items found. </span>
        <span class="vuefinder__status-bar__selected-count">{{
            fs.selectedCount > 0 ? t('%s item(s) selected.', fs.selectedCount) : ''
          }}</span>
      </div>
    </div>
    <div class="vuefinder__status-bar__actions">
      <button class="vf-btn vf-btn-primary vf-btn-small"
              :class="{disabled: !isSelectButtonActive}"
              :disabled="!isSelectButtonActive"
              v-if="app.selectButton.active" @click="app.selectButton.click(app.selected, $event)">{{ t("Select") }}
      </button>
      <span class="vuefinder__status-bar__about" :title="t('About')" @click="app.modal.open(ModalAbout)">
        <AboutSVG/>
      </span>
    </div>
  </div>
</template>
