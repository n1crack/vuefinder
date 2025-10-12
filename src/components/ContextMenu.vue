<script setup lang="ts">
import {inject, nextTick, reactive, ref} from 'vue';
import {useStore} from '@nanostores/vue';

const app = inject('ServiceContainer');
const search = app.search;

// Use nanostores reactive values for template reactivity
const searchState = useStore(search.state);

const contextmenu = ref<HTMLElement | null>(null);
const selectedItems = ref([]);

const context = reactive({
  active: false,
  items: [] as any[],
  positions: {
    left: '0px' as string,
    top: '0px' as string
  }
});


app.emitter.on('vf-context-selected', (items: any) => {
  selectedItems.value = items;
})

const link = (item: any) => {
  return item.link(app, selectedItems.value)
}

const run = (item: any) => {
  app.emitter.emit('vf-contextmenu-hide');
  item.action(app, selectedItems.value);
};


app.emitter.on('vf-contextmenu-show', ({event, items, target = null}: { event: any, items: any, target?: any }) => {

  context.items = app.contextMenuItems.filter((item: any) => {
    return item.show(app, {
      searchQuery: searchState.query,
      items,
      target
    })
  });

  if (searchState.query) {
    if (target) {
      app.emitter.emit('vf-context-selected', [target]);
      // console.log('search item selected');
    } else {
      return;
    }
  } else if (!target && !searchState.query) {
    app.emitter.emit('vf-context-selected', []);
    // console.log('no files selected');
  } else if (items.length > 1 && items.some((el: any) => el.path === target.path)) {
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

const showContextMenu = (event: any) => {
  const area = app.root
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
      left: String(left) + 'px',
      top: String(top) + 'px'
    };
  });
};

</script>

<template>
  <ul ref="contextmenu" :class="context.active ? 'vuefinder__context-menu--active' : 'vuefinder__context-menu--inactive'" v-show="context.active" :style="context.positions"
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
