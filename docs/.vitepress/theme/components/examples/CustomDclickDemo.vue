<template>
  <ClientOnly>
    <div v-if="driver" class="custom-dclick-demo">
      <div class="custom-dclick-demo__viewer">
        <vue-finder
          id="custom-dclick-demo"
          :driver="driver"
          :config="{ initialPath: 'local://', persist: false }"
          @file-dclick="onCustomFileDclick"
          @folder-dclick="onCustomFolderDclick"
        />
      </div>

      <div class="custom-dclick-demo__event-log-section">
        <div class="custom-dclick-demo__event-log-header">
          <h3 class="custom-dclick-demo__event-log-title">Event Log</h3>
          <button
            type="button"
            class="custom-dclick-demo__clear-btn"
            :disabled="!customDclickLog.length"
            @click="clearCustomDclickLog"
          >
            Clear Log
          </button>
        </div>
        <div class="custom-dclick-demo__event-log">
          <div
            v-for="(log, index) in customDclickLog"
            :key="index"
            class="custom-dclick-demo__log-item"
          >
            <strong class="custom-dclick-demo__log-type">{{ log.type }}:</strong>
            <span class="custom-dclick-demo__log-message">{{ log.message }}</span>
            <small class="custom-dclick-demo__log-timestamp">{{ log.timestamp }}</small>
          </div>
          <div v-if="!customDclickLog.length" class="custom-dclick-demo__log-empty">
            No events yet. Try double-clicking files or folders.
          </div>
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
import type { Driver, CancelableDclickEvent } from 'vuefinder';

const driver = ref<Driver | null>(null);
const customDclickLog = ref<Array<{ type: string; message: string; timestamp: string }>>([]);

const addCustomDclickLog = (type: string, message: string) => {
  customDclickLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
};

const onCustomFileDclick = (event: CancelableDclickEvent) => {
    console.log(event);
  const item = event.item;
  addCustomDclickLog('file-dclick', `Custom file double-click: ${item.basename}`);
  alert(
    `Custom File Double-Click!\n\nFile: ${item.basename}\nPath: ${item.path}\nSize: ${item.file_size ? (item.file_size / 1024).toFixed(2) + ' KB' : 'Unknown'}\nType: ${item.mime_type || 'Unknown'}`
  );
  // Prevent default preview behavior
  event.preventDefault();
};

const onCustomFolderDclick = (event: CancelableDclickEvent) => {
  const item = event.item;
  addCustomDclickLog('folder-dclick', `Custom folder double-click: ${item.basename}`);
  alert(`Custom Folder Double-Click!\n\nFolder: ${item.basename}\nPath: ${item.path}`);
  // Prevent default navigation behavior
  event.preventDefault();
};

const clearCustomDclickLog = () => {
  customDclickLog.value = [];
};

onMounted(() => {
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.custom-dclick-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.custom-dclick-demo__viewer {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  height: 340px;
}

.custom-dclick-demo__event-log-section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.custom-dclick-demo__event-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.custom-dclick-demo__event-log-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.custom-dclick-demo__clear-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.custom-dclick-demo__clear-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.custom-dclick-demo__clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-dclick-demo__event-log {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
}

.custom-dclick-demo__log-item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  margin-bottom: 0.25rem;
}

.custom-dclick-demo__log-item:last-child {
  margin-bottom: 0;
}

.custom-dclick-demo__log-type {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.custom-dclick-demo__log-message {
  flex: 1;
  font-size: 0.6875rem;
}

.custom-dclick-demo__log-timestamp {
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.custom-dclick-demo__log-empty {
  text-align: center;
  color: var(--vp-c-text-2);
  font-style: italic;
  font-size: 0.75rem;
  padding: 1rem;
}
</style>
