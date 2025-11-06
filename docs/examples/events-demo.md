---
outline: deep
---

# Events Demo

Example demonstrating all VueFinder events.

## Live Demo

<ClientOnly>
  <EventsDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <vue-finder
    id="events-demo"
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

  <div class="events-log">
    <h3>Event Log</h3>
    <div v-for="(event, index) in events" :key="index" class="event-item">
      <strong>{{ event.type }}</strong
      >: {{ event.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const events = ref([]);

const addEvent = (type, message) => {
  events.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
};

const handleSelect = (items) => {
  addEvent('select', `${items.length} item(s) selected`);
};

const handlePathChange = (path) => {
  addEvent('path-change', `Path: ${path}`);
};

const handleUploadComplete = (files) => {
  addEvent('upload-complete', `${files.length} file(s) uploaded`);
};

const handleDeleteComplete = (items) => {
  addEvent('delete-complete', `${items.length} item(s) deleted`);
};

const handleError = (error) => {
  addEvent('error', error.message || String(error));
};

const handleReady = () => {
  addEvent('ready', 'VueFinder is ready');
};

const handleFileDclick = (file) => {
  addEvent('file-dclick', `File: ${file.name}`);
};

const handleFolderDclick = (folder) => {
  addEvent('folder-dclick', `Folder: ${folder.name}`);
};
</script>
```

## Explanation

VueFinder emits various events that you can listen to:

- **`@select`**: Selection changes
- **`@path-change`**: Navigation to different directory
- **`@upload-complete`**: File uploads completed
- **`@delete-complete`**: Items deleted
- **`@error`**: Errors occurred
- **`@ready`**: Component initialized
- **`@file-dclick`**: File double-clicked (overrides default preview)
- **`@folder-dclick`**: Folder double-clicked (overrides default navigation)

See [Guide - Events](../guide/events.md) for complete event documentation.
