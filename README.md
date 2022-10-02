## Vuefinder File Manager

#### Readme in progress..

![ezgif-1-b902690b76](https://user-images.githubusercontent.com/712404/193141338-8d5f726f-da1a-4825-b652-28e4007493db.gif)


app rebuilt to use vue 3 and tailwindcss.

dependencies :
 - Vue 3
 - Cropper  : Image crop tool
 - DragSelect : Selection Utility
 - Plupload : Upload library
 - vanilla-lazyload : lazy load image thumbnails for better performance


version 1.0 is on its way..

backend (php) : https://github.com/n1crack/vuefinder-php

### features 
- Dark Mode
- Context Menu, Breadcrumb links, toolbar, explorer and status bar
- loading indicator
- View Modes: list, grid
- drag & drop support
- mouse selection
- localstorage for remembering view/dark theme, selected language or file adapter
- Able to cancel long running tasks
- Multi adapter/storage (see https://github.com/thephpleague/flysystem)
- Create a new file/folder, Rename, Delete, Archive/Unarchive (zip/unzip)
- Move items (to a folder or up one folder) with drag and drop
- Upload files
- Search (deep)
- Full Screen
- toast notifications
- Text editing
- Image Crop Tool
- Multi language (only en/tr atm. will be more. PRs are welcomed.)
- thumbnails (Image)
- lazy load for image thumbnails

### upcoming.. 
- [ ] documentation
- [ ] demo pages
- [ ] code refactoring
- [ ] transfer items between adapters
- [ ] enjoy..
