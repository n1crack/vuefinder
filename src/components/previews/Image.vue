<script setup lang="ts">
import { inject, onMounted, ref, useTemplateRef } from 'vue';
import { useApp } from '../../composables/useApp';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { FEATURES } from '../../features';
import LazyLoad from 'vanilla-lazyload';

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = useApp();

const { t } = app.i18n;

const showEdit = ref(false);
const message = ref('');
const isError = ref(false);
const previewUrl = ref(app.adapter.getPreviewUrl({ path: app.modal.data.item.path }));
const tempImageData = ref(previewUrl.value);

const cropperRef = useTemplateRef<{
  getResult: (options?: { size?: { width?: number; height?: number }; fillColor?: string }) => {
    canvas?: HTMLCanvasElement;
  };
} | null>('cropperRef');

const toggleEditMode = async () => {
  showEdit.value = !showEdit.value;
  app.modal.setEditMode(showEdit.value);
};

const crop = async () => {
  const result = cropperRef.value?.getResult({
    size: { width: 795, height: 341 },
    fillColor: '#ffffff',
  });
  const canvas = result?.canvas;
  if (!canvas) return;
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    message.value = '';
    isError.value = false;

    try {
      // Convert blob to File
      const file = new File([blob], app.modal.data.item.basename, { type: 'image/png' });

      // Extract path from full path
      const fullPath = app.modal.data.item.path;
      const pathParts = fullPath.split('/');
      const filename = pathParts.pop();
      const path = pathParts.join('/');

      // Upload using adapter
      await (app.adapter as any).upload({
        path,
        files: [file],
      });

      message.value = t('Updated.');
      fetch(previewUrl.value, { cache: 'reload', mode: 'no-cors' });
      const image = app.root?.querySelector?.('[data-src="' + previewUrl.value + '"]');
      if (image && image instanceof HTMLElement) {
        LazyLoad.resetStatus(image);
      }
      app.emitter.emit('vf-refresh-thumbnails');

      toggleEditMode();
      emit('success');
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? 'Error';
      message.value = t(msg);
      isError.value = true;
    }
  });
};

onMounted(() => {
  emit('success');
});
</script>

<template>
  <div class="vuefinder__image-preview">
    <div class="vuefinder__image-preview__header">
      <h3
        id="modal-title"
        class="vuefinder__image-preview__title"
        :title="app.modal.data.item.path"
      >
        {{ app.modal.data.item.basename }}
      </h3>
      <div class="vuefinder__image-preview__actions">
        <button v-if="showEdit" class="vuefinder__image-preview__crop-button" @click="crop">
          {{ t('Crop') }}
        </button>
        <button
          v-if="app.features.includes(FEATURES.EDIT)"
          class="vuefinder__image-preview__edit-button"
          @click="toggleEditMode()"
        >
          {{ showEdit ? t('Cancel') : t('Edit') }}
        </button>
      </div>
    </div>

    <div class="vuefinder__image-preview__image-container">
      <img
        v-if="!showEdit"
        style=""
        :src="app.adapter.getPreviewUrl({ path: app.modal.data.item.path })"
        class="vuefinder__image-preview__image w-full h-full"
      />

      <Cropper
        v-else
        ref="cropperRef"
        class="w-full h-full"
        crossorigin="anonymous"
        :src="tempImageData"
        :auto-zoom="true"
        :priority="'image'"
        :transitions="true"
      />
    </div>

    <message v-if="message.length" :error="isError" @hidden="message = ''">{{ message }}</message>
  </div>
</template>

<style>
.cropper-viewers {
  margin-top: 0.5rem;
}

.cropper-viewers > cropper-viewer {
  border: 1px solid var(--vp-c-divider);
  display: inline-block;
  margin-right: 0.25rem;
}
</style>
