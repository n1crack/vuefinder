<script setup lang="ts">
import {computed, inject, ref} from 'vue';
import {useApp} from '../../composables/useApp';
// import {useStore} from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import MoveSVG from '../../assets/icons/move.svg';
import ModalTreeSelector from './ModalTreeSelector.vue';
import type {DirEntry} from '../../types';
import {useStore} from '@nanostores/vue';
import type {StoreValue} from 'nanostores';
import type {CurrentPathState} from '../../stores/files';

const app = useApp();
const {t} = app.i18n;
// const fs = app.fs;
// const currentPath = useStore(fs.path);
const props = defineProps<{
  copy: boolean;
}>();

const items = ref(app.modal.data.items.from);
const destination = ref<DirEntry>(app.modal.data.items.to);
const message = ref('');
const createCopy = ref(props.copy || false);
const operation = computed(() => (createCopy.value ? 'copy' : 'move'));
const showTreeSelector = ref(false);

const currentPath: StoreValue<CurrentPathState> = useStore(app.fs.path);

const title = computed(() => (createCopy.value ? t('Copy files') : t('Move files')));
const body = computed(() =>
    createCopy.value
        ? t('Are you sure you want to copy these files?')
        : t('Are you sure you want to move these files?')
);
const successBtn = computed(() => (createCopy.value ? t('Yes, Copy!') : t('Yes, Move!')));
const successText = computed(() => (createCopy.value ? t('Files copied.') : t('Files moved.')));

const selectDestinationFolder = (folder: DirEntry | null) => {
  if (folder) {
    destination.value = folder;
  }
};

const selectDestinationFolderAndClose = (folder: DirEntry | null) => {
  if (folder) {
    destination.value = folder;
    showTreeSelector.value = false;
  }
};

// Simple function to split storage and path
const getDestinationParts = () => {
  const path = destination.value.path;
  if (!path) return {storage: 'local', path: ''};

  // For storage roots like "local://", just return the storage name
  if (path.endsWith('://')) {
    return {storage: path.replace('://', ''), path: ''};
  }

  // Split storage and path
  const parts = path.split('://');
  return {
    storage: parts[0] || 'local',
    path: parts[1] || '',
  };
};

const transfer = async () => {
  if (items.value.length) {
    const {files} = await app.adapter[operation.value]({
      path: currentPath.value.path,
      sources: items.value.map(({path}: { path: string }) => path),
      destination: destination.value.path,
    })
    app.fs.setFiles(files);
    app.modal.close();
  }
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="MoveSVG" :title="title"></ModalHeader>
      <div class="vuefinder__move-modal__content">
        <p class="vuefinder__move-modal__description">{{ body }}</p>
        <div class="vuefinder__move-modal__files vf-scrollbar">
          <div v-for="node in items" :key="node.path" class="vuefinder__move-modal__file">
            <div>
              <svg
                  v-if="node.type === 'dir'"
                  class="vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
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
                  class="vuefinder__move-modal__icon"
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
            </div>
            <div class="vuefinder__move-modal__file-name">{{ node.path }}</div>
          </div>
        </div>
        <h4 class="vuefinder__move-modal__target-title">{{ t('Target Directory') }}</h4>
        <div class="vuefinder__move-modal__target-container">
          <div
              class="vuefinder__move-modal__target-display"
              @click="showTreeSelector = !showTreeSelector"
          >
            <div class="vuefinder__move-modal__target-path">
              <span class="vuefinder__move-modal__target-storage"
              >{{ getDestinationParts().storage }}://</span
              >
              <span
                  v-if="getDestinationParts().path"
                  class="vuefinder__move-modal__Destination-folder"
              >{{ getDestinationParts().path }}</span
              >
            </div>
            <span class="vuefinder__move-modal__target-badge">{{ t('Browse') }}</span>
          </div>
        </div>

        <!-- Tree selector -->
        <div
            class="vuefinder__move-modal__tree-selector"
            :class="
            showTreeSelector
              ? 'vuefinder__move-modal__tree-selector--expanded'
              : 'vuefinder__move-modal__tree-selector--collapsed'
          "
        >
          <ModalTreeSelector
              v-model="destination"
              :show-pinned-folders="true"
              @update:model-value="selectDestinationFolder"
              @select-and-close="selectDestinationFolderAndClose"
          />
        </div>

        <div class="vuefinder__move-modal__options">
          <label class="vuefinder__move-modal__checkbox-label">
            <input v-model="createCopy" type="checkbox" class="vuefinder__move-modal__checkbox"/>
            <span class="vuefinder__move-modal__checkbox-text">{{
                t('Create a copy instead of moving')
              }}</span>
          </label>
        </div>

        <message v-if="message.length" error @hidden="message = ''">{{ message }}</message>
      </div>
    </div>

    <template #buttons>
      <button type="button" class="vf-btn vf-btn-primary" @click="transfer">
        {{ successBtn }}
      </button>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Cancel') }}
      </button>
      <div class="vuefinder__move-modal__selected-items">
        {{ t('%s item(s) selected.', items.length) }}
      </div>
    </template>
  </ModalLayout>
</template>
