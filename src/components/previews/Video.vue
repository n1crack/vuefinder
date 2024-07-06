<template>
  <div class="vuefinder__video-preview">
    <h3 class="vuefinder__video-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <video class="vuefinder__video-preview__video" preload controls>
        <source :src="getVideoUrl()" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted} from 'vue';

const app = inject("ServiceContainer");
const emit = defineEmits(['success']);

const getVideoUrl = () => {
  return app.requester.getPreviewUrl(app.modal.data.adapter, app.modal.data.item)
}

onMounted(() => {
  emit('success');
});

</script>

