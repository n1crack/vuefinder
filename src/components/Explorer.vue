<script setup lang="ts">
import {ref, onMounted, onUnmounted, useTemplateRef, computed, inject, watch, onUpdated, shallowRef} from 'vue';
import SelectionArea, {type SelectionEvent} from '@viselect/vanilla';
import useVirtualColumns from '@/composables/useVirtualColumns';
import {useAutoResetRef} from '@/composables/useAutoResetRef';
import {useSelection} from '@/composables/useSelection';
import SortIcon from './SortIcon.vue';
import DragItem from './DragItem.vue';
import FileRow from './FileRow.vue';
import type {ServiceContainer, DirEntry} from '@/types';
import LazyLoad, {type ILazyLoadInstance} from 'vanilla-lazyload';
import Toast from './Toast.vue';
import {useFilesStore} from '@/stores/files';
import {useSearchStore} from '@/stores/search';
import {useDragNDrop} from '@/composables/useDragNDrop';
import {OverlayScrollbars} from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import {useConfigStore} from '@/stores/config';


const app = inject('ServiceContainer') as ServiceContainer;
const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])
const dragImage = useTemplateRef<HTMLElement>('dragImage');
const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const scrollContent = useTemplateRef<HTMLElement>('scrollContent');
 

const search = useSearchStore();
const fs = useFilesStore();
const config = useConfigStore();

let vfLazyLoad: ILazyLoadInstance | null = null;

// OverlayScrollbars custom bar refs/state
const osInstance = ref<ReturnType<typeof OverlayScrollbars> | null>(null);
const scrollBar = useTemplateRef<HTMLElement>('customScrollBar');
const scrollBarContainer = useTemplateRef<HTMLElement>('customScrollBarContainer');

const rowHeight = computed(() => config.view === 'grid' && !(search.searchMode && search.query.length) ? 88 : (config.compactListView ? 24 : 50));

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
    computed<DirEntry[]>(() => fs.files),
    {
      scrollContainer,
      itemWidth: 104,
      rowHeight,
      overscan: 2,
      containerPadding: 0
    });

