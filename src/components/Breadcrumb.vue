<script setup lang="ts">
import {inject, nextTick, onMounted, onUnmounted, ref, watch, computed} from 'vue';
import {useStore} from '@nanostores/vue';
import useDebouncedRef from '../composables/useDebouncedRef';
import RefreshSVG from "../assets/icons/refresh.svg";
import GoUpSVG from "../assets/icons/go_up.svg";
import CloseSVG from "../assets/icons/close.svg";
import HomeSVG from "../assets/icons/home.svg";
import LoadingSVG from "../assets/icons/loading.svg";
import ExitSVG from "../assets/icons/exit.svg";
import FolderSVG from '../assets/icons/folder.svg';
import ListTreeSVG from '../assets/icons/list_tree.svg';
import DotsSVG from '../assets/icons/dots.svg';
import CopySVG from '../assets/icons/copy.svg';
import {useDragNDrop} from '../composables/useDragNDrop';
import type {ConfigState} from "@/stores/config.ts";
import type { StoreValue } from "nanostores";
import type {CurrentPathState} from "@/stores/files.ts";

const app = inject('ServiceContainer');
const currentTheme = inject('currentTheme');
const {t} = app.i18n;
const fs = app.fs;
const config = app.config;


// Use nanostores reactive values for template reactivity
const configStore: StoreValue<ConfigState> = useStore(config.state)
const currentPath : StoreValue<CurrentPathState> = useStore(fs.path);
const loading = useStore(fs.loading);

// dynamic shown items calculation for breadcrumbs
const breadcrumbContainer = ref<HTMLElement | null>(null);
const breadcrumbContainerWidth = useDebouncedRef(0, 100);
const breadcrumbItemLimit = ref(5);
const showHiddenBreadcrumbs = ref(false);
const showPathCopyMode = ref(false);
const allBreadcrumbs = computed(() => currentPath.value?.breadcrumb ?? []);

function separateBreadcrumbs<T>(links: T[], show: number): [T[], T[]] {
  if (links.length > show) return [links.slice(-show), links.slice(0, -show)];
  return [links, []]
}

const visibleBreadcrumbs = computed(() => separateBreadcrumbs(allBreadcrumbs.value, breadcrumbItemLimit.value)[0]);
const hiddenBreadcrumbs = computed(() => separateBreadcrumbs(allBreadcrumbs.value, breadcrumbItemLimit.value)[1]);
watch(breadcrumbContainerWidth, () => {
  if (!breadcrumbContainer.value) return;

  const children = breadcrumbContainer.value.children;
  let totalWidth = 0;
  let count = 0;
  const max_shown_items = 5;
  const min_shown_items = 1;

  breadcrumbItemLimit.value = max_shown_items;
  nextTick(() => {
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i] as HTMLElement;
      if (totalWidth + child.offsetWidth > breadcrumbContainerWidth.value - 40) {
        break;
      }
      totalWidth += parseInt(child.offsetWidth.toString(), 10);
      count++;
    }

    if (count < min_shown_items) count = min_shown_items;
    if (count > max_shown_items) count = max_shown_items;

    breadcrumbItemLimit.value = count;
  });
});

const updateContainerWidth = () => {
  if (breadcrumbContainer.value) {
    breadcrumbContainerWidth.value = breadcrumbContainer.value.offsetWidth;
  }
}
const resizeObserver = ref<ResizeObserver | null>(null);

onMounted(() => {
  resizeObserver.value = new ResizeObserver(updateContainerWidth);
  if (breadcrumbContainer.value) {
    resizeObserver.value.observe(breadcrumbContainer.value);
  }
});
onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});

const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over'])

function getBreadcrumb(index: number | null = null) {
  index ??= allBreadcrumbs.value.length - 2;
  const fallback = {
    basename: currentPath.value?.storage ?? 'local',
    extension: '',
    path: ((currentPath.value?.storage ?? 'local') + '://'),
    storage: currentPath.value?.storage ?? 'local',
    type: 'dir' as const,
    file_size: null,
    last_modified: null,
    mime_type: null,
    visibility: ''
  };
  // allBreadcrumbs entries don't carry full DirEntry fields; use fallback for drag types
  return (allBreadcrumbs.value[index] as unknown as import('@/types').DirEntry) ?? (fallback as unknown as import('@/types').DirEntry)
}

const handleRefresh = () => {
  app.emitter.emit('vf-fetch', {
    params: {
      q: 'index',
      storage: currentPath.value?.storage,
      path: currentPath.value?.path
    }
  });
}

const handleGoUp = () => {

  if (visibleBreadcrumbs.value.length > 0) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'index',
        storage: currentPath.value?.storage ?? 'local',
        path: (allBreadcrumbs.value[allBreadcrumbs.value.length - 2]?.path ?? ((currentPath.value?.storage ?? 'local') + '://'))
      }
    });
  }
}

const handleHiddenBreadcrumbsClick = (item: { path: string }) => {
  app.emitter.emit('vf-fetch', {params: {q: 'index', storage: currentPath.value?.storage, path: item.path}});
  showHiddenBreadcrumbs.value = false;
}

const handleClickOutside = () => {
  if (showHiddenBreadcrumbs.value) {
    showHiddenBreadcrumbs.value = false;
  }
}

const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    (el as any).clickOutsideEvent = function (event: MouseEvent) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target as Node))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.body.addEventListener('click', (el as any).clickOutsideEvent)
  },
  beforeUnmount(el: HTMLElement) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent)
  }
};
/**
 * Tree View
 */
