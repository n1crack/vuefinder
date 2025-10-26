/**
 * VueFinder Adapter Usage Examples
 * 
 * This file demonstrates how to use the different adapter types
 * with VueFinder.
 */

import { 
  LocalAdapter, 
  CloudAdapter, 
  BaseAdapter, 
  AdapterManager 
} from '../src/adapters';
import type { 
  CloudAdapterUrls, 
  Adapter,
  AdapterManagerConfig,
} from '../src/adapters';
import type { FsData, DirEntry } from '../src/types';

// ============================================================================
// Example 1: Using CloudAdapter
// ============================================================================

const cloudAdapter = new CloudAdapter({
  baseURL: '/api/cloud',
  token: 'your-auth-token',
  url: {
    list: '/api/files',
    upload: '/api/files/upload',
    delete: '/api/files/delete',
    rename: '/api/files/rename',
    zip: '/api/files/zip',
    unzip: '/api/files/unzip',
    createFile: '/api/files/create-file',
    createFolder: '/api/files/create-folder',
    preview: '/api/files/preview',
    download: '/api/files/download',
  },
});

// Example: List files in a directory
async function listFiles() {
  try {
    const data = await cloudAdapter.list({
      storage: 'media',
      path: 'public',
    });
    
    console.log('Files:', data.files);
    console.log('Current directory:', data.dirname);
  } catch (error) {
    console.error('Failed to list files:', error);
  }
}

// Example: Upload files
async function uploadFiles(files: File[]) {
  try {
    const result = await cloudAdapter.upload({
      storage: 'media',
      path: 'public/uploads',
      files: files,
    });
    
    console.log('Uploaded files:', result.files);
  } catch (error) {
    console.error('Failed to upload files:', error);
  }
}

// Example: Delete files
async function deleteFiles(paths: string[]) {
  try {
    const result = await cloudAdapter.delete({
      storage: 'media',
      path: paths,
    });
    
    console.log('Deleted files:', result.deleted);
  } catch (error) {
    console.error('Failed to delete files:', error);
  }
}

// ============================================================================
// Example 2: Using LocalAdapter
// ============================================================================

const localAdapter = new LocalAdapter({
  root: '/my-files',
});

// Note: LocalAdapter requires File System Access API
// implementation is pending for browser-based local file operations

// ============================================================================
// Example 3: Creating a Custom Adapter
// ============================================================================

interface MyStorageConfig {
  endpoint: string;
  apiKey: string;
}

class MyCustomAdapter extends BaseAdapter {
  private config: MyStorageConfig;

  constructor(config: MyStorageConfig) {
    super();
    this.config = config;
  }

  async list(params?: { storage?: string; path?: string }) {
    // Implement your custom list logic
    const response = await fetch(`${this.config.endpoint}/list`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storage: params?.storage,
        path: params?.path,
      }),
    });

    return response.json();
  }

  async upload(params: { storage?: string; path?: string; files: File[] }) {
    // Implement your custom upload logic
    const formData = new FormData();
    params.files.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('path', params.path || '');
    formData.append('storage', params.storage || '');

    const response = await fetch(`${this.config.endpoint}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: formData,
    });

    return response.json();
  }

  // Implement other required methods...
  async delete(params: { storage?: string; path: string[] }) {
    throw new Error('Not implemented');
  }

  async rename(params: { storage?: string; path: string; newName: string }) {
    throw new Error('Not implemented');
  }

  async copy(params: { storage?: string; path: string[]; destination: string }) {
    throw new Error('Not implemented');
  }

  async move(params: { storage?: string; path: string[]; destination: string }) {
    throw new Error('Not implemented');
  }

  async zip(params: { storage?: string; path: string[] }) {
    throw new Error('Not implemented');
  }

  async unzip(params: { storage?: string; path: string[] }) {
    throw new Error('Not implemented');
  }

  async createFile(params: { storage?: string; path: string; name: string }) {
    throw new Error('Not implemented');
  }

  async createFolder(params: { storage?: string; path: string; name: string }) {
    throw new Error('Not implemented');
  }

  getPreviewUrl(params: { storage?: string; path: string }): string {
    return '';
  }

  getDownloadUrl(params: { storage?: string; path: string }): string {
    return '';
  }
}

// Use the custom adapter
const customAdapter = new MyCustomAdapter({
  endpoint: 'https://api.example.com',
  apiKey: 'your-api-key',
});

// ============================================================================
// Example 4: Using adapters with Vue components
// ============================================================================

/**
 * In your Vue component, you would use it like:
 * 
 * <script setup>
 * import { CloudAdapter } from '@vuefinder/adapters';
 * import VueFinder from '@vuefinder/vue';
 * 
 * const adapter = new CloudAdapter({
 *   baseURL: '/api',
 *   token: 'XYZ',
 *   url: {
 *     list: '/api/files',
 *     upload: '/api/upload',
 *     // ... other URLs
 *   }
 * });
 * </script>
 * 
 * <template>
 *   <VueFinder 
 *     :adapter="adapter" 
 *     id="my-finder"
 *   />
 * </template>
 */

// ============================================================================
// Example 5: Using AdapterManager with TanStack Query
// ============================================================================

/**
 * AdapterManager provides enhanced functionality with TanStack Query:
 * - Automatic caching and refetching
 * - Optimistic updates
 * - Error handling and retries
 */

const manager = new AdapterManager(cloudAdapter, {
  refetchOnWindowFocus: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 2,
});

// Using the manager - it automatically caches results
async function listFilesWithCache() {
  const data = await manager.list('media', 'public');
  console.log('Files from cache or fresh fetch:', data);
  
  // Subsequent calls will use cached data if available and not stale
  const cachedData = await manager.list('media', 'public');
  console.log('This might be from cache:', cachedData);
}

// Invalidate and refetch
async function refreshFiles() {
  manager.removeQuery('media', 'public');
  const freshData = await manager.list('media', 'public');
  console.log('Fresh data:', freshData);
}

// Use with Vue composition API
import { useQuery, useMutation } from '@tanstack/vue-query';

// In a Vue component:
// const { data, isLoading, error } = useQuery({
//   queryKey: ['files', storage, path],
//   queryFn: () => manager.list(storage, path),
// });

export {
  cloudAdapter,
  localAdapter,
  customAdapter,
  manager,
  listFiles,
  uploadFiles,
  deleteFiles,
  listFilesWithCache,
  refreshFiles,
};

