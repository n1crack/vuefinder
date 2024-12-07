<template>
  <ul ref="contextmenu" v-show="context.active" :style="context.positions"
      class="vuefinder__context-menu">
    <li class="vuefinder__context-menu__item" v-for="(item) in context.items" :key="item.title">
      <template v-if="item.link">
        <a class="vuefinder__context-menu__link" target="_blank" :href="link(item)" :download="link(item)"
           @click="app.emitter.emit('vf-contextmenu-hide')">
          <span>{{ item.title(app.i18n) }}</span>
        </a>
      </template>
      <template v-else>
        <div class="vuefinder__context-menu__action" @click="run(item)">
          <span>{{ item.title(app.i18n) }}</span>
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { inject, nextTick, reactive, ref} from 'vue';

const app = inject('ServiceContainer');

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



app.emitter.on('vf-context-selected', (items) => {
  selectedItems.value = items;
})

const link = (item) => {
  return item.link(app, selectedItems)
}

const run = (item) => {
  app.emitter.emit('vf-contextmenu-hide');
  item.action(app, selectedItems);
};

app.emitter.on('vf-search-query', ({newQuery}) => {
  searchQuery.value = newQuery;
});

app.emitter.on('vf-contextmenu-show', ({event, items, target = null}) => {
  context.items = app.contextMenuItems.filter((item) => {
    return item.show(app, {
      searchQuery: searchQuery.value, 
      items, 
      target
    })
  });

  if (searchQuery.value) {
    if (target) {
      app.emitter.emit('vf-context-selected', [target]);
      // console.log('search item selected');
    } else {
      return;
    }
  } else if (!target && !searchQuery.value) {
    app.emitter.emit('vf-context-selected', []);
    // console.log('no files selected');
  } else if (items.length > 1 && items.some(el => el.path === target.path)) {
    app.emitter.emit('vf-context-selected', items);
    // console.log(items.length + ' selected (more than 1 item.)');
  } else {
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
