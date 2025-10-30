## Vuefinder File Manager

[![GitHub](https://img.shields.io/github/license/n1crack/vuefinder)](https://github.com/n1crack/vuefinder/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vuefinder)](https://www.npmjs.com/package/vuefinder)

### About

Vuefinder is a file manager component for Vue.js version 3

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
import VueFinder from 'vuefinder/dist/vuefinder';

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
    <vue-finder id='my_vuefinder' :request="request"></vue-finder>
</div>
...

<script setup>
const request = 'http://vuefinder-php.test';

// Or ...
const request = {
  // ----- CHANGE ME! -----
  // [REQUIRED] Url for development server endpoint
  baseUrl: 'http://vuefinder-php.test',
  // ----- CHANGE ME! -----

  // Additional headers & params & body
  headers: { 'X-ADDITIONAL-HEADER': 'yes' },
  params: { additionalParam1: 'yes' },
  body: { additionalBody1: ['yes'] },

  // And/or transform request callback
  transformRequest: (req) => {
    if (req.method === 'get') {
      req.params.vf = '1';
    }
    return req;
  },

  // XSRF Token header name
  xsrfHeaderName: 'X-CSRF-TOKEN',
};
</script>
```

### Styling

Vuefinder uses the BEM (Block Element Modifier) convention for its CSS classes, with default styles applied using TailwindCSS. This structured approach helps maintain a clear and consistent naming convention for CSS classes, making it easier to understand and manage styles across the project.

To customize or update the styles, simply find the appropriate BEM class in the component’s style section and override the styles as needed.

### Props

| Prop              |     Value     | Default    | Description                                                 |
| ----------------- | :-----------: | ---------- | :---------------------------------------------------------- |
| id                |    string     | _null_     | required                                                    |
| request           | string/object | _object_   | required - backend url or request object, see above         |
| locale            |    string     | en         | optional - default language code                            |
| theme             |    string     | system     | optional - default theme, options: "system","light","dark"  |
| max-file-size     |    string     | 10mb       | optional - client side max file upload                      |
| max-height        |    string     | 600px      | optional - max height of the component                      |
| features          |     array     | _null_     | optional - array of the enabled features                    |
| path              |    string     | _null_     | optional - initial directory, example: 'media://public'     |
| persist           |    boolean    | false      | optional - keep current directory on page refresh           |
| full-screen       |    boolean    | false      | optional - start in full screen mode                        |
| select-button     |    object     | _object_   | optional - adds select button in status bar, see example    |
| loading-indicator |    string     | circular   | optional - style of loading indicator: "circular", "linear" |
| onError           |   function    | _function_ | optional - a callback to implement custom error handling    |

### Events

| Event                                                   | Description                                                                                                                |
| ------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `'select': (items: DirEntry[]) => void`                 | The callback function is invoked when the user selects a file or folder, and the selected elements are passed as arguments |
| `'path-change': (path: string) => void`                 | The callback function is invoked when the user opens another folder.                                                       |
| `'upload-complete': (files: DirEntry[]) => void`        | The callback function is invoked when file uploads are completed successfully.                                             |
| `'delete-complete': (deletedItems: DirEntry[]) => void` | The callback function is invoked when files or folders are deleted successfully.                                           |
| `'error': (error: any) => void`                         | The callback function is invoked when an error occurs during any operation.                                                |
| `'ready': () => void`                                   | The callback function is invoked when VueFinder is initialized and ready to use.                                           |

### Selection

There are 2 ways to select files and folders.

#### 1) Inline select button via status bar scoped slot (recommended)

You can inject a custom button into the status bar and access the reactive selection via the `status-bar` scoped slot:

```vue
<vue-finder id="my_vuefinder" :request="request">
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
  :request="request"
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
// other codes

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
  :request="request"
  @file-dclick="handleFileDoubleClick"
  @folder-dclick="handleFolderDoubleClick"
/>

<script setup>
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
  - Multi language
  - Full Screen
  - View Modes: list, grid
  - Dark Mode
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

- PHP: [VueFinder Php Library](https://github.com/n1crack/vuefinder-php)
- Python: [Python WSGI](https://github.com/abichinger/vuefinder-wsgi)
- Go: [vuefinder-go](https://github.com/Duke1616/vuefinder-go)
- Rust: [vuefinder-rust](https://github.com/boenfu/vuefinder-rust)

You can use any backend language. Just be sure, the response should be compatible.
If you develop a backend library for another language, please let me know to add it here.

### Collaboration

If you want to contribute to the project, please feel free to fork the repository and submit your changes as a pull request. Ensure that the changes you submit are applicable for general use rather than specific to your project.

### Dependencies

- [Vue3](https://vuejs.org/)
- [vue-advanced-cropper](https://github.com/advanced-cropper/vue-advanced-cropper) : JavaScript image cropper
- [viselect](https://github.com/simonwep/viselect) : Selection utility
- [Uppy](https://github.com/transloadit/uppy) : Upload library
- [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) : lightweight and flexible lazy loading for thumbnails
- [mitt](https://github.com/developit/mitt) : Tiny 200 byte functional event emitter / pubsub
- [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars) : scrollbar plugin
- [nanostores] A tiny state manager

### License

Copyright (c) 2018 Yusuf ÖZDEMİR, released under [the MIT license](LICENSE)
