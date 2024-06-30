<template>
  <div class="vuefinder__status-bar__wrapper">
    <div class="vuefinder__status-bar__storage">
      <div class="vuefinder__status-bar__storage-container" :title="t('Storage')">
        <div class="vuefinder__status-bar__storage-icon">
          <StorageSVG/>
        </div>
        <select v-model="app.fs.adapter" @change="handleStorageSelect"
                class="vuefinder__status-bar__storage-select" tabindex="-1">
          <option v-for="storage in app.fs.data.storages" :value="storage">
            {{ storage }}
          </option>
        </select>
      </div>
      <div class="vuefinder__status-bar__info">
        <span v-if="searchQuery.length">{{ app.fs.data.files.length }} items found. </span>
        <span class="vuefinder__status-bar__selected-count">{{ app.dragSelect.getCount() > 0 ? t('%s item(s) selected.', app.dragSelect.getCount()) : '' }}</span>
      </div>
    </div>
    <div class="vuefinder__status-bar__actions">
      <button class="vf-btn py-0 vf-btn-primary"
              :class="{disabled: !isSelectButtonActive}"
              :disabled="!isSelectButtonActive"
              v-if="app.selectButton.active" @click="app.selectButton.click(ds.getSelected(), $event)">{{ t("Select") }}</button>
      <span class="vuefinder__status-bar__about" :title="t('About')" @click="app.modal.open(ModalAbout)">
        <AboutSVG />
      </span>
    </div>
  </div>
</template>

<style>
.vuefinder__status-bar__wrapper {
  @apply p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0;
}

.vuefinder__status-bar__storage {
  @apply flex leading-5 items-center;
}

.vuefinder__status-bar__storage-container {
  @apply flex leading-5 items-center rounded border dark:bg-gray-700 dark:border-gray-600;
}

.vuefinder__status-bar__storage-icon {
  @apply z-[1] pointer-events-none;
}

.vuefinder__status-bar__storage-select {
  @apply border-0 py-0.5 text-xs text-slate-500 bg-white dark:text-neutral-50 dark:bg-gray-700 rounded uppercase focus:outline-0 cursor-pointer;
}

.vuefinder__status-bar__info {
  @apply ml-3;
}

.vuefinder__status-bar__selected-count {
  @apply ml-1;
}

.vuefinder__status-bar__actions {
  @apply flex leading-5 items-center justify-end;
}

.vuefinder .vuefinder__status-bar__about {
  @apply mr-1;
}
</style>

<script setup>
import {computed, inject, ref} from 'vue';
import ModalAbout from "./modals/ModalAbout.vue";
import StorageSVG from "./icons/storage.svg";
import AboutSVG from "./icons/about.svg";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const {setStore} = app.storage;
const  ds = app.dragSelect;

const handleStorageSelect = () => {
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.fs.adapter}});
  setStore('adapter', app.fs.adapter);
};

const searchQuery = ref('');

app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple ? ds.getSelected().length > 0 : ds.getSelected().length === 1;
  return app.selectButton.active && selectionAllowed;
});

</script>

