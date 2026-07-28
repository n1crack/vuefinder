<script setup lang="ts">
// Demonstrates reusing the exact same actions that power the default
// MenuBar/Breadcrumb (including their modal-opening behavior) to build a
// single custom bar. This component is rendered through MenuBar's
// `#menu-items` slot, so `useMenuItems()`/`useBreadcrumbActions()` resolve
// against the surrounding VueFinder instance just like they do inside the
// library's own components.
import { useMenuItems, useBreadcrumbActions } from '../../src';
import type { MenuItem } from '../../src';

const { menuItems } = useMenuItems();
const breadcrumb = useBreadcrumbActions();

function flatActionable(menu: MenuItem | undefined): MenuItem[] {
  if (!menu?.items) return [];
  return menu.items.filter(
    (item) => item.type !== 'separator' && !item.items?.length && !item.hidden?.()
  );
}

const fileActions = () => flatActionable(menuItems.value.find((m) => m.id === 'file'));
const editActions = () => flatActionable(menuItems.value.find((m) => m.id === 'edit'));
// Grid/List view + Fullscreen toggles - the same actions the default Toolbar
// exposes, so hiding the Toolbar (`showToolbar: false`) doesn't lose them.
const viewActions = () =>
  flatActionable(menuItems.value.find((m) => m.id === 'view')).filter((item) =>
    ['grid-view', 'list-view', 'fullscreen'].includes(item.id ?? '')
  );

function run(item: MenuItem) {
  if (item.enabled && !item.enabled()) return;
  item.action?.();
}
</script>

<template>
  <div class="combined-bar">
    <div class="combined-bar__group combined-bar__group--path">
      <span class="combined-bar__path">{{ breadcrumb.currentPath.path }}</span>
    </div>

    <div class="combined-bar__group">
      <span class="combined-bar__group-label">File</span>
      <button
        v-for="item in fileActions()"
        :key="item.id"
        class="combined-bar__btn"
        :disabled="item.enabled ? !item.enabled() : false"
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="combined-bar__group">
      <span class="combined-bar__group-label">Edit</span>
      <button
        v-for="item in editActions()"
        :key="item.id"
        class="combined-bar__btn"
        :disabled="item.enabled ? !item.enabled() : false"
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="combined-bar__group">
      <span class="combined-bar__group-label">View</span>
      <button
        v-for="item in viewActions()"
        :key="item.id"
        class="combined-bar__btn"
        :class="{ 'combined-bar__btn--checked': item.checked?.() }"
        :disabled="item.enabled ? !item.enabled() : false"
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="combined-bar__group">
      <span class="combined-bar__group-label">Breadcrumb actions</span>
      <button class="combined-bar__btn" @click="breadcrumb.refresh()">Refresh</button>
      <button class="combined-bar__btn" @click="breadcrumb.goUp()">Go Up</button>
      <button class="combined-bar__btn" @click="breadcrumb.toggleTreeView()">Toggle Tree</button>
      <button class="combined-bar__btn" @click="breadcrumb.copyCurrentPath()">Copy Path</button>
    </div>
  </div>
</template>

<style scoped>
.combined-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 6px 10px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.combined-bar__group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.combined-bar__group--path {
  flex-basis: 100%;
  order: -1;
  padding-bottom: 4px;
  margin-bottom: 2px;
  border-bottom: 1px dashed #e5e7eb;
}

.combined-bar__path {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 0.8rem;
  color: #374151;
}

.combined-bar__group-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 2px;
}

.combined-bar__btn {
  padding: 4px 8px;
  font-size: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.combined-bar__btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.combined-bar__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.combined-bar__btn--checked {
  background: #e0e7ff;
  border-color: #6366f1;
}
</style>
