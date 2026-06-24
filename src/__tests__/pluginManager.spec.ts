import { describe, expect, it, vi } from 'vitest';
import mitt from 'mitt';
import { defineComponent } from 'vue';
import { PluginManager } from '../plugins/PluginManager';
import { createModalRegistry } from '../plugins/modalRegistry';
import { createCancelableEvent } from '../plugins/hooks';
import { definePlugin } from '../plugins/types';
import type { App } from '../types';

const Dummy = defineComponent({ name: 'Dummy', render: () => null });

function createMockApp(): App {
  return { emitter: mitt() } as unknown as App;
}

function setup(plugins: Parameters<typeof definePlugin>[0][]) {
  const app = createMockApp();
  const modalRegistry = createModalRegistry();
  const manager = new PluginManager(app, modalRegistry, plugins);
  return { app, modalRegistry, manager };
}

describe('PluginManager', () => {
  it('runs each plugin setup and lands contributions in the registries', () => {
    const { manager, modalRegistry } = setup([
      definePlugin({
        name: 'p1',
        setup(ctx) {
          ctx.modals.replace('upload', Dummy);
          ctx.modals.extend('archive', 'body-bottom', { component: Dummy });
          ctx.actions.add({
            id: 'share',
            title: () => 'Share',
            surfaces: ['toolbar', 'contextmenu'],
            show: () => true,
            action: () => {},
          });
          ctx.ui.slot('toolbar-end', { component: Dummy });
        },
      }),
    ]);

    expect(modalRegistry.resolve('upload')).toBe(Dummy);
    expect(modalRegistry.getExtensions('archive', 'body-bottom')).toHaveLength(1);
    expect(manager.actionRegistry.bySurface('toolbar').map((a) => a.id)).toContain('share');
    expect(manager.actionRegistry.bySurface('contextmenu').map((a) => a.id)).toContain('share');
    expect(manager.slotRegistry.get('toolbar-end')).toHaveLength(1);
  });

  it('ignores duplicate plugin names', () => {
    const second = vi.fn();
    setup([
      definePlugin({ name: 'dup', setup: () => {} }),
      definePlugin({ name: 'dup', setup: second }),
    ]);
    expect(second).not.toHaveBeenCalled();
  });

  it('isolates a throwing plugin from the rest', () => {
    const ok = vi.fn();
    expect(() =>
      setup([
        definePlugin({
          name: 'bad',
          setup() {
            throw new Error('boom');
          },
        }),
        definePlugin({ name: 'good', setup: ok }),
      ])
    ).not.toThrow();
    expect(ok).toHaveBeenCalledOnce();
  });

  it('lets a plugin override (and disable) a built-in action', () => {
    const { manager } = setup([
      definePlugin({
        name: 'overrider',
        setup(ctx) {
          ctx.actions.override('delete', null);
          ctx.actions.override('rename', { order: 999 });
        },
      }),
    ]);
    expect(manager.actionRegistry.getOverride('delete')).toBeNull();
    expect(manager.actionRegistry.getOverride('rename')).toEqual({ order: 999 });
  });

  it('routes lifecycle hooks and supports cancelation', () => {
    const handler = vi.fn((e) => e.preventDefault());
    const { manager } = setup([
      definePlugin({
        name: 'guard',
        setup(ctx) {
          ctx.hooks.on('beforeDelete', handler);
        },
      }),
    ]);

    const ev = manager.hooks.dispatch('beforeDelete', createCancelableEvent({ items: [] }));
    expect(handler).toHaveBeenCalledOnce();
    expect(ev.defaultPrevented).toBe(true);
  });

  it('unsubscribes hooks and runs cleanups on destroy', () => {
    const handler = vi.fn();
    const cleanup = vi.fn();
    const { manager } = setup([
      definePlugin({
        name: 'lifecycle',
        setup(ctx) {
          ctx.hooks.on('afterDelete', handler);
          return cleanup;
        },
      }),
    ]);

    manager.destroy();
    expect(cleanup).toHaveBeenCalledOnce();
    // Handler no longer fires after destroy.
    manager.hooks.dispatch('afterDelete', { items: [] });
    expect(handler).not.toHaveBeenCalled();
  });
});
