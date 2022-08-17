<template>
  <div class="relative h-full">
    <div v-if="view=='list'" class="grid grid-cols-12 border-b border-b-neutral-300 text-xs select-none">
        <div @click="sortBy('basename')" class="col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 flex items-center pl-1">
            Name
            <v-f-sort-icon :direction="sort.order=='asc'? 'down': 'up'" v-show="sort.active && sort.column=='basename'" />
          </div>
        <div @click="sortBy('size')" class="col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 flex items-center justify-center border-l border-r">
          Size
          <v-f-sort-icon :direction="sort.order=='asc'? 'down': 'up'"  v-show="sort.active && sort.column=='size'" />
        </div>
        <div @click="sortBy('timestamp')" class="col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 flex items-center justify-center">
          Date
          <v-f-sort-icon :direction="sort.order=='asc'? 'down': 'up'"  v-show="sort.active && sort.column=='timestamp'" />
        </div>
      </div>
    <div class="h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto resize-y p-1" :ref="el => selectorArea = el"  @contextmenu.self.prevent="emitter.emit('vf-contextmenu-show',{event: $event, area: selectorArea, items: getSelectedItems()})" >

      <div draggable="true"
           v-if="view=='list'"
           @dblclick="openItem(item)" @contextmenu.prevent="emitter.emit('vf-contextmenu-show', {event: $event, area: selectorArea, items: getSelectedItems(), target: item })"
           @dragstart="handleDragStart($event,item)"
           @dragover="handleDragOver($event,item)"
           @drop="handleDropZone($event,item)"
           class="vf-item grid grid-cols-1 border hover:bg-neutral-50 border-transparent my-0.5 w-full select-none"
           v-for="(item, index) in getItems()" :data-type="item.type" :data-item="JSON.stringify(item)" :data-index="index">
          <div class="grid grid-cols-12 items-center">
            <div class="flex col-span-7 items-center">
              <svg v-if="item.type == 'folder'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 text-sky-500 fill-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span class="overflow-ellipsis overflow-hidden whitespace-nowrap">{{item.basename }}</span>
            </div>
            <div class="col-span-2 text-center">{{ item.size ? filesize(item.size) : '' }}</div>
            <div class="col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap">{{ datetimestring(item.timestamp) }}</div>
          </div>
      </div>

      <div draggable="true"
           v-if="view=='grid'"
           @dblclick="openItem(item)" @contextmenu.prevent="emitter.emit('vf-contextmenu-show', {event: $event, area: selectorArea, items: getSelectedItems(), target: item })"
           @dragstart="handleDragStart($event,item)"
           @dragover="handleDragOver($event,item)"
           @drop="handleDropZone($event,item)"
           class="vf-item border border-transparent hover:bg-neutral-50 m-0.5 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none"
           v-for="(item, index) in getItems(false)" :data-type="item.type" :data-item="JSON.stringify(item)" :data-index="index">
          <div>
            <div class="relative">
              <svg v-if="item.type == 'folder'" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12 m-auto text-sky-500 fill-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div class="absolute hidden md:block top-1/2 w-full text-center text-neutral-500">{{ ext(item.extension) }}</div>
            </div>
            <span class="break-all">{{ title_shorten(item.basename) }}</span>
          </div>
      </div>

      <div class="absolute top-[-200px] left-[-200px]">
        <div :ref="el => dragImage = el"  class="absolute z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute h-6 w-6 md:h-12 md:w-12 m-auto text-neutral-500 z-10" fill="white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div class="text-neutral-700 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs">{{ selectedCount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFExplorer'
};
</script>

<script setup>
import {nextTick, onMounted, reactive, ref, watch} from 'vue';
import DragSelect from 'dragselect';
import filesize from './../utils/filesize.js'
import datetimestring from '../utils/datetimestring.js';
import VFSortIcon from './SortIcon.vue';

const props = defineProps({
  view: String,
  items: Object
});

const emitter = inject('emitter');
const ext = (item) => item?.substring(0, 3)
const title_shorten = (title) => title.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, '$2..$4');
const selectorArea = ref(null);
const dragImage = ref(null);
const selectedCount = ref(0)
const ds = ref(null);


const openItem = (item) => {
  if (item.type == 'folder') {
    emitter.emit('vf-fetch-index', item);
  } else {
    emitter.emit('vf-modal-show', {type: 'preview'});
  }
};

const sort = reactive( { active: false, column: '', order: '' });

const getItems = ( sorted = true) => {
  let files = [...props.items.files],
      column = sort.column,
      order = sort.order == 'asc' ? 1 : -1;

  if (!sorted) {
    return files;
  }

  const compare = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  if (sort.active) {
    files = files.slice().sort((a, b) => compare(a[column], b[column]) * order);
  }

  return files;
};

const sortBy = (column) => {
  if (sort.active && sort.column == column) {
    sort.active =  sort.order == 'asc'
    sort.column = column
    sort.order = 'desc'
  } else {
    sort.active =  true
    sort.column = column
    sort.order = 'asc'
  }
};

const getSelectedItems = () => ds.value.getSelection().map((el) => JSON.parse(el.dataset.item))

const handleDragStart = (e, item) => {
  if (e.altKey || e.ctrlKey || e.metaKey) {
    e.preventDefault();
    return false;
  }

  let img = dragImage.value;
  e.dataTransfer.setDragImage(img, 0, 15);
  e.dataTransfer.effectAllowed = 'all';
  e.dataTransfer.dropEffect = 'copy';
  console.log(ds.value.getSelection());
  console.log(item);
  // e.dataTransfer.setData('data', JSON.stringify(ds.getSelection()));
};

const handleDropZone = (e, item) => {
  e.preventDefault();
  console.log(item);
  console.log(getSelectedItems());
  // console.log(item.path);
};

const handleDragOver = (e, item) => {
  e.preventDefault();
  if (!item || item.type !== 'folder' || ds.value.getSelection().find(el => el == e.currentTarget)) {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};

const setDragSelect = () => {
  ds.value = new DragSelect({
    area: selectorArea.value,
    keyboardDrag: false,
    selectedClass: 'vf-explorer-selected',
  });

  emitter.on('vf-explorer-update', () => nextTick(() => {
    ds.value.clearSelection();
    ds.value.setSelectables(document.getElementsByClassName('vf-item'));
  }));

  ds.value.subscribe('predragstart', ({isDragging}) => {
    // apply custom drag event
    if (isDragging) {
      selectedCount.value = ds.value.getSelection().length
      ds.value.break();
    }
  });

  ds.value.subscribe('predragmove', ({isDragging}) => {
    if (isDragging) {
      ds.value.break();
    }
  });

  ds.value.subscribe("callback", (	{ items, event, isDragging}) => {
    selectedCount.value = ds.value.getSelection().length
  })
};

onMounted(() => {
  watch(() => props.view, () =>emitter.emit('vf-explorer-update'));
});

onMounted(setDragSelect)
</script>

