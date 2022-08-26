<template>
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
