<template>
  <div>
    <AscSVG v-if="direction==='asc'" />
    <DescSVG v-if="direction==='desc'" />
  </div>
</template>

<script setup>
import AscSVG from './icons/asc.svg';
import DescSVG from './icons/desc.svg';

defineProps({direction: String});
</script>
