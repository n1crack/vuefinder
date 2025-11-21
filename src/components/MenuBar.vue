<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { useFeature } from '../composables/useFeature';
import type { DirEntry } from '../types';
import { copyPath, copyDownloadUrl } from '../utils/clipboard';
import ModalNewFolder from './modals/ModalNewFolder.vue';
import ModalNewFile from './modals/ModalNewFile.vue';
import ModalRename from './modals/ModalRename.vue';
import ModalDelete from './modals/ModalDelete.vue';
import ModalUpload from './modals/ModalUpload.vue';
import ModalUnarchive from './modals/ModalUnarchive.vue';
import ModalArchive from './modals/ModalArchive.vue';
import ModalAbout from './modals/ModalAbout.vue';
import ModalMove from './modals/ModalMove.vue';
import ModalCopy from './modals/ModalCopy.vue';
import ModalPreview from './modals/ModalPreview.vue';
import ModalSearch from './modals/ModalSearch.vue';
import ModalSettings from './modals/ModalSettings.vue';
import ModalShortcuts from './modals/ModalShortcuts.vue';
import { useApp } from '../composables/useApp';
import { toast } from 'vue-sonner';
import { getErrorMessage } from '../utils/errorHandler';

import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';

const app = useApp();
const { enabled } = useFeature();

const { t } = app?.i18n || { t: (key: string) => key };

const fs = app?.fs;
const config = app?.config;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);
const selectedItems: StoreValue<DirEntry[]> = useStore(fs.selectedItems);
const storages: StoreValue<string[]> = useStore(fs?.storages || []);

// Menu state
const activeMenu = ref<string | null>(null);
const isMenuOpen = ref(false);

// Check if exit option should be shown
const shouldShowExit = computed(() => {
  const canClose = window.opener !== null || window.name !== '' || window.history.length <= 1;
  return canClose;
});