const toggleTreeView = () => {
  config.toggle('showTreeView');
}

/**
 *  Breadcrumbs Dropdown Position
 */
const mousePosition = ref({
  x: 0,
  y: 0
})

const handleHiddenBreadcrumbsToggle = (event: MouseEvent | TouchEvent, value = null as boolean | null ) => {
  if (event.currentTarget instanceof HTMLElement) {
    const {x, y, height} = event.currentTarget.getBoundingClientRect();
    mousePosition.value = {x, y: y + height};
  }
  showHiddenBreadcrumbs.value = value ?? !showHiddenBreadcrumbs.value;
}

/**
 * Path Copy Mode
 */
const togglePathCopyMode = () => {
  showPathCopyMode.value = !showPathCopyMode.value;
}

const copyPathToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentPath.value?.path || '');
    // You could add a toast notification here if available
    app.emitter.emit('vf-toast-push', {label: t('Path copied to clipboard')});
  } catch (err) {}
}

const exitPathCopyMode = () => {
  showPathCopyMode.value = false;
}
</script>


<template>
  <div class="vuefinder__breadcrumb__container">
    <span :title="t('Toggle Tree View')">
      <ListTreeSVG
          @click="toggleTreeView"
          class="vuefinder__breadcrumb__toggle-tree"
          :class="configStore.showTreeView ? 'vuefinder__breadcrumb__toggle-tree--active' : ''"
      />
    </span>

    <span :title="t('Go up a directory')">
      <GoUpSVG
          v-on="(allBreadcrumbs.length) ? dragNDrop.events(getBreadcrumb() as unknown as any) : {}"
          @click="handleGoUp"
          :class="(allBreadcrumbs.length) ? 'vuefinder__breadcrumb__go-up--active' : 'vuefinder__breadcrumb__go-up--inactive'"
      />
    </span>

    <span :title="t('Refresh')" v-if="!fs.isLoading()">
      <RefreshSVG @click="handleRefresh"/>
    </span>
    <span :title="t('Cancel')" v-else>
      <CloseSVG @click="app.emitter.emit('vf-fetch-abort')"/>
    </span>

    <div v-show="!showPathCopyMode" class="vuefinder__breadcrumb__path-container" @click="togglePathCopyMode">
      <div>
        <HomeSVG
            class="vuefinder__breadcrumb__home-icon"
            v-on="dragNDrop.events(getBreadcrumb(-1))"
            @click.stop="app.emitter.emit('vf-fetch', {params:{q: 'index', storage: currentPath.storage ?? 'local'}})"/>
      </div>

      <div class="vuefinder__breadcrumb__list">
        <div v-if="hiddenBreadcrumbs.length" class="vuefinder__breadcrumb__hidden-list"
             v-click-outside="handleClickOutside">
          <div class="vuefinder__breadcrumb__separator">/</div>
          <div class="relative">
            <span
                @dragenter="handleHiddenBreadcrumbsToggle($event, true)"
                @click.stop="handleHiddenBreadcrumbsToggle"
                class="vuefinder__breadcrumb__hidden-toggle">
              <DotsSVG class="vuefinder__breadcrumb__hidden-toggle-icon"/>
            </span>
          </div>
        </div>
      </div>

      <div ref="breadcrumbContainer" class="vuefinder__breadcrumb__visible-list pointer-events-none" >
        <div v-for="(item, index) in visibleBreadcrumbs" :key="index">
          <span class="vuefinder__breadcrumb__separator">/</span>
          <span
              v-on="dragNDrop.events(item as any)"
              class="vuefinder__breadcrumb__item pointer-events-auto"
              :title="(item as any).basename"
              @click.stop="app.emitter.emit('vf-fetch', {params:{q: 'index', storage: currentPath.storage, path:(item as any).path}})">{{
              (item as any).name
            }}</span>
        </div>
      </div>

      <LoadingSVG v-if="config.get('loadingIndicator') === 'circular' && loading"/>
    
    </div>
    
    <!-- Path Copy Mode -->
    <div v-show="showPathCopyMode" class="vuefinder__breadcrumb__path-mode">
      <div class="vuefinder__breadcrumb__path-mode-content">
        <CopySVG 
          class="vuefinder__breadcrumb__copy-icon"
          @click="copyPathToClipboard"
          :title="t('Copy Path')"
        />
        <span class="vuefinder__breadcrumb__path-text">{{ currentPath.path }}</span>
        <ExitSVG 
          class="vuefinder__breadcrumb__exit-icon"
          @click="exitPathCopyMode"
          :title="t('Exit')"
        />
      </div>
    </div>

    <Teleport to="body">
      <div>
        <div v-show="showHiddenBreadcrumbs"
             :style="{position: 'absolute', top: mousePosition.y + 'px', left: mousePosition.x + 'px'}"
             class="vuefinder vuefinder__breadcrumb__hidden-dropdown" :data-theme="currentTheme">
          <div
              v-for="(item, index) in hiddenBreadcrumbs" :key="index"
              v-on="dragNDrop.events(item as any)"
              @click="handleHiddenBreadcrumbsClick(item as any)"
              class="vuefinder__breadcrumb__hidden-item">
            <div class="vuefinder__breadcrumb__hidden-item-content">
              <span><FolderSVG class="vuefinder__breadcrumb__hidden-item-icon"/></span> <span
                class="vuefinder__breadcrumb__hidden-item-text">{{ (item as any).name }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
