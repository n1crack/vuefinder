<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { useStore } from '@nanostores/vue';
import useDebouncedRef from '../composables/useDebouncedRef';
import RefreshSVG from '../assets/icons/refresh.svg';
import GoUpSVG from '../assets/icons/go_up.svg';
import CloseSVG from '../assets/icons/close.svg';
import HomeSVG from '../assets/icons/home.svg';
import LoadingSVG from '../assets/icons/loading.svg';
import ExitSVG from '../assets/icons/exit.svg';
import FolderSVG from '../assets/icons/folder.svg';
import ListTreeSVG from '../assets/icons/list_tree.svg';
import DotsSVG from '../assets/icons/dots.svg';
import CopySVG from '../assets/icons/copy.svg';
import ToggleSVG from '../assets/icons/toggle.svg';
import { useDragNDrop } from '../composables/useDragNDrop';
import type { ConfigState } from '../stores/config';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';
import { useApp } from '../composables/useApp';
import { useBreadcrumbActions } from '../composables/useBreadcrumbActions';
import type { DirEntry } from '../types';
const app = useApp();
const breadcrumbActions = useBreadcrumbActions();

const { t } = app.i18n;
const fs = app.fs;
const config = app.config;

const configStore: StoreValue<ConfigState> = useStore(config.state);
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);
const loading: StoreValue<boolean> = useStore(fs.loading);

// dynamic shown items calculation for breadcrumbs
const breadcrumbContainer = ref<HTMLElement | null>(null);
const breadcrumbContainerWidth = useDebouncedRef(0, 100);
const breadcrumbItemLimit = ref(5);
const showHiddenBreadcrumbs = ref(false);
const showPathCopyMode = ref(false);
const allBreadcrumbs = computed(() => currentPath.value?.breadcrumb ?? []);

const MAX_SHOWN_ITEMS = 5;
const MIN_SHOWN_ITEMS = 1;
const CONTAINER_SAFETY_MARGIN = 40;

// Pixel widths of previously rendered segments, keyed by basename. Lets us
// recompute the visible-item count on path changes without first re-rendering
// every item at full width (which caused the visible "show all then collapse"
// flash on every navigation).
const segmentWidthCache = new Map<string, number>();

function separateBreadcrumbs<T>(links: T[], show: number): [T[], T[]] {
  if (links.length > show) return [links.slice(-show), links.slice(0, -show)];
  return [links, []];
}

const visibleBreadcrumbs = computed(
  () => separateBreadcrumbs(allBreadcrumbs.value, breadcrumbItemLimit.value)[0]
);
const hiddenBreadcrumbs = computed(
  () => separateBreadcrumbs(allBreadcrumbs.value, breadcrumbItemLimit.value)[1]
);

// Compute the limit purely from the cache. Returns null if any segment has not
// been measured yet (caller falls back to render-and-measure).
function computeLimitFromCache(): number | null {
  const segments = allBreadcrumbs.value;
  const containerWidth = breadcrumbContainerWidth.value;
  if (!segments.length || containerWidth <= 0) return null;

  let totalWidth = 0;
  let count = 0;
  for (let i = segments.length - 1; i >= 0; i--) {
    const name = (segments[i] as { name?: string } | undefined)?.name;
    if (!name) continue;
    const cached = segmentWidthCache.get(name);
    if (cached === undefined) return null;
    if (totalWidth + cached > containerWidth - CONTAINER_SAFETY_MARGIN) break;
    totalWidth += cached;
    count++;
    if (count >= MAX_SHOWN_ITEMS) break;
  }
  if (count < MIN_SHOWN_ITEMS) count = MIN_SHOWN_ITEMS;
  if (count > MAX_SHOWN_ITEMS) count = MAX_SHOWN_ITEMS;
  return count;
}

function cacheRenderedSegmentWidths() {
  if (!breadcrumbContainer.value) return;
  const children = breadcrumbContainer.value.children;
  const items = visibleBreadcrumbs.value;
  for (let i = 0; i < children.length; i++) {
    const name = (items[i] as { name?: string } | undefined)?.name;
    if (!name) continue;
    const w = (children[i] as HTMLElement).offsetWidth;
    if (w > 0) segmentWidthCache.set(name, w);
  }
}

