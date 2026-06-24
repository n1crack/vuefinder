import { shallowReactive, type Component } from 'vue';

/** Named layout slots plugins can render components into. */
export type UiSlotName =
  | 'toolbar-start'
  | 'toolbar-end'
  | 'statusbar-start'
  | 'statusbar-end'
  | 'sidebar-top'
  | 'sidebar-bottom';

export interface SlotContribution {
  component: Component;
  props?: Record<string, unknown>;
  order?: number;
  /** Internal stable key for v-for; assigned on registration. */
  _id?: string;
}

export type SlotRegistry = ReturnType<typeof createSlotRegistry>;

export function createSlotRegistry() {
  const slots = shallowReactive(new Map<string, SlotContribution[]>());
  let counter = 0;

  const add = (name: UiSlotName, contribution: SlotContribution): void => {
    const list = slots.get(name) ?? [];
    const next = [...list, { ...contribution, _id: contribution._id ?? `vf-slot-${counter++}` }];
    next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    slots.set(name, next);
  };

  const get = (name: UiSlotName): SlotContribution[] => slots.get(name) ?? [];

  return { add, get };
}
