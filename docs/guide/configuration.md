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
    theme: 'valorite',
    persist: true,
  }"
/>
```

## Configuration Properties

| Property                    | Type                                                                                                    | Default           | Description                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `view`                      | `'grid' \| 'list'`                                                                                      | `'grid'`          | View mode: grid or list                                                     |
| `theme`                     | `Theme`                                                                                                 | `'silver'`        | Theme name (see [Theming](./theming.md))                                   |
| `fullScreen`                | `boolean`                                                                                               | `false`           | Start in full-screen mode                                                   |
| `showTreeView`              | `boolean`                                                                                               | `false`           | Show sidebar tree view                                                      |
| `expandTreeByDefault`       | `boolean`                                                                                               | `false`           | Expand storage root and first-level tree folders by default                 |
| `expandedTreePaths`         | `string[]`                                                                                              | `[]`              | Paths that should be expanded in tree view (for targeted default expansion) |
| `showHiddenFiles`           | `boolean`                                                                                               | `true`            | Show hidden files                                                           |
| `metricUnits`               | `boolean`                                                                                               | `false`           | Use metric file sizes (KB, MB) instead of binary (KiB, MiB)                |
| `showThumbnails`            | `boolean`                                                                                               | `true`            | Show image thumbnails                                                       |
| `persist`                   | `boolean`                                                                                               | `false`           | Persist current path/config to localStorage                                 |
| `showMenuBar`               | `boolean`                                                                                               | `true`            | Show menu bar (non-persistent, resets on page reload)                      |
| `showToolbar`               | `boolean`                                                                                               | `true`            | Show toolbar (non-persistent, resets on page reload)                       |
| `initialPath`               | `string \| null`                                                                                        | `null`            | Initial path on mount                                                       |
| `loadingIndicator`          | `'linear' \| 'circular' \| string`                                                                      | `'circular'`      | Loading indicator style                                                     |
| `maxFileSize`               | `number \| string \| null`                                                                              | `null`            | Maximum file upload size (e.g., `'10mb'`, `'50mb'`)                        |
| `pinnedFolders`             | `DirEntry[]`                                                                                            | `[]`              | Array of pinned folders                                                     |
| `notificationsEnabled`      | `boolean`                                                                                               | `true`            | Enable/disable toast notifications (non-persistent, prop always applies)   |
| `notificationPosition`      | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'`     | `'bottom-center'` | Toast position                                                              |
| `notificationDuration`      | `number`                                                                                                | `3000`            | Toast duration in milliseconds                                              |
| `notificationVisibleToasts` | `number`                                                                                                | `4`               | Max visible toasts at once                                                  |
| `notificationRichColors`    | `boolean`                                                                                               | `true`            | Enable rich toast colors                                                    |
| `gridItemWidth`             | `number`                                                                                                | `96`              | Width of grid items in pixels                                               |
| `gridItemHeight`            | `number`                                                                                                | `80`              | Height of grid items in pixels                                              |
| `gridItemGap`               | `number`                                                                                                | `8`               | Gap between grid items in pixels                                            |
| `gridIconSize`              | `number`                                                                                                | `48`              | Size of icons in grid view (pixels)                                        |
| `listItemHeight`            | `number`                                                                                                | `32`              | Height of list items in pixels                                              |
| `listItemGap`               | `number`                                                                                                | `2`               | Gap between list items in pixels                                            |
| `listIconSize`              | `number`                                                                                                | `16`              | Size of icons in list view (pixels)                                        |

## Examples

### Basic Configuration

```vue
<template>
  <vue-finder
    id="basic"
    :driver="driver"
    :config="{
      view: 'grid',
      theme: 'silver',
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
      theme: 'valorite',
      fullScreen: false,
      showTreeView: true,
      showHiddenFiles: false,
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

When `persist: true`, VueFinder saves the current path and user-toggled settings (`view`, `theme`, `showHiddenFiles`, …) to localStorage so they survive a page reload:

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

#### How `:config` interacts with persisted values

The `:config` prop is treated as **initial defaults**, not an override. When `persist: true` and a value already exists in localStorage, the persisted value wins on reload — otherwise the user toggling view/theme/etc. would silently get reset every time the page loaded.

In practice:

- First load (no persisted value yet) — `:config` values are used.
- Subsequent loads — persisted values take precedence; `:config` only fills in keys the user hasn't touched.

The persisted values live under the `vuefinder_config_<id>` localStorage key. To force a reset back to the `:config` defaults during development, clear that key (or call `localStorage.removeItem('vuefinder_config_<id>')`) and reload.

### UI Visibility Settings

You can control the visibility of the menu bar and toolbar using the `showMenuBar` and `showToolbar` config options. These are non-persistent options that reset to their default values (`true`) on page reload.

For detailed examples and usage, see the [UI Visibility example](/examples/ui-visibility).

### Notifications + `@notify`

You can keep event notifications while disabling built-in toast UI:

```vue
<vue-finder
  id="notify"
  :driver="driver"
  :config="{
    notificationsEnabled: false,
    notificationDuration: 5000,
    notificationPosition: 'top-right',
  }"
  @notify="({ type, message }) => handleNotify(type, message)"
/>
```

- `notificationsEnabled: false` hides toast popups.
- `@notify` still emits `{ type, message }` for external handling.
- All notification options (`notificationsEnabled`, `notificationPosition`, `notificationDuration`, …) are **non-persistent**, so the `:config` value always takes effect — even with `persist: true`, they are never read back from localStorage.

### Tree Expansion

Use these options together for default tree expansion behavior:

```vue
<vue-finder
  id="tree"
  :driver="driver"
  :config="{
    showTreeView: true,
    expandTreeByDefault: false,
    expandedTreePaths: ['local://documents', 'local://documents/work'],
  }"
/>
```

- `expandTreeByDefault: true` expands storage roots and first level.
- `expandedTreePaths` expands specific branches (and required parent nodes) by path.
