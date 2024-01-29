<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="selection.item.path" data-microtip-position="bottom-right" role="tooltip">{{ selection.item.basename }}</h3>
  <div>
      <audio class="w-full" controls>
          <source :src="getAudioUrl()" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>
  </div>
</template>

<script setup>

import {inject, onMounted} from 'vue';
const props = defineProps({
  selection: Object
});

/** @type {import('../../utils/ajax.js').Requester} */
const requester = inject('requester');
const emit = defineEmits(['load']);

const getAudioUrl = () => {
  return requester.getPreviewUrl(props.selection.adapter, props.selection.item.path)
}

onMounted(() => {
  emit('load');
});

</script>
