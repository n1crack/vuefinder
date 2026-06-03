<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';

// CodeMirror chunk only loads if the user flips into raw / edit mode.
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
const showEdit = ref(false);
const showAsTable = ref(false);

// Cap the rendered table size; very large CSVs still parse but we only
// render the first N rows in the table to keep the DOM responsive. The user
// can flip into raw view to see everything.
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
      // Auto-detect comma / semicolon / tab / pipe — Papaparse picks whichever
      // produces the most consistent column count.
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

const toggleEditMode = () => {
  showEdit.value = !showEdit.value;
  contentTemp.value = content.value;
  app.modal.setEditMode(showEdit.value);
};

const save = async () => {
  try {
    const fullPath = app.modal.data.item.path;
    await app.adapter.save({ path: fullPath, content: contentTemp.value });
    content.value = contentTemp.value;
    await parseCsv(content.value);
    notify.success(t('Updated.'));
    emit('success');
    showEdit.value = false;
    app.modal.setEditMode(false);
  } catch (e: unknown) {
    notify.error(getErrorMessage(e, t('Failed to save file')));
  }
};

const toggleView = () => {
  if (showEdit.value) return;
  showAsTable.value = !showAsTable.value;
};

// Default is raw text (same as any other text file). The toggle flips into
// the parsed table view. Editing always forces raw because you can't edit a
// rendered <table>.
const inTableMode = computed(() => !showEdit.value && showAsTable.value);
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
        <button
          v-if="!showEdit"
          class="vuefinder__csv-preview__view-toggle"
          :title="inTableMode ? t('View as raw') : t('View as table')"
          @click="toggleView"
        >
          {{ inTableMode ? t('Raw') : t('Table') }}
        </button>
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
      <template v-if="!inTableMode">
        <Suspense>
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
