<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { inject } from 'vue';
import { useApp } from '../../composables/useApp';
import useDebouncedRef from '../../composables/useDebouncedRef';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';
import SearchSVG from '../../assets/icons/search.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import ModalLayout from './ModalLayout.vue';
import ModalHeader from './ModalHeader.vue';
import ModalPreview from './ModalPreview.vue';
import ModalTreeSelector from './ModalTreeSelector.vue';
import SearchInput from '../search/SearchInput.vue';
import SearchOptionsDropdown, { type SortOption } from '../search/SearchOptionsDropdown.vue';
import SearchResultsList from '../search/SearchResultsList.vue';
import type { DirEntry } from '../../types';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';
import { shortenPath } from '../../utils/path';
import { copyPath } from '../../utils/clipboard';
import { compareValues } from '../../stores/files';

defineOptions({ name: 'ModalSearch' });

const app = useApp();
const notify = createNotifier(app);
const { t } = app.i18n;
const fs = app.fs;

// Reactive state
const searchInputRef = ref<InstanceType<typeof SearchInput> | null>(null);
const searchOptionsDropdownRef = ref<InstanceType<typeof SearchOptionsDropdown> | null>(null);
const searchResultsListRef = ref<InstanceType<typeof SearchResultsList> | null>(null);
const query = useDebouncedRef('', 300);
const searchResults = ref<DirEntry[]>([]);
const isSearching = ref(false);
const selectedIndex = ref(-1);

// Controller for the most recent in-flight search. When a new search starts,
// the previous controller is aborted so its (potentially stale) response is dropped.
let searchAbortController: AbortController | null = null;

// Advanced search state
const showDropdown = ref(false);
const showFolderSelector = ref(false);
const targetFolderEntry = ref<DirEntry | null>(null);
const sizeFilter = ref<'all' | 'small' | 'medium' | 'large'>('all');
const deepSearch = ref(false);
const sortBy = ref<SortOption>('name-asc');

const SORT_COLUMNS: Record<SortOption, { column: keyof DirEntry; direction: 1 | -1 }> = {
  'name-asc': { column: 'basename', direction: 1 },
  'name-desc': { column: 'basename', direction: -1 },
  'size-asc': { column: 'file_size', direction: 1 },
  'size-desc': { column: 'file_size', direction: -1 },
  'date-asc': { column: 'last_modified', direction: 1 },
  'date-desc': { column: 'last_modified', direction: -1 },
};

const sortedSearchResults = computed(() => {
  const { column, direction } = SORT_COLUMNS[sortBy.value];
  return searchResults.value
    .slice()
    .sort((a, b) => compareValues(a[column], b[column]) * direction);
});

// Dropdown selection state
const selectedDropdownOption = ref<string | null>(`size-${sizeFilter.value}`);
const selectedItemDropdownOption = ref<string | null>(null);

// Path expansion and dropdown states
const expandedPaths = ref<Set<string>>(new Set());
const activeDropdown = ref<string | null>(null);

// Store subscriptions
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

// Utility functions
const togglePathExpansion = (path: string) => {
  if (expandedPaths.value.has(path)) {
    expandedPaths.value.delete(path);
  } else {
    expandedPaths.value.add(path);
  }
};

const toggleItemDropdown = (itemPath: string, event: MouseEvent) => {
  if (event && typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  }

  if (activeDropdown.value === itemPath) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = itemPath;
  }
};

const closeAllDropdowns = () => {
  activeDropdown.value = null;
};

// Dropdown action handlers
const openContainingFolder = (item: DirEntry) => {
  try {
    // Use the dir property from the search result item
    const parentPath = item.dir || `${item.storage}://`;
    app.adapter.open(parentPath);
    app.modal.close();
    closeAllDropdowns();
  } catch {
    notify.error(t('Failed to open containing folder'));
  }
};

const previewItem = (item: DirEntry) => {
  app.modal.open(ModalPreview, {
    storage: currentPath?.value?.storage ?? 'local',
    item: item,
  });
  closeAllDropdowns();
};

// Navigate into a folder result and close the search modal.
const openItem = (item: DirEntry) => {
  app.adapter.open(item.path);
  app.modal.close();
  closeAllDropdowns();
};

// Double-click / Enter on a result: folders navigate, files preview.
const activateItem = (item: DirEntry) => {
  if (item.type === 'dir') {
    openItem(item);
  } else {
    previewItem(item);
  }
};

