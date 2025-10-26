<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  request: Record<string, unknown>;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();

const selectionFilterType = ref<'files' | 'dirs' | 'both'>('both');
const selectionFilterMimeIncludes = ref<string[]>([]);
const selectionFilteredFiles = ref<{path: string, name?: string}[]>([]);

const handleSelectionFilter = (selection: Array<{path: string, name?: string}>) => {
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
</script>

<template>
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
  </div>

  <!-- VueFinder with selection filters -->
  <vue-finder
    id='selection-filter-vuefinder'
    :request="request"
    :config="config"
    :features="features"
    :theme="theme"
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
</template>

