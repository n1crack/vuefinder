<script setup lang="ts">
import DragSVG from '../assets/icons/drag.svg';

const props = defineProps<{
  count?: number
}>()
</script>

<template>
  <div class="vuefinder__drag-item__container">
    <DragSVG/>
    <div class="vuefinder__drag-item__count">{{ props.count }}</div>
  </div>
</template>
