<script setup lang="ts">
import { computed } from 'vue';
import { useApp } from '../composables/useApp';
import type { UiSlotName } from './slotRegistry';

/** Renders every plugin contribution registered for a named layout slot. */
const props = defineProps<{ name: UiSlotName }>();

const app = useApp();

const contributions = computed(() => app.plugins?.slotRegistry.get(props.name) ?? []);
</script>

<template>
  <component :is="c.component" v-for="c in contributions" :key="c._id" v-bind="c.props" />
</template>
