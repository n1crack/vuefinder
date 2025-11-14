<script setup lang="ts">
import { nextTick, onUnmounted, reactive, ref, watch } from 'vue';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { useApp } from '../composables/useApp';

const app = useApp();

const contextmenu = ref<HTMLElement | null>(null);
const selectedItems = ref([]);

// Floating UI cleanup function
let cleanupPositioning: (() => void) | null = null;

// Virtual element for mouse position
let virtualElement: { getBoundingClientRect: () => DOMRect } | null = null;

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
  // Cleanup Floating UI when hiding
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
  }
  virtualElement = null;
  // Reset positions
  context.positions = {};
});

const showContextMenu = async (event: MouseEvent | TouchEvent) => {
  // Cleanup previous positioning if any
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
  }

  // Get coordinates from either MouseEvent or TouchEvent
  const getCoordinates = (e: MouseEvent | TouchEvent) => {
    if ('clientX' in e && 'clientY' in e) {
      // MouseEvent
      return { x: e.clientX, y: e.clientY };
    } else if ('touches' in e && e.touches.length > 0 && e.touches[0]) {
      // TouchEvent - use first touch
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    } else if ('changedTouches' in e && e.changedTouches.length > 0 && e.changedTouches[0]) {
      // TouchEvent - use changed touches
      const touch = e.changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: 0, y: 0 };
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

  // Set initial hidden styles BEFORE making it active to prevent flash
  context.positions = {
    position: 'fixed',
    zIndex: '10001',
    opacity: '0',
    visibility: 'hidden', // Hide from layout but keep in DOM
    left: '-9999px',
    top: '-9999px',
  };

  // Set menu to active so it's in the DOM
  context.active = true;

  // Wait for DOM to be ready
  await nextTick();

  if (!contextmenu.value || !virtualElement) {
    return;
  }

  // Wait for the menu to be fully rendered with its dimensions
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  // Now calculate position with proper menu dimensions
  let x = 0;
  let y = 0;
  try {
    const position = await computePosition(virtualElement, contextmenu.value, {
      placement: 'right-start',
      strategy: 'fixed',
      middleware: [
        offset(8),
        flip({
          padding: 16,
          fallbackPlacements: ['left-start', 'right-end', 'left-end', 'top-start', 'bottom-start'],
        }),
        shift({ padding: 16 }),
      ],
    });
    x = position.x;
    y = position.y;
  } catch (error) {
    console.warn('[ContextMenu] Floating UI initial positioning error:', error);
    return;
  }

  // Set the correct position and prepare for animation
  context.positions = {
    position: 'fixed',
    zIndex: '10001',
    left: `${x}px`,
    top: `${y}px`,
    opacity: '0',
    visibility: 'visible', // Make it visible but still transparent
    transform: 'translateY(-8px)',
    transition: 'opacity 150ms ease-out, transform 150ms ease-out',
  };

  // Animate in after position is set
  requestAnimationFrame(() => {
    if (contextmenu.value) {
      context.positions = {
        ...context.positions,
        opacity: '1',
        transform: 'translateY(0)',
      };
    }
  });

  // Setup auto-update after animation completes
  setTimeout(() => {
    if (!contextmenu.value || !virtualElement) return;

    try {
      cleanupPositioning = autoUpdate(virtualElement, contextmenu.value, async () => {
        if (!virtualElement || !contextmenu.value) return;

        try {
          const { x: newX, y: newY } = await computePosition(virtualElement, contextmenu.value, {
            placement: 'right-start',
            strategy: 'fixed',
            middleware: [
              offset(8),
              flip({
                padding: 16,
                fallbackPlacements: [
                  'left-start',
                  'right-end',
                  'left-end',
                  'top-start',
                  'bottom-start',
                ],
              }),
              shift({ padding: 16 }),
            ],
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
  }, 200); // Wait for animation to complete
};

// Watch for active changes to handle cleanup
watch(
  () => context.active,
  (newActive) => {
    if (!newActive && cleanupPositioning) {
      cleanupPositioning();
      cleanupPositioning = null;
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  if (cleanupPositioning) {
    cleanupPositioning();
    cleanupPositioning = null;
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
