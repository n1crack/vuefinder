---
outline: deep
---

# Feature Presets

Learn how to use VueFinder's feature presets for quick setup.

## Live Demo

<ClientOnly>
  <FeaturesDemo />
</ClientOnly>

## Code Example

### Simple Preset

Use the `'simple'` preset for basic file browsing:

```vue
<template>
  <vue-finder id="simple-preset" :driver="driver" :features="'simple'" />
</template>
```

### Advanced Preset

Use the `'advanced'` preset for all features (default):

```vue
<template>
  <vue-finder id="advanced-preset" :driver="driver" :features="'advanced'" />
</template>
```

## Explanation

Feature presets provide quick ways to configure VueFinder:

- **`'simple'`**: Basic features for simple file browsing (search, preview, rename, upload, delete, newfile, newfolder, download)
- **`'advanced'`**: All features enabled (default)

You can also configure features individually using an object format. See [Guide - Features](../guide/features.md) for complete feature documentation.
