<template>
  <div class="absolute -z-50 -top-96">
    <DragSVG />
    <div class="text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs">{{ props.count }}</div>
  </div>
</template>


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
