<template>
  <ul class="z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none" ref="contextmenu" v-if="context.active" :style="context.positions">
    <li class="px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700"
        v-for="(item) in filteredItems" :key="item.title" @click="run(item)">
      <template v-if="item.link">
        <a target="_blank" :href="item.link" :download="item.link">
          <span class="px-1"></span>
          <span>{{ item.title() }}</span>
        </a>
      </template>
      <template v-else>
        <span class="px-1"></span>
        <span>{{ item.title() }}</span>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VFContextMenu'
};
</script>

<script setup>
import {computed, inject, nextTick, reactive, ref} from 'vue';
import {FEATURES} from "./features.js";

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
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'new-folder'});
    },
  },
  delete: {
    key: FEATURES.DELETE,
    title: () => t('Delete'),
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'delete', items: selectedItems});
    },
  },
  refresh: {
    title: () =>  t('Refresh'),
    action: () => {
      app.emitter.emit('vf-fetch',{params:{q: 'index', adapter: app.data.adapter, path: app.data.dirname}} );
    },
  },
  preview: {
    key: FEATURES.PREVIEW,
    title: () =>  t('Preview'),
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'preview', adapter:app.data.adapter, item: selectedItems.value[0]});
    },
  },
  open: {
    title: () =>  t('Open'),
    action: () => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path:selectedItems.value[0].path}});
    },
  },
  openDir: {
    title: () =>  t('Open containing folder'),
    action: () => {
      app.emitter.emit('vf-search-exit');
      app.emitter.emit('vf-fetch', {params:{q: 'index', adapter: app.data.adapter, path: (selectedItems.value[0].dir)}});
    },
  },
  download: {
    key: FEATURES.DOWNLOAD,
    link: computed(() => app.requester.getDownloadUrl(app.data.adapter, selectedItems.value[0])),
    title: () =>  t('Download'),
    action: () => {
      const url = app.requester.getDownloadUrl(app.data.adapter, selectedItems.value[0]);
      app.emitter.emit('vf-download', url);
    },
  },
  archive: {
    key: FEATURES.ARCHIVE,
    title: () =>  t('Archive'),
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'archive', items: selectedItems});
    },
  },
  unarchive: {
    key: FEATURES.UNARCHIVE,
    title: () => t('Unarchive'),
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'unarchive', items: selectedItems});
    },
  },
  rename: {
    key: FEATURES.RENAME,
    title: () =>  t('Rename'),
    action: () => {
      app.emitter.emit('vf-modal-show', {type:'rename', items: selectedItems});
    },
  }
};

const run = (item) =>{
  app.emitter.emit('vf-contextmenu-hide');
  item.action();
};


app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

app.emitter.on('vf-contextmenu-show', ({event, area, items,  target = null}) => {
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
    if (target.type == 'dir') {
      context.items.push(menuItems.open);
    } else {
      context.items.push(menuItems.preview);
      context.items.push(menuItems.download);
    }
    context.items.push(menuItems.rename);

    if (target.mime_type == 'application/zip') {
      context.items.push(menuItems.unarchive);
    } else {
      context.items.push(menuItems.archive);
    }
    context.items.push(menuItems.delete);
    app.emitter.emit('vf-context-selected', [target]);
    // console.log(target.type + ' is selected');
  }
  showContextMenu(event, area)
})

app.emitter.on('vf-contextmenu-hide', () => {
  context.active = false;
})

const showContextMenu = (event, area) => {
  context.active = true;

  nextTick(() => {
    const rootBbox = app.root.getBoundingClientRect();
    const areaContainer = area.getBoundingClientRect();

    let left = event.pageX - rootBbox.left;
    let top = event.pageY - rootBbox.top;
    let menuHeight = contextmenu.value.offsetHeight;
    let menuWidth = contextmenu.value.offsetWidth;

    left = (areaContainer.right - event.pageX + window.scrollX) < menuWidth ? left - menuWidth : left;
    top = (areaContainer.bottom - event.pageY + window.scrollY) < menuHeight ? top - menuHeight : top;

    context.positions = {
      left: left + 'px',
      top: top + 'px'
    };
  });
};

</script>
