---
outline: deep
---

# Composable API

Use `useVueFinder(id)` when you want to control a mounted VueFinder instance programmatically.

## Quick Start

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useVueFinder } from 'vuefinder';

const finder = ref<ReturnType<typeof useVueFinder> | null>(null);

onMounted(() => {
  finder.value = useVueFinder('my-local-finder');
});

const refresh = async () => {
  await finder.value?.refresh();
};

const createFolder = async () => {
  await finder.value?.createFolder('New Folder API');
};

const previewFile = () => {
  finder.value?.preview('local://docs/readme.txt');
};

const testNotify = () => {
  finder.value?.notify('success', 'Composable notify test');
};
</script>

<template>
  <vue-finder id="my-local-finder" :driver="driver" />
  <button @click="refresh">Refresh</button>
  <button @click="createFolder">Create Folder</button>
  <button @click="previewFile">Preview File</button>
  <button @click="testNotify">Test Notify</button>
</template>
```

## All Methods

`useVueFinder(id)` returns a `VueFinderComposable` with the following methods:

### Navigation & state

| Method | Signature | Description |
| --- | --- | --- |
| `refresh` | `() => Promise<void>` | Reload the current directory |
| `open` | `(path: string) => Promise<void>` | Navigate to a path |
| `getPath` | `() => string` | Current directory path (one-off snapshot) |
| `path` | `Readonly<Ref<string>>` | Reactive current directory path — `watch()` it or bind it directly, no `@path-change` wiring needed |
| `getFiles` | `() => DirEntry[]` | Entries in the current directory |
| `getStorages` | `() => string[]` | Available storage names |
| `isLoading` | `() => boolean` | Whether a request is in flight |
| `isReadOnly` | `() => boolean` | Whether the current directory is read-only |

### Selection

| Method | Signature | Description |
| --- | --- | --- |
| `select` | `(paths: string[]) => void` | Select the given paths |
| `selectOne` | `(path: string) => void` | Select a single path |
| `clearSelection` | `() => void` | Clear the selection |
| `getSelectedPaths` | `() => string[]` | Paths of the selected items |

### File operations

| Method | Signature | Description |
| --- | --- | --- |
| `createFolder` | `(name: string, path?: string) => Promise<void>` | Create a folder (in `path` or the current directory) |
| `createFile` | `(name: string, path?: string) => Promise<void>` | Create an empty file |
| `delete` | `(paths: string[], path?: string) => Promise<void>` | Delete items |
| `rename` | `(itemPath: string, newName: string, path?: string) => Promise<void>` | Rename an item |
| `copy` | `(sources: string[], destination: string, path?: string) => Promise<void>` | Copy items to a destination folder |
| `move` | `(sources: string[], destination: string, path?: string) => Promise<void>` | Move items to a destination folder |

### UI

| Method | Signature | Description |
| --- | --- | --- |
| `preview` | `(path: string) => void` | Open the preview modal for a file |
| `notify` | `(type, message) => void` | Show a notification (`type`: `'success' \| 'error' \| 'info' \| 'warning'`) |

See [API Reference – Types](../api-reference/types.md#vuefindercomposable) for the full interface definition.

## Notes

- The target instance **must be mounted**. If not, `useVueFinder(id)` throws a descriptive error.
- `select(paths)` only selects files currently loaded in the active directory.
- Core operations (`createFolder`, `rename`, `move`, etc.) delegate to the configured driver.
