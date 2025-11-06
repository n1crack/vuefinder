---
outline: deep
---

# Custom Icons

Learn how to customize file and folder icons using the `icon` slot.

## Live Demo

<ClientOnly>
  <CustomIconsDemo />
</ClientOnly>

## Code Example

Use the `icon` slot to customize the icons displayed for files and folders:

```vue
<template>
  <vue-finder id="custom-icons" :driver="driver">
    <template #icon="{ item }">
      <CustomIcon :item="item" />
    </template>
  </vue-finder>
</template>

<script setup>
import CustomIcon from './CustomIcon.vue';
</script>
```

### Conditional Icons Based on File Extension

```vue
<template>
  <vue-finder id="conditional-icons" :driver="driver">
    <template #icon="{ item }">
      <TextIcon v-if="item.extension === 'txt'" />
      <PDFIcon v-else-if="item.extension === 'pdf'" />
    </template>
  </vue-finder>
</template>

<script setup>
import TextIcon from './TextIcon.vue';
import PDFIcon from './PDFIcon.vue';
</script>
```

## Explanation

The `icon` slot provides full control over file and folder icons:

- **Scoped prop**: `{ item }` - The file or folder entry
- **Conditional rendering**: Use `v-if` to show different icons based on file type, extension, or other properties
- **Default fallback**: If no condition matches, the default icon is shown automatically

You can use emoji, SVG components, or image URLs in the icon slot.

See [Guide - Slots](../guide/slots.md) for more information about slots.
