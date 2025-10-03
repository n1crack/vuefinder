<script setup lang="ts">
import {ref, onMounted, reactive, shallowRef} from 'vue';
import {SelectionArea, type SelectionEvent} from '@viselect/vue';
import useVirtualColumns from '@/composables/useVirtualColumns';
import {generateFiles, getFileIcon, type FileItem} from './temp/NewExplorerUtils';
// Refs
const scrollContent = ref(null);
const files = ref<FileItem[]>([]);
const selectedIds = reactive(new Set<number>());
const selectionObject = shallowRef<typeof SelectionArea>();

// Use virtual columns composable
const {
  scrollContainer,
  itemsPerRow,
  totalHeight,
  visibleRows,
  handleScroll,
  getRowItems,
  getItemsInRange,
  getItemPosition
} = useVirtualColumns(files, {
  itemWidth: 120,
  rowHeight: 100,
  overscan: 2,
  containerPadding: 48
});

// Constants for template
const rowHeight = 100;

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

// updateItemsPerRow and handleScroll are now provided by the composable

const handleSelectAll = () => {
  selectedIds.clear();
  files.value.forEach(f => selectedIds.add(f.id));
};

const extractIds = (els: Element[]): number[] => {
  return els.map(v => v.getAttribute('data-key'))
      .filter(Boolean)
      .map(Number);
};

const selectionData = reactive({
  current: new Set([]),
} as {
  current: Set<number>
});

const cleanupSelection = (event: SelectionEvent) => {
  event.selection.getSelection().forEach((item: Element) => {
    if (!item.isConnected) {
      event.selection.deselect(item, true);
    }
  })
}

const refreshSelection = (event: SelectionEvent) => {
  console.log(selectedIds.size)
  selectedIds.forEach(id => {
    const el = document.querySelector(`[data-key="${id}"]`);
    if (el) {
      event.selection.select(el, true);
    }
  });
}

const onBeforeStart = (event: SelectionEvent) => {
  event.selection.resolveSelectables();
  cleanupSelection(event)
//   refreshSelection(selection)
}

const onStart = ({event, selection}: SelectionEvent) => {
  if (!event?.ctrlKey && !event?.metaKey) {
    selection.clearSelection();
    selectedIds.clear();
  }
  selectionData.current.clear()
};

const onMove = (event: SelectionEvent) => {

  const selection = event.selection;

  const addedData = extractIds(event.store.changed.added);
  const removedData = extractIds(event.store.changed.removed);

  addedData.forEach(id => {
    if (!selectedIds.has(id)) {
      selectionData.current.add(id)
    }

    selectedIds.add(id)
  });


  removedData.forEach(id => {
    const el = document.querySelector(`[data-key="${id}"]`);
    if (el && files.value.find(file => file.id === id)) {
      selectionData.current.delete(id)
    }

    selectedIds.delete(id);

  });
  selection.resolveSelectables();
  refreshSelection(event)
};

const onStop = (event: SelectionEvent) => {

  if (event.event && selectionData.current.size > 0) {
    const minMaxIds = getSelectionRange(new Set(
        [
          Math.min(...Array.from(selectionData.current)),
          Math.max(...Array.from(selectionData.current))
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

const onInit = (selection: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  selectionObject.value = selection
}

onMounted(() => {
  files.value = generateFiles();
});

// Export functions for external use
defineExpose({
  getItemsInRange: getItemsInRangeWrapper,
  getSelectionRange,
  selectedIds,
  files
});

</script>


<template>
  <div class="w-full max-h-[400px] bg-gray-900 flex flex-col ">
    <!-- Toolbar -->
    <div class="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold text-white">File Manager</h1>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <span>{{ files.length }} items</span>
            <template v-if="selectedIds.size > 0">
              <span>•</span>
              <span class="text-blue-400">{{ selectedIds.size }} selected</span>
              <template v-if="getSelectionRange(selectionData.current)">
                <span>•</span>
                <span class="text-green-400">
                   Row {{
                    getSelectionRange(selectionData.current)?.minRow! + 1
                  }}-{{ getSelectionRange(selectionData.current)?.maxRow! + 1 }},
                   Col {{
                    getSelectionRange(selectionData.current)?.minCol! + 1
                  }}-{{ getSelectionRange(selectionData.current)?.maxCol! + 1 }}
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
    <div ref="scrollContainer" class="scroller select-none flex-1 overflow-auto p-6 relative  " @scroll="handleScroll">
      <SelectionArea
          :options="{ selectables: '.file-item', boundaries: ['.scroller'] }"
          @init="onInit"
          @start="onStart"
          @move="onMove"
          @stop="onStop"
          @beforeStart="onBeforeStart"
      >
        <div class="scrollContent" ref="scrollContent" :style="{ height: `${totalHeight}px`, position: 'relative' }">
          <div
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
            <div :class="`grid gap-4`" :style="{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }">
              <div
                  v-for="(file, colIndex) in getRowFiles(rowIndex)"
                  :key="file.id"
                  :data-key="file.id"
                  :data-row="rowIndex"
                  :data-col="colIndex"
                  :class="[
                  'file-item flex-shrink-0 w-28 p-2 rounded-lg cursor-pointer transition-all',
                  selectedIds.has(file.id) 
                    ? 'selected bg-blue-600 shadow-lg scale-105' 
                    : 'bg-gray-800 hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <div class="flex flex-col items-center gap-1 relative">
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
      </SelectionArea>
    </div>
  </div>
  <div class="text-xs">{{ selectionData.current }}</div>
  <div class="text-xs">{{ selectedIds }}</div>
</template>


<style>
.selection-area {
  background: rgba(46, 115, 252, 0.11);
  border: 1px solid rgba(98, 155, 255, 0.85);
  border-radius: 0.15em;
}
</style>
