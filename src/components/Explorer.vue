<script setup lang="ts">
import { ref, onMounted, useTemplateRef, computed, watch, shallowRef } from 'vue';
import { useStore } from '@nanostores/vue';
import SelectionArea, { type SelectionEvent } from '@viselect/vanilla';
import DragItem from './DragItem.vue';
import FileRow from './FileRow.vue';
import ExplorerHeader from './ExplorerHeader.vue';
import useVirtualColumns from '../composables/useVirtualColumns';
import { useSelection } from '../composables/useSelection';
import { useDragNDrop } from '../composables/useDragNDrop';
import { useApp } from '../composables/useApp';
import { useItemEvents } from '../composables/useItemEvents';
import { useScrollSetup } from '../composables/useScrollSetup';
import { useLazyLoad } from '../composables/useLazyLoad';
import type { DirEntry, ItemDclickEvent } from '../types';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';
import type { SortState } from '../stores/files';

const props = defineProps<{
  onFileDclick?: (event: ItemDclickEvent) => void;
  onFolderDclick?: (event: ItemDclickEvent) => void;
}>();

const app = useApp();
const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);
const dragImage = useTemplateRef<HTMLElement>('dragImage');
const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const scrollContent = useTemplateRef<HTMLElement>('scrollContent');

const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);
const fsSortState: StoreValue<SortState> = useStore(fs.sort);

// Make files store reactive
const sortedFiles: StoreValue<DirEntry[]> = useStore(fs.sortedFiles);
const selectedKeys: StoreValue<Set<string>> = useStore(fs.selectedKeys);
const loading: StoreValue<boolean> = useStore(fs.loading);

// Function for isSelected
const isSelected = (path: string) => {
  return selectedKeys.value?.has(path as never) ?? false;
};

const rowHeight = computed(() => {
  const view = configState.value.view;
  const compact = configState.value.compactListView;
  return view === 'grid' ? 88 : compact ? 24 : 50;
});

const { t } = app.i18n;

const {
  itemsPerRow,
  totalHeight,
  visibleRows,
  handleScroll,
  getRowItems,
  getItemsInRange,
  getItemPosition,
  updateItemsPerRow,
} = useVirtualColumns<DirEntry>(
  computed<DirEntry[]>(() => {
    return sortedFiles.value ?? [];
  }),
  {
    scrollContainer,
    itemWidth: 104,
    rowHeight,
    overscan: 2,
    containerPadding: 0,
    lockItemsPerRow: computed(() => configState.value.view === 'list'),
  }
);

const { osInstance } = useScrollSetup(scrollContainer, handleScroll);

const { explorerId, isDragging, initializeSelectionArea, updateSelectionArea, handleContentClick } =
  useSelection<DirEntry>({
    itemsPerRow,
    totalHeight,
    getItemPosition,
    getItemsInRange,
    getKey: (f) => f.path,
    selectionObject,
    rowHeight,
    itemWidth: 104,
    osInstance,
  });

const currentDragKey = ref<string | null>(null);

const isDraggingItem = (key?: string | null) => {
  if (!key || !currentDragKey.value) return false;
  const draggingSelected = selectedKeys.value?.has(currentDragKey.value as never) ?? false;
  return (
    isDragging.value &&
    (draggingSelected
      ? (selectedKeys.value?.has(key as never) ?? false)
      : key === currentDragKey.value)
  );
};

watch(
  () => config.get('view'),
  (newView) => {
    if (newView === 'list') {
      itemsPerRow.value = 1;
    } else {
      updateItemsPerRow();
    }
  },
  { immediate: true }
);

watch(itemsPerRow, (n) => {
  if (config.get('view') === 'list' && n !== 1) {
    itemsPerRow.value = 1;
  }
});

const getItemAtRow = (rowIndex: number): DirEntry | undefined => {
  return sortedFiles.value?.[rowIndex];
};

