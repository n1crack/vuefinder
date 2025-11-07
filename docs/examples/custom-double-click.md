---
outline: deep
---

# Custom Double-Click

Example showing how to override default double-click behavior.

## Live Demo

<ClientOnly>
  <CustomDclickDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <vue-finder
    id="custom-dclick"
    :driver="driver"
    @file-dclick="handleFileDclick"
    @folder-dclick="handleFolderDclick"
  />
</template>

<script setup>
const handleFileDclick = (event) => {
  // Custom behavior for file double-click
  const file = event.item;
  console.log('File double-clicked:', file);
  
  // Prevent default preview behavior
  event.preventDefault();
  
  // Example: Download instead of preview
  // window.open(file.downloadUrl, '_blank');
};

const handleFolderDclick = (event) => {
  // Custom behavior for folder double-click
  const folder = event.item;
  console.log('Folder double-clicked:', folder);
  
  // Prevent default navigation behavior
  event.preventDefault();
  
  // Example: Show folder info instead of navigating
  alert(`Folder: ${folder.basename}`);
};
</script>
```

## Explanation

When you provide `@file-dclick` or `@folder-dclick` handlers, they override the default behavior:

- **File double-click**: Default opens preview, custom handler can download, open externally, etc.
- **Folder double-click**: Default navigates into folder, custom handler can show info, add to favorites, etc.

See [Guide - Events](../guide/events.md) for more information about events.
