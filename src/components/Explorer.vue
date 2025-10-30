<script setup lang="ts">
// @ts-nocheck
import {ref, onMounted, onUnmounted, useTemplateRef, computed, inject, watch, onUpdated, shallowRef} from 'vue';
import {useStore} from '@nanostores/vue';
import SelectionArea, {type SelectionEvent} from '@viselect/vanilla';
import useVirtualColumns from '../composables/useVirtualColumns';
import {useSelection} from '../composables/useSelection';
import SortIcon from './SortIcon.vue';
import DragItem from './DragItem.vue';
import FileRow from './FileRow.vue';
import type {DirEntry, App} from '../types';
import type { Item as ContextMenuItem } from '../utils/contextmenu';
import LazyLoad, {type ILazyLoadInstance} from 'vanilla-lazyload';
import Toast from './Toast.vue';
import {useDragNDrop} from '../composables/useDragNDrop';
import {OverlayScrollbars} from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import type { StoreValue } from "nanostores";
import type {ConfigState} from "../stores/config";
import type {SortState} from "../stores/files";
import { useApp } from '../composables/useApp';

const props = defineProps<{
  onFileDclick?: (item: DirEntry) => void;
  onFolderDclick?: (item: DirEntry) => void;
}>();

const app = useApp();
const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over'])
const dragImage = useTemplateRef<HTMLElement>('dragImage');
const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const scrollContent = useTemplateRef<HTMLElement>('scrollContent');
 
const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState : StoreValue<ConfigState> = useStore(config.state);
const fsSortState : StoreValue<SortState> = useStore(fs.sort);

// Make files store reactive
const sortedFiles: StoreValue<DirEntry[]> = useStore(fs.sortedFiles);
const selectedKeys: StoreValue<Set<string>> = useStore(fs.selectedKeys);
const loading: StoreValue<boolean> = useStore(fs.loading);

// Function for isSelected
const isSelected = (path: string) => {
  return selectedKeys.value?.has(path as never) ?? false;
};

let vfLazyLoad: ILazyLoadInstance | null = null;

// OverlayScrollbars custom bar refs/state
const osInstance = ref<ReturnType<typeof OverlayScrollbars> | null>(null);
const scrollBar = useTemplateRef<HTMLElement>('customScrollBar');
const scrollBarContainer = useTemplateRef<HTMLElement>('customScrollBarContainer');

const rowHeight = computed(() => {
  const view = configState.value.view;
  const compact = configState.value.compactListView;
  return view === 'grid' ? 88 : (compact ? 24 : 50);
});

const {t} = app.i18n;

const {
  itemsPerRow,
  totalHeight,
  visibleRows,
  handleScroll,
  getRowItems,
  getItemsInRange,
  getItemPosition,
  updateItemsPerRow
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
      lockItemsPerRow: computed(() => configState.value.view === 'list')
    });

const {
  explorerId,
  isDragging,
  initializeSelectionArea,
  destroySelectionArea,
  updateSelectionArea,
  handleContentClick,
} = useSelection<DirEntry>({
  getItemPosition,
  getItemsInRange,
  getKey: (f) => f.path,
  selectionObject,
  rowHeight,
  itemWidth: 104
});

const currentDragKey = ref<string | null>(null);

const isDraggingItem = (key?: string | null) => {
  if (!key || !currentDragKey.value) return false;
  const draggingSelected = selectedKeys.value?.has(currentDragKey.value as never) ?? false;
  return isDragging.value && (draggingSelected ? selectedKeys.value?.has(key as never) ?? false : key === currentDragKey.value);
};

watch(() => config.get('view'), (newView) => {
  if (newView === 'list') {
    itemsPerRow.value = 1;
  } else {
    updateItemsPerRow();
  }
}, {immediate: true});

watch(itemsPerRow, (n) => {
  if (config.get('view') === 'list' && n !== 1) {
itemsPerRow.value = 1;
  }
});


const getItemAtRow = (rowIndex: number): DirEntry | undefined => {
  return sortedFiles.value?.[rowIndex];
};

