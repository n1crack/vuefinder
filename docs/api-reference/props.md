---
outline: deep
---

# Props

Complete reference of all VueFinder component props.

## Props Table

| Prop                          | Type                                                            | Default      | Required | Description                                                   |
| ----------------------------- | --------------------------------------------------------------- | ------------ | -------- | ------------------------------------------------------------- |
| `id`                          | `string`                                                        | -            | **Yes**  | Component instance ID                                         |
| `driver`                      | `Driver`                                                        | -            | **Yes**  | File operations driver instance                               |
| `config`                      | `ConfigDefaults`                                                | `{}`         | No       | Configuration options                                         |
| `features`                    | `FeaturesPreset \| FeaturesConfig`                              | `'advanced'` | No       | Feature configuration                                         |
| `debug`                       | `boolean`                                                       | `false`      | No       | Enable debug mode                                             |
| `locale`                      | `string`                                                        | `'en'`       | No       | Language code                                                 |
| `contextMenuItems`            | `ContextMenuItem[]`                                             | -            | No       | Custom context menu items                                     |
| `selectionMode`               | `'single' \| 'multiple'`                                        | `'multiple'` | No       | Selection mode                                                |
| `selectionFilterType`         | `'files' \| 'dirs' \| 'both'`                                   | `'both'`     | No       | Selection type filter                                         |
| `selectionFilterMimeIncludes` | `string[]`                                                      | `[]`         | No       | MIME type filters for selection                               |
| `onError`                     | `(error: any) => void`                                          | -            | No       | Error handler callback                                        |
| `onSelect`                    | `SelectEvent`                                                   | -            | No       | Selection handler (alternative to `@select`)                  |
| `onPathChange`                | `UpdatePathEvent`                                               | -            | No       | Path change handler (alternative to `@path-change`)           |
| `onUploadComplete`            | `(files: DirEntry[]) => void`                                   | -            | No       | Upload handler (alternative to `@upload-complete`)            |
| `onDeleteComplete`            | `(deletedItems: DirEntry[]) => void`                            | -            | No       | Delete handler (alternative to `@delete-complete`)            |
| `onReady`                     | `() => void`                                                    | -            | No       | Ready handler (alternative to `@ready`)                       |
| `onFileDclick`                | `(item: DirEntry) => void`                                      | -            | No       | File double-click handler (alternative to `@file-dclick`)     |
| `onFolderDclick`              | `(item: DirEntry) => void`                                      | -            | No       | Folder double-click handler (alternative to `@folder-dclick`) |
| `customUploader`              | `(uppy: any, context: { getTargetPath: () => string }) => void` | -            | No       | Custom uploader configuration                                 |

## Detailed Descriptions

### `id`

Component instance ID. Used internally for managing multiple VueFinder instances.

```vue
<vue-finder id="my_finder" :driver="driver" />
```

### `config`

Configuration object. See [Configuration](../guide/configuration.md) for all options.

```vue
<vue-finder
  :config="{
    view: 'grid',
    theme: 'dark',
    persist: true,
  }"
/>
```

### `driver`

**Required.** Driver instance for file operations. See [Drivers & Adapters](../guide/drivers-adapters.md).

```vue
<vue-finder :driver="driver" />
```

### `features`

Feature configuration. Can be a preset string or object.

```vue
<!-- Preset -->
<vue-finder :features="'simple'" />

<!-- Custom -->
<vue-finder :features="{ search: true, upload: true }" />
```

### `selectionMode`

Control selection behavior:

- `'multiple'` - Multiple items can be selected
- `'single'` - Only one item can be selected at a time

### `selectionFilterType`

Filter selectable items by type:

- `'both'` - Files and folders
- `'files'` - Files only
- `'dirs'` - Directories only

### `selectionFilterMimeIncludes`

Array of MIME types or prefixes to allow selection:

```vue
<vue-finder :selection-filter-mime-includes="['image/', 'video/', 'application/pdf']" />
```

### Handler Props vs Events

Handler props (`onSelect`, `onPathChange`, etc.) are alternatives to event listeners. Both work the same:

```vue
<!-- Using event -->
<vue-finder @select="handleSelect" />

<!-- Using prop -->
<vue-finder :on-select="handleSelect" />
```
