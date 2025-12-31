---
outline: deep
---

# Installation

VueFinder is a file manager component for Vue.js version 3. Follow these steps to get started.

## Install via npm

```bash
npm install vuefinder
```

## Basic Setup

### 1. Import VueFinder in your main.js or index.js

```js
import { createApp } from 'vue';
import App from './App.vue';

import 'vuefinder/dist/style.css';
import VueFinder from 'vuefinder';

const app = createApp(App);

// Register VueFinder globally
app.use(VueFinder);

app.mount('#app');
```

### 2. Use VueFinder in your template

```vue
<template>
  <div>
    <vue-finder
      id="my_vuefinder"
      :driver="driver"
      :config="{
        initialPath: 'local://public',
        persist: true,
      }"
    />
  </div>
</template>

<script setup>
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
    upload: '/upload',
    delete: '/delete',
    rename: '/rename',
    archive: '/archive',
    unarchive: '/unarchive',
    createFile: '/create-file',
    createFolder: '/create-folder',
    search: '/search',
    preview: '/preview',
    copy: '/copy',
    move: '/move',
    save: '/save',
    download: '/download',
  },
});
</script>
```

## Localization Setup

VueFinder supports multiple languages with a reactive i18n system powered by `nanostores`. By default, it uses English, but you can add more languages:

### Manual Import

```js
import en from 'vuefinder/dist/locales/en.js';
import tr from 'vuefinder/dist/locales/tr.js';
import ru from 'vuefinder/dist/locales/ru.js';

app.use(VueFinder, {
  i18n: { en, tr, ru },
});
```

### Async Import (Recommended)

For better performance, especially when supporting many languages, use async imports:

```js
app.use(VueFinder, {
  locale: 'en', // Optional: set default locale
  i18n: {
    en: async () => await import('vuefinder/dist/locales/en.js'),
    tr: async () => await import('vuefinder/dist/locales/tr.js'),
    de: async () => await import('vuefinder/dist/locales/de.js'),
    // Add more locales as needed
  },
});
```

### Dynamic Language Switching

The locale is managed globally and persists across page reloads. You can change the language dynamically using the `locale` prop:

```vue
<template>
  <vue-finder id="manager" :driver="driver" :locale="currentLocale" />
</template>

<script setup>
import { ref } from 'vue';

const currentLocale = ref('en');

// Change language dynamically
const switchLanguage = (lang) => {
  currentLocale.value = lang; // Interface updates immediately
};
</script>
```

**Key Features:**
- **Automatic Persistence**: Selected locale is saved to `localStorage` automatically
- **Translation Caching**: Loaded translations are cached for better performance
- **Reactive Updates**: Changing the `locale` prop updates the interface immediately
- **Global State**: All VueFinder instances share the same locale state

For more details, see the [Localization Guide](../guide/localization.md).

## TypeScript Support

VueFinder ships with built-in TypeScript declarations. Enable type hints by adding this to your global components declaration:

```typescript
// src/global-components.d.ts
import type { VueFinder } from 'vuefinder';

declare module 'vue' {
  export interface GlobalComponents {
    VueFinder: typeof VueFinder;
  }
}
```

## Next Steps

- [Quick Start Guide](./quick-start.md) - Learn the basics
- [Configuration](../guide/configuration.md) - Complete configuration options
- [Drivers & Adapters](../guide/drivers-adapters.md) - Set up your backend
- [Examples](../examples/basic-usage.md) - Practical usage examples
