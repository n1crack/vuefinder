<template>
  <ul ref="contextmenu" v-show="context.active" :style="context.positions"
      class="vuefinder__context-menu">
    <li class="vuefinder__context-menu__item" v-for="(item) in filteredItems" :key="item.title">
      <template v-if="item.link">
        <a class="vuefinder__context-menu__link" target="_blank" :href="item.link" :download="item.link"
           @click="app.emitter.emit('vf-contextmenu-hide')">
          <span>{{ item.title() }}</span>
        </a>
      </template>
      <template v-else>
        <div class="vuefinder__context-menu__action" @click="run(item)">
          <span>{{ item.title() }}</span>
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup>
import {computed, inject, nextTick, reactive, ref} from 'vue';
import {FEATURES} from "../features.js";
import ModalNewFolder from "./modals/ModalNewFolder.vue";
import ModalPreview from "./modals/ModalPreview.vue";
import ModalArchive from "./modals/ModalArchive.vue";
import ModalUnarchive from "./modals/ModalUnarchive.vue";
import ModalRename from "./modals/ModalRename.vue";
import ModalDelete from "./modals/ModalDelete.vue";

const app = inject('ServiceContainer');
const {t} = app.i18n

const contextmenu = ref(null);
const selectedItems = ref([]);
const searchQuery = ref('');

const context = reactive({
  active: false,
  items: [],
  positions: {
    left: 0,
    top: 0
  }
});

const filteredItems = computed(() => {
  return context.items.filter(item => item.key == null || app.features.includes(item.key))
});

app.emitter.on('vf-context-selected', (items) => {
  selectedItems.value = items;
})

const menuItems = {
  newfolder: {
    key: FEATURES.NEW_FOLDER,
    title: () => t('New Folder'),
    action: () => app.modal.open(ModalNewFolder),
  },
  selectAll: {
    title: () => t('Select All'),
    action: () => app.dragSelect.selectAll(),
  },
  pinFolder: {
    title: () => t('Pin Folder'),
    action: () => {
        app.pinnedFolders = app.pinnedFolders.concat(selectedItems.value);
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
  },

  unpinFolder: {
    title: () => t('Unpin Folder'),
    action: () => {
        app.pinnedFolders = app.pinnedFolders.filter(fav => !selectedItems.value.find(item => item.path === fav.path));
        app.storage.setStore('pinned-folders', app.pinnedFolders);
    },
  },
  delete: {
    key: FEATURES.DELETE,
    title: () => t('Delete'),
    action: () => {
      app.modal.open(ModalDelete, {items: selectedItems});
    },
  },
  refresh: {
    title: () => t('Refresh'),
    action: () => {
      app.emitter.emit('vf-fetch', {params: {q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname}});
    },
  },
  preview: {
    key: FEATURES.PREVIEW,
    title: () => t('Preview'),
    action: () => app.modal.open(ModalPreview, {adapter: app.fs.adapter, item: selectedItems.value[0]}),
  },
  open: {
    title: () => t('Open'),
    action: () => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'index',
          adapter: app.fs.adapter,
          path: selectedItems.value[0].path
        }
      });
    },
  },
  openDir: {
    title: () => t('Open containing folder'),
    action: () => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {
        params: {
          q: 'index',
          adapter: app.fs.adapter,
          path: (selectedItems.value[0].dir)
        }
      });
    },
  },
  download: {
    key: FEATURES.DOWNLOAD,
    link: computed(() => app.requester.getDownloadUrl(app.fs.adapter, selectedItems.value[0])),
    title: () => t('Download'),
    action: () => {
    },
  },
  archive: {
    key: FEATURES.ARCHIVE,
    title: () => t('Archive'),
    action: () => app.modal.open(ModalArchive, {items: selectedItems}),
  },
  unarchive: {
    key: FEATURES.UNARCHIVE,
    title: () => t('Unarchive'),
    action: () => app.modal.open(ModalUnarchive, {items: selectedItems}),
  },
  rename: {
    key: FEATURES.RENAME,
    title: () => t('Rename'),
    action: () => app.modal.open(ModalRename, {items: selectedItems}),
  }
};

const run = (item) => {
  app.emitter.emit('vf-contextmenu-hide');
  item.action();
};


app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

app.emitter.on('vf-contextmenu-show', ({event, items, target = null}) => {
  context.items = [];

  if (searchQuery.value) {
    if (target) {
      context.items.push(menuItems.openDir);
      app.emitter.emit('vf-context-selected', [target]);
      // console.log('search item selected');
    } else {
      return;
    }
  } else if (!target && !searchQuery.value) {
    context.items.push(menuItems.refresh);
    context.items.push(menuItems.selectAll);
    context.items.push(menuItems.newfolder);
    app.emitter.emit('vf-context-selected', []);
    // console.log('no files selected');
  } else if (items.length > 1 && items.some(el => el.path === target.path)) {
    context.items.push(menuItems.refresh);
    context.items.push(menuItems.archive);
    context.items.push(menuItems.delete);
    app.emitter.emit('vf-context-selected', items);
    // console.log(items.length + ' selected (more than 1 item.)');
  } else {
    if (target.type === 'dir') {
      context.items.push(menuItems.open);
      if (app.pinnedFolders.findIndex((item) => item.path === target.path) !== -1) {
        context.items.push(menuItems.unpinFolder);
      } else {
        context.items.push(menuItems.pinFolder);
      }
    } else {
      context.items.push(menuItems.preview);
      context.items.push(menuItems.download);
    }
    context.items.push(menuItems.rename);

    if (target.mime_type === 'application/zip') {
      context.items.push(menuItems.unarchive);
    } else {
      context.items.push(menuItems.archive);
    }
    context.items.push(menuItems.delete);
    app.emitter.emit('vf-context-selected', [target]);
    // console.log(target.type + ' is selected');
  }
  showContextMenu(event)
})

app.emitter.on('vf-contextmenu-hide', () => {
  context.active = false;
})

const showContextMenu = (event) => {
  const area = app.dragSelect.area.value
  const rootContainer = app.root.getBoundingClientRect();
  const areaContainer = area.getBoundingClientRect();

  let left = event.clientX - rootContainer.left;
  let top = event.clientY - rootContainer.top;

  context.active = true;
  // wait for the next tick to get the actual size of the context menu
  nextTick(() => {
    // get the actual size of the context menu
    const menuContainer = contextmenu.value?.getBoundingClientRect();

    let menuHeight = menuContainer?.height ?? 0;
    let menuWidth = menuContainer?.width ?? 0;

    // check if the context menu is out of the container area
    left = (areaContainer.right - event.pageX + window.scrollX) < menuWidth ? left - menuWidth : left;
    top = (areaContainer.bottom - event.pageY + window.scrollY) < menuHeight ? top - menuHeight : top;

    context.positions = {
      left: left + 'px',
      top: top + 'px'
    };
  });
};

</script>
