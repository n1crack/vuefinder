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
    <div class="h-[420px]">
        <vue-finder id="memory_vuefinder" :driver="driver" :config="config" :features="features" />
    </div>
</template>
