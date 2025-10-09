<script setup lang="ts">
import {inject, watch} from 'vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "./modals/ModalNewFolder.vue";
import ModalNewFile from "./modals/ModalNewFile.vue";
import ModalRename from "./modals/ModalRename.vue";
import ModalDelete from "./modals/ModalDelete.vue";
import ModalUpload from "./modals/ModalUpload.vue";
import ModalUnarchive from "./modals/ModalUnarchive.vue";
import ModalArchive from "./modals/ModalArchive.vue";
import NewFolderSVG from "@/assets/icons/new_folder.svg";
import NewFileSVG from "@/assets/icons/new_file.svg";
import RenameSVG from "@/assets/icons/rename.svg";
import DeleteSVG from "@/assets/icons/delete.svg";
import UploadSVG from "@/assets/icons/upload.svg";
import ArchiveSVG from "@/assets/icons/archive.svg";
import UnarchiveSVG from "@/assets/icons/unarchive.svg";
import LoadingSVG from "@/assets/icons/loading.svg";
import FullscreenSVG from "@/assets/icons/full_screen.svg";
import MinimizeSVG from "@/assets/icons/minimize.svg";
import GridViewSVG from "@/assets/icons/grid_view.svg";
import ListViewSVG from "@/assets/icons/list_view.svg";
import { useFilesStore } from '@/stores/files';
import { useSearchStore } from '@/stores/search';

const app = inject('ServiceContainer');
const {setStore} = app.storage;
const {t} = app.i18n;

const fs = useFilesStore();
const search = useSearchStore();

// selection provided by NewExplorer via fs.selectedItems

const toggleFullScreen = () => {
  app.fullScreen = !app.fullScreen;
}

watch(() => app.fullScreen, () => {
  if (app.fullScreen) {
    // add body overflow hidden
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'hidden';
  } else {
    // remove body overflow hidden
    const body = document.querySelector('body');
    if (body) body.style.overflow = '';
  }
  setStore('full-screen', app.fullScreen);
  app.emitter.emit('vf-fullscreen-toggle');
});

// View Management
const toggleView = () => {
  app.view = app.view === 'list' ? 'grid' : 'list';

  // selection refresh handled by NewExplorer
  setStore('viewport', app.view)
};

</script>

<template>
  <div class="vuefinder__toolbar">
    <div class="vuefinder__toolbar__actions" v-if="!search.query.length">
      <div
          class="mx-1.5"
          :title="t('New Folder')"
          v-if="app.features.includes(FEATURES.NEW_FOLDER)"
          @click="app.modal.open(ModalNewFolder, {items: fs.selectedItems})"
      >
        <NewFolderSVG/>
      </div>

      <div
          class="mx-1.5"
          :title="t('New File')"
          v-if="app.features.includes(FEATURES.NEW_FILE)"
          @click="app.modal.open(ModalNewFile, {items: fs.selectedItems})"
      >
        <NewFileSVG/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Rename')"
          v-if="app.features.includes(FEATURES.RENAME)"
          @click="(fs.selectedItems.length !== 1) || app.modal.open(ModalRename, {items: fs.selectedItems})"
      >
        <RenameSVG :class="(fs.selectedItems.length === 1) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Delete')"
          v-if="app.features.includes(FEATURES.DELETE)"
          @click="(!fs.selectedItems.length) || app.modal.open(ModalDelete, {items: fs.selectedItems})"
      >
        <DeleteSVG :class="(fs.selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Upload')"
          v-if="app.features.includes(FEATURES.UPLOAD)"
          @click="app.modal.open(ModalUpload, {items: fs.selectedItems})"
      >
        <UploadSVG/>
      </div>

      <div
          class="mx-1.5"
          v-if="app.features.includes(FEATURES.UNARCHIVE) && fs.selectedItems.length === 1 && fs.selectedItems[0].mime_type === 'application/zip'"
          :title="t('Unarchive')"
          @click="(!fs.selectedItems.length) || app.modal.open(ModalUnarchive, {items: fs.selectedItems})"
      >
        <UnarchiveSVG :class="(fs.selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>

      <div
          class="mx-1.5"
          v-if="app.features.includes(FEATURES.ARCHIVE)"
          :title="t('Archive')"
          @click="(!fs.selectedItems.length) || app.modal.open(ModalArchive, {items: fs.selectedItems})"
      >
        <ArchiveSVG :class="(fs.selectedItems.length) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'"/>
      </div>
    </div>

    <div class="vuefinder__toolbar__search-results" v-else>
      <div class="pl-2">
        {{ t('Search results for') }}
        <span class="dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded">{{ search.query }}</span>
      </div>
      <LoadingSVG v-if="app.loadingIndicator === 'circular' && fs.isLoading()"/>
    </div>

    <div class="vuefinder__toolbar__controls">
      <div
          v-if="app.features.includes(FEATURES.FULL_SCREEN)"
          @click="toggleFullScreen"
          class="mx-1.5"
          :title="t('Toggle Full Screen')"
      >
        <MinimizeSVG v-if="app.fullScreen"/>
        <FullscreenSVG v-else/>
      </div>

      <div
          class="mx-1.5"
          :title="t('Change View')"
          @click="search.query.length || toggleView()"
      >
        <GridViewSVG v-if="app.view === 'grid'" class="vf-toolbar-icon"
                     :class="(!search.query.length) ? '' : 'vf-toolbar-icon-disabled'"/>
        <ListViewSVG v-if="app.view === 'list'" class="vf-toolbar-icon"
                     :class="(!search.query.length) ? '' : 'vf-toolbar-icon-disabled'"/>
      </div>
    </div>
  </div>
</template>
