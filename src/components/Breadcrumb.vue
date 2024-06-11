<template>
  <div
      class="flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm">
    <span :aria-label="t('Go up a directory')" data-microtip-position="bottom-right" role="tooltip">
      <GoUpSVG
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event)"
          @click="handleGoUp"
          :class="app.fs.isGoUpAvailable() ? 'text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer' : 'text-gray-400 dark:text-neutral-500'"
      />
    </span>

    <span :aria-label="t('Refresh')" data-microtip-position="bottom-right" role="tooltip" v-if="!app.fs.loading">
      <RefreshSVG @click="handleRefresh"/>
    </span>
    <span :aria-label="t('Cancel')" data-microtip-position="bottom-right" role="tooltip" v-else>
      <CloseSVG @click="app.emitter.emit('vf-fetch-abort')"/>
    </span>

    <div v-show="!app.fs.searchMode" @click.self="enterSearchMode" class="group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden">
      <div>
        <HomeSVG
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDropZone($event, -1)"
          @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.fs.adapter}})"/>
      </div>

      <div class="flex leading-6">
        <div v-if="app.fs.hiddenBreadcrumbs.length" class="flex" v-click-outside="handleClickOutside">
          <div class="text-neutral-300 dark:text-gray-600 mx-0.5">/</div>
          <div class="relative">
            <span 
            @dragenter="app.fs.toggleHiddenBreadcrumbs(true)"
            @click="app.fs.toggleHiddenBreadcrumbs()"
                   class="text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer">
              <DotsSVG class="px-1 pointer-events-none" />
            </span>
          </div>
        </div>
      </div>

      <div ref="breadcrumbContainer" class="flex leading-6 w-full overflow-hidden"  @click.self="enterSearchMode">
        <div v-for="(item, index) in app.fs.breadcrumbs" :key="index">
          <span class="text-neutral-300 dark:text-gray-600 mx-0.5">/</span>
          <span
              @dragover="(index === app.fs.breadcrumbs.length - 1) || handleDragOver($event)"
              @dragleave="(index === app.fs.breadcrumbs.length - 1) || handleDragLeave($event)"
              @drop="(index === app.fs.breadcrumbs.length - 1) || handleDropZone($event, index)"
              class="px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap"
              :title="item.basename"
              @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.fs.adapter, path:item.path}})">{{
              item.name
            }}</span>
        </div>
      </div>

      <LoadingSVG v-if="app.fs.loading"/>
    </div>
    <div  v-show="app.fs.searchMode"  class="relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full">
      <div>
        <SearchSVG />
      </div>
      <input
          ref="searchInput"
          @keydown.esc="exitSearchMode"
          @blur="handleBlur"
          v-model="query"
          :placeholder="t('Search anything..')"
          class="w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent"
          type="text">
      <ExitSVG @click="exitSearchMode"/>
    </div>

    <div v-show="app.fs.showHiddenBreadcrumbs"
        class="z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600">
      <div
          v-for="(item, index) in app.fs.hiddenBreadcrumbs" :key="index"
          @dragover="handleDragOver($event)"
          @dragleave="handleDragLeave($event)"
          @drop="handleHiddenBreadcrumbDropZone($event, index)"
          @click="handleHiddenBreadcrumbsClick(item)"
          class="px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap" >
        <div class="flex pointer-events-none">
          <span><FolderSVG class="h-5 w-5" /></span> <span class="inline-block w-full text-ellipsis overflow-hidden">{{ item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, nextTick, onMounted, ref, watch} from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef.js';
import {FEATURES} from "./features.js";
import ModalMove from "./modals/ModalMove.vue";
import RefreshSVG from "./icons/refresh.svg";
import GoUpSVG from "./icons/go_up.svg";
import CloseSVG from "./icons/close.svg";
import HomeSVG from "./icons/home.svg";
import SearchSVG from "./icons/search.svg";
import LoadingSVG from "./icons/loading.svg";
import ExitSVG from "./icons/exit.svg";
import FolderSVG from './icons/folder.svg';
import DotsSVG from './icons/dots.svg';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const ds = app.dragSelect;

// dynamic shown items calculation for breadcrumbs
const breadcrumbContainer = ref(null);
const breadcrumbContainerWidth = useDebouncedRef(0,100);
watch(breadcrumbContainerWidth, newQuery => {
  const children = breadcrumbContainer.value.children;
  let totalWidth = 0;
  let count = 0;
  let max_shown_items = 5;
  let min_shown_items = 1;

  app.fs.limitBreadcrumbItems(max_shown_items);
  nextTick(() => {
    for (let i = children.length-1; i >= 0; i--) {
      if (totalWidth + children[i].offsetWidth > breadcrumbContainerWidth.value - 40) {
        break;
      }
      totalWidth += parseInt(children[i].offsetWidth, 10);
      count++;
    }

    if (count < min_shown_items) count = min_shown_items;
    if (count > max_shown_items) count = max_shown_items;

    app.fs.limitBreadcrumbItems(count);
  });
});

const updateContainerWidth = () => {
    breadcrumbContainerWidth.value = breadcrumbContainer.value.offsetWidth;
}
onMounted(() => {
  new ResizeObserver(updateContainerWidth).observe(breadcrumbContainer.value);
});


const handleHiddenBreadcrumbDropZone = (e, index = null) => {
  e.preventDefault();

  ds.isDraggingRef.value = false;
  handleDragLeave(e);

  index ??= app.fs.hiddenBreadcrumbs.length - 1;

  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage !== app.fs.adapter)) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  app.modal.open(ModalMove, {
    items: {
      from: draggedItems,
      to: app.fs.hiddenBreadcrumbs[index] ?? {path: (app.fs.adapter + '://')}
    }
  })
};

