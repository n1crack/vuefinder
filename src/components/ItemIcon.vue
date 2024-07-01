<template>
  <span class="vuefinder__item-icon">
    <FolderSVG v-if="type === 'dir'" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
    <FileSVG v-else :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
  </span>
</template>

<style>
.vuefinder__item-icon--small {
  @apply h-5 w-5;
}

.vuefinder__item-icon--large {
  @apply h-10 w-10 md:h-12 md:w-12 m-auto;
}
</style>

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
