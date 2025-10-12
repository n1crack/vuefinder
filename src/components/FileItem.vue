<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import ItemIcon from './ItemIcon.vue';
import PinSVG from "../assets/icons/pin.svg";
import title_shorten from '../utils/title_shorten';
import type { ServiceContainer, DirEntry } from '../types';

const props = defineProps<{
  item: DirEntry;
  view: 'grid' | 'list';
  compact?: boolean;
  showThumbnails?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
  rowIndex?: number;
  colIndex?: number;
  showPath?: boolean;
  explorerId: string;
}>();

const emit = defineEmits<{
  click: [event: Event | MouseEvent | TouchEvent];
  dblclick: [event: MouseEvent | TouchEvent];
  contextmenu: [event: MouseEvent];
  dragstart: [event: DragEvent];
  dragend: [event: DragEvent];
}>();

const app = inject('ServiceContainer') as ServiceContainer;
const fs = app.fs;
const config = app.config;

const itemClasses = computed(() => [
  'file-item-' + props.explorerId,
  props.view === 'grid' ? 'vf-explorer-item-grid' : 'vf-explorer-item-list',
  props.isSelected ? 'vf-explorer-selected' : ''
]);

const itemStyle = computed(() => ({
  opacity: (props.isDragging || fs.isCut(props.item.path)) ? 0.5 : ''
}));

let touchTimeOut: any = null;
const doubleTapTimeOut = ref<ReturnType<typeof setTimeout> | null>(null);
let tappedTwice = false;

const clearTimeOut = () => {
  if (touchTimeOut) {
    clearTimeout(touchTimeOut);
  }
  draggable.value = true;
}
const draggable = ref(true);

const delayedOpenItem = (event: TouchEvent) => {
    draggable.value = false;
    if (touchTimeOut) {
        event.preventDefault();
        clearTimeout(touchTimeOut); 
    }
    if(!tappedTwice) {
        tappedTwice = true; 
        emit('click', event)
        doubleTapTimeOut.value = setTimeout(() => tappedTwice = false, 300)
    } else {
        tappedTwice = false; 
        emit('dblclick', event)
        clearTimeout(touchTimeOut);
        return false;
    }

    if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
        const rect = (event.currentTarget ).getBoundingClientRect();

         event.preventDefault();
         touchTimeOut = setTimeout(() => { 
             // Calculate optimal position for context menu
             const contextMenuHeight = 146; // Approximate height of context menu
             const padding = 10; // Padding from screen edge
             
             let contextMenuY = rect.y + rect.height;
             
             // If context menu would go below screen, show it above the item
             if (contextMenuY + contextMenuHeight > window.innerHeight - padding) {
                 contextMenuY = rect.y - contextMenuHeight;
             }
             
             // Ensure context menu doesn't go above screen
             if (contextMenuY < padding) {
                 contextMenuY = padding;
             }
             
             const cmEvent = new MouseEvent("contextmenu", {
                 bubbles: true,
                 cancelable: true,
                 view: window,
                 button: 2,
                 buttons: 0,
                 clientX: rect.x,
                 clientY: contextMenuY
             });
             event.target?.dispatchEvent(cmEvent);
         }, 300)
    }
}
</script>

<template>
  <div
    :class="itemClasses"
    :style="itemStyle"
    :data-key="item.path"
    :data-row="rowIndex"
    :data-col="colIndex"
    :draggable="draggable"
    @touchstart="delayedOpenItem($event)"
    @touchend="clearTimeOut()"
    @click="emit('click', $event)"
    @dblclick="emit('dblclick', $event)"
    @contextmenu.prevent.stop="emit('contextmenu', $event)"
    @dragstart="emit('dragstart', $event)"
    @dragend="emit('dragend', $event)"
  >
    <!-- Grid View -->
    <div v-if="view === 'grid'">
      <div class="vuefinder__explorer__item-grid-content">
        <img
          @touchstart="$event.preventDefault()"
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
      <div  class="vuefinder__explorer__item-size">
        <div v-if="item.file_size">{{ app.filesize(item.file_size) }}</div>
      </div>
      <div v-if="!showPath && item.last_modified" class="vuefinder__explorer__item-date">
        {{ new Date(item.last_modified * 1000).toLocaleString() }}
      </div>
    </div>
    <PinSVG class="vuefinder__item--pinned" v-if="config.pinnedFolders.find(pin => pin.path === item.path)"/>
  </div>
</template>
