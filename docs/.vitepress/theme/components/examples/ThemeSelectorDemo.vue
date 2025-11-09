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
          id="demo-theme-selector"
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
const currentTheme = ref('silver');

const themes = [
  { value: 'silver', label: 'Silver' },
  { value: 'valorite', label: 'Valorite' },
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
  
  // Different preview images for variety
  const previewImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=150&fit=crop',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=150&fit=crop',
  ];
  
  let previewImageIndex = 0;
  
  const fileTypes = [
    { ext: 'txt', mime: 'text/plain', size: 1024 },
    { ext: 'pdf', mime: 'application/pdf', size: 245760 },
    { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 15360 },
    { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 32768 },
    { ext: 'jpg', mime: 'image/jpeg', size: 5120 },
    { ext: 'png', mime: 'image/png', size: 8192 },
    { ext: 'gif', mime: 'image/gif', size: 2048 },
    { ext: 'mp4', mime: 'video/mp4', size: 1048576 },
    { ext: 'mp3', mime: 'audio/mpeg', size: 4096 },
    { ext: 'zip', mime: 'application/zip', size: 65536 },
    { ext: 'js', mime: 'application/javascript', size: 2048 },
    { ext: 'css', mime: 'text/css', size: 3072 },
    { ext: 'html', mime: 'text/html', size: 4096 },
    { ext: 'json', mime: 'application/json', size: 1024 },
    { ext: 'xml', mime: 'application/xml', size: 2048 },
  ];

  const folders = [
    'documents',
    'images',
    'videos',
    'music',
    'downloads',
    'projects',
    'archive',
    'backup',
    'templates',
    'scripts',
  ];

  const files = [
    'readme',
    'config',
    'settings',
    'data',
    'report',
    'notes',
    'draft',
    'final',
    'backup',
    'temp',
    'log',
    'error',
    'info',
    'warning',
    'debug',
  ];

  const data: any[] = [];

  // Add folders
  folders.forEach((folder, index) => {
    data.push({
      dir: 'memory://',
      basename: folder,
      extension: '',
      path: `memory://${folder}`,
      storage: 'memory',
      type: 'dir',
      file_size: null,
      last_modified: now - index * 1000,
      mime_type: null,
      visibility: 'public',
    });
  });

  // Add files with various types
  files.forEach((file, fileIndex) => {
    const fileType = fileTypes[fileIndex % fileTypes.length];
    const fileData: any = {
      dir: 'memory://',
      basename: `${file}.${fileType.ext}`,
      extension: fileType.ext,
      path: `memory://${file}.${fileType.ext}`,
      storage: 'memory',
      type: 'file',
      file_size: fileType.size,
      last_modified: now - (fileIndex + folders.length) * 1000,
      mime_type: fileType.mime,
      visibility: 'public',
    };
    
    // Add different preview URLs for images
    if (fileType.mime.startsWith('image/')) {
      fileData.previewUrl = previewImages[previewImageIndex % previewImages.length];
      previewImageIndex++;
    }
    
    data.push(fileData);
  });

  return data;
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

