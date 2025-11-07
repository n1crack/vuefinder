---
outline: deep
---

# IndexedDB Driver

Example showing how to use IndexedDBDriver for browser-based persistent storage.

## Live Demo

<ClientOnly>
  <IndexedDBDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <vue-finder
    id="indexeddb-driver"
    :driver="driver"
    :config="{
      initialPath: 'indexeddb://',
      persist: true,
    }"
  />
</template>

<script setup>
import { IndexedDBDriver } from 'vuefinder';

const driver = new IndexedDBDriver({
  dbName: 'vuefinder', // Optional: defaults to 'vuefinder'
  storage: 'indexeddb', // Optional: defaults to 'indexeddb'
  readOnly: false, // Optional: defaults to false
  version: 1, // Optional: defaults to 1
});
</script>
```

## Explanation

IndexedDBDriver is useful for:

- **Persistent storage**: Files persist across browser sessions and page reloads
- **Offline-first applications**: Client-side file storage without a backend
- **Browser-based file management**: Full CRUD operations using IndexedDB

The driver automatically initializes the IndexedDB database and creates the necessary object stores. Files and folders you create will persist in the browser's IndexedDB storage, making it ideal for applications that need client-side file management without requiring a server.

**Key Features:**

- **Automatic initialization**: Database and object stores are created automatically
- **Full CRUD operations**: Create, read, update, and delete files and folders
- **Persistent across sessions**: Data survives page reloads and browser restarts
- **No backend required**: Everything runs client-side in the browser

**Configuration Options:**

- `dbName`: Name of the IndexedDB database (default: `'vuefinder'`)
- `storage`: Storage identifier used in paths (default: `'indexeddb'`)
- `readOnly`: Whether the driver should allow write operations (default: `false`)
- `version`: Database version number for schema migrations (default: `1`)

See [Guide - Drivers & Adapters](../guide/drivers-adapters.md) for complete driver documentation.

