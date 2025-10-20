<script setup lang="ts">
import {inject, ref, watch, onMounted, onUnmounted, computed} from 'vue';
import {useStore} from '@nanostores/vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "./modals/ModalNewFolder.vue";
import ModalNewFile from "./modals/ModalNewFile.vue";
import ModalRename from "./modals/ModalRename.vue";
import ModalDelete from "./modals/ModalDelete.vue";
import ModalUpload from "./modals/ModalUpload.vue";
import ModalUnarchive from "./modals/ModalUnarchive.vue";
import ModalArchive from "./modals/ModalArchive.vue";
import NewFolderSVG from "../assets/icons/new_folder.svg";
import NewFileSVG from "../assets/icons/new_file.svg";
import RenameSVG from "../assets/icons/rename.svg";
import DeleteSVG from "../assets/icons/delete.svg";
import UploadSVG from "../assets/icons/upload.svg";
import ArchiveSVG from "../assets/icons/archive.svg";
import UnarchiveSVG from "../assets/icons/unarchive.svg";
import LoadingSVG from "../assets/icons/loading.svg";
import FullscreenSVG from "../assets/icons/full_screen.svg";
import MinimizeSVG from "../assets/icons/minimize.svg";
import GridViewSVG from "../assets/icons/grid_view.svg";
import ListViewSVG from "../assets/icons/list_view.svg";
import FilterSVG from "../assets/icons/filter.svg";
import type { StoreValue } from 'nanostores';
import type { SearchState } from '../stores/search';
import type { ConfigState } from '../stores/config';
import type { DirEntry } from '../types';
import type { SortState, FilterState } from '../stores/files';

const app = inject('ServiceContainer');
const {t} = app.i18n;

defineOptions({ name: 'VfToolbar' });

const fs = app.fs;
const config = app.config;
const search = app.search;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);
const searchState: StoreValue<SearchState> = useStore(search.state);
const selectedItems: StoreValue<DirEntry[]> = useStore(fs.selectedItems);
const fsSortState: StoreValue<SortState> = useStore(fs.sort);
const fsFilterState: StoreValue<FilterState> = useStore(fs.filter);

watch(() => configState.value.fullScreen, () => {
  if (configState.value.fullScreen) {
    // add body overflow hidden
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'hidden';
  } else {
    // remove body overflow hidden
    const body = document.querySelector('body');
    if (body) body.style.overflow = '';
  }
  app.emitter.emit('vf-fullscreen-toggle');
});


// Dropdown visibility state (local, non-persistent)
const showFilterSort = ref(false);
// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.vuefinder__toolbar__dropdown-container')) {
    showFilterSort.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Filter & Sort payload (kept local to avoid changing store types)
const filterSortState = ref({
  sortBy: 'name', // name | size | type | modified
  sortOrder: '', // '' | asc | desc (empty means no sorting)
  filterKind: 'all', // all | files | folders
  showHidden: configState.value.showHiddenFiles, // Initialize with config store default
});


// Watch for changes and apply to files store automatically
watch(() => filterSortState.value.sortBy, (newSortBy) => {
  // If no order is selected, don't apply sorting
  if (!filterSortState.value.sortOrder) {
    fs.clearSort();
    return;
  }
  
  // Apply the sort
  if (newSortBy === 'name') {
    fs.setSort('basename', filterSortState.value.sortOrder as 'asc' | 'desc');
  } else if (newSortBy === 'size') {
    fs.setSort('file_size', filterSortState.value.sortOrder as 'asc' | 'desc');
  } else if (newSortBy === 'modified') {
    fs.setSort('last_modified', filterSortState.value.sortOrder as 'asc' | 'desc');
  }
});

watch(() => filterSortState.value.sortOrder, (newOrder) => {
  // If no order is selected, clear sorting
  if (!newOrder) {
    fs.clearSort();
    return;
  }
  
  // Apply the sort
  if (filterSortState.value.sortBy === 'name') {
    fs.setSort('basename', newOrder as 'asc' | 'desc');
  } else if (filterSortState.value.sortBy === 'size') {
    fs.setSort('file_size', newOrder as 'asc' | 'desc');
  } else if (filterSortState.value.sortBy === 'modified') {
    fs.setSort('last_modified', newOrder as 'asc' | 'desc');
  }
});