onMounted(() => {
  // Initialize SelectionArea
  initializeSelectionArea();

  if (selectionObject.value) {
    selectionObject.value.on('beforestart', ({event}: SelectionEvent) => {
        const blankArea = event?.target === scrollContent.value
        if (!event?.metaKey && !event?.ctrlKey && !event?.altKey && !blankArea) {
          return false;
        }
    });
  }

  // Initialize LazyLoad for thumbnails
  if (scrollContainer.value) {
    vfLazyLoad = new LazyLoad({
      elements_selector: '.lazy',
      container: scrollContainer.value
    });
  }

  // Watch for filter changes and update selection area
  watch(() => [app.selectionFilterType, app.selectionFilterMimeIncludes], () => {
    updateSelectionArea();
  }, { deep: true });

  // Initialize OverlayScrollbars custom track
  if (scrollBarContainer.value) {
    const instance = OverlayScrollbars(scrollBarContainer.value, {
      scrollbars: {theme: 'vf-scrollbars-theme'},
    }, {
      initialized: (inst: ReturnType<typeof OverlayScrollbars>) => {
        osInstance.value = inst;
      },
      scroll: (inst: ReturnType<typeof OverlayScrollbars>) => {
        const {scrollOffsetElement} = inst.elements();
        if (scrollContainer.value) {
          scrollContainer.value.scrollTo({top: (scrollOffsetElement as HTMLElement).scrollTop, left: 0});
        }
      }
    });
    osInstance.value = instance as unknown as ReturnType<typeof OverlayScrollbars>;
  }

  // Sync custom bar when content scrolls
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', () => {
      const inst = osInstance.value;
      if (!inst) return;
      const {scrollOffsetElement} = inst.elements();
      (scrollOffsetElement as HTMLElement).scrollTo({top: scrollContainer.value!.scrollTop, left: 0});
    });
  }
});

onMounted(() => {
  app.emitter.on('vf-refresh-thumbnails', () => {
    if (vfLazyLoad) {
      vfLazyLoad.update();
    }
  });
}); 

onUpdated(() => {
  if (vfLazyLoad) {
    vfLazyLoad.update();
  }
  // Update custom scrollbar height/visibility
  const inst = osInstance.value;
  if (inst && scrollBar.value && scrollContainer.value) {
    const needsBar = scrollContainer.value.scrollHeight > scrollContainer.value.clientHeight;
    const barEl = scrollBar.value;
    barEl.style.display = needsBar ? 'block' : 'none';
    barEl.style.height = `${totalHeight.value}px`;
  }
});

onUnmounted(() => {
  destroySelectionArea();
  if (vfLazyLoad) {
    vfLazyLoad.destroy();
    vfLazyLoad = null;
  }
  if (osInstance.value) {
    osInstance.value.destroy();
    osInstance.value = null;
  }
});

const handleItemClick = (event: Event | MouseEvent | TouchEvent) => {
  const el = (event.target as Element | null)?.closest('.file-item-' + explorerId);
  const mouse = event as MouseEvent | null;
  if (el) {
    const key = String(el.getAttribute('data-key'));
    const item = sortedFiles.value?.find((f: DirEntry) => f.path === key);
    // Block selection if not selectable per filters
    const filterType = app.selectionFilterType;
    const allowedMimes = app.selectionFilterMimeIncludes;
    const typeAllowed = !filterType || filterType === 'both' || (filterType === 'files' && item?.type === 'file') || (filterType === 'dirs' && item?.type === 'dir');
    
    // Check MIME filter - only apply to files, not directories
    let mimeAllowed = true;
    if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
      // If it's a directory, MIME filters don't apply - it's always selectable
      if (item?.type === 'dir') {
        mimeAllowed = true;
      } else {
        // For files, check MIME type
        if (!item?.mime_type) {
          mimeAllowed = false; // No MIME type means not selectable when MIME filters are active
        } else {
          mimeAllowed = allowedMimes.some((p: string) => (item?.mime_type as string).startsWith(p));
        }
      }
    }
    
    if (!typeAllowed || !mimeAllowed) {
      return;
    }
    const selectionMode = app.selectionMode || 'multiple';
    
    if (!mouse?.ctrlKey && !mouse?.metaKey  &&  ( event.type !== 'touchstart' || !fs.isSelected(key))) {
        fs.clearSelection();
        selectionObject.value?.clearSelection(true, true);
    }
    selectionObject.value?.resolveSelectables();
    if(event.type === 'touchstart' && fs.isSelected(key)) { 
      fs.select(key, selectionMode);
    } else {
      fs.toggleSelect(key, selectionMode);
    }
  }

  fs.setSelectedCount(selectedKeys.value?.size || 0);  
}

const openItem = (item: DirEntry) => {
  // Check if custom handlers are provided
  if (item.type === 'file' && props.onFileDclick) {
    app.emitter.emit('vf-file-dclick', item);
    return;
  }
  
  if (item.type === 'dir' && props.onFolderDclick) {
    app.emitter.emit('vf-folder-dclick', item);
    return;
  }
  
  // Default behavior - execute context menu action
  const contextMenuItem = app.contextMenuItems?.find((cmi: ContextMenuItem) => {
    return cmi.show(app, {
      items: [item],
      target: item,
      searchQuery: ''
    })
  })

  if (contextMenuItem) {
    contextMenuItem.action(app, [item]);
  }
};

