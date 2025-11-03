---
outline: deep
---

# Features

VueFinder provides a flexible features system that allows you to enable or disable specific functionality. You can use presets for quick setup or configure features individually.

## Feature Presets

VueFinder comes with two built-in presets:

### Simple Preset

Basic features only, suitable for simple file browsing:

```vue
<vue-finder :features="'simple'" />
```

Includes:

- `search` - File search
- `preview` - File preview
- `rename` - Rename items
- `upload` - File upload
- `delete` - Delete items
- `newfile` - Create new files
- `newfolder` - Create new folders
- `download` - Download files

### Advanced Preset

All features enabled (default):

```vue
<vue-finder :features="'advanced'" />
```

## All Available Features

| Feature      | Description               |
| ------------ | ------------------------- |
| `edit`       | Text file editing         |
| `newfile`    | Create new files          |
| `newfolder`  | Create new folders        |
| `preview`    | File preview modal        |
| `archive`    | Create zip archives       |
| `unarchive`  | Extract zip archives      |
| `search`     | File search functionality |
| `rename`     | Rename files and folders  |
| `upload`     | File upload               |
| `delete`     | Delete files and folders  |
| `fullscreen` | Full screen toggle        |
| `download`   | Download files            |
| `language`   | Language switcher         |
| `move`       | Move files/folders        |
| `copy`       | Copy files/folders        |
| `history`    | Navigation history        |
| `theme`      | Theme switcher            |
| `pinned`     | Pin folders feature       |

## Custom Configuration

You can configure features individually by passing an object:

```vue
<template>
  <vue-finder
    id="custom"
    :driver="driver"
    :features="{
      search: true,
      upload: true,
      delete: true,
      preview: false,
      archive: false,
      edit: true,
    }"
  />
</template>
```

## Examples

### Minimal Setup

```vue
<template>
  <vue-finder id="minimal" :driver="driver" :features="'simple'" />
</template>
```

### Full Featured

```vue
<template>
  <vue-finder id="full" :driver="driver" :features="'advanced'" />
</template>
```

### Custom Selection

```vue
<template>
  <vue-finder id="custom" :driver="driver" :features="customFeatures" />
</template>

<script setup>
import { ref } from 'vue';

const customFeatures = ref({
  search: true,
  upload: true,
  delete: true,
  rename: true,
  preview: true,
  // Disable all other features
  edit: false,
  archive: false,
  unarchive: false,
  newfile: false,
  newfolder: false,
  fullscreen: false,
  download: false,
  language: false,
  move: false,
  copy: false,
  history: false,
  theme: false,
  pinned: false,
});
</script>
```
