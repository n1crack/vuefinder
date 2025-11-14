---
outline: deep
---

# Context Menu

Example showing how to customize the context menu with additional items.

## Live Demo

<ClientOnly>
  <ContextMenuDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <vue-finder id="context-menu" :driver="driver" :context-menu-items="customMenuItems" />
</template>

<script setup>
import { contextMenuItems } from 'vuefinder';

const customMenuItems = [
  ...contextMenuItems,
  {
    id: 'custom-action',
    title: () => 'Custom Action',
    action: (app, selectedItems) => {
      console.log('Custom action on:', selectedItems);
    },
    show: () => true,
    order: 15, // Appears between items with order 10 and 20
  },
  {
    id: 'share',
    title: () => 'Share',
    action: (app, selectedItems) => {
      // Share logic here
      alert(`Sharing ${selectedItems.length} item(s)`);
    },
    show: () => true,
    order: 25, // Appears between items with order 20 and 30
  },
];
</script>
```

## Explanation

The `contextMenuItems` prop allows you to add custom items to the right-click context menu:

- **`id`**: Unique identifier for the menu item (required)
- **`title`**: Function that returns the display text, receives i18n object: `(i18n) => string`
- **`action`**: Function called when the item is clicked, receives `(app, selectedItems)` as parameters
- **`show`**: Function that determines if the item should be displayed, receives `(app, ctx)` as parameters, returns `boolean`
- **`link`**: Optional function that returns a URL for link-style menu items (download, etc.)
- **`order`**: Optional number to control the position in the menu. Lower numbers appear first. Items without an `order` value are sorted last. Built-in items use values like 10, 20, 30, etc., so you can use values like 15, 25, 35 to insert items between them.

Custom menu items appear alongside VueFinder's built-in context menu items and are automatically sorted by their `order` value.

See [API Reference - Props](../api-reference/props.md) for `contextMenuItems` prop details.
