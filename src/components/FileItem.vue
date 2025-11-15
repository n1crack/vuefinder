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
  contextmenu: [event: MouseEvent | TouchEvent];
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
let longPressTimeout: ReturnType<typeof setTimeout> | null = null;
let touchStartEvent: TouchEvent | null = null;
let touchStartElement: HTMLElement | null = null;
let longPressTriggered = false;
const isLongPressActive = ref(false);

const { enabled } = useFeature();

// Detect if device is touch-capable
const isTouchDevice =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const draggable = computed(() => {
  // On touch devices, disable drag completely to prevent conflicts with long-press
  if (isTouchDevice) {
    return false;
  }
  // Disable drag during long-press to prevent drag from starting
  if (isLongPressActive.value) {
    return false;
  }
  return enabled('move');
});

const clearTouchTimeout = () => {
  if (touchTimeOut) {
    clearTimeout(touchTimeOut);
    touchTimeOut = null;
  }
};

const clearLongPressTimeout = (clearValues: boolean = true) => {
  if (longPressTimeout) {
    clearTimeout(longPressTimeout);
    longPressTimeout = null;
  }

  // Only clear values if explicitly requested (not when called from timeout)
  if (clearValues) {
    touchStartEvent = null;
    touchStartElement = null;
    longPressTriggered = false;
    isLongPressActive.value = false;
  }
};

const handleTouchStart = (event: TouchEvent) => {
  // Clear any existing long-press timeout first
  if (longPressTimeout) {
    clearTimeout(longPressTimeout);
    longPressTimeout = null;
  }

  // Store the original event and element reference
  touchStartEvent = event;
  const target = event.currentTarget as HTMLElement;
  touchStartElement = target;

  // Reset flags
  longPressTriggered = false;
  isLongPressActive.value = true;

  // Stop propagation to prevent parent handlers from interfering
  event.stopPropagation();
  event.stopImmediatePropagation();

  // Set long-press timeout (500ms is standard for context menu)
  longPressTimeout = setTimeout(() => {
    // Store references before clearing to avoid race conditions
    const eventToUse = touchStartEvent;
    const elementToUse = touchStartElement;
    const timeoutId = longPressTimeout;

    // Check if timeout was already cleared
    if (!timeoutId || timeoutId !== longPressTimeout) {
      return;
    }

    if (eventToUse && elementToUse) {
      longPressTriggered = true;

      // Prevent default click behavior and drag
      if (eventToUse.cancelable) {
        eventToUse.preventDefault();
      }
      eventToUse.stopPropagation();

      // Emit context menu event with the touch event
      emit('contextmenu', eventToUse);

      // Clear values after emitting
      touchStartEvent = null;
      touchStartElement = null;
      isLongPressActive.value = false;
    }

    // Clear timeout
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      longPressTimeout = null;
    }
  }, 500);
};

const handleTouchEnd = (event: TouchEvent) => {
  // If long-press was triggered, prevent click event
  if (longPressTriggered) {
    event.preventDefault();
    event.stopPropagation();
    clearLongPressTimeout();
    return;
  }

  // Store timeout reference to check if it's still valid
  const currentTimeout = longPressTimeout;

  // Don't clear timeout immediately - wait a bit to see if long-press fires
  // This prevents race condition where touchend fires before timeout
  setTimeout(() => {
    // Only clear if timeout is still the same (wasn't already cleared or replaced)
    if (currentTimeout === longPressTimeout && !longPressTriggered) {
      // Clear long-press timeout since touch ended before long-press
      clearLongPressTimeout();

      // Process as normal click/double-click
      delayedOpenItem(event);
    }
  }, 100);
};

const handleTouchMove = (event: TouchEvent) => {
  // Only cancel long-press if user moves finger significantly
  // Small movements should be allowed for long-press
  if (touchStartEvent) {
    const startTouch = touchStartEvent.touches[0] || touchStartEvent.changedTouches[0];
    const currentTouch = event.touches[0] || event.changedTouches[0];

    if (startTouch && currentTouch) {
      const deltaX = Math.abs(currentTouch.clientX - startTouch.clientX);
      const deltaY = Math.abs(currentTouch.clientY - startTouch.clientY);
      const threshold = 15; // pixels - increased threshold for iOS

      // Only cancel if movement is significant
      if (deltaX > threshold || deltaY > threshold) {
        clearLongPressTimeout();
      }
    }
  }
};

const handleClick = (event: MouseEvent) => {
  // On touch devices, ignore click events that come from touch
  // (they will be handled by touch event handlers)
  if (isTouchDevice) {
    return;
  }
  emit('click', event);
};

const handleDragStart = (event: DragEvent) => {
  // Prevent drag if long-press is active or was just triggered
  if (isLongPressActive.value || longPressTriggered) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  emit('dragstart', event);
};

const delayedOpenItem = (event: TouchEvent) => {
  if (touchTimeOut) {
    event.preventDefault();
    clearTouchTimeout();
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
    clearTouchTimeout();
    return false;
  }
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
    @touchstart.capture="handleTouchStart($event)"
    @touchend.capture="handleTouchEnd($event)"
    @touchmove.capture="handleTouchMove"
    @touchcancel.capture="() => clearLongPressTimeout()"
    @click="handleClick"
    @dblclick="emit('dblclick', $event)"
    @contextmenu.prevent.stop="emit('contextmenu', $event)"
    @dragstart="handleDragStart"
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
