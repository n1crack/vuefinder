---
outline: deep
---

# Large Dataset Performance

Example demonstrating VueFinder's performance with large directory structures containing 50,000 folders.

## Live Demo

<ClientOnly>
  <LargeDatasetDemo />
</ClientOnly>

## Code Example

Here's an example with 50,000 folders:

```vue
<template>
  <vue-finder
    id="large-dataset-example"
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

// Generate 50,000 folders
const files = ref(
  Array.from({ length: 50000 }, (_, i) => ({
    dir: '',
    basename: `folder-${String(i + 1).padStart(5, '0')}`,
    extension: '',
    path: `memory://folder-${String(i + 1).padStart(5, '0')}`,
    storage: 'memory',
    type: 'dir',
    file_size: null,
    last_modified: Date.now(),
    mime_type: null,
    visibility: 'public',
  }))
);

const driver = new ArrayDriver({
  files: files,
  storage: 'memory',
});
</script>
```

## Performance Features

VueFinder handles large directories efficiently with automatic pagination:

- **Initial Load**: Only the first 50 folders are rendered, ensuring fast initial page load
- **Load More**: Click "Load X more folders" to load additional folders in batches of 50
- **Progressive Loading**: Users can load more folders as needed, preventing performance issues
- **Tree View**: The same pagination applies to tree view components for consistent performance

This approach ensures VueFinder remains performant even with extremely large directory structures containing thousands of folders.

## Use Cases

This performance optimization is particularly useful for:

- **Cloud storage integrations** with millions of files
- **Enterprise file systems** with complex directory structures
- **Media libraries** with large collections
- **Backup systems** with extensive file hierarchies

See [Memory Driver](./memory-driver.md) for more information about ArrayDriver.

