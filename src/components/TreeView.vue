<template>
  <div @click="app.showTreeView = ! app.showTreeView" class=" w-full h-full bg-gray-300/10 dark:bg-gray-700/10 z-[1]" :class="app.showTreeView ? 'backdrop-blur-sm absolute md:hidden' : 'hidden'"></div>
  <div :style="app.showTreeView ? 'min-width:50px;max-width:75%; width: '+ treeViewWidth + 'px' : 'width: 0'"
       class="me-3 absolute h-full md:h-auto md:relative shadow-lg shrink-0 transition-[width] ease-in-out duration-200 z-[1] bg-gray-50 dark:bg-[#242f41]">
    <div ref="treeViewScrollElement" class="h-full border-r dark:border-gray-600/50 " >

      <div class="p-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex items-center space-x-1">
        <div><StarSVG class="text-yellow-600" /></div> <div>Favorites</div>
      </div>
      <ul class="block ">
        <li class="flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
          <div><FolderSVG class="h-5 w-5"/></div>
          <div>Downloads</div>
        </li>
        <li class="flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
          <div><FolderSVG class="h-5 w-5"/></div>
          <div>Documents</div>
        </li>
        <li class="flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
          <div><FolderSVG class="h-5 w-5"/></div>
          <div>Desktop</div>
        </li>
      </ul>
      <div class="pt-1 px-1 uppercase font-bold text-gray-400 dark:text-gray-500 text-xs flex items-center space-x-1">
        <div><StorageSVG /></div> <div>{{ app.fs.adapter }}</div>
      </div>
      <ul class="block ">
        <li v-for="(item, index) in treeViewData" @click="item.opened = !item.opened"
            class="flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
          <div>
            <OpenFolderSVG v-if="item.opened" class="h-5 w-5"/>
            <FolderSVG v-else class="h-5 w-5"/>
          </div>
          <div>{{ item.basename }}</div>
        </li>
      </ul>

    </div>
    <div
        @mousedown="handleMouseDown"
        :class="app.showTreeView ? '' : ''"
        class="transition-colors ease-in-out duration-200  top-0 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute -right-0.5 cursor-ew-resize">
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted, ref, watch} from 'vue';
import FolderSVG from './icons/folder.svg';
import OpenFolderSVG from './icons/open_folder.svg';
import StorageSVG from "./icons/storage.svg";
import StarSVG from "./icons/star.svg";

import {OverlayScrollbars} from 'overlayscrollbars';

const app = inject('ServiceContainer');

const treeViewWidth = ref(176);

const treeViewData= ref([]);

const handleMouseDown = (e) => {
  const startX = e.clientX;
  const element = e.target.parentElement;
  const startWidth = element.getBoundingClientRect().width;

  // start of event remove transition-[width] and add transition-none
  element.classList.remove('transition-[width]');
  element.classList.add('transition-none');

  const handleMouseMove = (e) => {
    treeViewWidth.value = startWidth + e.clientX - startX;

    console.log(treeViewWidth.value);
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

watch(() => app.fs.data.rootDirs, (newVal) => {
  treeViewData.value = newVal;
});

onMounted(() => {
  OverlayScrollbars(treeViewScrollElement.value, {});
});
</script>
