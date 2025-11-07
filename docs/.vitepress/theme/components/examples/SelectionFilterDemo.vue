<template>
  <ClientOnly>
    <div v-if="driver" class="selection-filter-demo">
      <div class="selection-filter-demo__viewer">
        <vue-finder
          id="demo-selection-filter"
          :driver="driver"
          :config="{ initialPath: 'local://', persist: false }"
          :selection-filter-type="selectionFilterType"
          :selection-filter-mime-includes="selectionFilterMimeIncludes"
          @select="handleSelectionFilter"
        />
      </div>

      <div class="selection-filter-demo__section">
        <div class="selection-filter-demo__section-header">
          <h3 class="selection-filter-demo__section-title">Filter Controls</h3>
        </div>

        <div class="selection-filter-demo__field">
          <label class="selection-filter-demo__label">Filter by Type:</label>
          <select v-model="selectionFilterType" class="selection-filter-demo__select">
            <option value="both">Both Files & Directories</option>
            <option value="files">Files Only</option>
            <option value="dirs">Directories Only</option>
          </select>
        </div>

        <div class="selection-filter-demo__field">
          <label class="selection-filter-demo__label">Filter by MIME Type:</label>
          <div class="selection-filter-demo__button-grid">
            <button
              type="button"
              class="selection-filter-demo__filter-btn"
              @click="addMimeFilter('image/')"
            >
              + Images
            </button>
            <button
              type="button"
              class="selection-filter-demo__filter-btn"
              @click="addMimeFilter('text/')"
            >
              + Text Files
            </button>
            <button
              type="button"
              class="selection-filter-demo__filter-btn"
              @click="addMimeFilter('application/pdf')"
            >
              + PDFs
            </button>
            <button
              type="button"
              class="selection-filter-demo__filter-btn selection-filter-demo__filter-btn--danger"
              @click="clearMimeFilter()"
            >
              Clear All
            </button>
          </div>

          <div v-if="selectionFilterMimeIncludes.length" class="selection-filter-demo__active-filters">
            <strong class="selection-filter-demo__active-label">Active MIME Filters:</strong>
            <div class="selection-filter-demo__badge-list">
              <span
                v-for="mime in selectionFilterMimeIncludes"
                :key="mime"
                class="selection-filter-demo__badge"
              >
                {{ mime }}
                <button
                  type="button"
                  class="selection-filter-demo__badge-remove"
                  @click="removeMimeFilter(mime)"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="selection-filter-demo__info-section">
        <h3 class="selection-filter-demo__info-title">
          Current Selection ({{ selectionFilteredFiles.length }} items):
        </h3>
        <div v-if="selectionFilteredFiles.length" class="selection-filter-demo__selection-list">
          <div
            v-for="file in selectionFilteredFiles"
            :key="file.path"
            class="selection-filter-demo__selection-item"
          >
            <strong class="selection-filter-demo__selection-name">{{
              file.name || file.path.split('/').pop()
            }}</strong>
            <small class="selection-filter-demo__selection-path">{{ file.path }}</small>
          </div>
        </div>
        <div v-else class="selection-filter-demo__empty">No files selected</div>
      </div>
    </div>
    <template #fallback>
      <div style="padding: 2rem; text-align: center; color: #6b7280">Loading demo...</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
 import type { Driver, DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);
const selectionFilterType = ref<'files' | 'dirs' | 'both'>('both');
const selectionFilterMimeIncludes = ref<string[]>([]);
const selectionFilteredFiles = ref<Array<{ path: string; name?: string }>>([]);

const handleSelectionFilter = (selection: Array<{ path: string; name?: string }>) => {
  selectionFilteredFiles.value = selection;
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

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.selection-filter-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selection-filter-demo__viewer {
  height: 340px;
}

.selection-filter-demo__section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-left: 4px solid #4caf50;
  border-radius: 8px;
}

.selection-filter-demo__section-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.selection-filter-demo__section-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.selection-filter-demo__field {
  margin-top: 1rem;
}

.selection-filter-demo__field:first-of-type {
  margin-top: 0;
}

.selection-filter-demo__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.selection-filter-demo__select {
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  font-size: 0.75rem;
  cursor: pointer;
  width: 100%;
}

.selection-filter-demo__button-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.selection-filter-demo__filter-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.selection-filter-demo__filter-btn:hover {
  background: var(--vp-c-bg-soft);
}

.selection-filter-demo__filter-btn--danger {
  background: #f44336;
  color: white;
  border-color: #f44336;
}

.selection-filter-demo__filter-btn--danger:hover {
  background: #d32f2f;
}

.selection-filter-demo__active-filters {
  margin-top: 0.75rem;
}

.selection-filter-demo__active-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.selection-filter-demo__badge-list {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.selection-filter-demo__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.1875rem 0.5rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 10px;
  font-size: 0.6875rem;
  font-weight: 500;
}

.selection-filter-demo__badge-remove {
  padding: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
}

.selection-filter-demo__info-section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.selection-filter-demo__info-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.selection-filter-demo__selection-list {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.selection-filter-demo__selection-item {
  padding: 0.375rem 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  margin-bottom: 0.25rem;
}

.selection-filter-demo__selection-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
}

.selection-filter-demo__selection-path {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.selection-filter-demo__empty {
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.75rem;
}
</style>
