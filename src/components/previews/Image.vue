<template>
  <div class="flex">
    <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="selection.item.path" data-microtip-position="bottom-right" role="tooltip">{{ selection.item.basename }}</h3>
    <div class="ml-auto mb-2">
      <button @click="crop" class="ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" v-if="showEdit">
        {{ t('Crop') }}</button>
      <button class="ml-1 px-2 py-1  text-blue-500" @click="editMode()" v-if="features.includes(FEATURES.EDIT)">{{ showEdit ? t('Cancel'): t('Edit') }}</button>
    </div>
  </div>

  <div class="w-full flex justify-center">
    <img ref="image" class="max-w-[50vh] max-h-[50vh]" :src="requester.getPreviewUrl(props.selection.adapter, props.selection.item)" alt="">
  </div>

  <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>

</template>

<script setup>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {inject, onMounted, ref} from 'vue';
import Message from '../Message.vue';
import {FEATURES} from "../features.js";

const emit = defineEmits(['load']);

const props = defineProps({
  selection: Object
});

const {t} = inject('i18n');
/** @type {import('../../utils/ajax.js').Requester} */
const requester = inject('requester');
/** @type {import('vue').Ref<String[]>} */
const features = inject('features');

const image = ref(null);
const cropper = ref(null);
const showEdit = ref(false);
const message = ref('');
const isError = ref(false);

const editMode = () => {
  showEdit.value = !showEdit.value;

  if (showEdit.value) {
    cropper.value = new Cropper(image.value, {
      crop(event) {
      },
    });
  } else {
    cropper.value.destroy();
  }
};

const crop = () => {
  cropper.value
      .getCroppedCanvas({
        width: 795,
        height: 341
      })
      .toBlob(
          blob => {
            message.value = '';
            isError.value = false;
            const body = new FormData();
            body.set('file', blob);
            requester.send({
              url: '',
              method: 'post',
              params: {
                q: 'upload',
                adapter: props.selection.adapter,
                path: props.selection.item.path,
              },
              body,
            })
                .then(data => {
                  message.value = t('Updated.');
                  image.value.src = requester.getPreviewUrl(props.selection.adapter, props.selection.item);
                  editMode();
                  emit('load');
                })
                .catch((e) => {
                  message.value = t(e.message);
                  isError.value = true;
                });
          });
};

onMounted(() => {
  emit('load');
});

</script>
