<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';

// CodeMirror lives in its own chunk so it only ships when the user actually
// opens a text preview. While the chunk is loading we render the simple
// <pre>/<textarea> fallback that has always been there, so the modal never
// shows a blank state.
const CodeMirrorEditor = defineAsyncComponent({
  loader: () => import('./CodeMirrorEditor.vue'),
  delay: 100,
});

const emit = defineEmits(['success']);
const content = ref('');
const contentTemp = ref('');
const showEdit = ref(false);
const editorReady = ref(false);

const app = useApp();
const notify = createNotifier(app);
const { enabled } = useFeature();

const { t } = app.i18n;

onMounted(async () => {
  try {
    const result = await app.adapter.getContent({ path: app.modal.data.item.path });
    content.value = result.content;
    contentTemp.value = result.content;
    emit('success');
  } catch (error: unknown) {
    // Error is handled silently - content will be empty
    getErrorMessage(error, 'Failed to load text content');
    emit('success');
  }
});

const toggleEditMode = () => {
  showEdit.value = !showEdit.value;
  contentTemp.value = content.value;
  app.modal.setEditMode(showEdit.value);
};

const save = async () => {
  try {
    // Save content using adapter
    const fullPath = app.modal.data.item.path;
    await app.adapter.save({
      path: fullPath,
      content: contentTemp.value,
    });
    content.value = contentTemp.value;
    notify.success(t('Updated.'));
    emit('success');
    showEdit.value = !showEdit.value;
  } catch (e: unknown) {
    notify.error(getErrorMessage(e, t('Failed to save file')));
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
    <div class="vuefinder__text-preview__body">
      <Suspense @resolve="editorReady = true">
        <CodeMirrorEditor
          :model-value="showEdit ? contentTemp : content"
          :readonly="!showEdit"
          :filename="app.modal.data.item.basename"
          @update:model-value="(v: string) => (showEdit ? (contentTemp = v) : null)"
        />
        <template #fallback>
          <pre v-if="!showEdit" class="vuefinder__text-preview__content">{{ content }}</pre>
          <textarea
            v-else
            v-model="contentTemp"
            class="vuefinder__text-preview__textarea"
            name="text"
            cols="30"
            rows="10"
          ></textarea>
        </template>
      </Suspense>
      <!-- Keep linter happy: editorReady is updated when CM mounts -->
      <span v-show="false">{{ editorReady }}</span>
    </div>
  </div>
</template>
