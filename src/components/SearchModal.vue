<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { inject } from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef';
import SearchSVG from '../assets/icons/search.svg';
import LoadingSVG from '../assets/icons/loading.svg';
import FileSVG from '../assets/icons/file.svg';
import FolderSVG from '../assets/icons/folder.svg';
import GearSVG from '../assets/icons/gear.svg';
import DotsSVG from '../assets/icons/dots.svg';
import ModalLayout from './modals/ModalLayout.vue';
import ModalHeader from './modals/ModalHeader.vue';
import ModalPreview from './modals/ModalPreview.vue';
import ModalTreeSelector from './modals/ModalTreeSelector.vue';
import type { DirEntry } from '../types';

const app = inject('ServiceContainer');
const { t } = app.i18n;
const fs = app.fs;

// Reactive state
const searchInput = ref<HTMLInputElement | null>(null);
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdownPosition = ref({ top: 0, left: 0 });
const query = useDebouncedRef('', 300);
const searchResults = ref<DirEntry[]>([]);
const isSearching = ref(false);
const selectedIndex = ref(-1);

// Scrollable container ref
const scrollableContainer = ref<HTMLElement | null>(null);

// Advanced search state
const showDropdown = ref(false);
const showFolderSelector = ref(false);
const targetFolderEntry = ref<DirEntry | null>(null);
const typeFilter = ref<'all' | 'files' | 'folders'>('all');
const sizeFilter = ref<'all' | 'small' | 'medium' | 'large'>('all');
const deepSearch = ref(false);

// Animation states
const folderSelectorEnter = ref(false);
const instructionsExit = ref(false);
const resultsEnter = ref(false);

// Path expansion and dropdown states
const expandedPaths = ref<Set<string>>(new Set());
const activeDropdown = ref<string | null>(null);
const dropdownPositions = ref<Record<string, { top: number; left: number }>>({});

// Store subscriptions
const currentPath = useStore(fs.path);

// Computed values
const hasResults = computed(() => searchResults.value.length > 0);
const resultCount = computed(() => searchResults.value.length);

// Utility functions
const shortenPath = (path: string, maxLength: number = 30): string => {
  if (path.length <= maxLength) return path;
  
  // Handle storage:// format properly
  const storageMatch = path.match(/^([^/]+:\/\/)/);
  if (!storageMatch) {
    // Fallback for paths without storage:// format
    return path.substring(0, maxLength - 3) + '...';
  }
  
  const storage = storageMatch[1]; // e.g., "local://"
  const pathAfterStorage = path.substring(storage.length); // Everything after "local://"
  const parts = pathAfterStorage.split('/').filter(part => part !== ''); // Remove empty parts
  
  if (parts.length === 0) {
    return storage;
  }
  
  const filename = parts[parts.length - 1];
  
  if (parts.length === 1) {
    // Simple case: storage://filename
    if (storage.length + filename.length > maxLength) {
      const availableSpace = maxLength - storage.length - 3; // -3 for "..."
      if (availableSpace > 0) {
        const keepStart = Math.floor(availableSpace / 2);
        const keepEnd = Math.floor(availableSpace / 2);
        const truncatedFilename = filename.substring(0, keepStart) + '...' + filename.substring(filename.length - keepEnd);
        return `${storage}${truncatedFilename}`;
      } else {
        return path.substring(0, maxLength - 3) + '...';
      }
    }
    return path;
  }
  
  // Complex case: storage://folder1/folder2/.../filename
  const folders = parts.slice(0, -1); // Get folders between storage and filename
  
  // Always show folders with ... when there are folders
  return `${storage}.../${filename}`;
};

const togglePathExpansion = (path: string) => {
  if (expandedPaths.value.has(path)) {
    expandedPaths.value.delete(path);
  } else {
    expandedPaths.value.add(path);
  }
};

const isPathExpanded = (path: string): boolean => {
  return expandedPaths.value.has(path);
};

const toggleItemDropdown = (itemPath: string, event: MouseEvent) => {
  event.stopPropagation();
  
  if (activeDropdown.value === itemPath) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = itemPath;
    
    // Calculate dropdown position
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    dropdownPositions.value[itemPath] = {
      top: rect.bottom + window.scrollY + 4,
      left: rect.right + window.scrollX - 150 // Dropdown width
    };
  }
};

const closeAllDropdowns = () => {
  activeDropdown.value = null;
};

// Dropdown action handlers
const openContainingFolder = (item: DirEntry) => {
  const parentPath = item.path.split('/').slice(0, -1).join('/') || '/';
  app.emitter.emit('vf-fetch', {
    params: {
      q: 'index',
      storage: currentPath?.value?.storage ?? 'local',
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
        setTimeout(() => scrollSelectedIntoView(), 100);
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
      setTimeout(() => scrollSelectedIntoView(), 100);
    });
  }
});

