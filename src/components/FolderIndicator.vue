<template>
  <div class="h-5 w-5 shrink-0">
    <div class=" cursor-pointer">
      <SquareMinusSVG class="text-gray-600" v-if="model" />
      <SquarePlusSVG class="text-gray-400" v-if="!model" />
    </div>
  </div>
</template>


<script setup>
import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";

const model = defineModel();

</script>

