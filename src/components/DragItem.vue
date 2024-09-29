<template>
  <div class="vuefinder__drag-item__container">
    <DragSVG />
    <div class="vuefinder__drag-item__count">{{ props.count }}</div>
  </div>
</template>

<script setup>
import DragSVG from './icons/drag.svg';
const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
});
</script>
