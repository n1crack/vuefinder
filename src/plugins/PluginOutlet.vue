<script setup lang="ts">
import { computed } from 'vue';
import { useApp } from '../composables/useApp';
import type { ModalKey, ModalRegion } from './modalRegistry';

/**
 * Renders every plugin contribution registered for a given (modalKey, region).
 * Built-in modals drop these at stable points so plugins can inject content
 * without forking the component. Each injected component receives a `ctx` prop
 * with the live app + modal data and a `close` helper.
 */
const props = defineProps<{
  modalKey: ModalKey;
  region: ModalRegion;
}>();

const app = useApp();

const extensions = computed(
  () => app.plugins?.modalRegistry.getExtensions(props.modalKey, props.region) ?? []
);

const outletCtx = computed(() => ({
  app,
  data: app.modal.data,
  close: () => app.modal.close(),
  // Per-operation bag — fields write here (e.g. `ctx.extras.level = 6`) and the
  // modal's action handler forwards it to the adapter/driver and on to the backend.
  extras: app.modal.extras,
}));
</script>

<template>
  <component
    :is="ext.component"
    v-for="ext in extensions"
    :key="ext._id"
    v-bind="ext.props"
    :ctx="outletCtx"
  />
</template>
