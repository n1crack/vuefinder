<script setup lang="ts">
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();
</script>

<template>
  <vue-finder
    id="memory_vuefinder"
    :driver="driver"
    :config="config"
    :features="features"
    :theme="theme"
  />
  
</template>


