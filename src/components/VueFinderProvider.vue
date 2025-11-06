<script setup lang="ts">
import { provide, onBeforeUnmount, inject, useTemplateRef, onMounted } from 'vue';
import { registerApp, unregisterApp, ServiceContainerIdKey, useApp } from '../composables/useApp';
import ServiceContainer from '../ServiceContainer';
import VueFinder from './VueFinder.vue';
import type { VueFinderProps } from '../types';
import { menuItems as contextMenuItems } from '../utils/contextmenu';

const props = withDefaults(defineProps<VueFinderProps>(), {
  debug: false,
  contextMenuItems: () => contextMenuItems,
  selectionMode: 'multiple',
  selectionFilterType: 'both',
  selectionFilterMimeIncludes: () => [],
});

// Resolve id - use prop if provided, otherwise try to inject from parent provider
const appId = props.id ?? inject<string>(ServiceContainerIdKey);
if (!appId) {
  throw new Error('VueFinderProvider requires an "id" prop.');
}

// Create app instance with props (includes the id)
const app = ServiceContainer(props, inject('VueFinderOptions') || {});

// Register app and provide id to all child components
registerApp(appId, app);
provide(ServiceContainerIdKey, appId);

// Cleanup on unmount
onBeforeUnmount(() => {
  unregisterApp(appId);
});
</script>

<template>
  <VueFinder v-bind="props">
    <template #icon="slotProps">
      <slot name="icon" v-bind="slotProps" />
    </template>
    <template #status-bar="slotProps">
      <slot name="status-bar" v-bind="slotProps" />
    </template>
  </VueFinder>
</template>
