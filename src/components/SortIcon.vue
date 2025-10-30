<script setup lang="ts">
import AscSVG from '../assets/icons/asc.svg';
import DescSVG from '../assets/icons/desc.svg';

defineProps<{
  direction?: string;
}>();
</script>

<template>
  <div>
    <AscSVG v-if="direction === 'asc'" />
    <DescSVG v-if="direction === 'desc'" />
  </div>
</template>
