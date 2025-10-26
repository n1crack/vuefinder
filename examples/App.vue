<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { FEATURE_ALL_NAMES } from '../src/features.js';

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
import AdapterExample from './examples/AdapterExample.vue';

const example = ref('adapter')
const examples = {
  default: "Inline select button example",
  externalSelect: "External select example",
  contextmenu: "Custom context menu example",
  customIcons: "Custom Icons (Scoped Slot)",
  windowExamples: "Window Examples (Exit Menu Demo)",
  eventsDemo: "Events Demo - All VueFinder Events",
  customDclick: "Custom Double-Click Events Demo",
  singleSelection: "Single Selection Mode Demo",
  selectionFilter: "Selection Filter Demo",
  adapter: "🏗️ Adapter API Development (Temporary)"
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
const isPopup = ref(false);

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
]

const config = {
  maxFileSize: maxFileSize,
}

const handlePathChange = (path: string) => {
  console.log('handlePathChange called with path:', path);
}

// Listen messages from popup
const handleMessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'filesSelected') {
    console.log('Selection completed:', Array.isArray(event.data.files) ? event.data.files.length : 0)
    if (event.source && 'postMessage' in event.source) {
      (event.source as Window).postMessage({ type: 'filesReceived' }, '*');
    }
  }
}

onMounted(() => {
  isPopup.value = new URLSearchParams(window.location.search).get('popup') === 'true';
  window.addEventListener('message', handleMessage);
  if (isPopup.value && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'popupReady' }, '*');
  }
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
})
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
    <div v-if="isPopup">
      <WindowExamplesExample 
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />
    </div>

    <!-- Regular examples (only show if not in popup) -->
    <div v-if="!isPopup">
      <DefaultExample 
        v-if="example === 'default'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
        :on-path-change="handlePathChange"
      />

      <ExternalSelectExample 
        v-if="example === 'externalSelect'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <ContextmenuExample 
        v-if="example === 'contextmenu'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <CustomIconsExample 
        v-if="example === 'customIcons'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <WindowExamplesExample 
        v-if="example === 'windowExamples'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <EventsDemoExample 
        v-if="example === 'eventsDemo'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <CustomDclickExample 
        v-if="example === 'customDclick'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <SingleSelectionExample 
        v-if="example === 'singleSelection'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <SelectionFilterExample 
        v-if="example === 'selectionFilter'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
      />

      <AdapterExample 
        v-if="example === 'adapter'"
        :request="request"
        :config="config"
        :features="features"
        :theme="currentTheme"
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
  max-width: 800px;
  margin: 80px auto;
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
