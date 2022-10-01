<template>
  <div class="flex">
    <div class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="selection.item.path" data-microtip-position="bottom-right" role="tooltip">
      {{ selection.item.basename }}
    </div>
    <div class="ml-auto mb-2">
      <button @click="save" class="ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" v-if="showEdit">
        {{ t('Save') }}</button>
      <button class="ml-1 px-2 py-1  text-blue-500" @click="editMode()">{{ showEdit ? t('Cancel'): t('Edit') }}</button>
    </div>
  </div>
  <div>
    <pre v-if="!showEdit" class="p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto">{{ content }}</pre>
    <div v-else>
      <textarea
          ref="editInput"
          v-model="contentTemp"
          class="w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs" name="text" id="" cols="30" rows="10"></textarea>

    </div>
    <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>
  </div>
</template>

<script setup>

import {inject, nextTick, onMounted, ref} from 'vue';
import ajax from '../../utils/ajax.js';
import {useApiUrl} from '../../composables/useApiUrl.js';
import Message from '../Message.vue';

const emit = defineEmits(['load'])
const content = ref('');
const contentTemp = ref('');
const editInput = ref(null);
const showEdit = ref(false);
const {apiUrl} = useApiUrl();
const props = defineProps({
  selection: Object
});
const message = ref('');
const isError = ref(false);

const {t} = inject('i18n');

onMounted(() => {
  ajax(apiUrl.value, {
    params: {q: 'preview', adapter: props.selection.adapter, path: props.selection.item.path},
    json: false
  })
      .then(data => {
        content.value = data;
        emit('load');
      });
});

const editMode = () => {
  showEdit.value = !showEdit.value;
  contentTemp.value = content.value;
  if (showEdit.value == true) {
    nextTick(() => {
      editInput.value.focus();
    });
  }
};

const postData = inject('postData');

const save = () => {
  message.value = '';
  isError.value = false;

  ajax(apiUrl.value, {
    method: 'POST',
    params: Object.assign(postData, {
      q: 'save',
      adapter: props.selection.adapter,
      path: props.selection.item.path,
      content: contentTemp.value
    }),
    json: false,
  })
      .then(data => {
        message.value = t('Updated.');
        content.value = data;
        emit('load');
        showEdit.value = !showEdit.value;
      })
      .catch((e) => {
        message.value = t(e.message);
        isError.value = true;
      });
}

</script>
