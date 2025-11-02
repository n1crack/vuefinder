<script setup lang="ts">
import { onMounted, inject } from 'vue';
import { useApp } from '../../composables/useApp';
import FileSVG from '../../assets/icons/file.svg';

const app = useApp();
const emit = defineEmits(['success']);

onMounted(() => {
  emit('success');
});
</script>

<template>
  <div class="vuefinder__default-preview">
    <div class="vuefinder__default-preview__content">
      <div class="vuefinder__default-preview__header">
        <h3
          id="modal-title"
          class="vuefinder__default-preview__title"
          :title="app.modal.data.item.path"
        >
          {{ app.modal.data.item.basename }}
        </h3>
      </div>
      <div class="vuefinder__default-preview__icon-container">
        <FileSVG class="vuefinder__default-preview__file-icon" />
        <div
          id="modal-title"
          class="vuefinder__default-preview__file-name"
          :title="app.modal.data.item.path"
        >
          {{ app.modal.data.item.basename }}
        </div>
      </div>
    </div>
  </div>
</template>
