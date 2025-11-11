<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useApp } from '../composables/useApp';
import { useFeature } from '../composables/useFeature';
import { useStore } from '@nanostores/vue';
import ModalNewFolder from './modals/ModalNewFolder.vue';
import ModalNewFile from './modals/ModalNewFile.vue';
import ModalRename from './modals/ModalRename.vue';
import ModalDelete from './modals/ModalDelete.vue';
import ModalUpload from './modals/ModalUpload.vue';
import ModalUnarchive from './modals/ModalUnarchive.vue';
import ModalArchive from './modals/ModalArchive.vue';
import ModalSearch from './modals/ModalSearch.vue';
import NewFolderSVG from '../assets/icons/new_folder.svg';
import NewFileSVG from '../assets/icons/new_file.svg';
import RenameSVG from '../assets/icons/rename.svg';
import DeleteSVG from '../assets/icons/delete.svg';
import UploadSVG from '../assets/icons/upload.svg';
import ArchiveSVG from '../assets/icons/archive.svg';
import UnarchiveSVG from '../assets/icons/unarchive.svg';
import FullscreenSVG from '../assets/icons/full_screen.svg';
import MinimizeSVG from '../assets/icons/minimize.svg';
import GridViewSVG from '../assets/icons/grid_view.svg';
import ListViewSVG from '../assets/icons/list_view.svg';
import FilterSVG from '../assets/icons/filter.svg';
import SearchSVG from '../assets/icons/search.svg';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';
import type { DirEntry } from '../types';
import type { SortState, FilterState } from '../stores/files';

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;

defineOptions({ name: 'VfToolbar' });

const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);
const selectedItems: StoreValue<DirEntry[]> = useStore(fs.selectedItems);
const fsSortState: StoreValue<SortState> = useStore(fs.sort);
const fsFilterState: StoreValue<FilterState> = useStore(fs.filter);

watch(
  () => configState.value.fullScreen,
  () => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = configState.value.fullScreen ? 'hidden' : '';
    }
  },
  { immediate: true }
);

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
  // Ensure body overflow is set on mount (for refresh case when localStorage loads after watch)
  const body = document.querySelector('body');
  if (body && configState.value.fullScreen) {
    setTimeout(() => (body.style.overflow = 'hidden'));
  }
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
watch(
  () => filterSortState.value.sortBy,
  (newSortBy) => {
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
  }
);

watch(
  () => filterSortState.value.sortOrder,
  (newOrder) => {
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
  }
);

// Sync dropdown state with files store
watch(
  fsSortState,
  (newSortState) => {
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
  },
  { immediate: true }
);

// Watch for filter changes and apply to files store automatically
watch(
  () => filterSortState.value.filterKind,
  (newFilterKind) => {
    fs.setFilter(newFilterKind as 'all' | 'files' | 'folders', configState.value.showHiddenFiles);
  }
);

watch(
  () => filterSortState.value.showHidden,
  (newShowHidden) => {
    config.set('showHiddenFiles', newShowHidden);
    fs.setFilter(filterSortState.value.filterKind as 'all' | 'files' | 'folders', newShowHidden);
  }
);

// Sync filter dropdown state with files store
watch(
  fsFilterState,
  (newFilterState) => {
    filterSortState.value.filterKind = newFilterState.kind;
    // Don't sync showHidden from files store anymore
  },
  { immediate: true }
);

// Sync showHidden with config store
watch(
  () => configState.value.showHiddenFiles,
  (newShowHidden) => {
    filterSortState.value.showHidden = newShowHidden;
    fs.setFilter(filterSortState.value.filterKind as 'all' | 'files' | 'folders', newShowHidden);
  },
  { immediate: true }
);

const toggleView = () => config.set('view', configState.value.view === 'grid' ? 'list' : 'grid');

