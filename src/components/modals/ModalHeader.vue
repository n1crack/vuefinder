<template>
  <div class="vuefinder__modal-header">
    <div class="vuefinder__modal-header__icon-container">
      <component :is="icon" class="vuefinder__modal-header__icon"></component>
    </div>
    <h3 class="vuefinder__modal-header__title" id="modal-title">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  icon: any
}>()

</script>
