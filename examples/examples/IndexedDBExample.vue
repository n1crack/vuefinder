<script setup lang="ts">
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();
</script>

<template>
  <vue-finder id="indexeddb_vuefinder" :driver="driver" :config="config" :features="features" />
</template>

