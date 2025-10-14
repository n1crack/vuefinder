<script setup lang="ts">
import { computed } from 'vue';
import FileItem from './FileItem.vue';
import type { DirEntry } from '../types';

const props = defineProps<{
  rowIndex: number;
  rowHeight: number;
  view: 'grid' | 'list';
  itemsPerRow?: number;
  items: DirEntry[];
  compact?: boolean;
  showThumbnails?: boolean;
  showPath?: boolean;
  isDraggingItem: (path: string | null) => boolean;
  isSelected: (path: string) => boolean;
  dragNDropEvents: (item: DirEntry) => Record<string, any>;
  explorerId: string;
}>();

const emit = defineEmits<{
  click: [event: Event | MouseEvent | TouchEvent];
  dblclick: [event: MouseEvent | TouchEvent];
  contextmenu: [event: MouseEvent];
  dragstart: [event: DragEvent];
  dragend: [event: DragEvent];
}>();

const rowClasses = computed(() => [
  props.view === 'grid' ? 'vf-explorer-item-grid-row' : 'vf-explorer-item-list-row',
  'pointer-events-none'
]);

const rowStyle = computed(() => ({
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: `${props.rowHeight}px`,
  transform: `translateY(${props.rowIndex * props.rowHeight}px)`
}));

const gridStyle = computed(() => {
  if (props.view === 'grid') {
    return {
      gridTemplateColumns: `repeat(${props.itemsPerRow || 1}, 1fr)`
    };
  }
  return {
    gridTemplateColumns: '1fr'
  };
});

</script>

<template>
  <div
    :class="rowClasses"
    :data-row="rowIndex"
    :style="rowStyle"
  >
    <div 
      class="grid justify-self-start" 
      :class="{ 'w-full': view === 'list' }"
      :style="gridStyle"
    >
      <FileItem
        v-for="(item, colIndex) in items"
        :key="item.path"
        :item="item"
        :view="view"
        :compact="compact"
        :show-thumbnails="showThumbnails"
        :show-path="showPath"
        :is-selected="isSelected(item.path)"
        :is-dragging="isDraggingItem(item.path)"
        :row-index="rowIndex"
        :col-index="colIndex"
        v-on="dragNDropEvents(item)"
        @click="emit('click', $event)"
        @dblclick="emit('dblclick', $event)"
        @contextmenu="emit('contextmenu', $event)"
        @dragstart="emit('dragstart', $event)"
        @dragend="emit('dragend', $event)"
        :explorerId="explorerId"
      />
    </div>
  </div>
</template>
