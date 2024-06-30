<template>
  <div class="vuefinder__folder-indicator">
    <div class="vuefinder__folder-indicator--icon">
      <SquareMinusSVG class="vuefinder__folder-indicator--minus" v-if="model" />
      <SquarePlusSVG class="vuefinder__folder-indicator--plus" v-if="!model" />
    </div>
  </div>
</template>

<style>
.vuefinder__folder-indicator {
  @apply h-5 w-5 shrink-0;
}

.vuefinder__folder-indicator--icon {
  @apply cursor-pointer;
}

.vuefinder__folder-indicator--minus {
  @apply text-gray-600;
}

.vuefinder__folder-indicator--plus {
  @apply text-gray-400;
}
</style>


<script setup>
import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";

const model = defineModel();

</script>

