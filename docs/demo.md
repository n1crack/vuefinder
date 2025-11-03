---
layout: page
title: VueFinder Demo
---

<script setup>
import { ref, watch, onMounted } from 'vue'

const baseURL = ref(import.meta.env.VITE_VUEFINDER_API_URL || "http://inertia-vuefinder.test/api/files")
const driver = ref(null)
const selectedFiles = ref([])
const currentTheme = ref('light')
const themes = ref([
  { value: 'light', label: 'Default' },
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
])

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const { RemoteDriver } = await import('vuefinder')
    driver.value = new RemoteDriver({
      baseURL: baseURL.value,
      token: '',
      url: {
        list: '',
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
        download: '/download'
      }
    })
  }
})

const handleSelection = (items) => {
  selectedFiles.value = items
  console.log('Seçili dosyalar:', items)
}

const handlePathChange = (path) => {
  console.log('Mevcut yol:', path)
}

// Recreate driver when API URL changes
watch(baseURL, async (val) => {
  if (typeof window !== 'undefined' && driver.value) {
    const { RemoteDriver } = await import('vuefinder')
    driver.value = new RemoteDriver({
      baseURL: val,
      token: '',
      url: {
        list: '',
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
        download: '/download'
      }
    })
  }
})
</script>

<div class="demo-container">
  <h1>VueFinder Demo</h1>
  <p class="demo-info">VueFinder'i aşağıda canlı olarak görebilirsiniz. API URL'i: <code>{{ baseURL }}</code></p>
  
  <div class="demo-controls">
    <div class="form-group">
      <label>API URL:</label>
      <input v-model="baseURL" type="text" placeholder="http://inertia-vuefinder.test/api/files" style="width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px;">
    </div>

  </div>
  
  <div class="vuefinder-wrapper">
    <div class="form-group">
      <label for="theme">Theme:</label>
      <div class="select-wrapper">
        <select id="theme" v-model="currentTheme">
          <option v-for="t in (themes || [])" :key="t?.value" :value="t?.value">{{ t?.label }}</option>
        </select>
      </div>
    </div>
    <ClientOnly>
      <vue-finder 
        v-if="driver"
        id="demo_vuefinder" 
        :driver="driver"
        :theme="currentTheme"
        locale="tr"
        @select="handleSelection"
        @path-change="handlePathChange"
      />
      <template #fallback>
        <div class="loading-placeholder">Loading VueFinder...</div>
      </template>
    </ClientOnly>
  </div>
  
  <div v-if="selectedFiles.length" class="selection-info">
    <h3>Seçili Dosyalar ({{ selectedFiles.length }})</h3>
    <ul>
      <li v-for="file in selectedFiles" :key="file.path">
        <strong>{{ file.name }}</strong> 
        <br>
        <small>Yol: {{ file.path }}</small>
        <br>
        <small>Boyut: {{ file.size }} bytes</small>
        <br>
        <small>Tip: {{ file.type }}</small>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-info {
  margin: 20px 0;
  padding: 15px;
  background: var(--vp-c-warning-soft);
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.demo-controls {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.select-wrapper {
  position: relative;
  display: inline-flex;
}

.select-wrapper select {
  padding: 8px 36px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: white; 
  position:relative;
}

.select-wrapper::after {
  content: '▾';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  pointer-events: none;
}

.btn {
  padding: 10px 20px;
  background: var(--vp-c-brand-3);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  background: var(--vp-c-brand-2);
}

.vuefinder-wrapper {
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  min-height: 600px;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.selection-info {
  margin-top: 20px;
  padding: 15px;
  background: var(--vp-c-tip-soft);
  border-radius: 8px;
}

.selection-info ul {
  list-style: none;
  padding: 0;
}

.selection-info li {
  margin: 10px 0;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
}

.selection-info small {
  color: var(--vp-c-text-2);
  display: block;
  margin-top: 5px;
}
</style>
