<template>
  <span class="vuefinder__item-icon">
    <FolderSVG v-if="type === 'dir'" :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
    <FileSVG v-else :class="small ? 'vuefinder__item-icon--small' : 'vuefinder__item-icon--large'" />
  </span>
</template>

<script setup>
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
