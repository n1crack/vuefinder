<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <div v-if="driver" class="item-size-demo">
        <div class="controls-row">
          <div class="controls">
            <h4>Grid View Settings</h4>
            <div class="control-group">
              <label>
                <span>Width: {{ gridItemWidth }}px</span>
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
                <span>Height: {{ gridItemHeight }}px</span>
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
                <span>Gap: {{ gridItemGap }}px</span>
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
                <span>Icon Size: {{ gridIconSize }}px</span>
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
          </div>

          <div class="controls">
            <h4>List View Settings</h4>
            <div class="control-group">
              <label>
                <span>Item Height: {{ listItemHeight }}px</span>
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
                <span>Gap: {{ listItemGap }}px</span>
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
                <span>Icon Size: {{ listIconSize }}px</span>
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
          </div>
        </div>

        <div class="vuefinder-container">
          <vue-finder
            id="demo-item-size"
            :driver="driver"
            :config="computedConfig"
          />
        </div>
      </div>
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Driver } from 'vuefinder';

const gridItemWidth = ref(96);
const gridItemHeight = ref(80);
const gridItemGap = ref(8);
const gridIconSize = ref(48);
const listItemHeight = ref(32);
const listItemGap = ref(2);
const listIconSize = ref(20);

const computedConfig = computed(() => ({
  initialPath: 'local://',
  persist: false,
  gridItemWidth: gridItemWidth.value,
  gridItemHeight: gridItemHeight.value,
  gridItemGap: gridItemGap.value,
  gridIconSize: gridIconSize.value,
  listItemHeight: listItemHeight.value,
  listItemGap: listItemGap.value,
  listIconSize: listIconSize.value,
}));

const driver = ref<Driver | null>(null);

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'https://vuefinder-api.ozdemir.be/api/files'
  });
});
</script>

<style scoped>
.vf-demo-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg);
  min-height: 500px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.item-size-demo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.controls-row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.controls {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  flex: 1;
}

.controls h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.control-group {
  margin-bottom: 0.75rem;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.control-group span {
  font-weight: 500;
  min-width: 140px;
}

.slider {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-divider);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  transition: background 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  background: var(--vp-c-brand-dark);
}

.slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.slider::-moz-range-thumb:hover {
  background: var(--vp-c-brand-dark);
}

.vuefinder-container {
  width: 100%;
  min-height: 400px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}
</style>
