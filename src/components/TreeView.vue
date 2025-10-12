<script setup lang="ts">
import {inject, onMounted, onUnmounted, ref, watch} from 'vue';
import {useStore} from '@nanostores/vue';
import FolderSVG from '../assets/icons/folder.svg';
import OpenFolderSVG from '../assets/icons/open_folder.svg';
import PinSVG from "../assets/icons/pin.svg";
import XBoxSVG from "../assets/icons/x_box.svg";

import {OverlayScrollbars} from 'overlayscrollbars';
import TreeStorageItem from "./TreeStorageItem.vue";
import upsert from "../utils/upsert";
import FolderIndicator from "./FolderIndicator.vue";
import {useDragNDrop} from '../composables/useDragNDrop';
import type {App, PinnedFolder} from '../types';

const app = inject('ServiceContainer') as App;
const {t} = app.i18n;
const {getStore, setStore} = app.storage;

const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState = useStore(config.state);
const sortedFiles = useStore(fs.sortedFiles);
const path = useStore(fs.path);

const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])

const treeViewWidth = ref(190);
const pinnedFoldersOpened = ref(getStore('pinned-folders-opened', true));
watch(pinnedFoldersOpened, (value) => setStore('pinned-folders-opened', value));

const removePin = (item: PinnedFolder) => {
  config.set('pinnedFolders', config.get('pinnedFolders').filter((fav: PinnedFolder) => fav.path !== item.path));
}

const handleMouseDown = (e: MouseEvent) => {
  const startX = e.clientX;
  const element = (e.target as HTMLElement).parentElement;
  if (!element) return;

  const startWidth = element.getBoundingClientRect().width;

  // start of event remove transition-[width] and add transition-none
  element.classList.remove('transition-[width]');
  element.classList.add('transition-none');

  const handleMouseMove = (e: MouseEvent) => {
    treeViewWidth.value = startWidth + e.clientX - startX;

    if (treeViewWidth.value < 50) {
      treeViewWidth.value = 0;
      config.set('showTreeView', false);
    }
    if (treeViewWidth.value > 50) {
      config.set('showTreeView', true);
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
  if (treeViewScrollElement.value) {
    OverlayScrollbars(treeViewScrollElement.value, {
      overflow: {
        x: 'hidden',
      },
      scrollbars: {
        theme: 'vf-theme-dark dark:vf-theme-light',
      },
    });
  }
});

// watch for changes in the fs.data
// update the treeViewData
watch(sortedFiles, (newFiles) => {
  const folders = newFiles.filter((e) => e.type === 'dir');
  upsert(app.treeViewData, {
    path: path.value?.path || '', folders: folders.map((item) => {
      return {
        storage: item.storage,
        path: item.path,
        basename: item.basename,
        type: 'dir' as const
      }
    })
  })
});

</script>


<template>
  <div
      @click="config.toggle('showTreeView')"
      class="vuefinder__treeview__overlay"
      :class="configState.showTreeView ? 'vuefinder__treeview__backdrop' : 'hidden'"
  ></div>
  <div
      :style="configState.showTreeView ? 'min-width:100px;max-width:75%; width: ' + treeViewWidth + 'px' : 'width: 0'"
      class="vuefinder__treeview__container"
  >
    <div ref="treeViewScrollElement" class="vuefinder__treeview__scroll">
      <div class="vuefinder__treeview__header">
        <div
            @click="pinnedFoldersOpened = !pinnedFoldersOpened"
            class="vuefinder__treeview__pinned-toggle"
        >
          <div class="vuefinder__treeview__pinned-label">
            <PinSVG class="vuefinder__treeview__pin-icon"/>
            <div class="vuefinder__treeview__pin-text text-nowrap">{{ t('Pinned Folders') }}</div>
          </div>
          <FolderIndicator v-model="pinnedFoldersOpened"/>
        </div>
        <ul class="vuefinder__treeview__pinned-list" v-if="pinnedFoldersOpened">
          <li
              v-for="folder in configState.pinnedFolders"
              :key="folder.path"
              class="vuefinder__treeview__pinned-item"
          >
            <div
                v-on="dragNDrop.events(folder)"
                class="vuefinder__treeview__pinned-folder"
                @click="app.emitter.emit('vf-fetch', {params:{q: 'index', storage: folder.storage, path:folder.path}})"
            >
              <FolderSVG class="vuefinder__treeview__folder-icon" v-if="path?.path !== folder.path"/>
              <OpenFolderSVG class="vuefinder__treeview__open-folder-icon" v-if="path?.path === folder.path"/>
              <div

                  :title="folder.path"
                  class="vuefinder__treeview__folder-name"
                  :class="{
                  'vuefinder__treeview__folder-name--active': path?.path === folder.path,
                }"
              >
                {{ folder.basename }}
              </div>
            </div>
            <div class="vuefinder__treeview__remove-folder" @click="removePin(folder)">
              <XBoxSVG class="vuefinder__treeview__remove-icon"/>
            </div>
          </li>
          <li v-if="!configState.pinnedFolders.length">
            <div class="vuefinder__treeview__no-pinned">{{ t('No folders pinned') }}</div>
          </li>
        </ul>
      </div>

      <div class="vuefinder__treeview__storage" v-for="storage in fs.storages.get()" :key="storage">
        <TreeStorageItem :storage="storage"/>
      </div>
    </div>
    <div
        @mousedown="handleMouseDown"
        class="vuefinder__treeview__resize-handle"
    ></div>
  </div>
</template>
