<script setup lang="ts">
import {ref, onMounted, onUnmounted, reactive, shallowRef, useTemplateRef} from 'vue';
import SelectionArea, {type SelectionEvent} from '@viselect/vanilla';
import useVirtualColumns from '@/composables/useVirtualColumns';
import {generateFiles, getFileIcon, type FileItem} from './temp/NewExplorerUtils';
import { useAutoResetRef } from '@/composables/useAutoResetRef';


const scrollContent = useTemplateRef<HTMLElement>('scrollContent');
const files = ref<FileItem[]>([]);
const selectedIds = reactive(new Set<number>());

const selectionObject = shallowRef<SelectionArea | null>(null);
const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer');
const [awaitingDrag, setAwaitingDrag] = useAutoResetRef(300);

const {
  itemsPerRow,
  totalHeight,
  visibleRows,
  handleScroll,
  getRowItems,
  getItemsInRange,
  getItemPosition
} = useVirtualColumns(files, {
  scrollContainer,
  itemWidth: 120,
  rowHeight: 100,
  overscan: 2,
  containerPadding: 48
});

// Constants for template
const rowHeight = 100;
const totalSelectedItem = ref(0);

// Use getRowItems from composable instead of getRowFiles
const getRowFiles = (rowIndex: number): FileItem[] => {
  return getRowItems(files.value, rowIndex);
};

// Use getItemsInRange from composable
const getItemsInRangeWrapper = (minRow: number, maxRow: number, minCol: number, maxCol: number) => {
  return getItemsInRange(files.value, minRow, maxRow, minCol, maxCol);
};

// Get selection range
const getSelectionRange = (selectionParam: Set<number>) => {
  if (selectionParam.size === 0) {
    return null;
  }

  const ids = Array.from(selectionParam);

  const positions = ids.map(id => getItemPosition(id));

  const minRow = Math.min(...positions.map(p => p.row));
  const maxRow = Math.max(...positions.map(p => p.row));
  const minCol = Math.min(...positions.map(p => p.col));
  const maxCol = Math.max(...positions.map(p => p.col));

  return {minRow, maxRow, minCol, maxCol};
};

const handleSelectAll = () => {
  selectedIds.clear();
  files.value.forEach(f => selectedIds.add(f.id));
};

const extractIds = (els: Element[]): number[] => {
  return els.map(v => v.getAttribute('data-key'))
      .filter(Boolean)
      .map(Number);
};

const selectionData = ref(new Set<number>([]));

const cleanupSelection = (event: SelectionEvent) => {
  event.selection.getSelection().forEach((item: Element) => {
    event.selection.deselect(item, true);
  })
}

const refreshSelection = (event: SelectionEvent) => {
  selectedIds.forEach(id => {
    const el = document.querySelector(`[data-key="${id}"]`);
    if (el) {
      event.selection.select(el, true);
    }
  });
}

const onBeforeDrag = (event: SelectionEvent) => {
  if (!awaitingDrag.value) {
    // we can drag and drop items now..
    return false;
  }
  console.log('onBeforeDrag')
}

const onBeforeStart = (event: SelectionEvent) => {
  console.log('onBeforeStart')

  setAwaitingDrag(true);

  event.selection.resolveSelectables();
  cleanupSelection(event)
  refreshSelection(event)
}

const onStart = ({event, selection}: SelectionEvent) => {

  if (event && 'type' in event && event.type === 'touchend') {
    event.preventDefault();
  }

  const mouse = event as MouseEvent | null;
  if (!mouse?.ctrlKey && !mouse?.metaKey) {
    selectedIds.clear();
    selection.clearSelection(true, true);
  }
  selectionData.value.clear()
};

const onMove = (event: SelectionEvent) => {
  console.log('onMove')
  const selection = event.selection;

  const addedData = extractIds(event.store.changed.added);
  const removedData = extractIds(event.store.changed.removed);

  addedData.forEach(id => {
    if (!selectedIds.has(id)) {
      selectionData.value.add(id)
    }

    selectedIds.add(id)
  });

  removedData.forEach(id => {
    const el = document.querySelector(`[data-key="${id}"]`);
    if (el && files.value.find(file => file.id === id)) {
      selectionData.value.delete(id)
    }

    selectedIds.delete(id);

  });
  selection.resolveSelectables();
  refreshSelection(event)
};

const onStop = (event: SelectionEvent) => {
  console.log('onStop')

  selectSelectionRange(event);
  cleanupSelection(event)
  refreshSelection(event)
  totalSelectedItem.value = selectedIds.size;
}

const selectSelectionRange = (event: SelectionEvent) => {
  if (event.event && selectionData.value.size > 0) {
    const minMaxIds = getSelectionRange(new Set(
        [
          Math.min(...Array.from(selectionData.value)),
          Math.max(...Array.from(selectionData.value))
        ]
    ));

    if (minMaxIds) {
      getItemsInRangeWrapper(minMaxIds.minRow, minMaxIds.maxRow, minMaxIds.minCol, minMaxIds.maxCol).forEach(item => {
        const el = document.querySelector(`[data-key="${item.id}"]`);
        if (!el) {
          if (!selectedIds.has(item.id)) {
            selectedIds.add(item.id);
          } else {
            selectedIds.delete(item.id);
          }
        }
      });
    }
  }
}

