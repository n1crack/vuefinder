<script setup lang="ts">
// @ts-nocheck
import { inject, onMounted, provide, watch } from 'vue';
import { ServiceContainerKey } from '../composables/useApp';
import { useStore } from '@nanostores/vue';
import ServiceContainer from '../ServiceContainer';
import { useHotkeyActions } from '../composables/useHotkeyActions';
import { useExternalDragDrop } from '../composables/useExternalDragDrop';

import MenuBar from '../components/MenuBar.vue';
import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';
import TreeView from '../components/TreeView.vue';
import ModalUpload from '../components/modals/ModalUpload.vue';
import { menuItems as contextMenuItems } from '../utils/contextmenu';
import type { VueFinderProps, DirEntry } from '../types';
import type { FsData } from '../adapters/types';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';

const emit = defineEmits([
  'select',
  'path-change',
  'upload-complete',
  'delete-complete',
  'error',
  'ready',
  'file-dclick',
  'folder-dclick',
]);

const props = withDefaults(defineProps<VueFinderProps>(), {
  id: 'vf',
  features: true,
  debug: false,
  theme: 'light',
  contextMenuItems: () => contextMenuItems,
  selectionMode: 'multiple',
  selectionFilterType: 'both',
  selectionFilterMimeIncludes: () => [],
});

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions') || {});
provide(ServiceContainerKey, app);
const config = app.config;

const fs = app.fs;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);

useHotkeyActions(app);

const { isDraggingExternal, handleDragEnter, handleDragOver, handleDragLeave, handleDrop } =
  useExternalDragDrop();

// Helper function to update state after adapter operation
function updateState(responseData: FsData) {
  fs.setPath(responseData.dirname);
  if (config.get('persist')) {
    config.set('path', responseData.dirname);
  }
  fs.setReadOnly(responseData.read_only ?? false);
  app.modal.close();
  fs.setFiles(responseData.files);
  fs.clearSelection();
  fs.setSelectedCount(0);
  fs.setStorages(responseData.storages);
}

// Set the callback on adapter manager to update state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(app.adapter as any).onBeforeOpen = () => {
  fs.setLoading(true);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(app.adapter as any).onAfterOpen = (responseData: FsData) => {
  updateState(responseData);
  fs.setLoading(false);
};

// Listen for upload-complete event
app.emitter.on('vf-upload-complete', (files: unknown) => {
  emit('upload-complete', files as DirEntry[]);
});

// Listen for delete-complete event
app.emitter.on('vf-delete-complete', (deletedItems: unknown) => {
  emit('delete-complete', deletedItems as DirEntry[]);
});

// Listen for custom double-click events
app.emitter.on('vf-file-dclick', (item: unknown) => {
  emit('file-dclick', item as DirEntry);
});

app.emitter.on('vf-folder-dclick', (item: unknown) => {
  emit('folder-dclick', item as DirEntry);
});

// fetch initial data
onMounted(() => {
  watch(
    () => config.get('path'),
    (path: string | undefined) => {
      // fetchPath(path);
      app.adapter.open(path);
    }
  );

  const initialPath = config.get('persist')
    ? config.get('path')
    : (config.get('initialPath') ?? '');
  fs.setPath(initialPath);
  app.adapter.open(initialPath);
  //fetchPath(initialPath);

  // Emit path-change event based on store path
  fs.path.listen((path: { path: string }) => {
    emit('path-change', path.path);
  });

  // Emit select event based on store selected items
  fs.selectedItems.listen((items) => {
    emit('select', items);
  });

  // Emit ready event when VueFinder is initialized
  emit('ready');
});

// External drag & drop handler
const handleExternalDrop = async (e: DragEvent) => {
  const droppedFiles = await handleDrop(e);
  if (droppedFiles.length > 0) {
    app.modal.open(ModalUpload);

    setTimeout(() => {
      app.emitter.emit(
        'vf-external-files-dropped',
        droppedFiles.map((f) => f.file)
      );
    }, 100);
  }
};
</script>

<template>
  <div
    ref="root"
    tabindex="0"
    class="vuefinder vuefinder__main vuefinder__themer"
    :data-theme="app.theme.current"
    :class="{ 'vuefinder--dragging-external': isDraggingExternal }"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleExternalDrop"
  >
    <div
      :class="(configState.value && configState.value.theme) || 'light'"
      style="height: 100%; width: 100%"
    >
      <div
        :class="
          (configState as any)?.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'
        "
        class="vuefinder__main__container"
        @mousedown="app.emitter.emit('vf-contextmenu-hide')"
        @touchstart="app.emitter.emit('vf-contextmenu-hide')"
      >
        <!-- External Drag Drop Overlay -->
        <div
          v-if="isDraggingExternal"
          class="vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
        >
          <div class="vuefinder__external-drop-message">
            {{ app.i18n.t('Drag and drop the files/folders to here.') }}
          </div>
        </div>

        <MenuBar />
        <Toolbar />
        <Breadcrumb />
        <div class="vuefinder__main__content">
          <TreeView />
          <Explorer :on-file-dclick="props.onFileDclick" :on-folder-dclick="props.onFolderDclick">
            <template #icon="slotProps">
              <slot name="icon" v-bind="slotProps" />
            </template>
          </Explorer>
        </div>
        <Statusbar>
          <template #actions="slotProps">
            <slot name="status-bar" v-bind="slotProps" />
          </template>
        </Statusbar>
      </div>
      <Teleport to="body">
        <Transition name="fade">
          <Component :is="app.modal.type" v-if="app.modal.visible" />
        </Transition>
      </Teleport>
      <ContextMenu />
    </div>
  </div>
</template>
