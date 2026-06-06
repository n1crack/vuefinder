<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue';
import { useStore } from '@nanostores/vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import datetimestring from '../../utils/datetimestring';
import type { DirEntry } from '../../types';
import type { StoreValue } from 'nanostores';
import type { PreviewControls } from '../../types/preview';
import AboutSVG from '../../assets/icons/about.svg';
import CloseSVG from '../../assets/icons/close.svg';

defineOptions({ name: 'PreviewChrome' });

const emit = defineEmits<{
  'close-request': [];
}>();

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;

const files: StoreValue<DirEntry[]> = useStore(app.fs.sortedFiles);
const fileOnlyItems = computed(() => files.value.filter((f: DirEntry) => f.type === 'file'));
const currentIndex = computed(() =>
  fileOnlyItems.value.findIndex((f: DirEntry) => f.path === app.modal.data.item.path)
);
const totalFiles = computed(() => fileOnlyItems.value.length);

// app is wrapped in reactive() at the ServiceContainer level, which
// auto-unwraps refs. So app.modal.controls IS the value, not the ref.
const controls = computed<PreviewControls | null>(() => (app.modal as any).controls ?? null);
const isEditing = computed(() => Boolean(unref(controls.value?.isEditing)));
const isDirty = computed(() => Boolean(unref(controls.value?.isDirty)));

const infoOpen = ref(false);
const downloadOpen = ref(false);

const togglePopover = (which: 'info' | 'download') => {
  if (which === 'info') {
    infoOpen.value = !infoOpen.value;
    downloadOpen.value = false;
  } else {
    downloadOpen.value = !downloadOpen.value;
    infoOpen.value = false;
  }
};

const closePopovers = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.closest('.vuefinder__preview-chrome__popover-host')) return;
  infoOpen.value = false;
  downloadOpen.value = false;
};

onMounted(() => document.addEventListener('mousedown', closePopovers));
onBeforeUnmount(() => document.removeEventListener('mousedown', closePopovers));

const formatDuration = (seconds?: number | null): string | null => {
  if (!seconds || !isFinite(seconds)) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const fileInfo = computed(() => {
  const item = app.modal.data.item as DirEntry;
  const rows: { label: string; value: string }[] = [
    { label: t('File Size'), value: app.filesize(item.file_size) },
    { label: t('Last Modified'), value: datetimestring(item.last_modified) },
  ];
  if (item.mime_type) rows.push({ label: t('Type'), value: item.mime_type });
  // Previewer-supplied rows: Image plugs in dimensions on load, Video could
  // plug in duration, etc.
  const extra = unref(controls.value?.extraInfo);
  if (Array.isArray(extra)) {
    for (const row of extra) rows.push(row);
  }
  rows.push({ label: t('Path'), value: item.path });
  return rows;
});

const downloadUrl = computed(() => app.adapter.getDownloadUrl(app.modal.data.item));
</script>

<template>
  <div class="vuefinder__preview-chrome">
    <!-- Info icon sits before the filename: borderless, secondary-coloured;
         clicking it opens a popover with file metadata. -->
    <div class="vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host">
      <button
        type="button"
        class="vuefinder__preview-chrome__info-btn"
        :class="{ 'vuefinder__preview-chrome__info-btn--active': infoOpen }"
        :title="t('File info')"
        :aria-label="t('File info')"
        @click="togglePopover('info')"
      >
        <AboutSVG class="vuefinder__preview-chrome__icon" />
      </button>
      <div v-if="infoOpen" class="vuefinder__preview-chrome__popover">
        <div
          v-for="row in fileInfo"
          :key="row.label"
          class="vuefinder__preview-chrome__popover-row"
        >
          <span class="vuefinder__preview-chrome__popover-label">{{ row.label }}</span>
          <span class="vuefinder__preview-chrome__popover-value">{{ row.value }}</span>
        </div>
      </div>
    </div>

    <div
      id="modal-title"
      class="vuefinder__preview-chrome__title"
      :title="app.modal.data.item.path"
    >
      {{ app.modal.data.item.basename }}
    </div>

    <!-- Action group (right). -->
    <div class="vuefinder__preview-chrome__actions">
      <span
        v-if="totalFiles > 1 && !isEditing"
        class="vuefinder__preview-chrome__counter"
        :aria-label="t('File %s of %s', String(currentIndex + 1), String(totalFiles))"
      >
        {{ currentIndex + 1 }} / {{ totalFiles }}
      </span>


      <!-- Download: icon-only toggle. Clicking opens a popover that contains
           the actual download link and a description; no inline label in the
           bar itself. -->
      <div
        v-if="enabled('download') && !isEditing"
        class="vuefinder__preview-chrome__popover-host"
      >
        <button
          type="button"
          class="vuefinder__preview-chrome__info-btn"
          :class="{ 'vuefinder__preview-chrome__info-btn--active': downloadOpen }"
          :title="t('Download')"
          :aria-label="t('Download')"
          @click="togglePopover('download')"
        >
          <svg
            class="vuefinder__preview-chrome__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </button>
        <div v-if="downloadOpen" class="vuefinder__preview-chrome__popover">
          <a
            :href="downloadUrl"
            :download="downloadUrl"
            target="_blank"
            class="vuefinder__preview-chrome__popover-action"
          >
            <svg
              class="vuefinder__preview-chrome__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            <span>{{ t('Download') }}</span>
          </a>
          <p class="vuefinder__preview-chrome__popover-hint">
            {{
              t(
                'Download doesn\'t work? You can try right-click "Download" button, select "Save link as...".'
              )
            }}
          </p>
        </div>
      </div>


      <button
        type="button"
        class="vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close"
        :title="t('Close')"
        :aria-label="t('Close')"
        @click="emit('close-request')"
      >
        <CloseSVG class="vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" />
      </button>
    </div>
  </div>
</template>
