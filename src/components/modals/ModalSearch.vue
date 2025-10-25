<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { inject } from 'vue';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import useDebouncedRef from '../../composables/useDebouncedRef';
import SearchSVG from '../../assets/icons/search.svg';
import LoadingSVG from '../../assets/icons/loading.svg';
import FileSVG from '../../assets/icons/file.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import GearSVG from '../../assets/icons/gear.svg';
import DotsSVG from '../../assets/icons/dots.svg';
import ModalLayout from './ModalLayout.vue';
import ModalHeader from './ModalHeader.vue';
import ModalPreview from './ModalPreview.vue';
import ModalTreeSelector from './ModalTreeSelector.vue';
import type { DirEntry } from '../../types';

defineOptions({ name: 'ModalSearch' });

const app = inject('ServiceContainer');
const { t } = app.i18n;
const fs = app.fs;

// Reactive state
const searchInput = ref<HTMLInputElement | null>(null);
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdownContent = ref<HTMLElement | null>(null);
const query = useDebouncedRef('', 300);
const searchResults = ref<DirEntry[]>([]);
const isSearching = ref(false);
const selectedIndex = ref(-1);

// Scrollable container ref
const scrollableContainer = ref<HTMLElement | null>(null);

// Floating UI cleanup functions
let cleanupDropdown: (() => void) | null = null;

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
  if (!storage) {
    return path.substring(0, maxLength - 3) + '...';
  }
  
  const pathAfterStorage = path.substring(storage.length); // Everything after "local://"
  const parts = pathAfterStorage.split('/').filter(part => part !== ''); // Remove empty parts
  
  if (parts.length === 0) {
    return storage;
  }
  
  const filename = parts[parts.length - 1];
  if (!filename) {
    return storage;
  }
  
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
    // Simple positioning with button element
    nextTick(() => {
      setupItemDropdownPositioning(itemPath, event.target as HTMLElement);
    });
  }
};

const closeAllDropdowns = () => {
  activeDropdown.value = null;
};

// Floating UI positioning functions
const setupDropdownPositioning = async () => {
  if (!dropdownBtn.value || !dropdownContent.value) return;
  
  // Calculate initial position immediately
  const { x, y } = await computePosition(dropdownBtn.value, dropdownContent.value, {
    placement: 'bottom-end',
    middleware: [
      offset(12),
      flip({ padding: 16 }),
      shift({ padding: 16 })
    ]
  });
  
  // Set initial position before dropdown becomes visible
  Object.assign(dropdownContent.value.style, {
    left: `${x}px`,
    top: `${y}px`,
    position: 'fixed',
    zIndex: '10001'
  });
  
  // Then setup auto-update for dynamic positioning
  cleanupDropdown = autoUpdate(dropdownBtn.value, dropdownContent.value, async () => {
    const { x: newX, y: newY } = await computePosition(dropdownBtn.value!, dropdownContent.value!, {
      placement: 'bottom-end',
      middleware: [
        offset(12),
        flip({ padding: 16 }),
        shift({ padding: 16 })
      ]
    });
    
    Object.assign(dropdownContent.value!.style, {
      left: `${newX}px`,
      top: `${newY}px`
    });
  });
};

const setupItemDropdownPositioning = (itemPath: string, buttonElement: HTMLElement) => {
  // Use nextTick instead of setTimeout for more immediate positioning
  nextTick(() => {
    const itemDropdownElement = document.querySelector(`[data-item-dropdown="${itemPath}"]`) as HTMLElement;
    
    if (!itemDropdownElement) return;
    
    const rect = buttonElement.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const dropdownWidth = isMobile ? 160 : 180; // Responsive width
    
    let leftPosition: string;
    
    if (isMobile) {
      const leftPos = rect.left - dropdownWidth - 4;
      leftPosition = `${Math.max(8, leftPos)}px`;
    } else {
      leftPosition = `${rect.right + 4}px`;
    }
    
    Object.assign(itemDropdownElement.style, {
      position: 'fixed',
      left: leftPosition,
      top: `${rect.top - 4}px`,
      zIndex: '10001'
    });
  });
};

