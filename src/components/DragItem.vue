<template>
  <div class="vuefinder__drag-item__container">
    <DragSVG />
    <div class="vuefinder__drag-item__count">{{ props.count }}</div>
  </div>
</template>

<style>
.vuefinder__drag-item__container {
  @apply absolute -z-50 -top-96;
}

.vuefinder__drag-item__count {
  @apply text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs;
}
</style>

<script setup>
import { defineProps } from 'vue';
import DragSVG from './icons/drag.svg';
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
});
</script>
