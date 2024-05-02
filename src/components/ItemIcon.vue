<template>
  <span>
    <FileSVG  v-if="type === 'dir'" :class="{'h-5 w-5': small, 'h-10 w-10 md:h-12 md:w-12 m-auto': !small}" />
    <FolderSVG  v-else :class="{'h-5 w-5': small, 'h-10 w-10 md:h-12 md:w-12 m-auto': !small}" />
  </span>
</template>

<script setup>
import {defineProps} from "vue";
import FileSVG from './icons/file.svg';
import FolderSVG from './icons/folder.svg';

defineProps({
  type: {
    type: String,
    required: true
  },

  small: {
    type: Boolean,
    default: false
  }
})

</script>
