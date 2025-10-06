<script setup lang="ts">
import {ref, onMounted, onUnmounted, reactive, shallowRef, useTemplateRef, computed, inject, watch, onUpdated} from 'vue';
import SelectionArea, {type SelectionEvent} from '@viselect/vanilla';
import useVirtualColumns from '@/composables/useVirtualColumns';
import { useAutoResetRef } from '@/composables/useAutoResetRef';
import { useSelection } from '@/composables/useSelection';
import SortIcon from './SortIcon.vue';
import ItemIcon from './ItemIcon.vue';
import DragItem from './DragItem.vue';
import title_shorten from '@/utils/title_shorten';
import type { App, DirEntry } from '@/types';
import LazyLoad, { type ILazyLoadInstance } from 'vanilla-lazyload';


const app = inject('ServiceContainer') as App;
const scrollContent = useTemplateRef<HTMLElement>('scrollContent');
const dragImage = useTemplateRef<HTMLElement>('dragImage');
const files = computed<DirEntry[]>(() => app?.fs?.data?.files ?? []);
// Selection state is managed by useSelection

const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const [awaitingDrag, setAwaitingDrag] = useAutoResetRef(300);
const selectionStarted = ref(false);
const searchQuery = ref('');

let vfLazyLoad: ILazyLoadInstance | null = null;

// Constants for template
const rowHeight = computed(() => app.view === 'list' ? 24 : 88);

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
} = useVirtualColumns<DirEntry>(files, {
  scrollContainer,
  itemWidth: 120,
  rowHeight,
  overscan: 2,
  containerPadding: 48
});

// Selection composable
const selectionApi = useSelection<DirEntry>({ files, getItemPosition, getItemsInRange, getKey: (f) => f.path });
const { selectedIds, totalSelectedItem, isDragging } = selectionApi;
const copyPaste = app.copyPaste ?? null as unknown as { isCut: { value: boolean }, copiedItems: { value: Array<{ path: string }> } } | null;

const currentDragKey = ref<string | null>(null);

const isDraggingItem = (key?: string | null) => {
  if (!key || !currentDragKey.value) return false;
  const draggingSelected = selectedIds.has(currentDragKey.value as never);
  return isDragging.value && (draggingSelected ? selectedIds.has(key as never) : key === currentDragKey.value);
};

const isCut = (key?: string | null) => {
  if (!key || !copyPaste) return false;
  return (
    copyPaste.isCut.value && !!copyPaste.copiedItems.value.find((item: { path: string }) => item.path === key)
  );
};


// Sorting (similar concept to Explorer)
type SortColumn = 'basename' | 'file_size' | 'last_modified' | 'path' | '';
type SortOrder = 'asc' | 'desc' | '';
const sort = reactive<{ active: boolean; column: SortColumn; order: SortOrder }>({
  active: false,
  column: '',
  order: ''
});

const compareValues = (a: unknown, b: unknown): number => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
  const an = Number(a) || 0;
  const bn = Number(b) || 0;
  return an === bn ? 0 : an < bn ? -1 : 1;
};

const sortedFiles = computed<DirEntry[]>(() => {
  if (!sort.active || !sort.column) return files.value;
  const order = sort.order === 'asc' ? 1 : -1;
  return files.value.slice().sort((a, b) => {
    let av: unknown;
    let bv: unknown;
    if (sort.column === 'basename') {
      av = a.basename; bv = b.basename;
    } else if (sort.column === 'file_size') {
      av = a.file_size ?? 0; bv = b.file_size ?? 0;
    } else if (sort.column === 'last_modified') {
      av = a.last_modified ?? 0; bv = b.last_modified ?? 0;
    } else if (sort.column === 'path') {
      av = a.path; bv = b.path;
    }
    return compareValues(av, bv) * order;
  });
});

