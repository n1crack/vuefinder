<template>
  <div class="vuefinder__toolbar">
    <div class="vuefinder__toolbar__actions" v-if="!searchQuery.length">
      <div
        class="mx-1.5"
        :title="t('New Folder')"
        v-if="app.features.includes(FEATURES.NEW_FOLDER)"
        @click="app.modal.open(ModalNewFolder, {items: ds.getSelected()})"
      >
        <NewFolderSVG />
      </div>

      <div
        class="mx-1.5"
        :title="t('New File')"
        v-if="app.features.includes(FEATURES.NEW_FILE)"
        @click="app.modal.open(ModalNewFile, {items: ds.getSelected()})"
      >
        <NewFileSVG />
      </div>

      <div
        class="mx-1.5"
        :title="t('Rename')"
        v-if="app.features.includes(FEATURES.RENAME)"
        @click="(ds.getCount() !== 1) || app.modal.open(ModalRename, {items: ds.getSelected()})"
      >
        <RenameSVG :class="(ds.getCount() === 1) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'" />
      </div>

      <div
        class="mx-1.5"
        :title="t('Delete')"
        v-if="app.features.includes(FEATURES.DELETE)"
        @click="(!ds.getCount()) || app.modal.open(ModalDelete, {items: ds.getSelected()})"
      >
        <DeleteSVG :class="(ds.getCount()) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'" />
      </div>

      <div
        class="mx-1.5"
        :title="t('Upload')"
        v-if="app.features.includes(FEATURES.UPLOAD)"
        @click="app.modal.open(ModalUpload, {items: ds.getSelected()})"
      >
        <UploadSVG />
      </div>

      <div
        class="mx-1.5"
        v-if="app.features.includes(FEATURES.UNARCHIVE) && ds.getCount() === 1 && ds.getSelected()[0].mime_type === 'application/zip'"
        :title="t('Unarchive')"
        @click="(!ds.getCount()) || app.modal.open(ModalUnarchive, {items: ds.getSelected()})"
      >
        <UnarchiveSVG :class="(ds.getCount()) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'" />
      </div>

      <div
        class="mx-1.5"
        v-if="app.features.includes(FEATURES.ARCHIVE)"
        :title="t('Archive')"
        @click="(!ds.getCount()) || app.modal.open(ModalArchive, {items: ds.getSelected()})"
      >
        <ArchiveSVG :class="(ds.getCount()) ? 'vf-toolbar-icon' : 'vf-toolbar-icon-disabled'" />
      </div>
    </div>

    <div class="vuefinder__toolbar__search-results" v-else>
      <div class="pl-2">
        {{ t('Search results for') }}
        <span class="dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded">{{ searchQuery }}</span>
      </div>
      <LoadingSVG v-if="app.loadingIndicator === 'circular' && app.fs.loading" />
    </div>

    <div class="vuefinder__toolbar__controls">
      <div
        v-if="app.features.includes(FEATURES.FULL_SCREEN)"
        @click="toggleFullScreen"
        class="mx-1.5"
        :title="t('Toggle Full Screen')"
      >
        <MinimizeSVG v-if="app.fullScreen" />
        <FullscreenSVG v-else />
      </div>

      <div
        class="mx-1.5"
        :title="t('Change View')"
        @click="searchQuery.length || toggleView()"
      >
        <GridViewSVG v-if="app.view === 'grid'" class="vf-toolbar-icon" :class="(!searchQuery.length) ? '' : 'vf-toolbar-icon-disabled'" />
        <ListViewSVG v-if="app.view === 'list'" class="vf-toolbar-icon" :class="(!searchQuery.length) ? '' : 'vf-toolbar-icon-disabled'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, ref, watch} from 'vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "./modals/ModalNewFolder.vue";
import ModalNewFile from "./modals/ModalNewFile.vue";
import ModalRename from "./modals/ModalRename.vue";
import ModalDelete from "./modals/ModalDelete.vue";
import ModalUpload from "./modals/ModalUpload.vue";
import ModalUnarchive from "./modals/ModalUnarchive.vue";
import ModalArchive from "./modals/ModalArchive.vue";
import NewFolderSVG from "./icons/new_folder.svg";
import NewFileSVG from "./icons/new_file.svg";
import RenameSVG from "./icons/rename.svg";
import DeleteSVG from "./icons/delete.svg";
import UploadSVG from "./icons/upload.svg";
import ArchiveSVG from "./icons/archive.svg";
import UnarchiveSVG from "./icons/unarchive.svg";
import LoadingSVG from "./icons/loading.svg";
import FullscreenSVG from "./icons/full_screen.svg";
import MinimizeSVG from "./icons/minimize.svg";
import GridViewSVG from "./icons/grid_view.svg";
import ListViewSVG from "./icons/list_view.svg";

const app = inject('ServiceContainer');
const {setStore} = app.storage;
const {t} = app.i18n;

const ds = app.dragSelect;
const searchQuery = ref('');

app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

const toggleFullScreen = () => {
  app.fullScreen = !app.fullScreen;
}

watch(() => app.fullScreen, () => {
  if (app.fullScreen) {
    // add body overflow hidden
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    // remove body overflow hidden
    document.querySelector('body').style.overflow = '';
  }
  setStore('full-screen', app.fullScreen);
  app.emitter.emit('vf-fullscreen-toggle');
});

// View Management
const toggleView = () => {
  app.view = app.view === 'list' ? 'grid' : 'list';

  ds.refreshSelection();
  setStore('viewport', app.view)
};

</script>
