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
    // Storage is embedded in the path (e.g., "local://path/to/file")
    const data = await cloudAdapter.list({
      path: 'local://public',
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
      path: 'local://public/uploads', // Storage in path
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
      path: paths, // Paths with storage prefix (e.g., "local://file.txt")
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

  async list(params?: { path?: string }) {
    // Implement your custom list logic
    // Note: storage is embedded in path (e.g., "local://path")
    const response = await fetch(`${this.config.endpoint}/list`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: params?.path,
      }),
    });

    return response.json();
  }

  async upload(params: { path?: string; files: File[] }) {
    // Implement your custom upload logic
    const formData = new FormData();
    params.files.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('path', params.path || '');

    const response = await fetch(`${this.config.endpoint}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: formData,
    });

    return response.json();
  }

  // Implement other required methods (implementation skipped for brevity)...
  async delete() {
    throw new Error('Not implemented');
  }

  async rename() {
    throw new Error('Not implemented');
  }

  async copy() {
    throw new Error('Not implemented');
  }

  async move() {
    throw new Error('Not implemented');
  }

  async zip() {
    throw new Error('Not implemented');
  }

  async unzip() {
    throw new Error('Not implemented');
  }

  async createFile() {
    throw new Error('Not implemented');
  }

  async createFolder() {
    throw new Error('Not implemented');
  }

  getPreviewUrl() {
    return '';
  }

  getDownloadUrl() {
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
  // Optional: Add callbacks for state updates (useful in VueFinder)
  // onBeforeOpen: () => { /* set loading state */ },
  // onAfterOpen: (data) => { /* update state */ },
});

// Using the manager - it automatically caches results
async function listFilesWithCache() {
  // Path includes storage (e.g., "local://public")
  const data = await manager.list('local://public');
  console.log('Files from cache or fresh fetch:', data);
  
  // Subsequent calls will use cached data if available and not stale
  const cachedData = await manager.list('local://public');
  console.log('This might be from cache:', cachedData);
  
  return data;
}

// Using open() to fetch and update state (if callbacks are set)
async function openPath() {
  // open() calls onAfterOpen callback if provided
  const data = await manager.open('local://public');
  console.log('Opened path:', data);
  
  return data;
}

// Invalidate and refetch
async function refreshFiles() {
  manager.removeQuery('local://public');
  const freshData = await manager.list('local://public');
  console.log('Fresh data:', freshData);
  
  return freshData;
}

// Use with Vue composition API
// In a Vue component:
// import { useQuery } from '@tanstack/vue-query';
// const { data, isLoading, error } = useQuery({
//   queryKey: ['files', path],
//   queryFn: () => manager.list(path),
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
  openPath,
  refreshFiles,
};

