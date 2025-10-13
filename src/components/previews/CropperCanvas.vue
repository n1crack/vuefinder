<script setup lang="ts">
import 'cropperjs';
import { ref } from 'vue';

type GetBlobOptions = { width?: number; height?: number };

const props = defineProps<{
  src: string;
  canvasClass?: string;
}>();

type CropperCanvasEl = HTMLElement & {
  getCropperCanvas: (options?: { width?: number; height?: number }) => HTMLCanvasElement | undefined;
};

const canvasEl = ref<CropperCanvasEl | null>(null);

const getCroppedBlob = (options?: GetBlobOptions) => {
  return new Promise<Blob | null>((resolve) => {
    const cnv = canvasEl.value?.getCropperCanvas(options);
    if (!cnv) return resolve(null);
    cnv.toBlob((blob: Blob | null) => resolve(blob));
  });
};

defineExpose({ getCroppedBlob });
</script>

<template>
  <cropper-canvas :src="src" background ref="canvasEl" :class="props.canvasClass">
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
 


