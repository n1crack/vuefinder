---
outline: deep
---

# Events

VueFinder emits various events that you can listen to for handling user interactions and file operations.

## Available Events

### `@select`

Emitted when the selection changes:

```vue
<template>
  <vue-finder id="events" :driver="driver" @select="handleSelect" />
</template>

<script setup>
const handleSelect = (items) => {
  console.log('Selected items:', items);
};
</script>
```

**Payload:** `DirEntry[]` - Array of selected items

### `@path-change`

Emitted when the user navigates to a different path:

```vue
<template>
  <vue-finder id="path-events" :driver="driver" @path-change="handlePathChange" />
</template>

<script setup>
const handlePathChange = (path) => {
  console.log('Current path:', path);
};
</script>
```

**Payload:** `string` - New path

### `@upload-complete`

Emitted when file uploads complete successfully:

```vue
<template>
  <vue-finder id="upload-events" :driver="driver" @upload-complete="handleUploadComplete" />
</template>

<script setup>
const handleUploadComplete = (files) => {
  console.log('Uploaded files:', files);
};
</script>
```

**Payload:** `DirEntry[]` - Array of uploaded files

### `@delete-complete`

Emitted when files or folders are deleted successfully:

```vue
<template>
  <vue-finder id="delete-events" :driver="driver" @delete-complete="handleDeleteComplete" />
</template>

<script setup>
const handleDeleteComplete = (deletedItems) => {
  console.log('Deleted items:', deletedItems);
};
</script>
```

**Payload:** `DirEntry[]` - Array of deleted items

### `@error`

Emitted when an error occurs during any operation:

```vue
<template>
  <vue-finder id="error-events" :driver="driver" @error="handleError" />
</template>

<script setup>
const handleError = (error) => {
  console.error('VueFinder error:', error);
};
</script>
```

**Payload:** `any` - Error object

### `@ready`

Emitted when VueFinder is initialized and ready:

```vue
<template>
  <vue-finder id="ready-events" :driver="driver" @ready="handleReady" />
</template>

<script setup>
const handleReady = () => {
  console.log('VueFinder is ready!');
};
</script>
```

**Payload:** None

### `@file-dclick`

Emitted when a file is double-clicked:

```vue
<template>
  <vue-finder id="file-dclick" :driver="driver" @file-dclick="handleFileDclick" />
</template>

<script setup>
const handleFileDclick = (event) => {
  const file = event.item;
  console.log('File double-clicked:', file);
  
  // Custom behavior
  // ...
  
  // Prevent default preview behavior
  event.preventDefault();
  
  // Or allow default behavior by not calling preventDefault()
};
</script>
```

**Payload:** `ItemDclickEvent` - Cancelable event object containing:
- `item: DirEntry` - The file that was double-clicked
- `defaultPrevented: boolean` - Whether the default behavior was prevented
- `preventDefault(): void` - Method to prevent the default behavior

::: tip Cancelable Events

When you provide a `@file-dclick` handler, you can control whether the default preview behavior executes:

- **Call `event.preventDefault()`** to prevent the default behavior and implement your own logic
- **Don't call `event.preventDefault()`** to allow the default preview behavior to continue after your custom logic

This allows you to add custom behavior while still allowing the default preview to work if needed.

:::

### `@folder-dclick`

Emitted when a folder is double-clicked:

```vue
<template>
  <vue-finder id="folder-dclick" :driver="driver" @folder-dclick="handleFolderDclick" />
</template>

<script setup>
const handleFolderDclick = (event) => {
  const folder = event.item;
  console.log('Folder double-clicked:', folder);
  
  // Custom behavior
  // ...
  
  // Prevent default navigation behavior
  event.preventDefault();
  
  // Or allow default behavior by not calling preventDefault()
};
</script>
```

**Payload:** `ItemDclickEvent` - Cancelable event object containing:
- `item: DirEntry` - The folder that was double-clicked
- `defaultPrevented: boolean` - Whether the default behavior was prevented
- `preventDefault(): void` - Method to prevent the default behavior

::: tip Cancelable Events

When you provide a `@folder-dclick` handler, you can control whether the default navigation behavior executes:

- **Call `event.preventDefault()`** to prevent the default behavior and implement your own logic
- **Don't call `event.preventDefault()`** to allow the default navigation behavior to continue after your custom logic

This allows you to add custom behavior while still allowing the default navigation to work if needed.

:::

## Complete Example

```vue
<template>
  <vue-finder
    id="all-events"
    :driver="driver"
    @select="handleSelect"
    @path-change="handlePathChange"
    @upload-complete="handleUploadComplete"
    @delete-complete="handleDeleteComplete"
    @error="handleError"
    @ready="handleReady"
    @file-dclick="handleFileDclick"
    @folder-dclick="handleFolderDclick"
  />
</template>

<script setup>
const handleSelect = (items) => {
  console.log('Selection:', items);
};

const handlePathChange = (path) => {
  console.log('Path:', path);
};

const handleUploadComplete = (files) => {
  console.log('Uploaded:', files);
};

const handleDeleteComplete = (items) => {
  console.log('Deleted:', items);
};

const handleError = (error) => {
  console.error('Error:', error);
};

const handleReady = () => {
  console.log('Ready!');
};

const handleFileDclick = (event) => {
  console.log('File:', event.item);
  // Prevent default preview behavior
  event.preventDefault();
};

const handleFolderDclick = (event) => {
  console.log('Folder:', event.item);
  // Allow default navigation behavior by not calling preventDefault()
};
</script>
```

For complete event reference, see [API Reference - Events](../api-reference/events.md).
