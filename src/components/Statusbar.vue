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
const searchState = useStore(search.state);
const sortedFiles = useStore(fs.sortedFiles);
const path = useStore(fs.path);
const selectedCount = useStore(fs.selectedCount);
const storages = useStore(fs.storages);
const selectedItems = useStore(fs.selectedItems);
const currentPath = useStore(fs.path);

const handleStorageSelect = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params: {q: 'index', storage: value}});
};


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
        <span class="vuefinder__status-bar__selected-count">
          {{ selectedCount > 0 ? `${selectedCount} item(s) selected.` : '' }}
        </span>
      </div>
    </div>

    <div class="vuefinder__status-bar__actions"> 
      <slot name="actions" :path="currentPath.path" :count="selectedCount || 0" :selected="selectedItems || []"></slot>
      <span class="vuefinder__status-bar__about" :title="t('About')" @click="app.modal.open(ModalAbout)">
        <AboutSVG/>
      </span>
    </div>
  </div>
</template>
