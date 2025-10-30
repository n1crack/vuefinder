# VueFinder Adapter API

## Overview

The VueFinder Adapter API provides a flexible system for handling file operations across different environments (local filesystem and cloud storage). Adapters handle all file operations (HTTP requests or local filesystem), and VueFinder components only need the adapter instance.

**Key Features:**

- ✅ Storage information embedded in paths (e.g., `local://path/to/file`)
- ✅ Optional uploader customization (Uppy plugins: XHR, S3, Tus, etc.)
- ✅ TanStack Query integration for caching and optimistic updates
- ✅ Backend-agnostic architecture

## Architecture

- **Adapter**: Interface that all adapters must implement
- **BaseAdapter**: Abstract base class with common utilities
- **CloudAdapter**: HTTP-based operations for backend APIs
- **LocalAdapter**: Browser-based filesystem operations (File System Access API)
- **AdapterManager**: Wraps adapters with TanStack Query (caching, optimistic updates, etc.)

## Path Format

All paths include storage information in the format: `storage_name://path/to/file`

Examples:

- `local://public/uploads/image.jpg`
- `media://documents/file.pdf`
- `s3://bucket-name/folder/file.txt`

## Basic Usage

### Using CloudAdapter

```typescript
import { CloudAdapter } from '@vuefinder/adapters';

const adapter = new CloudAdapter({
  baseURL: 'http://localhost/api',
  token: 'your-auth-token',
  url: {
    list: '/api/files',
    upload: '/api/files/upload',
    delete: '/api/files/delete',
    rename: '/api/files/rename',
    copy: '/api/files/copy',
    move: '/api/files/move',
    archive: '/api/files/archive',
    unarchive: '/api/files/unarchive',
    createFile: '/api/files/create-file',
    createFolder: '/api/files/create-folder',
    preview: '/api/files/preview',
    download: '/api/files/download',
    search: '/api/files/search', // Optional
    save: '/api/files/save', // Optional
  },
  headers: {
    'X-Custom-Header': 'value',
  },
});

// List files (storage embedded in path)
const data = await adapter.list({ path: 'local://public' });
console.log('Files:', data.files);
console.log('Directory:', data.dirname);

// Upload files
const result = await adapter.upload({
  path: 'local://public/uploads',
  files: [file1, file2],
});

// Delete files
const deleted = await adapter.delete({
  items: [
    { path: 'local://public/file1.txt', type: 'file' },
    { path: 'local://public/file2.txt', type: 'file' },
  ],
});

// Rename file
const renamed = await adapter.rename({
  path: 'local://public',
  item: 'old-name.txt',
  name: 'new-name.txt',
});

// Copy files
const copied = await adapter.copy({
  sources: ['local://public/file1.txt'],
  destination: 'local://backup',
});

// Move files
const moved = await adapter.move({
  sources: ['local://public/file1.txt'],
  destination: 'local://archive',
});

// Search files
const results = await adapter.search({
  path: 'local://public',
  filter: 'invoice',
  deep: true,
  size: 'small',
});
```

### Using LocalAdapter

```typescript
import { LocalAdapter } from '@vuefinder/adapters';

const adapter = new LocalAdapter({
  root: '/my-files',
});

// Note: LocalAdapter requires File System Access API
// Currently returns "not yet implemented" errors
```

### Using AdapterManager (with TanStack Query)

```typescript
import { CloudAdapter, AdapterManager } from '@vuefinder/adapters';

const adapter = new CloudAdapter({
  /* ... */
});

// Wrap with AdapterManager for caching and optimistic updates
const manager = new AdapterManager(adapter, {
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
  onBeforeOpen: () => {
    // Set loading state
    console.log('Loading...');
  },
  onAfterOpen: (data) => {
    // Update UI state
    console.log('Loaded:', data.files.length, 'files');
  },
});

// List with automatic caching
const data = await manager.list('local://public');

// Open path and update state (if callbacks provided)
const opened = await manager.open('local://public');

// Invalidate cache
manager.invalidateListQueries();
manager.clearCache();
```

## Uploader Configuration

CloudAdapter provides a built-in Uppy uploader configuration. You can also use custom uploaders:

