<script setup lang="ts">
// Rendered through `#menu-items`. It picks a handful of actions out of the
// default menus by id and pairs them with the breadcrumb actions, so a single
// row covers what the menu bar, toolbar and breadcrumb bar do by default.
import { computed } from 'vue';
import { useMenuItems, useBreadcrumbActions } from 'vuefinder';
import type { MenuItem } from 'vuefinder';

const { menuItems } = useMenuItems();
// Destructured so `currentPath` stays a top-level binding and the template
// unwraps it; `breadcrumb.currentPath.path` would read through the ref object.
const { currentPath, goUp, refresh } = useBreadcrumbActions();

const byId = computed(() => {
  const map = new Map<string, MenuItem>();
  for (const menu of menuItems.value) {
    for (const item of menu.items ?? []) {
      if (item.id) map.set(item.id, item);
    }
  }
  return map;
});

const pick = (ids: string[]) =>
  ids
    .map((id) => byId.value.get(id))
    .filter((item): item is MenuItem => Boolean(item) && !item?.hidden?.());

const primary = computed(() => pick(['new-folder', 'upload', 'rename', 'delete']));
const views = computed(() => pick(['grid-view', 'list-view']));

const isDisabled = (item: MenuItem) => (item.enabled ? !item.enabled() : false);

const run = (item: MenuItem) => {
  if (isDisabled(item)) return;
  item.action?.();
};
</script>

<template>
  <div class="cmb">
    <div class="cmb__actions">
      <button
        v-for="item in primary"
        :key="item.id"
        class="cmb__btn"
        :disabled="isDisabled(item)"
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="cmb__path" :title="currentPath.path">
      <button class="cmb__icon" title="Go up" @click="goUp()">↑</button>
      <button class="cmb__icon" title="Refresh" @click="refresh()">⟳</button>
      <span class="cmb__path-text">{{ currentPath.path }}</span>
    </div>

    <div class="cmb__actions">
      <button
        v-for="item in views"
        :key="item.id"
        class="cmb__btn"
        :class="{ 'cmb__btn--on': item.checked?.() }"
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cmb {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 5px 8px;
}

.cmb__actions {
  display: flex;
  flex: none;
  gap: 3px;
  align-items: center;
}

.cmb__path {
  display: flex;
  flex: 1 1 12rem;
  gap: 3px;
  align-items: center;
  min-width: 0;
}

.cmb__path-text {
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cmb__btn,
.cmb__icon {
  padding: 1px 6px;
  font-size: 0.7rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.cmb__icon {
  padding: 1px 5px;
}

.cmb__btn:hover:not(:disabled),
.cmb__icon:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.cmb__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.cmb__btn--on {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
