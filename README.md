## Vuefinder File Manager

[![GitHub](https://img.shields.io/github/license/n1crack/vuefinder)](https://github.com/n1crack/vuefinder/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vuefinder)](https://www.npmjs.com/package/vuefinder)

### About

A modern, customizable file manager component built for Vue.

Organize, preview, and manage your files through a beautiful, reactive interface — just like a native file explorer.

Easily integrate it into your app, connect to any storage (local, S3, etc.), and craft your own cloud experience with full control over uploads, search, and customization.

If you like it, please follow and ⭐ star on GitHub.

### Demo

[Live Demo](https://vuefinder.ozdemir.be/) [ [Source](https://github.com/n1crack/vuefinder.ozdemir.be) ]

### Installation

```bash
npm i vuefinder
```

JS entry point (it can be index.js or main.js)

```js
import { createApp } from 'vue';
import App from './App.vue';

import 'vuefinder/dist/style.css';
import VueFinder from 'vuefinder';

const app = createApp(App);

//By default, Vuefinder will use English as the main language.
// However, if you want to support multiple languages and customize the localization,
// you can import the language files manually during component registration.
app.use(VueFinder);

app.mount('#app');
```

### Localization

You can manually import the localization files from the package and register them with Vuefinder. The localization files are located in the dist/locales folder.

```js
import en from 'vuefinder/dist/locales/en.js';
import tr from 'vuefinder/dist/locales/tr.js';
import ru from 'vuefinder/dist/locales/ru.js';

app.use(VueFinder, {
  i18n: { en, tr, ru },
});
```

### Async Localization

Alternatively, you can import the localization files asynchronously during component registration. This can be useful for lazy loading or if you prefer to load the files dynamically.

```js
app.use(VueFinder, {
  i18n: {
    en: async () => await import('vuefinder/dist/locales/en.js'),
    de: async () => await import('vuefinder/dist/locales/de.js'),
    // Add more locales as needed
  },
});
```

#### Vue Template

```vue
<div>
  <vue-finder
    id="my_vuefinder"
    :driver="driver"
    :config="{ initialPath: 'local://public', persist: true }"
  />
</div>

<script setup>
import { RemoteDriver } from 'vuefinder';

// Create a driver instance
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
    save: '/save'
  }
});

// Or use LocalDriver for in-memory operations:
// import { LocalDriver } from 'vuefinder';
// const driver = new LocalDriver({
//   files: filesArray,
//   storage: 'memory',
//   readOnly: false
// });
</script>
```

### Styling

Vuefinder uses the BEM (Block Element Modifier) convention for its CSS classes, with default styles applied using TailwindCSS. This structured approach helps maintain a clear and consistent naming convention for CSS classes, making it easier to understand and manage styles across the project.

To customize or update the styles, simply find the appropriate BEM class in the component’s style section and override the styles as needed.

### Props

| Prop                         |  Value                          | Default    | Description                                                 |
| ---------------------------- | :-----------------------------: | ---------- | :---------------------------------------------------------- |
| id                           |  string                         | _null_     | required                                                    |
| driver                       |  Driver                         | _null_     | **required** - Driver instance used for file operations     |
| config                       |  ConfigDefaults                 | _object_   | optional - configuration store defaults (e.g., initialPath) |
| locale                       |  string                         | en         | optional - default language code                            |
| features                     |  FeaturesPreset \| FeaturesConfig | 'advanced' | optional - feature preset ('simple'/'advanced') or object   |
| selectionMode                |  'single' \| 'multiple'         | 'multiple' | optional - selection mode                                  |
| selectionFilterType          |  'files' \| 'dirs' \| 'both'   | 'both'     | optional - filter selectable items by type                  |
| selectionFilterMimeIncludes  |  string[]                       | []         | optional - MIME type filters for selection                  |
| contextMenuItems             |  ContextMenuItem[]              | _null_     | optional - custom context menu items                        |
| debug                        |  boolean                        | false      | optional - enable debug mode                                |
| onError                      |  function                       | _function_ | optional - error handler callback                           |
| onSelect                     |  function                       | _function_ | optional - selection handler (alternative to @select)      |
| onPathChange                 |  function                       | _function_ | optional - path change handler (alternative to @path-change) |
| onUploadComplete            |  function                       | _function_ | optional - upload handler (alternative to @upload-complete) |
| onDeleteComplete            |  function                       | _function_ | optional - delete handler (alternative to @delete-complete) |
| onReady                      |  function                       | _function_ | optional - ready handler (alternative to @ready)           |
| onFileDclick                 |  function                       | _function_ | optional - file double-click handler                        |
| onFolderDclick               |  function                       | _function_ | optional - folder double-click handler                     |

**Note:** Configuration options like `theme`, `maxFileSize`, `fullScreen`, `loadingIndicator`, etc. are now part of the `config` prop. See the [Configuration Guide](https://vuefinder.ozdemir.be/guide/configuration) for details.

### Events

| Event                        | Description                                                                                                                |
| ---------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `@select`                    | Emitted when the user selects a file or folder. `(items: DirEntry[]) => void`                                             |
| `@path-change`               | Emitted when the user navigates to a different folder. `(path: string) => void`                                            |
| `@upload-complete`           | Emitted when file uploads are completed successfully. `(files: DirEntry[]) => void`                                      |
| `@delete-complete`           | Emitted when files or folders are deleted successfully. `(deletedItems: DirEntry[]) => void`                              |
| `@error`                     | Emitted when an error occurs during any operation. `(error: any) => void`                                                  |
| `@ready`                     | Emitted when VueFinder is initialized and ready to use. `() => void`                                                        |
| `@file-dclick`               | Emitted when a file is double-clicked. Overrides default preview behavior. `(item: DirEntry) => void`                      |
| `@folder-dclick`             | Emitted when a folder is double-clicked. Overrides default navigation behavior. `(item: DirEntry) => void`                 |

### Selection

There are 2 ways to select files and folders.

#### 1) Inline select button via status bar scoped slot (recommended)

You can inject a custom button into the status bar and access the reactive selection via the `status-bar` scoped slot:

```vue
<vue-finder id="my_vuefinder" :driver="driver">
  <template #status-bar="{ selected, count, path  }">
    <div class="vuefinder__status-bar__actions">
      <button class="btn"
              @click="() => {
                    console.log(selected);
                    console.log(count);
                    console.log(path);
                }"
              :disabled="!count">
        Show Selected ({{ count ?? 0 }} selected)
      </button>
    </div>
  </template>
</vue-finder>
```

Alternatively, you can use the select event to get the selected items.

```vue
<vue-finder
  id="my_vuefinder"
  :driver="driver"
  @select="handleSelect"
  @path-change="handlePathChange"
  @upload-complete="handleUploadComplete"
  @delete-complete="handleDeleteComplete"
  @error="handleError"
  @ready="handleReady"
  @file-dclick="handleFileDoubleClick"
  @folder-dclick="handleFolderDoubleClick"
/>

<script setup>
import { ref } from 'vue';
import { RemoteDriver } from 'vuefinder';

// Create driver instance
const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
    // ... other endpoints
  }
});

// we can define a ref object to store the selected items
const selectedFiles = ref([]);

// handle select event, and store the selected items
const handleSelect = (selection) => {
  selectedFiles.value = selection;
};

// handle path change event
const handlePathChange = (path) => {
  console.log('Current path:', path);
};

// handle upload complete event
const handleUploadComplete = (uploadedFiles) => {
  console.log('Uploaded files:', uploadedFiles);
};

// handle delete complete event
const handleDeleteComplete = (deletedItems) => {
  console.log('Deleted items:', deletedItems);
};

// handle error event
const handleError = (error) => {
  console.error('VueFinder error:', error);
};

// handle ready event
const handleReady = () => {
  console.log('VueFinder is ready!');
};

// handle file double-click event
const handleFileDoubleClick = (file) => {
  console.log('File double-clicked:', file);
  // Custom logic here - maybe download, open in external app, etc.
};

// handle folder double-click event
const handleFolderDoubleClick = (folder) => {
  console.log('Folder double-clicked:', folder);
  // Custom logic here - maybe show folder info, add to favorites, etc.
};
// then with a button click, you can get the selected items easily
// you can add this method to the click event of a button.
const handleButtonClick = () => {
  console.log(selectedFiles.value);
};
</script>
```

### Custom Double-Click Behavior

By default, VueFinder handles double-click events as follows:

- **File double-click**: Opens preview modal
- **Folder double-click**: Navigates to folder (changes path)

You can customize this behavior by providing `@file-dclick` and `@folder-dclick` event handlers. When these handlers are provided, they will override the default behavior.

```vue
<vue-finder
  id="my_vuefinder"
  :driver="driver"
  @file-dclick="handleFileDoubleClick"
  @folder-dclick="handleFolderDoubleClick"
/>

<script setup>
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: { list: '/files' }
});

const handleFileDoubleClick = (file) => {
  // Custom file double-click behavior
  // Example: Download file, open in external app, etc.
  console.log('Custom file action:', file.basename);
};

const handleFolderDoubleClick = (folder) => {
  // Custom folder double-click behavior
  // Example: Show folder info, add to favorites, etc.
  console.log('Custom folder action:', folder.basename);
};
</script>
```

**Note**: If you don't provide these handlers, VueFinder will use the default behavior (preview for files, navigation for folders).

### Features

- Multi storage (see https://github.com/thephpleague/flysystem)
- File and folder operations
  - Create a new file
  - Create a new folder
  - Rename
  - Delete
  - Archive (zip)
  - Unarchive (unzip)
  - Text editing
  - Image Crop Tool
  - Upload / Download files
  - Search (deep based on current folder)
- Nice UI
  - Context Menu
  - Breadcrumb links
  - Toolbar
  - File explorer
  - Status bar
  - Image thumbnails
  - Toast notifications
- Appearance
  - Multi language (17 languages supported)
  - Full Screen mode
  - View Modes: list, grid
  - 12 Beautiful Themes: light, dark, midnight, latte, rose, mythril, lime, sky, ocean, palenight, arctic, code
- Accessibility
  - Drag & drop support
  - Move items (to a folder or up one folder) with drag and drop
  - Mouse selection

### Typescript

Vuefinder ships with built-in type declarations. You can enable type hints for the global Vuefinder component.

```ts
// src/global-components.d.ts
import { VueFinder } from 'vuefinder';

declare module 'vue' {
  export interface GlobalComponents {
    VueFinder: typeof VueFinder;
  }
}
```

### Backend

You can use any backend language. VueFinder talks to your server through the `driver` you provide. A driver simply calls your HTTP endpoints and returns data in the expected shape. This keeps VueFinder backend-agnostic while giving you full control over auth, storage, and business rules.

- PHP (recommended for plug‑and‑play): [VueFinder Php Library 4.0](https://github.com/n1crack/vuefinder-php)

Data contracts are stable and designed to be simple to implement. If you use the PHP package, these endpoints are already provided. For other stacks, mirror the same responses and you’re good to go.

Older ecosystem libraries (for VueFinder 3.x and earlier):

- PHP: [VueFinder Php Library 3.x](https://github.com/n1crack/vuefinder-php)
- Python: [Python WSGI](https://github.com/abichinger/vuefinder-wsgi)
- Go: [vuefinder-go](https://github.com/Duke1616/vuefinder-go)
- Rust: [vuefinder-rust](https://github.com/boenfu/vuefinder-rust)

### Collaboration

If you want to contribute to the project, please feel free to fork the repository and submit your changes as a pull request. Ensure that the changes you submit are applicable for general use rather than specific to your project.

### Dependencies

- [Vue 3+](https://vuejs.org/)
- [vue-advanced-cropper](https://github.com/advanced-cropper/vue-advanced-cropper) : JavaScript image cropper
- [viselect](https://github.com/simonwep/viselect) : Selection utility
- [Uppy](https://github.com/transloadit/uppy) : Upload library
- [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) : lightweight and flexible lazy loading for thumbnails
- [mitt](https://github.com/developit/mitt) : Tiny 200 byte functional event emitter / pubsub
- [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars) : scrollbar plugin
- [nanostores](https://github.com/nanostores/nanostores) : A tiny state manager

### License

Copyright (c) 2018 Yusuf ÖZDEMİR, released under [the MIT license](LICENSE)
