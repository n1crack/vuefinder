<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ selection.item.basename }}</h3>
  <div>
    Default view..
  </div>
</template>

<script setup>

import {onMounted} from 'vue';

const emit = defineEmits(['load']);

onMounted(() => {
  emit('load');
});
</script>