async function recomputeLimit() {
  if (!allBreadcrumbs.value.length) {
    breadcrumbItemLimit.value = MAX_SHOWN_ITEMS;
    return;
  }

  // Fast path: all visible segments already measured — set the final limit
  // synchronously, no intermediate "show everything" render.
  const fromCache = computeLimitFromCache();
  if (fromCache !== null) {
    breadcrumbItemLimit.value = fromCache;
    return;
  }

  // Slow path: at least one segment is unmeasured. Render the max so widths
  // can be read, measure, cache, then settle on the correct limit. This only
  // happens the first time a given segment basename is seen.
  breadcrumbItemLimit.value = MAX_SHOWN_ITEMS;
  await nextTick();
  cacheRenderedSegmentWidths();

  const settled = computeLimitFromCache();
  if (settled !== null) breadcrumbItemLimit.value = settled;
}

watch(breadcrumbContainerWidth, recomputeLimit);
watch(allBreadcrumbs, recomputeLimit, { immediate: true });

const updateContainerWidth = () => {
  if (breadcrumbContainer.value) {
    breadcrumbContainerWidth.value = breadcrumbContainer.value.offsetWidth;
  }
};
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

const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);

function getBreadcrumb(index: number | null = null) {
  index ??= allBreadcrumbs.value.length - 2;
  const fallback = {
    basename: currentPath.value?.storage ?? 'local',
    extension: '',
    path: (currentPath.value?.storage ?? 'local') + '://',
    storage: currentPath.value?.storage ?? 'local',
    type: 'dir' as const,
    file_size: null,
    last_modified: null,
    mime_type: null,
    visibility: '',
  };
  // allBreadcrumbs entries don't carry full DirEntry fields; use fallback for drag types
  const typed = allBreadcrumbs.value[index] as Partial<DirEntry> | undefined;
  return (typed as DirEntry) ?? (fallback as DirEntry);
}

const handleRefresh = () => {
  breadcrumbActions.refresh();
};

const handleGoUp = () => {
  if (visibleBreadcrumbs.value.length > 0) {
    breadcrumbActions.goUp();
  }
};

const handleHiddenBreadcrumbsClick = (item: { path: string }) => {
  app.adapter.open(item.path);
  showHiddenBreadcrumbs.value = false;
};

const handleClickOutside = () => {
  if (showHiddenBreadcrumbs.value) {
    showHiddenBreadcrumbs.value = false;
  }
};

const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    (el as any).clickOutsideEvent = function (event: MouseEvent) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target as Node))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.body.addEventListener('click', (el as any).clickOutsideEvent);
  },
  beforeUnmount(el: HTMLElement) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent);
  },
};
/**
 * Tree View
 */
const toggleTreeView = () => {
  breadcrumbActions.toggleTreeView();
};

/**
 *  Breadcrumbs Dropdown Position
 */
const mousePosition = ref({
  x: 0,
  y: 0,
});

const handleHiddenBreadcrumbsToggle = (
  event: MouseEvent | TouchEvent,
  value = null as boolean | null
) => {
  if (event.currentTarget instanceof HTMLElement) {
    const { x, y, height } = event.currentTarget.getBoundingClientRect();
    mousePosition.value = { x, y: y + height };
  }
  showHiddenBreadcrumbs.value = value ?? !showHiddenBreadcrumbs.value;
};

/**
 * Path Copy Mode
 */
const togglePathCopyMode = () => {
  showPathCopyMode.value = !showPathCopyMode.value;
};

const copyPathToClipboard = async () => {
  await breadcrumbActions.copyCurrentPath();
};

const exitPathCopyMode = () => {
  showPathCopyMode.value = false;
};
</script>

