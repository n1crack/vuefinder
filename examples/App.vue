

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { FEATURE_ALL_NAMES } from '../src/features.js';
import { contextMenuItems } from '../src/index.js';
import PDFIcon from './icons/pdf_file.svg'
import TextIcon from './icons/text_file.svg'

const example = ref('default')
const examples = {
  default: "Inline select button example",
  externalSelect: "External select example",
  contextmenu: "Custom context menu example",
  customIcons: "Custom Icons (Scoped Slot)",
  windowExamples: "Window Examples (Exit Menu Demo)",
  eventsDemo: "Events Demo - All VueFinder Events",
  customDclick: "Custom Double-Click Events Demo",
  singleSelection: "Single Selection Mode Demo",
  selectionFilter: "Selection Filter Demo"
}

// Theme management
const currentTheme = ref('light')
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
  { value: 'code', label: 'Code' }
]

// Check if we're in a popup window
const isPopup = computed(() => {
  return new URLSearchParams(window.location.search).get('popup') === 'true';
})

/** @type {import('../src/utils/ajax.js').RequestConfig} */

const request = {
  // ----- CHANGE ME! -----
  // [REQUIRED] Url for development server endpoint
  baseUrl: "http://inertia-vuefinder.test/vuefinder",
  // ----- CHANGE ME! -----

  // Additional headers & params & body
  headers: { "X-ADDITIONAL-HEADER": 'yes' },
  params: { additionalParam1: 'yes' },
  body: { additionalBody1: ['yes'] },

  // And/or transform request callback
  transformRequest: req => {
    if (req.method === 'get') {
      req.params.vf = "1"
    }
    return req;
  },

  // XSRF Token header name
  xsrfHeaderName: "CSRF-TOKEN",
}
const maxFileSize = ref("500MB")

const features = [
  ...FEATURE_ALL_NAMES,
  // Or remove the line above, specify the features want to include
  // Like...
  //FEATURES.LANGUAGE,
]

const selectedFiles = ref<{path: string, name?: string}[]>([]);
const filesFromPopup = ref<{path: string, name?: string}[]>([]);

// an example how to show selected files, outside of vuefinder
// you can create a ref object and assign the items to it,
// then with a button click, you can get the selected items easily
const handleSelect = (selection) => {
  selectedFiles.value = selection
}

const handlePopupSelect = (selection) => {
  filesFromPopup.value = selection
}

// Send selected items to parent from popup (normalizes payload)
const sendSelectedToParent = (payload) => {
  try {
    const toPlain = (it) => {
      const path = typeof it?.path === 'string' ? it.path : undefined
      const name = it?.name ?? it?.basename ?? it?.filename ?? (typeof path === 'string' ? path.split('/').pop() : undefined)
      return { path, name }
    }
    const filesRaw = Array.isArray(payload) ? payload.map(toPlain) : []
    // Strip proxies/reactivity to avoid DataCloneError
    const files = JSON.parse(JSON.stringify(filesRaw))
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'filesSelected', files }, '*')
    }
  } catch {
    // ignore
  }
  // Close the popup right after sending the selection
  try { window.close() } catch {
    // ignore
  }
}

const handleButton = () => {
  console.log(selectedFiles.value)
}

const handlePathChange = (path) => {
  console.log('handlePathChange called with path:', path);
}

// Events Demo - Event handlers and state
const eventLog = ref<Array<{type: string, message: string, timestamp: string, count?: number}>>([]);
const selectedFilesEvents = ref<{path: string, name?: string}[]>([]);
const currentPathEvents = ref<string>('');
const uploadedFilesEvents = ref<{path: string, name?: string}[]>([]);
const deletedFilesEvents = ref<{path: string, name?: string}[]>([]);
const isReadyEvents = ref<boolean>(false);

const addEventLog = (type: string, message: string, count?: number) => {
  eventLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
    count
  });
  // Keep only last 20 events
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20);
  }
};

