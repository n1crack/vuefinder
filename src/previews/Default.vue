<template>
  <div>
    Default view..
  </div>
</template>

<script>
export default {
  name: 'Default.vue'
};
</script>

<script setup>

import {onMounted} from 'vue';

const emit = defineEmits(['load']);

onMounted(() => {
  emit('load');
});
</script>
