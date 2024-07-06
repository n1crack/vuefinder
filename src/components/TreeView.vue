<template>
  <div
    @click="app.showTreeView = !app.showTreeView"
    class="vuefinder__treeview__overlay"
    :class="app.showTreeView ? 'vuefinder__treeview__backdrop' : 'hidden'"
  ></div>
  <div
    :style="app.showTreeView ? 'min-width:100px;max-width:75%; width: ' + treeViewWidth + 'px' : 'width: 0'"
    class="vuefinder__treeview__container"
  >
    <div ref="treeViewScrollElement" class="vuefinder__treeview__scroll">
      <div class="vuefinder__treeview__header">
        <div
          @click="pinnedFoldersOpened = !pinnedFoldersOpened"
          class="vuefinder__treeview__pinned-toggle"
        >
          <div class="vuefinder__treeview__pinned-label">
            <PinSVG class="vuefinder__treeview__pin-icon" />
            <div class="vuefinder__treeview__pin-text text-nowrap">{{ t('Pinned Folders') }}</div>
          </div>
          <FolderIndicator v-model="pinnedFoldersOpened" />
        </div>
        <ul class="vuefinder__treeview__pinned-list" v-if="pinnedFoldersOpened">
          <li v-for="favorite in app.pinnedFolders" class="vuefinder__treeview__pinned-item">
            <div
              class="vuefinder__treeview__pinned-folder"
              @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: favorite.storage, path:favorite.path}})"
            >
              <FolderSVG class="vuefinder__treeview__folder-icon" v-if="app.fs.path !== favorite.path" />
              <OpenFolderSVG class="vuefinder__treeview__open-folder-icon" v-if="app.fs.path === favorite.path" />
              <div
                :title="favorite.path"
                class="vuefinder__treeview__folder-name text-nowrap"
                :class="{
                  'vuefinder__treeview__folder-name--active': app.fs.path === favorite.path,
                }"
              >
                {{ favorite.basename }}
              </div>
            </div>
            <div class="vuefinder__treeview__remove-favorite" @click="removeFavorite(favorite)">
              <XBoxSVG class="vuefinder__treeview__remove-icon" />
            </div>
          </li>
          <li v-if="!app.pinnedFolders.length">
            <div class="vuefinder__treeview__no-pinned">{{ t('No folders pinned') }}</div>
          </li>
        </ul>
      </div>

      <div class="vuefinder__treeview__storage" v-for="storage in app.fs.data.storages">
        <TreeStorageItem :storage="storage" />
      </div>
    </div>
    <div
      @mousedown="handleMouseDown"
      :class="app.showTreeView ? '' : ''"
      class="vuefinder__treeview__resize-handle"
    ></div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import FolderSVG from './icons/folder.svg';
import OpenFolderSVG from './icons/open_folder.svg';
import PinSVG from "./icons/pin.svg";
import XBoxSVG from "./icons/x_box.svg";

import {OverlayScrollbars} from 'overlayscrollbars';
import TreeStorageItem from "./TreeStorageItem.vue";
import upsert from "../utils/upsert";
import FolderIndicator from "./FolderIndicator.vue";

const app = inject('ServiceContainer');
const {t} = app.i18n;
const {getStore, setStore} = app.storage;

const treeViewWidth = ref(190);
const pinnedFoldersOpened = ref(getStore('pinned-folders-opened', true));
watch(pinnedFoldersOpened, (value) => setStore('pinned-folders-opened', value));

const removeFavorite = (item) => {
    app.pinnedFolders = app.pinnedFolders.filter(fav => fav.path !== item.path);
    app.storage.setStore('pinned-folders', app.pinnedFolders);
}

const handleMouseDown = (e) => {
  const startX = e.clientX;
  const element = e.target.parentElement;
  const startWidth = element.getBoundingClientRect().width;

  // start of event remove transition-[width] and add transition-none
  element.classList.remove('transition-[width]');
  element.classList.add('transition-none');

  const handleMouseMove = (e) => {
    treeViewWidth.value = startWidth + e.clientX - startX;

    if (treeViewWidth.value < 50) {
        treeViewWidth.value = 0;
        app.showTreeView = false;
    }
    if (treeViewWidth.value > 50) {
        app.showTreeView = true;
    }
  };

  const handleMouseUp = () => {
    // get the actual width of the element, update the treeViewWidth
    const elementData = element.getBoundingClientRect();
    treeViewWidth.value = elementData.width;
    // end of event add transition-[width] and remove transition-none
    element.classList.add('transition-[width]');
    element.classList.remove('transition-none');
    // remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

}
const treeViewScrollElement = ref(null);

onMounted(() => {
  OverlayScrollbars(treeViewScrollElement.value, {
      overflow: {
        x: 'hidden',
      },
      scrollbars: {
          theme: 'vf-theme-dark dark:vf-theme-light',
      },
  });
});

// watch for changes in the fs.data
// update the treeViewData
watch(app.fs.data, (newValue, oldValue) => {
    const folders = newValue.files.filter(e => e.type === 'dir');

    upsert(app.treeViewData, {path: app.fs.path, folders: folders.map((item) => {
        return {
            adapter: item.storage, 
            path: item.path, 
            basename: item.basename
        }
    })})
});

</script>
