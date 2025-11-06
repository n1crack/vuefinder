<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="memory-driver-demo"
        :driver="driver"
        :config="{ initialPath: 'memory://', persist: false }"
      />
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrayDriver } from 'vuefinder';
import type { Driver } from 'vuefinder';

const driver = ref<Driver | null>(null);

const createSampleData = () => {
  const now = Date.now();
  return [
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
      basename: 'image.jpg',
      extension: 'jpg',
      path: 'memory://image.jpg',
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
.vf-demo-wrapper {
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  height: 340px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
