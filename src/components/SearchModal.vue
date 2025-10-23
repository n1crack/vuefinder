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

// Advanced search state
const showDropdown = ref(false);
const showFolderSelector = ref(false);
const targetFolder = ref<string>('');
const targetFolderEntry = ref<DirEntry | null>(null);
const typeFilter = ref<'all' | 'files' | 'folders'>('all');
const sizeFilter = ref<'all' | 'small' | 'medium' | 'large'>('all');
const deepSearch = ref(false);

// Store subscriptions
const currentPath = useStore(fs.path);

// Computed values
const hasResults = computed(() => searchResults.value.length > 0);
const resultCount = computed(() => searchResults.value.length);

// Watch for query changes and trigger search
watch(query, async (newQuery) => {
  if (newQuery.trim()) {
    await performSearch(newQuery.trim());
    selectedIndex.value = 0;
  } else {
    searchResults.value = [];
    isSearching.value = false;
    selectedIndex.value = -1;
  }
});

// Perform search
const performSearch = async (searchQuery: string) => {
  if (!searchQuery) return;
  
  console.log('Starting search for:', searchQuery);
  isSearching.value = true;
  
  try {
    const storage = currentPath.value?.storage ?? 'local';
    
    // Build search parameters
    const searchParams: Record<string, string> = {
      q: 'search',
      storage,
      filter: searchQuery
    };
    
    // Add advanced search parameters
    if (targetFolder.value) {
      searchParams.path = targetFolder.value;
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
        console.log('Search success, results:', data.files?.length || 0);
        console.log('Modal visible before setting results:', app.modal.visible);
        searchResults.value = data.files || [];
        isSearching.value = false;
        console.log('Modal visible after setting results:', app.modal.visible);
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
        storage: currentPath.value?.storage ?? 'local',
        path: item.path
      }
    });
  } else {
    app.modal.open(ModalPreview, {
      storage: currentPath.value?.storage ?? 'local',
      item: item
    });
  }
  app.modal.close();
};

// Handle keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  // Only handle keyboard events if the modal is visible and focused
  if (!app.modal.visible) return;
  
  // Don't handle events if we're currently searching
  if (isSearching.value) return;
  
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    app.modal.close();
    return;
  }
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value < searchResults.value.length - 1) {
      selectedIndex.value++;
    }
    return;
  }
  
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    e.stopPropagation();
    if (selectedIndex.value > 0) {
      selectedIndex.value--;
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
};

// Event listeners
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
});

// Advanced search functions
const toggleDropdown = () => {
  console.log('Toggle dropdown clicked, current state:', showDropdown.value);
  showDropdown.value = !showDropdown.value;
  console.log('New dropdown state:', showDropdown.value);
  
  if (showDropdown.value && dropdownBtn.value) {
    const rect = dropdownBtn.value.getBoundingClientRect();
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
      // Mobile: up-left positioning
      dropdownPosition.value = {
        top: rect.top + window.scrollY - 4,
        left: rect.left + window.scrollX - 200 // 200px is dropdown width
      };
    } else {
      // Desktop: left-down positioning
      dropdownPosition.value = {
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 200 // 200px is dropdown width
      };
    }
  }
};

// Open folder selector modal
const openFolderSelector = () => {
  console.log('Open folder selector clicked');
  showFolderSelector.value = !showFolderSelector.value;
};

// Simple function to split storage and path (like ModalTransfer)
const getTargetParts = () => {
  const path = targetFolder.value;
  if (!path) return { storage: 'local', path: '' };
  
  // For storage roots like "local://", just return the storage name
  if (path.endsWith('://')) {
    return { storage: path.replace('://', ''), path: '' };
  }
  
  // Split storage and path
  const parts = path.split('://');
  return { 
    storage: parts[0] || 'local', 
    path: parts[1] || '' 
  };
};

const selectTargetFolder = (folder: DirEntry | null) => {
  if (folder) {
    targetFolderEntry.value = folder;
    targetFolder.value = folder.path;
  }
};

// Handle folder selection and close selector
const handleFolderSelect = (entry: DirEntry) => {
  console.log('Folder selected:', entry);
  selectTargetFolder(entry);
  showFolderSelector.value = false;
};

// Cancel folder selection
const cancelFolderSelect = () => {
  showFolderSelector.value = false;
};

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
});

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (showDropdown.value && dropdownBtn.value && !dropdownBtn.value.contains(event.target as Node)) {
    showDropdown.value = false;
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
              class="vuefinder__search-modal__input"
              @keydown.stop
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
            :title="t('Search Options')"
          >
            <GearSVG class="vuefinder__search-modal__dropdown-icon" />
          </button>
        </div>

        <!-- Dropdown Menu (Teleported outside modal) -->
        <Teleport to="body">
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
        </Teleport>

        <!-- Search Options -->
        <div class="vuefinder__search-modal__options" @click.stop>
          <div class="vuefinder__search-modal__search-in">
            <span class="vuefinder__search-modal__search-in-label">{{ t('Search in:') }}</span>
            <button 
              @click.stop="openFolderSelector"
              class="vuefinder__search-modal__path-btn"
            >
              <span v-if="!targetFolder" class="vuefinder__search-modal__path-text">{{ t('All folders') }}</span>
              <span v-else class="vuefinder__search-modal__path-text">{{ targetFolder }}</span>
            </button>
          </div>
          <label class="vuefinder__search-modal__subfolders" @click.stop>
            <input 
              v-model="deepSearch"
              type="checkbox"
              class="vuefinder__search-modal__checkbox"
              @click.stop
            />
            <span>{{ t('with subfolders') }}</span>
          </label>
        </div>

        <!-- Folder Selector (when showFolderSelector is true) -->
        <div v-if="showFolderSelector" class="vuefinder__search-modal__folder-selector">
          <div class="vuefinder__search-modal__folder-selector-header">
            <h3 class="vuefinder__search-modal__folder-selector-title">{{ t('Search in folder') }}</h3>
            <button 
              @click="cancelFolderSelect"
              class="vuefinder__search-modal__folder-selector-close"
            >
              ×
            </button>
          </div>
          
          <div class="vuefinder__search-modal__folder-selector-content">
            <ModalTreeSelector
              v-model="targetFolderEntry"
              :show-pinned-folders="true"
              @update:modelValue="selectTargetFolder"
              @selectAndClose="handleFolderSelect"
            />
          </div>
          
          <div class="vuefinder__search-modal__folder-selector-footer">
            <button 
              @click="targetFolderEntry && handleFolderSelect(targetFolderEntry)"
              :disabled="!targetFolderEntry"
              class="vuefinder__search-modal__folder-selector-select"
            >
              {{ t('Select') }}
            </button>
          </div>
        </div>

        <!-- Instructions (when blank and folder selector closed) -->
        <div v-if="!query.trim() && !showFolderSelector" class="vuefinder__search-modal__instructions">
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
        <div v-if="query.trim() && !showFolderSelector" class="vuefinder__search-modal__results">
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
            
            <div class="vuefinder__search-modal__results-items">
              <div
                v-for="(item, index) in searchResults"
                :key="item.path"
                @click="handleItemClick(item)"
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
                  <div class="vuefinder__search-modal__result-path">
                    {{ item.path }}
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
