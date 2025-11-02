<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Driver } from '../../src/adapters';
import type { FeaturesConfig, FeaturesPreset } from '../../src/types';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
}

const props = defineProps<Props>();

// All available features for the toggle UI
const allFeatures = [
  { key: 'search', label: 'Search' },
  { key: 'preview', label: 'Preview' },
  { key: 'rename', label: 'Rename' },
  { key: 'upload', label: 'Upload' },
  { key: 'delete', label: 'Delete' },
  { key: 'newfile', label: 'New File' },
  { key: 'newfolder', label: 'New Folder' },
  { key: 'download', label: 'Download' },
  { key: 'edit', label: 'Edit' },
  { key: 'archive', label: 'Archive' },
  { key: 'unarchive', label: 'Unarchive' },
  { key: 'fullscreen', label: 'Full Screen' },
  { key: 'language', label: 'Language' },
  { key: 'move', label: 'Move' },
  { key: 'copy', label: 'Copy' },
  { key: 'history', label: 'History' },
  { key: 'theme', label: 'Theme' },
  { key: 'pinned', label: 'Pinned' },
] as const;

// Helper to create features object with all features explicitly set
const createFeaturesObject = (enabledKeys: string[] = []): FeaturesConfig => {
  const features: FeaturesConfig = {};
  allFeatures.forEach((f) => {
    features[f.key] = enabledKeys.includes(f.key);
  });
  return features;
};

// Feature configuration examples
const featureMode = ref<'advanced' | 'simple' | 'custom'>('advanced');

// Initialize with simple preset defaults
const defaultEnabled = [
  'search',
  'preview',
  'rename',
  'upload',
  'delete',
  'newfile',
  'newfolder',
  'download',
];
const customFeatures = ref<FeaturesConfig>(createFeaturesObject(defaultEnabled));

const computedFeatures = computed<FeaturesPreset | FeaturesConfig>(() => {
  if (featureMode.value === 'custom') {
    return { ...customFeatures.value };
  }
  return featureMode.value;
});

const configDisplay = computed(() => {
  if (featureMode.value === 'custom') {
    // Show all features with their explicit boolean values - formatted nicely
    return JSON.stringify(customFeatures.value, null, 2);
  }
  return `"${featureMode.value}"`;
});

const toggleFeature = (featureKey: string) => {
  // Ensure all features are always present in the object
  const current = customFeatures.value[featureKey as keyof FeaturesConfig];
  customFeatures.value = {
    ...customFeatures.value,
    [featureKey]: current ? false : true,
  };
};

const resetToPreset = (preset: 'simple' | 'advanced') => {
  featureMode.value = preset;

  if (preset === 'simple') {
    // Simple preset: only basic features enabled
    const simpleEnabled = [
      'search',
      'preview',
      'rename',
      'upload',
      'delete',
      'newfile',
      'newfolder',
      'download',
    ];
    customFeatures.value = createFeaturesObject(simpleEnabled);
  } else {
    // Advanced preset: all features enabled
    const allEnabled = allFeatures.map((f) => f.key);
    customFeatures.value = createFeaturesObject(allEnabled);
  }
};
</script>

<template>
  <div class="features-example">
    <div class="features-example__container">
      <div class="features-example__controls">
        <div class="features-example__header">
          <h3 class="features-example__title">Feature Configuration</h3>
          <div class="features-example__mode-badge">{{ featureMode }}</div>
        </div>

        <div class="features-example__presets">
          <button
            type="button"
            class="features-example__preset-btn"
            :class="{ 'features-example__preset-btn--active': featureMode === 'advanced' }"
            @click="
              resetToPreset('advanced');
              featureMode = 'advanced';
            "
          >
            <span class="features-example__preset-name">Advanced</span>
            <span class="features-example__preset-desc">All Features</span>
          </button>
          <button
            type="button"
            class="features-example__preset-btn"
            :class="{ 'features-example__preset-btn--active': featureMode === 'simple' }"
            @click="
              resetToPreset('simple');
              featureMode = 'simple';
            "
          >
            <span class="features-example__preset-name">Simple</span>
            <span class="features-example__preset-desc">Basic Only</span>
          </button>
          <button
            type="button"
            class="features-example__preset-btn"
            :class="{ 'features-example__preset-btn--active': featureMode === 'custom' }"
            @click="featureMode = 'custom'"
          >
            <span class="features-example__preset-name">Custom</span>
            <span class="features-example__preset-desc">Select</span>
          </button>
        </div>

        <div v-if="featureMode === 'custom'" class="features-example__custom-features">
          <div class="features-example__feature-grid">
            <button
              v-for="feature in allFeatures"
              :key="feature.key"
              type="button"
              class="features-example__feature-btn"
              :class="{
                'features-example__feature-btn--active': customFeatures[feature.key] === true,
              }"
              @click="toggleFeature(feature.key)"
            >
              {{ feature.label }}
            </button>
          </div>
        </div>

        <div class="features-example__config">
          <div class="features-example__config-header">
            <span class="features-example__config-label">Configuration</span>
          </div>
          <pre class="features-example__config-code">{{ configDisplay }}</pre>
        </div>
      </div>

      <div class="features-example__viewer">
        <h3 class="features-example__viewer-title">VueFinder Preview</h3>
        <vue-finder
          id="features_demo"
          :driver="props.driver"
          :config="props.config"
          :features="computedFeatures"
        >
          <template #status-bar="{ count }">
            <div class="vuefinder__status-bar__actions">
              <div class="features-example__status-info">
                <strong>Features Mode:</strong> {{ featureMode }}
                <br />
                <strong>Selected:</strong> {{ count ?? 0 }} item(s)
              </div>
            </div>
          </template>
        </vue-finder>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-example {
  height: 100%;
  width: 100%;
  max-height: 200px;
}

.features-example__container {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1rem;
  height: 100%;
}

.features-example__controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 100%;
}

.features-example__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.125rem;
}

.features-example__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.features-example__mode-badge {
  padding: 0.1875rem 0.5rem;
  background: #f9fafb;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: capitalize;
}

.features-example__presets {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.features-example__preset-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.0625rem;
  padding: 0.5rem 0.25rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.features-example__preset-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.features-example__preset-desc {
  font-size: 0.5625rem;
  color: #9ca3af;
}

.features-example__preset-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.features-example__preset-btn--active {
  background: #f3f4f6;
  border-color: #374151;
}

.features-example__preset-btn--active .features-example__preset-name {
  color: #374151;
}

.features-example__custom-features {
  padding: 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.features-example__feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.25rem;
}

.features-example__feature-btn {
  padding: 0.375rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #ffffff;
  color: #374151;
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.features-example__feature-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.features-example__feature-btn--active {
  background: #374151;
  color: #ffffff;
  border-color: #374151;
}

.features-example__feature-btn--active:hover {
  background: #4b5563;
  border-color: #4b5563;
}

.features-example__config {
  margin-top: 0.125rem;
  padding: 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.features-example__config-header {
  margin-bottom: 0.375rem;
}

.features-example__config-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.features-example__config-code {
  display: block;
  padding: 0.5rem;
  margin: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 0.625rem;
  line-height: 1.5;
  color: #374151;
  overflow-x: auto;
  overflow-y: auto;
  white-space: pre;
  text-align: left;
  max-height: 200px;
}

.features-example__config-code::-webkit-scrollbar {
  height: 6px;
}

.features-example__config-code::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.features-example__config-code::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.features-example__config-code::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.features-example__viewer {
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  overflow: hidden;
}

.features-example__viewer-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.features-example__status-info {
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
}
</style>
