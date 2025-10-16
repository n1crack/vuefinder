<script setup lang="ts">
import {inject, ref, computed, onMounted, onUnmounted} from 'vue';
import {useStore} from '@nanostores/vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "./modals/ModalNewFolder.vue";
import ModalNewFile from "./modals/ModalNewFile.vue";
import ModalRename from "./modals/ModalRename.vue";
import ModalDelete from "./modals/ModalDelete.vue";
import ModalUpload from "./modals/ModalUpload.vue";
import ModalUnarchive from "./modals/ModalUnarchive.vue";
import ModalArchive from "./modals/ModalArchive.vue";
import ModalAbout from "./modals/ModalAbout.vue";
import ModalMove from "./modals/ModalMove.vue";
import ModalCopy from "./modals/ModalCopy.vue";
import ModalPreview from "./modals/ModalPreview.vue";

const app = inject('ServiceContainer');
if (!app) {
  console.error('MenuBar: ServiceContainer not found');
}

const {t} = app?.i18n || { t: (key: string) => key };

const fs = app?.fs;
const config = app?.config;
const search = app?.search;

// Use nanostores reactive values for template reactivity
const configState = useStore(config?.state || {});
const searchState = useStore(search?.state || {});
const selectedItems = useStore(fs?.selectedItems || []);

// Menu state
const activeMenu = ref<string | null>(null);

