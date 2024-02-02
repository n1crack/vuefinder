<template>
  <div class="flex">
    <div class="mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title"
         :aria-label="app.modal.data.item.path" data-microtip-position="bottom-right" role="tooltip">
      {{ app.modal.data.item.basename }}
    </div>
    <div class="ml-auto mb-2">
      <button @click="save" class="ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm" v-if="showEdit">
        {{ t('Save') }}</button>
      <button class="ml-1 px-2 py-1  text-blue-500" @click="editMode()" v-if="app.features.includes(FEATURES.EDIT)">{{ showEdit ? t('Cancel'): t('Edit') }}</button>
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
import Message from '../Message.vue';
import {FEATURES} from "../features.js";

const emit = defineEmits(['success'])
const content = ref('');
const contentTemp = ref('');
const editInput = ref(null);
const showEdit = ref(false);

const message = ref('');
const isError = ref(false);

const app = inject('ServiceContainer');

const {t} = app.i18n;

onMounted(() => {
  app.requester.send({
    url: '',
    method: 'get',
    params: {q: 'preview', adapter: app.modal.data.adapter, path: app.modal.data.item.path},
    responseType: 'text',
  })
      .then(data => {
        content.value = data;
        emit('success');
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

const save = () => {
  message.value = '';
  isError.value = false;

  app.requester.send({
    url: '',
    method: 'post',
    params: {
      q: 'save',
      adapter: app.modal.data.adapter,
      path: app.modal.data.item.path,
    },
    body: {
      content: contentTemp.value
    },
    responseType: 'text',
  })
      .then(data => {
        message.value = t('Updated.');
        content.value = data;
        emit('success');
        showEdit.value = !showEdit.value;
      })
      .catch((e) => {
        message.value = t(e.message);
        isError.value = true;
      });
}

</script>
