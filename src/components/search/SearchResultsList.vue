<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import LoadingSVG from '../../assets/icons/loading.svg';
import SearchResultItem from './SearchResultItem.vue';
import type { DirEntry } from '../../types.ts';

defineOptions({ name: 'SearchResultsList' });

interface Props {
  searchResults: DirEntry[];
  isSearching: boolean;
  selectedIndex: number;
  expandedPaths: Set<string>;
  activeDropdown: string | null;
  selectedItemDropdownOption: string | null;
  resultsEnter: boolean;
}

interface Emits {
  (e: 'selectResultItem', index: number): void;
  (e: 'selectResultItemWithDropdown', index: number): void;
  (e: 'togglePathExpansion', path: string): void;
  (e: 'toggleItemDropdown', path: string, event: MouseEvent): void;
  (e: 'update:selectedItemDropdownOption', value: string | null): void;
  (e: 'copyPath', item: DirEntry): void;
  (e: 'openContainingFolder', item: DirEntry): void;
  (e: 'preview', item: DirEntry): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const app = inject('ServiceContainer');
const { t } = app.i18n;

// Scrollable container ref
const scrollableContainer = ref<HTMLElement | null>(null);

// Computed values
const hasResults = computed(() => props.searchResults.length > 0);
const resultCount = computed(() => props.searchResults.length);

// Scroll selected item into view
const scrollSelectedIntoView = () => {
  if (props.selectedIndex >= 0 && scrollableContainer.value) {
    const resultItems = scrollableContainer.value.querySelectorAll('.vuefinder__search-modal__result-item');
    const selectedItem = resultItems[props.selectedIndex] as HTMLElement;
    
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }
};

defineExpose({
  scrollSelectedIntoView
});
</script>

<template>
  <div class="vuefinder__search-modal__results" :class="{ 'vuefinder__search-modal__results--enter': resultsEnter }">
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
          <SearchResultItem
            v-for="(item, index) in searchResults"
            :key="item.path"
            :item="item"
            :index="index"
            :selected-index="selectedIndex"
            :expanded-paths="expandedPaths"
            :active-dropdown="activeDropdown"
            :selected-item-dropdown-option="selectedItemDropdownOption"
            @select="emit('selectResultItem', $event)"
            @select-with-dropdown="emit('selectResultItemWithDropdown', $event)"
            @toggle-path-expansion="emit('togglePathExpansion', $event)"
            @toggle-item-dropdown="(path, event) => emit('toggleItemDropdown', path, event)"
            @update:selected-item-dropdown-option="emit('update:selectedItemDropdownOption', $event)"
            @copy-path="emit('copyPath', $event)"
            @open-containing-folder="emit('openContainingFolder', $event)"
            @preview="emit('preview', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
