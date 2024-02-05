<template>
  <div class="p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none">
    <div class="flex leading-5 items-center">
      <div class="mx-2" :aria-label="t('Storage')" data-microtip-position="top-right" role="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
      <select v-model="app.adapter" @change="handleStorageSelect" class="py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8">
        <option v-for="storage in app.data.storages" :value="storage">
          {{ storage }}
        </option>
      </select>

     <div class="ml-3">
       <span v-if="searchQuery.length">{{ app.data.files.length }} items found. </span>
       <span class="ml-1">{{ selectedItemCount > 0 ? t('%s item(s) selected.', selectedItemCount) : '' }}</span>
     </div>
    </div>
    <div class="flex leading-5 items-center justify-end">

      <button class="vf-btn py-0 vf-btn-primary"
              :class="{disabled: !isSelectButtonActive}"
              :disabled="!isSelectButtonActive"
              v-if="app.selectButton.active" @click="app.selectButton.click(app.selectedItems, $event)">{{ t("Select") }}</button>

      <span class="mr-1" :aria-label="t('About')" data-microtip-position="top-left" role="tooltip" @click="app.emitter.emit('vf-modal-show', {type:'about'})">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-slate-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFStatusbar'
};
</script>

<script setup>
import {computed, inject, ref} from 'vue';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const {setStore} = app.storage;

const selectedItemCount = ref(0);

const handleStorageSelect = () => {
  app.emitter.emit('vf-search-exit');
  app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.adapter}});
  setStore('adapter', app.adapter)
};

app.emitter.on('vf-nodes-selected', (items) => {
  selectedItemCount.value = items.length;

})

const searchQuery = ref('');

app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

const isSelectButtonActive = computed(() => {
  const selectionAllowed = app.selectButton.multiple ? app.selectedItems.length > 0 : app.selectedItems.length === 1;
  return app.selectButton.active && selectionAllowed;
});

</script>