// Make menu items reactive to language changes
const menuItems = computed(() => [
  {
    id: 'file',
    label: t('File'),
    items: [
      {
        id: 'new-folder',
        label: t('New Folder'),
        action: () => app?.modal?.open(ModalNewFolder, {items: selectedItems.value}),
        enabled: () => app?.features?.includes(FEATURES.NEW_FOLDER) || false
      },
      {
        id: 'new-file',
        label: t('New File'),
        action: () => app?.modal?.open(ModalNewFile, {items: selectedItems.value}),
        enabled: () => app?.features?.includes(FEATURES.NEW_FILE) || false
      },
      { type: 'separator' },
      {
        id: 'upload',
        label: t('Upload'),
        action: () => app?.modal?.open(ModalUpload, {items: selectedItems.value}),
        enabled: () => app?.features?.includes(FEATURES.UPLOAD) || false
      },
      { type: 'separator' },
      {
        id: 'preview',
        label: t('Preview'),
        action: () => {
          if (selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir') {
            app?.modal?.open(ModalPreview, {storage: fs?.path?.get()?.storage, item: selectedItems.value[0]})
          }
        },
        enabled: () => selectedItems.value.length === 1 && selectedItems.value[0]?.type !== 'dir'
      },
      { type: 'separator' },
      {
        id: 'exit',
        label: t('Exit'),
        action: () => window.close(),
        enabled: () => true
      }
    ]
  },
  {
    id: 'edit',
    label: t('Edit'),
    items: [
      {
        id: 'select-all',
        label: t('Select All'),
        action: () => fs?.selectAll(),
        enabled: () => true
      },
      {
        id: 'deselect',
        label: t('Deselect All'),
        action: () => fs?.clearSelection(),
        enabled: () => selectedItems.value.length > 0
      },
      { type: 'separator' },
      {
        id: 'cut',
        label: t('Cut'),
        action: () => {
          if (selectedItems.value.length > 0) {
            fs?.setClipboard('cut', new Set(selectedItems.value.map(item => item.path)));
          }
        },
        enabled: () => selectedItems.value.length > 0
      },
      {
        id: 'copy',
        label: t('Copy'),
        action: () => {
          if (selectedItems.value.length > 0) {
            fs?.setClipboard('copy', new Set(selectedItems.value.map(item => item.path)));
          }
        },
        enabled: () => selectedItems.value.length > 0
      },
      {
        id: 'paste',
        label: t('Paste'),
        action: () => {
          const clipboard = fs?.getClipboard();
          if (clipboard?.items?.size > 0) {
            app?.modal?.open(clipboard.type === 'cut' ? ModalMove : ModalCopy, {
              items: Array.from(clipboard.items),
              targetPath: fs?.path?.get()?.path
            });
          }
        },
        enabled: () => {
          const clipboard = fs?.getClipboard();
          return clipboard?.items?.size > 0;
        }
      },
      { type: 'separator' },
      {
        id: 'rename',
        label: t('Rename'),
        action: () => {
          if (selectedItems.value.length === 1) {
            app?.modal?.open(ModalRename, {items: selectedItems.value});
          }
        },
        enabled: () => selectedItems.value.length === 1 && app?.features?.includes(FEATURES.RENAME)
      },
      {
        id: 'delete',
        label: t('Delete'),
        action: () => {
          if (selectedItems.value.length > 0) {
            app?.modal?.open(ModalDelete, {items: selectedItems.value});
          }
        },
        enabled: () => selectedItems.value.length > 0 && app?.features?.includes(FEATURES.DELETE)
      }
    ]
  },
  {
    id: 'view',
    label: t('View'),
    items: [
      {
        id: 'refresh',
        label: t('Refresh'),
        action: () => {
          app?.emitter?.emit('vf-fetch', {
            params: {q: 'index', storage: fs?.path?.get()?.storage, path: fs?.path?.get()?.path}
          });
        },
        enabled: () => true
      },
      { type: 'separator' },
      {
        id: 'grid-view',
        label: t('Grid View'),
        action: () => config?.set('view', 'grid'),
        enabled: () => !searchState.value?.query?.length,
        checked: () => configState.value?.view === 'grid'
      },
      {
        id: 'list-view',
        label: t('List View'),
        action: () => config?.set('view', 'list'),
        enabled: () => !searchState.value?.query?.length,
        checked: () => configState.value?.view === 'list'
      },
      { type: 'separator' },
      {
        id: 'tree-view',
        label: t('Tree View'),
        action: () => config?.toggle('showTreeView'),
        enabled: () => true,
        checked: () => configState.value?.showTreeView
      },
      {
        id: 'thumbnails',
        label: t('Show Thumbnails'),
        action: () => config?.toggle('showThumbnails'),
        enabled: () => true,
        checked: () => configState.value?.showThumbnails
      },
      { type: 'separator' },
      {
        id: 'theme-light',
        label: t('Light Theme'),
        action: () => config?.set('theme', 'light'),
        enabled: () => true,
        checked: () => configState.value?.theme === 'light'
      },
      {
        id: 'theme-dark',
        label: t('Dark Theme'),
        action: () => config?.set('theme', 'dark'),
        enabled: () => true,
        checked: () => configState.value?.theme === 'dark'
      },
      {
        id: 'theme-system',
        label: t('System Theme'),
        action: () => config?.set('theme', 'system'),
        enabled: () => true,
        checked: () => configState.value?.theme === 'system'
      },
      { type: 'separator' },
      {
        id: 'fullscreen',
        label: t('Full Screen'),
        action: () => config?.toggle('fullScreen'),
        enabled: () => app?.features?.includes(FEATURES.FULL_SCREEN),
        checked: () => configState.value?.fullScreen
      }
    ]
  },
  {
    id: 'tools',
    label: t('Tools'),
    items: [
      {
        id: 'search',
        label: t('Search'),
        action: () => search?.enterSearchMode(),
        enabled: () => app?.features?.includes(FEATURES.SEARCH)
      },
      { type: 'separator' },
      {
        id: 'archive',
        label: t('Archive'),
        action: () => {
          if (selectedItems.value.length > 0) {
            app?.modal?.open(ModalArchive, {items: selectedItems.value});
          }
        },
        enabled: () => selectedItems.value.length > 0 && app?.features?.includes(FEATURES.ARCHIVE)
      },
      {
        id: 'unarchive',
        label: t('Unarchive'),
        action: () => {
          if (selectedItems.value.length === 1 && selectedItems.value[0]?.mime_type === 'application/zip') {
            app?.modal?.open(ModalUnarchive, {items: selectedItems.value});
          }
        },
        enabled: () => selectedItems.value.length === 1 && 
                 selectedItems.value[0]?.mime_type === 'application/zip' && 
                 app?.features?.includes(FEATURES.UNARCHIVE)
      }
    ]
  },
  {
    id: 'help',
    label: t('Help'),
    items: [
      {
        id: 'about',
        label: t('About'),
        action: () => app?.modal?.open(ModalAbout),
        enabled: () => true
      }
    ]
  }
]);

// Menu methods
const toggleMenu = (menuId: string) => {
  activeMenu.value = activeMenu.value === menuId ? null : menuId;
};

const closeMenu = () => {
  activeMenu.value = null;
};

const handleMenuAction = (action: () => void) => {
  action();
  closeMenu();
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
      >
        <span class="vuefinder__menubar__label">{{ menu.label }}</span>
        
        <!-- Dropdown menu -->
        <div 
          v-if="activeMenu === menu.id"
          class="vuefinder__menubar__dropdown"
        >
          <div 
            v-for="item in menu.items" 
            :key="item.id || item.type"
            class="vuefinder__menubar__dropdown__item"
            :class="{
              'vuefinder__menubar__dropdown__item--separator': item.type === 'separator',
              'vuefinder__menubar__dropdown__item--disabled': item.enabled && !item.enabled(),
              'vuefinder__menubar__dropdown__item--checked': item.checked && item.checked()
            }"
            @click="item.type !== 'separator' && item.enabled && item.enabled() ? handleMenuAction(item.action) : null"
          >
            <span v-if="item.type !== 'separator'" class="vuefinder__menubar__dropdown__label">
              {{ item.label }}
            </span>
            <span v-if="item.checked && item.checked()" class="vuefinder__menubar__dropdown__checkmark">
              ✓
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
