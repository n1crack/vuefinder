<script setup lang="ts">
import { inject, computed } from 'vue';
import ItemIcon from './ItemIcon.vue';
import title_shorten from '@/utils/title_shorten';
import type { ServiceContainer, DirEntry } from '@/types';

const props = defineProps<{
  item: DirEntry;
  view: 'grid' | 'list';
  compact?: boolean;
  showThumbnails?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
  isCut?: boolean;
  rowIndex?: number;
  colIndex?: number;
  showPath?: boolean;
}>();

const emit = defineEmits<{
  click: [event: Event | MouseEvent | TouchEvent];
  dblclick: [event: MouseEvent];
  contextmenu: [event: MouseEvent];
  dragstart: [event: DragEvent];
  dragend: [event: DragEvent];
}>();

const app = inject('ServiceContainer') as ServiceContainer;

const itemClasses = computed(() => [
  'file-item',
  props.view === 'grid' ? 'vf-explorer-item-grid' : 'vf-explorer-item-list',
  'pointer-events-auto',
  props.isSelected ? 'vf-explorer-selected' : ''
]);

const itemStyle = computed(() => ({
  opacity: (props.isDragging || props.isCut) ? 0.5 : ''
}));

const handleClick = (event: Event | MouseEvent | TouchEvent) => {
  emit('click', event);
};

const handleDblClick = (event: MouseEvent) => {
  emit('dblclick', event);
};

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  emit('contextmenu', event);
};

const handleDragStart = (event: DragEvent) => {
  emit('dragstart', event);
};

const handleDragEnd = (event: DragEvent) => {
  emit('dragend', event);
};
</script>

<template>
  <div
    :class="itemClasses"
    :style="itemStyle"
    :data-key="item.path"
    :data-row="rowIndex"
    :data-col="colIndex"
    draggable="true"
    @click="handleClick"
    @dblclick="handleDblClick"
    @contextmenu.prevent="handleContextMenu"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <!-- Grid View -->
    <div v-if="view === 'grid'">
      <div class="vuefinder__explorer__item-grid-content">
        <img
          v-if="(item.mime_type ?? '').startsWith('image') && showThumbnails"
          src="data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          class="vuefinder__explorer__item-thumbnail lazy"
          :data-src="app.requester.getPreviewUrl(item.storage, item)"
          :alt="item.basename"
        />
        <ItemIcon v-else :item="item" :ext="true"/>
      </div>
      <span class="vuefinder__explorer__item-title">{{ title_shorten(item.basename) }}</span>
    </div>

    <!-- List View -->
    <div v-else class="vuefinder__explorer__item-list-content">
      <div class="vuefinder__explorer__item-list-name">
        <div class="vuefinder__explorer__item-list-icon">
          <ItemIcon :item="item" :small="compact"/>
        </div>
        <span class="vuefinder__explorer__item-name">{{ item.basename }}</span>
      </div>
      <div v-if="showPath" class="vuefinder__explorer__item-path">{{ item.path }}</div>
      <div v-else-if="item.file_size" class="vuefinder__explorer__item-size">
        {{ app.filesize(item.file_size) }}
      </div>
      <div v-if="!showPath && item.last_modified" class="vuefinder__explorer__item-date">
        {{ new Date(item.last_modified * 1000).toLocaleString() }}
      </div>
    </div>
  </div>
</template>
