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
import {inject, onMounted} from 'vue';
const props = defineProps({
  selection: Object
});

const emit = defineEmits(['load']);
/** @type {import('../utils/ajax.js').Requester} */
const requester = inject('requester');
const getVideoUrl = () => {
  return requester.getPreviewUrl(props.selection.adapter, props.selection.item.path)
}

onMounted(() => {
  emit('load');
});

</script>

