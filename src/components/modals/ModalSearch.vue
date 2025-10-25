<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { inject } from 'vue';
import useDebouncedRef from '../../composables/useDebouncedRef';
import SearchSVG from '../../assets/icons/search.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import ModalLayout from './ModalLayout.vue';
import ModalHeader from './ModalHeader.vue';
import ModalPreview from './ModalPreview.vue';
import ModalTreeSelector from './ModalTreeSelector.vue';
import SearchInput from './SearchInput.vue';
import SearchOptionsDropdown from './SearchOptionsDropdown.vue';
import SearchResultsList from './SearchResultsList.vue';
import type { DirEntry } from '../../types';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';


defineOptions({ name: 'ModalSearch' });

const app = inject('ServiceContainer');
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

// Advanced search state
const showDropdown = ref(false);
const showFolderSelector = ref(false);
const targetFolderEntry = ref<DirEntry | null>(null);
const typeFilter = ref<'all' | 'files' | 'folders'>('all');
const sizeFilter = ref<'all' | 'small' | 'medium' | 'large'>('all');
const deepSearch = ref(false);

// Dropdown selection state
const selectedDropdownOption = ref<string | null>(null);
const selectedItemDropdownOption = ref<string | null>(null);

// Animation states
const folderSelectorEnter = ref(false);
const instructionsExit = ref(false);
const resultsEnter = ref(false);

// Path expansion and dropdown states
const expandedPaths = ref<Set<string>>(new Set());
const activeDropdown = ref<string | null>(null);

// Store subscriptions
const currentPath : StoreValue<CurrentPathState> = useStore(fs.path);

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
  // Use the dir property which contains the parent directory path
  // If dir is empty or root, use the storage root
  const parentPath = item.dir || `${item.storage}://`;
  
  app.emitter.emit('vf-fetch', {
    params: {
      q: 'index',
      storage: item.storage,
      path: parentPath
    }
  });
  app.modal.close();
  closeAllDropdowns();
};

const previewItem = (item: DirEntry) => {
  app.modal.open(ModalPreview, {
    storage: currentPath?.value?.storage ?? 'local',
    item: item
  });
  closeAllDropdowns();
};

const selectResultItem = (index: number) => {
  selectedIndex.value = index;
  closeAllDropdowns(); // Close any open dropdowns when selecting a new item
};

