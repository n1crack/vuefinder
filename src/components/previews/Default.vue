<template>
  <div class="flex">
    <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="selection.item.path" data-microtip-position="bottom-right" role="tooltip">{{ selection.item.basename }}</h3>
  </div>
  <div></div>
</template>

<script setup>

import {onMounted} from 'vue';

const emit = defineEmits(['load']);

const props = defineProps({
  selection: Object
});

onMounted(() => {
  emit('load');
});
</script>
