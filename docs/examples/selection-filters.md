---
outline: deep
---

# Selection Filters

Example showing how to filter selectable items by type and MIME type.

## Code Example

### Filter by Type

Only allow selecting files:

```vue
<template>
  <vue-finder id="files-only" :driver="driver" selection-filter-type="files" />
</template>
```

### Filter by MIME Type

Only allow selecting images:

```vue
<template>
  <vue-finder
    id="images-only"
    :driver="driver"
    selection-filter-type="files"
    :selection-filter-mime-includes="['image/']"
  />
</template>
```

### Combined Filters

Allow selecting multiple file types:

```vue
<template>
  <vue-finder
    id="multiple-types"
    :driver="driver"
    selection-filter-type="files"
    :selection-filter-mime-includes="['image/', 'video/', 'application/pdf']"
  />
</template>
```

## Explanation

Selection filters allow you to control what types of items can be selected:

- **`selection-filter-type`**: Filter by item type (`'files'`, `'dirs'`, or `'both'`)
- **`selection-filter-mime-includes`**: Filter by MIME type using exact types or prefixes (e.g., `'image/'`, `'video/'`, `'application/pdf'`)

See [Guide - Selection Modes](../guide/selection-modes.md) for complete documentation.