<template>
  <div class="vuefinder__breadcrumb__container">
    <!-- Extension point: replace the action buttons shown before the path
         (tree-view toggle, go up, refresh/cancel). Fallback below is the
         default rendering. The path container itself is intentionally not
         slotted - it handles overflow measurement, drag & drop, the
         hidden-item dropdown, and path-copy mode, and isn't meant to be
         reimplemented. A custom component can call
         `useBreadcrumbActions()`/`useApp()` itself to reuse the same
         actions (refresh, go up, toggle tree). -->
    <slot name="breadcrumb-actions">
      <span :title="t('Toggle Tree View')">
        <ListTreeSVG
          class="vuefinder__breadcrumb__toggle-tree"
          :class="configStore.showTreeView ? 'vuefinder__breadcrumb__toggle-tree--active' : ''"
          @click="toggleTreeView"
        />
      </span>

      <span :title="t('Go up a directory')">
        <GoUpSVG
          :class="
            allBreadcrumbs.length
              ? 'vuefinder__breadcrumb__go-up--active'
              : 'vuefinder__breadcrumb__go-up--inactive'
          "
          v-on="allBreadcrumbs.length ? dragNDrop.events(getBreadcrumb() as unknown as any) : {}"
          @click="handleGoUp"
        />
      </span>

      <span v-if="!fs.isLoading()" :title="t('Refresh')">
        <RefreshSVG @click="handleRefresh" />
      </span>
      <span v-else :title="t('Cancel')">
        <CloseSVG @click="app.emitter.emit('vf-fetch-abort')" />
      </span>
    </slot>

    <div v-show="!showPathCopyMode" class="vuefinder__breadcrumb__path-container">
      <div>
        <HomeSVG
          class="vuefinder__breadcrumb__home-icon"
          v-on="dragNDrop.events(getBreadcrumb(-1))"
          @click.stop="app.adapter.open(currentPath.storage + '://')"
        />
      </div>

      <div class="vuefinder__breadcrumb__list">
        <div
          v-if="hiddenBreadcrumbs.length"
          v-click-outside="handleClickOutside"
          class="vuefinder__breadcrumb__hidden-list"
        >
          <div class="vuefinder__breadcrumb__separator">/</div>
          <div class="relative">
            <span
              class="vuefinder__breadcrumb__hidden-toggle"
              @dragenter="handleHiddenBreadcrumbsToggle($event, true)"
              @click.stop="handleHiddenBreadcrumbsToggle"
            >
              <DotsSVG class="vuefinder__breadcrumb__hidden-toggle-icon" />
            </span>
          </div>
        </div>
      </div>

      <div
        ref="breadcrumbContainer"
        class="vuefinder__breadcrumb__visible-list pointer-events-none"
      >
        <div v-for="(item, index) in visibleBreadcrumbs" :key="index">
          <span class="vuefinder__breadcrumb__separator">/</span>
          <span
            class="vuefinder__breadcrumb__item pointer-events-auto"
            :title="(item as any).basename"
            v-on="dragNDrop.events(item as any)"
            @click.stop="app.adapter.open((item as any).path)"
            >{{ (item as any).name }}</span
          >
        </div>
      </div>

      <LoadingSVG v-if="config.get('loadingIndicator') === 'circular' && loading" />
      <span :title="t('Toggle Path Copy Mode')" @click="togglePathCopyMode">
        <ToggleSVG class="vuefinder__breadcrumb__toggle-icon" />
      </span>
    </div>

    <!-- Path Copy Mode -->
    <div v-show="showPathCopyMode" class="vuefinder__breadcrumb__path-mode">
      <div class="vuefinder__breadcrumb__path-mode-content">
        <div :title="t('Copy Path')">
          <CopySVG class="vuefinder__breadcrumb__copy-icon" @click="copyPathToClipboard" />
        </div>
        <div class="vuefinder__breadcrumb__path-text">{{ currentPath.path }}</div>
        <div :title="t('Exit')">
          <ExitSVG class="vuefinder__breadcrumb__exit-icon" @click="exitPathCopyMode" />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div>
        <div
          v-show="showHiddenBreadcrumbs"
          :style="{
            position: 'absolute',
            top: mousePosition.y + 'px',
            left: mousePosition.x + 'px',
          }"
          class="vuefinder__themer vuefinder__breadcrumb__hidden-dropdown"
          :data-theme="app.theme.current"
        >
          <div
            v-for="(item, index) in hiddenBreadcrumbs"
            :key="index"
            class="vuefinder__breadcrumb__hidden-item"
            v-on="dragNDrop.events(item as any)"
            @click="handleHiddenBreadcrumbsClick(item as any)"
          >
            <div class="vuefinder__breadcrumb__hidden-item-content">
              <span><FolderSVG class="vuefinder__breadcrumb__hidden-item-icon" /></span>
              <span class="vuefinder__breadcrumb__hidden-item-text">{{ (item as any).name }}</span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
