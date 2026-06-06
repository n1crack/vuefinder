<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { usePreviewControls } from '../../composables/usePreviewControls';
import useUpload, { QUEUE_ENTRY_STATUS } from '../../composables/useUpload';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';
import { dataUrlToBlob } from '../../utils/imageEditor';
import LazyLoad from 'vanilla-lazyload';
import { useStore } from '@nanostores/vue';
import ImageEditor from './ImageEditor.vue';
import type { CurrentPathState } from '../../stores/files';
import type { StoreValue } from 'nanostores';
import type { DirEntry } from '../../types';

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = useApp();
const notify = createNotifier(app);
const { enabled } = useFeature();

const { t } = app.i18n;

const showEdit = ref(false);
const previewUrl = ref(
  app.modal.data.item.previewUrl ?? app.adapter.getPreviewUrl({ path: app.modal.data.item.path })
);
// Working bitmap during an edit session. Initialised from previewUrl on
// enterEdit, updated by each tab's Apply, uploaded on Save. Outside the
// edit session it equals previewUrl.
const workingDataUrl = ref(previewUrl.value);
// True once at least one Apply has run — drives the chrome's dirty chip
// + bottom Save button enable state.
const workingDirty = ref(false);
const zoom = ref(1);
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const imageContainer = ref<HTMLElement | null>(null);
const imageWidth = ref(0);
const imageHeight = ref(0);
const fitScale = ref(1);
const isPanning = ref(false);
const panX = ref(0);
const panY = ref(0);
let resizeObserver: ResizeObserver | null = null;
let panStartX = 0;
let panStartY = 0;
let initialPanX = 0;
let initialPanY = 0;

// Initialize useUpload for handling cropped image uploads
const { addExternalFiles, upload: uploadFiles, queue } = useUpload(app.customUploader);
const fs = app.fs;
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const renderedWidth = computed(() => imageWidth.value * fitScale.value);
const renderedHeight = computed(() => imageHeight.value * fitScale.value);

const clampPan = (x: number, y: number) => {
  const containerWidth = imageContainer.value?.clientWidth ?? 0;
  const containerHeight = imageContainer.value?.clientHeight ?? 0;
  const maxPanX = Math.max(0, (renderedWidth.value * zoom.value - containerWidth) / 2);
  const maxPanY = Math.max(0, (renderedHeight.value * zoom.value - containerHeight) / 2);

  return {
    x: Math.min(maxPanX, Math.max(-maxPanX, x)),
    y: Math.min(maxPanY, Math.max(-maxPanY, y)),
  };
};

const previewImageStyle = computed(() => {
  if (!imageWidth.value || !imageHeight.value) {
    return {};
  }

  const { x, y } = clampPan(panX.value, panY.value);

  return {
    width: `${renderedWidth.value}px`,
    height: `${renderedHeight.value}px`,
    transform: `translate(${x}px, ${y}px) scale(${zoom.value})`,
    transformOrigin: 'center center',
  };
});

const updateFitScale = () => {
  if (!imageContainer.value || !imageWidth.value || !imageHeight.value) return;

  const bounds = imageContainer.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  fitScale.value = Math.min(bounds.width / imageWidth.value, bounds.height / imageHeight.value);
};

const handleImageLoad = (event: Event) => {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;

  imageWidth.value = target.naturalWidth || target.clientWidth;
  imageHeight.value = target.naturalHeight || target.clientHeight;
  updateFitScale();
};

const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

const zoomIn = () => {
  zoom.value = clampZoom(Number((zoom.value + ZOOM_STEP).toFixed(2)));
  const nextPan = clampPan(panX.value, panY.value);
  panX.value = nextPan.x;
  panY.value = nextPan.y;
};

const zoomOut = () => {
  zoom.value = clampZoom(Number((zoom.value - ZOOM_STEP).toFixed(2)));
  const nextPan = clampPan(panX.value, panY.value);
  panX.value = nextPan.x;
  panY.value = nextPan.y;
};

const resetZoom = () => {
  zoom.value = 1;
  panX.value = 0;
  panY.value = 0;
};

const handleWheelZoom = (event: WheelEvent) => {
  if (showEdit.value) return;
  if (event.deltaY > 0) {
    zoomOut();
  } else if (event.deltaY < 0) {
    zoomIn();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (showEdit.value) return;

  // Ignore when the user is typing in an input or contenteditable element.
  const target = event.target as HTMLElement | null;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target?.isContentEditable
  ) {
    return;
  }

  const isZoomInKey = event.key === '=' || event.key === '+';
  const isZoomOutKey = event.key === '-' || event.key === '_';
  const isResetKey = event.key === '0';

  if (!isZoomInKey && !isZoomOutKey && !isResetKey) return;

  event.preventDefault();

  if (isZoomInKey) {
    zoomIn();
    return;
  }

  if (isZoomOutKey) {
    zoomOut();
    return;
  }

  resetZoom();
};

const stopPanning = () => {
  isPanning.value = false;
};

const startPanning = (event: PointerEvent) => {
  if (showEdit.value || zoom.value <= 1 || !imageContainer.value) return;

  isPanning.value = true;
  panStartX = event.clientX;
  panStartY = event.clientY;
  initialPanX = panX.value;
  initialPanY = panY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);
};