useLazyLoad(scrollContainer, app);

const { handleItemClick, handleItemDblClick, handleItemContextMenu, handleContentContextMenu } =
  useItemEvents(
    app,
    explorerId,
    sortedFiles,
    selectedKeys,
    selectionObject,
    props.onFileDclick,
    props.onFolderDclick
  );

onMounted(() => {
  // Wait for OverlayScrollbars to initialize before initializing SelectionArea
  // This ensures the viewport element is available for boundaries
  const initSelection = () => {
    if (!selectionObject.value) {
      initializeSelectionArea();
    }

    if (selectionObject.value) {
      selectionObject.value.on('beforestart', ({ event }: SelectionEvent) => {
        const blankArea = event?.target === scrollContent.value;
        if (!event?.metaKey && !event?.ctrlKey && !event?.altKey && !blankArea) {
          return false;
        }
      });
    }
  };

  // If osInstance is already available, initialize immediately
  // Otherwise wait a bit for OverlayScrollbars to initialize
  if (osInstance.value) {
    initSelection();
  } else {
    // Wait for OverlayScrollbars to initialize
    const checkInterval = setInterval(() => {
      if (osInstance.value) {
        clearInterval(checkInterval);
        initSelection();
      }
    }, 50);

    // Fallback: initialize after 500ms even if osInstance is not ready
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!selectionObject.value) {
        initSelection();
      }
    }, 500);
  }

  // Watch for filter changes and update selection area
  watch(() => [app.selectionFilterType, app.selectionFilterMimeIncludes], updateSelectionArea, {
    deep: true,
  });
});

const handleItemDragStart = (event: DragEvent) => {
  // Check if move feature is enabled
  const features = app.features as Record<string, boolean>;
  if (!(features?.move ?? false)) {
    event.preventDefault();
    return false;
  }

  if (event.altKey || event.ctrlKey || event.metaKey) {
    event.preventDefault();
    return false;
  }

  isDragging.value = true;

  const el = (event.target as Element | null)?.closest(
    '.file-item-' + explorerId
  ) as HTMLElement | null;
  currentDragKey.value = el ? String(el.dataset.key) : null;

  if (event.dataTransfer && currentDragKey.value) {
    event.dataTransfer.setDragImage(dragImage.value as Element, 0, 15);
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.dropEffect = 'copy';

    // If the dragged item is not selected, only drag that item
    // If it's selected, drag all selected items
    const itemsToDrag = selectedKeys.value?.has(currentDragKey.value)
      ? Array.from(selectedKeys.value)
      : [currentDragKey.value];
    event.dataTransfer.setData('items', JSON.stringify(itemsToDrag));
    fs.setDraggedItem(currentDragKey.value);
  }
};

const handleItemDragEnd = () => {
  currentDragKey.value = null;
};

// Long-press support for content area (blank space)
let contentLongPressTimeout: ReturnType<typeof setTimeout> | null = null;
let contentTouchStartEvent: TouchEvent | null = null;

const handleContentTouchStart = (event: TouchEvent) => {
  // Only handle if touching the content area itself, not a file item
  if ((event.target as HTMLElement)?.closest('.file-item-' + explorerId)) {
    return;
  }

  contentTouchStartEvent = event;

  if (contentLongPressTimeout) {
    clearTimeout(contentLongPressTimeout);
  }

  contentLongPressTimeout = setTimeout(() => {
    if (contentTouchStartEvent) {
      if (contentTouchStartEvent.cancelable) {
        contentTouchStartEvent.preventDefault();
      }
      contentTouchStartEvent.stopPropagation();
      handleContentContextMenu(contentTouchStartEvent);
    }
    contentTouchStartEvent = null;
    contentLongPressTimeout = null;
  }, 500);
};

const handleContentTouchEnd = (event: TouchEvent) => {
  if (contentLongPressTimeout) {
    clearTimeout(contentLongPressTimeout);
    contentLongPressTimeout = null;
  }
  contentTouchStartEvent = null;
};