const sortBy = (column: Exclude<SortColumn, ''>) => {
  if (sort.active && sort.column === column) {
    sort.active = sort.order === 'asc';
    sort.column = column;
    sort.order = 'desc';
  } else {
    sort.active = true;
    sort.column = column;
    sort.order = 'asc';
  }
};

// Ensure list view renders 1 item per row and grid recalculates
watch(() => app.view, (view) => {
  if (view === 'list') {
    itemsPerRow.value = 1;
  } else {
    updateItemsPerRow();
  }
}, { immediate: true });

// Guard against ResizeObserver resetting itemsPerRow in list view
watch(itemsPerRow, (n) => {
  if (app.view === 'list' && n !== 1) {
    itemsPerRow.value = 1;
  }
});

// Helper: get single item for a given virtual row (list view)
const getItemAtRow = (rowIndex: number): DirEntry | undefined => {
  return sortedFiles.value[rowIndex];
};

// Use getRowItems from composable using sorted files
const getRowFiles = (rowIndex: number): DirEntry[] => {
  return getRowItems(sortedFiles.value, rowIndex);
};

// Use getItemsInRange from composable
const getItemsInRangeWrapper = (minRow: number, maxRow: number, minCol: number, maxCol: number) => {
  return getItemsInRange(sortedFiles.value, minRow, maxRow, minCol, maxCol);
};

// Get selection range
const getSelectionRange = (selectionParam: Set<string>) => {
  if (selectionParam.size === 0) {
    return null;
  }

  const ids = Array.from(selectionParam);
  const positions = ids.map(key => {
    const index = sortedFiles.value.findIndex(f => f.path === key);
    return getItemPosition(index >= 0 ? index : 0);
  });

  const minRow = Math.min(...positions.map(p => p.row));
  const maxRow = Math.max(...positions.map(p => p.row));
  const minCol = Math.min(...positions.map(p => p.col));
  const maxCol = Math.max(...positions.map(p => p.col));

  return {minRow, maxRow, minCol, maxCol};
};

// Removed unused handleSelectAll (toolbar select all removed)

// handlers moved to useSelection

const onBeforeDrag = () => {
  if (!awaitingDrag.value) {
    // we can drag and drop items now..
    return false;
  }
  console.log('onBeforeDrag')
}

const _onBeforeStart = (event: SelectionEvent) => {
  console.log('onBeforeStart')
  if(!event.event?.metaKey && !event.event?.ctrlKey) { 
    selectionStarted.value = true;
  }
  setAwaitingDrag(true);
  selectionApi.onBeforeStart(event);
}

const _onStart = (evt: SelectionEvent) => {
  selectionApi.onStart(evt);
};

const _onMove = (event: SelectionEvent) => {
  console.log('onMove')
  selectionStarted.value = false;
  selectionApi.onMove(event);
};

const _onStop = (evt: SelectionEvent) => {
  console.log('onStop')
  selectionApi.onStop(evt);
}

// selectSelectionRange moved into composable

onMounted(() => {
  selectionObject.value = new SelectionArea({
    selectables: ['.file-item'],
    boundaries: ['.scroller'],

    behaviour: {
      overlap: 'invert',
      intersect: 'touch',
      startThreshold: 5,
      triggers: [0],
      scrolling: {
        speedDivider: 10,
        manualSpeed: 750,
        startScrollMargins: {x: 0, y: 10}
      }
    },
    features: {
      touch: true,
      range: true,
      deselectOnBlur: true,
      singleTap: {
        allow: false,
        intersect: 'native'
      }
    }
  });

  selectionObject.value.on('beforestart', _onBeforeStart);
  selectionObject.value.on('start', _onStart);
  selectionObject.value.on('move', _onMove);
  selectionObject.value.on('stop', _onStop);
  selectionObject.value.on('beforedrag', onBeforeDrag);
  
  // Initialize LazyLoad for thumbnails
  if (scrollContainer.value) {
    vfLazyLoad = new LazyLoad({
      elements_selector: '.lazy',
      container: scrollContainer.value
    });
  }
  
  // Emit selected items on change
  watch(() => Array.from(selectedIds), (ids) => {
    const selected = new Set(ids as string[]);
    app.emitter.emit('vf-select', sortedFiles.value.filter(f => selected.has(f.path)));
  }, { deep: false });

  // Handle search queries
  app.emitter.on('vf-search-query', ({newQuery}: { newQuery: string }) => {
    searchQuery.value = newQuery;

    if (newQuery) {
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'search',
          adapter: app.fs.adapter,
          path: app.fs.data.dirname,
          filter: newQuery
        },
        onSuccess: (data: { files: DirEntry[] }) => {
          if (!data.files.length) {
            app.emitter.emit('vf-toast-push', {label: t('No search result found.')});
          }
        }
      });
    } else {
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
    }
  });
});

