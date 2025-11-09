<script setup lang="ts">
import { ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useStore } from '@nanostores/vue';
import { toast } from 'vue-sonner';
import { getErrorMessage } from '../../utils/errorHandler';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import UnarchiveSVG from '../../assets/icons/unarchive.svg';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';

const app = useApp();
const fs = app.fs;
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);
const { t } = app.i18n;

const zipItem = ref(app.modal.data.items[0]);

// todo: get zip folder content
const items = ref<any[]>([]);

const unarchive = () => {
  app.adapter
    .unarchive({
      item: zipItem.value.path,
      path: currentPath.value.path,
    })
    .then((result: any) => {
      toast.success(t('The file unarchived.'));
      app.fs.setFiles(result.files);
      app.modal.close();
    })
    .catch((e: unknown) => {
      toast.error(getErrorMessage(e, t('Failed to unarchive')));
    });
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="UnarchiveSVG" :title="t('Unarchive')"></ModalHeader>
      <div class="vuefinder__unarchive-modal__content">
        <div class="vuefinder__unarchive-modal__items">
          <p v-for="item in items" :key="item.path" class="vuefinder__unarchive-modal__item">
            <svg
              v-if="item.type === 'dir'"
              class="vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir"
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
              class="vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file"
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
            <span class="vuefinder__unarchive-modal__item-name">{{ item.basename }}</span>
          </p>
          <p class="vuefinder__unarchive-modal__info">
            {{ t('The archive will be unarchived at') }} ({{ currentPath.path }})
          </p>
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" @click="unarchive">
        {{ t('Unarchive') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