// Sync dropdown state with files store
watch(fsSortState, (newSortState) => {
  if (!newSortState.active) {
    // No sorting active
    filterSortState.value.sortOrder = '';
  } else {
    // Map store column names to dropdown values
    if (newSortState.column === 'basename') {
      filterSortState.value.sortBy = 'name';
    } else if (newSortState.column === 'file_size') {
      filterSortState.value.sortBy = 'size';
    } else if (newSortState.column === 'last_modified') {
      filterSortState.value.sortBy = 'modified';
    }
    
    // Set the order
    filterSortState.value.sortOrder = newSortState.order;
  }
}, { immediate: true });

// Watch for filter changes and apply to files store automatically
watch(() => filterSortState.value.filterKind, (newFilterKind) => {
  fs.setFilter(newFilterKind as 'all' | 'files' | 'folders', configState.value.showHiddenFiles);
});

watch(() => filterSortState.value.showHidden, (newShowHidden) => {
  config.set('showHiddenFiles', newShowHidden);
  fs.setFilter(filterSortState.value.filterKind as 'all' | 'files' | 'folders', newShowHidden);
});

// Sync filter dropdown state with files store
watch(fsFilterState, (newFilterState) => {
  filterSortState.value.filterKind = newFilterState.kind;
  // Don't sync showHidden from files store anymore
}, { immediate: true });

// Sync showHidden with config store
watch(() => configState.value.showHiddenFiles, (newShowHidden) => {
  filterSortState.value.showHidden = newShowHidden;
  fs.setFilter(filterSortState.value.filterKind as 'all' | 'files' | 'folders', newShowHidden);
}, { immediate: true });

const toggleView = () => config.set('view', configState.value.view === 'grid' ? 'list' : 'grid');

// Check if any filters or sorting are active
const hasActiveFilters = computed(() => {
  return fsFilterState.value.kind !== 'all' || !configState.value.showHiddenFiles || fsSortState.value.active;
});

const resetFilters = () => {
  filterSortState.value = {
    sortBy: 'name',
    sortOrder: '', // No sorting by default
    filterKind: 'all',
    showHidden: true, // Reset to default value
  };
  config.set('showHiddenFiles', true);
  fs.clearSort();
  fs.clearFilter();
};

</script>

