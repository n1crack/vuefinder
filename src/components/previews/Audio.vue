<template>
  <div>
      <audio class="w-full" controls>
          <source :src="getAudioUrl()" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>
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

const getAudioUrl = () => {
  return apiUrl.value + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

</script>