// Perform search
const performSearch = async (searchQuery: string) => {
  if (!searchQuery) return;
  
  console.log('Starting search for:', searchQuery);
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
      onError: (error: unknown) => {
        console.log('Search error:', error);
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
const handleItemClick = (item: DirEntry) => {
  if (item.type === 'dir') {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'index',
        storage: currentPath?.value?.storage ?? 'local',
        path: item.path
      }
    });
  } else {
    app.modal.open(ModalPreview, {
      storage: currentPath?.value?.storage ?? 'local',
      item: item
    });
  }
  app.modal.close();
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
      nextTick(() => scrollSelectedIntoView());
    }
    return;
  }
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
      nextTick(() => scrollSelectedIntoView());
    }
    return;
  }
  
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
      const selectedItem = searchResults.value[selectedIndex.value];
      if (selectedItem) {
        handleItemClick(selectedItem);
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
      nextTick(() => scrollSelectedIntoView());
    }
    return;
  }
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
      nextTick(() => scrollSelectedIntoView());
    }
    return;
  }
  
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value >= 0 && selectedIndex.value < searchResults.value.length) {
      const selectedItem = searchResults.value[selectedIndex.value];
      if (selectedItem) {
        handleItemClick(selectedItem);
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

// Handle window resize to recalculate dropdown position
const handleResize = () => {
  if (showDropdown.value && dropdownBtn.value) {
    toggleDropdown(); // Close and reopen to recalculate position
    nextTick(() => {
      showDropdown.value = true;
      toggleDropdown(); // This will recalculate the position
    });
  }
};

// Scroll selected item into view
const scrollSelectedIntoView = () => {
  if (selectedIndex.value >= 0 && scrollableContainer.value) {
    const resultItems = scrollableContainer.value.querySelectorAll('.vuefinder__search-modal__result-item');
    const selectedItem = resultItems[selectedIndex.value] as HTMLElement;
    
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }
};

// Event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
});

// Advanced search functions
const toggleDropdown = () => {
  // Don't toggle if folder selector is open
  if (showFolderSelector.value) {
    return;
  }
  
  showDropdown.value = !showDropdown.value;
  
  // Refocus input when dropdown closes
  if (!showDropdown.value) {
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
  }
  
  if (showDropdown.value && dropdownBtn.value) {
    const rect = dropdownBtn.value.getBoundingClientRect();
    const isMobile = window.innerWidth <= 767;
    const dropdownWidth = isMobile ? 160 : 180;
    const dropdownHeight = isMobile ? 185 : 169; // Estimated height
    
    if (isMobile) {
      // Mobile: position dropdown above button, aligned to right edge
      const leftPosition = rect.right + window.scrollX - dropdownWidth; // Align right edge with button's left edge
      const topPosition = rect.top + window.scrollY - dropdownHeight; // Position above button
      
      dropdownPosition.value = {
        top: Math.max(8, topPosition),
        left: Math.max(8, leftPosition)
      };
    } else {
      // Desktop: position below the button, aligned to the right
      dropdownPosition.value = {
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - dropdownWidth
      };
    }
  }
};

// Open folder selector modal
const openFolderSelector = () => {
  console.log('Open folder selector clicked');
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
    console.log('Folder selected for search:', entry);
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
          setTimeout(() => scrollSelectedIntoView(), 350);
        });
      }
    }, 300);
  }
};


onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  // Close search options dropdown
  if (showDropdown.value && dropdownBtn.value && !dropdownBtn.value.contains(event.target as Node)) {
    showDropdown.value = false;
    
    // Refocus input when dropdown closes
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
  }
  
  // Close item dropdowns
  const target = event.target as HTMLElement;
  if (activeDropdown.value && !target.closest('.vuefinder__search-modal__result-item')) {
    closeAllDropdowns();
  }
};
</script>

