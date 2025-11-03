---
outline: deep
---

# Basic Usage

A minimal example showing how to set up VueFinder with a RemoteDriver.

## Code Example

```vue
<template>
  <vue-finder
    id="basic_example"
    :driver="driver"
    :config="{
      initialPath: 'local://',
      persist: true,
    }"
  />
</template>

<script setup>
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
    upload: '/upload',
    delete: '/delete',
    rename: '/rename',
    copy: '/copy',
    move: '/move',
    archive: '/archive',
    unarchive: '/unarchive',
    createFile: '/create-file',
    createFolder: '/create-folder',
    preview: '/preview',
    download: '/download',
    search: '/search',
    save: '/save',
  },
});
</script>
```

## Explanation

This is the simplest setup for VueFinder. It provides:

- Basic file listing and navigation
- Upload, delete, rename operations
- All default features enabled
- Persistence of user preferences

**Key Points:**

1. **RemoteDriver** can be instantiated without URL parameters if your backend follows the standard VueFinder API structure. The driver will automatically use default endpoint paths.

2. **Config prop** consolidates all configuration options including `initialPath` and `persist`.

3. **Default features** are enabled automatically, providing full functionality out of the box.

For more detailed driver configuration, see [Drivers & Adapters](../guide/drivers-adapters.md).
