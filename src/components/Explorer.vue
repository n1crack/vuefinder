<script setup lang="ts">
import {ref, onMounted, onUnmounted, useTemplateRef, computed, inject, watch, onUpdated, shallowRef} from 'vue';
import {useStore} from '@nanostores/vue';
import SelectionArea, {type SelectionEvent} from '@viselect/vanilla';
import useVirtualColumns from '../composables/useVirtualColumns';
import {useSelection} from '../composables/useSelection';
import SortIcon from './SortIcon.vue';
import DragItem from './DragItem.vue';
import FileRow from './FileRow.vue';
import type {ServiceContainer, DirEntry} from '../types';
import LazyLoad, {type ILazyLoadInstance} from 'vanilla-lazyload';
import Toast from './Toast.vue';
import {useDragNDrop} from '../composables/useDragNDrop';
import {OverlayScrollbars} from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

const app = inject('ServiceContainer') as ServiceContainer;
const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])
const dragImage = useTemplateRef<HTMLElement>('dragImage');
const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const scrollContent = useTemplateRef<HTMLElement>('scrollContent');
 
const search = app.search;
const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState = useStore(config.state);
const searchState = useStore(search.state);
const fsSortState = useStore(fs.sort);

// Make files store reactive
const sortedFiles = useStore(fs.sortedFiles);
const selectedKeys = useStore(fs.selectedKeys);
const loading = useStore(fs.loading);


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
  return view === 'grid' && !(searchState.value.searchMode && searchState.value.query.length) ? 88 : (compact ? 24 : 50);
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
      lockItemsPerRow: computed(() => configState.value.view === 'list' || !!searchState.value.query.length)
    });

const {
  explorerId,
  isDragging,
  initializeSelectionArea,
  destroySelectionArea,
  handleContentClick
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

  // Handle search queries via store
  watch(() => searchState.value.query, (newQuery) => {
    const storage = fs.path.get().storage;
    const currentPath = fs.path.get().path;
    if (!storage || !currentPath) return;
    if (newQuery) {
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'search',
          storage,
          path: currentPath,
          filter: newQuery
        },
        onSuccess: (data: { files: DirEntry[] }) => {
          if (!data.files.length) {
            app.emitter.emit('vf-toast-push', {label: t('No search result found.')});
          }
        }
      });
    } else {
      app.emitter.emit('vf-fetch', {params: {q: 'index', storage, path: currentPath}});
    }
  });

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
    if (!mouse?.ctrlKey && !mouse?.metaKey  &&  ( event.type !== 'touchstart' || !fs.isSelected(key))) {
        fs.clearSelection();
        selectionObject.value?.clearSelection(true, true);
    }
    selectionObject.value?.resolveSelectables();
    if(event.type === 'touchstart' && fs.isSelected(key)) { 
      fs.select(key);
    } else {
      fs.toggleSelect(key);
    }
  }

  fs.setSelectedCount(selectedKeys.value?.size || 0);  
}

const openItem = (item: DirEntry) => {
  const contextMenuItem = app.contextMenuItems.find((cmi: {
    show: (app: ServiceContainer, args: { searchQuery: string; items: DirEntry[]; target: DirEntry }) => boolean;
    action: (app: ServiceContainer, items: DirEntry[]) => void
  }) => {
    return cmi.show(app, {
      searchQuery: '',
      items: [item],
      target: item,
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
         :class="[{'grid-view': configState.view === 'grid'}, {'search-active': searchState.hasQuery}]"
    >
      <div ref="customScrollBar" class="vuefinder__explorer__scrollbar"></div>
    </div>
    <!-- List header like Explorer (shown only in list view) -->
    <div v-if="configState.view === 'list' || searchState.hasQuery" class="vuefinder__explorer__header">
      <div @click="fs.toggleSort('basename')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button">
        {{ t('Name') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'basename'"/>
      </div>
      <div v-if="!searchState.hasQuery" @click="fs.toggleSort('file_size')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button">
        {{ t('Size') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'file_size'"/>
      </div>
      <div v-if="searchState.hasQuery" @click="fs.toggleSort('path')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button">
        {{ t('Filepath') }}
        <SortIcon :direction="fsSortState.order" v-show="fsSortState.active && fsSortState.column === 'path'"/>
      </div>
      <div v-if="!searchState.hasQuery" @click="fs.toggleSort('last_modified')"
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
          <DragItem :count="currentDragKey && selectedKeys?.has(currentDragKey) ? selectedKeys?.size : 1"/>
        </div>

        <!-- Search View -->
        <template v-if="searchState.query.length">
          <FileRow
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :row-index="rowIndex"
              :row-height="rowHeight"
              view="list"
              :items="getItemAtRow(rowIndex) ? [getItemAtRow(rowIndex)!] : []"
              :compact="configState.compactListView"
              :show-path="true"
              :is-dragging-item="isDraggingItem"
              :is-selected="isSelected"
              :drag-n-drop-events="(item) => dragNDrop.events(item)"
              :explorerId="explorerId"
              @click="handleItemClick"
              @dblclick="handleItemDblClick"
              @contextmenu="handleItemContextMenu"
              @dragstart="handleItemDragStart"
              @dragend="handleItemDragEnd"
          />
        </template>
        <!-- Grid View -->
        <template v-else-if="configState.view === 'grid'">
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
          />
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
          />
        </template>
      </div>
    </div>
    <Toast/>
  </div>
</template>
