---
outline: deep
---

# Events

Complete reference of all VueFinder events.

## Events Table

| Event             | Payload      | Description                           |
| ----------------- | ------------ | ------------------------------------- |
| `select`          | `DirEntry[]` | Emitted when selection changes        |
| `path-change`     | `string`     | Emitted when path changes             |
| `upload-complete` | `DirEntry[]` | Emitted when upload completes         |
| `delete-complete` | `DirEntry[]` | Emitted when deletion completes       |
| `notify`          | `NotifyPayload` | Emitted when VueFinder creates a notification |
| `error`           | `string`     | Emitted when an operation fails (error message) |
| `ready`           | -            | Emitted when component is ready       |
| `file-dclick`     | `ItemDclickEvent` | Emitted when file is double-clicked   |
| `folder-dclick`   | `ItemDclickEvent` | Emitted when folder is double-clicked |

## Event Details

### `select`

Emitted when the user selects or deselects items.

**Payload:** `DirEntry[]` - Array of currently selected items

```vue
<vue-finder @select="handleSelect" />

<script setup>
const handleSelect = (items) => {
  console.log('Selected:', items);
};
</script>
```

### `path-change`

Emitted when the user navigates to a different directory.

**Payload:** `string` - New path

```vue
<vue-finder @path-change="handlePathChange" />

<script setup>
const handlePathChange = (path) => {
  console.log('New path:', path);
};
</script>
```

### `upload-complete`

Emitted when file uploads complete successfully.

**Payload:** `DirEntry[]` - Array of uploaded files

```vue
<vue-finder @upload-complete="handleUploadComplete" />

<script setup>
const handleUploadComplete = (files) => {
  console.log('Uploaded:', files);
};
</script>
```

### `delete-complete`

Emitted when files or folders are deleted successfully.

**Payload:** `DirEntry[]` - Array of deleted items

```vue
<vue-finder @delete-complete="handleDeleteComplete" />

<script setup>
const handleDeleteComplete = (deletedItems) => {
  console.log('Deleted:', deletedItems);
};
</script>
```

### `error`

Emitted when an operation fails. This fires alongside `notify` for every error-type notification, so you can react to failures without filtering `notify` payloads yourself.

**Payload:** `string` - Error message

```vue
<vue-finder @error="handleError" />

<script setup>
const handleError = (message) => {
  console.error('Error:', message);
};
</script>
```

### `notify`

Emitted whenever VueFinder calls its internal notifier.

**Payload:** `NotifyPayload`

- `type: 'success' | 'error' | 'info' | 'warning'`
- `message: string`

```vue
<vue-finder @notify="handleNotify" />

<script setup>
const handleNotify = ({ type, message }) => {
  console.log(`[${type}]`, message);
};
</script>
```

### `ready`

Emitted when VueFinder is initialized and ready to use.

**Payload:** None

```vue
<vue-finder @ready="handleReady" />

<script setup>
const handleReady = () => {
  console.log('VueFinder is ready!');
};
</script>
```

### `file-dclick`

Emitted when a file is double-clicked.

**Payload:** `ItemDclickEvent` - Cancelable event object containing the file that was double-clicked

**Event Object:**
- `item: DirEntry` - The file that was double-clicked
- `defaultPrevented: boolean` - Whether the default behavior was prevented
- `preventDefault(): void` - Method to prevent the default behavior

::: tip Cancelable Events

When you provide a `@file-dclick` handler, you can control whether the default preview behavior executes. Call `event.preventDefault()` to prevent the default behavior, or omit it to allow the default behavior to continue.

:::

```vue
<vue-finder @file-dclick="handleFileDclick" />

<script setup>
const handleFileDclick = (event) => {
  // Access the file
  const file = event.item;
  
  // Custom file action
  console.log('File clicked:', file.basename);
  
  // Prevent default preview behavior
  event.preventDefault();
  
  // Or allow default behavior by not calling preventDefault()
};
</script>
```

### `folder-dclick`

Emitted when a folder is double-clicked.

**Payload:** `ItemDclickEvent` - Cancelable event object containing the folder that was double-clicked

**Event Object:**
- `item: DirEntry` - The folder that was double-clicked
- `defaultPrevented: boolean` - Whether the default behavior was prevented
- `preventDefault(): void` - Method to prevent the default behavior

::: tip Cancelable Events

When you provide a `@folder-dclick` handler, you can control whether the default navigation behavior executes. Call `event.preventDefault()` to prevent the default behavior, or omit it to allow the default behavior to continue.

:::

```vue
<vue-finder @folder-dclick="handleFolderDclick" />

<script setup>
const handleFolderDclick = (event) => {
  // Access the folder
  const folder = event.item;
  
  // Custom folder action
  console.log('Folder clicked:', folder.basename);
  
  // Prevent default navigation behavior
  event.preventDefault();
  
  // Or allow default behavior by not calling preventDefault()
};
</script>
```

For usage examples, see [Guide - Events](../guide/events.md).
