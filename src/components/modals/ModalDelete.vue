<script setup lang="ts">
import { ref } from 'vue';
import { useApp } from '../../composables/useApp';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import { toast } from 'vue-sonner';
import { getErrorMessage } from '../../utils/errorHandler';
import ModalHeader from '../../components/modals//ModalHeader.vue';
import { useStore } from '@nanostores/vue';
import DeleteSVG from '../../assets/icons/delete.svg';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';
const app = useApp();
const { t } = app.i18n;
const fs = app.fs;
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);
const items = ref(app.modal.data.items);
const isConfirmed = ref(false);

const remove = () => {
  if (items.value.length && isConfirmed.value) {
    app.adapter
      .delete({
        path: currentPath.value.path,
        items: items.value.map(({ path, type }: { path: string; type: string }) => ({
          path,
          type,
        })),
      })
      .then((result: any) => {
        toast.success(t('Files deleted.'));
        app.fs.setFiles(result.files);
        // app.emitter.emit('vf-delete-complete', items.value);
        app.modal.close();
      })
      .catch((e: unknown) => {
        toast.error(getErrorMessage(e, t('Failed to delete files')));
      });
  }
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="DeleteSVG" :title="t('Delete files')"></ModalHeader>
      <div class="vuefinder__delete-modal__content">
        <div class="vuefinder__delete-modal__form">
          <p class="vuefinder__delete-modal__description">
            {{ t('Are you sure you want to delete these files?') }}
          </p>
          <div class="vuefinder__delete-modal__files vf-scrollbar">
            <p v-for="item in items" :key="item.path" class="vuefinder__delete-modal__file">
              <svg
                v-if="item.type === 'dir'"
                class="vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir"
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
                class="vuefinder__delete-modal__icon"
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
              <span class="vuefinder__delete-modal__file-name">{{ item.basename }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <template #buttons>
      <div class="vuefinder__delete-modal__confirmation">
        <label class="vuefinder__delete-modal__confirmation-label">
          <input v-model="isConfirmed" type="checkbox" class="vuefinder__delete-modal__checkbox" />
          <span class="vuefinder__delete-modal__confirmation-text">
            {{ t("I'm sure delete it, This action cannot be undone.") }}
          </span>
        </label>
      </div>
      <button type="button" class="vf-btn vf-btn-danger" :disabled="!isConfirmed" @click="remove">
        {{ t('Yes, Delete!') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
