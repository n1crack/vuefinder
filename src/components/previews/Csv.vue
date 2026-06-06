<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue';
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

defineOptions({ name: 'CsvPreview' });

const emit = defineEmits(['success']);
const content = ref('');
const contentTemp = ref('');
const rows = shallowRef<string[][]>([]);
const headers = shallowRef<string[]>([]);
const parseError = ref<string | null>(null);
const editing = ref(false);
const showAsTable = ref(false);

const ROW_LIMIT = 1000;
const truncated = computed(() => rows.value.length > ROW_LIMIT);
const visibleRows = computed(() => (truncated.value ? rows.value.slice(0, ROW_LIMIT) : rows.value));

const app = useApp();
const notify = createNotifier(app);
const { enabled } = useFeature();
const { t } = app.i18n;

async function parseCsv(text: string) {
  try {
    const { parse } = await import('papaparse');
    const result = parse<string[]>(text, {
      skipEmptyLines: true,
      delimiter: '',
    });
    if (!result.data.length) {
      headers.value = [];
      rows.value = [];
      return;
    }
    const [first, ...rest] = result.data;
    headers.value = first ?? [];
    rows.value = rest;
    parseError.value = null;
  } catch (e: unknown) {
    parseError.value = getErrorMessage(e, t('Failed to parse CSV'));
    headers.value = [];
    rows.value = [];
  }
}

onMounted(async () => {
  try {
    const result = await app.adapter.getContent({ path: app.modal.data.item.path });
    content.value = result.content;
    contentTemp.value = result.content;
    await parseCsv(result.content);
    emit('success');
  } catch (error: unknown) {
    getErrorMessage(error, 'Failed to load CSV content');
    emit('success');
  }
});

const toggleView = () => {
  if (editing.value) return;
  showAsTable.value = !showAsTable.value;
};

const inTableMode = computed(() => !editing.value && showAsTable.value);

// Contract → chrome. Read-only files don't expose Edit (save would fail).
const isEditable = computed(
  () => enabled('edit') && !app.fs.isReadOnly(app.modal.data.item as DirEntry)
);
const isEditing = computed(() => editing.value);
const isDirty = computed(() => editing.value && contentTemp.value !== content.value);

const enterEdit = () => {
  contentTemp.value = content.value;
  editing.value = true;
  // Editing always forces raw view (can't edit a rendered table).
  showAsTable.value = false;
  app.modal.setEditMode(true);
};

const cancelEdit = () => {
  editing.value = false;
  contentTemp.value = content.value;
  app.modal.setEditMode(false);
};

const commitEdit = async () => {
  try {
    await app.adapter.save({ path: app.modal.data.item.path, content: contentTemp.value });
    content.value = contentTemp.value;
    await parseCsv(content.value);
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
    <div class="vuefinder__text-preview__body vuefinder__csv-preview__body">
      <!-- Raw / Table toggle: Csv-specific, lives inside the body so it
           doesn't pollute the global chrome. Hidden while editing. -->
      <button
        v-if="!editing"
        class="vuefinder__csv-preview__view-toggle"
        :title="inTableMode ? t('View as raw') : t('View as table')"
        @click="toggleView"
      >
        {{ inTableMode ? t('Raw') : t('Table') }}
      </button>

      <template v-if="!inTableMode">
        <Suspense>
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
      </template>

      <template v-else>
        <div v-if="parseError" class="vuefinder__csv-preview__error">{{ parseError }}</div>
        <div v-else-if="!rows.length && !headers.length" class="vuefinder__csv-preview__empty">
          {{ t('No rows to display') }}
        </div>
        <div v-else class="vuefinder__csv-preview__table-wrap">
          <table class="vuefinder__csv-preview__table">
            <thead>
              <tr>
                <th class="vuefinder__csv-preview__row-num"></th>
                <th v-for="(h, i) in headers" :key="i" :title="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in visibleRows" :key="ri">
                <td class="vuefinder__csv-preview__row-num">{{ ri + 1 }}</td>
                <td v-for="(cell, ci) in row" :key="ci" :title="cell">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="truncated" class="vuefinder__csv-preview__truncated">
            {{ t('Showing first %s rows out of %s', ROW_LIMIT, rows.length) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
