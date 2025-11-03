---
outline: deep
---

# Array Driver

Example showing how to use ArrayDriver for in-memory file operations.

## Code Example

```vue
<template>
  <vue-finder
    id="memory-driver"
    :driver="driver"
    :config="{
      initialPath: 'memory://',
      persist: false,
    }"
  />
</template>

<script setup>
import { ArrayDriver } from 'vuefinder';
import { ref } from 'vue';

// Initialize with some files
const files = ref([
  {
    dir: '',
    basename: 'example.txt',
    extension: 'txt',
    path: 'memory://example.txt',
    storage: 'memory',
    type: 'file',
    file_size: 1024,
    last_modified: Date.now(),
    mime_type: 'text/plain',
    visibility: 'public',
  },
  {
    dir: '',
    basename: 'documents',
    extension: '',
    path: 'memory://documents',
    storage: 'memory',
    type: 'dir',
    file_size: null,
    last_modified: Date.now(),
    mime_type: null,
    visibility: 'public',
  },
]);

const driver = new ArrayDriver({
  files: files,
  storage: 'memory',
});
</script>
```

## Explanation

ArrayDriver is useful for:

- **Demos and testing**: No backend required
- **Client-only applications**: In-memory file management
- **Offline functionality**: Work with files without server

The driver manages files in memory. Changes persist only during the session and are lost on page reload unless you implement your own persistence layer.

See [Guide - Drivers & Adapters](../guide/drivers-adapters.md) for complete driver documentation.