// Event handlers for the events demo
const onSelectEvents = (items: {path: string, basename: string, type: string}[]) => {
  selectedFilesEvents.value = items;
  addEventLog('select', `Selected ${items.length} item(s): ${items.map(item => item.basename).join(', ')}`, items.length);
};

const onPathChangeEvents = (path: string) => {
  currentPathEvents.value = path;
  addEventLog('path-change', `Path changed to: ${path}`);
};

const onUploadCompleteEvents = (files: {path: string, basename: string, type: string}[]) => {
  uploadedFilesEvents.value = files;
  addEventLog('upload-complete', `Uploaded ${files.length} file(s): ${files.map(file => file.basename).join(', ')}`, files.length);
};

const onDeleteCompleteEvents = (deletedItems: {path: string, basename: string, type: string}[]) => {
  deletedFilesEvents.value = deletedItems;
  addEventLog('delete-complete', `Deleted ${deletedItems.length} item(s): ${deletedItems.map(item => item.basename).join(', ')}`, deletedItems.length);
};

const onErrorEvents = (error: {message?: string} | string | null) => {
  const errorMessage = typeof error === 'object' && error?.message ? error.message : 
                      typeof error === 'string' ? error : 'Unknown error occurred';
  addEventLog('error', `Error: ${errorMessage}`);
};

const onReadyEvents = () => {
  isReadyEvents.value = true;
  addEventLog('ready', 'VueFinder is ready and initialized');
};

const onFileDclickEvents = (item) => {
  addEventLog('file-dclick', `Double-clicked file: ${item.basename}`, 1);
  console.log('File double-clicked:', item);
};

const onFolderDclickEvents = (item) => {
  addEventLog('folder-dclick', `Double-clicked folder: ${item.basename}`, 1);
  console.log('Folder double-clicked:', item);
};

// Custom double-click demo
const customDclickLog = ref<Array<{type: string, message: string, timestamp: string}>>([]);

// Single selection demo
const singleSelectionFiles = ref<Array<{basename: string, path: string}>>([]);

const addCustomDclickLog = (type: string, message: string) => {
  customDclickLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString()
  });
};

const onCustomFileDclick = (item) => {
  addCustomDclickLog('file-dclick', `Custom file double-click: ${item.basename}`);
  alert(`Custom File Double-Click!\n\nFile: ${item.basename}\nPath: ${item.path}\nSize: ${item.file_size ? (item.file_size / 1024).toFixed(2) + ' KB' : 'Unknown'}\nType: ${item.mime_type || 'Unknown'}`);
};

const onCustomFolderDclick = (item) => {
  addCustomDclickLog('folder-dclick', `Custom folder double-click: ${item.basename}`);
  alert(`Custom Folder Double-Click!\n\nFolder: ${item.basename}\nPath: ${item.path}\nStorage: ${item.storage}`);
};

const clearCustomDclickLog = () => {
  customDclickLog.value = [];
};

const clearEventLog = () => {
  eventLog.value = [];
};

// Single selection handler
const handleSingleSelection = (files) => {
  singleSelectionFiles.value = files;
  console.log('Single selection changed:', files);
};

// Selection filter demo
const selectionFilterType = ref<'files' | 'dirs' | 'both'>('both');
const selectionFilterMimeIncludes = ref<string[]>([]);
const selectionFilteredFiles = ref<{path: string, name?: string}[]>([]);

const handleSelectionFilter = (selection) => {
  selectionFilteredFiles.value = selection;
  console.log('Selection filter changed:', selection);
};

const clearMimeFilter = () => {
  selectionFilterMimeIncludes.value = [];
};

const addMimeFilter = (mimeType: string) => {
  if (!selectionFilterMimeIncludes.value.includes(mimeType)) {
    selectionFilterMimeIncludes.value.push(mimeType);
  }
};

const removeMimeFilter = (mimeType: string) => {
  const index = selectionFilterMimeIncludes.value.indexOf(mimeType);
  if (index > -1) {
    selectionFilterMimeIncludes.value.splice(index, 1);
  }
};

