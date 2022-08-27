<template>
  <div class="w-full flex justify-center">
    <img class="max-w-[350px] max-h-[350px]" :src="getImageUrl()" alt="">
  </div>
</template>

<script setup>
import buildURLQuery from '../../utils/buildURLQuery.js';
import {useApiUrl} from '../../composables/useApiUrl.js';
const {apiUrl} = useApiUrl();
const props = defineProps({
  selection: Object
});
const emit = defineEmits(['load']);

const getImageUrl = () => {
  return apiUrl.value + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

</script>
