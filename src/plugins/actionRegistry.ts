import { shallowReactive, type Component } from 'vue';
import type { App, DirEntry } from '../types';
import type { MenuContext } from '../utils/contextmenu';

export type ActionSurface = 'toolbar' | 'contextmenu' | 'menubar';

/**
 * A unified action that can surface in the toolbar, context menu, and/or be
 * bound to a hotkey. Generalizes the existing context-menu `Item` shape so a
 * single declaration drives every place an action can appear.
 */
export interface ActionContribution {
  id: string;
  title: (i18n: App['i18n']) => string;
  /** Icon component (used by toolbar / menubar surfaces). */
  icon?: Component;
  /** Where this action appears. */
  surfaces: ActionSurface[];
  /** Optional keyboard binding handled by useHotkeyActions. */
  hotkey?: { code: string; meta?: boolean; shift?: boolean; alt?: boolean };
  /** Visibility predicate, same signature as built-in menu items. */
  show: (app: App, ctx: MenuContext) => boolean;
  action: (app: App, selectedItems: DirEntry[]) => void;
  /** Lower numbers render first. */
  order?: number;
}

export type ActionRegistry = ReturnType<typeof createActionRegistry>;

/**
 * Holds plugin-contributed actions plus per-id overrides for built-in actions.
 * A `null` override disables the built-in; a partial patches it.
 */
export function createActionRegistry() {
  const actions = shallowReactive<ActionContribution[]>([]);
  const overrides = shallowReactive(new Map<string, Partial<ActionContribution> | null>());

  const add = (action: ActionContribution): void => {
    const idx = actions.findIndex((a) => a.id === action.id);
    if (idx >= 0) actions.splice(idx, 1, action);
    else actions.push(action);
  };

  const override = (id: string, patch: Partial<ActionContribution> | null): void => {
    overrides.set(id, patch);
  };

  const getOverride = (id: string): Partial<ActionContribution> | null | undefined =>
    overrides.get(id);

  const bySurface = (surface: ActionSurface): ActionContribution[] =>
    actions
      .filter((a) => a.surfaces.includes(surface))
      .slice()
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

  return { actions, add, override, getOverride, bySurface };
}
