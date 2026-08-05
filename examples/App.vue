<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useVueFinder } from '../src';
import { RemoteDriver, ArrayDriver, IndexedDBDriver } from '../src/adapters';
import MemoryExample from './examples/MemoryExample.vue';
import IndexedDBExample from './examples/IndexedDBExample.vue';
import type { DirEntry, NotifyPayload, VueFinderComposable } from '../src/types';

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
import UIVisibilityExample from './examples/UIVisibilityExample.vue';
import MenuBarCustomizationExample from './examples/MenuBarCustomizationExample.vue';
import ItemSizeExample from './examples/ItemSizeExample.vue';
import MultilangExample from './examples/MultilangExample.vue';
import ComposableApiExample from './examples/ComposableApiExample.vue';

const example = ref('default');

// Watch for changes and save to localStorage
watch(example, (newValue) => {
  localStorage.setItem('vuefinder-example', newValue);
});

// Create remote driver instance
const remoteDriver = new RemoteDriver({
  baseURL: 'http://vuefinder-api-php.test/api/files',
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

// Create in-memory ArrayDriver instance (paths use memory:// scheme)
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
const arrayDriver = new ArrayDriver({ files: memoryFiles, storage: 'memory' });

// Generate 50k folders in root for performance demo
function generateLargeDataset(): DirEntry[] {
  const files: DirEntry[] = [];
  const storage = 'performance';
  const baseTime = Date.now();
  
  // Create 50k folders in root
  for (let i = 0; i < 50000; i++) {
    const folderName = `folder-${String(i).padStart(5, '0')}`;
    files.push({
      storage,
      dir: `${storage}://`,
      basename: folderName,
      extension: '',
      path: `${storage}://${folderName}`,
      type: 'dir',
      file_size: null,
      last_modified: baseTime - Math.random() * 86400000 * 30,
      mime_type: null,
      visibility: 'public',
    });
  }
  
  return files;
}

// Create performance demo ArrayDriver with 50k items
const performanceFiles: DirEntry[] = generateLargeDataset();
const performanceDriver: ArrayDriver = new ArrayDriver({ files: performanceFiles, storage: 'performance' });

// Create IndexedDB driver instance (persists to browser IndexedDB)
const indexedDBDriver = new IndexedDBDriver({
  dbName: 'vuefinder-example',
  storage: 'indexeddb',
});

const driver = ref(remoteDriver as any);

const examples = {
  default: 'Inline select button example',
  notifications: 'Notifications Demo (@notify + toast settings)',
  composableApi: 'Composable API Demo (useVueFinder)',
  arrayDriver: 'In-memory ArrayDriver (no REST)',
  performanceDemo: 'Performance Demo - 50k Items (ArrayDriver)',
  indexedDB: 'IndexedDB Driver (persistent)',
  externalSelect: 'External select example',
  contextmenu: 'Custom context menu example',
  customIcons: 'Custom Icons (Scoped Slot)',
  windowExamples: 'Window Examples (Exit Menu Demo)',
  eventsDemo: 'Events Demo - All VueFinder Events',
  customDclick: 'Custom Double-Click Events Demo',
  singleSelection: 'Single Selection Mode Demo',
  selectionFilter: 'Selection Filter Demo',
  features: 'Features Configuration Demo',
  uiVisibility: 'UI Visibility Settings Demo',
  menuBarCustomization: 'MenuBar Customization (Slots Demo)',
  itemSize: 'Item Size & Spacing Configuration',
  multilang: 'Multilang File Manager Demo',
};

// Theme management
const currentTheme = ref('silver');
const themes = [
  { value: 'silver', label: 'Silver' },
  { value: 'valorite', label: 'Valorite' },
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
const notificationsEnabled = ref(true);
const notificationPosition = ref<
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
>('bottom-center');
const notificationDuration = ref(3000);
const notificationVisibleToasts = ref(4);
const notificationRichColors = ref(true);
const notifyEvents = ref<Array<NotifyPayload & { at: string }>>([]);
const notifyFinder = ref<VueFinderComposable | null>(null);

// Use "advanced" preset to enable all features (or undefined for default)
const features = 'advanced';

const config = computed(() => ({
  maxFileSize: maxFileSize.value,
  notificationsEnabled: notificationsEnabled.value,
  notificationPosition: notificationPosition.value,
  notificationDuration: Number(notificationDuration.value) || 3000,
  notificationVisibleToasts: Number(notificationVisibleToasts.value) || 4,
  notificationRichColors: notificationRichColors.value,
}));

const handlePathChange = (path: string) => {
  console.log('handlePathChange called with path:', path);
};

const handleNotify = (payload: NotifyPayload) => {
  notifyEvents.value.unshift({
    ...payload,
    at: new Date().toLocaleTimeString(),
  });
  notifyEvents.value = notifyEvents.value.slice(0, 20);
};

const clearNotifyEvents = () => {
  notifyEvents.value = [];
};

const initNotifyFinder = () => {
  if (notifyFinder.value) return;
  try {
    notifyFinder.value = useVueFinder('notify_demo_vuefinder');
  } catch {
    // The example finder might not be mounted yet.
  }
};

const testNotification = () => {
  notifyFinder.value?.notify('success', 'Test notification from composable API');
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
  
  // Load saved example preference (only if not in popup mode)
  if (!isPopup.value) {
    const savedExample = localStorage.getItem('vuefinder-example');
    if (savedExample && examples[savedExample as keyof typeof examples]) {
      example.value = savedExample;
    }
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
    <div v-if="!isPopup" class="flex max-h-120 min-h-80 flex-col">
      <DefaultExample
        v-if="example === 'default'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
        :on-path-change="handlePathChange"
      />

      <div v-if="example === 'notifications'" style="display: flex; flex-direction: column; gap: 12px">
        <vue-finder
          id="notify_demo_vuefinder"
          :driver="arrayDriver"
          :config="{ ...config, theme: currentTheme, initialPath: 'memory://', persist: false }"
          :features="features"
          @ready="initNotifyFinder"
          @notify="handleNotify"
        />
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
          <div
            style="
              padding: 12px;
              border: 1px solid #d0d0d0;
              border-radius: 6px;
              background: #fff;
            "
          >
            <div style="font-weight: 600; margin-bottom: 8px">Notification Settings</div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center">
              <label>
                <input v-model="notificationsEnabled" type="checkbox" />
                Enable toasts
              </label>
              <label>
                Position
                <select v-model="notificationPosition">
                  <option value="top-left">top-left</option>
                  <option value="top-center">top-center</option>
                  <option value="top-right">top-right</option>
                  <option value="bottom-left">bottom-left</option>
                  <option value="bottom-center">bottom-center</option>
                  <option value="bottom-right">bottom-right</option>
                </select>
              </label>
              <label>
                Duration (ms)
                <input v-model.number="notificationDuration" type="number" min="500" step="250" />
              </label>
              <label>
                Max toasts
                <input v-model.number="notificationVisibleToasts" type="number" min="1" max="10" />
              </label>
              <label>
                <input v-model="notificationRichColors" type="checkbox" />
                Rich colors
              </label>
              <button class="btn" style="margin: 0" @click="testNotification">Test Notification</button>
              <button class="btn" style="margin: 0" @click="clearNotifyEvents">Clear event log</button>
            </div>
          </div>
          <div
            style="
              background: #fff;
              border: 1px solid #d0d0d0;
              border-radius: 6px;
              padding: 10px;
              overflow: auto;
              max-height: 260px;
            "
          >
            <div style="font-weight: 600; margin-bottom: 8px">@notify event log</div>
            <div v-if="notifyEvents.length === 0" style="color: #666">No notifications yet.</div>
            <div
              v-for="(entry, index) in notifyEvents"
              :key="`${entry.at}-${index}`"
              style="border-top: 1px solid #eee; padding: 6px 0"
            >
              <div style="font-size: 12px; color: #666">{{ entry.at }} · {{ entry.type }}</div>
              <div style="font-size: 13px">{{ entry.message }}</div>
            </div>
          </div>
        </div>
      </div>

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

      <UIVisibilityExample
        v-if="example === 'uiVisibility'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <MenuBarCustomizationExample
        v-if="example === 'menuBarCustomization'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <ItemSizeExample
        v-if="example === 'itemSize'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <MultilangExample
        v-if="example === 'multilang'"
        :driver="driver"
        :config="{ ...config, theme: currentTheme }"
        :features="features"
      />

      <ComposableApiExample
        v-if="example === 'composableApi'"
        :driver="arrayDriver"
        :config="{ ...config, theme: currentTheme, initialPath: 'memory://', persist: false }"
        :features="features"
      />

      <!-- ArrayDriver demo uses a separate instance id to avoid persisted state collisions -->
      <MemoryExample
        v-if="example === 'arrayDriver'"
        :driver="arrayDriver"
        :config="{ ...config, theme: currentTheme, initialPath: 'memory://', persist: false }"
        :features="features"
      />

      <!-- Performance demo with 100k items -->
      <MemoryExample
        v-if="example === 'performanceDemo' && performanceDriver"
        :driver="performanceDriver"
        :config="{ ...config, theme: currentTheme, initialPath: 'performance://', persist: false }"
        :features="features"
      />

      <!-- IndexedDBDriver demo - persists to browser IndexedDB -->
      <IndexedDBExample
        v-if="example === 'indexedDB'"
        :driver="indexedDBDriver"
        :config="{ ...config, theme: currentTheme, initialPath: 'indexeddb://', persist: false }"
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
