# VueFinder Adapter API

## Overview

The VueFinder Adapter API provides a flexible system for handling file operations across different environments (local filesystem and cloud storage). The API is built around adapter classes that encapsulate all file operations.

## Architecture

- **BaseAdapter**: Abstract base class with common utilities
- **LocalAdapter**: For local filesystem operations (requires File System Access API)
- **CloudAdapter**: For cloud storage via HTTP requests
- **AdapterManager**: Wrapper with TanStack Query for enhanced functionality (caching, optimistic updates, etc.)

## Basic Usage

### Using CloudAdapter

```typescript
import { CloudAdapter } from '@vuefinder/adapters';

const adapter = new CloudAdapter({
  baseURL: '/api/cloud',
  token: 'your-auth-token',
  url: {
    list: '/api/files',
    upload: '/api/files/upload',
    delete: '/api/files/delete',
    rename: '/api/files/rename',
    archive: '/api/files/archive',
    unarchive: '/api/files/unarchive',
    createFile: '/api/files/create-file',
    createFolder: '/api/files/create-folder',
    preview: '/api/files/preview',
    download: '/api/files/download'
  }
});

// Use the adapter
const files = await adapter.list({ storage: 'media', path: 'public' });
```

### Using LocalAdapter

```typescript
import { LocalAdapter } from '@vuefinder/adapters';

const adapter = new LocalAdapter({
  root: '/my-files'
});

// Note: Requires File System Access API implementation
const files = await adapter.list({ path: '/documents' });
```

### Using AdapterManager (with TanStack Query)

```typescript
import { CloudAdapter, AdapterManager } from '@vuefinder/adapters';

// Create an adapter
const adapter = new CloudAdapter({
  baseURL: '/api/cloud',
  token: 'your-token',
  url: { /* ... */ }
});

// Wrap with AdapterManager for enhanced features
const manager = new AdapterManager(adapter, {
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
});

// Use the manager (automatic caching)
const files = await manager.list('media', 'public');

// Cache manipulation
manager.removeQuery('media', 'public'); // Remove from cache
manager.clearCache(); // Clear all caches
```

## Creating Custom Adapters

Extend the `BaseAdapter` class to create your own adapter:

```typescript
import { BaseAdapter } from '@vuefinder/adapters';
import type { 
  FsData, 
  UploadResult, 
  DeleteResult, 
  FileOperationResult 
} from '@vuefinder/adapters';

class MyCustomAdapter extends BaseAdapter {
  async list(params?: { storage?: string; path?: string }): Promise<FsData> {
    // Your implementation
  }

  async upload(params: { storage?: string; path?: string; files: File[] }): Promise<UploadResult> {
    // Your implementation
  }

  // ... implement other required methods
}
```

## API Methods

All adapters implement the following methods:

### list(params?)
- **Purpose**: List files and folders at a given path
- **Returns**: `Promise<FsData>`

### upload(params)
- **Purpose**: Upload files to a given path
- **Returns**: `Promise<UploadResult>`

### delete(params)
- **Purpose**: Delete files/folders
- **Returns**: `Promise<DeleteResult>`

### rename(params)
- **Purpose**: Rename a file or folder
- **Returns**: `Promise<FileOperationResult>`

### copy(params)
- **Purpose**: Copy files/folders to a destination
- **Returns**: `Promise<FileOperationResult>`

### move(params)
- **Purpose**: Move files/folders to a destination
- **Returns**: `Promise<FileOperationResult>`

### archive(params)
- **Purpose**: Create a zip archive from files/folders
- **Returns**: `Promise<FileOperationResult>`

### unarchive(params)
- **Purpose**: Extract files from a zip archive
- **Returns**: `Promise<FileOperationResult>`

### createFile(params)
- **Purpose**: Create a new file
- **Returns**: `Promise<FileOperationResult>`

### createFolder(params)
- **Purpose**: Create a new folder
- **Returns**: `Promise<FileOperationResult>`

### getPreviewUrl(params)
- **Purpose**: Get preview URL for a file
- **Returns**: `string`

### getDownloadUrl(params)
- **Purpose**: Get download URL for a file
- **Returns**: `string`

## Integration with VueFinder

```vue
<script setup>
import VueFinder from '@vuefinder/vue';
import { CloudAdapter, AdapterManager } from '@vuefinder/adapters';

const adapter = new CloudAdapter({ /* ... */ });
const manager = new AdapterManager(adapter);
</script>

<template>
  <VueFinder 
    :adapter="manager"
    id="my-finder"
  />
</template>
```

## Features

### CloudAdapter
- ✅ Full implementation of all adapter methods
- ✅ HTTP requests with authentication
- ✅ Error handling
- ✅ TypeScript support

### LocalAdapter
- ⏳ Pending implementation (requires File System Access API)
- Structure ready for implementation

### AdapterManager
- ✅ Automatic caching with TanStack Query
- ✅ Optimistic updates
- ✅ Error handling and retries
- ✅ Cache invalidation
- ✅ Prefetching support

## Error Handling

All adapters throw `AdapterError` for operation failures:

```typescript
try {
  const result = await adapter.list({ storage: 'media', path: '/invalid' });
} catch (error) {
  if (error instanceof AdapterError) {
    console.error(error.code, error.message);
  }
}
```

## Next Steps

The adapter classes are now ready. Future steps include:

1. Integration with VueFinder component
2. Implementation of local adapter operations
3. Testing and validation
4. Documentation and examples

