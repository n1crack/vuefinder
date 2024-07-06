<template>
  <div class="vuefinder__text-preview">
    <div class="vuefinder__text-preview__header">
      <div class="vuefinder__text-preview__title" id="modal-title" :title="app.modal.data.item.path">
        {{ app.modal.data.item.basename }}
      </div>
      <div class="vuefinder__text-preview__actions">
        <button @click="save" class="vuefinder__text-preview__save-button" v-if="showEdit">
          {{ t('Save') }}
        </button>
        <button class="vuefinder__text-preview__edit-button" @click="editMode()" v-if="app.features.includes(FEATURES.EDIT)">
          {{ showEdit ? t('Cancel') : t('Edit') }}
        </button>
      </div>
    </div>
    <div>
      <pre v-if="!showEdit" class="vuefinder__text-preview__content">{{ content }}</pre>
      <div v-else>
        <textarea
          ref="editInput"
          v-model="contentTemp"
          class="vuefinder__text-preview__textarea"
          name="text"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <message v-if="message.length" @hidden="message=''" :error="isError">{{ message }}</message>
    </div>
  </div>
</template>

<script setup>

import {inject, onMounted, ref} from 'vue';
import Message from '../Message.vue';
import {FEATURES} from "../../features.js";

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
