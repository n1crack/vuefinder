---
outline: deep
---

# Localization

VueFinder supports multiple languages and provides easy ways to customize translations. This guide covers how to implement and customize localization.

## Built-in Languages

VueFinder comes with 17 built-in language packs:

- **English (en)** - Default language
- **Turkish (tr)** - Türkçe
- **Russian (ru)** - Русский
- **German (de)** - Deutsch
- **Spanish (es)** - Español
- **French (fr)** - Français
- **Italian (it)** - Italiano
- **Japanese (ja)** - 日本語
- **Dutch (nl)** - Nederlands
- **Polish (pl)** - Polski
- **Portuguese (pt)** - Português
- **Swedish (sv)** - Svenska
- **Arabic (ar)** - العربية
- **Persian (fa)** - فارسی
- **Hebrew (he)** - עברית
- **Hindi (hi)** - हिन्दी
- **Chinese Simplified (zhCN)** - 简体中文
- **Chinese Traditional (zhTW)** - 繁體中文

## Basic Setup

### Using Default Language

By default, VueFinder uses English. No additional setup is required:

```vue
<template>
  <vue-finder id="my_manager" :driver="driver" locale="en" />
</template>
```

### Adding Multiple Languages

Import and register multiple language packs:

```js
import { createApp } from 'vue';
import App from './App.vue';

import 'vuefinder/dist/style.css';
import VueFinder from 'vuefinder';

// Import language packs
import en from 'vuefinder/dist/locales/en.js';
import tr from 'vuefinder/dist/locales/tr.js';
import ru from 'vuefinder/dist/locales/ru.js';
import de from 'vuefinder/dist/locales/de.js';

const app = createApp(App);

app.use(VueFinder, {
  i18n: { en, tr, ru, de },
});

app.mount('#app');
```

### Async Language Loading

For better performance, load languages asynchronously:

```js
import { createApp } from 'vue';
import App from './App.vue';

import 'vuefinder/dist/style.css';
import VueFinder from 'vuefinder';

const app = createApp(App);

app.use(VueFinder, {
  i18n: {
    en: async () => await import('vuefinder/dist/locales/en.js'),
    tr: async () => await import('vuefinder/dist/locales/tr.js'),
    ru: async () => await import('vuefinder/dist/locales/ru.js'),
    de: async () => await import('vuefinder/dist/locales/de.js'),
    fr: async () => await import('vuefinder/dist/locales/fr.js'),
    es: async () => await import('vuefinder/dist/locales/es.js'),
    it: async () => await import('vuefinder/dist/locales/it.js'),
    pt: async () => await import('vuefinder/dist/locales/pt.js'),
    ja: async () => await import('vuefinder/dist/locales/ja.js'),
    nl: async () => await import('vuefinder/dist/locales/nl.js'),
    pl: async () => await import('vuefinder/dist/locales/pl.js'),
    sv: async () => await import('vuefinder/dist/locales/sv.js'),
    ar: async () => await import('vuefinder/dist/locales/ar.js'),
    fa: async () => await import('vuefinder/dist/locales/fa.js'),
    he: async () => await import('vuefinder/dist/locales/he.js'),
    hi: async () => await import('vuefinder/dist/locales/hi.js'),
    zhCN: async () => await import('vuefinder/dist/locales/zhCN.js'),
    zhTW: async () => await import('vuefinder/dist/locales/zhTW.js'),
  },
});

app.mount('#app');
```

## Dynamic Language Switching

VueFinder uses a reactive i18n system powered by `nanostores` that automatically manages language state and caching. The locale is stored globally and persists across page reloads.

### Language Selector Component

Create a language selector to switch between languages. The locale prop is reactive and will automatically update the interface:

```vue
<template>
  <div class="multilang-file-manager">
    <div class="language-selector">
      <label for="language-select">Language:</label>
      <select id="language-select" v-model="selectedLocale" @change="updateLanguage">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="ru">Русский</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="it">Italiano</option>
        <option value="ja">日本語</option>
      </select>
    </div>

    <vue-finder id="multilang_manager" :driver="driver" :locale="selectedLocale" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const selectedLocale = ref('en');

// Load saved language preference (optional - VueFinder handles this automatically)
onMounted(() => {
  const savedLocale = localStorage.getItem('vuefinder_locale');
  if (savedLocale) {
    try {
      const parsed = JSON.parse(savedLocale);
      selectedLocale.value = parsed;
    } catch {
      // Fallback to default
    }
  }
});

const updateLanguage = () => {
  // Language preference is automatically saved by VueFinder
  // The locale prop change will trigger reactive updates
  console.log('Language changed to:', selectedLocale.value);
};
</script>
```

