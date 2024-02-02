<template>
  <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="app.modal.data.item.path" data-microtip-position="bottom-right" role="tooltip">{{ app.modal.data.item.basename }}</h3>
  <div>
      <audio class="w-full" controls>
          <source :src="getAudioUrl()" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>
  </div>
</template>

<script setup>

import {inject, onMounted} from 'vue';

const emit = defineEmits(['success']);

const app = inject('ServiceContainer');

const getAudioUrl = () => {
  return app.requester.getPreviewUrl(app.modal.data.adapter, app.modal.data.item)
}

onMounted(() => {
  emit('success');
});

</script>
