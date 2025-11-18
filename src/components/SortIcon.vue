<script setup lang="ts">
import AscSVG from '../assets/icons/asc.svg';
import DescSVG from '../assets/icons/desc.svg';

defineProps<{
  direction?: string;
}>();
</script>

<template>
  <div>
    <AscSVG v-if="direction === 'asc'" class="vuefinder__explorer__sort-icon" />
    <DescSVG v-if="direction === 'desc'" class="vuefinder__explorer__sort-icon" />
  </div>
</template>
