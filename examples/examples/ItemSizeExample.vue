<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Driver } from '../../../src/adapters/types';

const props = defineProps<{
  driver: Driver;
  config?: Record<string, unknown>;
  features?: string | Record<string, boolean>;
}>();

// Default values from config (matching DEFAULT_PERSISTENCE_STATE in config.ts)
const DEFAULT_GRID_ITEM_WIDTH = 96;
const DEFAULT_GRID_ITEM_HEIGHT = 80;
const DEFAULT_GRID_ITEM_GAP = 8;
const DEFAULT_GRID_ICON_SIZE = 48;
const DEFAULT_LIST_ITEM_HEIGHT = 32;
const DEFAULT_LIST_ITEM_GAP = 2;
const DEFAULT_LIST_ICON_SIZE = 20;

// Slider values for grid item dimensions - initialize from props.config or use defaults
const gridItemWidth = ref(
  (props.config?.gridItemWidth as number) ?? DEFAULT_GRID_ITEM_WIDTH
);
const gridItemHeight = ref(
  (props.config?.gridItemHeight as number) ?? DEFAULT_GRID_ITEM_HEIGHT
);
const gridItemGap = ref((props.config?.gridItemGap as number) ?? DEFAULT_GRID_ITEM_GAP);
const gridIconSize = ref(
  (props.config?.gridIconSize as number) ?? DEFAULT_GRID_ICON_SIZE
);
const listItemHeight = ref(
  (props.config?.listItemHeight as number) ?? DEFAULT_LIST_ITEM_HEIGHT
);
const listItemGap = ref((props.config?.listItemGap as number) ?? DEFAULT_LIST_ITEM_GAP);
const listIconSize = ref(
  (props.config?.listIconSize as number) ?? DEFAULT_LIST_ICON_SIZE
);

// Computed config with slider values - reactive
const computedConfig = computed(() => ({
  ...props.config,
  gridItemWidth: gridItemWidth.value,
  gridItemHeight: gridItemHeight.value,
  gridItemGap: gridItemGap.value,
  gridIconSize: gridIconSize.value,
  listItemHeight: listItemHeight.value,
  listItemGap: listItemGap.value,
  listIconSize: listIconSize.value,
}));

// Reset to defaults (using the same defaults as config.ts)
const resetToDefaults = () => {
  gridItemWidth.value = DEFAULT_GRID_ITEM_WIDTH;
  gridItemHeight.value = DEFAULT_GRID_ITEM_HEIGHT;
  gridItemGap.value = DEFAULT_GRID_ITEM_GAP;
  gridIconSize.value = DEFAULT_GRID_ICON_SIZE;
  listItemHeight.value = DEFAULT_LIST_ITEM_HEIGHT;
  listItemGap.value = DEFAULT_LIST_ITEM_GAP;
  listIconSize.value = DEFAULT_LIST_ICON_SIZE;
};
</script>

<template>
  <div class="item-size-example">
    <div class="controls">
      <h3>Item Size & Spacing Configuration</h3>
      <p>Adjust the sliders to customize item dimensions and spacing. Switch between grid and list view to see the changes.</p>
      
      <div class="control-group">
        <label>
          <span>Grid Item Width: {{ gridItemWidth }}px</span>
          <input
            v-model.number="gridItemWidth"
            type="range"
            min="60"
            max="200"
            step="4"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>Grid Item Height: {{ gridItemHeight }}px</span>
          <input
            v-model.number="gridItemHeight"
            type="range"
            min="60"
            max="150"
            step="4"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>Grid Item Gap: {{ gridItemGap }}px</span>
          <input
            v-model.number="gridItemGap"
            type="range"
            min="0"
            max="24"
            step="2"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>Grid Icon Size: {{ gridIconSize }}px</span>
          <input
            v-model.number="gridIconSize"
            type="range"
            min="24"
            max="120"
            step="4"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>List Item Height: {{ listItemHeight }}px</span>
          <input
            v-model.number="listItemHeight"
            type="range"
            min="20"
            max="80"
            step="2"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>List Item Gap: {{ listItemGap }}px</span>
          <input
            v-model.number="listItemGap"
            type="range"
            min="0"
            max="12"
            step="1"
            class="slider"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          <span>List Icon Size: {{ listIconSize }}px</span>
          <input
            v-model.number="listIconSize"
            type="range"
            min="16"
            max="40"
            step="2"
            class="slider"
          />
        </label>
      </div>

      <button class="reset-btn" @click="resetToDefaults">Reset to Defaults</button>
    </div>

    <div class="vuefinder-container">
      <vue-finder
        id="item-size-example"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      />
    </div>
  </div>
</template>

<style scoped>
.item-size-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.controls {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
}

.controls p {
  margin: 0 0 1.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
  color: #333;
}

.control-group span {
  font-size: 0.9rem;
  min-width: 180px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #636e7a;
  cursor: pointer;
  transition: background 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  background: #4a5568;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #636e7a;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.slider::-moz-range-thumb:hover {
  background: #4a5568;
}

.reset-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #636e7a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #4a5568;
}

.vuefinder-container {
  flex: 1;
  min-height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
