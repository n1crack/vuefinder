<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RemoteDriver, LocalDriver } from '../src/adapters';
import MemoryExample from './examples/MemoryExample.vue';
import type { DirEntry } from '../src/types';

// Import example components
import DefaultExample from './examples/DefaultExample.vue';
import ExternalSelectExample from './examples/ExternalSelectExample.vue';
import ContextmenuExample from './examples/ContextmenuExample.vue';
import CustomIconsExample from './examples/CustomIconsExample.vue';
import WindowExamplesExample from './examples/WindowExamplesExample.vue';
import EventsDemoExample from './examples/EventsDemoExample.vue';
import CustomDclickExample from './examples/CustomDclickExample.vue';
import SingleSelectionExample from './examples/SingleSelectionExample.vue';
import SelectionFilterExample from './examples/SelectionFilterExample.vue';
import FeaturesExample from './examples/FeaturesExample.vue';

const example = ref('default');

// Create remote driver instance
const remoteDriver = new RemoteDriver({
  baseURL: 'http://inertia-vuefinder.test/api/files',
  token: '', // Add your auth token here if needed
  url: {
    list: '', // GET /api/files
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

// Create in-memory LocalDriver instance (paths use memory:// scheme)
const memoryFiles = ref<DirEntry[]>([
  {
    storage: 'memory',
    dir: 'memory://',
    basename: 'docs',
    extension: '',
    path: 'memory://docs',
    type: 'dir',
    file_size: null,
    last_modified: Date.now(),
    mime_type: null,
    visibility: 'public',
  },
  {
    storage: 'memory',
    dir: 'memory://docs',
    basename: 'readme.txt',
    extension: 'txt',
    path: 'memory://docs/readme.txt',
    type: 'file',
    file_size: 12,
    last_modified: Date.now(),
    mime_type: 'text/plain',
    visibility: 'public',
  },
]);
const localDriver = new LocalDriver({ files: memoryFiles, storage: 'memory' });

const driver = ref(remoteDriver as any);

const examples = {
  default: 'Inline select button example',
  localDriver: 'In-memory LocalDriver (no REST)',
  externalSelect: 'External select example',
  contextmenu: 'Custom context menu example',
  customIcons: 'Custom Icons (Scoped Slot)',
  windowExamples: 'Window Examples (Exit Menu Demo)',
  eventsDemo: 'Events Demo - All VueFinder Events',
  customDclick: 'Custom Double-Click Events Demo',
  singleSelection: 'Single Selection Mode Demo',
  selectionFilter: 'Selection Filter Demo',
  features: 'Features Configuration Demo',
};

// Theme management
const currentTheme = ref('light');
const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'latte', label: 'Latte' },
  { value: 'rose', label: 'Rose' },
  { value: 'mythril', label: 'Mythril' },
  { value: 'lime', label: 'Dark Lime' },
  { value: 'sky', label: 'Sky' },
  { value: 'ocean', label: 'Oceanic' },
  { value: 'palenight', label: 'Palenight' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'code', label: 'Code' },
];

// Check if we're in a popup window
const isPopup = ref(false);

const maxFileSize = ref('500MB');

// Use "advanced" preset to enable all features (or undefined for default)
const features = 'advanced';

const config = {
  maxFileSize: maxFileSize,
};

const handlePathChange = (path: string) => {
  console.log('handlePathChange called with path:', path);
};

// Listen messages from popup
const handleMessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'filesSelected') {
    console.log(
      'Selection completed:',
      Array.isArray(event.data.files) ? event.data.files.length : 0
    );
    if (event.source && 'postMessage' in event.source) {
      (event.source as Window).postMessage({ type: 'filesReceived' }, '*');
    }
  }
};

onMounted(() => {
  isPopup.value = new URLSearchParams(window.location.search).get('popup') === 'true';
  window.addEventListener('message', handleMessage);
  if (isPopup.value && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'popupReady' }, '*');
  }
});

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<template>
  <div class="wrapper">
    <!-- Show example selector only if not in popup -->
    <div v-if="!isPopup">
      <label for="example"> Example </label>
      <div>
        <select id="example" v-model="example">
          <option v-for="(name, key) in examples" :key="key" :value="key">{{ name }}</option>
        </select>
      </div>

      <div style="font-weight: bold; padding: 10px">{{ examples[example] }}</div>

      <!-- Theme Selector -->
      <div style="margin-top: 1rem; margin-bottom: 1rem">
        <label for="theme"> Theme </label>
        <div>
          <select id="theme" v-model="currentTheme">
            <option v-for="theme in themes" :key="theme.value" :value="theme.value">
              {{ theme.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Popup mode: Show only VueFinder -->
    <div v-if="isPopup">
      <WindowExamplesExample
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />
    </div>

    <!-- Regular examples (only show if not in popup) -->
    <div v-if="!isPopup" class="flex max-h-120 min-h-80 flex-col [&>*]:h-full [&>*]:flex-1">
      <DefaultExample
        v-if="example === 'default'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
        :on-path-change="handlePathChange"
      />

      <ExternalSelectExample
        v-if="example === 'externalSelect'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <ContextmenuExample
        v-if="example === 'contextmenu'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <CustomIconsExample
        v-if="example === 'customIcons'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <WindowExamplesExample
        v-if="example === 'windowExamples'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <EventsDemoExample
        v-if="example === 'eventsDemo'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <CustomDclickExample
        v-if="example === 'customDclick'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <SingleSelectionExample
        v-if="example === 'singleSelection'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <SelectionFilterExample
        v-if="example === 'selectionFilter'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <FeaturesExample
        v-if="example === 'features'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
      />

      <!-- LocalDriver demo uses a separate instance id to avoid persisted state collisions -->
      <MemoryExample
        v-if="example === 'localDriver'"
        :driver="localDriver"
        :config="{ ...config, theme: currentTheme, initialPath: 'memory://', persist: false }"
        :features="features"
      />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  max-width: 1200px;
  margin: 40px auto;
}

.btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.btn:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary:disabled {
  background: #ccc !important;
  color: white !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}
</style>