const handleContentTouchMove = (event: TouchEvent) => {
  if (!contentTouchStartEvent) return;

  const startTouch = contentTouchStartEvent.touches[0] || contentTouchStartEvent.changedTouches[0];
  const currentTouch = event.touches[0] || event.changedTouches[0];

  if (startTouch && currentTouch) {
    const deltaX = Math.abs(currentTouch.clientX - startTouch.clientX);
    const deltaY = Math.abs(currentTouch.clientY - startTouch.clientY);

    if (deltaX > 15 || deltaY > 15) {
      if (contentLongPressTimeout) {
        clearTimeout(contentLongPressTimeout);
        contentLongPressTimeout = null;
      }
      contentTouchStartEvent = null;
    }
  }
};
</script>

<template>
  <div class="vuefinder__explorer__container">
    <!-- List header like Explorer (shown only in list view) -->
    <ExplorerHeader
      v-if="configState.view === 'list'"
      :fs="fs"
      :fs-sort-state="fsSortState"
      :t="t"
    />
    <!-- Content -->
    <div
      ref="scrollContainer"
      class="vuefinder__explorer__selector-area"
      :class="'scroller-' + explorerId"
    >
      <div
        v-if="config.get('loadingIndicator') === 'linear' && loading"
        class="vuefinder__linear-loader"
      ></div>

      <div
        ref="scrollContent"
        class="scrollContent vuefinder__explorer__scroll-content"
        :style="{ height: `${totalHeight}px`, position: 'relative', width: '100%' }"
        @contextmenu.self.prevent="handleContentContextMenu"
        @click.self="handleContentClick"
        @touchstart.self.capture="handleContentTouchStart"
        @touchend.self.capture="handleContentTouchEnd"
        @touchmove.self.capture="handleContentTouchMove"
        @touchcancel.self.capture="handleContentTouchEnd"
      >
        <div ref="dragImage" class="vuefinder__explorer__drag-item">
          <DragItem
            :count="currentDragKey && selectedKeys.has(currentDragKey) ? selectedKeys.size : 1"
          />
        </div>

        <!-- Grid View -->
        <template v-if="configState.view === 'grid'">
          <FileRow
            v-for="rowIndex in visibleRows"
            :key="rowIndex"
            :row-index="rowIndex"
            :row-height="rowHeight"
            view="grid"
            :items-per-row="itemsPerRow"
            :items="getRowItems(sortedFiles, rowIndex)"
            :show-thumbnails="configState.showThumbnails"
            :is-dragging-item="isDraggingItem"
            :is-selected="isSelected"
            :drag-n-drop-events="(item) => dragNDrop.events(item)"
            :explorer-id="explorerId"
            @click="handleItemClick"
            @dblclick="handleItemDblClick"
            @contextmenu="handleItemContextMenu"
            @dragstart="handleItemDragStart"
            @dragend="handleItemDragEnd"
          >
            <template #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </FileRow>
        </template>

        <!-- List View -->
        <template v-else>
          <FileRow
            v-for="rowIndex in visibleRows"
            :key="rowIndex"
            :row-index="rowIndex"
            :row-height="rowHeight"
            view="list"
            :items="getItemAtRow(rowIndex) ? [getItemAtRow(rowIndex)!] : []"
            :compact="configState.compactListView"
            :is-dragging-item="isDraggingItem"
            :is-selected="isSelected"
            :drag-n-drop-events="(item) => dragNDrop.events(item)"
            :explorer-id="explorerId"
            @click="handleItemClick"
            @dblclick="handleItemDblClick"
            @contextmenu="handleItemContextMenu"
            @dragstart="handleItemDragStart"
            @dragend="handleItemDragEnd"
          >
            <template #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </FileRow>
        </template>
      </div>
    </div>
  </div>
</template>
