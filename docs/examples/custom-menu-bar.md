---
outline: deep
---

# Custom Menu Bar

Replace the menu bar with your own compact toolbar and drop the default toolbar
and breadcrumb bar, so an embedded file manager costs one row of chrome instead
of three.

This is the `menu-items` slot put to work. For a tour of every MenuBar slot and
what each one receives, see [Slots](/guide/slots).

## Live Demo

Toggle **Compact layout** to compare the one-bar result with the default three
bars. The buttons are the real actions — they open the same modals the default
menus do.

<ClientOnly>
  <CustomMenuBarDemo />
</ClientOnly>

## How It Works

Two pieces do the work together:

1. The `menu-items` slot replaces what is rendered **inside** the menu bar.
2. `showToolbar` and `showBreadcrumbBar` remove the other two bars, since the
   custom bar already covers them.

```vue
<template>
  <vue-finder
    id="compact"
    :driver="driver"
    :config="{
      showToolbar: false,
      showBreadcrumbBar: false,
    }"
  >
    <template #menu-items>
      <CompactBar />
    </template>
  </vue-finder>
</template>
```

## The Custom Bar

Rather than reimplementing behaviour, the bar reads the real actions with
`useMenuItems()` and pairs them with `useBreadcrumbActions()`. Because it is
rendered inside the VueFinder instance, both composables resolve against that
instance — exactly as they do in the library's own components.

```vue
<!-- CompactBar.vue -->
<script setup>
import { computed } from 'vue';
import { useMenuItems, useBreadcrumbActions } from 'vuefinder';

const { menuItems } = useMenuItems();
// Destructure: `currentPath` is a ref, and only a top-level binding gets
// unwrapped in the template.
const { currentPath, goUp, refresh } = useBreadcrumbActions();

// Flatten every menu into an id -> item lookup, then cherry-pick.
const byId = computed(() => {
  const map = new Map();
  for (const menu of menuItems.value) {
    for (const item of menu.items ?? []) {
      if (item.id) map.set(item.id, item);
    }
  }
  return map;
});

const primary = computed(() =>
  ['new-folder', 'upload', 'rename', 'delete'].map((id) => byId.value.get(id)).filter(Boolean)
);

const run = (item) => {
  if (item.enabled && !item.enabled()) return;
  item.action?.();
};
</script>

<template>
  <div class="bar">
    <button
      v-for="item in primary"
      :key="item.id"
      :disabled="item.enabled ? !item.enabled() : false"
      @click="run(item)"
    >
      {{ item.label }}
    </button>

    <button @click="goUp()">↑</button>
    <button @click="refresh()">⟳</button>
    <span>{{ currentPath.path }}</span>
  </div>
</template>
```

## Notes

### Respect `enabled` and `hidden`

Menu items carry `enabled()` and `hidden()` predicates that react to the current
selection — `Rename` only applies to a single item, `Delete` needs a selection at
all. Honour them so your bar disables and hides the same way the default menus do.

### Item Ids Are the Contract

Cherry-picking by id (`new-folder`, `upload`, `rename`, `delete`, `grid-view`,
`list-view`, `fullscreen`) keeps the bar stable while letting VueFinder own the
behaviour. An id that does not exist is simply skipped by the `filter(Boolean)`
above, so a missing action degrades quietly rather than throwing.

### Hiding vs. Replacing

A slot replaces the *contents* of a bar; it never hides the bar itself. Removing
a bar is what the visibility options are for — see
[UI Visibility](/examples/ui-visibility).
