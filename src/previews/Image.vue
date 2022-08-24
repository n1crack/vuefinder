<template>
  <img :src="getImageUrl()" alt="">
</template>

<script>
export default {
  name: 'Image.vue'
};
</script>

<script setup>

const props = defineProps({
  selection: Object
});
const emit = defineEmits(['load'])

const buildURLQuery = obj => Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

const getImageUrl = () => {
  return props.selection.url + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

</script>
