<script setup lang="ts">
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
  onPathChange?: (path: string) => void;
}

defineProps<Props>();
</script>

<template>
  <vue-finder
    id="my_vuefinder"
    :driver="driver"
    :config="config"
    :features="features"
    @path-change="onPathChange"
  >
    <template #status-bar="{ selected, path, count }">
      <div class="vuefinder__status-bar__actions">
        <button
          class="rounded-xs border border-gray-300 p-0.5 not-disabled:cursor-pointer not-disabled:hover:text-sky-400 disabled:opacity-50"
          :disabled="!count"
          @click="
            () => {
              console.log(selected);
              console.log(path);
              console.log(count);
            }
          "
        >
          Show Selected ({{ count ?? 0 }} selected)
        </button>
      </div>
    </template>
  </vue-finder>
</template>
