<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useApp } from '../composables/useApp';
import { useStore } from '@nanostores/vue';

import FolderSVG from '../assets/icons/folder.svg';
import OpenFolderSVG from '../assets/icons/open_folder.svg';
import FolderLoaderIndicator from './FolderLoaderIndicator.vue';
import { OverlayScrollbars } from 'overlayscrollbars';
import { useDragNDrop } from '../composables/useDragNDrop';
import { useTreeSearch } from '../composables/useTreeSearch';
import type { TreeViewData, DirEntry } from '../types';
import type { StoreValue } from 'nanostores';
import type { CurrentPathState } from '../stores/files';
import type { ConfigState } from '../stores/config';

const app = useApp();
const fs = app.fs;
const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);
const showSubFolders = ref<Record<string, boolean>>({});
const config = app.config;
const configState: StoreValue<ConfigState> = useStore(config.state);
const { t } = app.i18n;

// Make path reactive
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const props = defineProps<{
  storage: string;
  path: string;
}>();
const parentSubfolderList = ref(null);
const displayedCount = ref(50);

onMounted(() => {
  // only initialize overlay scrollbars for the root folder
  if (props.path === props.storage + '://' && parentSubfolderList.value) {
    OverlayScrollbars(parentSubfolderList.value, {
      scrollbars: {
        theme: 'vf-scrollbars-theme',
      },
    });
  }
});
const treeSearch = useTreeSearch();

const treeSubFolders = computed(() => {
  const entry = app.treeViewData.find((e: TreeViewData) => e.path === props.path) as
    | TreeViewData
    | undefined;
  let allFolders = entry?.folders || [];

  // When searching, drop branches that contain no matches so the user only
  // sees the path to each matched node.
  if (treeSearch.isActive.value) {
    allFolders = allFolders.filter((f) => treeSearch.isVisible(f.path));
  }

  // Limit render to displayedCount folders for performance at any level
  // This prevents rendering too many folders at once (e.g., 50k folders)
  if (allFolders.length > displayedCount.value) {
    return allFolders.slice(0, displayedCount.value);
  }

  return allFolders;
});

/**
 * Whether a given folder should be expanded right now. During search we force
 * ancestors of matches open, but never overwrite the user's manual state — when
 * the query clears, `showSubFolders[item.path]` is what we fall back to.
 */
const isExpanded = (path: string): boolean => {
  if (treeSearch.isActive.value && treeSearch.shouldForceExpand(path)) {
    return true;
  }
  return !!showSubFolders.value[path];
};

const totalFoldersCount = computed(() => {
  const entry = app.treeViewData.find((e: TreeViewData) => e.path === props.path) as
    | TreeViewData
    | undefined;
  return entry?.folders?.length || 0;
});

const showMoreFoldersNote = computed(() => {
  return totalFoldersCount.value > displayedCount.value;
});

const rootPath = computed(() => `${props.storage}://`);

const isPathInTree = (targetPath: string, rootPath: string) => {
  return targetPath === rootPath || targetPath.startsWith(`${rootPath}/`);
};

watch(
  treeSubFolders,
  (folders) => {
    const expandByDefaultAtThisLevel =
      configState.value.expandTreeByDefault && props.path === rootPath.value;
    const expandedPaths = configState.value.expandedTreePaths || [];

    folders.forEach((item) => {
      const expandFromPathConfig = expandedPaths.some((path: string) =>
        isPathInTree(path, item.path)
      );
      if (
        (expandByDefaultAtThisLevel || expandFromPathConfig) &&
        showSubFolders.value[item.path] === undefined
      ) {
        showSubFolders.value[item.path] = true;
      }
    });
  },
  { immediate: true }
);

const loadMore = () => {
  displayedCount.value += 50;
};
</script>

<template>
  <ul ref="parentSubfolderList" class="vuefinder__treesubfolderlist__container">
    <li v-if="!treeSubFolders.length">
      <div class="vuefinder__treesubfolderlist__no-folders">{{ t('No folders') }}</div>
    </li>
    <li v-for="item in treeSubFolders" :key="item.path" class="vuefinder__treesubfolderlist__item">
      <div class="vuefinder__treesubfolderlist__item-content">
        <div
          class="vuefinder__treesubfolderlist__item-toggle"
          @click="showSubFolders[item.path] = !showSubFolders[item.path]"
        >
          <FolderLoaderIndicator
            v-model="showSubFolders[item.path]"
            :storage="storage"
            :path="item.path"
          />
        </div>
        <div
          class="vuefinder__treesubfolderlist__item-link"
          :title="item.path"
          v-on="
            dragNDrop.events({
              ...item,
              dir: item.path,
              extension: '',
              file_size: null,
              last_modified: null,
              mime_type: null,
              visibility: 'public',
            } as DirEntry)
          "
          @dblclick="showSubFolders[item.path] = !showSubFolders[item.path]"
          @click="app.adapter.open(item.path)"
        >
          <div class="vuefinder__treesubfolderlist__item-icon">
            <OpenFolderSVG
              v-if="currentPath?.path === item.path"
              class="vuefinder__item-icon__folder--open"
            />
            <FolderSVG v-else class="vuefinder__item-icon__folder" />
          </div>
          <div
            v-if="treeSearch.isActive.value"
            class="vuefinder__treesubfolderlist__item-text"
            :class="{
              'vuefinder__treesubfolderlist__item-text--active': currentPath.path === item.path,
            }"
            v-html="treeSearch.highlight(item.basename)"
          ></div>
          <div
            v-else
            class="vuefinder__treesubfolderlist__item-text"
            :class="{
              'vuefinder__treesubfolderlist__item-text--active': currentPath.path === item.path,
            }"
          >
            {{ item.basename }}
          </div>
        </div>
      </div>
      <div class="vuefinder__treesubfolderlist__subfolder">
        <TreeSubfolderList
          v-show="isExpanded(item.path)"
          :storage="props.storage"
          :path="item.path"
        />
      </div>
    </li>
    <li v-if="showMoreFoldersNote" class="vuefinder__treesubfolderlist__more-note">
      <div class="vuefinder__treesubfolderlist__load-more" @click="loadMore">
        {{ t('load more') }}
      </div>
    </li>
  </ul>
</template>
