<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

const props = defineProps<Props>();

// UI visibility controls
const showMenuBar = ref(true);
const showToolbar = ref(true);

// Computed config that includes visibility settings
const computedConfig = computed(() => ({
  ...props.config,
  showMenuBar: showMenuBar.value,
  showToolbar: showToolbar.value,
}));

// Config display for documentation
const configDisplay = computed(() => {
  return JSON.stringify(
    {
      showMenuBar: showMenuBar.value,
      showToolbar: showToolbar.value,
    },
    null,
    2
  );
});
</script>

<template>
  <div class="ui-visibility-example">
    <div class="ui-visibility-example__container">
      <div class="ui-visibility-example__controls">
        <div class="ui-visibility-example__header">
          <h3 class="ui-visibility-example__title">UI Visibility Settings</h3>
        </div>

        <div class="ui-visibility-example__toggles">
          <label class="ui-visibility-example__toggle">
            <input v-model="showMenuBar" type="checkbox" />
            <span class="ui-visibility-example__toggle-label">Show Menu Bar</span>
            <span class="ui-visibility-example__toggle-status">
              {{ showMenuBar ? 'Visible' : 'Hidden' }}
            </span>
          </label>
          <label class="ui-visibility-example__toggle">
            <input v-model="showToolbar" type="checkbox" />
            <span class="ui-visibility-example__toggle-label">Show Toolbar</span>
            <span class="ui-visibility-example__toggle-status">
              {{ showToolbar ? 'Visible' : 'Hidden' }}
            </span>
          </label>
        </div>

        <div class="ui-visibility-example__info">
          <div class="ui-visibility-example__info-header">
            <span class="ui-visibility-example__info-label">Note</span>
          </div>
          <p class="ui-visibility-example__info-text">
            These settings are <strong>non-persistent</strong>. They reset to default values
            (<code>true</code>) when the page is reloaded.
          </p>
        </div>

        <div class="ui-visibility-example__config">
          <div class="ui-visibility-example__config-header">
            <span class="ui-visibility-example__config-label">Configuration</span>
          </div>
          <pre class="ui-visibility-example__config-code">{{ configDisplay }}</pre>
        </div>
      </div>

      <div class="ui-visibility-example__viewer">
        <h3 class="ui-visibility-example__viewer-title">VueFinder Preview</h3>
        <vue-finder
          id="ui_visibility_demo"
          :driver="props.driver"
          :config="computedConfig"
          :features="features"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-visibility-example {
  height: 100%;
  width: 100%;
}

.ui-visibility-example__container {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1rem;
  height: 100%;
}

.ui-visibility-example__controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 100%;
}

.ui-visibility-example__header {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.ui-visibility-example__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.ui-visibility-example__toggles {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ui-visibility-example__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ui-visibility-example__toggle:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.ui-visibility-example__toggle input[type='checkbox'] {
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.ui-visibility-example__toggle-label {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.ui-visibility-example__toggle-status {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.ui-visibility-example__info {
  padding: 0.75rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
}

.ui-visibility-example__info-header {
  margin-bottom: 0.5rem;
}

.ui-visibility-example__info-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ui-visibility-example__info-text {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #1e3a8a;
}

.ui-visibility-example__info-text code {
  padding: 0.125rem 0.375rem;
  background: #dbeafe;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  color: #1e40af;
}

.ui-visibility-example__config {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.ui-visibility-example__config-header {
  margin-bottom: 0.5rem;
}

.ui-visibility-example__config-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ui-visibility-example__config-code {
  display: block;
  padding: 0.75rem;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #374151;
  overflow-x: auto;
  white-space: pre;
  text-align: left;
}

.ui-visibility-example__viewer {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  overflow: hidden;
}

.ui-visibility-example__viewer-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.ui-visibility-example__status-info {
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .ui-visibility-example__container {
    grid-template-columns: 1fr;
  }

  .ui-visibility-example__viewer {
    order: -1;
    min-height: 400px;
  }
}
</style>

