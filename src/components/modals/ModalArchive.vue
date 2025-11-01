<script setup lang="ts">
import { inject, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import { useStore } from '@nanostores/vue';
import ArchiveSVG from '../../assets/icons/archive.svg';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';

const app = useApp();
const { t } = app.i18n;
const fs = app.fs;

const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const name = ref('');
const message = ref('');

const items = ref(app.modal.data.items);

const archive = () => {
  if (items.value.length) {
    app.adapter
      .archive({
        path: currentPath.value.path,
        items: items.value.map(({ path, type }: { path: string; type: string }) => ({
          path,
          type,
        })),
        name: name.value,
      })
      .then((result: any) => {
        app.emitter.emit('vf-toast-push', { label: t('The file(s) archived.') });
        app.fs.setFiles(result.files);
        app.modal.close();
      })
      .catch((e: any) => {
        app.emitter.emit('vf-toast-push', { label: t(e.message), type: 'error' });
      });
  }
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="ArchiveSVG" :title="t('Archive the files')"></ModalHeader>
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
          <message v-if="message.length" error @hidden="message = ''">{{ message }}</message>
        </div>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" @click="archive">
        {{ t('Archive') }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
    </template>
  </ModalLayout>
</template>
