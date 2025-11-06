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
const customMenuItems = [
  {
    label: 'Custom Action',
    icon: '✨',
    action: (items) => {
      console.log('Custom action on:', items);
    },
  },
  {
    label: 'Share',
    icon: '🔗',
    action: (items) => {
      // Share logic here
      alert(`Sharing ${items.length} item(s)`);
    },
  },
];
</script>
```

## Explanation

The `contextMenuItems` prop allows you to add custom items to the right-click context menu:

- **`label`**: Display text for the menu item
- **`icon`**: Icon (emoji, Unicode, or component) to display
- **`action`**: Function called when the item is clicked, receives selected items as parameter

Custom menu items appear alongside VueFinder's built-in context menu items.

See [API Reference - Props](../api-reference/props.md) for `contextMenuItems` prop details.
