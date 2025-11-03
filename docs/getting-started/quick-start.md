---
outline: deep
---

# Quick Start

Get up and running with VueFinder in just a few minutes.

## Basic Usage

Here's a minimal example to get you started with a RemoteDriver:

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

## Backend Requirements

VueFinder requires a backend that implements the VueFinder API. For VueFinder 4.0, the following backend is supported:

- **PHP**: [VueFinder PHP Library 4.0](https://github.com/n1crack/vuefinder-php) - Official backend for VueFinder 4.0

## Essential Props

### Required Props

| Prop     | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `id`     | string | Unique identifier for the VueFinder instance    |
| `driver` | object | Driver instance that implements file operations |

### Common Optional Props

```vue
<template>
  <vue-finder
    id="my_vuefinder"
    :driver="driver"
    locale="en"
    :config="{
      theme: 'light',
      maxFileSize: '10mb',
      persist: true,
      fullScreen: false,
    }"
  />
</template>
```

## File Selection

VueFinder provides two ways to handle file selection:

### Method 1: Select Button

```vue
<template>
  <vue-finder id="my_vuefinder" :driver="driver" :select-button="selectButtonConfig" />
</template>

<script setup>
const selectButtonConfig = {
  active: true,
  multiple: false,
  click: (items, event) => {
    if (!items.length) {
      alert('No item selected');
      return;
    }
    console.log('Selected:', items[0].path);
  },
};
</script>
```

### Method 2: Event Handler

```vue
<template>
  <vue-finder id="my_vuefinder" :driver="driver" @select="handleSelect" />
  <button @click="processSelection">Process Selection</button>
</template>

<script setup>
import { ref } from 'vue';

const selectedFiles = ref([]);

const handleSelect = (selection) => {
  selectedFiles.value = selection;
};

const processSelection = () => {
  console.log('Selected files:', selectedFiles.value);
};
</script>
```

## Next Steps

- [Configuration](../guide/configuration.md) - Complete configuration options
- [Examples](../examples/basic-usage.md) - More detailed usage examples
- [Drivers & Adapters](../guide/drivers-adapters.md) - Set up your backend server
- [API Reference](../api-reference/props.md) - Complete documentation
