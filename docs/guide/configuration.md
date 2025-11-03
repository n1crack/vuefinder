---
outline: deep
---

# Configuration

VueFinder provides a comprehensive configuration system that allows you to customize its behavior and appearance.

## Config Options

All configuration options are passed via the `config` prop:

```vue
<vue-finder
  id="my_vuefinder"
  :driver="driver"
  :config="{
    view: 'grid',
    theme: 'dark',
    persist: true,
  }"
/>
```

## Configuration Properties

| Property           | Type                               | Default      | Description                                                 |
| ------------------ | ---------------------------------- | ------------ | ----------------------------------------------------------- |
| `view`             | `'grid' \| 'list'`                 | `'grid'`     | View mode: grid or list                                     |
| `theme`            | `Theme`                            | `'light'`    | Theme name (see [Theming](./theming.md))                    |
| `fullScreen`       | `boolean`                          | `false`      | Start in full-screen mode                                   |
| `showTreeView`     | `boolean`                          | `false`      | Show sidebar tree view                                      |
| `showHiddenFiles`  | `boolean`                          | `true`       | Show hidden files                                           |
| `compactListView`  | `boolean`                          | `true`       | Use compact list view style                                 |
| `metricUnits`      | `boolean`                          | `false`      | Use metric file sizes (KB, MB) instead of binary (KiB, MiB) |
| `showThumbnails`   | `boolean`                          | `true`       | Show image thumbnails                                       |
| `persist`          | `boolean`                          | `false`      | Persist current path to localStorage                        |
| `initialPath`      | `string \| null`                   | `null`       | Initial path on mount                                       |
| `loadingIndicator` | `'linear' \| 'circular' \| string` | `'circular'` | Loading indicator style                                     |
| `maxFileSize`      | `number \| string \| null`         | `null`       | Maximum file upload size (e.g., `'10mb'`, `'50mb'`)         |
| `pinnedFolders`    | `DirEntry[]`                       | `[]`         | Array of pinned folders                                     |

## Examples

### Basic Configuration

```vue
<template>
  <vue-finder
    id="basic"
    :driver="driver"
    :config="{
      view: 'grid',
      theme: 'light',
      persist: false,
    }"
  />
</template>
```

### Advanced Configuration

```vue
<template>
  <vue-finder
    id="advanced"
    :driver="driver"
    :config="{
      view: 'list',
      theme: 'dark',
      fullScreen: false,
      showTreeView: true,
      showHiddenFiles: false,
      compactListView: true,
      metricUnits: true,
      showThumbnails: true,
      persist: true,
      initialPath: 'local://documents',
      loadingIndicator: 'linear',
      maxFileSize: '50mb',
      pinnedFolders: [],
    }"
  />
</template>
```

### With Persistence

When `persist: true`, VueFinder will save the current path to localStorage, allowing it to remember the last visited directory when the page is reloaded:

```vue
<template>
  <vue-finder
    id="persistent"
    :driver="driver"
    :config="{
      persist: true,
      initialPath: 'local://',
    }"
  />
</template>
```
