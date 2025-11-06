<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="basic-usage-demo"
        :driver="driver"
        :config="{ initialPath: 'memory://', persist: false }"
      >
        <template #status-bar="{ selected, path, count }">
          <div class="vuefinder__status-bar__actions">
            <button
              class="rounded-xs border border-gray-300 p-0.5 not-disabled:cursor-pointer not-disabled:hover:text-sky-400 disabled:opacity-50 dark:border-gray-600"
              :disabled="!count"
              @click="
                () => {
                  console.log(selected);
                  console.log(path);
                  console.log(count);
                }
              "
            >
              Show Selected ({{ count ?? 0 }} selected)
            </button>
          </div>
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
      basename: 'images',
      extension: '',
      path: 'memory://images',
      storage: 'memory',
      type: 'dir',
      file_size: null,
      last_modified: now,
      mime_type: null,
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'readme.txt',
      extension: 'txt',
      path: 'memory://readme.txt',
      storage: 'memory',
      type: 'file',
      file_size: 1024,
      last_modified: now,
      mime_type: 'text/plain',
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'example.pdf',
      extension: 'pdf',
      path: 'memory://example.pdf',
      storage: 'memory',
      type: 'file',
      file_size: 2048,
      last_modified: now,
      mime_type: 'application/pdf',
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

.vuefinder__status-bar__actions {
  display: flex;
  gap: 0.5rem;
}
</style>
