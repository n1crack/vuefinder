<script setup lang="ts">
import DragSVG from '../assets/icons/drag.svg';

const props = defineProps<{
  count: number;
}>();
</script>

<template>
  <div class="vuefinder__drag-item__container">
    <DragSVG
      v-if="props.count > 1"
      class="vuefinder__drag-item__icon translate-x-1 translate-y-1"
    />
    <DragSVG class="vuefinder__drag-item__icon" />
    <div class="vuefinder__drag-item__count">{{ props.count }}</div>
  </div>
</template>
