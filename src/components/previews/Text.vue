<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';

const emit = defineEmits(['success']);
const content = ref('');
const contentTemp = ref('');
const editInput = ref(null);
const showEdit = ref(false);

const message = ref('');
const isError = ref(false);

const app = useApp();
const { enabled } = useFeature();

const { t } = app.i18n;

onMounted(async () => {
  try {
    const result = await app.adapter.getContent({ path: app.modal.data.item.path });
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
    // Save content using adapter
    const fullPath = app.modal.data.item.path;
    await app.adapter.save({
      path: fullPath,
      content: contentTemp.value,
    });
    content.value = contentTemp.value;
    message.value = t('Updated.');
    emit('success');
    showEdit.value = !showEdit.value;
  } catch (e: unknown) {
    const error = e as { message?: string };
    message.value = t(error.message || 'Error');
    isError.value = true;
  }
};
</script>

<template>
  <div class="vuefinder__text-preview">
    <div class="vuefinder__text-preview__header">
      <div
        id="modal-title"
        class="vuefinder__text-preview__title"
        :title="app.modal.data.item.path"
      >
        {{ app.modal.data.item.basename }}
      </div>
      <div class="vuefinder__text-preview__actions">
        <button v-if="showEdit" class="vuefinder__text-preview__save-button" @click="save">
          {{ t('Save') }}
        </button>
        <button
          v-if="enabled('edit')"
          class="vuefinder__text-preview__edit-button"
          @click="toggleEditMode()"
        >
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
      <message v-if="message.length" :error="isError" @hidden="message = ''">{{ message }}</message>
    </div>
  </div>
</template>
