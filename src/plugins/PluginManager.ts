import type { App } from '../types';
import type { VfPlugin, PluginContext } from './types';
import type { ModalRegistry } from './modalRegistry';
import { createActionRegistry, type ActionRegistry } from './actionRegistry';
import { createSlotRegistry, type SlotRegistry } from './slotRegistry';
import { createHookBus, type HookBus } from './hooks';

/**
 * Per-instance orchestrator. Owns the action/slot registries and hook bus,
 * shares the modal registry created by ServiceContainer, then runs each
 * plugin's setup() to populate them. The UI reads the registries; operations
 * dispatch through the hook bus.
 */
export class PluginManager {
  readonly modalRegistry: ModalRegistry;
  readonly actionRegistry: ActionRegistry;
  readonly slotRegistry: SlotRegistry;
  readonly hooks: HookBus;
  private cleanups: Array<() => void> = [];

  constructor(app: App, modalRegistry: ModalRegistry, plugins: VfPlugin[] = []) {
    this.modalRegistry = modalRegistry;
    this.actionRegistry = createActionRegistry();
    this.slotRegistry = createSlotRegistry();
    this.hooks = createHookBus(app.emitter);

    const seen = new Set<string>();
    for (const plugin of plugins) {
      if (!plugin || typeof plugin.setup !== 'function') {
        console.warn('[vuefinder] ignoring invalid plugin (missing setup):', plugin);
        continue;
      }
      if (seen.has(plugin.name)) {
        console.warn(`[vuefinder] duplicate plugin "${plugin.name}" ignored.`);
        continue;
      }
      seen.add(plugin.name);

      const ctx = this.createContext(app);
      try {
        const cleanup = plugin.setup(ctx);
        if (typeof cleanup === 'function') this.cleanups.push(cleanup);
      } catch (e) {
        console.error(`[vuefinder] plugin "${plugin.name}" failed during setup:`, e);
      }
    }
  }

  private createContext(app: App): PluginContext {
    // Track this plugin's hook subscriptions so they unsubscribe on destroy.
    const offs: Array<() => void> = [];
    this.cleanups.push(() => offs.forEach((off) => off()));

    return {
      app,
      modals: {
        replace: (key, component) => this.modalRegistry.replace(key, component),
        extend: (key, region, contribution) =>
          this.modalRegistry.addExtension(key, region, contribution),
      },
      actions: {
        add: (action) => this.actionRegistry.add(action),
        override: (id, patch) => this.actionRegistry.override(id, patch),
      },
      ui: {
        slot: (name, contribution) => this.slotRegistry.add(name, contribution),
      },
      hooks: {
        on: (event, handler) => {
          offs.push(this.hooks.on(event, handler));
        },
      },
    };
  }

  /** Run all plugin cleanups; called when the instance unmounts. */
  destroy(): void {
    for (const fn of this.cleanups) {
      try {
        fn();
      } catch (e) {
        console.error('[vuefinder] plugin cleanup failed:', e);
      }
    }
    this.cleanups = [];
  }
}
