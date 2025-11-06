<template>
  <ClientOnly>
    <div v-if="driver" class="single-selection-demo">
      <div class="single-selection-demo__viewer">
        <vue-finder
          id="single-selection-demo"
          :driver="driver"
          :config="{ initialPath: 'memory://', persist: false }"
          selection-mode="single"
          @select="handleSingleSelection"
        />
      </div>

      <div class="single-selection-demo__info-section">
        <h3 class="single-selection-demo__info-title">Current Selection:</h3>
        <div v-if="singleSelectionFiles.length" class="single-selection-demo__selection-display">
          <strong class="single-selection-demo__selection-name">{{
            singleSelectionFiles[0]?.basename
          }}</strong>
          <small class="single-selection-demo__selection-path"
            >({{ singleSelectionFiles[0]?.path }})</small
          >
        </div>
        <div v-else class="single-selection-demo__empty">No file selected</div>
      </div>
    </div>
    <template #fallback>
      <div style="padding: 2rem; text-align: center; color: #6b7280">Loading demo...</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrayDriver } from 'vuefinder';
import type { Driver, DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);
const singleSelectionFiles = ref<DirEntry[]>([]);

const handleSingleSelection = (files: DirEntry[]) => {
  singleSelectionFiles.value = files;
};

const createSampleData = () => {
  const now = Date.now();
  return [
    {
      dir: 'memory://',
      basename: 'documents',
      extension: '',
      path: 'memory://documents',
      storage: 'memory',
      type: 'dir',
      file_size: null,
      last_modified: now,
      mime_type: null,
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'example.txt',
      extension: 'txt',
      path: 'memory://example.txt',
      storage: 'memory',
      type: 'file',
      file_size: 1024,
      last_modified: now,
      mime_type: 'text/plain',
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'photo.jpg',
      extension: 'jpg',
      path: 'memory://photo.jpg',
      storage: 'memory',
      type: 'file',
      file_size: 5120,
      last_modified: now,
      mime_type: 'image/jpeg',
      visibility: 'public',
    },
  ];
};

onMounted(() => {
  driver.value = new ArrayDriver({
    files: createSampleData(),
    storage: 'memory',
  });
});
</script>

<style scoped>
.single-selection-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.single-selection-demo__viewer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  min-height: 420px;
}

.single-selection-demo__info-section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.single-selection-demo__info-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.single-selection-demo__selection-display {
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
}

.single-selection-demo__selection-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
}

.single-selection-demo__selection-path {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.single-selection-demo__empty {
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.75rem;
}
</style>
