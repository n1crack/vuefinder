<script setup lang="ts">
import { ref, computed } from 'vue';
import { useApp } from '../../composables/useApp';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import PluginOutlet from '../../plugins/PluginOutlet.vue';
import { createCancelableEvent } from '../../plugins/hooks';
import ModalTreeSelector from './ModalTreeSelector.vue';
import FolderSVG from '../../assets/icons/folder.svg';
import { useStore } from '@nanostores/vue';
import ArchiveSVG from '../../assets/icons/archive.svg';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';
import type { DirEntry } from '../../types';
import { shortenPath } from '../../utils/path';

const app = useApp();
const notify = createNotifier(app);
const { t } = app.i18n;
const fs = app.fs;

const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const name = ref('');

const items = ref(app.modal.data.items);

// Target folder picker state. When null, the archive is written to the
// current folder (existing behavior).
const targetFolderEntry = ref<DirEntry | null>(null);
const showFolderSelector = ref(false);

const effectiveTargetPath = computed(() => targetFolderEntry.value?.path || currentPath.value.path);

const toggleFolderSelector = () => {
  showFolderSelector.value = !showFolderSelector.value;
};

const selectTargetFolder = (folder: DirEntry | null) => {
  if (folder) {
    targetFolderEntry.value = folder;
  }
};

const handleFolderSelectAndClose = (folder: DirEntry | null) => {
  if (folder) {
    targetFolderEntry.value = folder;
    showFolderSelector.value = false;
  }
};

const loading = ref(false);

const archive = () => {
  if (loading.value) return;
  if (items.value.length) {
    const ev = createCancelableEvent({ items: items.value });
    app.plugins?.hooks.dispatch('beforeArchive', ev);
    if (ev.defaultPrevented) return;
    loading.value = true;
    const destination = targetFolderEntry.value?.path;
    app.adapter
      .archive({
        path: currentPath.value.path,
        items: items.value.map(({ path, type }: { path: string; type: string }) => ({
          path,
          type,
        })),
        name: name.value,
        // Optional. Sent when the user explicitly picks a different folder.
        ...(destination && destination !== currentPath.value.path ? { destination } : {}),
        // Plugin-contributed fields (e.g. compression level) forwarded to the backend.
        extras: { ...app.modal.extras },
      })
      .then((result: any) => {
        notify.success(t('The file(s) archived.'));
        app.fs.setFiles(result.files);
        app.plugins?.hooks.dispatch('afterArchive', { result });
        app.modal.close();
      })
      .catch((e: unknown) => {
        notify.error(getErrorMessage(e, t('Failed to archive files')));
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="ArchiveSVG" :title="t('Archive the files')">
        <template #actions><PluginOutlet modal-key="archive" region="header-actions" /></template>
      </ModalHeader>
      <PluginOutlet modal-key="archive" region="body-top" />
      <div class="vuefinder__archive-modal__content">
        <div class="vuefinder__archive-modal__form">
          <div class="vuefinder__archive-modal__files vf-scrollbar">
            <p v-for="item in items" :key="item.path" class="vuefinder__archive-modal__file">
              <svg
                v-if="item.type === 'dir'"
                class="vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <svg
                v-else
                class="vuefinder__archive-modal__icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span class="vuefinder__archive-modal__file-name">{{ item.basename }}</span>
            </p>
          </div>
          <input
            v-model="name"
            class="vuefinder__archive-modal__input"
            :placeholder="t('Archive name. (.zip file will be created)')"
            type="text"
            @keyup.enter="archive"
          />

          <!-- Target folder picker -->
          <div class="vuefinder__archive-modal__target">
            <div class="vuefinder__archive-modal__target-label">
              {{ t('Target folder') }}
            </div>
            <button
              type="button"
              class="vuefinder__archive-modal__target-btn"
              :class="{ 'vuefinder__archive-modal__target-btn--open': showFolderSelector }"
              @click="toggleFolderSelector"
            >
              <FolderSVG class="vuefinder__archive-modal__target-icon" />
              <span class="vuefinder__archive-modal__target-text" :title="effectiveTargetPath">{{
                shortenPath(effectiveTargetPath)
              }}</span>
              <svg
                class="vuefinder__archive-modal__target-arrow"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"
                />
              </svg>
            </button>
            <div v-if="showFolderSelector" class="vuefinder__archive-modal__target-selector">
              <ModalTreeSelector
                v-model="targetFolderEntry"
                :show-pinned-folders="true"
                :current-path="currentPath"
                @update:model-value="selectTargetFolder"
                @select-and-close="handleFolderSelectAndClose"
              />
            </div>
          </div>
        </div>
      </div>
      <PluginOutlet modal-key="archive" region="body-bottom" />
    </div>

    <template #buttons>
      <PluginOutlet modal-key="archive" region="footer-actions" />
      <button type="button" class="vf-btn vf-btn-primary" :disabled="loading" @click="archive">
        {{ t('Archive') }}
      </button>
      <button
        type="button"
        class="vf-btn vf-btn-secondary"
        :disabled="loading"
        @click="app.modal.close()"
      >
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
