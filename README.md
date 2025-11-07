## Vuefinder File Manager

[![GitHub](https://img.shields.io/github/license/n1crack/vuefinder)](https://github.com/n1crack/vuefinder/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vuefinder)](https://www.npmjs.com/package/vuefinder)

### About

A modern, customizable file manager component built for Vue.

Organize, preview, and manage your files through a beautiful, reactive interface — just like a native file explorer.

Easily integrate it into your app, connect to any storage (local, S3, etc.), and craft your own cloud experience with full control over uploads, search, and customization.

If you like it, please follow and ⭐ star on GitHub.

### Demo

[Live Demo](https://vuefinder.ozdemir.be/) - Explore Vuefinder's features and capabilities in action.

### Installation

```bash
npm i vuefinder
```

For detailed installation instructions, configuration options, and usage examples, visit the [documentation website](https://vuefinder.ozdemir.be/).

### Backend

You can use any backend language. VueFinder talks to your server through the `driver` you provide. A driver simply calls your HTTP endpoints and returns data in the expected shape. This keeps VueFinder backend-agnostic while giving you full control over auth, storage, and business rules.

- PHP (recommended for plug‑and‑play): [VueFinder Php Library 4.0](https://github.com/n1crack/vuefinder-php)

Data contracts are stable and designed to be simple to implement. If you use the PHP package, these endpoints are already provided. For other stacks, mirror the same responses and you’re good to go.

Older ecosystem libraries (for VueFinder 3.x and earlier):

- PHP: [VueFinder Php Library 3.x](https://github.com/n1crack/vuefinder-php)
- Python: [Python WSGI](https://github.com/abichinger/vuefinder-wsgi)
- Go: [vuefinder-go](https://github.com/Duke1616/vuefinder-go)
- Rust: [vuefinder-rust](https://github.com/boenfu/vuefinder-rust)
- CloudFlare R2: [Cloudflare R2](https://github.com/NightFurySL2001/r2-explorer-demo)

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
- [vue-sonner](https://github.com/wobsoriano/vue-sonner) : Toast notification component
- [@floating-ui/dom](https://floating-ui.com/) : Floating UI positioning library

### License

Copyright (c) 2018 Yusuf ÖZDEMİR, released under [the MIT license](LICENSE)
