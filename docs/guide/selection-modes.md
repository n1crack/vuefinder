---
outline: deep
---

# Selection Modes

VueFinder provides flexible selection options, allowing you to control how users can select files and folders.

## Selection Mode

Control whether users can select single or multiple items:

### Multiple Selection (Default)

```vue
<template>
  <vue-finder id="multiple" :driver="driver" selection-mode="multiple" />
</template>
```

Allows selecting multiple files and folders simultaneously.

### Single Selection

```vue
<template>
  <vue-finder id="single" :driver="driver" selection-mode="single" />
</template>
```

Only one item can be selected at a time. Selecting a new item deselects the previous one.

## Selection Filters

You can filter what types of items can be selected.

### Filter by Type

```vue
<template>
  <vue-finder id="type-filter" :driver="driver" selection-filter-type="files" />
</template>
```

Options:

- `'both'` (default) - Files and folders
- `'files'` - Files only
- `'dirs'` - Directories only

### Filter by MIME Type

Restrict selection to specific file types:

```vue
<template>
  <vue-finder
    id="mime-filter"
    :driver="driver"
    :selection-filter-mime-includes="['image/', 'video/']"
  />
</template>
```

MIME filters accept:

- Exact MIME types: `'image/png'`, `'application/pdf'`
- MIME type prefixes: `'image/'`, `'video/'`, `'text/'`

## Examples

### Files Only Selection

```vue
<template>
  <vue-finder
    id="files-only"
    :driver="driver"
    selection-mode="multiple"
    selection-filter-type="files"
    @select="handleFileSelection"
  />
</template>

<script setup>
const handleFileSelection = (files) => {
  console.log('Selected files:', files);
};
</script>
```

### Images Only

```vue
<template>
  <vue-finder
    id="images-only"
    :driver="driver"
    selection-mode="multiple"
    selection-filter-type="files"
    :selection-filter-mime-includes="['image/']"
  />
</template>
```

### Single Image Selection

```vue
<template>
  <vue-finder
    id="single-image"
    :driver="driver"
    selection-mode="single"
    selection-filter-type="files"
    :selection-filter-mime-includes="['image/']"
  />
</template>
```

### Combined Filters

```vue
<template>
  <vue-finder
    id="combined"
    :driver="driver"
    selection-mode="multiple"
    selection-filter-type="files"
    :selection-filter-mime-includes="['image/', 'video/', 'application/pdf']"
  />
</template>
```
