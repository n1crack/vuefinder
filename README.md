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
import { createApp } from 'vue'
import App from './App.vue'

import 'vuefinder/dist/style.css'
import VueFinder from 'vuefinder/dist/vuefinder'

const app = createApp(App)

//By default, Vuefinder will use English as the main language. 
// However, if you want to support multiple languages and customize the localization, 
// you can import the language files manually during component registration.
app.use(VueFinder)

app.mount('#app')
 
```
### Localization
You can manually import the localization files from the package and register them with Vuefinder. The localization files are located in the dist/locales folder.

```js
import en from 'vuefinder/dist/locales/en.js'
import tr from 'vuefinder/dist/locales/tr.js'
import ru from 'vuefinder/dist/locales/ru.js'

app.use(VueFinder, {
  i18n: { en, tr, ru }
});
```

### Async Localization
Alternatively, you can import the localization files asynchronously during component registration. This can be useful for lazy loading or if you prefer to load the files dynamically.

```js
app.use(VueFinder, {
  i18n: {
    en: async () => await import("vuefinder/dist/locales/en.js"),
    de: async () => await import("vuefinder/dist/locales/de.js"),
    // Add more locales as needed
  }
});
```

#### Vue Template

```vue 
<div>
    <vue-finder id='my_vuefinder' :request="request"></vue-finder>
</div>
...

<script setup>
  const request = "http://vuefinder-php.test"
  
  // Or ...
  const request = {
    // ----- CHANGE ME! -----
    // [REQUIRED] Url for development server endpoint
    baseUrl: "http://vuefinder-php.test",
    // ----- CHANGE ME! -----

    // Additional headers & params & body
    headers: { "X-ADDITIONAL-HEADER": 'yes' },
    params: { additionalParam1: 'yes' },
    body: { additionalBody1: ['yes'] },

    // And/or transform request callback
    transformRequest: req => {
      if (req.method === 'get') {
        req.params.vf = "1"
      }
      return req;
    },

    // XSRF Token header name
    xsrfHeaderName: "X-CSRF-TOKEN",
  }
</script>
```

### Props

| Prop          |     Value     | Default  | Description                                                |
|---------------|:-------------:|----------|:-----------------------------------------------------------|
| id            |    string     | _null_   | required                                                   |
| request       | string/object | _object_ | required - backend url or request object, see above        |
| locale        |    string     | en       | optional - default language code                           |
| theme         |    string     | system   | optional - default theme, options: "system","light","dark" |
| max-file-size |    string     | 10mb     | optional - client side max file upload                     |
| max-height    |    string     | 600px    | optional - max height of the component                     |
| features      |     array     | _null_   | optional - array of the enabled features                   |
| path          |    string     | _null_   | optional - initial directory, example: 'media://public'    |
| persist       |    boolean    | false    | optional - keep current directory on page refresh          |
| full-screen   |    boolean    | false    | optional - start in full screen mode                       |
| select-button |    object     | _object_ | optional - adds select button in status bar, see example   |


### Events
| Event              | Description                                                                                                                |
|--------------------|:---------------------------------------------------------------------------------------------------------------------------|
| @select="callback" | The callback function is invoked when the user selects a file or folder, and the selected elements are passed as arguments |

### Selection
There are 2 ways to select files and folders.

First one, you can use the select button in the status bar. To enable the select button, you can use the select-button prop.
when you set the select-button active to true, the select button will be visible in the status bar.
```vue
<vue-finder
  id='my_vuefinder'
  :request="request"
  :select-button="handleSelectButton"
/>

<script>
  // other codes

  const handleSelectButton = {
    // show select button
    active: true,
    // allow multiple selection
    multiple: false,
    // handle click event
    click: (items, event) => {
      if (!items.length) {
        alert('No item selected');
        return;
      }
      alert('Selected: ' + items[0].path);
      console.log(items, event);
    }
  }
</script>
```

Alternatively, you can use the select event to get the selected items.
```vue
<vue-finder
  id='my_vuefinder'
  :request="request"
  @select="handleSelect"
/>

<script>
  // other codes
  
  // we can define a ref object to store the selected items
  const selectedFiles = ref([]);
  
  // handle select event, and store the selected items
  const handleSelect = (selection) => {
    selectedFiles.value = selection
  }
  // then with a button click, you can get the selected items easily
  // you can add this method to the click event of a button. 
  const handleButtonClick = () => {
    console.log(selectedFiles.value);
  }
</script>
```

### Features 
- Multi adapter/storage (see https://github.com/thephpleague/flysystem)
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

### Backend
- PHP: [VueFinder Php Library](https://github.com/n1crack/vuefinder-php)

You can use any backend language. Just be sure, the response should be compatible.
If you develop a backend library for another language, please let me know to add it here.

### Collaboration
If you want to contribute to the project, please feel free to fork the repository and submit your changes as a pull request. Ensure that the changes you submit are applicable for general use rather than specific to your project.

### Dependencies
 - [Vue3](https://vuejs.org/)
 - [Cropperjs](https://github.com/fengyuanchen/cropperjs)  : JavaScript image cropper
 - [DragSelect](https://github.com/ThibaultJanBeyer/DragSelect/) : Selection utility
 - [Uppy](https://github.com/transloadit/uppy) : Upload library
 - [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) : lightweight and flexible lazy loading for thumbnails
 - [microtip](https://github.com/ghosh/microtip) : Minimal, accessible, ultra lightweight css tooltip library
 - [mitt](https://github.com/developit/mitt) : Tiny 200 byte functional event emitter / pubsub

### License
Copyright (c) 2018 Yusuf ÖZDEMİR, released under [the MIT license](LICENSE)
