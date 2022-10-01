<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="selection.item.path" data-microtip-position="bottom-right" role="tooltip">{{ selection.item.basename }}</h3>
  <div>
    <video class="w-full" preload controls>
      <source :src="getVideoUrl()" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import buildURLQuery from '../../utils/buildURLQuery.js';
import {useApiUrl} from '../../composables/useApiUrl.js';
const {apiUrl} = useApiUrl();
const props = defineProps({
  selection: Object
});

const emit = defineEmits(['load']);

const getVideoUrl = () => {
  return apiUrl.value + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

const test = (event) => {
  console.log(event);
};

</script>

