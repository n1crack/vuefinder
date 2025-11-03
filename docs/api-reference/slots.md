---
outline: deep
---

# Slots

Complete reference of all VueFinder slots.

## Available Slots

| Slot         | Scoped Props                | Description                  |
| ------------ | --------------------------- | ---------------------------- |
| `status-bar` | `{ selected, count, path }` | Customize status bar content |
| `icon`       | `{ item }`                  | Customize file/folder icons  |

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

For usage examples and common patterns, see [Guide - Slots](../guide/slots.md).
