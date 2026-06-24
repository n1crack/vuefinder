import type { Component } from 'vue';
import type { App } from '../types';
import type { ModalKey, ModalRegion, ModalExtension } from './modalRegistry';
import type { ActionContribution } from './actionRegistry';
import type { UiSlotName, SlotContribution } from './slotRegistry';
import type { VfHooks } from './hooks';

/**
 * The object a plugin's `setup()` receives. Everything a plugin can do to a
 * VueFinder instance is reachable from here. `app` is the full per-instance
 * service container (config, fs, adapter, i18n, modal, …) for driving work.
 */
export interface PluginContext {
  app: App;

  modals: {
    /** Fully replace the component shown for a modal key. */
    replace(key: ModalKey, component: Component): void;
    /** Inject a component into a named region of a built-in modal. */
    extend(key: ModalKey, region: ModalRegion, contribution: ModalExtension): void;
  };

  actions: {
    /** Add a toolbar / context-menu / hotkey action. */
    add(action: ActionContribution): void;
    /** Patch (or disable, with `null`) a built-in action by id. */
    override(id: string, patch: Partial<ActionContribution> | null): void;
  };

  ui: {
    /** Render a component into a named layout slot. */
    slot(name: UiSlotName, contribution: SlotContribution): void;
  };

  hooks: {
    /** Subscribe to a typed lifecycle hook. */
    on<K extends keyof VfHooks>(event: K, handler: (payload: VfHooks[K]) => void): void;
  };
}

export interface VfPlugin {
  /** Unique id, used for de-duplication and debugging. */
  name: string;
  /**
   * Called once when the VueFinder instance is created. Register contributions
   * here. May return a cleanup function, invoked when the instance unmounts.
   */
  setup(ctx: PluginContext): void | (() => void);
}

/** Identity helper that gives consumers full type-checking on their plugin. */
export function definePlugin(plugin: VfPlugin): VfPlugin {
  return plugin;
}
