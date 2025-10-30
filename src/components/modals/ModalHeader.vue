<script setup lang="ts">

defineProps<{
  title: string
  icon: any
}>()

</script>

<template>
  <div class="vuefinder__modal-header">
    <div class="vuefinder__modal-header__icon-container">
      <component :is="icon" class="vuefinder__modal-header__icon"></component>
    </div>
    <div class="vuefinder__modal-header__title" id="modal-title">{{ title }}</div>
  </div>
</template>

