---
outline: deep
---

# TypeScript Support

VueFinder includes comprehensive TypeScript definitions for better developer experience and type safety.

## Installation

TypeScript support is included automatically when you install VueFinder:

```bash
npm install vuefinder
```

No additional packages needed!

## Global Component Types

To enable type hints for the global `vue-finder` component, create a global components declaration file:

```ts
// src/global-components.d.ts
import type { VueFinder } from 'vuefinder';

declare module 'vue' {
  export interface GlobalComponents {
    VueFinder: typeof VueFinder;
  }
}
```

## Using Types

VueFinder exports all its types for use in your code:

```ts
import type {
  VueFinderProps,
  DirEntry,
  Driver,
  ConfigDefaults,
  FeaturesConfig,
  FeaturesPreset,
  Theme,
  FsData,
  RemoteDriverConfig,
  ArrayDriverConfig,
  IndexedDBDriverConfig,
} from 'vuefinder';
```

## Examples

### Typed Props

```vue
<template>
  <vue-finder id="typed" :driver="driver" :config="config" />
</template>

<script setup lang="ts">
import type { ConfigDefaults, RemoteDriver } from 'vuefinder';
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
  },
});

const config: ConfigDefaults = {
  view: 'grid',
  theme: 'dark',
  persist: true,
};
</script>
```

### Typed Event Handlers

```vue
<template>
  <vue-finder
    id="events"
    :driver="driver"
    @select="handleSelect"
    @path-change="handlePathChange"
    @upload-complete="handleUploadComplete"
  />
</template>

<script setup lang="ts">
import type { DirEntry } from 'vuefinder';

const handleSelect = (items: DirEntry[]) => {
  console.log('Selected items:', items);
};

const handlePathChange = (path: string) => {
  console.log('Path changed to:', path);
};

const handleUploadComplete = (files: DirEntry[]) => {
  console.log('Uploaded files:', files);
};
</script>
```

### Typed Features Config

```vue
<template>
  <vue-finder id="features" :driver="driver" :features="features" />
</template>

<script setup lang="ts">
import type { FeaturesConfig } from 'vuefinder';

const features: FeaturesConfig = {
  search: true,
  upload: true,
  delete: true,
  preview: false,
};
</script>
```

### Custom Driver with Types

```ts
import { BaseAdapter, type Driver } from 'vuefinder';
import type {
  FsData,
  ListParams,
  DeleteParams,
  DeleteResult,
  FileOperationResult,
} from 'vuefinder';

class MyDriver extends BaseAdapter implements Driver {
  async list(params?: ListParams): Promise<FsData> {
    // Implementation
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    // Implementation
  }

  // ... other methods
}
```

## Available Types

VueFinder exports the following types:

| Type                 | Description                                    |
|----------------------| ---------------------------------------------- |
| `VueFinderProps`     | Component props interface                      |
| `DirEntry`           | File/folder entry type                         |
| `Driver`             | Driver interface                               |
| `ConfigDefaults`     | Configuration options                          |
| `ConfigState`        | Complete config state                          |
| `FeaturesConfig`     | Features configuration object                  |
| `FeaturesPreset`     | Feature preset type (`'simple' \| 'advanced'`) |
| `Theme`              | Theme type                                     |
| `FsData`             | File system data response                      |
| `ItemDclickEvent`    | Double-click event object type                 |
| `RemoteDriverConfig` | RemoteDriver configuration                     |
| `ArrayDriverConfig`  | ArrayDriver configuration                      |
| `IndexedDBDriverConfig` | IndexedDBDriver configuration                |

For a complete list of all types, see [API Reference - Types](../api-reference/types.md).
