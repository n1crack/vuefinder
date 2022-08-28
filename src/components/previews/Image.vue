<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ selection.item.basename }}</h3>
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
