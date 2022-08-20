<template>
  <ul class="absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-700 shadow rounded select-none" :ref="el => contextmenu = el" v-if="context.active" :style="context.positions">
    <li class="px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700"
        v-for="(item) in context.items" :key="item.title" @click="run(item)">
      <span class="px-1"></span>
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VFContextMenu'
};
</script>

<script setup>
import {nextTick, reactive, ref} from 'vue';

const emitter = inject('emitter');
const contextmenu = ref(null);

const context = reactive({
  active: false,
  items: [],
  positions: {
    left: 0,
    top: 0
  }
});

const menuItems = {
  newfolder: {
    title: 'New Folder',
    action: () => {
      console.log('test');
    },
  },
  delete: {
    title: 'Delete',
    action: () => {
      console.log('del');
    },
  },
  preview: {
    title: 'Preview',
    action: () => {
      console.log('preview');
    },
  },
  zip: {
    title: 'Zip',
    action: () => {
      console.log('zip');
    },
  },
  rename: {
    title: 'Rename',
    action: () => {
      console.log('rename');
    },
  }
};

const run = (item) =>{
  emitter.emit('vf-contextmenu-hide');
  console.log(item)
};

emitter.on('vf-contextmenu-show', ({event, area, items,  target = null}) => {
  context.items = [];
  if (!target) {
    context.items.push(menuItems.newfolder);
    console.log('no files selected');
  } else if (items.length > 1 && items.some(el => el.path === target.path)) {
    context.items.push(menuItems.zip);
    context.items.push(menuItems.delete);
    console.log(items.length + ' selected (more than 1 item.)');
  } else {
    context.items.push(menuItems.newfolder);
    context.items.push(menuItems.preview);
    context.items.push(menuItems.rename);
    context.items.push(menuItems.zip);
    context.items.push(menuItems.delete);
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
    let left = event.pageX - window.scrollX;
    let top = event.pageY - window.scrollY;
    let menuHeight = contextmenu.value.offsetHeight;
    let menuWidth = contextmenu.value.offsetWidth;

    left = container.right - event.pageX + window.scrollX < menuWidth ? left - menuWidth : left;
    top = container.bottom - event.pageY + window.scrollY < menuHeight ? top - menuHeight : top;

    context.positions = {
      left: left + 'px',
      top: top + 'px'
    };
  });
};

</script>