// Handle dropdown option selection
const selectDropdownOption = (option: string) => {
  selectedDropdownOption.value = option;
};

const selectItemDropdownOption = (option: string) => {
  selectedItemDropdownOption.value = option;
};

// Enhanced keyboard navigation for dropdowns
const handleDropdownKeydown = (e: KeyboardEvent, dropdownType: 'main' | 'item') => {
  if (!showDropdown.value && dropdownType === 'main') return;
  if (!activeDropdown.value && dropdownType === 'item') return;
  
  const options = dropdownType === 'main' 
    ? ['type-all', 'type-files', 'type-folders', 'size-all', 'size-small', 'size-medium', 'size-large']
    : ['copy-path', 'open-folder', 'preview'];
  
  const currentSelection = dropdownType === 'main' 
    ? selectedDropdownOption.value 
    : selectedItemDropdownOption.value;
  
  const currentIndex = options.findIndex(opt => 
    dropdownType === 'main' 
      ? opt === currentSelection 
      : currentSelection?.includes(opt)
  );
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % options.length;
    if (dropdownType === 'main') {
      selectedDropdownOption.value = options[nextIndex] || null;
    } else {
      selectedItemDropdownOption.value = activeDropdown.value ? `${options[nextIndex] || ''}-${activeDropdown.value}` : null;
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    if (dropdownType === 'main') {
      selectedDropdownOption.value = options[prevIndex] || null;
    } else {
      selectedItemDropdownOption.value = activeDropdown.value ? `${options[prevIndex] || ''}-${activeDropdown.value}` : null;
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (dropdownType === 'main') {
      // Handle main dropdown option selection
      if (currentSelection?.startsWith('type-')) {
        typeFilter.value = currentSelection.split('-')[1] as 'all' | 'files' | 'folders';
      } else if (currentSelection?.startsWith('size-')) {
        sizeFilter.value = currentSelection.split('-')[1] as 'all' | 'small' | 'medium' | 'large';
      }
    } else {
      // Handle item dropdown option selection
      const item = searchResults.value.find(item => activeDropdown.value === item.path);
      if (item && currentSelection) {
        if (currentSelection.includes('copy-path')) {
          copyItemPath(item);
        } else if (currentSelection.includes('open-folder')) {
          openContainingFolder(item);
        } else if (currentSelection.includes('preview')) {
          previewItem(item);
        }
      }
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    if (dropdownType === 'main') {
      showDropdown.value = false;
    } else {
      closeAllDropdowns();
    }
    // Refocus input
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
  }
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

const copyItemPath = async (item: DirEntry) => {
  try {
    await navigator.clipboard.writeText(item.path);
    console.log('Path copied to clipboard:', item.path);
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

// Handle window resize
const handleResize = () => {
  // No need for JavaScript positioning anymore
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
  
  // Initialize selected state
  selectedDropdownOption.value = `type-${typeFilter.value}`;
  
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
});

// Advanced search functions
const toggleDropdown = async () => {
  // Don't toggle if folder selector is open
  if (showFolderSelector.value) {
    return;
  }
  
  if (!showDropdown.value) {
    // Opening dropdown - show first, then setup positioning
    showDropdown.value = true;
    await nextTick();
    await setupDropdownPositioning();
  } else {
    // Closing dropdown
    showDropdown.value = false;
    // Cleanup Floating UI when closing
    if (cleanupDropdown) {
      cleanupDropdown();
      cleanupDropdown = null;
    }
    // Refocus input when dropdown closes
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
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
  
  // Cleanup Floating UI
  if (cleanupDropdown) {
    cleanupDropdown();
  }
});

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  // Close search options dropdown
  if (showDropdown.value && dropdownBtn.value && dropdownContent.value) {
    const isClickOnButton = dropdownBtn.value.contains(target);
    const isClickOnDropdown = dropdownContent.value.contains(target);
    
    if (!isClickOnButton && !isClickOnDropdown) {
      showDropdown.value = false;
      
      // Cleanup Floating UI when closing
      if (cleanupDropdown) {
        cleanupDropdown();
        cleanupDropdown = null;
      }
      
      // Refocus input when dropdown closes
      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus();
        }
      });
    }
  }
  
  // Close item dropdowns
  if (activeDropdown.value && !target.closest('.vuefinder__search-modal__result-item')) {
    closeAllDropdowns();
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
          
          <!-- Dropdown Menu -->
          <Teleport to="body">
            <div 
              v-if="showDropdown" 
              ref="dropdownContent"
              class="vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible" 
              @click.stop
              @keydown="handleDropdownKeydown($event, 'main')"
              tabindex="-1"
            >
            <div class="vuefinder__search-modal__dropdown-content">
              <!-- Type Filter -->
              <div class="vuefinder__search-modal__dropdown-section">
                <div class="vuefinder__search-modal__dropdown-title">{{ t('Type') }}</div>
                <div class="vuefinder__search-modal__dropdown-options">
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'type-all' }"
                    @click.stop="selectDropdownOption('type-all')"
                  >
                    <input 
                      v-model="typeFilter" 
                      type="radio" 
                      value="all" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('All') }}</span>
                  </label>
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'type-files' }"
                    @click.stop="selectDropdownOption('type-files')"
                  >
                    <input 
                      v-model="typeFilter" 
                      type="radio" 
                      value="files" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Files') }}</span>
                  </label>
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'type-folders' }"
                    @click.stop="selectDropdownOption('type-folders')"
                  >
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
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'size-all' }"
                    @click.stop="selectDropdownOption('size-all')"
                  >
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="all" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('All') }}</span>
                  </label>
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'size-small' }"
                    @click.stop="selectDropdownOption('size-small')"
                  >
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="small" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Small') }}</span>
                  </label>
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'size-medium' }"
                    @click.stop="selectDropdownOption('size-medium')"
                  >
                    <input 
                      v-model="sizeFilter" 
                      type="radio" 
                      value="medium" 
                      class="vuefinder__search-modal__radio"
                      @click.stop
                    />
                    <span>{{ t('Medium') }}</span>
                  </label>
                  <label 
                    class="vuefinder__search-modal__dropdown-option" 
                    :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedDropdownOption === 'size-large' }"
                    @click.stop="selectDropdownOption('size-large')"
                  >
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
              <span class="vuefinder__search-modal__location-text">{{ targetFolderEntry?.path || currentPath?.value?.path }}</span>
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
                  <Teleport to="body">
                    <div 
                      v-if="activeDropdown === item.path"
                      :data-item-dropdown="item.path"
                      class="vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible"
                      @click.stop
                      @keydown="handleDropdownKeydown($event, 'item')"
                      tabindex="-1"
                    >
                    <div class="vuefinder__search-modal__item-dropdown-content">
                      <button 
                        class="vuefinder__search-modal__item-dropdown-option"
                        :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `copy-path-${item.path}` }"
                        @click="selectItemDropdownOption(`copy-path-${item.path}`); copyItemPath(item)"
                        @focus="selectItemDropdownOption(`copy-path-${item.path}`)"
                      >
                        <svg class="vuefinder__search-modal__item-dropdown-icon" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
                          <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
                        </svg>
                        <span>{{ t('Copy Path') }}</span>
                      </button>
                      <button 
                        class="vuefinder__search-modal__item-dropdown-option"
                        :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `open-folder-${item.path}` }"
                        @click="selectItemDropdownOption(`open-folder-${item.path}`); openContainingFolder(item)"
                        @focus="selectItemDropdownOption(`open-folder-${item.path}`)"
                      >
                        <FolderSVG class="vuefinder__search-modal__item-dropdown-icon" />
                        <span>{{ t('Open Containing Folder') }}</span>
                      </button>
                      <button 
                        class="vuefinder__search-modal__item-dropdown-option"
                        :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `preview-${item.path}` }"
                        @click="selectItemDropdownOption(`preview-${item.path}`); previewItem(item)"
                        @focus="selectItemDropdownOption(`preview-${item.path}`)"
                      >
                        <FileSVG class="vuefinder__search-modal__item-dropdown-icon" />
                        <span>{{ t('Preview') }}</span>
                      </button>
                    </div>
                  </div>
                  </Teleport>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </ModalLayout>
</template>
