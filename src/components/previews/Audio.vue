<template>
  <div class="vuefinder__audio-preview">
    <h3 class="vuefinder__audio-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <audio class="vuefinder__audio-preview__audio" controls>
        <source :src="getAudioUrl()" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
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
