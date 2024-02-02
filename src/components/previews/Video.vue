<template>
<div>
    <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="app.modal.data.item.path" data-microtip-position="bottom-right" role="tooltip">{{ app.modal.data.item.basename }}</h3>
  <div>
    <video class="w-full" preload controls>
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