### Using CloudAdapter (Automatic XHR)

```typescript
const adapter = new CloudAdapter({
  baseURL: '/api',
  url: { upload: '/api/files/upload' },
});

// CloudAdapter automatically configures Uppy with XHR plugin
// File field: 'file'
// Path metadata: automatically set
```

### Custom Uploader (S3, Tus, etc.)

```typescript
// Option 1: In Vue component
<VueFinder
  :adapter="adapter"
  :customUploader="(uppy, context) => {
    // Use any Uppy plugin
    uppy.use(AwsS3, {
      async getUploadParameters(file) {
        const res = await fetch('/api/presign', {
          method: 'POST',
          body: JSON.stringify({
            path: context.getTargetPath(),
            name: file.name,
            type: file.type,
          }),
        });
        return await res.json();
      },
    });
  }"
/>

// Option 2: In adapter
class MyS3Adapter extends BaseAdapter {
  configureUploader(uppy, context) {
    uppy.use(AwsS3, { /* ... */ });
  }

  // ... other methods
}
```

### Uploader Priority

1. `customUploader` prop (highest priority)
2. `adapter.configureUploader()` method
3. Default XHR (if neither provided)

## Creating Custom Adapters

Extend the `BaseAdapter` class to create your own adapter:

```typescript
import { BaseAdapter } from '@vuefinder/adapters';
import type { FsData, UploadResult, DeleteResult, FileOperationResult } from '@vuefinder/adapters';
import type Uppy from '@uppy/core';
import type { UploaderContext } from '@vuefinder/adapters';

class MyCustomAdapter extends BaseAdapter {
  private config: { endpoint: string; apiKey: string };

  constructor(config: MyCustomAdapter) {
    super();
    this.config = config;
  }

  // Optional: Customize uploader
  configureUploader(uppy: Uppy, context: UploaderContext) {
    // Use S3, Tus, or other Uppy plugins
    uppy.use(Tus, { endpoint: 'https://tus.server/files' });
  }

  async list(params?: { path?: string }): Promise<FsData> {
    const response = await fetch(`${this.config.endpoint}/list`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({ path: params?.path }),
    });
    return response.json();
  }

  async upload(params: { path?: string; files: File[] }): Promise<UploadResult> {
    const formData = new FormData();
    params.files.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('path', params.path || '');

    const response = await fetch(`${this.config.endpoint}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: formData,
    });
    return response.json();
  }

  // Implement other required methods...
}
```

## API Methods

All adapters implement the following methods:

### list(params?)

- **Purpose**: List files and folders at a given path
- **Params**: `{ path?: string }` - Storage embedded in path (e.g., `local://public`)
- **Returns**: `Promise<FsData>` - `{ files, dirname, storages, read_only }`

### upload(params)

- **Purpose**: Upload files to a given path
- **Params**: `{ path?: string; files: File[] }` - Path includes storage prefix
- **Returns**: `Promise<UploadResult>` - `{ files }`

### delete(params)

- **Purpose**: Delete files/folders
- **Params**: `{ items: { path: string; type: string }[] }` - Paths include storage prefix
- **Returns**: `Promise<DeleteResult>` - `{ deleted }`

### rename(params)

- **Purpose**: Rename a file or folder
- **Params**: `{ path: string; item: string; name: string }`
- **Returns**: `Promise<FileOperationResult>`

### copy(params)

- **Purpose**: Copy files/folders to a destination
- **Params**: `{ sources: string[]; destination: string }` - Storage embedded in all paths
- **Returns**: `Promise<FileOperationResult>`

### move(params)

- **Purpose**: Move files/folders to a destination
- **Params**: `{ sources: string[]; destination: string }` - Storage embedded in all paths
- **Returns**: `Promise<FileOperationResult>`

### archive(params)

- **Purpose**: Create a zip archive from files/folders
- **Params**: `{ items: { path: string; type: string }[]; path: string; name: string }`
- **Returns**: `Promise<FileOperationResult>`

### unarchive(params)

- **Purpose**: Extract files from a zip archive
- **Params**: `{ item: string; path: string }`
- **Returns**: `Promise<FileOperationResult>`

### search(params)

