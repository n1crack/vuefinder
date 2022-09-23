<template>
  <ul class="z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none" ref="contextmenu" v-if="context.active" :style="context.positions">
    <li class="px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700"
        v-for="(item) in context.items" :key="item.title" @click="run(item)">
      <span class="px-1"></span>
      <span>{{ item.title() }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VFContextMenu'
};
</script>

<script setup>
import {inject, nextTick, reactive, ref} from 'vue';
import buildURLQuery from '../utils/buildURLQuery.js';
import {useApiUrl} from '../composables/useApiUrl.js';

const emitter = inject('emitter');
const contextmenu = ref(null);

const {apiUrl} = useApiUrl();

const props = defineProps({
  current: Object
});

const context = reactive({
  active: false,
  items: [],
  positions: {
    left: 0,
    top: 0
  }
});

const selectedItems = ref([]);

emitter.on('vf-context-selected', (items) => {
  selectedItems.value = items;
})
const {t} = inject('i18n')

const menuItems = {
  newfolder: {
    title: () => t('New Folder'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'new-folder'});
    },
  },
  delete: {
    title: () => t('Delete'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'delete', items: selectedItems});
    },
  },
  refresh: {
    title: () =>  t('Refresh'),
    action: () => {
      emitter.emit('vf-fetch',{q: 'index', adapter: props.current.adapter, path: props.current.dirname} );
    },
  },
  preview: {
    title: () =>  t('Preview'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'preview', adapter:props.current.adapter, item: selectedItems.value[0]});
    },
  },
  open: {
    title: () =>  t('Open'),
    action: () => {
      emitter.emit('vf-search-exit');
      emitter.emit('vf-fetch', {q: 'index', adapter: props.current.adapter, path:selectedItems.value[0].path});
    },
  },
  openDir: {
    title: () =>  t('Open containing folder'),
    action: () => {
      emitter.emit('vf-search-exit');
      emitter.emit('vf-fetch', {q: 'index', adapter: props.current.adapter, path: (selectedItems.value[0].dir)});
    },
  },
  download: {
    title: () =>  t('Download'),
    action: () => {
      const url = apiUrl.value + '?' + buildURLQuery({q:'download', adapter: selectedItems.value[0].adapter, path: selectedItems.value[0].path});
      emitter.emit('vf-download', url);
    },
  },
  archive: {
    title: () =>  t('Archive'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'archive', items: selectedItems});
    },
  },
  unarchive: {
    title: () => t('Unarchive'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'unarchive', items: selectedItems});
    },
  },
  rename: {
    title: () =>  t('Rename'),
    action: () => {
      emitter.emit('vf-modal-show', {type:'rename', items: selectedItems});
    },
  }
};

const run = (item) =>{
  emitter.emit('vf-contextmenu-hide');
  item.action();
};

const searchQuery = ref('');

emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

emitter.on('vf-contextmenu-show', ({event, area, items,  target = null}) => {
  context.items = [];

  if (searchQuery.value) {
    if (target) {
      context.items.push(menuItems.openDir);
      emitter.emit('vf-context-selected', [target]);
    } else {
      return;
    }
  } else if (!target && !searchQuery.value) {
    context.items.push(menuItems.refresh);
    context.items.push(menuItems.newfolder);
    emitter.emit('vf-context-selected', []);
    console.log('no files selected');
  } else if (items.length > 1 && items.some(el => el.path === target.path)) {
    context.items.push(menuItems.refresh);
    context.items.push(menuItems.archive);
    context.items.push(menuItems.delete);
    emitter.emit('vf-context-selected', items);
    console.log(items.length + ' selected (more than 1 item.)');
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
    emitter.emit('vf-context-selected', [target]);
    console.log(target.type + ' is selected');
  }
  showContextMenu(event, area)
})

emitter.on('vf-contextmenu-hide', () => {
  context.active = false;
})

const showContextMenu = (event, area) => {
  context.active = true;

  nextTick(() => {
    let container = area.getBoundingClientRect();
    let left = event.pageX;
    let top = event.pageY;
    let menuHeight = contextmenu.value.offsetHeight;
    let menuWidth = contextmenu.value.offsetWidth;

    left = (container.right - event.pageX + window.scrollX) < menuWidth ? left - menuWidth : left;
    top = (container.bottom - event.pageY + window.scrollY) < menuHeight ? top - menuHeight : top;

    context.positions = {
      left: left + 'px',
      top: top + 'px'
    };
  });
};

</script>
