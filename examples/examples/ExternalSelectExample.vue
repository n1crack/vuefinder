<script setup lang="ts">
import { ref } from 'vue';
import type { Adapter } from '../../src/adapters';

interface Props {
  adapter: Adapter;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
  onSelect?: (files: Array<{path: string, name?: string}>) => void;
}

const props = defineProps<Props>();
const selectedFiles = ref<{path: string, name?: string}[]>([]);

const handleSelect = (selection: Array<{path: string, name?: string}>) => {
  selectedFiles.value = selection;
  if (props.onSelect) {
    props.onSelect(selection);
  }
}

const handleButton = () => {
  console.log(selectedFiles.value);
}
</script>

<template>
  <vue-finder
    id='my_vuefinder2'
    :adapter="adapter"
    :config="config"
    :features="features"
    :theme="theme"
    @select="handleSelect"
  />

  <button class="btn" @click="handleButton" :disabled="!selectedFiles.length">
    Show Selected ({{ selectedFiles.length ?? 0 }} selected)
  </button>
  <div v-show="selectedFiles.length">
    <h3>Selected Files ({{ selectedFiles.length }} selected)</h3>
    <ul>
      <li v-for="file in selectedFiles" :key="file.path">
        {{ file.path }}
      </li>
    </ul>
  </div>
</template>
