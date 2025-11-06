---
outline: deep
---

# External Selection

Example showing how to handle selection externally using the `@select` event.

## Live Demo

<ClientOnly>
  <ExternalSelectDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <div>
    <vue-finder id="external-selection" :driver="driver" @select="handleSelection" />

    <div v-if="selectedItems.length" class="selection-panel">
      <h3>Selected Items ({{ selectedItems.length }})</h3>
      <ul>
        <li v-for="item in selectedItems" :key="item.path">
          {{ item.name }}
        </li>
      </ul>
      <button @click="processSelection">Process Selection</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);

const handleSelection = (items) => {
  selectedItems.value = items;
};

const processSelection = () => {
  console.log('Processing:', selectedItems.value);
  // Your custom logic here
};
</script>
```

## Explanation

The `@select` event allows you to handle selection outside of VueFinder. You can:

- Display selected items in your own UI
- Process selections with custom logic
- Build custom selection workflows
- Integrate with other components

See [Guide - Events](../guide/events.md) for more information about the select event.
