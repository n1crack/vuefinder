<script setup lang="ts">
import Cropper from 'cropperjs';
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';

type GetBlobOptions = { width?: number; height?: number };

const props = defineProps<{
  src: string;
  class?: string;
}>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
const cropper = ref<Cropper | null>(null);

const init = async () => {
  if (!canvasEl.value) return;

  // Ensure canvas has some size before initializing cropper
  await nextTick();

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = props.src;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Image load failed'));
  });

  const context = canvasEl.value.getContext('2d');
  if (!context) return;

  // Size canvas to image dimensions to avoid 0x0 issues
  canvasEl.value.width = img.naturalWidth || img.width;
  canvasEl.value.height = img.naturalHeight || img.height;
  context.drawImage(img, 0, 0);

  cropper.value = new Cropper(canvasEl.value, {});
};

onMounted(() => {
  init().catch(() => {});
});

onBeforeUnmount(() => {
  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }
});

watch(() => props.src, () => {
  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }
  init().catch(() => {});
});

const getCroppedBlob = (options?: GetBlobOptions) => {
  return new Promise<Blob | null>((resolve) => {
    if (!cropper.value) return resolve(null);
    const cnv = (cropper.value as any).getCroppedCanvas?.(options);
    if (!cnv) return resolve(null);
    cnv.toBlob((blob: Blob | null) => resolve(blob));
  });
};

defineExpose({ getCroppedBlob });
</script>

<template>
  <cropper-canvas background ref="canvasEl" :class="props.class">
  <cropper-image :src="src"
   alt="Picture" style="width: 100%;" rotatable scalable skewable translatable></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="select" plain></cropper-handle>
  <cropper-selection initial-coverage="0.5" movable resizable>
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-crosshair centered></cropper-crosshair>
    <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
    <cropper-handle action="n-resize"></cropper-handle>
    <cropper-handle action="e-resize"></cropper-handle>
    <cropper-handle action="s-resize"></cropper-handle>
    <cropper-handle action="w-resize"></cropper-handle>
    <cropper-handle action="ne-resize"></cropper-handle>
    <cropper-handle action="nw-resize"></cropper-handle>
    <cropper-handle action="se-resize"></cropper-handle>
    <cropper-handle action="sw-resize"></cropper-handle>
  </cropper-selection>
</cropper-canvas>
</template>


