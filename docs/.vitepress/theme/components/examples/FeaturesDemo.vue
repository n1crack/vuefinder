<template>
  <ClientOnly>
    <div v-if="driver" class="features-demo">
      <div class="features-demo__container">
        <div class="features-demo__header-section">
          <h3 class="features-demo__viewer-title">VueFinder Preview</h3>
          <div ref="dropdownWrapperRef" class="features-demo__dropdown-wrapper">
            <button
              type="button"
              class="features-demo__mode-btn"
              :class="{ 'features-demo__mode-btn--active': isDropdownOpen }"
              @click.stop="toggleDropdown"
            >
              <span class="features-demo__mode-btn-text">Mode: {{ featureMode }}</span>
              <span class="features-demo__mode-btn-icon">▼</span>
            </button>
            <div
              v-if="isDropdownOpen"
              v-click-outside="closeDropdown"
              class="features-demo__dropdown"
              @click.stop
            >
              <div class="features-demo__dropdown-content">
                <div class="features-demo__presets">
                  <button
                    type="button"
                    class="features-demo__preset-btn"
                    :class="{ 'features-demo__preset-btn--active': featureMode === 'advanced' }"
                    @click="resetToPreset('advanced')"
                  >
                    <span class="features-demo__preset-name">Advanced</span>
                    <span class="features-demo__preset-desc">All Features</span>
                  </button>
                  <button
                    type="button"
                    class="features-demo__preset-btn"
                    :class="{ 'features-demo__preset-btn--active': featureMode === 'simple' }"
                    @click="resetToPreset('simple')"
                  >
                    <span class="features-demo__preset-name">Simple</span>
                    <span class="features-demo__preset-desc">Basic Only</span>
                  </button>
                  <button
                    type="button"
                    class="features-demo__preset-btn"
                    :class="{ 'features-demo__preset-btn--active': featureMode === 'custom' }"
                    @click="featureMode = 'custom'; isDropdownOpen = true"
                  >
                    <span class="features-demo__preset-name">Custom</span>
                    <span class="features-demo__preset-desc">Select</span>
                  </button>
                </div>

                <div v-if="featureMode === 'custom'" class="features-demo__custom-features">
                  <div class="features-demo__custom-features-header">
                    <span class="features-demo__custom-features-title">Custom Features</span>
                  </div>
                  <div class="features-demo__feature-grid">
                    <button
                      v-for="feature in allFeatures"
                      :key="feature.key"
                      type="button"
                      class="features-demo__feature-btn"
                      :class="{
                        'features-demo__feature-btn--active': customFeatures[feature.key] === true,
                      }"
                      @click="toggleFeature(feature.key)"
                    >
                      {{ feature.label }}
                    </button>
                  </div>
                </div>

                <div class="features-demo__config">
                  <div class="features-demo__config-header">
                    <span class="features-demo__config-label">Configuration</span>
                  </div>
                  <pre class="features-demo__config-code">{{ configDisplay }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="features-demo__viewer">
          <vue-finder
            id="features_demo"
            :driver="driver"
            :config="{ initialPath: 'local://', persist: false }"
            :features="computedFeatures"
          >
            <template #status-bar="{ count }">
              <div class="vuefinder__status-bar__actions">
                <div class="features-demo__status-info">
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
    <template #fallback>
      <div style="padding: 2rem; text-align: center; color: #6b7280">Loading demo...</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { RemoteDriver } from 'vuefinder';
import type { FeaturesConfig, FeaturesPreset, Driver } from 'vuefinder';

// Type for element with click outside event handler
interface ElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void;
}

const driver = ref<Driver | null>(null);
const isDropdownOpen = ref(false);
const dropdownWrapperRef = ref<HTMLElement | null>(null);

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

const createFeaturesObject = (enabledKeys: string[] = []): FeaturesConfig => {
  const features: FeaturesConfig = {};
  allFeatures.forEach((f) => {
    features[f.key as keyof FeaturesConfig] = enabledKeys.includes(f.key);
  });
  return features;
};

const featureMode = ref<'advanced' | 'simple' | 'custom'>('advanced');
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
  return featureMode.value as FeaturesPreset;
});

