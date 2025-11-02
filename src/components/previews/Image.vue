<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import { useApp } from '../../composables/useApp';
import useUpload, { QUEUE_ENTRY_STATUS } from '../../composables/useUpload';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { FEATURES } from '../../features';
import LazyLoad from 'vanilla-lazyload';
import { useStore } from '@nanostores/vue';
import type { CurrentPathState } from '../../stores/files';
import type { StoreValue } from 'nanostores';

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = useApp();

const { t } = app.i18n;

const showEdit = ref(false);
const message = ref('');
const isError = ref(false);
const previewUrl = ref(app.adapter.getPreviewUrl({ path: app.modal.data.item.path }));
const tempImageData = ref(previewUrl.value);

// Initialize useUpload for handling cropped image uploads
const { addExternalFiles, upload: uploadFiles, queue } = useUpload(app.customUploader);
const fs = app.fs;
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

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

  // Resize if too large
  let finalCanvas = canvas;
  if (canvas.width > 1200 || canvas.height > 1200) {
    const ratio = Math.min(1200 / canvas.width, 1200 / canvas.height);
    const resized = document.createElement('canvas');
    resized.width = Math.floor(canvas.width * ratio);
    resized.height = Math.floor(canvas.height * ratio);
    const ctx = resized.getContext('2d');
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, resized.width, resized.height);
      finalCanvas = resized;
    }
  }

  // Keep original extension and save
  const originalFilename = app.modal.data.item.basename;
  const extension = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeType =
    extension === 'png' ? 'image/png' : extension === 'gif' ? 'image/gif' : 'image/jpeg';

  const blob = await new Promise<Blob | null>((resolve) => {
    finalCanvas.toBlob((b) => resolve(b), mimeType);
  });

  if (!blob) {
    message.value = t('Failed to save image');
    isError.value = true;
    return;
  }

  message.value = '';
  isError.value = false;

  try {
    const file = new File([blob], originalFilename, { type: mimeType });

    // Extract target folder from the file's path
    const fullPath = app.modal.data.item.path;
    const pathParts = fullPath.split('/');
    pathParts.pop();
    const directoryPath = pathParts.join('/');

    const targetFolder = {
      path: directoryPath || (currentPath.value?.path ?? ''),
    };

    // Add file and upload
    addExternalFiles([file]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const fileEntry = queue.value.find((entry) => entry.name === file.name);
    if (!fileEntry) {
      throw new Error('File was not added to upload queue');
    }

    uploadFiles(targetFolder);

    // Wait for upload to complete
    let attempts = 0;
    while (attempts < 150) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const entry = queue.value.find((e) => e.id === fileEntry.id);
      if (entry?.status === QUEUE_ENTRY_STATUS.DONE) break;
      if (entry?.status === QUEUE_ENTRY_STATUS.ERROR) {
        throw new Error(entry.statusName || 'Upload failed');
      }
      attempts++;
    }

    message.value = t('Updated.');

    // Reload image
    await fetch(previewUrl.value, { cache: 'reload', mode: 'no-cors' });
    const image = app.root?.querySelector?.('[data-src="' + previewUrl.value + '"]');
    if (image && image instanceof HTMLElement) {
      LazyLoad.resetStatus(image);
    }
    app.emitter.emit('vf-refresh-thumbnails');

    await toggleEditMode();
    emit('success');
  } catch (e: unknown) {
    const msg = (e as { message?: string })?.message ?? 'Error';
    message.value = t(msg);
    isError.value = true;
  }
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
        class="vuefinder__image-preview__image h-full w-full"
      />

      <Cropper
        v-else
        ref="cropperRef"
        class="h-full w-full"
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
