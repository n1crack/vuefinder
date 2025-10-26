<script setup lang="ts">
import { ref } from 'vue';
import { CloudAdapter, AdapterManager } from '../../src/adapters';
import type { FsData } from '../../src/types';

interface Props {
  request: Record<string, unknown>;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

const props = defineProps<Props>();

// Example adapter configuration
const adapter = ref<CloudAdapter | null>(null);
const adapterManager = ref<AdapterManager | null>(null);
const adapterStatus = ref<string>('Not initialized');
const testResults = ref<Array<{type: string, message: string, timestamp: string}>>([]);
const files = ref<Array<{basename: string, path: string, type: string}>>([]);

// Initialize adapter
const initAdapter = () => {
  try {
    adapter.value = new CloudAdapter({
      baseURL: 'http://inertia-vuefinder.test/vuefinder',
      token: 'test-token',
      url: {
        list: '',
        upload: '',
        delete: '',
        rename: '',
        zip: '',
        unzip: '',
        createFile: '',
        createFolder: '',
        preview: 'preview',
        download: 'download'
      }
    });

    adapterManager.value = new AdapterManager(adapter.value, {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: 2,
    });

    adapterStatus.value = 'Initialized successfully';
    addTestLog('Adapter initialized', 'success');
  } catch (error) {
    adapterStatus.value = `Error: ${(error as Error).message}`;
    addTestLog(`Error initializing adapter: ${(error as Error).message}`, 'error');
  }
};

// Test list method
const testList = async () => {
  if (!adapter.value) {
    addTestLog('Please initialize adapter first', 'error');
    return;
  }

  try {
    addTestLog('Testing list()...', 'info');
    const data = await adapter.value.list({ 
      storage: 'default',
      path: '' 
    });
    
    files.value = data.files;
    addTestLog(`List successful - ${data.files.length} items found`, 'success');
    
    // Log some file info
    if (data.files.length > 0) {
      addTestLog(`Sample file: ${data.files[0].basename}`, 'info');
    }
  } catch (error) {
    addTestLog(`List failed: ${(error as Error).message}`, 'error');
  }
};

// Test with AdapterManager
const testManagerList = async () => {
  if (!adapterManager.value) {
    addTestLog('Please initialize adapter manager first', 'error');
    return;
  }

  try {
    addTestLog('Testing manager.list()...', 'info');
    const data = await adapterManager.value.list('default', '');
    
    files.value = data.files;
    addTestLog(`Manager list successful - ${data.files.length} items found (with caching)`, 'success');
  } catch (error) {
    addTestLog(`Manager list failed: ${(error as Error).message}`, 'error');
  }
};

// Test preview URL
const testPreviewUrl = () => {
  if (!adapter.value) {
    addTestLog('Please initialize adapter first', 'error');
    return;
  }

  try {
    const testPath = 'test/file.jpg';
    const url = adapter.value.getPreviewUrl({ path: testPath });
    addTestLog(`Preview URL: ${url}`, 'success');
  } catch (error) {
    addTestLog(`Preview URL failed: ${(error as Error).message}`, 'error');
  }
};

// Test download URL
const testDownloadUrl = () => {
  if (!adapter.value) {
    addTestLog('Please initialize adapter first', 'error');
    return;
  }

  try {
    const testPath = 'test/file.pdf';
    const url = adapter.value.getDownloadUrl({ path: testPath });
    addTestLog(`Download URL: ${url}`, 'success');
  } catch (error) {
    addTestLog(`Download URL failed: ${(error as Error).message}`, 'error');
  }
};

// Add test log
const addTestLog = (message: string, type: string) => {
  testResults.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString()
  });
  
  // Keep only last 50 logs
  if (testResults.value.length > 50) {
    testResults.value = testResults.value.slice(0, 50);
  }
};

// Clear logs
const clearLogs = () => {
  testResults.value = [];
};

// Reset adapter
const resetAdapter = () => {
  adapter.value = null;
  adapterManager.value = null;
  adapterStatus.value = 'Not initialized';
  files.value = [];
  addTestLog('Adapter reset', 'info');
};
</script>

