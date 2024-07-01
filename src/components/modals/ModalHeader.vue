<template>
  <div class="vuefinder__modal-header">
    <div class="vuefinder__modal-header__icon-container">
      <component :is="icon" class="vuefinder__modal-header__icon"></component>
    </div>
    <h3 class="vuefinder__modal-header__title" id="modal-title">{{ title }}</h3>
  </div>
</template>

<style>
.vuefinder__modal-header {
  @apply flex items-center my-1 space-x-2;
}

.vuefinder__modal-header__icon-container {
  @apply flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10;
}

.vuefinder .vuefinder__modal-header__icon {
  @apply p-0.5 h-6 w-6 stroke-blue-600 dark:stroke-blue-100;
}

.vuefinder__modal-header__title {
  @apply text-lg leading-6 font-medium text-gray-900 dark:text-gray-400;
}
</style>

<script setup>

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
})

</script>
