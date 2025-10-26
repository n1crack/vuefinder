<script setup lang="ts">
interface Props {
  request: Record<string, unknown>;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
  onPathChange?: (path: string) => void;
}

defineProps<Props>();
</script>

<template>
  <vue-finder
    id='my_vuefinder'
    :request="request"
    :config="config"
    :features="features"
    :theme="theme"
    @path-change="onPathChange"
  >
    <template #status-bar="{ selected, path, count }">
      <div class="vuefinder__status-bar__actions">
        <button
          class="border border-gray-300 dark:border-gray-600 rounded-xs p-0.5 disabled:opacity-50 not-disabled:hover:text-sky-400 not-disabled:cursor-pointer"
          @click="() => {
            console.log(selected);
            console.log(path);
            console.log(count);
          }"
          :disabled="!count"
        >
          Show Selected ({{ count ?? 0 }} selected)
        </button>
      </div>
    </template>
  </vue-finder>
</template>