onUpdated(() => {
  if (vfLazyLoad) {
    vfLazyLoad.update();
  }
});

onUnmounted(() => {
  if (selectionObject.value) {
    selectionObject.value.destroy();
    selectionObject.value = null;
  }
  if (vfLazyLoad) {
    vfLazyLoad.destroy();
    vfLazyLoad = null;
  }
});

// Export functions for external use
defineExpose({
  getItemsInRange: getItemsInRangeWrapper,
  getSelectionRange,
  selectedIds,
  files
});

const handleContentClick = () => {
  if (selectionStarted.value) {
     selectionObject.value?.clearSelection();
     selectionStarted.value = false;
  }
}

const handleItemClick = (event: Event | MouseEvent | TouchEvent) => {
  console.log('handleItemClick')
  const el = (event.target as Element | null)?.closest(".file-item");
  const mouse = event as MouseEvent | null;
  if (!mouse?.ctrlKey && !mouse?.metaKey) {
    selectedIds.clear();
    selectionObject.value?.clearSelection(true, true);
  }
  if (el) {
    const key = String(el.getAttribute('data-key'));
    selectionObject.value?.resolveSelectables();
    if (selectedIds.has(key)) {
      selectedIds.delete(key);
    } else {
      selectedIds.add(key);
    }
    if (selectedIds.size === 0) {

    }
  }
  totalSelectedItem.value = selectedIds.size;
}

const openItem = (item: DirEntry) => {
  const contextMenuItem = app.contextMenuItems.find((cmi: { show: (app: App, args: { searchQuery: string; items: DirEntry[]; target: DirEntry }) => boolean; action: (app: App, items: DirEntry[]) => void }) => {
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
  const item = sortedFiles.value.find(f => f.path === key);
  if (item) {
    openItem(item);
  }
}

const getSelectedItems = () => {
  const selected = new Set(selectedIds);
  return sortedFiles.value.filter(f => selected.has(f.path));
};

const handleItemContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  const el = (event.target as Element | null)?.closest('.file-item') as HTMLElement | null;
  if (el) {
    const key = String(el.getAttribute('data-key'));
    console.log(  key)
  }
  console.log('handleItemContextMenu')
  app.emitter.emit('vf-contextmenu-show', {event, items: getSelectedItems()});
}

const handleContentContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  app.emitter.emit('vf-contextmenu-show', {event, items: getSelectedItems()});
}

const handleItemDragStart = (event: DragEvent) => {
  if (awaitingDrag.value) {
    event.preventDefault();
    return false;
  }
  isDragging.value = true;
  
  if (event.dataTransfer) {
    event.dataTransfer.setDragImage(dragImage.value as Element, 0, 15);
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.dropEffect = 'copy';
    event.dataTransfer.setData('items', JSON.stringify(Array.from(selectedIds)));
  }
  const el = (event.target as Element | null)?.closest('.file-item') as HTMLElement | null;
  currentDragKey.value = el ? String(el.dataset.key) : null;
  //console.log('handleItemDragStart', Array.from(selectedIds))
};

const handleItemDragEnd = () => {
  currentDragKey.value = null;
};

