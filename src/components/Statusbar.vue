<template>
  <div class="p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none grow-0">
    <div class="flex leading-5 items-center">
      <div class="z-[1] pl-1 pointer-events-none" :title="t('Storage')">
        <StorageSVG/>
      </div>
      <select v-model="app.fs.adapter" @change="handleStorageSelect"
              class="-translate-x-5 pl-4 pr-2 py-0.5 text-xs text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded uppercase focus:outline-0" tabindex="-1">
        <option v-for="storage in app.fs.data.storages" :value="storage">
          {{ storage }}
        </option>
      </select>

     <div class="ml-3">
       <span v-if="searchQuery.length">{{ app.fs.data.files.length }} items found. </span>
       <span class="ml-1">{{ app.dragSelect.getCount() > 0 ? t('%s item(s) selected.', app.dragSelect.getCount()) : '' }}</span>
     </div>
    </div>
    <div class="flex leading-5 items-center justify-end">

      <button class="vf-btn py-0 vf-btn-primary"
              :class="{disabled: !isSelectButtonActive}"
              :disabled="!isSelectButtonActive"
              v-if="app.selectButton.active" @click="app.selectButton.click(ds.getSelected(), $event)">{{ t("Select") }}</button>

      <span class="mr-1" :title="t('About')" @click="app.modal.open(ModalAbout)">
        <AboutSVG />
      </span>
    </div>
  </div>
</template>

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

