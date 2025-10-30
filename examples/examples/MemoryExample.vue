<script setup lang="ts">
import type { Adapter } from '../../src/adapters';

interface Props {
  adapter: Adapter;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();
</script>

<template>
  <vue-finder
    id="memory_vuefinder"
    :adapter="adapter"
    :config="config"
    :features="features"
    :theme="theme"
  />
  
</template>


