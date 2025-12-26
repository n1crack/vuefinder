<script setup lang="ts">
import { provide, onBeforeUnmount, inject, watch, unref } from 'vue';
import { registerApp, unregisterApp, ServiceContainerIdKey, useApp } from '../composables/useApp';
import ServiceContainer from '../ServiceContainer';
import VueFinderView from './VueFinderView.vue';
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

// Watch for config prop changes and update config store
watch(
  () => props.config,
  (newConfig) => {
    if (newConfig) {
      // Unwrap refs and update config store
      // Send all provided values (not just changed ones) to ensure reactivity
      const configUpdate: Record<string, unknown> = {};
      for (const key in newConfig) {
        const value = unref((newConfig as Record<string, unknown>)[key]);
        // Include all non-undefined values to ensure reactivity
        if (value !== undefined) {
          configUpdate[key] = value;
        }
      }
      // Always call init to ensure new prop values override localStorage
      app.config.init(configUpdate);
    }
  },
  { deep: true, immediate: true }
);

// Register app and provide id to all child components
registerApp(appId, app);
provide(ServiceContainerIdKey, appId);

// Cleanup on unmount
onBeforeUnmount(() => {
  unregisterApp(appId);
});
</script>

<template>
  <VueFinderView v-bind="props">
    <template #icon="slotProps">
      <slot name="icon" v-bind="slotProps" />
    </template>
    <template #status-bar="slotProps">
      <slot name="status-bar" v-bind="slotProps" />
    </template>
  </VueFinderView>
</template>
