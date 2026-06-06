<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { usePreviewControls } from '../../composables/usePreviewControls';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';
import type { DirEntry } from '../../types';

const CodeMirrorEditor = defineAsyncComponent({
  loader: () => import('./CodeMirrorEditor.vue'),
  delay: 100,
});

const emit = defineEmits(['success']);
const content = ref('');
const contentTemp = ref('');
const editing = ref(false);
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
    getErrorMessage(error, 'Failed to load text content');
    emit('success');
  }
});

// Contract → chrome. Locked / read-only files don't get an Edit button
// at all — saving would fail anyway and showing the affordance is confusing.
const isEditable = computed(
  () => enabled('edit') && !app.fs.isReadOnly(app.modal.data.item as DirEntry)
);
const isEditing = computed(() => editing.value);
const isDirty = computed(() => editing.value && contentTemp.value !== content.value);

const enterEdit = () => {
  contentTemp.value = content.value;
  editing.value = true;
  app.modal.setEditMode(true);
};

const cancelEdit = () => {
  editing.value = false;
  contentTemp.value = content.value;
  app.modal.setEditMode(false);
};

const commitEdit = async () => {
  try {
    await app.adapter.save({
      path: app.modal.data.item.path,
      content: contentTemp.value,
    });
    content.value = contentTemp.value;
    notify.success(t('Updated.'));
    editing.value = false;
    app.modal.setEditMode(false);
    emit('success');
  } catch (e: unknown) {
    notify.error(getErrorMessage(e, t('Failed to save file')));
  }
};

usePreviewControls({
  isEditable,
  isEditing,
  isDirty,
  primaryActionLabel: computed(() => t('Save')),
  enterEdit,
  commitEdit,
  cancelEdit,
});
</script>

<template>
  <div class="vuefinder__text-preview">
    <div class="vuefinder__text-preview__body">
      <Suspense @resolve="editorReady = true">
        <CodeMirrorEditor
          :model-value="editing ? contentTemp : content"
          :readonly="!editing"
          :filename="app.modal.data.item.basename"
          @update:model-value="(v: string) => (editing ? (contentTemp = v) : null)"
        />
        <template #fallback>
          <pre v-if="!editing" class="vuefinder__text-preview__content">{{ content }}</pre>
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
      <span v-show="false">{{ editorReady }}</span>
    </div>
  </div>
</template>
