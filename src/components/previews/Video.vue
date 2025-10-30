<script setup lang="ts">
import { useApp } from '../../composables/useApp';
import { onMounted} from 'vue';

const app = useApp();
const emit = defineEmits(['success']);

const getVideoUrl = () => {
  return app.adapter.getPreviewUrl({ path: app.modal.data.item.path })
}

onMounted(() => {
  emit('success');
});

</script>

<template>
  <div class="vuefinder__video-preview">
    <h3 class="vuefinder__video-preview__title" id="modal-title" :title="app.modal.data.item.path">
      {{ app.modal.data.item.basename }}
    </h3>
    <div>
      <video class="vuefinder__video-preview__video" preload="metadata" controls>
        <source :src="getVideoUrl()" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
