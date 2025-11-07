<template>
  <ClientOnly>
    <div v-if="driver" class="events-demo">
      <div class="events-demo__viewer">
        <vue-finder
          id="events-demo"
          :driver="driver"
          :config="{ initialPath: 'local://', persist: false }"
          @select="onSelectEvents"
          @path-change="onPathChangeEvents"
          @upload-complete="onUploadCompleteEvents"
          @delete-complete="onDeleteCompleteEvents"
          @error="onErrorEvents"
          @ready="onReadyEvents"
          @file-dclick="onFileDclickEvents"
          @folder-dclick="onFolderDclickEvents"
        />
      </div>

      <div class="events-demo__status-grid">
        <div class="events-demo__status-card">
          <strong class="events-demo__status-label">Ready:</strong>
          <span class="events-demo__status-value">{{ isReadyEvents ? '✅ Yes' : '❌ No' }}</span>
        </div>
        <div class="events-demo__status-card">
          <strong class="events-demo__status-label">Current Path:</strong>
          <span class="events-demo__status-value">{{ currentPathEvents || 'None' }}</span>
        </div>
        <div class="events-demo__status-card">
          <strong class="events-demo__status-label">Selected:</strong>
          <span class="events-demo__status-value">{{ selectedFilesEvents.length }} item(s)</span>
        </div>
      </div>

      <div class="events-demo__event-log-section">
        <div class="events-demo__event-log-header">
          <h3 class="events-demo__event-log-title">Event Log ({{ eventLog.length }} events)</h3>
          <button
            type="button"
            class="events-demo__clear-btn"
            :disabled="!eventLog.length"
            @click="clearEventLog"
          >
            Clear Log
          </button>
        </div>
        <div class="events-demo__event-log">
          <div v-if="!eventLog.length" class="events-demo__log-empty">
            No events yet. Interact with the file manager to see events here.
          </div>
          <div
            v-for="(event, index) in eventLog"
            :key="index"
            :class="['events-demo__event-item', `events-demo__event-item--${event.type}`]"
          >
            <div class="events-demo__event-header">
              <div class="events-demo__event-type-wrapper">
                <strong
                  :class="[
                    'events-demo__event-type',
                    event.type === 'error' && 'events-demo__event-type--error',
                  ]"
                >
                  {{ event.type.toUpperCase() }}
                </strong>
                <span v-if="event.count !== undefined" class="events-demo__event-count">
                  {{ event.count }}
                </span>
              </div>
              <small class="events-demo__event-timestamp">{{ event.timestamp }}</small>
            </div>
            <div class="events-demo__event-message">{{ event.message }}</div>
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
 import type { Driver, DirEntry } from 'vuefinder';

const driver = ref<Driver | null>(null);
const eventLog = ref<Array<{ type: string; message: string; timestamp: string; count?: number }>>([]);
const selectedFilesEvents = ref<DirEntry[]>([]);
const currentPathEvents = ref<string>('local://');
const uploadedFilesEvents = ref<DirEntry[]>([]);
const deletedFilesEvents = ref<DirEntry[]>([]);
const isReadyEvents = ref<boolean>(false);

const addEventLog = (type: string, message: string, count?: number) => {
  eventLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
    count,
  });
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20);
  }
};

const onSelectEvents = (items: DirEntry[]) => {
  selectedFilesEvents.value = items;
  addEventLog(
    'select',
    `Selected ${items.length} item(s): ${items.map((item) => item.basename).join(', ')}`,
    items.length
  );
};

const onPathChangeEvents = (path: string) => {
  currentPathEvents.value = path;
  addEventLog('path-change', `Path changed to: ${path}`);
};

const onUploadCompleteEvents = (files: DirEntry[]) => {
  uploadedFilesEvents.value = files;
  addEventLog(
    'upload-complete',
    `Uploaded ${files.length} file(s): ${files.map((file) => file.basename).join(', ')}`,
    files.length
  );
};

const onDeleteCompleteEvents = (deletedItems: DirEntry[]) => {
  deletedFilesEvents.value = deletedItems;
  addEventLog(
    'delete-complete',
    `Deleted ${deletedItems.length} item(s): ${deletedItems.map((item) => item.basename).join(', ')}`,
    deletedItems.length
  );
};

const onErrorEvents = (error: unknown) => {
  const errorMessage =
    typeof error === 'object' && error?.message
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unknown error occurred';
  addEventLog('error', `Error: ${errorMessage}`);
};

const onReadyEvents = () => {
  isReadyEvents.value = true;
  addEventLog('ready', 'VueFinder is ready and initialized');
};

const onFileDclickEvents = (event: { item: DirEntry }) => {
  addEventLog('file-dclick', `Double-clicked file: ${event.item.basename}`, 1);
};

const onFolderDclickEvents = (event: { item: DirEntry }) => {
  addEventLog('folder-dclick', `Double-clicked folder: ${event.item.basename}`, 1);
};

const clearEventLog = () => {
  eventLog.value = [];
};

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.events-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.events-demo__viewer {
  height: 340px;
}

.events-demo__status-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.events-demo__status-card {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 8px;
}

.events-demo__status-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.events-demo__status-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
}

.events-demo__event-log-section {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.events-demo__event-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.events-demo__event-log-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.events-demo__clear-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  background: var(--vp-c-bg);
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.events-demo__clear-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.events-demo__clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.events-demo__event-log {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
}

.events-demo__event-item {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-left: 4px solid var(--vp-c-border);
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.events-demo__event-item:last-child {
  margin-bottom: 0;
}

.events-demo__event-item--select {
  border-left-color: #4caf50;
}

.events-demo__event-item--path-change {
  border-left-color: #2196f3;
}

.events-demo__event-item--upload-complete {
  border-left-color: #9c27b0;
}

.events-demo__event-item--delete-complete {
  border-left-color: #f44336;
}

.events-demo__event-item--error {
  border-left-color: #ff5722;
}

.events-demo__event-item--ready {
  border-left-color: #4caf50;
}

.events-demo__event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.events-demo__event-type-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.events-demo__event-type {
  font-size: 0.6875rem;
  font-weight: 600;
}

.events-demo__event-type--error {
  color: #f44336;
}

.events-demo__event-count {
  padding: 0.125rem 0.375rem;
  background: var(--vp-c-bg-alt);
  border-radius: 10px;
  font-size: 0.625rem;
  font-weight: 600;
}

.events-demo__event-timestamp {
  font-size: 0.625rem;
  color: var(--vp-c-text-2);
}

.events-demo__event-message {
  font-size: 0.75rem;
  line-height: 1.5;
}

.events-demo__log-empty {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 2rem;
  font-size: 0.75rem;
}
</style>