const configDisplay = computed(() => {
  if (featureMode.value === 'custom') {
    return JSON.stringify(customFeatures.value, null, 2);
  }
  return `"${featureMode.value}"`;
});

const toggleFeature = (featureKey: string) => {
  const current = customFeatures.value[featureKey as keyof FeaturesConfig];
  customFeatures.value = {
    ...customFeatures.value,
    [featureKey]: current ? false : true,
  } as FeaturesConfig;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

// Click outside directive
const vClickOutside = {
  mounted(el: ElementWithClickOutside, binding: { value: () => void }) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      const target = event.target as Node;
      // Don't close if clicking inside the dropdown
      if (el.contains(target)) {
        return;
      }
      // Don't close if clicking the button or wrapper
      if (dropdownWrapperRef.value && dropdownWrapperRef.value.contains(target)) {
        return;
      }
      binding.value();
    };
    // Use nextTick to ensure DOM is ready and event listeners are set up after Vue's handlers
    nextTick(() => {
      document.addEventListener('click', el.clickOutsideEvent!);
    });
  },
  unmounted(el: ElementWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  },
};

const resetToPreset = (preset: 'simple' | 'advanced') => {
  featureMode.value = preset;

  if (preset === 'simple') {
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
    const allEnabled = allFeatures.map((f) => f.key);
    customFeatures.value = createFeaturesObject(allEnabled);
  }
  
  // Close dropdown when selecting a preset (not custom)
  closeDropdown();
};

onMounted(() => {
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.features-demo {
  height: 100%;
  width: 100%;
  max-height: 600px;
}

.features-demo__container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.features-demo__header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.features-demo__viewer-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.features-demo__dropdown-wrapper {
  position: relative;
}

.features-demo__mode-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.features-demo__mode-btn:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand);
}

.features-demo__mode-btn--active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
}

.features-demo__mode-btn-text {
  text-transform: capitalize;
}

.features-demo__mode-btn-icon {
  font-size: 0.625rem;
  transition: transform 0.2s ease;
}

.features-demo__mode-btn--active .features-demo__mode-btn-icon {
  transform: rotate(180deg);
}

.features-demo__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 100;
  min-width: 360px;
  max-width: 450px;
  max-height: 80vh;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.features-demo__dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.features-demo__presets {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
}

.features-demo__preset-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.0625rem;
  padding: 0.5rem 0.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.features-demo__preset-name {
  font-size: 0.75rem;
  font-weight: 600;
}

.features-demo__preset-desc {
  font-size: 0.5625rem;
  color: var(--vp-c-text-2);
}

.features-demo__preset-btn:hover {
  background: var(--vp-c-bg-soft);
}

.features-demo__preset-btn--active {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.features-demo__custom-features {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
}

.features-demo__custom-features-header {
  margin-bottom: 0.5rem;
}

.features-demo__custom-features-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.features-demo__feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.25rem;
}

.features-demo__feature-btn {
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.features-demo__feature-btn:hover {
  background: var(--vp-c-bg-soft);
}

.features-demo__feature-btn--active {
  background: var(--vp-c-brand);
  color: var(--vp-c-bg);
  border-color: var(--vp-c-brand);
}

.features-demo__config {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  margin-top: 0.25rem;
}

.features-demo__config-header {
  margin-bottom: 0.5rem;
}

.features-demo__config-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.features-demo__config-code {
  display: block;
  padding: 0.75rem;
  margin: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  font-family: var(--vp-font-mono);
  font-size: 0.6875rem;
  line-height: 1.6;
  overflow-x: auto;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: left;
  max-height: 250px;
  color: var(--vp-c-text-1);
}

.features-demo__viewer {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 500px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.features-demo__status-info {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-demo__header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .features-demo__dropdown-wrapper {
    width: 100%;
  }

  .features-demo__mode-btn {
    width: 100%;
    justify-content: space-between;
  }

  .features-demo__dropdown {
    right: auto;
    left: 0;
    width: 100%;
    min-width: auto;
  }

  .features-demo__viewer {
    min-height: 400px;
  }
}
</style>
