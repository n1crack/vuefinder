<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="demo-contextmenu"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: false }"
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
import type { Driver, Item } from 'vuefinder';

const driver = ref<Driver | null>(null);
const customContextMenuItems = ref<Item[]>([]);

onMounted(async () => {
  const { RemoteDriver, contextMenuItems } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
  
  customContextMenuItems.value = [
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
        alert(JSON.stringify(selectedItems));
      },
      show: () => true,
    },
  ];
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
