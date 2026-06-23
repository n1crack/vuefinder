<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import NewFileSVG from '../../assets/icons/new_file.svg';
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

const createFile = () => {
  if (loading.value) return;
  if (name.value !== '') {
    loading.value = true;
    app.adapter
      .createFile({
        path: currentPath.value.path,
        name: name.value,
      })
      .then((result: any) => {
        notify.success(t('%s is created.', name.value));
        app.fs.setFiles(result.files);
        app.modal.close();
      })
      .catch((e: unknown) => {
        notify.error(getErrorMessage(e, t('Failed to create file')));
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
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="vuefinder__new-file-modal__content">
        <div class="vuefinder__new-file-modal__form">
          <p class="vuefinder__new-file-modal__description">{{ t('Create a new file') }}</p>
          <input
            v-model="name"
            class="vuefinder__new-file-modal__input"
            :placeholder="t('File Name')"
            type="text"
            @keyup.enter="createFile"
          />
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" :disabled="loading" @click="createFile">
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
