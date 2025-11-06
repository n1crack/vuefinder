---
outline: deep
---

# Single Selection

Example showing how to use single selection mode.

## Live Demo

<ClientOnly>
  <SingleSelectionDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <vue-finder
    id="single-selection"
    :driver="driver"
    selection-mode="single"
    @select="handleSelection"
  />
</template>

<script setup>
const handleSelection = (items) => {
  if (items.length > 0) {
    console.log('Selected item:', items[0]);
  }
};
</script>
```

## Explanation

In single selection mode, only one item can be selected at a time. Selecting a new item automatically deselects the previous one.

See [Guide - Selection Modes](../guide/selection-modes.md) for more information.