- **Purpose**: Search for files
- **Params**: `{ path?: string; filter: string; deep?: boolean; size?: 'all'|'small'|'medium'|'large' }`
- **Returns**: `Promise<DirEntry[]>` - Array of matching files

### save(params)

- **Purpose**: Save text/binary content to a file
- **Params**: `{ path: string; content: string }` - Full path including storage
- **Returns**: `Promise<string>` - Success message

### createFile(params)

- **Purpose**: Create a new file
- **Params**: `{ path: string; name: string }`
- **Returns**: `Promise<FileOperationResult>`

### createFolder(params)

- **Purpose**: Create a new folder
- **Params**: `{ path: string; name: string }`
- **Returns**: `Promise<FileOperationResult>`

### getPreviewUrl(params)

- **Purpose**: Get preview URL for a file
- **Params**: `{ path: string }`
- **Returns**: `string` - Full URL

### getDownloadUrl(params)

- **Purpose**: Get download URL for a file
- **Params**: `{ path: string }`
- **Returns**: `string` - Full URL

## Integration with VueFinder

### Basic Usage

```vue
<script setup>
import VueFinder from '@vuefinder/vue';
import { CloudAdapter, AdapterManager } from '@vuefinder/adapters';

const adapter = new CloudAdapter({
  baseURL: '/api',
  token: 'your-token',
  url: {
    list: '/api/files',
    upload: '/api/files/upload',
    // ... other endpoints
  },
});

// Adapter is automatically wrapped with AdapterManager
</script>

<template>
  <VueFinder :adapter="adapter" id="my-finder" />
</template>
```

### With Custom Uploader (S3)

```vue
<script setup>
import VueFinder from '@vuefinder/vue';
import { CloudAdapter } from '@vuefinder/adapters';
import AwsS3 from '@uppy/aws-s3';

const adapter = new CloudAdapter({
  /* ... */
});

const customUploader = (uppy, context) => {
  uppy.use(AwsS3, {
    async getUploadParameters(file) {
      const res = await fetch('/api/presign', {
        method: 'POST',
        body: JSON.stringify({
          path: context.getTargetPath(),
          name: file.name,
          type: file.type,
        }),
      });
      return await res.json();
    },
  });
};
</script>

<template>
  <VueFinder :adapter="adapter" :customUploader="customUploader" id="my-finder" />
</template>
```

## Current Status

### CloudAdapter

- ✅ Fully implemented
- ✅ HTTP requests with authentication
- ✅ Uploader configuration (XHR)
- ✅ Search and save methods
- ✅ TypeScript support

### LocalAdapter

- ⏳ Structure ready, operations pending
- Requires File System Access API implementation
- Search and save stubs added

### AdapterManager

- ✅ Automatic caching with TanStack Query
- ✅ Optimistic updates
- ✅ Error handling and retries
- ✅ Cache invalidation
- ✅ State update callbacks (`onBeforeOpen`, `onAfterOpen`)

## Type Definitions

```typescript
// All adapters implement
interface Adapter {
  configureUploader?: (uppy: Uppy, context: UploaderContext) => void;
  list(params?: { path?: string }): Promise<FsData>;
  upload(params: { path?: string; files: File[] }): Promise<UploadResult>;
  delete(params: { items: { path: string; type: string }[] }): Promise<DeleteResult>;
  rename(params: { path: string; item: string; name: string }): Promise<FileOperationResult>;
  copy(params: { sources: string[]; destination: string }): Promise<FileOperationResult>;
  move(params: { sources: string[]; destination: string }): Promise<FileOperationResult>;
  archive(params: ArchiveParams): Promise<FileOperationResult>;
  unarchive(params: { item: string; path: string }): Promise<FileOperationResult>;
  search(params: SearchParams): Promise<DirEntry[]>;
  save(params: { path: string; content: string }): Promise<string>;
  createFile(params: { path: string; name: string }): Promise<FileOperationResult>;
  createFolder(params: { path: string; name: string }): Promise<FileOperationResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  getContent(params: { path: string }): Promise<FileContentResult>;
}
```

For more examples, see [`examples/adapters-usage.ts`](../examples/adapters-usage.ts).