// Listen messages from popup
const handleMessage = (event) => {
  if (event.data && event.data.type === 'filesSelected') {
    filesFromPopup.value = event.data.files;
    console.log('Selection completed:', Array.isArray(event.data.files) ? event.data.files.length : 0)
    if (event.source && 'postMessage' in event.source) {
        (event.source as Window).postMessage({ type: 'filesReceived' }, '*');
    }
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
  if (isPopup.value && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'popupReady' }, '*');
  }
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
})

const customContextMenuItems = [
  ...contextMenuItems,
  {
    id: 'loginfo',
    title: () => 'Log Info',
    action: (app, selectedItems) => {
    const info = selectedItems.map((i) => `Name: ${i.basename}, Type: ${i.type}, Path: ${i.path}`)
    console.log(selectedItems.length + " item(s) selected:\n", info.join('\n'))
    console.log(selectedItems)
    },
    show: () => true,
  }
]

// Function to open VueFinder in a popup window
const openPopupWindow = () => {
  // Build popup url robustly (preserve existing query params)
  const url = new URL(window.location.href);
  url.searchParams.set('popup', 'true');
  window.open(url.toString(), 'vuefinder-popup', 'width=900,height=600,scrollbars=yes,resizable=yes');
}

</script>


<template>
  <div class="wrapper">
    
    <!-- Show example selector only if not in popup -->
    <div v-if="!isPopup">
      <label for="example">
        Example
      </label>
      <div>
        <select id="example" v-model="example">
          <option v-for="(name, key) in examples" :value="key" :key="key">{{ name }}</option>
        </select>
      </div>

      <div style="font-weight: bold;padding: 10px">{{ examples[example] }}</div>
      
      <!-- Theme Selector -->
      <div style="margin-top: 1rem; margin-bottom: 1rem;">
        <label for="theme">
          Theme
        </label>
        <div>
          <select id="theme" v-model="currentTheme">
            <option v-for="theme in themes" :key="theme.value" :value="theme.value">{{ theme.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Popup mode: Show only VueFinder -->
    <div v-if="isPopup" class="popup-container">
      <vue-finder
        id='popup-vuefinder'
        :request="request"
        style="height: 100%; width: 100%;"
        :config="{
            maxFileSize: maxFileSize,
        }"
        :features="features"
        :theme="currentTheme"
        @path-change="handlePathChange"
        @select="handlePopupSelect"
      >
        <template #status-bar="{ selected, count }">
          <div class="vuefinder__status-bar__actions">
            <button
              class="border bg-emerald-800 text-white border-gray-300 dark:border-gray-600 rounded-sm px-2 p-0.5 disabled:opacity-50 not-disabled:hover:bg-emerald-700 not-disabled:cursor-pointer"
              @click="sendSelectedToParent(selected)"
              :disabled="!count"
            >
              Select  ({{ count ?? 0 }} selected)
            </button>
          </div>
        </template>
      </vue-finder>
       
    </div>

    <!-- Regular examples (only show if not in popup) -->
    <div v-if="!isPopup">
      <vue-finder
        v-if="example === 'default'"
        id='my_vuefinder'
        :request="request"
        :config="{
            maxFileSize: maxFileSize, 
        }"
        :features="features"
        :theme="currentTheme"
        @path-change="handlePathChange"
      >
      
        <template #status-bar="{ selected, path, count }">
          <div class="vuefinder__status-bar__actions">
            <button
                class="border border-gray-300 dark:border-gray-600 rounded-xs p-0.5 disabled:opacity-50 not-disabled:hover:text-sky-400 not-disabled:cursor-pointer"
                @click="() => {
                       console.log(selected);
                       console.log(path);
                       console.log(count);
                  }"
                :disabled="!count"
            >
              Show Selected  ({{ count ?? 0 }} selected)
            </button>
          </div>
        </template>

      </vue-finder>

      <div v-if="example === 'externalSelect'">
        <vue-finder
          id='my_vuefinder2'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
            loadingIndicator: 'linear'
          }"
          :features="features"
          :theme="currentTheme"
          @select="handleSelect"
        />

        <button class="btn" @click="handleButton" :disabled="!selectedFiles.length">Show Selected  ({{ selectedFiles.length ?? 0 }} selected)</button>
        <div v-show="selectedFiles.length">

          <h3>Selected Files ({{ selectedFiles.length }} selected)</h3>
          <ul>
            <li v-for="file in selectedFiles" :key="file.path">
              {{ file.path }}
            </li>
          </ul>
        </div>
      </div>

      <vue-finder
        v-if="example === 'contextmenu'"
        id='my_vuefinder3'
        :request="request"
        :config="{
          maxFileSize: maxFileSize,
        }"
        :features="features"
        :theme="currentTheme"
        :context-menu-items="customContextMenuItems"
      />

      <vue-finder
        v-if="example === 'customIcons'"
        id='my_vuefinder4'
        :request="request"
        :config="{
          maxFileSize: maxFileSize
        }"
        :features="features"
        :theme="currentTheme"
      >
        <template #icon="{ item }">
            <TextIcon class="vuefinder__item-icon__file" v-if="item.extension === 'txt'" />
            <PDFIcon class="vuefinder__item-icon__file" v-else-if="item.extension === 'pdf'" />
        </template>
      </vue-finder>

      <div v-if="example === 'windowExamples'">
        
        <div style="margin: 20px 0;">
          <button 
            class="btn" 
            @click="openPopupWindow"
          >
            Open VueFinder in Popup Window
          </button>
        </div>

        <!-- Display selected files -->
        <div v-if="filesFromPopup.length" style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
          <h3>Selected Files from Popup ({{ filesFromPopup.length }} files):</h3>
          <ul>
            <li v-for="file in filesFromPopup" :key="file.path" style="margin: 5px 0;">
              <strong>{{ file.name }}</strong> - {{ file.path }}
            </li>
          </ul>
        </div>
  
      </div>

      <!-- Events Demo -->
      <div v-if="example === 'eventsDemo'">
        <div style="margin: 20px 0;">
          <h2>VueFinder Events Demo</h2>
          <p>This example demonstrates all VueFinder events. Interact with the file manager below to see events in action.</p>
          
          <!-- Status indicators -->
          <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
            <div style="padding: 10px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
              <strong>Ready:</strong> {{ isReadyEvents ? '✅ Yes' : '❌ No' }}
            </div>
            <div style="padding: 10px; background: #e3f2fd; border-radius: 5px; border-left: 4px solid #2196f3;">
              <strong>Current Path:</strong> {{ currentPathEvents || 'None' }}
            </div>
            <div style="padding: 10px; background: #fff3e0; border-radius: 5px; border-left: 4px solid #ff9800;">
              <strong>Selected:</strong> {{ selectedFilesEvents.length }} item(s)
            </div>
            <div style="padding: 10px; background: #f3e5f5; border-radius: 5px; border-left: 4px solid #9c27b0;">
              <strong>Uploaded:</strong> {{ uploadedFilesEvents.length }} file(s)
            </div>
            <div style="padding: 10px; background: #ffebee; border-radius: 5px; border-left: 4px solid #f44336;">
              <strong>Deleted:</strong> {{ deletedFilesEvents.length }} item(s)
            </div>
          </div>

          <!-- Event log -->
          <div style="margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h3>Event Log ({{ eventLog.length }} events)</h3>
              <button class="btn" @click="clearEventLog" :disabled="!eventLog.length">
                Clear Log
              </button>
            </div>
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <div v-if="!eventLog.length" style="text-align: center; color: #666; padding: 20px;">
                No events yet. Interact with the file manager to see events here.
              </div>
              <div v-for="(event, index) in eventLog" :key="index" 
                   :style="{
                     marginBottom: '8px',
                     padding: '8px',
                     borderRadius: '4px',
                     backgroundColor: 'white',
                     borderLeft: `4px solid ${
                       event.type === 'select' ? '#4caf50' :
                       event.type === 'path-change' ? '#2196f3' :
                       event.type === 'upload-complete' ? '#9c27b0' :
                       event.type === 'delete-complete' ? '#f44336' :
                       event.type === 'error' ? '#ff5722' :
                       event.type === 'ready' ? '#4caf50' : '#666'
                     }`
                   }">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong :style="{ color: event.type === 'error' ? '#f44336' : '#333' }">
                      {{ event.type.toUpperCase() }}
                    </strong>
                    <span v-if="event.count !== undefined" style="margin-left: 8px; padding: 2px 6px; background: #e0e0e0; border-radius: 10px; font-size: 0.8em;">
                      {{ event.count }}
                    </span>
                  </div>
                  <small style="color: #666;">{{ event.timestamp }}</small>
                </div>
                <div style="margin-top: 4px; font-size: 0.9em; color: #555;">
                  {{ event.message }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VueFinder with all events -->
        <vue-finder
          id='events-demo-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          @select="onSelectEvents"
          @path-change="onPathChangeEvents"
          @upload-complete="onUploadCompleteEvents"
          @delete-complete="onDeleteCompleteEvents"
          @error="onErrorEvents"
          @ready="onReadyEvents"
          @file-dclick="onFileDclickEvents"
          @folder-dclick="onFolderDclickEvents"
        />
      </div>

      <!-- Custom Double-Click Demo -->
      <div v-if="example === 'customDclick'">
        <div style="margin: 20px 0;">
          <h2>Custom Double-Click Events Demo</h2>
          <p>This example demonstrates custom double-click behavior. When you double-click files or folders, custom events will be triggered instead of the default actions.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
            <h3>Custom Behavior:</h3>
            <ul>
              <li><strong>File double-click:</strong> Shows an alert with file information instead of opening preview</li>
              <li><strong>Folder double-click:</strong> Shows an alert with folder information instead of navigating</li>
            </ul>
          </div>

          <!-- Custom event handlers -->
          <div style="margin: 20px 0;">
            <h3>Event Log:</h3>
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
              <div v-for="(log, index) in customDclickLog" :key="index" style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px;">
                <strong>{{ log.type }}:</strong> {{ log.message }}
                <small style="color: #666; margin-left: 10px;">{{ log.timestamp }}</small>
              </div>
              <div v-if="!customDclickLog.length" style="color: #666; font-style: italic;">
                No events yet. Try double-clicking files or folders above.
              </div>
            </div>
            <button class="btn" @click="clearCustomDclickLog" :disabled="!customDclickLog.length" style="margin-top: 10px;">
              Clear Log
            </button>
          </div>
        </div>

        <!-- VueFinder with custom double-click events -->
        <vue-finder
          id='custom-dclick-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          @file-dclick="onCustomFileDclick"
          @folder-dclick="onCustomFolderDclick"
        />
      </div>

      <!-- Single Selection Mode Demo -->
      <div v-if="example === 'singleSelection'">
        <div style="margin: 20px 0;">
          <h2>Single Selection Mode Demo</h2>
          <p>This example demonstrates the single selection mode. In this mode, only one file or folder can be selected at a time.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #e8f4fd; border-radius: 5px; border-left: 4px solid #2196f3;">
            <h3>Single Selection Features:</h3>
            <ul>
              <li><strong>Single selection:</strong> Only one item can be selected at a time</li>
              <li><strong>Click behavior:</strong> Clicking a new item deselects the previous one</li>
              <li><strong>Ctrl/Cmd+A:</strong> Selects only the first item instead of all items</li>
              <li><strong>Drag selection:</strong> Mouse drag selection is disabled in single mode</li>
              <li><strong>Context menu:</strong> "Select All" option is hidden in single mode</li>
              <li><strong>Menu bar:</strong> "Select All" and "Deselect All" options are hidden in single mode</li>
            </ul>
          </div>

          <!-- Selection info -->
          <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <h3>Current Selection:</h3>
            <div v-if="singleSelectionFiles.length" style="padding: 10px; background: white; border-radius: 3px; margin-top: 10px;">
              <strong>Selected:</strong> {{ singleSelectionFiles[0]?.basename }} 
              <small style="color: #666; margin-left: 10px;">({{ singleSelectionFiles[0]?.path }})</small>
            </div>
            <div v-else style="color: #666; font-style: italic;">
              No file selected
            </div>
          </div>
        </div>

        <!-- VueFinder with single selection mode -->
        <vue-finder
          id='single-selection-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          selection-mode="single"
          @select="handleSingleSelection"
        />
      </div>

      <!-- Selection Filter Demo -->
      <div v-if="example === 'selectionFilter'">
        <div style="margin: 20px 0;">
          <h2>Selection Filter Demo</h2>
          <p>This example demonstrates selection filtering by file type and MIME type. Unselectable items appear dimmed and cannot be selected.</p>
          
          <!-- Filter controls -->
          <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
            <h3>Filter Controls:</h3>
            
            <!-- Type filter -->
            <div style="margin: 10px 0;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">Filter by Type:</label>
              <select v-model="selectionFilterType" style="padding: 5px; border: 1px solid #ccc; border-radius: 3px;">
                <option value="both">Both Files & Directories</option>
                <option value="files">Files Only</option>
                <option value="dirs">Directories Only</option>
              </select>
            </div>

            <!-- MIME type filter -->
            <div style="margin: 10px 0;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">Filter by MIME Type:</label>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                <button 
                  class="btn" 
                  @click="addMimeFilter('image/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Images
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('text/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Text Files
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('application/pdf')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + PDFs
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('video/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Videos
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('audio/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Audio
                </button>
                <button 
                  class="btn" 
                  @click="clearMimeFilter()"
                  style="padding: 5px 10px; font-size: 12px; margin: 0; background: #f44336; color: white;"
                >
                  Clear All
                </button>
              </div>
              
              <!-- Active filters -->
              <div v-if="selectionFilterMimeIncludes.length" style="margin-top: 10px;">
                <strong>Active MIME Filters:</strong>
                <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px;">
                  <span 
                    v-for="mime in selectionFilterMimeIncludes" 
                    :key="mime"
                    style="background: #2196f3; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; display: flex; align-items: center; gap: 5px;"
                  >
                    {{ mime }}
                    <button 
                      @click="removeMimeFilter(mime)"
                      style="background: none; border: none; color: white; cursor: pointer; font-weight: bold;"
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>



        <!-- VueFinder with selection filters -->
        <vue-finder
          id='selection-filter-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          :selection-filter-type="selectionFilterType"
          :selection-filter-mime-includes="selectionFilterMimeIncludes"
          @select="handleSelectionFilter"
        />

          <!-- Selection info -->
          <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <h3>Current Selection ({{ selectionFilteredFiles.length }} items):</h3>
            <div v-if="selectionFilteredFiles.length" style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
              <div v-for="file in selectionFilteredFiles" :key="file.path" style="padding: 5px; background: white; margin: 2px 0; border-radius: 3px;">
                <strong>{{ file.name || file.path.split('/').pop() }}</strong>
                <small style="color: #666; margin-left: 10px;">{{ file.path }}</small>
              </div>
            </div>
            <div v-else style="color: #666; font-style: italic;">
              No files selected
            </div>
          </div>

          <!-- Instructions -->
          <div style="margin: 20px 0; padding: 15px; background: #fff3e0; border-radius: 5px; border-left: 4px solid #ff9800;">
            <h3>How to Test:</h3>
            <ol>
              <li>Select "Files Only" to see only files selectable (directories will be dimmed)</li>
              <li>Select "Directories Only" to see only directories selectable (files will be dimmed)</li>
              <li>Add MIME type filters to restrict selection to specific file types</li>
              <li>Try selecting dimmed items - they should not be selectable</li>
              <li>Clear filters to make all items selectable again</li>
            </ol>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  max-width: 800px;
  margin: 80px auto;
}
.popup-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
}
.popup-container vue-finder {
  height: 100%;
  width: 100%;
}
.btn{
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
