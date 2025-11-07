<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="demo-statusbar-select"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: false }"
      >
        <template #status-bar="{ selected, count }">
          <div class="statusbar-select-actions">
            <button
              class="statusbar-select-btn"
              :class="{ 'statusbar-select-btn--active': count > 0 }"
              :disabled="count === 0"
              @click="handleSelect(selected)"
            >
              <svg
                class="statusbar-select-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span v-if="count > 0">{{ count }} Selected</span>
              <span v-else>Select Files</span>
            </button>
          </div>
        </template>
      </vue-finder>
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
 import type { Driver, DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);

const handleSelect = (selected: DirEntry[]) => {
  if (selected.length === 0) {
    alert('No files selected');
    return;
  }

  const fileList = selected
    .map((file, index) => `${index + 1}. ${file.basename}${file.type === 'dir' ? ' (Folder)' : ''}`)
    .join('\n');

  alert(`Selected ${selected.length} item(s):\n\n${fileList}`);
};

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.vf-demo-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg);
  height: 340px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.statusbar-select-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.statusbar-select-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(147, 197, 253, 0.3);
  border-radius: 8px;
  background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
  color: #4c51bf;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(147, 197, 253, 0.2);
}

.statusbar-select-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(147, 197, 253, 0.25);
  background: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%);
  border-color: rgba(147, 197, 253, 0.4);
}

.statusbar-select-btn--active {
  background: linear-gradient(135deg, #fce7f3 0%, #fde2e4 100%);
  color: #be185d;
  border-color: rgba(251, 146, 60, 0.3);
  box-shadow: 0 1px 2px rgba(251, 146, 60, 0.2);
}

.statusbar-select-btn--active:hover:not(:disabled) {
  background: linear-gradient(135deg, #fde2e4 0%, #fce7f3 100%);
  box-shadow: 0 2px 4px rgba(251, 146, 60, 0.25);
  border-color: rgba(251, 146, 60, 0.4);
}

.statusbar-select-btn:disabled {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #9ca3af;
  border-color: rgba(209, 213, 219, 0.3);
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

.statusbar-select-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

</style>