<template>
  <div style="margin: 20px 0;">
    <h2>Adapter API Development Example</h2>
    <p>This is a temporary example for developing and testing the new Adapter API.</p>
    
    <!-- Status panel -->
    <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
      <h3>Adapter Status</h3>
      <div style="margin: 10px 0;">
        <strong>Status:</strong> <span :style="{ color: adapterStatus.includes('Error') ? '#f44336' : '#4caf50' }">{{ adapterStatus }}</span>
      </div>
      <div style="margin: 10px 0;">
        <strong>Adapter Instance:</strong> {{ adapter ? '✓ Created' : '✗ Not created' }}
      </div>
      <div style="margin: 10px 0;">
        <strong>Adapter Manager:</strong> {{ adapterManager ? '✓ Created' : '✗ Not created' }}
      </div>
      <div style="margin: 10px 0;">
        <strong>Files Found:</strong> {{ files.length }} items
      </div>
    </div>

    <!-- Controls -->
    <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-radius: 5px; border-left: 4px solid #2196f3;">
      <h3>Controls</h3>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
        <button class="btn" @click="initAdapter" style="background: #4caf50; color: white;">
          Initialize Adapter
        </button>
        <button class="btn" @click="testList" :disabled="!adapter" style="background: #2196f3; color: white;">
          Test List()
        </button>
        <button class="btn" @click="testManagerList" :disabled="!adapterManager" style="background: #9c27b0; color: white;">
          Test Manager.list()
        </button>
        <button class="btn" @click="testPreviewUrl" :disabled="!adapter" style="background: #ff9800; color: white;">
          Test Preview URL
        </button>
        <button class="btn" @click="testDownloadUrl" :disabled="!adapter" style="background: #009688; color: white;">
          Test Download URL
        </button>
        <button class="btn" @click="resetAdapter" style="background: #f44336; color: white;">
          Reset
        </button>
      </div>
    </div>

    <!-- Files list -->
    <div v-if="files.length" style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
      <h3>Files ({{ files.length }})</h3>
      <div style="max-height: 300px; overflow-y: auto;">
        <div v-for="file in files.slice(0, 10)" :key="file.path" style="padding: 5px; background: white; margin: 2px 0; border-radius: 3px;">
          <span :style="{ fontWeight: file.type === 'dir' ? 'bold' : 'normal' }">
            {{ file.type === 'dir' ? '📁' : '📄' }} {{ file.basename }}
          </span>
          <small style="color: #666; margin-left: 10px;">{{ file.path }}</small>
        </div>
        <div v-if="files.length > 10" style="color: #666; font-style: italic; padding: 5px;">
          ... and {{ files.length - 10 }} more
        </div>
      </div>
    </div>

    <!-- Test Log -->
    <div style="margin: 20px 0; padding: 15px; background: #fff3e0; border-radius: 5px; border-left: 4px solid #ff9800;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3>Test Log ({{ testResults.length }} entries)</h3>
        <button class="btn" @click="clearLogs" :disabled="!testResults.length" style="padding: 5px 10px;">
          Clear Log
        </button>
      </div>
      <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: #f9f9f9; border-radius: 3px;">
        <div v-if="!testResults.length" style="text-align: center; color: #666; font-style: italic;">
          No logs yet. Click a button to start testing.
        </div>
        <div v-for="(log, index) in testResults" :key="index" 
             :style="{
               marginBottom: '5px',
               padding: '8px',
               background: 'white',
               borderRadius: '3px',
               borderLeft: `4px solid ${
                 log.type === 'success' ? '#4caf50' :
                 log.type === 'error' ? '#f44336' :
                 log.type === 'info' ? '#2196f3' : '#666'
               }`
             }">
          <strong>{{ log.timestamp }}</strong>
          <span style="margin-left: 10px;">{{ log.message }}</span>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div style="margin: 20px 0; padding: 15px; background: #f3e5f5; border-radius: 5px; border-left: 4px solid #9c27b0;">
      <h3>Development Instructions</h3>
      <ol>
        <li>Click "Initialize Adapter" to create a CloudAdapter instance</li>
        <li>Test individual adapter methods</li>
        <li>Test the AdapterManager wrapper (with caching)</li>
        <li>Check the test log for results</li>
        <li>Modify this component to test other adapter features</li>
      </ol>
      <div style="margin-top: 15px;">
        <strong>Note:</strong> You can edit this file at <code>examples/examples/AdapterExample.vue</code> to test different adapter configurations and methods.
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
}

.btn:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}
</style>

