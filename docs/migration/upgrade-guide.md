---
outline: deep
---

# Upgrade Guide

Detailed step-by-step guide for upgrading VueFinder from 2.7 to 4.0.

## Prerequisites

- Vue 3.5.22 or higher
- Node.js ^20.19.0 or >=22.12.0

## Step 1: Backup Your Code

Before starting, ensure you have:

- Committed all changes to version control
- Created a backup branch
- Documented any custom configurations

## Step 2: Update Package

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

## Step 3: Update Plugin Registration

**File: `main.js` or `main.ts`**

**Before:**

```js
import VueFinder from 'vuefinder/dist/vuefinder';
```

**After:**

```js
import VueFinder from 'vuefinder';
```

## Step 4: Create Driver Instance

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

## Step 5: Update Component Usage

For each `vue-finder` component in your codebase:

### Replace `request` prop

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

### Consolidate Config Props

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
    theme: 'valorite',
    maxFileSize: '50mb',
  }"
/>
```

### Update Features

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

## Step 6: Update Event Handlers

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

## Step 7: Update Backend (If Applicable)

If using the PHP backend library:

```bash
composer require n1crack/vuefinder-php:^4.0
```

Update your backend routes if necessary. Refer to the PHP library documentation for version 4.0.

## Step 8: Update TypeScript (If Applicable)

Update type imports:

```ts
// Before (may have been different)
// After
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

## Step 9: Test Everything

Thoroughly test:

- [ ] File listing and navigation
- [ ] File upload
- [ ] File deletion
- [ ] File rename
- [ ] File copy/move
- [ ] Folder operations
- [ ] Search functionality
- [ ] Preview functionality
- [ ] Theme switching
- [ ] Language switching
- [ ] All event handlers
- [ ] Custom slots (if used)
- [ ] Selection functionality

## Step 10: Update Documentation

Update any internal documentation or comments that reference:

- Old prop names
- Old import paths
- Old API usage

## Common Issues

### Issue: "Driver is required"

**Solution:** Ensure you're passing the `driver` prop to all `vue-finder` components.

### Issue: Features not working

**Solution:** Check that features are configured correctly. Use `'advanced'` preset to enable all features, or configure individually.

### Issue: Configuration not persisting

**Solution:** Ensure `persist: true` is set in the `config` prop (not as a separate prop).

### Issue: Type errors

**Solution:** Update your TypeScript imports and ensure you're using the latest type definitions.

## Rollback Plan

If you need to rollback:

1. Restore from your backup branch
2. Reinstall VueFinder 2.7:

   ```bash
   npm install vuefinder@^2.7.0
   ```

## Getting Help

If you encounter issues:

1. Check the [Migration Guide](./from-2-7-to-4-0.md)
2. Review [Breaking Changes](./breaking-changes.md)
3. Check [GitHub Issues](https://github.com/n1crack/vuefinder/issues)
4. Ask for help in discussions