</script>


<template>
  <div class="vuefinder__new_explorer__container">
    <!-- List header like Explorer (shown only in list view) -->
    <div v-if="app.view === 'list' || searchQuery.length" class="vuefinder__new_explorer__header">
      <div @click="sortBy('basename')"
           class="vuefinder__new_explorer__sort-button vuefinder__new_explorer__sort-button--name vf-sort-button">
           {{ t('Name') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'basename'"/>
      </div>
      <div v-if="!searchQuery.length" @click="sortBy('file_size')"
           class="vuefinder__new_explorer__sort-button vuefinder__new_explorer__sort-button--size vf-sort-button">
           {{ t('Size') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'file_size'"/>
      </div>
      <div v-if="searchQuery.length" @click="sortBy('path')"
           class="vuefinder__new_explorer__sort-button vuefinder__new_explorer__sort-button--path vf-sort-button">
           {{ t('Filepath') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'path'"/>
      </div>
      <div v-if="!searchQuery.length" @click="sortBy('last_modified')"
           class="vuefinder__new_explorer__sort-button vuefinder__new_explorer__sort-button--date vf-sort-button">
           {{ t('Date') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'last_modified'"/>
      </div>
    </div>
    <div class="vuefinder__linear-loader absolute" v-if="app.loadingIndicator === 'linear' && app.fs.loading"></div>

    <!-- Content -->
    <div ref="scrollContainer" class="vuefinder__new_explorer__selector-area scroller"  @scroll="handleScroll">
      <div 
            ref="scrollContent" 
            class="scrollContent min-h-full" 
            :style="{ height: `${totalHeight}px`, position: 'relative', width: '100%' }"
            @contextmenu.self.prevent="handleContentContextMenu" 
            @click.self="handleContentClick"
      >
        <div ref="dragImage" class="vuefinder__explorer__drag-item">
          <DragItem :count="selectedIds.size"/>
        </div>
        
        <!-- Search View -->
        <template v-if="searchQuery.length">
          <div
              class="pointer-events-none"
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${rowHeight}px`,
              transform: `translateY(${rowIndex * rowHeight}px)`,
            }"
          >
            <div class="grid justify-self-start w-full" :style="{ gridTemplateColumns: '1fr' }">
              <div
                  :style="{ opacity: (isDraggingItem(getItemAtRow(rowIndex)?.path || null) || isCut(getItemAtRow(rowIndex)?.path || null)) ? 0.5 : '' }"
                  v-if="getItemAtRow(rowIndex)"
                  :key="getItemAtRow(rowIndex)?.path || rowIndex"
                  :data-key="getItemAtRow(rowIndex)?.path"
                  :data-row="rowIndex"
                  data-col="0"
                  draggable="true"
                  @dragstart="handleItemDragStart"
                  @dragend="handleItemDragEnd"
                  @click="handleItemClick"
                  @dblclick="handleItemDblClick"
                  @contextmenu.prevent="handleItemContextMenu"
                  :class="[
                    'file-item vf-new-explorer-item-list pointer-events-auto',
                    selectedIds.has(getItemAtRow(rowIndex)?.path as never) ? 'vf-new-explorer-selected' : ''
                  ]"
              >
                <div class="vuefinder__new_explorer__item-list-content">
                  <div class="vuefinder__new_explorer__item-list-name">
                    <div class="vuefinder__new_explorer__item-list-icon">
                        <ItemIcon :item="getItemAtRow(rowIndex)!" :small="app.compactListView"/>
                    </div>
                    <span class="vuefinder__new_explorer__item-name">{{ getItemAtRow(rowIndex)?.basename }}</span>
                  </div>
                  <div class="vuefinder__new_explorer__item-path">{{ getItemAtRow(rowIndex)?.path }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- Grid View -->
        <template v-else-if="app.view === 'grid'">
          <div
              class="pointer-events-none"
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${rowHeight}px`,
              transform: `translateY(${rowIndex * rowHeight}px)`,
            }"
          >
            <div class="grid justify-self-start" :style="{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }">
              <div
                  v-for="(file, colIndex) in getRowFiles(rowIndex)"
                  :style="{ opacity: (isDraggingItem(file.path) || isCut(file.path)) ? 0.5 : '' }"
                  :key="file.path"
                  :data-key="file.path"
                  :data-row="rowIndex"
                  :data-col="colIndex"
                  draggable="true"
                  @dragstart="handleItemDragStart"
                  @dragend="handleItemDragEnd"
                  @click="handleItemClick"
                  @dblclick="handleItemDblClick"
                  @contextmenu.prevent="handleItemContextMenu"
                  :class="[
                    'file-item vf-new-explorer-item-grid pointer-events-auto',
                    selectedIds.has(file.path as never) ? 'vf-new-explorer-selected' : ''
                  ]"
              >
                <div>
                  <div class="vuefinder__new_explorer__item-grid-content">
                    <img
                      v-if="(file.mime_type ?? '').startsWith('image') && app.showThumbnails"
                      src="data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                      class="vuefinder__new_explorer__item-thumbnail lazy"
                      :data-src="app.requester.getPreviewUrl(app.fs.adapter, file)"
                      :alt="file.basename"
                    />
                    <ItemIcon v-else :item="file" :ext="true"/>
                  </div>
                  <span class="vuefinder__new_explorer__item-title">{{ title_shorten(file.basename) }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- List View -->
        <template v-else>
          <div
              class="pointer-events-none"
              v-for="rowIndex in visibleRows"
              :key="rowIndex"
              :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${rowHeight}px`,
              transform: `translateY(${rowIndex * rowHeight}px)`,
            }"
          >
            <div class="grid justify-self-start w-full" :style="{ gridTemplateColumns: '1fr' }">
              <div
                  :style="{ opacity: (isDraggingItem(getItemAtRow(rowIndex)?.path || null) || isCut(getItemAtRow(rowIndex)?.path || null)) ? 0.5 : '' }"
                  v-if="getItemAtRow(rowIndex)"
                  :key="getItemAtRow(rowIndex)?.path || rowIndex"
                  :data-key="getItemAtRow(rowIndex)?.path"
                  :data-row="rowIndex"
                  data-col="0"
                  draggable="true"
                  @dragstart="handleItemDragStart"
                  @dragend="handleItemDragEnd"
                  @click="handleItemClick"
                  @dblclick="handleItemDblClick"
                  @contextmenu.prevent="handleItemContextMenu"
                  :class="[
                    'file-item vf-new-explorer-item-list pointer-events-auto',
                    selectedIds.has(getItemAtRow(rowIndex)?.path as never) ? 'vf-new-explorer-selected' : ''
                  ]"
              >
                <div class="vuefinder__new_explorer__item-list-content">
                  <div class="vuefinder__new_explorer__item-list-name">
                    <div class="vuefinder__new_explorer__item-list-icon">
                        <ItemIcon :item="getItemAtRow(rowIndex)!" :small="app.compactListView"/>
                    </div>
                    <span class="vuefinder__new_explorer__item-name">{{ getItemAtRow(rowIndex)?.basename }}</span>
                  </div>
                  <div class="vuefinder__new_explorer__item-size">{{ getItemAtRow(rowIndex)?.file_size ? app.filesize(getItemAtRow(rowIndex)!.file_size!) : '' }}</div>
                  <div class="vuefinder__new_explorer__item-date">
                    {{ getItemAtRow(rowIndex)?.last_modified ? new Date(getItemAtRow(rowIndex)!.last_modified! * 1000).toLocaleString() : '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>


<style>
.selection-area { 
  background: rgba(46, 115, 252, 0.11);
  border: 1px solid rgba(98, 155, 255, 0.85);
  border-radius: 0.15em;
}
</style>
