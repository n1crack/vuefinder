<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { useApp } from '../composables/useApp';

const app = useApp();

const contextmenu = ref<HTMLElement | null>(null);
const selectedItems = ref([]);

const context = reactive({
  active: false,
  items: [] as any[],
  positions: {
    left: '0px' as string,
    top: '0px' as string,
  },
});

app.emitter.on('vf-context-selected', (items: any) => {
  selectedItems.value = items;
});

const link = (item: any) => {
  return item.link(app, selectedItems.value);
};

const run = (item: any) => {
  app.emitter.emit('vf-contextmenu-hide');
  item.action(app, selectedItems.value);
};

app.emitter.on('vf-contextmenu-show', (payload: any) => {
  const { event, items, target = null } = payload || {};

  context.items = (app.contextMenuItems || [])
    .filter((item: any) => {
      return item.show(app, {
        items,
        target,
      });
    })
    .sort((a: any, b: any) => {
      const orderA = a.order ?? Infinity;
      const orderB = b.order ?? Infinity;
      return orderA - orderB;
    });

  if (!target) {
    app.emitter.emit('vf-context-selected', []);
  } else if (items.length > 1 && items.some((el: any) => el.path === target.path)) {
    app.emitter.emit('vf-context-selected', items);
  } else {
    app.emitter.emit('vf-context-selected', [target]);
  }
  showContextMenu(event);
});

app.emitter.on('vf-contextmenu-hide', () => {
  context.active = false;
});

const showContextMenu = (event: any) => {
  const area = app.root as HTMLElement | null;
  const rootContainer = area?.getBoundingClientRect?.();
  const areaContainer = area?.getBoundingClientRect?.();

  let left = event.clientX - (rootContainer?.left ?? 0);
  let top = event.clientY - (rootContainer?.top ?? 0);

  context.active = true;
  // wait for the next tick to get the actual size of the context menu
  nextTick(() => {
    // get the actual size of the context menu
    const menuContainer = contextmenu.value?.getBoundingClientRect();

    const menuHeight = menuContainer?.height ?? 0;
    const menuWidth = menuContainer?.width ?? 0;

    // check if the context menu is out of the container area
    left =
      areaContainer && areaContainer.right - event.pageX + window.scrollX < menuWidth
        ? left - menuWidth
        : left;
    top =
      areaContainer && areaContainer.bottom - event.pageY + window.scrollY < menuHeight
        ? top - menuHeight
        : top;

    context.positions = {
      left: String(left) + 'px',
      top: String(top) + 'px',
    };
  });
};
</script>

<template>
  <ul
    v-show="context.active"
    ref="contextmenu"
    :class="{
      'vuefinder__context-menu--active': context.active,
      'vuefinder__context-menu--inactive': !context.active,
    }"
    :style="context.positions"
    class="vuefinder__context-menu"
  >
    <li v-for="item in context.items" :key="item.title" class="vuefinder__context-menu__item">
      <template v-if="item.link">
        <a
          class="vuefinder__context-menu__link"
          target="_blank"
          :href="link(item)"
          :download="link(item)"
          @click="app.emitter.emit('vf-contextmenu-hide')"
        >
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
