<script setup lang="ts">
import {inject, onMounted, ref} from 'vue';
import {FEATURES} from "../../features.ts";
import type { AdapterManager } from "../../adapters";

const emit = defineEmits(['success'])
const content = ref('');
const contentTemp = ref('');
const editInput = ref(null);
const showEdit = ref(false);

const message = ref('');
const isError = ref(false);

const app = inject('ServiceContainer');

const {t} = app.i18n;

onMounted(async () => {
  try {
    const result = await (app.adapter as AdapterManager).getContent({ path: app.modal.data.item.path });
    content.value = result.content;
    emit('success');
  } catch (error) {
    console.error('Failed to load text content:', error);
    emit('success');
  }
});

const toggleEditMode = () => {
  showEdit.value = !showEdit.value;
  contentTemp.value = content.value;
  app.modal.setEditMode(showEdit.value);
};

const save = async () => {
  message.value = '';
  isError.value = false;

  try {
    // Convert content to blob and upload using adapter
    const blob = new Blob([contentTemp.value], { type: 'text/plain' });
    const file = new File([blob], app.modal.data.item.basename, { type: 'text/plain' });
    
    // Extract path from full path
    const fullPath = app.modal.data.item.path;
    const pathParts = fullPath.split('/');
    pathParts.pop(); // Remove filename
    const path = pathParts.join('/');
    
    await app.adapter.upload({ 
      path, 
      files: [file] 
    });
    
    message.value = t('Updated.');
    content.value = contentTemp.value;
    emit('success');
    showEdit.value = !showEdit.value;
  } catch (e: unknown) {
    const error = e as { message?: string };
    message.value = t(error.message || 'Error');
    isError.value = true;
  }
}

</script>

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
        <button class="vuefinder__text-preview__edit-button" @click="toggleEditMode()"
                v-if="app.features.includes(FEATURES.EDIT)">
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
