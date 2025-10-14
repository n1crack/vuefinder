<script setup lang="ts">
import {inject, onMounted, ref, useTemplateRef} from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {FEATURES} from "../../features";
import LazyLoad from 'vanilla-lazyload';

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = inject('ServiceContainer');

const {t} = app.i18n;

const showEdit = ref(false);
const message = ref('');
const isError = ref(false);
const previewUrl = ref(app.requester.getPreviewUrl(app.modal.data.storage, app.modal.data.item));
const tempImageData = ref(previewUrl.value);

const cropperRef = useTemplateRef<{ getResult: (options?: { size?: { width?: number; height?: number }; fillColor?: string }) => { canvas?: HTMLCanvasElement } } | null>('cropperRef');

const editMode = async () => {
  showEdit.value = !showEdit.value;
};

const crop = async () => { 
  const result = cropperRef.value?.getResult({ size: { width: 795, height: 341 }, fillColor: '#ffffff' });
  const canvas = result?.canvas;
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    message.value = '';
    isError.value = false;
    const body = new FormData();
    body.set('file', blob);
    app.requester.send({
      url: '',
      method: 'post',
      params: {
        q: 'upload',
        storage: app.modal.data.storage,
        adapter: app.modal.data.storage,
        path: app.modal.data.item.path,
      },
      body,
    })
        .then(() => {
          message.value = t('Updated.');
          fetch(previewUrl.value, {cache: 'reload', mode: 'no-cors'})
          const image = app.root.querySelector('[data-src="'+previewUrl.value+'"]');
          LazyLoad.resetStatus(image);
          app.emitter.emit('vf-refresh-thumbnails');
          
          editMode();
          emit('success');
        })
        .catch((e: unknown) => {
          const msg = (e as { message?: string })?.message ?? 'Error';
          message.value = t(msg);
          isError.value = true;
        });
  });
};

onMounted(() => {
  emit('success');
});

</script>

<template>
  <div class="vuefinder__image-preview">
    <div class="vuefinder__image-preview__header">
      <h3 class="vuefinder__image-preview__title" id="modal-title" :title="app.modal.data.item.path">
        {{ app.modal.data.item.basename }}
      </h3>
      <div class="vuefinder__image-preview__actions">
        <button @click="crop" class="vuefinder__image-preview__crop-button" v-if="showEdit">
          {{ t('Crop') }}
        </button>
        <button class="vuefinder__image-preview__edit-button" @click="editMode()"
                v-if="app.features.includes(FEATURES.EDIT)">
          {{ showEdit ? t('Cancel') : t('Edit') }}
        </button>
      </div>
    </div>

    <div class="vuefinder__image-preview__image-container h-[50vh] w-full">
      <img v-if="!showEdit" style="width: 100%; height: 100%;" :src="app.requester.getPreviewUrl(app.modal.data.storage, app.modal.data.item)" 
        class="vuefinder__image-preview__image w-full h-full" />

      <Cropper v-else ref="cropperRef"
               class="w-full h-full"
               crossorigin="anonymous"
               :src="tempImageData"
               :stencil-props="{ aspectRatio: 795/341 }"
               :auto-zoom="true"
               :priority="'image'"
               :transitions="true"
      />
    </div>

    <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>
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