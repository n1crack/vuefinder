<script setup lang="ts">
import {inject, onMounted, ref} from 'vue';
import {FEATURES} from "../../features";
import CropperCanvas from './CropperCanvas.vue';

defineOptions({ name: 'ImagePreview' });

const emit = defineEmits(['success']);
const app = inject('ServiceContainer');

const {t} = app.i18n;

const cropperRef = ref<{ getCroppedBlob: (options?: { width?: number; height?: number }) => Promise<Blob | null> } | null>(null);
const showEdit = ref(false);
const message = ref('');
const isError = ref(false);

const editMode = () => {
  showEdit.value = !showEdit.value;
  // No manual instance needed with web components
};

const crop = () => {
  cropperRef.value?.getCroppedBlob({ width: 795, height: 341 }).then((blob) => {
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

      <CropperCanvas v-if="showEdit" ref="cropperRef"
                     :src="app.requester.getPreviewUrl(app.modal.data.storage, app.modal.data.item)"
                     class="vuefinder__image-preview__image w-full h-full"></CropperCanvas>
    </div>

    <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>
  </div>
</template>