// Make menu items reactive to language changes
const menuItems = computed<any[]>(() => [
  {
    id: 'file',
    label: t('File'),
    items: [
      {
        id: 'new-folder',
        label: t('New Folder'),
        action: () => app?.modal?.open(ModalNewFolder, { items: selectedItems.value }),
        enabled: () => enabled('newfolder'),
      },
      {
        id: 'new-file',
        label: t('New File'),
        action: () => app?.modal?.open(ModalNewFile, { items: selectedItems.value }),
        enabled: () => enabled('newfile'),
      },
      { type: 'separator' },
      {
        id: 'upload',
        label: t('Upload'),
        action: () => app?.modal?.open(ModalUpload, { items: selectedItems.value }),
        enabled: () => enabled('upload'),
      },
      { type: 'separator' },
      {
        id: 'search',
        label: t('Search'),
        action: () => app.modal.open(ModalSearch),
        enabled: () => enabled('search'),
      },
      { type: 'separator' },
      {
        id: 'archive',
        label: t('Archive'),
        action: () => {
          if (selectedItems.value.length > 0) {
            app?.modal?.open(ModalArchive, { items: selectedItems.value });
          }
        },
        enabled: () => selectedItems.value.length > 0 && enabled('archive'),
      },
      {
        id: 'unarchive',
        label: t('Unarchive'),
        action: () => {
          if (
            selectedItems.value.length === 1 &&
            selectedItems.value[0]?.mime_type === 'application/zip'
          ) {
            app?.modal?.open(ModalUnarchive, { items: selectedItems.value });
          }
        },
        enabled: () =>
          selectedItems.value.length === 1 &&
          selectedItems.value[0]?.mime_type === 'application/zip' &&
          enabled('unarchive'),
      },
      { type: 'separator' },
      {
        id: 'preview',
        label: t('Preview'),
        action: () => {
          if (selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir') {
            app?.modal?.open(ModalPreview, {
              storage: fs?.path?.get()?.storage,
              item: selectedItems.value[0],
            });
          }
        },
        enabled: () =>
          selectedItems.value.length === 1 &&
          selectedItems.value[0]?.type !== 'dir' &&
          enabled('preview'),
      },
      // Only show exit option if we can actually close the window
      ...(shouldShowExit.value
        ? [
            { type: 'separator' },
            {
              id: 'exit',
              label: t('Exit'),
              action: () => {
                try {
                  window.close();
                } catch (e) {
                  // Window cannot be closed programmatically
                }
              },
              enabled: () => true,
            },
          ]
        : []),
    ],
  },
  {
    id: 'edit',
    label: t('Edit'),
    items: [
      // Only show Select All and Deselect All in multiple selection mode
      ...(app?.selectionMode === 'multiple'
        ? [
            {
              id: 'select-all',
              label: t('Select All'),
              action: () =>
                fs?.selectAll((app?.selectionMode as 'single' | 'multiple') || 'multiple', app),
              enabled: () => true,
            },
            {
              id: 'deselect',
              label: t('Deselect All'),
              action: () => fs?.clearSelection(),
              enabled: () => selectedItems.value.length > 0,
            },
            { type: 'separator' },
          ]
        : []),
      ...(enabled('copy')
        ? [
            {
              id: 'cut',
              label: t('Cut'),
              action: () => {
                if (selectedItems.value.length > 0) {
                  fs?.setClipboard(
                    'cut',
                    new Set(selectedItems.value.map((item: DirEntry) => item.path))
                  );
                }
              },
              enabled: () => selectedItems.value.length > 0,
            },
            {
              id: 'copy',
              label: t('Copy'),
              action: () => {
                if (selectedItems.value.length > 0) {
                  fs?.setClipboard(
                    'copy',
                    new Set(selectedItems.value.map((item: DirEntry) => item.path))
                  );
                }
              },
              enabled: () => selectedItems.value.length > 0,
            },
            {
              id: 'paste',
              label: t('Paste'),
              action: () => {
                const clipboard = fs?.getClipboard();
                if (clipboard?.items?.size > 0) {
                  app?.modal?.open(clipboard.type === 'cut' ? ModalMove : ModalCopy, {
                    items: { from: Array.from(clipboard.items), to: fs?.path?.get() },
                  });
                }
              },
              enabled: () => {
                const clipboard = fs?.getClipboard();
                return clipboard?.items?.size > 0;
              },
            },
          ]
        : []),
      ...(enabled('move')
        ? [
            {
              id: 'move',
              label: t('Move files'),
              action: () => {
                if (selectedItems.value.length > 0) {
                  const fs = app?.fs;
                  const target = {
                    storage: fs?.path?.get()?.storage || '',
                    path: fs?.path?.get()?.path || '',
                    type: 'dir' as const,
                  };
                  app?.modal?.open(ModalMove, { items: { from: selectedItems.value, to: target } });
                }
              },
              enabled: () => selectedItems.value.length > 0,
            },
            { type: 'separator' },
          ]
        : []),
      {
        id: 'copy-path',
        label: t('Copy Path'),
        action: async () => {
          if (selectedItems.value.length === 1) {
            // Copy selected item's path
            const item = selectedItems.value[0];
            await copyPath(item.path);
          } else {
            // Copy current path if no item selected
            const currentPath = fs?.path?.get();
            if (currentPath?.path) {
              await copyPath(currentPath.path);
            }
          }
        },
        enabled: () => true, // Her zaman aktif
      },
      {
        id: 'copy-download-url',
        label: t('Copy Download URL'),
        action: async () => {
          if (selectedItems.value.length === 1) {
            const item = selectedItems.value[0];
            const storage = fs?.path?.get()?.storage ?? 'local';
            const downloadUrl = app?.adapter?.getDownloadUrl({ path: item.path });
            if (downloadUrl) {
              await copyDownloadUrl(downloadUrl);
            }
          }
        },
        enabled: () => selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir',
      },
      { type: 'separator' },
      {
        id: 'rename',
        label: t('Rename'),
        action: () => {
          if (selectedItems.value.length === 1) {
            app?.modal?.open(ModalRename, { items: selectedItems.value });
          }
        },
        enabled: () => selectedItems.value.length === 1 && enabled('rename'),
      },
      {
        id: 'delete',
        label: t('Delete'),
        action: () => {
          if (selectedItems.value.length > 0) {
            app?.modal?.open(ModalDelete, { items: selectedItems.value });
          }
        },
        enabled: () => selectedItems.value.length > 0 && enabled('delete'),
      },
    ],
  },
  {
    id: 'view',
    label: t('View'),
    items: [
      {
        id: 'refresh',
        label: t('Refresh'),
        action: () => {
          app.adapter.invalidateListQuery(fs.path.get().path);
          app.adapter.open(fs.path.get().path);
        },
        enabled: () => true,
      },
      { type: 'separator' },
      {
        id: 'grid-view',
        label: t('Grid View'),
        action: () => config?.set('view', 'grid'),
        enabled: () => true,
        checked: () => configState.value?.view === 'grid',
      },
      {
        id: 'list-view',
        label: t('List View'),
        action: () => config?.set('view', 'list'),
        enabled: () => true,
        checked: () => configState.value?.view === 'list',
      },
      { type: 'separator' },
      {
        id: 'tree-view',
        label: t('Tree View'),
        action: () => config?.toggle('showTreeView'),
        enabled: () => true,
        checked: () => configState.value?.showTreeView,
      },
      {
        id: 'thumbnails',
        label: t('Show Thumbnails'),
        action: () => config?.toggle('showThumbnails'),
        enabled: () => true,
        checked: () => configState.value?.showThumbnails,
      },
      {
        id: 'show-hidden-files',
        label: t('Show Hidden Files'),
        action: () => config?.toggle('showHiddenFiles'),
        enabled: () => true,
        checked: () => configState.value?.showHiddenFiles,
      },
      { type: 'separator' },
      {
        id: 'fullscreen',
        label: t('Full Screen'),
        action: () => config?.toggle('fullScreen'),
        enabled: () => enabled('fullscreen'),
        checked: () => configState.value?.fullScreen,
      },
    ],
  },
  {
    id: 'go',
    label: t('Go'),
    items: [
      ...(enabled('history')
        ? [
            {
              id: 'forward',
              label: t('Forward'),
              action: () => {
                fs?.goForward();
                const pathInfo = fs?.path?.get();
                if (pathInfo?.path) {
                  app?.adapter.open(pathInfo.path);
                }
              },
              enabled: () => fs?.canGoForward?.get() ?? false,
            },
            {
              id: 'back',
              label: t('Back'),
              action: () => {
                fs?.goBack();
                const pathInfo = fs?.path?.get();
                if (pathInfo?.path) {
                  app?.adapter.open(pathInfo.path);
                }
              },
              enabled: () => fs?.canGoBack?.get() ?? false,
            },
          ]
        : []),
      {
        id: 'open-containing-folder',
        label: t('Open containing folder'),
        action: () => {
          const pathInfo = fs?.path?.get();

          if (pathInfo?.breadcrumb && pathInfo.breadcrumb.length > 1) {
            // Get parent path from breadcrumb (second to last item)
            const parentBreadcrumb = pathInfo.breadcrumb[pathInfo.breadcrumb.length - 2];
            const parentPath = parentBreadcrumb?.path ?? `${pathInfo.storage}://`;

            app?.adapter.open(parentPath);
          }
        },
        enabled: () => {
          const pathInfo = fs?.path?.get();
          return pathInfo?.breadcrumb && pathInfo.breadcrumb.length > 1;
        },
      },
      { type: 'separator' },
      // Dynamic storage list items will be added here
      ...(storages.value || []).map((storage: string) => ({
        id: `storage-${storage}`,
        label: storage,
        action: () => {
          const storagePath = `${storage}://`;
          app?.adapter.open(storagePath);
        },
        enabled: () => true,
      })),
      { type: 'separator' },
      {
        id: 'go-to-folder',
        label: t('Go to Folder'),
        action: async () => {
          const folderPath = prompt(t('Enter folder path:'));
          if (folderPath) {
            // Validate path format: must be storage://path/to/folder
            if (!folderPath.includes('://')) {
              alert(t('Invalid path format. Path must be in format: storage://path/to/folder'));
              return;
            }

            // Extract storage name from path
            const storageIndex = folderPath.indexOf('://');
            const storageName = folderPath.slice(0, storageIndex);

            // Validate that storage exists in storages list
            if (!storages.value || !storages.value.includes(storageName)) {
              alert(t('Invalid storage. Storage "%s" is not available.', storageName));
              return;
            }

            // Path is valid, try to navigate
            // Use adapter.open() instead of setPath + list
            // adapter.open() will only update path if successful (via onAfterOpen callback)
            try {
              await app?.adapter.open(folderPath);
            } catch (error: unknown) {
              // If error occurs, path won't be updated (onAfterOpen won't be called)
              const errorMessage = getErrorMessage(error, t('Failed to navigate to folder'));
              toast.error(errorMessage);
              app.fs.setLoading(false);
            }
          }
        },
        enabled: () => true,
      },
    ],
  },

  {
    id: 'help',
    label: t('Help'),
    items: [
      {
        id: 'settings',
        label: t('Settings'),
        action: () => app?.modal?.open(ModalSettings),
        enabled: () => true,
      },
      {
        id: 'shortcuts',
        label: t('Shortcuts'),
        action: () => app?.modal?.open(ModalShortcuts),
        enabled: () => true,
      },
      {
        id: 'about',
        label: t('About'),
        action: () => app?.modal?.open(ModalAbout),
        enabled: () => true,
      },
    ],
  },
]);

