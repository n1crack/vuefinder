---
outline: deep
---

# Migration from 2.7 to 4.0

VueFinder 4.0 is a major release with significant changes. This guide will help you migrate from version 2.7 to 4.0.

::: info Version Note

Version 3.0 was skipped for organizational reasons. VueFinder 4.0 represents a significant evolution of the library.

:::

## Prerequisites

- Vue 3.5.22 or higher
- Node.js ^20.19.0 or >=22.12.0

## Overview of Changes

The main changes in VueFinder 4.0 include:

1. **Driver-based architecture** - Replaces the `request` prop

2. **Consolidated configuration** - All config options in one `config` prop

3. **Enhanced features system** - More flexible feature configuration

4. **Improved TypeScript support** - Better type definitions

5. **Expanded theming** - 12 themes (was 2)

6. **New menu bar** - Enhanced navigation and controls

7. **New selection features** - Single selection and filters

8. **New events** - File and folder double-click events

9. **Improved icon system** - Better way of defining custom icons

10. **History navigation** - Back and forward navigation support

11. **Enhanced copy/move** - New target input with treeview for copy/move operations

12. **New search** - Improved search functionality

13. **Enhanced breadcrumb** - New breadcrumb for showing path with easy copy functionality

14. **New upload target** - Improved upload experience

15. **Better drag and drop** - Enhanced external drag and drop support - just drop files in VueFinder

16. **Go to folder** - Quick navigation to specific folders

17. **Double-click optimizations** - Improved performance and behavior

18. **Preview navigation** - New arrows for navigation across preview items

19. **Dependency upgrades** - Updated dependencies and more improvements

## Breaking Changes

### 1. `request` Prop → `driver` Prop

**Before (2.7):**

```vue
<vue-finder :request="'/api/vuefinder'" />
```

**After (4.0):**

```vue
<template>
  <vue-finder :driver="driver" />
</template>

<script setup>
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
    upload: '/upload',
    // ... other endpoints
  },
});
</script>
```

### 2. Plugin Import Path

**Before (2.7):**

```js
import VueFinder from 'vuefinder/dist/vuefinder';
```

**After (4.0):**

```js
import VueFinder from 'vuefinder';
```

### 3. Features Array → Features Object/Preset

**Before (2.7):**

```vue
<vue-finder :features="['upload', 'delete', 'rename']" />
```

**After (4.0):**

```vue
<!-- Using preset -->
<vue-finder :features="'simple'" />

<!-- Using object -->
<vue-finder :features="{ upload: true, delete: true, rename: true }" />
```

### 4. Config Props Consolidated

**Before (2.7):**

```vue
<vue-finder :persist="true" :theme="'dark'" :max-height="'800px'" :max-file-size="'50mb'" />
```

**After (4.0):**

```vue
<vue-finder
  :config="{
    persist: true,
    theme: 'dark',
    maxFileSize: '50mb',
  }"
/>
```

### 5. Theme Values

**Before (2.7):**

- Only `'light'`, `'dark'`, and `'system'`

**After (4.0):**

- 12 themes available: `'light'`, `'dark'`, `'midnight'`, `'latte'`, `'rose'`, `'mythril'`, `'lime'`, `'sky'`, `'ocean'`, `'palenight'`, `'arctic'`, `'code'`
- `'system'` theme is no longer supported

## Step-by-Step Migration

### Step 1: Backup Your Code

Before starting, ensure you have:

- Committed all changes to version control
- Created a backup branch
- Documented any custom configurations

### Step 2: Update Package

```bash
npm uninstall vuefinder
npm install vuefinder@^4.0.0
```

Or update in `package.json`:

```json
{
  "dependencies": {
    "vuefinder": "^4.0.0"
  }
}
```

Then run:

```bash
npm install
```

### Step 3: Update Plugin Registration

Update your `main.js` or `main.ts`:

**Before:**

```js
import VueFinder from 'vuefinder/dist/vuefinder';
```

**After:**

```js
import VueFinder from 'vuefinder';
```

### Step 4: Create Driver Instance

Create a new file for your driver setup (e.g., `drivers.js` or `drivers.ts`):

```js
// drivers.js
import { RemoteDriver } from 'vuefinder';

export const createDriver = () => {
  return new RemoteDriver({
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
      save: '/save',
    },
  });
};
```

### Step 5: Update Component Usage

For each `vue-finder` component in your codebase:

#### Replace `request` prop

**Before:**

```vue
<vue-finder :request="'/api/vuefinder'" />
```

**After:**

```vue
<script setup>
import { createDriver } from './drivers';

const driver = createDriver();
</script>

<template>
  <vue-finder :driver="driver" />
</template>
```

#### Consolidate Config Props

**Before:**

```vue
<vue-finder :persist="true" :theme="'dark'" :max-file-size="'50mb'" :max-height="'800px'" />
```

**After:**

```vue
<vue-finder
  :driver="driver"
  :config="{
    persist: true,
    theme: 'dark',
    maxFileSize: '50mb',
  }"
/>
```

#### Update Features

**Before:**

```vue
<vue-finder :features="['upload', 'delete', 'rename']" />
```

**After:**

```vue
<vue-finder :features="{ upload: true, delete: true, rename: true }" />
```

Or use preset:

```vue
<vue-finder :features="'simple'" />
```

### Step 6: Update Event Handlers

Event names remain the same, but verify all handlers are working:

```vue
<vue-finder
  @select="handleSelect"
  @path-change="handlePathChange"
  @upload-complete="handleUploadComplete"
  @delete-complete="handleDeleteComplete"
  @error="handleError"
  @ready="handleReady"
/>
```

New events you can optionally use:

```vue
<vue-finder @file-dclick="handleFileDclick" @folder-dclick="handleFolderDclick" />
```

### Step 7: Update Backend (If Applicable)

If using the PHP backend library:

```bash
composer require n1crack/vuefinder-php:^4.0
```

Update your backend routes if necessary. Refer to the PHP library documentation for version 4.0.

### Step 8: Update TypeScript (If Applicable)

Update type imports:

```ts
import type { VueFinderProps, DirEntry, Driver, ConfigDefaults } from 'vuefinder';
```

Update global components declaration if needed:

```ts
// src/global-components.d.ts
import type { VueFinder } from 'vuefinder';

declare module 'vue' {
  export interface GlobalComponents {
    VueFinder: typeof VueFinder;
  }
}
```

## New Features You Can Use

### Single Selection Mode

```vue
<vue-finder selection-mode="single" />
```

### Selection Filters

```vue
<vue-finder selection-filter-type="files" :selection-filter-mime-includes="['image/']" />
```

### Custom Double-Click Events

```vue
<vue-finder @file-dclick="handleFileDclick" @folder-dclick="handleFolderDclick" />
```

## Need Help?

If you encounter issues during migration:

1. Check the [Breaking Changes](./breaking-changes.md) page

2. Open an issue on [GitHub](https://github.com/n1crack/vuefinder/issues)
