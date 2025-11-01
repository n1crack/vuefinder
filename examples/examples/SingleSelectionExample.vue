<script setup lang="ts">
import { ref } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

const singleSelectionFiles = ref<Array<{ basename: string; path: string }>>([]);

const handleSingleSelection = (files: Array<{ basename: string; path: string }>) => {
  singleSelectionFiles.value = files;
  console.log('Single selection changed:', files);
};
</script>

<template>
  <div style="margin: 20px 0">
    <h2>Single Selection Mode Demo</h2>
    <p>
      This example demonstrates the single selection mode. In this mode, only one file or folder can
      be selected at a time.
    </p>

    <div
      style="
        margin: 20px 0;
        padding: 15px;
        background: #e8f4fd;
        border-radius: 5px;
        border-left: 4px solid #2196f3;
      "
    >
      <h3>Single Selection Features:</h3>
      <ul>
        <li><strong>Single selection:</strong> Only one item can be selected at a time</li>
        <li><strong>Click behavior:</strong> Clicking a new item deselects the previous one</li>
        <li><strong>Ctrl/Cmd+A:</strong> Selects only the first item instead of all items</li>
        <li><strong>Drag selection:</strong> Mouse drag selection is disabled in single mode</li>
        <li><strong>Context menu:</strong> "Select All" option is hidden in single mode</li>
        <li>
          <strong>Menu bar:</strong> "Select All" and "Deselect All" options are hidden in single
          mode
        </li>
      </ul>
    </div>

    <!-- Selection info -->
    <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px">
      <h3>Current Selection:</h3>
      <div
        v-if="singleSelectionFiles.length"
        style="padding: 10px; background: white; border-radius: 3px; margin-top: 10px"
      >
        <strong>Selected:</strong> {{ singleSelectionFiles[0]?.basename }}
        <small style="color: #666; margin-left: 10px">({{ singleSelectionFiles[0]?.path }})</small>
      </div>
      <div v-else style="color: #666; font-style: italic">No file selected</div>
    </div>
  </div>

  <!-- VueFinder with single selection mode -->
  <vue-finder
    id="single-selection-vuefinder"
    :driver="driver"
    :config="config"
    :features="features"
    selection-mode="single"
    @select="handleSingleSelection"
  />
</template>
