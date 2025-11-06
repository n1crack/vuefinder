<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="contextmenu-demo"
        :driver="driver"
        :config="{ initialPath: 'memory://', persist: false }"
        :context-menu-items="customContextMenuItems"
      />
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrayDriver, contextMenuItems } from 'vuefinder';
import type { Driver } from 'vuefinder';

const driver = ref<Driver | null>(null);

const customContextMenuItems = [
  ...contextMenuItems,
  {
    id: 'loginfo',
    title: () => 'Log Info',
    action: (app, selectedItems) => {
      const info = selectedItems.map(
        (i) => `Name: ${i.basename}, Type: ${i.type}, Path: ${i.path}`
      );
      console.log(selectedItems.length + ' item(s) selected:\n', info.join('\n'));
      console.log(selectedItems);
    },
    show: () => true,
  },
];

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
