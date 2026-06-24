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

- PHP (recommended for plug‑and‑play): [VueFinder Php](https://github.com/n1crack/vuefinder-php)
- CloudFlare R2: [Cloudflare R2](https://github.com/NightFurySL2001/r2-explorer-demo)

Data contracts are stable and designed to be simple to implement. If you use the PHP package, these endpoints are already provided. For other stacks, mirror the same responses and you're good to go.

The complete API specification is available as an [OpenAPI 3.0 specification](https://vuefinder.ozdemir.be/api-reference/openapi.html) for easy integration and validation.

Older ecosystem libraries (for VueFinder 3.x and earlier):

- Python: [Python WSGI](https://github.com/abichinger/vuefinder-wsgi)
- Go: [vuefinder-go](https://github.com/Duke1616/vuefinder-go)
- Rust: [vuefinder-rust](https://github.com/boenfu/vuefinder-rust)

### Plugins

VueFinder has a first-class plugin system that lets you extend an instance without forking it. A plugin can:

- **Replace** any built-in action modal with your own component.
- **Extend** a built-in modal in place — inject content into named regions (header / body / footer) without rewriting it.
- **Add actions** — toolbar buttons, context-menu items, menu-bar entries, and keyboard shortcuts.
- **Add UI** into layout slots (toolbar, status bar, sidebar).
- **Hook into the lifecycle** of file operations (e.g. cancel a delete, react to an upload).

Plugins are registered **per instance** via the `plugins` prop, so multiple VueFinders on the same page stay isolated.

#### Registering a plugin

Use the `definePlugin` helper (it gives you full TypeScript typing) and pass an array to the `plugins` prop:

```vue
<script setup>
import { definePlugin } from 'vuefinder';

const myPlugin = definePlugin({
  name: 'my-plugin', // unique id, used for de-duplication & debugging
  setup(ctx) {
    // register contributions here…
    // optionally return a cleanup function, called on unmount:
    return () => {
      /* teardown */
    };
  },
});
</script>

<template>
  <vue-finder id="vf" :driver="driver" :plugins="[myPlugin]" />
</template>
```

#### The plugin context (`ctx`)

`setup(ctx)` receives everything a plugin can do:

| Property                                       | Description                                                                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ctx.app`                                      | The full per-instance service container — `config`, `fs`, `adapter`, `i18n`, `modal`, `emitter`, `features`, etc. Use it to read state and drive operations. |
| `ctx.modals.replace(key, component)`           | Swap the component shown for a modal `key`.                                                                                                                  |
| `ctx.modals.extend(key, region, contribution)` | Inject a component into a named region of a built-in modal.                                                                                                  |
| `ctx.actions.add(action)`                      | Add a toolbar / context-menu / menu-bar / hotkey action.                                                                                                     |
| `ctx.actions.override(id, patch)`              | Patch a built-in action by id, or pass `null` to disable it.                                                                                                 |
| `ctx.ui.slot(name, contribution)`              | Render a component into a layout slot.                                                                                                                       |
| `ctx.hooks.on(event, handler)`                 | Subscribe to a typed lifecycle hook (auto-unsubscribed on unmount).                                                                                          |

#### Working with modals

**Modal keys** (used by both `replace` and `extend`):

`upload`, `delete`, `archive`, `unarchive`, `newfile`, `newfolder`, `rename`, `copy`, `move`, `preview`, `search`, `settings`, `about`, `shortcuts`, `goToFolder`

`replace` works for any key. `extend` works on the "big action" modals, which expose injection **regions**:

`upload`, `delete`, `archive`, `unarchive`, `newfile`, `newfolder`, `rename`, `copy`, `move`

**Regions:** `header-actions`, `body-top`, `body-bottom`, `footer-actions`.

```js
// Replace the whole upload modal:
ctx.modals.replace('upload', MyUploadModal);

// Or just add a field to the bottom of the built-in archive (zip) modal:
ctx.modals.extend('archive', 'body-bottom', { component: CompressionLevelField });
```

**Extension component contract** — every injected component receives a `ctx` prop describing the live modal, plus any static `props` you pass:

```vue
<!-- CompressionLevelField.vue -->
<script setup>
// ctx = { app, data, close, extras }
//   app    → the service container
//   data   → the modal's payload (e.g. the selected items)
//   close  → closes the modal
//   extras → a shared, per-operation bag; write to it to send custom values
//            to the backend (see "Sending custom data to the backend" below)
defineProps({ ctx: Object });
</script>

<template>
  <label>Compression level: <input type="range" min="0" max="9" /></label>
</template>
```

##### Sending custom data to the backend (`ctx.extras`)

Each modal context carries an **`extras`** bag — a plain object that starts empty every time a modal opens. Whatever an extension field writes into `ctx.extras` is forwarded by the modal's action handler into the adapter call, and `RemoteDriver` sends each key as an **extra field on the operation's HTTP request** (alongside `path`, `items`, `name`, …). This is how an injected field gets its value all the way to your server so it can apply app-specific logic.

```vue
<!-- CompressionLevelField.vue -->
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ ctx: Object });
const level = ref(6);

// Mirror the field value into the shared extras bag.
watch(
  level,
  (value) => {
    const extras = props.ctx?.extras;
    if (extras) extras.compressionLevel = value;
  },
  { immediate: true }
);
</script>

<template>
  <label>Compression level: <input v-model.number="level" type="range" min="0" max="9" /></label>
</template>
```

Now, when the user confirms the archive, the request body your backend receives looks like:

```jsonc
{
  "compressionLevel": 6, // ← from ctx.extras
  "items": [
    /* … */
  ],
  "path": "local://photos",
  "name": "album.zip",
}
```

`extras` is supported by every "big action" operation: **delete, rename, copy, move, archive, unarchive, create file, create folder, and upload**. (For uploads the keys are sent as multipart form fields next to each file.) Built-in fields always win — keys in `extras` can never overwrite a core field like `path` or `name`. If you write a custom driver, read `params.extras` to handle these fields yourself.

```js
ctx.modals.extend('archive', 'body-bottom', {
  component: CompressionLevelField,
  props: { foo: 'bar' }, // optional static props
  order: 10, // optional ordering when multiple plugins target the same region
});
```

#### Adding actions

A single `ActionContribution` can surface in multiple places and/or bind a hotkey:

```js
import ShareIcon from './ShareIcon.vue';

ctx.actions.add({
  id: 'share',
  title: (i18n) => i18n.t('Share'),
  icon: ShareIcon, // shown on the toolbar / menu bar
  surfaces: ['toolbar', 'contextmenu', 'menubar'],
  hotkey: { code: 'KeyL', meta: true, shift: true }, // ⌘⇧L (or Ctrl⇧L)
  // ctx = { items, target } — `items` are the selected entries
  show: (app, { items }) => items.length > 0,
  action: (app, items) => {
    console.log(
      'share',
      items.map((i) => i.path)
    );
  },
  order: 200, // optional
});

// Disable a built-in action, or patch it:
ctx.actions.override('delete', null);
ctx.actions.override('rename', { order: 5 });
```

Plugin-contributed menu-bar actions are grouped under a single **Plugins** menu.

#### Adding UI into layout slots

```js
import StorageMeter from './StorageMeter.vue';

ctx.ui.slot('statusbar-end', { component: StorageMeter, order: 0 });
```

**Slot names:** `toolbar-start`, `toolbar-end`, `statusbar-start`, `statusbar-end`, `sidebar-top`, `sidebar-bottom`.

#### Lifecycle hooks

`before*` hooks are **cancelable** — call `event.preventDefault()` to abort the operation. `after*` hooks fire on success.

```js
// Block deletion of protected paths:
ctx.hooks.on('beforeDelete', (e) => {
  if (e.items.some((i) => i.path.includes('/protected/'))) {
    e.preventDefault();
  }
});

// React after an upload finishes:
ctx.hooks.on('afterUpload', (e) => {
  console.log('uploaded:', e.files); // string[] of file names
});
```

| Hook                                 | Cancelable | Payload                                                   |
| ------------------------------------ | ---------- | --------------------------------------------------------- |
| `beforeDelete` / `afterDelete`       | ✓ / —      | `{ items }`                                               |
| `beforeUpload` / `afterUpload`       | ✓ / —      | `{ files: File[], target }` / `{ files: string[] }`       |
| `beforeArchive` / `afterArchive`     | ✓ / —      | `{ items }` / `{ result }`                                |
| `beforeUnarchive` / `afterUnarchive` | ✓ / —      | `{ items }` / `{ result }`                                |
| `beforeRename` / `afterRename`       | ✓ / —      | `{ item, name }` / `{ result }`                           |
| `beforeCreate` / `afterCreate`       | ✓ / —      | `{ name, kind: 'file' \| 'folder' }` / `{ result, kind }` |
| `beforeCopy` / `afterCopy`           | ✓ / —      | `{ items, to }` / `{ result }`                            |
| `beforeMove` / `afterMove`           | ✓ / —      | `{ items, to }` / `{ result }`                            |
| `modalOpen` / `modalClose`           | —          | `{ key }` (the modal key, or `null`)                      |

#### Full example

```js
import { definePlugin } from 'vuefinder';
import CompressionLevelField from './CompressionLevelField.vue';
import MyUploadModal from './MyUploadModal.vue';

export const demoPlugin = definePlugin({
  name: 'demo-plugin',
  setup(ctx) {
    // 1. Add a field to the zip modal
    ctx.modals.extend('archive', 'body-bottom', { component: CompressionLevelField });

    // 2. Replace the upload modal entirely
    ctx.modals.replace('upload', MyUploadModal);

    // 3. Add a toolbar + context-menu action with a hotkey
    ctx.actions.add({
      id: 'log-selection',
      title: () => 'Log selection',
      surfaces: ['toolbar', 'contextmenu'],
      hotkey: { code: 'KeyL', meta: true, shift: true },
      show: (app, { items }) => items.length > 0,
      action: (app, items) => console.log(items.map((i) => i.path)),
    });

    // 4. Guard deletions
    ctx.hooks.on('beforeDelete', (e) => {
      if (e.items.some((i) => i.path.includes('/protected/'))) e.preventDefault();
    });
  },
});
```

#### TypeScript

All plugin types are exported from the package:

```ts
import { definePlugin, createCancelableEvent } from 'vuefinder';
import type {
  VfPlugin,
  PluginContext,
  ModalKey,
  ModalRegion,
  ModalExtension,
  ActionContribution,
  ActionSurface,
  UiSlotName,
  SlotContribution,
  VfHooks,
  CancelableEvent,
} from 'vuefinder';
```

> A runnable demo plugin lives in the dev playground at `examples/examples/plugins/` (select **"Plugin System Demo"** after running `npm run dev`).

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
- [@nanostores/i18n](https://github.com/nanostores/i18n) : Internationalization backend for nanostores
- [vue-sonner](https://github.com/wobsoriano/vue-sonner) : Toast notification component
- [@floating-ui/dom](https://floating-ui.com/) : Floating UI positioning library
- [@tanstack/vue-query](https://tanstack.com/query/v5/docs/framework/vue/overview) : fetching, caching, synchronizing and updating server state

### License

Copyright (c) 2018 Yusuf ÖZDEMİR, released under [the MIT license](LICENSE)