const copyItemPath = async (item: DirEntry) => {
  try {
    await navigator.clipboard.writeText(item.path);
  } catch (error) {
    console.error('Failed to copy path:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = item.path;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  closeAllDropdowns();
};

// Watch for query changes and trigger search
watch(query, async (newQuery) => {
  if (newQuery.trim()) {
    await performSearch(newQuery.trim());
    selectedIndex.value = 0;
    
    // Animate results in if not in folder selector
    if (!showFolderSelector.value) {
      nextTick(() => {
        resultsEnter.value = true;
        // Ensure first item is visible
        setTimeout(() => {
          if (searchResultsListRef.value) {
            searchResultsListRef.value.scrollSelectedIntoView();
          }
        }, 100);
      });
    }
  } else {
    searchResults.value = [];
    isSearching.value = false;
    selectedIndex.value = -1;
    resultsEnter.value = false;
  }
});

// Watch for results changes
watch(searchResults, () => {
  if (searchResults.value.length > 0 && !showFolderSelector.value) {
    nextTick(() => {
      // Ensure first item is visible when results change
      setTimeout(() => {
        if (searchResultsListRef.value) {
          searchResultsListRef.value.scrollSelectedIntoView();
        }
      }, 100);
    });
  }
});

// Watch for filter changes to update selected state
watch(typeFilter, (newValue) => {
  selectedDropdownOption.value = `type-${newValue}`;
});

watch(sizeFilter, (newValue) => {
  selectedDropdownOption.value = `size-${newValue}`;
});

// Perform search
const performSearch = async (searchQuery: string) => {
  if (!searchQuery) return;
  
  isSearching.value = true;
  
  try {
    const storage = currentPath?.value?.storage ?? 'local';
    
    // Build search parameters
    const searchParams: Record<string, string> = {
      q: 'search',
      storage,
      filter: searchQuery
    };
    
    // Add advanced search parameters - use selected folder or current path
    const searchPath = targetFolderEntry.value?.path || currentPath?.value?.path;
    if (searchPath) {
      searchParams.path = searchPath;
    }
    
    if (typeFilter.value !== 'all') {
      searchParams.type = typeFilter.value;
    }
    
    if (sizeFilter.value !== 'all') {
      searchParams.size = sizeFilter.value;
    }
    
    if (deepSearch.value) {
      searchParams.deep = '1';
    }
    
    app.emitter.emit('vf-fetch', {
      params: searchParams,
      dontCloseModal: true,
      dontChangePath: true,
      onSuccess: (data: { files: DirEntry[] }) => {
        searchResults.value = data.files || [];
        isSearching.value = false;
      },
      onError: () => {
        searchResults.value = [];
        isSearching.value = false;
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    searchResults.value = [];
    isSearching.value = false;
  }
};

// Handle item click
const handleItemClick = () => {
  // Handle item click logic here if needed
};

// Handle input-specific keyboard navigation
const handleInputKeydown = (e: KeyboardEvent) => {
  // Don't handle events if we're currently searching
  if (isSearching.value) return;
  
  // Handle arrow keys for result navigation
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value < searchResults.value.length - 1) {
      selectedIndex.value++;
      nextTick(() => {
        if (searchResultsListRef.value) {
          searchResultsListRef.value.scrollSelectedIntoView();
        }
      });
    }
    return;
  }
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
      nextTick(() => {
        if (searchResultsListRef.value) {
          searchResultsListRef.value.scrollSelectedIntoView();
        }
      });
    }
    return;
  }
  
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
      const selectedItem = searchResults.value[selectedIndex.value];
      if (selectedItem) {
        handleItemClick();
      }
    }
    return;
  }
  
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    app.modal.close();
    return;
  }
};

// Handle keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  // Only handle keyboard events if the modal is visible
  if (!app.modal.visible) return;
  
  // Don't handle events if we're currently searching
  if (isSearching.value) return;
  
  // Handle arrow keys for result navigation (even when input is focused)
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value < searchResults.value.length - 1) {
      selectedIndex.value++;
      nextTick(() => {
        if (searchResultsListRef.value) {
          searchResultsListRef.value.scrollSelectedIntoView();
        }
      });
    }
    return;
  }
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
      nextTick(() => {
        if (searchResultsListRef.value) {
          searchResultsListRef.value.scrollSelectedIntoView();
        }
      });
    }
    return;
  }
  
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
      const selectedItem = searchResults.value[selectedIndex.value];
      if (selectedItem) {
        handleItemClick();
      }
    }
    return;
  }
  
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    app.modal.close();
    return;
  }
};

// Handle window resize
const handleResize = () => {
  // No need for JavaScript positioning anymore
};

// Event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  
  // Initialize selected state
  selectedDropdownOption.value = `type-${typeFilter.value}`;
  
  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus();
    }
  });
});


// Open folder selector modal
const openFolderSelector = () => {
  if (!showFolderSelector.value) {
    // Opening folder selector - close dropdown first
    showDropdown.value = false;
    instructionsExit.value = true;
    setTimeout(() => {
      showFolderSelector.value = true;
      nextTick(() => {
        folderSelectorEnter.value = true;
      });
    }, 150); // Half of animation duration
  } else {
    // Closing folder selector
    folderSelectorEnter.value = false;
    setTimeout(() => {
      showFolderSelector.value = false;
      instructionsExit.value = false;
    }, 300);
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
    
    // Animate folder selector exit
    folderSelectorEnter.value = false;
    setTimeout(() => {
      showFolderSelector.value = false;
      instructionsExit.value = false;
      
      // If there's a query, animate results in
      if (query.value.trim()) {
        nextTick(() => {
          resultsEnter.value = true;
          // Ensure first item is visible after animation
          setTimeout(() => {
            if (searchResultsListRef.value) {
              searchResultsListRef.value.scrollSelectedIntoView();
            }
          }, 350);
        });
      }
    }, 300);
  }
};


onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
  
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
      <ModalHeader :icon="SearchSVG" :title="t('Search Files')"></ModalHeader>
      
      <!-- Content Container (Input + Results) -->
      <div class="vuefinder__search-modal__content">
        <!-- Search Bar -->
        <div class="vuefinder__search-modal__search-bar">
          <SearchInput
            ref="searchInputRef"
            v-model="query"
            :is-searching="isSearching"
            :disabled="showFolderSelector"
            @keydown="handleInputKeydown"
          />
          <SearchOptionsDropdown
            ref="searchOptionsDropdownRef"
            v-model:visible="showDropdown"
            v-model:type-filter="typeFilter"
            v-model:size-filter="sizeFilter"
            v-model:selected-option="selectedDropdownOption"
            :disabled="showFolderSelector"
          />
        </div>

        <!-- Search Options -->
        <div class="vuefinder__search-modal__options" @click.stop>
          <div class="vuefinder__search-modal__search-location">
            <button 
              @click.stop="openFolderSelector"
              class="vuefinder__search-modal__location-btn"
              :class="{ 'vuefinder__search-modal__location-btn--open': showFolderSelector }"
            >
              <FolderSVG class="vuefinder__search-modal__location-icon" />
              <span class="vuefinder__search-modal__location-text">{{ targetFolderEntry?.path || currentPath.path  }}</span>
              <svg class="vuefinder__search-modal__location-arrow" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
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

        <!-- Folder Selector (when showFolderSelector is true) -->
        <div v-if="showFolderSelector" class="vuefinder__search-modal__folder-selector" :class="{ 'vuefinder__search-modal__folder-selector--enter': folderSelectorEnter }">
          
          <div class="vuefinder__search-modal__folder-selector-content">
            <ModalTreeSelector
              v-model="targetFolderEntry"
              :show-pinned-folders="true"
              :current-path="currentPath"
              @update:modelValue="selectTargetFolder"
              @selectAndClose="handleFolderSelect"
            />
          </div>
        </div>

        <!-- Instructions (when blank and folder selector closed) -->
        <div v-if="!query.trim() && !showFolderSelector" class="vuefinder__search-modal__instructions" :class="{ 'vuefinder__search-modal__instructions--exit': instructionsExit }">
          <div class="vuefinder__search-modal__instructions-tips">
            <div class="vuefinder__search-modal__tip">
              <span class="vuefinder__search-modal__tip-key">↑↓</span>
              <span>{{ t('Navigate results') }}</span>
            </div>
            <div class="vuefinder__search-modal__tip">
              <span class="vuefinder__search-modal__tip-key">Enter</span>
              <span>{{ t('Open selected') }}</span>
            </div>
            <div class="vuefinder__search-modal__tip">
              <span class="vuefinder__search-modal__tip-key">Esc</span>
              <span>{{ t('Close search') }}</span>
            </div>
          </div>
        </div>

        <!-- Search Results (when query exists and folder selector closed) -->
        <SearchResultsList
          v-if="query.trim() && !showFolderSelector"
          ref="searchResultsListRef"
          :search-results="searchResults"
          :is-searching="isSearching"
          :selected-index="selectedIndex"
          :expanded-paths="expandedPaths"
          :active-dropdown="activeDropdown"
          :selected-item-dropdown-option="selectedItemDropdownOption"
          :results-enter="resultsEnter"
          @select-result-item="selectResultItem"
          @toggle-path-expansion="togglePathExpansion"
          @toggle-item-dropdown="toggleItemDropdown"
          @update:selected-item-dropdown-option="selectedItemDropdownOption = $event"
          @copy-path="copyItemPath"
          @open-containing-folder="openContainingFolder"
          @preview="previewItem"
        />
      </div>

    </div>
  </ModalLayout>
</template>
