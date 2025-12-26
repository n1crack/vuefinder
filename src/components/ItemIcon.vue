<script setup lang="ts">
import { computed } from 'vue';
import { useApp } from '../composables/useApp';
import FileSVG from '../assets/icons/file.svg';
import FolderSVG from '../assets/icons/folder.svg';

import type { DirEntry } from '../types';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';

const props = defineProps<{
  item: DirEntry;
  ext?: boolean;
  small?: boolean;
  view?: 'grid' | 'list';
}>();

const app = useApp();
const configState: StoreValue<ConfigState> = useStore(app.config.state);

// Determine icon size based on view mode and props
const iconSize = computed(() => {
  // If small prop is explicitly set, use it
  if (props.small !== undefined) {
    return props.small ? 'small' : 'large';
  }
  // Otherwise, determine from view mode
  // Default to 'small' if view is 'list', otherwise 'large'
  return props.view === 'list' ? 'small' : 'large';
});

// Icon style with CSS variables for responsive sizing
// Force reactivity by accessing configState.value properties directly
const iconStyle = computed(() => {
  const size = iconSize.value;
  // Access configState.value to ensure reactivity
  const listIconSize = configState.value?.listIconSize;
  const gridIconSize = configState.value?.gridIconSize;
  const gridItemWidth = configState.value?.gridItemWidth;
  const gridItemHeight = configState.value?.gridItemHeight;

  // Explicitly check view prop first to ensure correct size
  if (props.view === 'list' || size === 'small') {
    // Use listIconSize from config, with fallback
    const iconSizeValue = listIconSize ?? 16;
    return {
      '--vf-icon-size': `${iconSizeValue}px`,
    };
  } else {
    // For grid view, use configured gridIconSize or fallback to default (48px)
    // Default matches DEFAULT_PERSISTENCE_STATE.gridIconSize
    const iconSizeValue = gridIconSize ?? 48;
    return {
      '--vf-icon-size': `${iconSizeValue}px`,
    };
  }
});

// Scoped slot için gerekli verileri hazırla
const slotData = {
  app,
  config: configState.value,
  item: props.item,
  view: props.view,
};
</script>

<template>
  <div
    class="vuefinder__item-icon"
    :class="{
      'vuefinder__item-icon--small': iconSize === 'small',
      'vuefinder__item-icon--large': iconSize === 'large',
      'vuefinder__item-icon--grid': view === 'grid',
      'vuefinder__item-icon--list': view === 'list',
    }"
    :style="iconStyle"
  >
    <!-- Scoped slot ile custom icon desteği -->
    <slot name="icon" v-bind="slotData">
      <!-- Default icon'lar -->
      <FolderSVG v-if="item.type === 'dir'" class="vuefinder__item-icon__folder" />
      <FileSVG v-else class="vuefinder__item-icon__file" />
      <div
        v-if="ext && item.type !== 'dir' && item.extension"
        class="vuefinder__item-icon__extension"
      >
        {{ item.extension.substring(0, 3) }}
      </div>
    </slot>
  </div>
</template>
