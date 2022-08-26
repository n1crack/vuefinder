<template>
  <img class="max-w-[350px] max-h-[350px]" :src="getImageUrl()" alt="">
</template>

<script setup>
import buildURLQuery from '../../utils/buildURLQuery.js';

const props = defineProps({
  selection: Object
});
const emit = defineEmits(['load'])

const getImageUrl = () => {
  return props.selection.url + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

</script>