const selectResultItem = (index: number) => {
  selectedIndex.value = index;
  closeAllDropdowns(); // Close any open dropdowns when selecting a new item
};

const selectResultItemWithDropdown = (index: number) => {
  selectedIndex.value = index;
  // Don't close dropdowns when selecting via three dots button
};

const copyItemPath = async (item: DirEntry) => {
  await copyPath(item.path);
  closeAllDropdowns();
};

// Watch for query changes and trigger search
watch(query, async (newQuery) => {
  if (newQuery.trim()) {
    await performSearch(newQuery.trim());
    selectedIndex.value = 0;
  } else {
    // Cancel any in-flight request so its response cannot repopulate cleared results.
    if (searchAbortController) {
      searchAbortController.abort();
      searchAbortController = null;
    }
    searchResults.value = [];
    isSearching.value = false;
    selectedIndex.value = -1;
  }
});

// Watch for filter changes to update selected state and trigger search
watch(sizeFilter, async (newValue) => {
  selectedDropdownOption.value = `size-${newValue}`;

  // Trigger search if there's a query and we're not in the folder selector
  if (query.value.trim() && !showFolderSelector.value) {
    await performSearch(query.value.trim());
    selectedIndex.value = 0;
  }
});

// Watch for deep search changes to trigger search
watch(deepSearch, async () => {
  // Only trigger search if there's a query and we're not in the folder selector
  if (query.value.trim() && !showFolderSelector.value) {
    await performSearch(query.value.trim());
    selectedIndex.value = 0;
  }
});

// Detect aborted requests so we don't show "Search failed" for cancellations
// triggered by rapid input changes.
const isAbortError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const name = (error as { name?: unknown }).name;
  return name === 'AbortError' || name === 'CanceledError';
};

// Perform search
const performSearch = async (searchQuery: string) => {
  if (!searchQuery) return;

  // Cancel any in-flight request so a stale response cannot overwrite the
  // results for the current query.
  if (searchAbortController) {
    searchAbortController.abort();
  }
  const controller = new AbortController();
  searchAbortController = controller;

  isSearching.value = true;

  try {
    const searchPath = targetFolderEntry.value?.path || currentPath?.value?.path;
    const files = await app.adapter.search({
      path: searchPath,
      filter: searchQuery,
      deep: deepSearch.value,
      size: sizeFilter.value,
      signal: controller.signal,
    });
    // Guard against a late resolution after a newer search started.
    if (controller.signal.aborted) return;
    searchResults.value = files || [];
    isSearching.value = false;
  } catch (error: unknown) {
    // Silently ignore aborts caused by superseding searches.
    if (isAbortError(error) || controller.signal.aborted) return;
    notify.error(getErrorMessage(error, t('Search failed')));
    searchResults.value = [];
    isSearching.value = false;
  }
};

// Event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  // Initialize selected state
  selectedDropdownOption.value = `size-${sizeFilter.value}`;
});

// Open folder selector modal
const openFolderSelector = () => {
  if (!showFolderSelector.value) {
    // Opening folder selector
    showDropdown.value = false;
    showFolderSelector.value = true;
  } else {
    // Closing folder selector
    showFolderSelector.value = false;

    // If there's a query, perform search with current folder
    if (query.value.trim()) {
      performSearch(query.value.trim());
      selectedIndex.value = 0;
    }
  }
};

const selectTargetFolder = (folder: DirEntry | null) => {
  if (folder) {
    targetFolderEntry.value = folder;
  }
};

// Handle folder selection and close selector
const handleFolderSelect = (entry: DirEntry | null) => {
  if (entry) {
    // Only update the search location, don't change current path
    selectTargetFolder(entry);

    // Close folder selector
    showFolderSelector.value = false;

    // If there's a query, perform search with new folder
    if (query.value.trim()) {
      performSearch(query.value.trim());
      selectedIndex.value = 0;
    }
  }
};

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);

  // Abort any in-flight search when the modal unmounts.
  if (searchAbortController) {
    searchAbortController.abort();
    searchAbortController = null;
  }

  // Cleanup child components
  if (searchOptionsDropdownRef.value) {
    searchOptionsDropdownRef.value.cleanup();
  }
});

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // Close search options dropdown
  if (showDropdown.value) {
    const isClickOnDropdown = target.closest('.vuefinder__search-modal__dropdown');

    if (!isClickOnDropdown) {
      showDropdown.value = false;

      // Refocus input when dropdown closes
      nextTick(() => {
        if (searchInputRef.value) {
          searchInputRef.value.focus();
        }
      });
    }
  }

  // Close item dropdowns
  if (activeDropdown.value) {
    const isClickOnItemDropdown = target.closest('.vuefinder__search-modal__item-dropdown');
    const isClickOnResultItem = target.closest('.vuefinder__search-modal__result-item');

    if (!isClickOnItemDropdown && !isClickOnResultItem) {
      closeAllDropdowns();
    }
  }
};
</script>

