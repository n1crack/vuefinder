<template>
  <div class="vuefinder__breadcrumb__container">
    <span :title="t('Toggle Tree View')">
      <ListTreeSVG
          @click="toggleTreeView"
          class="vuefinder__breadcrumb__toggle-tree"
          :class="app.showTreeView ? 'vuefinder__breadcrumb__toggle-tree--active' : ''"
      />
    </span>

    <span :title="t('Go up a directory')">
      <GoUpSVG
          v-on="app.fs.isGoUpAvailable() ? dragNDrop.events(getBreadcrumb()) : {}"
          @click="handleGoUp"
          :class="app.fs.isGoUpAvailable() ? 'vuefinder__breadcrumb__go-up--active' : 'vuefinder__breadcrumb__go-up--inactive'"
      />
    </span>

    <span :title="t('Refresh')" v-if="!app.fs.loading">
      <RefreshSVG @click="handleRefresh"/>
    </span>
    <span :title="t('Cancel')" v-else>
      <CloseSVG @click="app.emitter.emit('vf-fetch-abort')"/>
    </span>

    <div v-show="!app.fs.searchMode" @click.self="enterSearchMode" class="group vuefinder__breadcrumb__search-container">
      <div>
        <HomeSVG
          v-on="dragNDrop.events(getBreadcrumb(-1))"
          @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.fs.adapter}})"/>
      </div>

      <div class="vuefinder__breadcrumb__list">
        <div v-if="app.fs.hiddenBreadcrumbs.length" class="vuefinder__breadcrumb__hidden-list" v-click-outside="handleClickOutside">
          <div class="vuefinder__breadcrumb__separator">/</div>
          <div class="relative">
            <span 
            @dragenter="app.fs.toggleHiddenBreadcrumbs(true)"
            @click="app.fs.toggleHiddenBreadcrumbs()"
                   class="vuefinder__breadcrumb__hidden-toggle">
              <DotsSVG class="vuefinder__breadcrumb__hidden-toggle-icon" />
            </span>
          </div>
        </div>
      </div>

      <div ref="breadcrumbContainer" class="vuefinder__breadcrumb__visible-list" @click.self="enterSearchMode">
        <div v-for="(item, index) in app.fs.breadcrumbs" :key="index">
          <span class="vuefinder__breadcrumb__separator">/</span>
          <span
              v-on="dragNDrop.events(item)"
              class="vuefinder__breadcrumb__item"
              :title="item.basename"
              @click="app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.fs.adapter, path:item.path}})">{{ item.name }}</span>
        </div>
      </div>

      <LoadingSVG v-if="app.loadingIndicator === 'circular' && app.fs.loading"/>
    </div>
    <div v-show="app.fs.searchMode" class="vuefinder__breadcrumb__search-mode">
      <div>
        <SearchSVG />
      </div>
      <input
          ref="searchInput"
          @keydown.esc="exitSearchMode"
          @blur="handleBlur"
          v-model="query"
          :placeholder="t('Search anything..')"
          class="vuefinder__breadcrumb__search-input"
          type="text">
      <ExitSVG @click="exitSearchMode"/>
    </div>

    <div v-show="app.fs.showHiddenBreadcrumbs"
        class="vuefinder__breadcrumb__hidden-dropdown">
      <div
          v-for="(item, index) in app.fs.hiddenBreadcrumbs" :key="index"
          v-on="dragNDrop.events(item)"
          @click="handleHiddenBreadcrumbsClick(item)"
          class="vuefinder__breadcrumb__hidden-item">
        <div class="vuefinder__breadcrumb__hidden-item-content">
          <span><FolderSVG class="vuefinder__breadcrumb__hidden-item-icon" /></span> <span class="vuefinder__breadcrumb__hidden-item-text">{{ item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, nextTick, onMounted, onUnmounted, ref, watch} from 'vue';
import useDebouncedRef from '../composables/useDebouncedRef';
import {FEATURES} from "../features.js";
import ModalMove from "./modals/ModalMove.vue";
import RefreshSVG from "@/assets/icons/refresh.svg";
import GoUpSVG from "@/assets/icons/go_up.svg";
import CloseSVG from "@/assets/icons/close.svg";
import HomeSVG from "@/assets/icons/home.svg";
import SearchSVG from "@/assets/icons/search.svg";
import LoadingSVG from "@/assets/icons/loading.svg";
import ExitSVG from "@/assets/icons/exit.svg";
import FolderSVG from '@/assets/icons/folder.svg';
import ListTreeSVG from '@/assets/icons/list_tree.svg';
import DotsSVG from '@/assets/icons/dots.svg';
import {useDragNDrop} from '../composables/useDragNDrop';

const app = inject('ServiceContainer');
const {t} = app.i18n;
const ds = app.dragSelect;
const {setStore} = app.storage;

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
let resizeObserver = ref(null);

onMounted(() => {
    resizeObserver.value = new ResizeObserver(updateContainerWidth);
    resizeObserver.value.observe(breadcrumbContainer.value);
});
onUnmounted(() => {
    resizeObserver.value.disconnect();
});

const dragNDrop = useDragNDrop(app, ['bg-blue-200', 'dark:bg-slate-600'])

function getBreadcrumb(index = null) {
  index ??= app.fs.breadcrumbs.length - 2;
  return app.fs.breadcrumbs[index] ?? {storage: app.fs.adapter, path: (app.fs.adapter + '://'), type: 'dir'}
}

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
 * Tree View
 */
const toggleTreeView = () => {
  app.showTreeView = !app.showTreeView;
}
watch(() => app.showTreeView, (newShowTreeView, oldValue) => {
  if (newShowTreeView !== oldValue) {
    setStore('show-tree-view', newShowTreeView);
  }
});

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


