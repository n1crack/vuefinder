<script setup lang="ts">
import {computed, inject, ref, onMounted, onUnmounted} from 'vue';
import {useStore} from '@nanostores/vue';
import ModalAbout from "./modals/ModalAbout.vue";
import StorageSVG from "../assets/icons/storage.svg";
import AboutSVG from "../assets/icons/about.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const fs = app.fs;
const search = app.search;

// Use nanostores reactive values for template reactivity
const searchState = useStore(search.searchAtom);
const sortedFiles = useStore(fs.sortedFiles);
const path = useStore(fs.path);
const selectedCount = useStore(fs.selectedCount);
const storages = useStore(fs.storages);

const handleStorageSelect = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params: {q: 'index', storage: value}});
};

const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple ? selectedCount.value > 0 : selectedCount.value === 1;
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
        <select name="vuefinder-media-selector" :value="path?.storage" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in storages" :value="storage" :key="storage">
            {{ storage }}
          </option>
        </select>
      </div>
      <div class="vuefinder__status-bar__info">
        <span v-if="searchState.hasQuery">{{ sortedFiles.value.length }} items found. </span>
        <span class="vuefinder__status-bar__selected-count">{{
            selectedCount > 0 ? `${selectedCount} item(s) selected.` : ''
          }}</span>
      </div>
    </div>

    <div class="vuefinder__status-bar__actions">
      <button class="vf-btn vf-btn-primary vf-btn-small"
              :class="{disabled: !isSelectButtonActive}"
              :disabled="!isSelectButtonActive"
              v-if="app.selectButton.active" @click="app.selectButton.click(fs.selectedItems, $event)">{{ t("Select") }}
      </button>
      <span class="vuefinder__status-bar__about" :title="t('About')" @click="app.modal.open(ModalAbout)">
        <AboutSVG/>
      </span>
    </div>
  </div>
</template>
