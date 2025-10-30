<script setup lang="ts">
import { ref, inject, computed, useTemplateRef, watch, onMounted, onUnmounted } from 'vue';
import { useApp } from '../../composables/useApp';
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

const app = useApp();
const { t } = app.i18n;

// Template refs
const scrollableContainer = useTemplateRef<HTMLElement>('scrollableContainer');

// Computed values
const hasResults = computed(() => props.searchResults.length > 0);
const resultCount = computed(() => props.searchResults.length);

// Virtual scrolling setup
const ITEM_HEIGHT = 60; // Fixed height for each search result item
const OVERSCAN = 5; // Extra items to render above and below visible area

const scrollTop = ref(0);
const containerHeight = ref(600);

// Computed properties for virtual scrolling
const totalHeight = computed(() => props.searchResults.length * ITEM_HEIGHT);

const visibleRange = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - OVERSCAN);
  const end = Math.min(
    props.searchResults.length,
    Math.ceil((scrollTop.value + containerHeight.value) / ITEM_HEIGHT) + OVERSCAN
  );
  return { start, end };
});

const visibleItems = computed(() => {
  const { start, end } = visibleRange.value;
  return props.searchResults.slice(start, end).map((item, index) => ({
    item,
    index: start + index,
    top: (start + index) * ITEM_HEIGHT,
  }));
});

// Scroll handler
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
};

// Update container height
const updateContainerHeight = () => {
  if (scrollableContainer.value) {
    containerHeight.value = scrollableContainer.value.clientHeight;
  }
};

// Scroll selected item into view
const scrollSelectedIntoView = () => {
  if (props.selectedIndex >= 0 && scrollableContainer.value) {
    const selectedItemTop = props.selectedIndex * ITEM_HEIGHT;
    const selectedItemBottom = selectedItemTop + ITEM_HEIGHT;
    const containerScrollTop = scrollableContainer.value.scrollTop;
    const containerHeight = scrollableContainer.value.clientHeight;
    const containerBottom = containerScrollTop + containerHeight;

    let newScrollTop = containerScrollTop;

    // If selected item is above visible area, scroll to show it at top
    if (selectedItemTop < containerScrollTop) {
      newScrollTop = selectedItemTop;
    }
    // If selected item is below visible area, scroll to show it at bottom
    else if (selectedItemBottom > containerBottom) {
      newScrollTop = selectedItemBottom - containerHeight;
    }

    // Only scroll if position needs to change
    if (newScrollTop !== containerScrollTop) {
      scrollableContainer.value.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    }
  }
};

// Reset scroll to top
const resetScroll = () => {
  if (scrollableContainer.value) {
    scrollableContainer.value.scrollTop = 0;
    scrollTop.value = 0;
  }
};

// Lifecycle
onMounted(() => {
  updateContainerHeight();
  window.addEventListener('resize', updateContainerHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerHeight);
});

// Watch for container changes
watch(
  () => scrollableContainer.value,
  () => {
    updateContainerHeight();
  }
);

defineExpose({
  scrollSelectedIntoView,
  resetScroll,
  getContainerHeight: () => containerHeight.value,
  scrollTop: () => scrollTop.value,
});
</script>

<template>
  <div
    class="vuefinder__search-modal__results"
    :class="{ 'vuefinder__search-modal__results--enter': resultsEnter }"
  >
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

      <div
        ref="scrollableContainer"
        class="vuefinder__search-modal__results-scrollable"
        @scroll="handleScroll"
      >
        <div
          class="vuefinder__search-modal__results-items"
          :style="{ height: `${totalHeight}px`, position: 'relative' }"
        >
          <div
            v-for="visibleItem in visibleItems"
            :key="visibleItem.item.path"
            :style="{
              position: 'absolute',
              top: `${visibleItem.top}px`,
              left: '0',
              width: '100%',
              height: `${ITEM_HEIGHT}px`,
            }"
          >
            <SearchResultItem
              :item="visibleItem.item"
              :index="visibleItem.index"
              :selected-index="selectedIndex"
              :expanded-paths="expandedPaths"
              :active-dropdown="activeDropdown"
              :selected-item-dropdown-option="selectedItemDropdownOption"
              @select="emit('selectResultItem', $event)"
              @select-with-dropdown="emit('selectResultItemWithDropdown', $event)"
              @toggle-path-expansion="emit('togglePathExpansion', $event)"
              @toggle-item-dropdown="(path, event) => emit('toggleItemDropdown', path, event)"
              @update:selected-item-dropdown-option="
                emit('update:selectedItemDropdownOption', $event)
              "
              @copy-path="emit('copyPath', $event)"
              @open-containing-folder="emit('openContainingFolder', $event)"
              @preview="emit('preview', $event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