// Menu methods
const toggleMenu = (menuId: string) => {
  if (activeMenu.value === menuId) {
    // Same menu clicked - close it
    closeMenu();
  } else {
    // Different menu clicked - open it
    activeMenu.value = menuId;
    isMenuOpen.value = true;
  }
};

const openMenu = (menuId: string) => {
  if (isMenuOpen.value) {
    // Menu is open, switch to hovered menu
    activeMenu.value = menuId;
  }
};

const closeMenu = () => {
  activeMenu.value = null;
  isMenuOpen.value = false;
};

const handleMenuAction = (action: () => void) => {
  // Close menu first
  closeMenu();
  // Then execute action
  action();
};

// Click outside to close menu
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.vuefinder__menubar')) {
    closeMenu();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="vuefinder__menubar" @click.stop>
    <div class="vuefinder__menubar__container">
      <div
        v-for="menu in menuItems"
        :key="menu.id"
        class="vuefinder__menubar__item"
        :class="{ 'vuefinder__menubar__item--active': activeMenu === menu.id }"
        @click="toggleMenu(menu.id)"
        @mouseenter="openMenu(menu.id)"
      >
        <span class="vuefinder__menubar__label">{{ menu.label }}</span>

        <!-- Dropdown menu -->
        <div
          v-if="activeMenu === menu.id"
          class="vuefinder__menubar__dropdown"
          @mouseenter="openMenu(menu.id)"
        >
          <div
            v-for="item in menu.items"
            :key="item.id || item.type"
            class="vuefinder__menubar__dropdown__item"
            :class="{
              'vuefinder__menubar__dropdown__item--separator': item.type === 'separator',
              'vuefinder__menubar__dropdown__item--disabled': item.enabled && !item.enabled(),
              'vuefinder__menubar__dropdown__item--checked': item.checked && item.checked(),
            }"
            @click.stop="
              item.type !== 'separator' && item.enabled && item.enabled()
                ? handleMenuAction(item.action)
                : null
            "
          >
            <span v-if="item.type !== 'separator'" class="vuefinder__menubar__dropdown__label">
              {{ item.label }}
            </span>
            <span
              v-if="item.checked && item.checked()"
              class="vuefinder__menubar__dropdown__checkmark"
            >
              ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
