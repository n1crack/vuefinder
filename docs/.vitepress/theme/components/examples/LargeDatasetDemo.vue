<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="demo-large-dataset"
        :driver="driver"
        :config="{ initialPath: 'performance://', persist: false }"
      />
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Driver } from 'vuefinder';
import type { DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);

const generateLargeDataset = (): DirEntry[] => {
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
};

onMounted(async () => {
  const { ArrayDriver } = await import('vuefinder');
  driver.value = new ArrayDriver({
    files: generateLargeDataset(),
    storage: 'performance',
  });
});
</script>

<style scoped>
.vf-demo-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg);
  height: 340px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>

