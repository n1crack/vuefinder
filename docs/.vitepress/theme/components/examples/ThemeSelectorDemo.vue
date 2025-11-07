<template>
  <div class="theme-selector-demo">
    <div class="theme-selector">
      <label class="theme-label">Select Theme:</label>
      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.value"
          :class="['theme-button', { active: currentTheme === theme.value }]"
          :data-theme="theme.value"
          @click="currentTheme = theme.value"
        >
          <span class="theme-name">{{ theme.label }}</span>
        </button>
      </div>
    </div>
    <div class="vf-demo-wrapper">
      <ClientOnly>
        <vue-finder
          v-if="driver"
          id="theme-selector-demo"
          :driver="driver"
          :config="{ initialPath: 'memory://', persist: false, theme: currentTheme }"
        />
        <template #fallback>
          <div class="vf-demo-loading">Loading demo...</div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Driver } from 'vuefinder';

const driver = ref<Driver | null>(null);
const currentTheme = ref('light');

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'latte', label: 'Latte' },
  { value: 'rose', label: 'Rose' },
  { value: 'mythril', label: 'Mythril' },
  { value: 'lime', label: 'Lime' },
  { value: 'sky', label: 'Sky' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'palenight', label: 'Palenight' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'code', label: 'Code' },
];

const createSampleData = () => {
  const now = Date.now();
  return [
    {
      dir: 'memory://',
      basename: 'example.txt',
      extension: 'txt',
      path: 'memory://example.txt',
      storage: 'memory',
      type: 'file',
      file_size: 1024,
      last_modified: now,
      mime_type: 'text/plain',
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'documents',
      extension: '',
      path: 'memory://documents',
      storage: 'memory',
      type: 'dir',
      file_size: null,
      last_modified: now,
      mime_type: null,
      visibility: 'public',
    },
    {
      dir: 'memory://',
      basename: 'image.jpg',
      extension: 'jpg',
      path: 'memory://image.jpg',
      storage: 'memory',
      type: 'file',
      file_size: 5120,
      last_modified: now,
      mime_type: 'image/jpeg',
      visibility: 'public',
      previewUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=150&fit=crop',
    },
  ];
};

onMounted(async () => {
  const { ArrayDriver } = await import('vuefinder');
  driver.value = new ArrayDriver({
    files: createSampleData(),
    storage: 'memory',
  });
});
</script>

<style scoped>
.theme-selector-demo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.theme-selector {
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.theme-label {
  display: block;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.theme-button {
  padding: 0.625rem 1rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.theme-button:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theme-button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.theme-name {
  display: block;
}

.vf-demo-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg);
  height: 400px;
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .theme-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.5rem;
  }

  .theme-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>