onMounted(() => {
   files.value = generateFiles();

  selectionObject.value = new SelectionArea({
    selectables: ['.file-item'],
    boundaries: ['.scroller'],

    behaviour: {
      overlap: 'invert',
      intersect: 'touch',
      startThreshold: 8,
      triggers: [0],
      scrolling: {
        speedDivider: 10,
        manualSpeed: 750,
        startScrollMargins: {x: 0, y: 170}
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

  selectionObject.value.on('beforestart', onBeforeStart);
  selectionObject.value.on('start', onStart);
  selectionObject.value.on('move', onMove);
  selectionObject.value.on('stop', onStop);
  selectionObject.value.on('beforedrag', onBeforeDrag);
});

onUnmounted(() => {
  if (selectionObject.value) {
    selectionObject.value.destroy();
    selectionObject.value = null;
  }
});

// Export functions for external use
defineExpose({
  getItemsInRange: getItemsInRangeWrapper,
  getSelectionRange,
  selectedIds,
  files
});
const containerHeight = ref(500)

const handleItemClick = (event: Event | MouseEvent | TouchEvent) => {
  console.log('handleItemClick')
  const el = event.target?.closest(".file-item");
  const mouse = event as MouseEvent | null;
  if (!mouse?.ctrlKey && !mouse?.metaKey) {
    selectedIds.clear();
    selectionObject.value?.clearSelection(true, true);
  }
  if (el) {
    const id = Number(el.getAttribute('data-key'));
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
    if (selectedIds.size === 0) {

    }
  }
}

const handleItemDblClick = (event: MouseEvent) => {
  console.log('handleItemDblClick')
}

const handleItemContextMenu = (event: MouseEvent) => {
  console.log('handleItemContextMenu')
  event.preventDefault();
}

const handleContentContextMenu = (event: MouseEvent) => {
  console.log('handleContentContextMenu')
  event.preventDefault();
}

const handleItemDragStart = (event: MouseEvent) => {
  if (awaitingDrag.value) {
    event.preventDefault();
    return false;
  } 
  event.dataTransfer.setDragImage(event.target, 0, 15);
  event.dataTransfer.effectAllowed = 'all';
  event.dataTransfer.dropEffect = 'copy';
  event.dataTransfer.setData('items', JSON.stringify(selectedIds.value))
  console.log('handleItemDragStart', selectedIds.value)
};

</script>


<template>
  <div class="w-full  bg-gray-900 flex flex-col max-h-screen" >
    <!-- Toolbar -->
    <div class="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold text-white">File Manager</h1>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <span>{{ files.length }} items</span>
            <template v-if="totalSelectedItem > 0">
              <span>•</span>
              <span class="text-blue-400">{{ totalSelectedItem }} selected</span>
              <template v-if="getSelectionRange(selectionData)">
                <span>•</span>
                <span class="text-green-400">
                   Row {{
                    getSelectionRange(selectionData)?.minRow! + 1
                  }}-{{ getSelectionRange(selectionData)?.maxRow! + 1 }},
                   Col {{
                    getSelectionRange(selectionData)?.minCol! + 1
                  }}-{{ getSelectionRange(selectionData)?.maxCol! + 1 }}
                 </span>
              </template>
            </template>
          </div>
        </div>
        <div class="flex items-center gap-2 text-white">
          <template v-if="selectedIds.size > 0">
            <button @click="selectedIds.clear"
                    class="px-4 py-2 bg-gray-700  rounded hover:bg-gray-600 transition-colors text-sm">
              Clear
            </button>
          </template>
          <button v-else @click="handleSelectAll"
                  class="px-4 py-2 bg-gray-700  rounded hover:bg-gray-600 transition-colors text-sm">
            Select All
          </button>
        </div>
      </div>
    </div>

    <!-- File Grid -->
    <div ref="scrollContainer" class="scroller select-none flex-1 overflow-y-auto p-4 relative max-h-screen"  @scroll="handleScroll">
      <div 
            ref="scrollContent" 
            class="scrollContent" 
            :style="{ height: `${totalHeight}px`, position: 'relative' }"
            @contextmenu.self.prevent="handleContentContextMenu" 
      >
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
          <div :class="`grid gap-4 justify-self-start`" :style="{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }">
            <div
                v-for="(file, colIndex) in getRowFiles(rowIndex)"
                :key="file.id"
                :data-key="file.id"
                :data-row="rowIndex"
                :data-col="colIndex"
                draggable="true"
                @dragstart="handleItemDragStart"
                @click="handleItemClick"
                @dblclick="handleItemDblClick"
                @contextmenu.self.prevent="handleItemContextMenu"
                :class="[
                'file-item flex-shrink-0 w-28 p-2 rounded-lg cursor-pointer transition-all pointer-events-auto',
                selectedIds.has(file.id) 
                  ? 'selected bg-blue-600 shadow-lg scale-105' 
                  : 'bg-gray-800 hover:bg-gray-700 hover:shadow-md'
              ]"
            >
              <div class="flex flex-col items-center gap-1 relative pointer-events-none ">
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  selectedIds.has(file.id) ? 'bg-blue-700' : 'bg-gray-700'
                ]">
                  <component :is="getFileIcon(file.type)" class="w-6 h-6"/>
                </div>
                <div class="w-full text-center">
                  <p :class="[
                    'text-xs font-medium truncate leading-tight',
                    selectedIds.has(file.id) ? 'text-white' : 'text-gray-200'
                  ]">
                    {{ file.name }}
                  </p>
                  <p :class="[
                    'text-xs leading-tight',
                    selectedIds.has(file.id) ? 'text-blue-200' : 'text-gray-500'
                  ]">
                    {{ file.size }}
                  </p>
                </div>
                <div v-if="selectedIds.has(file.id)"
                     class="absolute top-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <svg class="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
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