// Check if any filters or sorting are active
const hasActiveFilters = computed(() => {
  return (
    fsFilterState.value.kind !== 'all' ||
    !configState.value.showHiddenFiles ||
    fsSortState.value.active
  );
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
    <div class="vuefinder__toolbar__actions">
      <div
        v-if="enabled('newfolder')"
        class="mx-1.5"
        :title="t('New Folder')"
        @click="app.modal.open(ModalNewFolder, { items: selectedItems })"
      >
        <NewFolderSVG />
      </div>

      <div
        v-if="enabled('newfile')"
        class="mx-1.5"
        :title="t('New File')"
        @click="app.modal.open(ModalNewFile, { items: selectedItems })"
      >
        <NewFileSVG />
      </div>

      <div
        v-if="enabled('rename')"
        class="mx-1.5"
        :title="t('Rename')"
        @click="selectedItems.length !== 1 || app.modal.open(ModalRename, { items: selectedItems })"
      >
        <RenameSVG
          :class="selectedItems.length === 1 ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"
        />
      </div>

      <div
        v-if="enabled('delete')"
        class="mx-1.5"
        :title="t('Delete')"
        @click="!selectedItems.length || app.modal.open(ModalDelete, { items: selectedItems })"
      >
        <DeleteSVG :class="selectedItems.length ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'" />
      </div>

      <div
        v-if="enabled('upload')"
        class="mx-1.5"
        :title="t('Upload')"
        @click="app.modal.open(ModalUpload, { items: selectedItems })"
      >
        <UploadSVG />
      </div>

      <div
        v-if="
          enabled('unarchive') &&
          selectedItems.length === 1 &&
          selectedItems[0].mime_type === 'application/zip'
        "
        class="mx-1.5"
        :title="t('Unarchive')"
        @click="!selectedItems.length || app.modal.open(ModalUnarchive, { items: selectedItems })"
      >
        <UnarchiveSVG
          :class="selectedItems.length ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"
        />
      </div>

      <div
        v-if="enabled('archive')"
        class="mx-1.5"
        :title="t('Archive')"
        @click="!selectedItems.length || app.modal.open(ModalArchive, { items: selectedItems })"
      >
        <ArchiveSVG
          :class="selectedItems.length ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"
        />
      </div>
    </div>

    <div class="vuefinder__toolbar__controls">
      <!-- Search Modal Button -->
      <div
        v-if="enabled('search')"
        class="mx-1.5"
        :title="t('Search Files')"
        @click="app.modal.open(ModalSearch)"
      >
        <SearchSVG class="vf-toolbar-icon text-(--vf-bg-primary)" />
      </div>

      <!-- Filter dropdown -->
      <div class="vuefinder__toolbar__control vuefinder__toolbar__dropdown-container">
        <div
          :title="t('Filter')"
          class="vuefinder__toolbar__dropdown-trigger"
          @click="showFilterSort = !showFilterSort"
        >
          <div class="relative">
            <FilterSVG class="vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" />
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
                <select
                  v-model="filterSortState.sortBy"
                  class="vuefinder__toolbar__dropdown-select"
                >
                  <option value="name">{{ t('Name') }}</option>
                  <option value="size">{{ t('Size') }}</option>
                  <option value="modified">{{ t('Date') }}</option>
                </select>
                <select
                  v-model="filterSortState.sortOrder"
                  class="vuefinder__toolbar__dropdown-select"
                >
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
                  <input
                    v-model="filterSortState.filterKind"
                    type="radio"
                    name="filterKind"
                    value="all"
                    class="vuefinder__toolbar__radio"
                  />
                  <span class="vuefinder__toolbar__option-text">{{ t('All items') }}</span>
                </label>
                <label class="vuefinder__toolbar__dropdown-option">
                  <input
                    v-model="filterSortState.filterKind"
                    type="radio"
                    name="filterKind"
                    value="files"
                    class="vuefinder__toolbar__radio"
                  />
                  <span class="vuefinder__toolbar__option-text">{{ t('Files only') }}</span>
                </label>
                <label class="vuefinder__toolbar__dropdown-option">
                  <input
                    v-model="filterSortState.filterKind"
                    type="radio"
                    name="filterKind"
                    value="folders"
                    class="vuefinder__toolbar__radio"
                  />
                  <span class="vuefinder__toolbar__option-text">{{ t('Folders only') }}</span>
                </label>
              </div>
            </div>

            <!-- Hidden Files -->
            <div class="vuefinder__toolbar__dropdown-toggle">
              <label for="showHidden" class="vuefinder__toolbar__toggle-label">{{
                t('Show hidden files')
              }}</label>
              <input
                id="showHidden"
                v-model="filterSortState.showHidden"
                type="checkbox"
                class="vuefinder__toolbar__checkbox"
              />
            </div>

            <!-- Reset Button -->
            <div class="vuefinder__toolbar__dropdown-reset">
              <button class="vuefinder__toolbar__reset-button" @click="resetFilters">
                {{ t('Reset') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="enabled('fullscreen')"
        class="mx-1.5"
        :title="t('Toggle Full Screen')"
        @click="config.toggle('fullScreen')"
      >
        <MinimizeSVG v-if="configState.fullScreen" class="vf-toolbar-icon" />
        <FullscreenSVG v-else class="vf-toolbar-icon" />
      </div>

      <div class="mx-1.5" :title="t('Change View')" @click="toggleView()">
        <GridViewSVG v-if="configState.view === 'grid'" class="vf-toolbar-icon" />
        <ListViewSVG v-if="configState.view === 'list'" class="vf-toolbar-icon" />
      </div>
    </div>
  </div>
</template>
