<template>
  <div class="relative flex h-full overflow-auto min-h-[100px]  resize-y w-full ">

    <div class="w-full bg-amber-400" v-if="view=='grid'">
      Grid
    </div>

    <div class="w-full bg-cyan-300" v-if="view=='list'">
      List
    </div>

  </div>
</template>


<script>
export default {
  name: 'VFExplorer'
};
</script>


<script setup>
defineProps({
  view: {
    type: String
  }
});
</script>