<template>
  <ModalLayout class="vuefinder__search-modal-layout">
    <div class="vuefinder__search-modal" @click.stop>
      <ModalHeader :icon="SearchSVG" :title="t('Search Files')"></ModalHeader>
      
      <!-- Content Container (Input + Results) -->
      <div class="vuefinder__search-modal__content">
        <!-- Search Bar -->
        <div class="vuefinder__search-modal__search-bar" @click.stop>
          <div class="vuefinder__search-modal__search-input">
            <SearchSVG class="vuefinder__search-modal__search-icon" />
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              :placeholder="t('Search files and folders...')"
              :disabled="showFolderSelector"
              class="vuefinder__search-modal__input"
              @keydown="handleInputKeydown"
              @keyup.stop
              @input.stop
            />
            <div v-if="isSearching" class="vuefinder__search-modal__loading">
              <LoadingSVG class="vuefinder__search-modal__loading-icon" />
            </div>
          </div>
          <button 
            ref="dropdownBtn"
            @click.stop="toggleDropdown"
            class="vuefinder__search-modal__dropdown-btn"
            :class="{ 'vuefinder__search-modal__dropdown-btn--active': showDropdown }"
            :disabled="showFolderSelector"
            :title="t('Search Options')"
          >
            <GearSVG class="vuefinder__search-modal__dropdown-icon" />
          </button>
        </div>

        <!-- Dropdown Menu (Teleported outside modal) -->
     
          <div 
            v-if="showDropdown" 
            class="vuefinder__search-modal__dropdown" 
            :style="{ 
              top: dropdownPosition.top + 'px', 
              left: dropdownPosition.left + 'px' 
            }"
            @click.stop
          >
            <div class="vuefinder__search-modal__dropdown-content">
              <!-- Type Filter -->
              <div class="vuefinder__search-modal__dropdown-section">
                <div class="vuefinder__search-modal__dropdown-title">{{ t('Type') }}</div>
                <div class="vuefinder__search-modal__dropdown-options">
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="typeFilter" 
                      type="radio" 
                      value="all" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('All') }}</span>
                  </label>
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="typeFilter" 
                      type="radio" 
                      value="files" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Files') }}</span>
                  </label>
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="typeFilter" 
                      type="radio" 
                      value="folders" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Folders') }}</span>
                  </label>
                </div>
              </div>

              <!-- Size Filter -->
              <div class="vuefinder__search-modal__dropdown-section">
                <div class="vuefinder__search-modal__dropdown-title">{{ t('Size') }}</div>
                <div class="vuefinder__search-modal__dropdown-options">
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="all" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('All') }}</span>
                  </label>
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="small" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Small') }}</span>
                  </label>
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="medium" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Medium') }}</span>
                  </label>
                  <label class="vuefinder__search-modal__dropdown-option" @click.stop>
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="large" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Large') }}</span>
                  </label>
                </div>
              </div>
            </div>
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
              <span class="vuefinder__search-modal__location-text">{{ targetFolderEntry?.path || currentPath.path }}</span>
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
        <div v-if="query.trim() && !showFolderSelector" class="vuefinder__search-modal__results" :class="{ 'vuefinder__search-modal__results--enter': resultsEnter }">
          <div v-if="isSearching" class="vuefinder__search-modal__searching">
            <div class="vuefinder__search-modal__loading-icon">
              <LoadingSVG class="vuefinder__search-modal__loading-icon" />
            </div>
            <span>{{ t('Searching...') }}</span>
          </div>
          
          <div v-else-if="!hasResults" class="vuefinder__search-modal__no-results">
            <span>{{ t('No results found') }}</span>
          </div>
          
          <div v-else class="vuefinder__search-modal__results-list">
            <div class="vuefinder__search-modal__results-header">
              <span>{{ t('Found %s results', resultCount) }}</span>
            </div>
            
            <div ref="scrollableContainer" class="vuefinder__search-modal__results-scrollable" >
              <div class="vuefinder__search-modal__results-items">
                <div
                  v-for="(item, index) in searchResults"
                  :key="item.path"
                  class="vuefinder__search-modal__result-item"
                  :class="{ 'vuefinder__search-modal__result-item--selected': index === selectedIndex }"
                  :title="item.basename"
                >
                  <div class="vuefinder__search-modal__result-icon">
                    <FolderSVG v-if="item.type === 'dir'" />
                    <FileSVG v-else />
                  </div>
                  <div class="vuefinder__search-modal__result-content">
                    <div class="vuefinder__search-modal__result-name">
                      {{ item.basename }}
                    </div>
                    <div 
                      class="vuefinder__search-modal__result-path"
                      @click.stop="togglePathExpansion(item.path)"
                      :title="item.path"
                    >
                      {{ isPathExpanded(item.path) ? item.path : shortenPath(item.path) }}
                    </div>
                  </div>
                  <button
                    class="vuefinder__search-modal__result-actions"
                    @click="toggleItemDropdown(item.path, $event)"
                    :title="t('More actions')"
                  >
                    <DotsSVG class="vuefinder__search-modal__result-actions-icon" />
                  </button>
                  
                  <!-- Item Dropdown Menu -->
                  <div 
                    v-if="activeDropdown === item.path"
                    class="vuefinder__search-modal__item-dropdown"
                    :style="dropdownPositions[item.path]"
                    @click.stop
                  >
                    <div class="vuefinder__search-modal__item-dropdown-content">
                      <button 
                        class="vuefinder__search-modal__item-dropdown-option"
                        @click="openContainingFolder(item)"
                      >
                        <FolderSVG class="vuefinder__search-modal__item-dropdown-icon" />
                        <span>{{ t('Open Containing Folder') }}</span>
                      </button>
                      <button 
                        class="vuefinder__search-modal__item-dropdown-option"
                        @click="previewItem(item)"
                      >
                        <FileSVG class="vuefinder__search-modal__item-dropdown-icon" />
                        <span>{{ t('Preview') }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </ModalLayout>
</template>
