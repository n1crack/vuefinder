<script setup lang="ts">
import { computed, ref } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import MoveSVG from '../../assets/icons/move.svg';
import CopySVG from '../../assets/icons/copy.svg';
import ModalTreeSelector from './ModalTreeSelector.vue';
import Message from '../../components/Message.vue';
import type { DirEntry } from '../../types';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../../stores/files';
import FolderSVG from '../../assets/icons/folder.svg';
import FileSVG from '../../assets/icons/file.svg';
import { getErrorMessage } from '../../utils/errorHandler';
import { toast } from 'vue-sonner';

const app = useApp();
const { enabled } = useFeature();
const { t } = app.i18n;

const props = defineProps<{
  copy: boolean;
}>();

const items = ref(app.modal.data.items.from);
const destination = ref<DirEntry>(app.modal.data.items.to);
const message = ref('');
// If move is disabled, force copy mode
const createCopy = ref(props.copy || !enabled('move'));
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

// Check if destination is invalid based on items
const isInvalidDestination = computed(() => {
  const dest = destination.value;

  // Destination is missing
  if (!dest) {
    return true;
  }

  // Check if destination is invalid for any item
  return items.value.some((item: DirEntry) => {
    // Destination is the item itself
    if (dest.path === item.path) {
      return true;
    }

    // Item is a child of destination (cannot move item into its parent)
    if (item.path.startsWith(dest.path + '/')) {
      return true;
    }

    // If item is a directory, destination cannot be a child of it
    if (item.type === 'dir' && dest.path.startsWith(item.path + '/')) {
      return true;
    }

    return false;
  });
});

const invalidDestinationMessage = computed(() => {
  if (!isInvalidDestination.value) {
    return '';
  }

  const dest = destination.value;
  if (!dest) {
    return t('Please select a destination directory');
  }

  // Find which item is causing the conflict
  const conflictingItem = items.value.find((item: DirEntry) => {
    return (
      dest.path === item.path ||
      item.path.startsWith(dest.path + '/') ||
      (item.type === 'dir' && dest.path.startsWith(item.path + '/'))
    );
  });

  if (conflictingItem) {
    return t('Cannot move/copy item to itself or its parent/child directory');
  }

  return t('Invalid destination directory');
});

// Simple function to split storage and path
const getDestinationParts = () => {
  const path = destination.value.path;
  if (!path) return { storage: 'local', path: '' };

  // For storage roots like "local://", just return the storage name
  if (path.endsWith('://')) {
    return { storage: path.replace('://', ''), path: '' };
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
    try {
      const { files } = await app.adapter[operation.value]({
        path: currentPath.value.path,
        sources: items.value.map(({ path }: { path: string }) => path),
        destination: destination.value.path,
      });

      app.fs.setFiles(files);
      app.modal.close();
    } catch (error) {
      toast.error(getErrorMessage(error, t('Failed to transfer files')));
    }
  }
};
</script>

<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="createCopy ? CopySVG : MoveSVG" :title="title"></ModalHeader>
      <div class="vuefinder__move-modal__content">
        <p class="vuefinder__move-modal__description">{{ body }}</p>
        <div class="vuefinder__move-modal__files vf-scrollbar">
          <div v-for="node in items" :key="node.path" class="vuefinder__move-modal__file">
            <div>
              <FolderSVG
                v-if="node.type === 'dir'"
                class="vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
              />
              <FileSVG v-else class="vuefinder__move-modal__icon" />
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
                class="vuefinder__move-modal__destination-folder"
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

        <div v-if="enabled('copy') && enabled('move')" class="vuefinder__move-modal__options">
          <label class="vuefinder__move-modal__checkbox-label">
            <input v-model="createCopy" type="checkbox" class="vuefinder__move-modal__checkbox" />
            <span class="vuefinder__move-modal__checkbox-text">{{
              t('Create a copy instead of moving')
            }}</span>
          </label>
        </div>

        <Message v-if="invalidDestinationMessage" error>
          {{ invalidDestinationMessage }}
        </Message>
        <Message v-if="message.length && !invalidDestinationMessage" error @hidden="message = ''">
          {{ message }}
        </Message>
      </div>
    </div>

    <template #buttons>
      <button
        type="button"
        class="vf-btn vf-btn-primary"
        :disabled="isInvalidDestination"
        @click="transfer"
      >
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
