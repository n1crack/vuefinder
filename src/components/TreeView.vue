<template>
  <div :style="app.showTreeView ? 'min-width:50px;max-width:75%; width: '+ treeViewWidth + 'px' : 'width: 0'"
       class="h-full md:h-auto absolute md:relative shrink-0 transition-[width] ease-in-out duration-200 z-[1] overflow-hidden backdrop-blur-xl">
    <ul
        class="overflow-auto border-t border-r dark:border-gray-600/50 p-1 me-3 h-full w-full absolute  md:block bg-gray-100/10 dark:bg-gray-600/10">

      <li v-for="a in 1"
          class="flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">

        <div>
          <OpenFolderSVG class="h-5 w-5"/>
        </div>
        <div>public</div>
      </li>

      <li v-for="a in 1"
          class="ms-2 flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
        <div>
          <FolderSVG class="h-5 w-5"/>
        </div>
        <div>media</div>
      </li>


      <li
          class="ms-2 flex space-x-1 pl-2 py-0.5 text-sm hover:text-sky-500 dark:hover:text-sky-200/50 rounded cursor-pointer">
        <div>
          <FolderSVG class="h-5 w-5"/>
        </div>
        <div>wip</div>
      </li>

    </ul>
    <div
        @mousedown="handleMouseDown"
        :class="app.showTreeView ? '' : '-right-3'"
        class="transition-colors ease-in-out duration-200 hover:bg-slate-600/10 dark:hover:bg-slate-300/10 w-1 h-full absolute right-0 cursor-ew-resize"></div>
  </div>
</template>

<script setup>
import {inject, ref} from 'vue';
import FolderSVG from './icons/folder.svg';
import OpenFolderSVG from './icons/open_folder.svg';

const app = inject('ServiceContainer');

const treeViewWidth = ref(176);

const handleMouseDown = (e) => {
  const startX = e.clientX;
  const startWidth = treeViewWidth.value;
  // start of event remove transition-[width] and add transition-none
  const element = e.target.parentElement;
  element.classList.remove('transition-[width]');
  element.classList.add('transition-none');

  const handleMouseMove = (e) => {
    treeViewWidth.value = startWidth + e.clientX - startX;
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
</script>
