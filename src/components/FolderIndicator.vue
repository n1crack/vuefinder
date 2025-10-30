<script setup lang="ts">
import SquarePlusSVG from '../assets/icons/plus.svg';
import SquareMinusSVG from '../assets/icons/minus.svg';

const model = defineModel();
</script>

<template>
  <div class="vuefinder__folder-indicator">
    <div class="vuefinder__folder-indicator--icon">
      <SquareMinusSVG v-if="model" class="vuefinder__folder-indicator--minus" />
      <SquarePlusSVG v-if="!model" class="vuefinder__folder-indicator--plus" />
    </div>
  </div>
</template>
