<template>
  <ClientOnly>
    <div v-if="driver" class="external-select-demo">
      <div class="external-select-demo__viewer">
        <vue-finder
          id="external-select-demo"
          :driver="driver"
          :config="{ initialPath: 'local://', persist: false }"
          @select="handleSelect"
        />
      </div>

      <div class="external-select-demo__section">
        <button
          class="external-select-demo__btn"
          :disabled="!selectedFiles.length"
          @click="handleButton"
        >
          Show Selected ({{ selectedFiles.length ?? 0 }} selected)
        </button>
        <div v-show="selectedFiles.length" class="external-select-demo__info">
          <h3 class="external-select-demo__info-title">
            Selected Files ({{ selectedFiles.length }} selected)
          </h3>
          <ul class="external-select-demo__list">
            <li v-for="file in selectedFiles" :key="file.path" class="external-select-demo__item">
              {{ file.path }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #fallback>
      <div style="padding: 2rem; text-align: center; color: #6b7280">Loading demo...</div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RemoteDriver } from 'vuefinder';
import type { Driver, DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);
const selectedFiles = ref<Array<{ path: string; name?: string }>>([]);

const handleSelect = (selection: Array<{ path: string; name?: string }>) => {
  selectedFiles.value = selection;
};

const handleButton = () => {
  console.log(selectedFiles.value);
};

onMounted(() => {
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.external-select-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.external-select-demo__viewer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  height: 340px;
}

.external-select-demo__section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.external-select-demo__btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 1rem;
}

.external-select-demo__btn:hover:not(:disabled) {
  opacity: 0.9;
}

.external-select-demo__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.external-select-demo__info {
  margin-top: 1rem;
}

.external-select-demo__info-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.external-select-demo__list {
  margin: 0;
  padding-left: 1.5rem;
  list-style: disc;
}

.external-select-demo__item {
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}
</style>
