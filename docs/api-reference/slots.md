---
outline: deep
---

# Slots

Complete reference of all VueFinder slots.

## Available Slots

| Slot             | Scoped Props                            | Description                                                |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `status-bar`     | `{ selected, count, path }`              | Customize status bar content                                |
| `icon`           | `{ item }`                               | Customize file/folder icons                                  |
| `menubar-start`  | `{ menuItems }`                          | Add content before the default menu bar entries               |
| `menu-items`     | `{ menuItems, handleMenuAction }`        | Replace the default File/Edit/View/Go/Help menu bar layout     |
| `menubar-end`    | `{ menuItems }`                          | Add content after the default menu bar entries                 |
| `toolbar-items`  | none                                     | Replace the entire toolbar                                     |
| `breadcrumb-actions` | none                                 | Replace the action buttons before the breadcrumb path (tree-view toggle, go up, refresh) |

## Slot Details

### `status-bar`

Customize the status bar with your own content.

**Scoped Props:**

- `selected` - `DirEntry[]` - Currently selected items
- `count` - `number` - Number of selected items
- `path` - `string` - Current path

```vue
<template #status-bar="{ selected, count, path }">
  <div class="custom-status">
    <button @click="handleAction(selected)">Action ({{ count }})</button>
    <span>{{ path }}</span>
  </div>
</template>
```

### `icon`

Customize the icon displayed for files and folders.

**Scoped Props:**

- `item` - `DirEntry` - The file or folder entry

```vue
<template #icon="{ item }">
  <CustomIcon :item="item" />
</template>
```

### `menubar-start` / `menu-items` / `menubar-end`

Customize the menu bar. `menu-items` replaces the default File/Edit/View/Go/Help
layout entirely (fallback is the default rendering); `menubar-start`/`menubar-end`
add content before/after it without touching the default menus.

**Scoped Props:**

- `menuItems` - `MenuItem[]` - The same menu structure `MenuBar.vue` renders by default (also available standalone via the `useMenuItems()` composable)
- `handleMenuAction` - `(action?: () => void) => void` - Closes the open dropdown, then runs the action (only passed to `menu-items`)

```vue
<template #menu-items="{ menuItems, handleMenuAction }">
  <MyCustomMenuBar :menu-items="menuItems" @action="handleMenuAction" />
</template>
```

A custom component placed in any of these slots can also skip the scoped props
entirely and call `useMenuItems()` / `useBreadcrumbActions()` directly - both
resolve against the surrounding VueFinder instance, reusing the exact same
actions (including modal-opening behavior) as the built-in components.

### `toolbar-items`

Replace the entire toolbar. No scoped props are passed; a custom component
should call `useMenuItems()`/`useFeature()`/`useApp()` itself to reuse the
built-in file actions (new folder, upload, rename, delete, archive, view
toggles, ...).

```vue
<template #toolbar-items>
  <MyCustomToolbar />
</template>
```

### `breadcrumb-actions`

Replace the action buttons shown before the breadcrumb path (tree-view
toggle, go up, refresh/cancel). No scoped props are passed; a custom
component should call `useBreadcrumbActions()` to reuse the built-in actions
(refresh, go up, toggle tree view) and reactive `currentPath`.

The path container itself (breadcrumb trail with overflow measurement, drag
& drop, the hidden-item dropdown, and path-copy mode) is **not** slotted -
it's complex enough that reimplementing it wouldn't make sense, so it always
renders as-is.

```vue
<template #breadcrumb-actions>
  <MyCustomBreadcrumbActions />
</template>
```

Combine `toolbar-items`, `breadcrumb-actions` and `menu-items` to merge menu,
toolbar and breadcrumb-action functionality into a single custom bar (set
`showToolbar: false` and, if you don't need the path trail at all,
`showBreadcrumbBar: false`) - see the "MenuBar Customization" example.

For usage examples and common patterns, see [Guide - Slots](../guide/slots.md).
