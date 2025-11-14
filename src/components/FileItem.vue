<script setup lang="ts">
import { computed, ref } from 'vue';
import ItemIcon from './ItemIcon.vue';
import PinSVG from '../assets/icons/pin.svg';
import title_shorten from '../utils/title_shorten';
import type { DirEntry } from '../types';
import LockSVG from '../assets/icons/lock.svg';
import { useApp } from '../composables/useApp';
import { useFeature } from '../composables/useFeature';

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

const app = useApp();
const fs = app.fs;
const config = app.config;

const isSelectableByType = computed(() => {
  const filterType = app.selectionFilterType;
  if (!filterType || filterType === 'both') return true;
  return (
    (filterType === 'files' && props.item.type === 'file') ||
    (filterType === 'dirs' && props.item.type === 'dir')
  );
});

const isSelectableByMime = computed(() => {
  const allowed = app.selectionFilterMimeIncludes;
  if (!allowed || !allowed.length) return true;

  // If it's a directory, MIME filters don't apply - it's always selectable
  if (props.item.type === 'dir') return true;

  // For files, check MIME type
  if (!props.item.mime_type) return false;
  return allowed.some((prefix: string) => props.item.mime_type?.startsWith(prefix));
});

const isSelectable = computed(() => isSelectableByType.value && isSelectableByMime.value);

const itemClasses = computed(() => [
  'file-item-' + props.explorerId,
  props.view === 'grid' ? 'vf-explorer-item-grid' : 'vf-explorer-item-list',
  props.isSelected ? 'vf-explorer-selected' : '',
  !isSelectable.value ? 'vf-explorer-item--unselectable' : '',
]);

const itemStyle = computed(() => ({
  opacity: props.isDragging || fs.isCut(props.item.path) || !isSelectable.value ? 0.5 : '',
}));

let touchTimeOut: ReturnType<typeof setTimeout> | null = null;
const doubleTapTimeOut = ref<ReturnType<typeof setTimeout> | null>(null);
let tappedTwice = false;
let contextMenuShown = false;

const { enabled } = useFeature();

const draggable = computed(() => enabled('move'));

const clearTimeOut = () => {
  if (touchTimeOut) {
    clearTimeout(touchTimeOut);
    touchTimeOut = null;
  }
};

const delayedOpenItem = (event: TouchEvent) => {
  // Reset context menu flag on new touch
  contextMenuShown = false;

  if (touchTimeOut) {
    event.preventDefault();
    clearTimeout(touchTimeOut);
    touchTimeOut = null;
  }
  if (!tappedTwice) {
    tappedTwice = true;
    emit('click', event);
    doubleTapTimeOut.value = setTimeout(() => {
      tappedTwice = false;
    }, 300);
  } else {
    tappedTwice = false;
    emit('dblclick', event);
    if (touchTimeOut) {
      clearTimeout(touchTimeOut);
      touchTimeOut = null;
    }
    return false;
  }

  if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
    touchTimeOut = setTimeout(() => {
      // Mark that context menu is being shown
      // contextMenuShown = true;

      // Context menu will be triggered by the normal event flow
      touchTimeOut = null;
    }, 500); // 500ms long press delay for mobile
  }
};

const handleTouchEnd = (event: TouchEvent) => {
  // If context menu was shown, prevent the click event
  if (contextMenuShown) {
    event.preventDefault();
    //contextMenuShown = false;
  }
  clearTimeOut();
};
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
    @touchend="handleTouchEnd($event)"
    @touchmove="clearTimeOut()"
    @click="emit('click', $event)"
    @dblclick="emit('dblclick', $event)"
    @contextmenu.prevent.stop="emit('contextmenu', $event)"
    @dragstart="emit('dragstart', $event)"
    @dragend="emit('dragend', $event)"
  >
    <!-- Grid View -->
    <div v-if="view === 'grid'">
      <LockSVG
        v-if="fs.isReadOnly(item)"
        class="vuefinder__item--readonly vuefinder__item--readonly--left"
        title="Read Only"
      />
      <div class="vuefinder__explorer__item-grid-content">
        <img
          v-if="(item.mime_type ?? '').startsWith('image') && showThumbnails"
          src="data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          class="vuefinder__explorer__item-thumbnail lazy"
          :data-src="item.previewUrl ?? app.adapter.getPreviewUrl({ path: item.path })"
          :alt="item.basename"
          @touchstart="$event.preventDefault()"
        />
        <ItemIcon v-else :item="item" :ext="true">
          <template #icon="slotProps">
            <slot name="icon" v-bind="slotProps" />
          </template>
        </ItemIcon>
      </div>
      <span class="vuefinder__explorer__item-title">{{ title_shorten(item.basename) }}</span>
    </div>

    <!-- List View -->
    <div v-else class="vuefinder__explorer__item-list-content">
      <div class="vuefinder__explorer__item-list-name">
        <div class="vuefinder__explorer__item-list-icon">
          <ItemIcon :item="item" :small="compact">
            <template #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </ItemIcon>
        </div>
        <span class="vuefinder__explorer__item-name">{{ item.basename }}</span>
        <div>
          <LockSVG
            v-if="fs.isReadOnly(item)"
            class="vuefinder__item--readonly vuefinder__item--readonly--list"
            title="Read Only"
          />
        </div>
      </div>
      <div v-if="showPath" class="vuefinder__explorer__item-path">{{ item.path }}</div>
      <div v-if="!showPath" class="vuefinder__explorer__item-size">
        <div v-if="item.file_size">{{ app.filesize(item.file_size) }}</div>
      </div>
      <div v-if="!showPath && item.last_modified" class="vuefinder__explorer__item-date">
        {{ new Date(item.last_modified * 1000).toLocaleString() }}
      </div>
    </div>
    <PinSVG
      v-if="
        enabled('pinned') && config.get('pinnedFolders').find((pin: any) => pin.path === item.path)
      "
      class="vuefinder__item--pinned"
    />
  </div>
</template>
