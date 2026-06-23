<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import NewFolderSVG from '../../assets/icons/new_folder.svg';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';

import { useApp } from '../../composables/useApp';
import { getErrorMessage } from '../../utils/errorHandler';
import { createNotifier } from '../../utils/notify';

const app = useApp();
const notify = createNotifier(app);
const { t } = app.i18n;
const fs = app.fs;

const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const name = ref('');
const loading = ref(false);

const createFolder = () => {
  if (loading.value) return;
  if (name.value !== '') {
    loading.value = true;
    app.adapter
      .createFolder({
        path: currentPath.value.path,
        name: name.value,
      })
      .then((result: any) => {
        notify.success(t('%s is created.', name.value));
        app.fs.setFiles(result.files);
        app.modal.close();
      })
      .catch((e: unknown) => {
        notify.error(getErrorMessage(e, t('Failed to create folder')));
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
      <ModalHeader :icon="NewFolderSVG" :title="t('New Folder')"></ModalHeader>
      <div class="vuefinder__new-folder-modal__content">
        <div class="vuefinder__new-folder-modal__form">
          <p class="vuefinder__new-folder-modal__description">{{ t('Create a new folder') }}</p>
          <input
            v-model="name"
            class="vuefinder__new-folder-modal__input"
            :placeholder="t('Folder Name')"
            type="text"
            autofocus
            @keyup.enter="createFolder"
          />
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" :disabled="loading" @click="createFolder">
        {{ t('Create') }}
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
