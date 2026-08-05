<script setup lang="ts">
// Rendered through MenuBar's `#menu-items` slot. Because it lives inside the
// VueFinder instance, `useMenuItems()` / `useBreadcrumbActions()` resolve
// against that instance exactly as they do in the library's own components -
// so this bar can drive the real actions (modals included) rather than
// reimplementing them.
import { computed } from 'vue';
import { useMenuItems, useBreadcrumbActions } from 'vuefinder';
import type { MenuItem } from 'vuefinder';

const { menuItems } = useMenuItems();
// Destructured so `currentPath` stays a top-level binding and the template
// unwraps it; `breadcrumb.currentPath.path` would read through the ref object.
const { currentPath, goUp, refresh, toggleTreeView, copyCurrentPath } = useBreadcrumbActions();

const actionsOf = (id: string, only?: string[]): MenuItem[] => {
  const menu = menuItems.value.find((m) => m.id === id);
  const items = (menu?.items ?? []).filter(
    (item) => item.type !== 'separator' && !item.items?.length && !item.hidden?.()
  );
  return only ? items.filter((item) => only.includes(item.id ?? '')) : items;
};

const groups = computed(() => [
  { label: 'File', items: actionsOf('file') },
  { label: 'Edit', items: actionsOf('edit') },
  // The same view actions the default Toolbar exposes, so hiding the toolbar
  // does not lose them.
  { label: 'View', items: actionsOf('view', ['grid-view', 'list-view', 'fullscreen']) },
]);

const isDisabled = (item: MenuItem) => (item.enabled ? !item.enabled() : false);

const run = (item: MenuItem) => {
  if (isDisabled(item)) return;
  item.action?.();
};
</script>

<template>
  <div class="vf-combined-bar">
    <div class="vf-combined-bar__path" :title="currentPath.path">
      {{ currentPath.path }}
    </div>

    <div class="vf-combined-bar__groups">
      <div v-for="group in groups" :key="group.label" class="vf-combined-bar__group">
        <span class="vf-combined-bar__label">{{ group.label }}</span>
        <button
          v-for="item in group.items"
          :key="item.id"
          class="vf-combined-bar__btn"
          :class="{ 'vf-combined-bar__btn--on': item.checked?.() }"
          :disabled="isDisabled(item)"
          @click="run(item)"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="vf-combined-bar__group">
        <span class="vf-combined-bar__label">Breadcrumb</span>
        <button class="vf-combined-bar__btn" @click="refresh()">Refresh</button>
        <button class="vf-combined-bar__btn" @click="goUp()">Go Up</button>
        <button class="vf-combined-bar__btn" @click="toggleTreeView()">Tree</button>
        <button class="vf-combined-bar__btn" @click="copyCurrentPath()">Copy Path</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vf-combined-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
  padding: 5px 8px;
}

.vf-combined-bar__path {
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vf-combined-bar__groups {
  display: flex;
  flex-wrap: wrap;
  gap: 3px 10px;
  align-items: center;
}

.vf-combined-bar__group {
  display: flex;
  gap: 2px;
  align-items: center;
}

.vf-combined-bar__label {
  margin-right: 2px;
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.vf-combined-bar__btn {
  padding: 1px 5px;
  font-size: 0.7rem;
  line-height: 1.5;
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

.vf-combined-bar__btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.vf-combined-bar__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.vf-combined-bar__btn--on {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