<template>
  <ModalLayout class="vuefinder__search-modal-layout">
    <div class="vuefinder__search-modal">
      <ModalHeader :icon="SearchSVG" :title="t('Search files')"></ModalHeader>

      <!-- Content Container (Input + Results) -->
      <div class="vuefinder__search-modal__content">
        <!-- Search Bar -->
        <div class="vuefinder__search-modal__search-bar">
          <SearchInput
            ref="searchInputRef"
            v-model="query"
            :is-searching="isSearching"
            :disabled="showFolderSelector"
          />
          <!-- Unified dropdown for both desktop and mobile -->
          <SearchOptionsDropdown
            ref="searchOptionsDropdownRef"
            v-model:visible="showDropdown"
            v-model:size-filter="sizeFilter"
            v-model:selected-option="selectedDropdownOption"
            v-model:sort-by="sortBy"
            :disabled="showFolderSelector"
          />
        </div>

        <!-- Search Options -->
        <div class="vuefinder__search-modal__options" @click.stop>
          <div class="vuefinder__search-modal__search-location">
            <button
              class="vuefinder__search-modal__location-btn"
              :class="{ 'vuefinder__search-modal__location-btn--open': showFolderSelector }"
              @click.stop="openFolderSelector"
            >
              <FolderSVG class="vuefinder__search-modal__location-icon" />
              <span
                class="vuefinder__search-modal__location-text"
                :title="targetFolderEntry?.path || currentPath.path"
                >{{ shortenPath(targetFolderEntry?.path || currentPath.path) }}</span
              >
              <svg
                class="vuefinder__search-modal__location-arrow"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"
                />
              </svg>
            </button>
          </div>
          <label class="vuefinder__search-modal__deep-search" @click.stop>
            <input
              v-model="deepSearch"
              type="checkbox"
              :disabled="showFolderSelector"
              class="vuefinder__search-modal__checkbox"
              @click.stop
            />
            <span>{{ t('Include subfolders') }}</span>
          </label>
        </div>

        <!-- Folder Selector -->
        <div v-if="showFolderSelector" class="vuefinder__search-modal__folder-selector">
          <div class="vuefinder__search-modal__folder-selector-content">
            <ModalTreeSelector
              v-model="targetFolderEntry"
              :show-pinned-folders="true"
              :current-path="currentPath"
              @update:model-value="selectTargetFolder"
              @select-and-close="handleFolderSelect"
            />
          </div>
        </div>

        <!-- Instructions -->
        <div
          v-if="!query.trim() && !showFolderSelector"
          class="vuefinder__search-modal__instructions"
        >
          <p class="vuefinder__search-modal__instructions-text">
            {{ t('Start typing to search files. Use options to filter or include subfolders.') }}
          </p>
        </div>

        <!-- Search Results (when query exists and folder selector closed) -->
        <SearchResultsList
          v-if="query.trim() && !showFolderSelector"
          ref="searchResultsListRef"
          :search-results="sortedSearchResults"
          :is-searching="isSearching"
          :selected-index="selectedIndex"
          :expanded-paths="expandedPaths"
          :active-dropdown="activeDropdown"
          :selected-item-dropdown-option="selectedItemDropdownOption"
          :results-enter="true"
          @select-result-item="selectResultItem"
          @select-result-item-with-dropdown="selectResultItemWithDropdown"
          @toggle-path-expansion="togglePathExpansion"
          @toggle-item-dropdown="toggleItemDropdown"
          @update:selected-item-dropdown-option="selectedItemDropdownOption = $event"
          @copy-path="copyItemPath"
          @open-containing-folder="openContainingFolder"
          @open="openItem"
          @preview="previewItem"
          @activate="activateItem"
        />
      </div>
    </div>
  </ModalLayout>
</template>
