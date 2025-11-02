<script setup lang="ts">
import { ref } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

const selectionFilterType = ref<'files' | 'dirs' | 'both'>('both');
const selectionFilterMimeIncludes = ref<string[]>([]);
const selectionFilteredFiles = ref<{ path: string; name?: string }[]>([]);

const handleSelectionFilter = (selection: Array<{ path: string; name?: string }>) => {
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
  <div class="selection-filter-example">
    <div class="selection-filter-example__header">
      <h2 class="selection-filter-example__title">Selection Filter Demo</h2>
      <p class="selection-filter-example__description">
        This example demonstrates selection filtering by file type and MIME type. Unselectable items
        appear dimmed and cannot be selected.
      </p>
    </div>

    <!-- Filter controls -->
    <div class="selection-filter-example__section">
      <div class="selection-filter-example__section-header">
        <h3 class="selection-filter-example__section-title">Filter Controls</h3>
      </div>

      <!-- Type filter -->
      <div class="selection-filter-example__field">
        <label class="selection-filter-example__label">Filter by Type:</label>
        <select v-model="selectionFilterType" class="selection-filter-example__select">
          <option value="both">Both Files & Directories</option>
          <option value="files">Files Only</option>
          <option value="dirs">Directories Only</option>
        </select>
      </div>

      <!-- MIME type filter -->
      <div class="selection-filter-example__field">
        <label class="selection-filter-example__label">Filter by MIME Type:</label>
        <div class="selection-filter-example__button-grid">
          <button
            type="button"
            class="selection-filter-example__filter-btn"
            @click="addMimeFilter('image/')"
          >
            + Images
          </button>
          <button
            type="button"
            class="selection-filter-example__filter-btn"
            @click="addMimeFilter('text/')"
          >
            + Text Files
          </button>
          <button
            type="button"
            class="selection-filter-example__filter-btn"
            @click="addMimeFilter('application/pdf')"
          >
            + PDFs
          </button>
          <button
            type="button"
            class="selection-filter-example__filter-btn"
            @click="addMimeFilter('video/')"
          >
            + Videos
          </button>
          <button
            type="button"
            class="selection-filter-example__filter-btn"
            @click="addMimeFilter('audio/')"
          >
            + Audio
          </button>
          <button
            type="button"
            class="selection-filter-example__filter-btn selection-filter-example__filter-btn--danger"
            @click="clearMimeFilter()"
          >
            Clear All
          </button>
        </div>

        <!-- Active filters -->
        <div
          v-if="selectionFilterMimeIncludes.length"
          class="selection-filter-example__active-filters"
        >
          <strong class="selection-filter-example__active-label">Active MIME Filters:</strong>
          <div class="selection-filter-example__badge-list">
            <span
              v-for="mime in selectionFilterMimeIncludes"
              :key="mime"
              class="selection-filter-example__badge"
            >
              {{ mime }}
              <button
                type="button"
                class="selection-filter-example__badge-remove"
                @click="removeMimeFilter(mime)"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- VueFinder with selection filters -->
    <div class="selection-filter-example__viewer">
      <vue-finder
        id="selection-filter-vuefinder"
        :driver="driver"
        :config="config"
        :features="features"
        :selection-filter-type="selectionFilterType"
        :selection-filter-mime-includes="selectionFilterMimeIncludes"
        @select="handleSelectionFilter"
      />
    </div>

    <!-- Selection info -->
    <div class="selection-filter-example__info-section">
      <h3 class="selection-filter-example__info-title">
        Current Selection ({{ selectionFilteredFiles.length }} items):
      </h3>
      <div v-if="selectionFilteredFiles.length" class="selection-filter-example__selection-list">
        <div
          v-for="file in selectionFilteredFiles"
          :key="file.path"
          class="selection-filter-example__selection-item"
        >
          <strong class="selection-filter-example__selection-name">{{
            file.name || file.path.split('/').pop()
          }}</strong>
          <small class="selection-filter-example__selection-path">{{ file.path }}</small>
        </div>
      </div>
      <div v-else class="selection-filter-example__empty">No files selected</div>
    </div>

    <!-- Instructions -->
    <div class="selection-filter-example__instructions">
      <h3 class="selection-filter-example__instructions-title">How to Test:</h3>
      <ol class="selection-filter-example__instructions-list">
        <li>Select "Files Only" to see only files selectable (directories will be dimmed)</li>
        <li>Select "Directories Only" to see only directories selectable (files will be dimmed)</li>
        <li>Add MIME type filters to restrict selection to specific file types</li>
        <li>Try selecting dimmed items - they should not be selectable</li>
        <li>Clear filters to make all items selectable again</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.selection-filter-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selection-filter-example__header {
  margin-bottom: 0.5rem;
}

.selection-filter-example__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.selection-filter-example__section {
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #4caf50;
  border-radius: 8px;
}

.selection-filter-example__section-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.selection-filter-example__section-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__field {
  margin-top: 1rem;
}

.selection-filter-example__field:first-of-type {
  margin-top: 0;
}

.selection-filter-example__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__select {
  padding: 0.375rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #ffffff;
  color: #374151;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.selection-filter-example__select:hover {
  border-color: #d1d5db;
}

.selection-filter-example__select:focus {
  outline: none;
  border-color: #374151;
  box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.1);
}

.selection-filter-example__button-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.selection-filter-example__filter-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #ffffff;
  color: #374151;
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.selection-filter-example__filter-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.selection-filter-example__filter-btn--danger {
  background: #f44336;
  color: #ffffff;
  border-color: #f44336;
}

.selection-filter-example__filter-btn--danger:hover {
  background: #d32f2f;
  border-color: #d32f2f;
}

.selection-filter-example__active-filters {
  margin-top: 0.75rem;
}

.selection-filter-example__active-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__badge-list {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.selection-filter-example__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.1875rem 0.5rem;
  background: #374151;
  color: #ffffff;
  border-radius: 10px;
  font-size: 0.6875rem;
  font-weight: 500;
}

.selection-filter-example__badge-remove {
  padding: 0;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.selection-filter-example__badge-remove:hover {
  opacity: 0.7;
}

.selection-filter-example__viewer {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}

.selection-filter-example__info-section {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.selection-filter-example__info-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__selection-list {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.selection-filter-example__selection-list::-webkit-scrollbar {
  width: 6px;
}

.selection-filter-example__selection-list::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.selection-filter-example__selection-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.selection-filter-example__selection-list::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.selection-filter-example__selection-item {
  padding: 0.375rem 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  margin-bottom: 0.25rem;
}

.selection-filter-example__selection-item:last-child {
  margin-bottom: 0;
}

.selection-filter-example__selection-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__selection-path {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.625rem;
  color: #6b7280;
}

.selection-filter-example__empty {
  color: #6b7280;
  font-style: italic;
  font-size: 0.75rem;
}

.selection-filter-example__instructions {
  padding: 0.75rem;
  background: #fff3e0;
  border: 1px solid #ff9800;
  border-left: 4px solid #ff9800;
  border-radius: 8px;
}

.selection-filter-example__instructions-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.selection-filter-example__instructions-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.6;
}

.selection-filter-example__instructions-list li {
  margin-bottom: 0.375rem;
}

.selection-filter-example__instructions-list li:last-child {
  margin-bottom: 0;
}
</style>
