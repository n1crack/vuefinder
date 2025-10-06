<script setup lang="ts">
import {computed, inject, ref} from 'vue';
import ModalAbout from "./modals/ModalAbout.vue";
import StorageSVG from "@/assets/icons/storage.svg";
import AboutSVG from "@/assets/icons/about.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const {setStore} = app.storage;
// selection provided by NewExplorer via app.selected

const handleStorageSelect = () => {
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter}});
  setStore('adapter', app.fs.adapter);
};

const searchQuery = ref('');

app.emitter.on('vf-search-query', ({newQuery}: { newQuery: string }) => {
  searchQuery.value = newQuery;
});

const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple ? app.selected.length > 0 : app.selected.length === 1;
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
        <select name="vuefinder-media-selector" v-model="app.fs.adapter" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in app.fs.data.storages" :value="storage">
            {{ storage }}
          </option>
        </select>
      </div>
      <div class="vuefinder__status-bar__info">
        <span v-if="searchQuery.length">{{ app.fs.data.files.length }} items found. </span>
        <span class="vuefinder__status-bar__selected-count">{{
            app.selected.length > 0 ? t('%s item(s) selected.', app.selected.length) : ''
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
