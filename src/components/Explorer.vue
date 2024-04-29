<template>
  <div class="relative flex-auto flex flex-col overflow-hidden">
    <div v-if="app.view === 'list' || searchQuery.length" class="grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x">
      <div @click="sortBy('basename')" class="col-span-7 vf-sort-button">
        {{ t('Name') }} <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'basename'"/>
      </div>
      <div v-if="!searchQuery.length" @click="sortBy('file_size')" class="justify-center col-span-2 vf-sort-button">
        {{ t('Size') }} <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'file_size'"/>
      </div>
      <div v-if="!searchQuery.length" @click="sortBy('last_modified')" class="justify-center col-span-3 vf-sort-button">
        {{ t('Date') }} <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'last_modified'"/>
      </div>
      <div v-if="searchQuery.length" @click="sortBy('path')" class="justify-center col-span-5 vf-sort-button">
        {{ t('Filepath') }} <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'path'"/>
      </div>
    </div>

    <div class="relative">
      <DragItem ref="dragImage" :count="ds.getCount()"/>
    </div>

      <div ref="selectorArea"
          :class="app.fullScreen ? '' : 'resize-y'"
          class="h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"

           @touchstart="handleTouchStart"
           @contextmenu.self.prevent="app.emitter.emit('vf-contextmenu-show',{event: $event, items: ds.getSelected()})"
      >

        <Item :item="item" :dragImage="dragImage" v-if="searchQuery.length" class="vf-item vf-item-list"
              v-for="(item, index) in getItems()" :data-type="item.type" :data-item="JSON.stringify(item)" :data-index="index">
          <div class="grid grid-cols-12 items-center">
            <div class="flex col-span-7 items-center">
              <ItemIcon :type="item.type" :small="app.compactListView"/>
              <span class="overflow-ellipsis overflow-hidden whitespace-nowrap">{{ item.basename }}</span>
            </div>
            <div class="col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap">{{ item.path }}</div>
          </div>
        </Item>

        <Item :item="item" :dragImage="dragImage" draggable="true" v-if="app.view==='list' && !searchQuery.length" class="vf-item vf-item-list"
              v-for="(item, index) in getItems()" :data-type="item.type" :data-item="JSON.stringify(item)" :data-index="index">
          <div class="grid grid-cols-12 items-center">
            <div class="flex col-span-7 items-center">
              <ItemIcon :type="item.type" :small="app.compactListView"/>
              <span class="overflow-ellipsis overflow-hidden whitespace-nowrap">{{ item.basename }}</span>
            </div>
            <div class="col-span-2 text-center">{{ item.file_size ? app.filesize(item.file_size) : '' }}</div>
            <div class="col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {{ datetimestring(item.last_modified) }}
            </div>
          </div>
        </Item>

        <Item :item="item" :dragImage="dragImage" draggable="true" v-if="app.view==='grid' && !searchQuery.length" class="vf-item vf-item-grid"
              v-for="(item, index) in getItems(false)" :data-type="item.type" :data-item="JSON.stringify(item)" :data-index="index">
          <div>
            <div class="relative">
              <img class="lazy h-10 md:h-12 m-auto" v-if="(item.mime_type ?? '').startsWith('image')"
                   :data-src="app.requester.getPreviewUrl(app.adapter, item)" :alt="item.basename" :key="item.path">
              <ItemIcon :type="item.type" v-else/>
              <div class="absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
                   v-if="!(item.mime_type ?? '').startsWith('image') && item.type != 'dir'">{{ ext(item.extension) }}
              </div>
            </div>
            <span class="break-all">{{ title_shorten(item.basename) }}</span>
          </div>
        </Item>
    </div>
    <Toast/>
  </div>
</template>

<script setup>
import {inject, nextTick, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch} from 'vue';
import datetimestring from '../utils/datetimestring.js';
import Toast from './Toast.vue';
import LazyLoad from 'vanilla-lazyload';
import title_shorten from "../utils/title_shorten.js";
import SortIcon from "./SortIcon.vue";
import DragItem from "./DragItem.vue";
import ItemIcon from "./icons/ItemIcon.vue";
import Item from "./Item.vue";

const app = inject('ServiceContainer');
const {t} = app.i18n;

const ext = (item) => item?.substring(0, 3)
const selectorArea = ref(null);
const resizer = ref(null);
const dragImage = ref(null);

const searchQuery = ref('');
const ds = app.dragSelect;

/** @type {import('vanilla-lazyload').ILazyLoadInstance} */
let vfLazyLoad

app.emitter.on('vf-fullscreen-toggle', () => {
  selectorArea.value.style.height = null;
});


app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;

  if (newQuery) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'search',
        adapter: app.data.adapter,
        path: app.data.dirname,
        filter: newQuery
      },
      onSuccess: (data) => {
        if (!data.files.length) {
          app.emitter.emit('vf-toast-push', {label: t('No search result found.')});
        }
      }
    });
  } else {
    app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.data.adapter, path: app.data.dirname}});
  }
});


// on ios devices scrollbars are hidden as system level.
// to be able to scroll, 2 finger tap needed.
// this is the easiest way that I can think of.
const dragAndDrop = ref(true);

const handleTouchStart = (event) => {
  if (event.touches.length > 1) {
    if (!dragAndDrop.value) {
      ds.obj.value.start();
      app.emitter.emit('vf-toast-push', {label: t('Drag&Drop: on')});
      app.emitter.emit('vf-explorer-update');
    } else {
      ds.obj.value.stop();
      app.emitter.emit('vf-toast-push', {label: t('Drag&Drop: off')});
    }
    dragAndDrop.value = !dragAndDrop.value;
  }
};


const sort = reactive({active: false, column: '', order: ''});

const getItems = (sorted = true) => {
  let files = [...app.data.files],
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
  if (sort.active && sort.column === column) {
    sort.active = sort.order === 'asc'
    sort.column = column
    sort.order = 'desc'
  } else {
    sort.active = true
    sort.column = column
    sort.order = 'asc'
  }
};

onMounted(() => {
  vfLazyLoad = new LazyLoad(selectorArea.value);

  app.emitter.on('vf-explorer-update', () => nextTick(() => {
    ds.obj.value.clearSelection();
    ds.obj.value.setSettings({
      selectables: document.getElementsByClassName('vf-item'),
    })
  }));

  ds.init(selectorArea.value)

  watch(() => app.view, () => app.emitter.emit('vf-explorer-update'));
});

onUpdated(() => {
  ds.obj.value.Area.reset();
  ds.obj.value.SelectorArea.updatePos();
  vfLazyLoad.update();
});

onBeforeUnmount(() => {
  vfLazyLoad.destroy();
});

</script>