const handleDropZone = (e, index = null) => {
  e.preventDefault();

  ds.isDraggingRef.value = false;
  handleDragLeave(e);

  index ??= app.fs.breadcrumbs.length - 2;

  let draggedItems = JSON.parse(e.dataTransfer.getData('items'));

  if (draggedItems.find(item => item.storage !== app.fs.adapter)) {
    alert('Moving items between different storages is not supported yet.');
    return;
  }

  app.modal.open(ModalMove, {
    items: {
      from: draggedItems,
      to: app.fs.breadcrumbs[index] ?? {path: (app.fs.adapter + '://')}
    }
  })
};

const handleDragOver = (e) => {
  e.preventDefault();

  if (app.fs.isGoUpAvailable()) {
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('bg-blue-200', 'dark:bg-slate-600');
  } else {
    e.dataTransfer.dropEffect = 'none';
    e.dataTransfer.effectAllowed = 'none';
  }
};

const handleDragLeave = (e) => {
  e.preventDefault();

  e.currentTarget.classList.remove('bg-blue-200', 'dark:bg-slate-600');

  if (app.fs.isGoUpAvailable()) {
    e.currentTarget.classList.remove('bg-blue-200', 'dark:bg-slate-600');
  }
};

const handleRefresh = () => {
  exitSearchMode();

  app.emitter.emit('vf-fetch',{params:{q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}} );
}

const handleGoUp = () => {
  exitSearchMode();

  !app.fs.isGoUpAvailable() || app.emitter.emit('vf-fetch', {
    params: {
      q: 'index',
      adapter: app.fs.adapter,
      path: app.fs.parentFolderPath
    }
  })
}

const handleHiddenBreadcrumbsClick = (item) => {
  app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: item.path}});
  app.fs.toggleHiddenBreadcrumbs(false);
}

const handleClickOutside = () => {
  if (app.fs.showHiddenBreadcrumbs) {
    app.fs.toggleHiddenBreadcrumbs(false);
  }
}

const vClickOutside = {
  mounted(el, binding, vnode, prevVnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
};

/**
 *
 * Search
 */

const searchInput = ref(null);

const enterSearchMode = () => {
  if (!app.features.includes(FEATURES.SEARCH)) {
    return;
  }
  app.fs.searchMode = true;
  nextTick(() => searchInput.value.focus());
}

const query = useDebouncedRef('', 400);

watch(query, newQuery => {
  app.emitter.emit('vf-toast-clear');
  app.emitter.emit('vf-search-query', {newQuery});
});

watch(() => app.fs.searchMode, (newSearchMode) => {
  if (newSearchMode) {
    nextTick(() => searchInput.value.focus());
  }
});

const exitSearchMode = () => {
  app.fs.searchMode = false;
  query.value = '';
}

app.emitter.on('vf-search-exit', () => {
  exitSearchMode();
});


const handleBlur = () => {
  if (query.value === '') {
    exitSearchMode();
  }
}
</script>


