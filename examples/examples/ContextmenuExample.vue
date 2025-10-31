<script setup lang="ts">
import { contextMenuItems } from '../../src/index.js';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();

const customContextMenuItems = [
  ...contextMenuItems,
  {
    id: 'loginfo',
    title: () => 'Log Info',
    action: (
      app: unknown,
      selectedItems: Array<{ basename: string; type: string; path: string }>
    ) => {
      const info = selectedItems.map(
        (i) => `Name: ${i.basename}, Type: ${i.type}, Path: ${i.path}`
      );
      console.log(selectedItems.length + ' item(s) selected:\n', info.join('\n'));
      console.log(selectedItems);
    },
    show: () => true,
  },
];
</script>

<template>
  <vue-finder
    id="my_vuefinder3"
    :driver="driver"
    :config="config"
    :features="features"
    :theme="theme"
    :context-menu-items="customContextMenuItems"
  />
</template>