<template>
  <div class="vuefinder__toolbar">
    <div class="vuefinder__toolbar__actions" v-if="!searchState.query.length">
      <div
          class="mx-1.5"
          :title="t('New Folder')"
          v-if="app.features.includes(FEATURES.NEW_FOLDER)"
          @click="app.modal.open(ModalNewFolder, {items: selectedItems})"
      >
        <NewFolderSVG/>
      </div>

      <div
          class="mx-1.5"
          :title="t('New File')"
          v-if="app.features.includes(FEATURES.NEW_FILE)"
          @click="app.modal.open(ModalNewFile, {items: selectedItems})"
      >
        <NewFileSVG/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Rename')"
          v-if="app.features.includes(FEATURES.RENAME)"
          @click="(selectedItems.length !== 1) || app.modal.open(ModalRename, {items: selectedItems})"
      >
        <RenameSVG :class="(selectedItems.length === 1) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Delete')"
          v-if="app.features.includes(FEATURES.DELETE)"
          @click="(!selectedItems.length) || app.modal.open(ModalDelete, {items: selectedItems})"
      >
        <DeleteSVG :class="(selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Upload')"
          v-if="app.features.includes(FEATURES.UPLOAD)"
          @click="app.modal.open(ModalUpload, {items: selectedItems})"
      >
        <UploadSVG/>
      </div>

      <div
          class="mx-1.5"
          v-if="app.features.includes(FEATURES.UNARCHIVE) && selectedItems.length === 1 && selectedItems[0].mime_type === 'application/zip'"
          :title="t('Unarchive')"
          @click="(!selectedItems.length) || app.modal.open(ModalUnarchive, {items: selectedItems})"
      >
        <UnarchiveSVG :class="(selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          v-if="app.features.includes(FEATURES.ARCHIVE)"
          :title="t('Archive')"
          @click="(!selectedItems.length) || app.modal.open(ModalArchive, {items: selectedItems})"
      >
        <ArchiveSVG :class="(selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>
    </div>

    <div class="vuefinder__toolbar__search-results" v-if="searchState.query">
      <div class="pl-2">
        {{ t('Search results for') }}
        <span class="dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded">{{ searchState.query }}</span>
      </div>
      <LoadingSVG v-if="config.get('loadingIndicator') === 'circular' && fs.isLoading()"/>
    </div>

    <div class="vuefinder__toolbar__controls">
      <!-- Filter dropdown -->
      <div class="vuefinder__toolbar__control vuefinder__toolbar__dropdown-container">
        <div :title="t('Filter')" @click="showFilterSort = !showFilterSort" class="vuefinder__toolbar__dropdown-trigger">
          <div class="relative">

            <FilterSVG class="vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6"/>
            <!-- Filter indicator dot -->
            <div v-if="hasActiveFilters" class="vuefinder__toolbar__filter-indicator"></div>
          </div>
        </div>
        <div v-if="showFilterSort" class="vuefinder__toolbar__dropdown">
          <div class="vuefinder__toolbar__dropdown-content">
            <!-- Sorting -->
            <div class="vuefinder__toolbar__dropdown-section">
              <div class="vuefinder__toolbar__dropdown-label">{{ t('Sorting') }}</div>
              <div class="vuefinder__toolbar__dropdown-row">
                <select v-model="filterSortState.sortBy" class="vuefinder__toolbar__dropdown-select">
                  <option value="name">{{ t('Name') }}</option>
                  <option value="size">{{ t('Size') }}</option>
                  <option value="modified">{{ t('Date') }}</option>
                </select>
                <select v-model="filterSortState.sortOrder" class="vuefinder__toolbar__dropdown-select">
                  <option value="">{{ t('None') }}</option>
                  <option value="asc">{{ t('Asc') }}</option>
                  <option value="desc">{{ t('Desc') }}</option>
                </select>
              </div>
            </div>

            <!-- Filtering -->
            <div class="vuefinder__toolbar__dropdown-section">
              <div class="vuefinder__toolbar__dropdown-label">{{ t('Show') }}</div>
              <div class="vuefinder__toolbar__dropdown-options">
                <label class="vuefinder__toolbar__dropdown-option">
                  <input type="radio" name="filterKind" value="all" v-model="filterSortState.filterKind" class="vuefinder__toolbar__radio">
                  <span class="vuefinder__toolbar__option-text">{{ t('All items') }}</span>
                </label>
                <label class="vuefinder__toolbar__dropdown-option">
                  <input type="radio" name="filterKind" value="files" v-model="filterSortState.filterKind" class="vuefinder__toolbar__radio">
                  <span class="vuefinder__toolbar__option-text">{{ t('Files only') }}</span>
                </label>
                <label class="vuefinder__toolbar__dropdown-option">
                  <input type="radio" name="filterKind" value="folders" v-model="filterSortState.filterKind" class="vuefinder__toolbar__radio">
                  <span class="vuefinder__toolbar__option-text">{{ t('Folders only') }}</span>
                </label>
              </div>
            </div>

            <!-- Hidden Files -->
            <div class="vuefinder__toolbar__dropdown-toggle">
              <label for="showHidden" class="vuefinder__toolbar__toggle-label">{{ t('Show hidden files') }}</label>
              <input type="checkbox" id="showHidden" v-model="filterSortState.showHidden" class="vuefinder__toolbar__checkbox">
            </div>

            <!-- Reset Button -->
            <div class="vuefinder__toolbar__dropdown-reset">
              <button @click="resetFilters" class="vuefinder__toolbar__reset-button">
                {{ t('Reset') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
          v-if="app.features.includes(FEATURES.FULL_SCREEN)"
          @click="config.toggle('fullScreen')"
          class="mx-1.5"
          :title="t('Toggle Full Screen')"
      >
        <MinimizeSVG v-if="configState.fullScreen"/>
        <FullscreenSVG v-else/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Change View')"
          @click="searchState.query.length || toggleView()"
      >
        <GridViewSVG v-if="configState.view === 'grid'" class="vf-toolbar-icon"
                     :class="(!searchState.query.length) ? '' : 'vf-toolbar-icon-disabled'"/>
        <ListViewSVG v-if="configState.view === 'list'" class="vf-toolbar-icon"
                     :class="(!searchState.query.length) ? '' : 'vf-toolbar-icon-disabled'"/>
      </div>
    </div>
  </div>
</template>
