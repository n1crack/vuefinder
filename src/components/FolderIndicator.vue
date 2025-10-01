<template>
  <div class="vuefinder__folder-indicator">
    <div class="vuefinder__folder-indicator--icon">
      <SquareMinusSVG class="vuefinder__folder-indicator--minus" v-if="model" />
      <SquarePlusSVG class="vuefinder__folder-indicator--plus" v-if="!model" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SquarePlusSVG from "@/assets/icons/plus.svg";
import SquareMinusSVG from "@/assets/icons/minus.svg";

const model = defineModel();

</script>