const handleItemDblClick = (event: MouseEvent | TouchEvent) => {
  const el = (event.target as Element | null)?.closest('.file-item-' + explorerId) as HTMLElement | null;
  const key = el ? String(el.getAttribute('data-key')) : null;
  if (!key) return;
  const item = sortedFiles.value?.find((f: DirEntry) => f.path === key);
  // Block open if not selectable
  const filterType = app.selectionFilterType;
  const allowedMimes = app.selectionFilterMimeIncludes;
  const typeAllowed = !filterType || filterType === 'both' || (filterType === 'files' && item?.type === 'file') || (filterType === 'dirs' && item?.type === 'dir');
  
  // Check MIME filter - only apply to files, not directories
  let mimeAllowed = true;
  if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
    // If it's a directory, MIME filters don't apply - it's always selectable
    if (item?.type === 'dir') {
      mimeAllowed = true;
    } else {
      // For files, check MIME type
      if (!item?.mime_type) {
        mimeAllowed = false; // No MIME type means not selectable when MIME filters are active
      } else {
        mimeAllowed = allowedMimes.some((p: string) => (item?.mime_type as string).startsWith(p));
      }
    }
  }
  
  if (!typeAllowed || !mimeAllowed) return;
  if (item) {
    openItem(item);
  }
}

const getSelectedItems = () => {
  const selected = selectedKeys.value;
  return sortedFiles.value?.filter((f: DirEntry) => selected?.has(f.path)) || [];
};

const handleItemContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  const el = (event.target as Element | null)?.closest('.file-item-' + explorerId) as HTMLElement | null;
  if (el) {
    const key = String(el.getAttribute('data-key'));
    const targetItem = sortedFiles.value?.find((f: DirEntry) => f.path === key);
    
    // Check if the item is selectable according to filters
    const filterType = app.selectionFilterType;
    const allowedMimes = app.selectionFilterMimeIncludes;
    const typeAllowed = !filterType || filterType === 'both' || (filterType === 'files' && targetItem?.type === 'file') || (filterType === 'dirs' && targetItem?.type === 'dir');
    
    // Check MIME filter - only apply to files, not directories
    let mimeAllowed = true;
    if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
      // If it's a directory, MIME filters don't apply - it's always selectable
      if (targetItem?.type === 'dir') {
        mimeAllowed = true;
      } else {
        // For files, check MIME type
        if (!targetItem?.mime_type) {
          mimeAllowed = false; // No MIME type means not selectable when MIME filters are active
        } else {
          mimeAllowed = allowedMimes.some((p: string) => (targetItem?.mime_type as string).startsWith(p));
        }
      }
    }
    
    // Only allow context menu if item is selectable
    if (!typeAllowed || !mimeAllowed) {
      return; // Don't show context menu for unselectable items
    }
    
    // Ensure the clicked item is selected if not already
    if (!selectedKeys.value?.has(key)) {
      fs.clearSelection();
      fs.select(key);
    }
    app.emitter.emit('vf-contextmenu-show', {event, items: getSelectedItems(), target: targetItem});
  }
}

const handleContentContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  app.emitter.emit('vf-contextmenu-show', {event, items: getSelectedItems()});
}

const handleItemDragStart = (event: DragEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) {
        event.preventDefault();
        return false;
    }

  isDragging.value = true;

  const el = (event.target as Element | null)?.closest('.file-item-'+explorerId) as HTMLElement | null;
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

</script>


<template>
  <div class="vuefinder__explorer__container">
    <!-- Custom Scrollbar Container (OverlayScrollbars) -->
    <div ref="customScrollBarContainer"
         class="vuefinder__explorer__scrollbar-container"
         :class="[{'grid-view': configState.view === 'grid'}]"
    >
      <div ref="customScrollBar" class="vuefinder__explorer__scrollbar"></div>
    </div>
    <!-- List header like Explorer (shown only in list view) -->
    <div v-if="configState.view === 'list'" class="vuefinder__explorer__header">
      <div @click="fs.toggleSort('basename')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button">
        {{ t('Name') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'basename'"/>
      </div>
      <div @click="fs.toggleSort('file_size')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button">
        {{ t('Size') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'file_size'"/>
      </div>
      <div @click="fs.toggleSort('last_modified')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button">
        {{ t('Date') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'last_modified'"/>
      </div>
    </div>
    <!-- Content -->
    <div ref="scrollContainer" class="vuefinder__explorer__selector-area" :class="'scroller-' + explorerId" @scroll="handleScroll">
    <div class="vuefinder__linear-loader" v-if="config.get('loadingIndicator') === 'linear' && loading"></div>
    
      <div
          ref="scrollContent"
          class="scrollContent min-h-full"
          :style="{ height: `${totalHeight}px`, position: 'relative', width: '100%' }"
          @contextmenu.self.prevent="handleContentContextMenu"
          @click.self="handleContentClick"
      >
        <div ref="dragImage" class="vuefinder__explorer__drag-item">
          <DragItem :count="currentDragKey && selectedKeys.has(currentDragKey) ? selectedKeys.size : 1"/>
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
              :explorerId="explorerId"
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
              :explorerId="explorerId"
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
    <Toast/>
  </div>
</template>
