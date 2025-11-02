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
  <div class="single-selection-example">
    <div class="single-selection-example__header">
      <h2 class="single-selection-example__title">Single Selection Mode Demo</h2>
      <p class="single-selection-example__description">
        This example demonstrates the single selection mode. In this mode, only one file or folder
        can be selected at a time.
      </p>
    </div>

    <div class="single-selection-example__section">
      <h3 class="single-selection-example__section-title">Single Selection Features:</h3>
      <ul class="single-selection-example__feature-list">
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
    <div class="single-selection-example__info-section">
      <h3 class="single-selection-example__info-title">Current Selection:</h3>
      <div v-if="singleSelectionFiles.length" class="single-selection-example__selection-display">
        <strong class="single-selection-example__selection-name">{{
          singleSelectionFiles[0]?.basename
        }}</strong>
        <small class="single-selection-example__selection-path"
          >({{ singleSelectionFiles[0]?.path }})</small
        >
      </div>
      <div v-else class="single-selection-example__empty">No file selected</div>
    </div>

    <!-- VueFinder with single selection mode -->
    <div class="single-selection-example__viewer">
      <vue-finder
        id="single-selection-vuefinder"
        :driver="driver"
        :config="config"
        :features="features"
        selection-mode="single"
        @select="handleSingleSelection"
      />
    </div>
  </div>
</template>

<style scoped>
.single-selection-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.single-selection-example__header {
  margin-bottom: 0.5rem;
}

.single-selection-example__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.single-selection-example__description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.single-selection-example__section {
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #2196f3;
  border-radius: 8px;
}

.single-selection-example__section-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.single-selection-example__feature-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.6;
}

.single-selection-example__feature-list li {
  margin-bottom: 0.375rem;
}

.single-selection-example__feature-list li:last-child {
  margin-bottom: 0;
}

.single-selection-example__feature-list strong {
  font-weight: 600;
  color: #374151;
}

.single-selection-example__info-section {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.single-selection-example__info-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.single-selection-example__selection-display {
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
}

.single-selection-example__selection-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.single-selection-example__selection-path {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.625rem;
  color: #6b7280;
}

.single-selection-example__empty {
  color: #6b7280;
  font-style: italic;
  font-size: 0.75rem;
}

.single-selection-example__viewer {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}
</style>
