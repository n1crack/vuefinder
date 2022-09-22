<template>
  <div class="flex">
    <h3 class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">{{ selection.item.basename }}</h3>
    <div class="ml-auto mb-2">
      <button @click="crop" class="ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" v-if="showEdit">
        {{ t('Crop') }}</button>
      <button class="ml-1 px-2 py-1  text-blue-500" @click="editMode()">{{ showEdit ? t('Cancel'): t('Edit') }}</button>
    </div>
  </div>

  <div class="w-full flex justify-center">
    <img ref="image" class="max-w-[60vh] max-h-[60vh]" :src="getImageUrl(props.selection.adapter, props.selection.item.path)" alt="">
  </div>
</template>

<script setup>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {ref} from 'vue';
import ajax from '../../utils/ajax.js';
import {getImageUrl} from '../../utils/getImageUrl.js';

const props = defineProps({
  selection: Object
});

const {t} = inject('i18n');

const emit = defineEmits(['load']);

const image = ref(null);
const cropper = ref(null);
const showEdit = ref(false);

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
            ajax(apiUrl.value, {
              method: 'POST',
              params: {q: 'upload', adapter: props.selection.adapter, path: props.selection.item.path, file: blob},
              name: props.selection.item.basename,
              json: false
            })
                .then(data => {
                  image.value.src = getImageUrl(props.selection.adapter, props.selection.item.path);
                  editMode();
                  emit('load');
                })
                .catch((e) => console.log(e.statusText));


          });
};

onMounted(() => {
  emit('load');
});

</script>
