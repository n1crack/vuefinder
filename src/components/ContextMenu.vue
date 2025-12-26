<script setup lang="ts">
import { nextTick, onUnmounted, reactive, ref } from 'vue';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { useApp } from '../composables/useApp';

const app = useApp();

const contextmenu = ref<HTMLElement | null>(null);
const selectedItems = ref([]);

let cleanupPositioning: (() => void) | null = null;
let virtualElement: { getBoundingClientRect: () => DOMRect } | null = null;
let scrollHandler: (() => void) | null = null;
let scrollContainers: (Window | HTMLElement)[] = [];
let clickOutsideHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;

const context = reactive({
  active: false,
  items: [] as any[],
  positions: {} as Record<string, string>,
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
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
  }
  if (scrollHandler) {
    scrollContainers.forEach((container) => {
      if (container === window) {
        window.removeEventListener('scroll', scrollHandler!, true);
      } else {
        (container as HTMLElement).removeEventListener('scroll', scrollHandler!, true);
      }
    });
    scrollHandler = null;
    scrollContainers = [];
  }
  if (clickOutsideHandler) {
    document.removeEventListener('mousedown', clickOutsideHandler, true);
    document.removeEventListener('touchstart', clickOutsideHandler, true);
    clickOutsideHandler = null;
  }
  virtualElement = null;
  context.positions = {};
});

const showContextMenu = async (event: MouseEvent | TouchEvent) => {
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
  }

  const getCoordinates = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
    if ('clientX' in e && 'clientY' in e) {
      return { x: e.clientX, y: e.clientY };
    }
    const touch =
      ('touches' in e && e.touches[0]) || ('changedTouches' in e && e.changedTouches[0]);
    return touch ? { x: touch.clientX, y: touch.clientY } : { x: 0, y: 0 };
  };

  const coords = getCoordinates(event);

  // Create virtual element from mouse/touch position
  virtualElement = {
    getBoundingClientRect: () => {
      return {
        width: 0,
        height: 0,
        x: coords.x,
        y: coords.y,
        top: coords.y,
        left: coords.x,
        right: coords.x,
        bottom: coords.y,
      } as DOMRect;
    },
  };

  context.positions = {
    position: 'fixed',
    zIndex: '10001',
    opacity: '0',
    visibility: 'hidden',
    left: '-9999px',
    top: '-9999px',
  };

  context.active = true;

  await nextTick();

  if (!contextmenu.value || !virtualElement) return;

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  const middleware = [
    offset(8),
    flip({
      padding: 16,
      fallbackPlacements: ['left-start', 'right-end', 'left-end', 'top-start', 'bottom-start'],
    }),
    shift({ padding: 16 }),
  ];

  let x = 0;
  let y = 0;
  try {
    const position = await computePosition(virtualElement, contextmenu.value, {
      placement: 'right-start',
      strategy: 'fixed',
      middleware,
    });
    x = position.x;
    y = position.y;
  } catch (error) {
    console.warn('[ContextMenu] Floating UI initial positioning error:', error);
    return;
  }

  context.positions = {
    position: 'fixed',
    zIndex: '10001',
    left: `${x}px`,
    top: `${y}px`,
    opacity: '0',
    visibility: 'visible',
    transform: 'translateY(-8px)',
    transition: 'opacity 150ms ease-out, transform 150ms ease-out',
  };

  requestAnimationFrame(() => {
    if (contextmenu.value) {
      context.positions = {
        ...context.positions,
        opacity: '1',
        transform: 'translateY(0)',
      };
    }
  });

  // Find all scrollable containers
  const findScrollableContainers = (element: HTMLElement | null): HTMLElement[] => {
    const containers: HTMLElement[] = [];
    let current: HTMLElement | null = element;

    while (current && current !== document.body && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      const overflow = style.overflow + style.overflowX + style.overflowY;

      if (overflow.includes('scroll') || overflow.includes('auto')) {
        containers.push(current);
      }

      current = current.parentElement;
    }

    return containers;
  };

  const scrollableContainers = findScrollableContainers(contextmenu.value);
  scrollContainers = [window, ...scrollableContainers];

  // Setup scroll handler to close menu on scroll
  scrollHandler = () => {
    if (context.active) {
      app.emitter.emit('vf-contextmenu-hide');
    }
  };

  // Add scroll listener to all scrollable containers
  const handler = scrollHandler;
  if (handler) {
    scrollContainers.forEach((container) => {
      if (container === window) {
        window.addEventListener('scroll', handler, true);
      } else {
        (container as HTMLElement).addEventListener('scroll', handler, true);
      }
    });
  }

  // Setup click outside handler to close menu when clicking outside VueFinder
  clickOutsideHandler = (e: MouseEvent | TouchEvent) => {
    if (!context.active) return;

    const target = e.target as HTMLElement;
    if (!target) return;

    // Check if click is inside context menu
    if (contextmenu.value && contextmenu.value.contains(target)) {
      return;
    }

    // Check if click is inside VueFinder root element
    const vuefinderRoot = app.root;
    if (vuefinderRoot && vuefinderRoot.contains(target)) {
      return;
    }

    // Click is outside VueFinder, close the menu
    app.emitter.emit('vf-contextmenu-hide');
  };

  // Add click outside listeners with a slight delay to avoid closing immediately after opening
  setTimeout(() => {
    if (clickOutsideHandler) {
      document.addEventListener('mousedown', clickOutsideHandler, true);
      document.addEventListener('touchstart', clickOutsideHandler, true);
    }
  }, 100);

  setTimeout(() => {
    if (!contextmenu.value || !virtualElement) return;

    try {
      cleanupPositioning = autoUpdate(virtualElement, contextmenu.value, async () => {
        if (!virtualElement || !contextmenu.value) return;

        try {
          const { x: newX, y: newY } = await computePosition(virtualElement, contextmenu.value, {
            placement: 'right-start',
            strategy: 'fixed',
            middleware,
          });

          context.positions = {
            ...context.positions,
            left: `${newX}px`,
            top: `${newY}px`,
          };
        } catch (error) {
          console.warn('Floating UI positioning error:', error);
        }
      });
    } catch (error) {
      console.warn('Floating UI autoUpdate setup error:', error);
      cleanupPositioning = null;
    }
  }, 200);
};

onUnmounted(() => {
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
  }
  if (scrollHandler) {
    scrollContainers.forEach((container) => {
      if (container === window) {
        window.removeEventListener('scroll', scrollHandler!, true);
      } else {
        (container as HTMLElement).removeEventListener('scroll', scrollHandler!, true);
      }
    });
    scrollHandler = null;
    scrollContainers = [];
  }
  if (clickOutsideHandler) {
    document.removeEventListener('mousedown', clickOutsideHandler, true);
    document.removeEventListener('touchstart', clickOutsideHandler, true);
    clickOutsideHandler = null;
  }
  virtualElement = null;
});
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
