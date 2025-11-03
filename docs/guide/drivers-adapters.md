---
outline: deep
---

# Drivers & Adapters

VueFinder uses a driver-based architecture that abstracts file operations. This allows you to connect to different storage backends or implement custom file handling logic.

## Driver Interface

All drivers must implement the `Driver` interface. VueFinder provides two built-in drivers:

- **RemoteDriver** - For HTTP API backends
- **LocalDriver** - For in-memory file operations

## RemoteDriver

Use `RemoteDriver` to connect to a backend HTTP API. This is the most common use case for production applications.

### Basic Usage

```js
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  url: {
    list: '/files',
    upload: '/files/upload',
    delete: '/files/delete',
    rename: '/files/rename',
    copy: '/files/copy',
    move: '/files/move',
    archive: '/files/archive',
    unarchive: '/files/unarchive',
    createFile: '/files/create-file',
    createFolder: '/files/create-folder',
    preview: '/files/preview',
    download: '/files/download',
    search: '/files/search',
    save: '/files/save',
  },
});
```

### With Authentication

```js
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api',
  token: 'your-auth-token',
  headers: {
    Authorization: 'Bearer your-auth-token',
    'X-Custom-Header': 'value',
  },
  url: {
    list: '/files',
    // ... other endpoints
  },
});
```

### Custom Endpoints

You can customize individual endpoint URLs:

```js
import { RemoteDriver } from 'vuefinder';

const driver = new RemoteDriver({
  baseURL: '/api/v1',
  url: {
    list: '/list-files',
    upload: '/upload-files',
    delete: '/remove-files',
    // Only specify endpoints you want to override
  },
});
```

## LocalDriver

Use `LocalDriver` for in-memory file operations. Useful for demos, testing, or client-only applications.

### Basic Usage

```js
import { LocalDriver } from 'vuefinder';
import { ref } from 'vue';

const files = ref([
  {
    dir: '',
    basename: 'example.txt',
    extension: 'txt',
    path: 'memory://example.txt',
    storage: 'memory',
    type: 'file',
    file_size: 1024,
    last_modified: Date.now(),
    mime_type: 'text/plain',
    visibility: 'public',
  },
  {
    dir: '',
    basename: 'documents',
    extension: '',
    path: 'memory://documents',
    storage: 'memory',
    type: 'dir',
    file_size: null,
    last_modified: Date.now(),
    mime_type: null,
    visibility: 'public',
  },
]);

const driver = new LocalDriver({
  files: files,
  storage: 'memory',
});
```

## Custom Driver

You can create your own driver by implementing the `Driver` interface:

```ts
import { BaseAdapter, type Driver } from 'vuefinder';

import type {
  FsData,
  DeleteResult,
  FileOperationResult,
  FileContentResult,
  ListParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  SaveParams,
} from 'vuefinder';

class MyCustomDriver extends BaseAdapter implements Driver {
  async list(params?: ListParams): Promise<FsData> {
    // Your implementation
    return {
      storages: ['custom'],
      dirname: params?.path || 'custom://',
      files: [],
    };
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    // Your implementation
    return { deleted: [] };
  }

  async rename(params: RenameParams): Promise<FileOperationResult> {
    // Your implementation
  }

  // Implement all other required methods...
  // See the Driver interface for complete list
}
```

## Backend Libraries

Official backend libraries are available:

- **PHP**: [VueFinder PHP Library 4.0](https://github.com/n1crack/vuefinder-php) (Recommended)

For other languages, you can implement the API endpoints yourself. See the [API Reference](../api-reference/drivers-interface.md) for the required interface.