### How It Works

1. **Global State Management**: VueFinder uses `nanostores` to manage locale state globally across all instances
2. **Automatic Persistence**: The selected locale is automatically saved to `localStorage` under the key `vuefinder_locale`
3. **Translation Caching**: Loaded translations are cached in `localStorage` under `vuefinder_translations` for better performance
4. **Reactive Updates**: When the `locale` prop changes, the interface updates reactively without page reload
5. **Priority Order**: Locale priority is: `locale` prop > cached locale > default 'en'

### Locale Prop Priority

The `locale` prop takes precedence over cached settings:

```vue
<template>
  <!-- This will override any cached locale -->
  <vue-finder id="manager" :driver="driver" locale="tr" />
</template>
```

## Custom Translations

### Creating Custom Language Pack

You can create custom translations by extending or overriding the default language packs:

```js
// custom-locales/custom-en.js
export default {
  // Override specific translations
  'file.upload': 'Upload Files',
  'file.download': 'Download File',
  'file.rename': 'Rename File',
  'file.delete': 'Delete File',

  // Add custom translations
  'custom.welcome': 'Welcome to File Manager',

  // Toolbar translations
  'toolbar.upload': 'Upload',
  'toolbar.download': 'Download',

  // ... more translations
};
```

### Using Custom Translations

```js
import { createApp } from 'vue';
import App from './App.vue';

import 'vuefinder/dist/style.css';
import VueFinder from 'vuefinder';

// Import default and custom translations
import en from 'vuefinder/dist/locales/en.js';
import customEn from './custom-locales/custom-en.js';

const app = createApp(App);

app.use(VueFinder, {
  i18n: {
    en: { ...en, ...customEn }, // Merge custom translations
  },
});

app.mount('#app');
```

## Advanced Features

### Global Locale Cache

VueFinder automatically caches the locale and translations globally:

- **Locale Cache**: Stored in `localStorage` as `vuefinder_locale` (JSON format)
- **Translations Cache**: Stored in `localStorage` as `vuefinder_translations` (JSON object with locale keys)
- **Shared Across Instances**: All VueFinder instances share the same locale state

### Clearing Cache

To reset language settings, you can clear the cache:

```js
// Clear locale cache
localStorage.removeItem('vuefinder_locale');

// Clear translations cache
localStorage.removeItem('vuefinder_translations');

// Or clear both
localStorage.removeItem('vuefinder_locale');
localStorage.removeItem('vuefinder_translations');
```

The Settings modal in VueFinder also provides a "Reset Settings" button that clears all caches including language settings.

### Reactive Locale Updates

The locale system is fully reactive. When you change the `locale` prop, the interface updates immediately:

```vue
<template>
  <div>
    <button @click="switchToTurkish">Switch to Turkish</button>
    <button @click="switchToEnglish">Switch to English</button>
    
    <vue-finder id="manager" :driver="driver" :locale="currentLocale" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentLocale = ref('en');

const switchToTurkish = () => {
  currentLocale.value = 'tr'; // Interface updates immediately
};

const switchToEnglish = () => {
  currentLocale.value = 'en'; // Interface updates immediately
};
</script>
```

## Best Practices

1. **Use async loading** for better performance when supporting many languages
2. **Leverage automatic caching** - VueFinder handles translation caching automatically
3. **Use locale prop for dynamic switching** - The prop is reactive and updates the UI immediately
4. **Provide fallbacks** for missing translations (VueFinder uses the key as fallback)
5. **Test RTL languages** (Arabic, Hebrew) if you plan to support them
6. **Clear cache when needed** - Use the Settings modal or manually clear localStorage keys

For more information on available languages and how to contribute translations, visit the [GitHub repository](https://github.com/n1crack/vuefinder).
