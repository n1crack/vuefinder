<template>
  <div class="vuefinder__item-icon" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'">
    <component v-if="comp" :is="comp.is" v-bind="comp.props || {}" />
    <FolderSVG v-else-if="item.type === 'dir'" />
    <FileSVG v-else />
    <div class="vuefinder__item-icon__extension"
        v-if="!comp && ext && item.type !== 'dir' && item.extension" >
      {{ item.extension.substring(0, 3) }}
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import FileSVG from '@/assets/icons/file.svg';
import FolderSVG from '@/assets/icons/folder.svg';

/** @template T; @typedef {import("vue").PropType<T>} PropType<T> */

const props = defineProps({
  item: {
    /** @type {PropType<import('../types').DirEntry>} */
    type: Object,
    required: true
  },

  ext: {
    type: Boolean,
    default: false
  },

  small: {
    type: Boolean,
    default: false
  }
})

const app = inject('ServiceContainer')
const comp = app.customIcon?.(app, props.item)

</script>