const {
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
const copyPaste = app.copyPaste ?? null as unknown as {
  isCut: { value: boolean },
  copiedItems: { value: Array<{ path: string }> }
} | null;

const currentDragKey = ref<string | null>(null);

const isDraggingItem = (key?: string | null) => {
  if (!key || !currentDragKey.value) return false;
  const draggingSelected = fs.selectedKeys.has(currentDragKey.value as never);
  return isDragging.value && (draggingSelected ? fs.selectedKeys.has(key as never) : key === currentDragKey.value);
};

const isCut = (key?: string | null) => {
  if (!key || !copyPaste) return false;
  return (
      copyPaste.isCut.value && !!copyPaste.copiedItems.value.find((item: { path: string }) => item.path === key)
  );
};

watch(() => config.view, (view) => {
  if (view === 'list') {
    itemsPerRow.value = 1;
  } else {
    updateItemsPerRow();
  }
}, {immediate: true});

watch(itemsPerRow, (n) => {
  if (config.view === 'list' && n !== 1) {
    itemsPerRow.value = 1;
  }
});

const getItemAtRow = (rowIndex: number): DirEntry | undefined => {
  return fs.sortedFiles[rowIndex];
};

// Use getRowItems from composable using sorted files
const getRowFiles = (rowIndex: number): DirEntry[] => {
  return getRowItems(fs.sortedFiles, rowIndex);
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
  watch(() => search.query, (newQuery) => {
    const adapter = fs.path.storage;
    const currentPath = fs.path.path;
    if (!adapter || !currentPath) return;
    if (newQuery) {
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'search',
          adapter,
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
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter, path: currentPath}});
    }
  });

  // Initialize OverlayScrollbars custom track
  if (scrollBarContainer.value) {
    const instance = OverlayScrollbars(scrollBarContainer.value, {
      scrollbars: {theme: 'vf-theme-dark dark:vf-theme-light'},
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
  const el = (event.target as Element | null)?.closest(".file-item");
  const mouse = event as MouseEvent | null;
  if (!mouse?.ctrlKey && !mouse?.metaKey) {
    fs.clearSelection();
    selectionObject.value?.clearSelection(true, true);
  }
  if (el) {
    const key = String(el.getAttribute('data-key'));
    selectionObject.value?.resolveSelectables();
    fs.toggleSelect(key);
  }
  fs.setSelectedCount(fs.selectedKeys.size);
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

const handleItemDblClick = (event: MouseEvent) => {
  const el = (event.target as Element | null)?.closest('.file-item') as HTMLElement | null;
  const key = el ? String(el.getAttribute('data-key')) : null;
  if (!key) return;
  const item = fs.sortedFiles.find(f => f.path === key);
  if (item) {
    openItem(item);
  }
}

const getSelectedItems = () => {
  const selected = new Set(fs.selectedKeys);
  return fs.sortedFiles.filter(f => selected.has(f.path));
};

const handleItemContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  const el = (event.target as Element | null)?.closest('.file-item') as HTMLElement | null;
  if (el) {
    const key = String(el.getAttribute('data-key'));
    const targetItem = fs.sortedFiles.find(f => f.path === key);
    // Ensure the clicked item is selected if not already
    if (!fs.selectedKeys.has(key)) {
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

  const el = (event.target as Element | null)?.closest('.file-item') as HTMLElement | null;
  currentDragKey.value = el ? String(el.dataset.key) : null;

  if (event.dataTransfer && currentDragKey.value) {
    event.dataTransfer.setDragImage(dragImage.value as Element, 0, 15);
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.dropEffect = 'copy';

    // If the dragged item is not selected, only drag that item
    // If it's selected, drag all selected items
    const itemsToDrag = fs.selectedKeys.has(currentDragKey.value)
        ? Array.from(fs.selectedKeys)
        : [currentDragKey.value];

    event.dataTransfer.setData('items', JSON.stringify(itemsToDrag));
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
         :class="[{'grid-view': config.view === 'grid'}, {'search-active': search.hasQuery}]"
    >
      <div ref="customScrollBar" class="vuefinder__explorer__scrollbar"></div>
    </div>

    <!-- List header like Explorer (shown only in list view) -->
    <div v-if="config.view === 'list' || search.query.length" class="vuefinder__explorer__header">
      <div @click="fs.toggleSort('basename')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button">
        {{ t('Name') }}
        <SortIcon :direction="fs.sort.order" v-show="fs.sort.active && fs.sort.column === 'basename'"/>
      </div>
      <div v-if="!search.query.length" @click="fs.toggleSort('file_size')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button">
        {{ t('Size') }}
        <SortIcon :direction="fs.sort.order" v-show="fs.sort.active && fs.sort.column === 'file_size'"/>
      </div>
      <div v-if="search.query.length" @click="fs.toggleSort('path')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button">
        {{ t('Filepath') }}
        <SortIcon :direction="fs.sort.order" v-show="fs.sort.active && fs.sort.column === 'path'"/>
      </div>
      <div v-if="!search.query.length" @click="fs.toggleSort('last_modified')"
           class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button">
        {{ t('Date') }}
        <SortIcon :direction="fs.sort.order" v-show="fs.sort.active && fs.sort.column === 'last_modified'"/>
      </div>
    </div>
    <div class="vuefinder__linear-loader absolute" v-if="app.config === 'linear' && fs.isLoading()"></div>

    <!-- Content -->
    <div ref="scrollContainer" class="vuefinder__explorer__selector-area scroller" @scroll="handleScroll">
      <div
          ref="scrollContent"
          class="scrollContent min-h-full"
          :style="{ height: `${totalHeight}px`, position: 'relative', width: '100%' }"
          @contextmenu.self.prevent="handleContentContextMenu"
          @click.self="handleContentClick"
      >
        <div ref="dragImage" class="vuefinder__explorer__drag-item">
          <DragItem :count="currentDragKey && fs.selectedKeys.has(currentDragKey) ? fs.selectedKeys.size : 1"/>
        </div>

        <!-- Search View -->
        <template v-if="search.query.length">
          <FileRow
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :row-index="rowIndex"
              :row-height="rowHeight"
              view="list"
              :items="getItemAtRow(rowIndex) ? [getItemAtRow(rowIndex)!] : []"
              :compact="config.compactListView"
              :show-path="true"
              :is-dragging-item="isDraggingItem"
              :is-cut="isCut"
              :is-selected="(path) => fs.selectedKeys.has(path as never)"
              :drag-n-drop-events="(item) => dragNDrop.events(item)"
              @click="handleItemClick"
              @dblclick="handleItemDblClick"
              @contextmenu="handleItemContextMenu"
              @dragstart="handleItemDragStart"
              @dragend="handleItemDragEnd"
          />
        </template>

        <!-- Grid View -->
        <template v-else-if="config.view === 'grid'">
          <FileRow
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :row-index="rowIndex"
              :row-height="rowHeight"
              view="grid"
              :items-per-row="itemsPerRow"
              :items="getRowFiles(rowIndex)"
              :show-thumbnails="config.showThumbnails"
              :is-dragging-item="isDraggingItem"
              :is-cut="isCut"
              :is-selected="(path) => fs.selectedKeys.has(path as never)"
              :drag-n-drop-events="(item) => dragNDrop.events(item)"
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
              :compact="config.compactListView"
              :is-dragging-item="isDraggingItem"
              :is-cut="isCut"
              :is-selected="(path) => fs.selectedKeys.has(path as never)"
              :drag-n-drop-events="(item) => dragNDrop.events(item)"
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
