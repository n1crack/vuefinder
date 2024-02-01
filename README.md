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

app.use(VueFinder)

app.mount('#app')
 
```
Vue Template
```vue
...
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

| Prop          | Value  | Default | Description                                                |
|---------------|:------:|---------|:-----------------------------------------------------------|
| id            | string | _null_  | required                                                   |
| request       | object | _null_  | required - backend url or request object, see above        |
| locale        | string | en      | optional - default language code                           |
| theme         | string | system  | optional - default theme, options: "system","light","dark" |
| max-file-size | string | 10mb    | optional - client side max file upload                     |

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

### Roadmap
- [x] restyle the modals
- [x] add more languages (only en/tr/ru at the moment. PRs are welcomed.)
- [x] emit select event, with @select get selected files for online editors like tinymce/ckeditor
- [x] show/hide components (toolbar/statusbar etc.)
- [ ] code refactoring (cleanup the duplications, make reusable components)
- [ ] copy/move to a folder (modal, treeview)
- [ ] transfer items between filesystem adapters
- [ ] drag&drop on folders at address bar
- [ ] update DragSelect plugin for using its dropzone support

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
