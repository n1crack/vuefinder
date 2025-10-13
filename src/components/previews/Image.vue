<script setup lang="ts">
import Cropper from 'cropperjs';
import {inject, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef} from 'vue';
import {FEATURES} from "../../features";

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = inject('ServiceContainer');

const {t} = app.i18n;

const containerEl = useTemplateRef<HTMLDivElement | null>('containerEl');
const cropper = ref<InstanceType<typeof Cropper> | null>(null);
const showEdit = ref(false);
const message = ref('');
const isError = ref(false);

const initCropper = async () => {
  if (!containerEl.value) return;
  const image = new Image();
  image.src = app.requester.getPreviewUrl(app.modal.data.storage, app.modal.data.item);
  image.alt = 'Picture';
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Image load failed'));
  });
  (cropper.value as unknown as { destroy?: () => void })?.destroy?.();
  cropper.value = null;
  cropper.value = new Cropper(image as unknown as HTMLImageElement, {
    container: containerEl.value
  } as unknown as Record<string, unknown>);
};

const editMode = async () => {
  showEdit.value = !showEdit.value;
  await nextTick();
  if (showEdit.value) await initCropper();
  else {
    (cropper.value as unknown as { destroy?: () => void })?.destroy?.();
    cropper.value = null;
  }
};

const crop = async () => {
  if (!cropper.value) {
    await initCropper();
  }
  const cnv = cropper.value?.getCropperCanvas();

  if (!cnv) return;
  cnv.toBlob((blob: Blob | null) => {
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
        path: app.modal.data.item.path,
      },
      body,
    })
        .then(() => {
          message.value = t('Updated.');
          editMode();
          emit('success');
        })
        .catch((e: unknown) => {
          const err = (e as { message?: string })?.message ?? 'Error';
          message.value = t(err);
          isError.value = true;
        });
  });
};

onMounted(() => {
  emit('success');
});

onBeforeUnmount(() => {
  (cropper.value as unknown as { destroy?: () => void })?.destroy?.();
  cropper.value = null;
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

    <div class="vuefinder__image-preview__image-container h-[50vh]">
      <img v-if="!showEdit" class="vuefinder__image-preview__image w-full h-full object-contain"
           :src="app.requester.getPreviewUrl(app.modal.data.storage, app.modal.data.item)" alt="">

      <div v-else ref="containerEl" class="vuefinder__image-preview__image w-full h-full" style="position: relative;"></div>
    </div>

    <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>
  </div>
</template> 