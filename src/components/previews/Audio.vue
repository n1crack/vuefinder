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

const props = defineProps({
  selection: Object
});

const emit = defineEmits(['load']);

const getAudioUrl = () => {
  return props.selection.url + '?' + buildURLQuery({q:'preview', adapter: props.selection.adapter, path: props.selection.item.path})
}

onMounted(() => {
  emit('load');
});

</script>