const handlePanning = (event: PointerEvent) => {
  if (!isPanning.value) return;

  const deltaX = event.clientX - panStartX;
  const deltaY = event.clientY - panStartY;
  const nextPan = clampPan(initialPanX + deltaX, initialPanY + deltaY);
  panX.value = nextPan.x;
  panY.value = nextPan.y;
};

// Contract → chrome. Image edit mode is a multi-tab session (Crop, Rotate,
// Grayscale, Adjust). Each tab's Apply mutates workingDataUrl and flips
// workingDirty to true; commitEdit (= bottom Save button) uploads the
// final working bitmap, overwriting the original file.
usePreviewControls({
  isEditable: computed(
    () => enabled('edit') && !app.fs.isReadOnly(app.modal.data.item as DirEntry)
  ),
  isEditing: computed(() => showEdit.value),
  isDirty: computed(() => showEdit.value && workingDirty.value),
  primaryActionLabel: computed(() => t('Save')),
  enterEdit: () => {
    workingDataUrl.value = previewUrl.value;
    workingDirty.value = false;
    showEdit.value = true;
    app.modal.setEditMode(true);
  },
  commitEdit: () => save(),
  cancelEdit: () => {
    showEdit.value = false;
    workingDataUrl.value = previewUrl.value;
    workingDirty.value = false;
    app.modal.setEditMode(false);
  },
  extraInfo: computed(() => {
    if (!imageWidth.value || !imageHeight.value) return [];
    return [{ label: t('Dimensions'), value: `${imageWidth.value} × ${imageHeight.value}` }];
  }),
});

const onEditorUpdate = (next: string) => {
  workingDataUrl.value = next;
  workingDirty.value = true;
};

const save = async () => {
  if (!workingDirty.value) return;

  const originalFilename = app.modal.data.item.basename;
  const extension = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeType =
    extension === 'png' ? 'image/png' : extension === 'gif' ? 'image/gif' : 'image/jpeg';

  try {
    const blob = await dataUrlToBlob(workingDataUrl.value);
    const file = new File([blob], originalFilename, { type: mimeType });

    const fullPath = app.modal.data.item.path;
    const pathParts = fullPath.split('/');
    pathParts.pop();
    const directoryPath = pathParts.join('/');

    const targetFolder = {
      path: directoryPath || (currentPath.value?.path ?? ''),
    };

    addExternalFiles([file]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const fileEntry = queue.value.find((entry) => entry.name === file.name);
    if (!fileEntry) {
      throw new Error('File was not added to upload queue');
    }

    uploadFiles(targetFolder);

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

    notify.success(t('Updated.'));

    // Bust the browser cache for the source image so the modal and
    // thumbnails reload the freshly saved bytes.
    await fetch(previewUrl.value, { cache: 'reload', mode: 'no-cors' });
    const image = app.root?.querySelector?.('[data-src="' + previewUrl.value + '"]');
    if (image && image instanceof HTMLElement) {
      LazyLoad.resetStatus(image);
    }
    app.emitter.emit('vf-refresh-thumbnails');

    // Exit edit mode and drop the working bitmap.
    showEdit.value = false;
    workingDirty.value = false;
    workingDataUrl.value = previewUrl.value;
    app.modal.setEditMode(false);
    emit('success');
  } catch (e: unknown) {
    notify.error(getErrorMessage(e, t('Failed to save image')));
  }
};

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    updateFitScale();
  });

  if (imageContainer.value) {
    resizeObserver.observe(imageContainer.value);
  }

  window.addEventListener('keydown', handleKeydown);
  emit('success');
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  resizeObserver?.disconnect();
});
</script>

<template>
  <div class="vuefinder__image-preview">
    <div ref="imageContainer" class="vuefinder__image-preview__image-container">
      <div
        v-if="!showEdit"
        class="vuefinder__image-preview__stage"
        @wheel.prevent="handleWheelZoom"
      >
        <img
          :style="previewImageStyle"
          :src="
            app.modal.data.item.previewUrl ??
            app.adapter.getPreviewUrl({ path: app.modal.data.item.path })
          "
          class="vuefinder__image-preview__image"
          :class="{
            'vuefinder__image-preview__image--zoomed': zoom > 1,
            'vuefinder__image-preview__image--panning': isPanning,
          }"
          :draggable="false"
          @load="handleImageLoad"
          @pointerdown="startPanning"
          @pointermove="handlePanning"
          @pointerup="stopPanning"
          @pointercancel="stopPanning"
          @lostpointercapture="stopPanning"
        />

        <div class="vuefinder__image-preview__zoom-controls" @pointerdown.stop @wheel.stop>
          <button
            type="button"
            class="vuefinder__image-preview__zoom-button"
            :aria-label="t('Zoom out')"
            :title="t('Zoom out')"
            @click="zoomOut"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="8" y1="11" x2="14" y2="11"></line>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
          </button>
          <button
            type="button"
            class="vuefinder__image-preview__zoom-reset"
            :aria-label="t('Reset zoom')"
            :title="t('Reset zoom')"
            @click="resetZoom"
          >
            {{ Math.round(zoom * 100) }}%
          </button>
          <button
            type="button"
            class="vuefinder__image-preview__zoom-button"
            :aria-label="t('Zoom in')"
            :title="t('Zoom in')"
            @click="zoomIn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
          </button>
        </div>
      </div>

      <ImageEditor
        v-else
        :src="workingDataUrl"
        :filename="app.modal.data.item.basename"
        @update:src="onEditorUpdate"
      />
    </div>
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
