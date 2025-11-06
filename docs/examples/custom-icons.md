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
      <FolderIcon v-if="item.type === 'dir'" class="custom-icon" />
      <TextIcon v-else-if="item.extension === 'txt'" class="custom-icon" />
      <PDFIcon v-else-if="item.extension === 'pdf'" class="custom-icon" />
      <ImageIcon v-else-if="['jpg', 'png', 'gif', 'webp'].includes(item.extension)" class="custom-icon" />
    </template>
  </vue-finder>
</template>

<script setup>
import FolderIcon from './icons/folder.svg';
import TextIcon from './icons/text_file.svg';
import PDFIcon from './icons/pdf_file.svg';
import ImageIcon from './icons/image_file.svg';
</script>

<style scoped>
.custom-icon {
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  vertical-align: middle;
}
</style>
```

## Explanation

The `icon` slot provides full control over file and folder icons:

- **Scoped prop**: `{ item }` - The file or folder entry
- **Conditional rendering**: Use `v-if` to show different icons based on file type, extension, or other properties
- **Default fallback**: If no condition matches, the default icon is shown automatically

You can use emoji, SVG components, or image URLs in the icon slot.

See [Guide - Slots](../guide/slots.md) for more information about slots.
