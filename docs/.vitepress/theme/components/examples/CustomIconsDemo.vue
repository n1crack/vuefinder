<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="custom-icons-demo"
        :driver="driver"
        :config="{ initialPath: 'memory://', persist: false }"
      >
        <template #icon="{ item }">
          <span v-if="item.extension === 'txt'" style="font-size: 1.5em">📄</span>
          <span v-else-if="item.extension === 'pdf'" style="font-size: 1.5em">📕</span>
          <span v-else-if="item.extension === 'jpg' || item.extension === 'png'" style="font-size: 1.5em">🖼️</span>
        </template>
      </vue-finder>
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
      basename: 'document.pdf',
      extension: 'pdf',
      path: 'memory://document.pdf',
      storage: 'memory',
      type: 'file',
      file_size: 2048,
      last_modified: now,
      mime_type: 'application/pdf',
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
  min-height: 420px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
