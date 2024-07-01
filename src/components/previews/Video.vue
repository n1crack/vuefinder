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

<style>
.vuefinder__video-preview__title {
  @apply mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400;
}

.vuefinder .vuefinder__video-preview__video {
  @apply w-full aspect-video;
}
</style>

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

