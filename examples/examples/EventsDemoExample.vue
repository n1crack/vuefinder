<script setup lang="ts">
import { ref } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

const eventLog = ref<Array<{ type: string; message: string; timestamp: string; count?: number }>>(
  []
);
const selectedFilesEvents = ref<{ path: string; basename?: string }[]>([]);
const currentPathEvents = ref<string>('');
const uploadedFilesEvents = ref<{ path: string; basename?: string }[]>([]);
const deletedFilesEvents = ref<{ path: string; basename?: string }[]>([]);
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

const onSelectEvents = (items: { path: string; basename: string }[]) => {
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

const onUploadCompleteEvents = (files: { path: string; basename: string }[]) => {
  uploadedFilesEvents.value = files;
  addEventLog(
    'upload-complete',
    `Uploaded ${files.length} file(s): ${files.map((file) => file.basename).join(', ')}`,
    files.length
  );
};

const onDeleteCompleteEvents = (deletedItems: { path: string; basename: string }[]) => {
  deletedFilesEvents.value = deletedItems;
  addEventLog(
    'delete-complete',
    `Deleted ${deletedItems.length} item(s): ${deletedItems.map((item) => item.basename).join(', ')}`,
    deletedItems.length
  );
};

const onErrorEvents = (error: { message?: string } | string | null) => {
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

const onFileDclickEvents = (item: { basename: string }) => {
  addEventLog('file-dclick', `Double-clicked file: ${item.basename}`, 1);
  console.log('File double-clicked:', item);
};

const onFolderDclickEvents = (item: { basename: string }) => {
  addEventLog('folder-dclick', `Double-clicked folder: ${item.basename}`, 1);
  console.log('Folder double-clicked:', item);
};

const clearEventLog = () => {
  eventLog.value = [];
};

const getEventTypeClass = (type: string): string => {
  const typeMap: Record<string, string> = {
    select: 'events-demo-example__event-item--select',
    'path-change': 'events-demo-example__event-item--path-change',
    'upload-complete': 'events-demo-example__event-item--upload-complete',
    'delete-complete': 'events-demo-example__event-item--delete-complete',
    error: 'events-demo-example__event-item--error',
    ready: 'events-demo-example__event-item--ready',
  };
  return typeMap[type] || '';
};
</script>

<template>
  <div class="events-demo-example">
    <div class="events-demo-example__header">
      <h2 class="events-demo-example__title">VueFinder Events Demo</h2>
      <p class="events-demo-example__description">
        This example demonstrates all VueFinder events. Interact with the file manager below to see
        events in action.
      </p>
    </div>

    <!-- Status indicators -->
    <div class="events-demo-example__status-grid">
      <div class="events-demo-example__status-card events-demo-example__status-card--ready">
        <strong class="events-demo-example__status-label">Ready:</strong>
        <span class="events-demo-example__status-value">{{
          isReadyEvents ? '✅ Yes' : '❌ No'
        }}</span>
      </div>
      <div class="events-demo-example__status-card events-demo-example__status-card--path">
        <strong class="events-demo-example__status-label">Current Path:</strong>
        <span class="events-demo-example__status-value">{{ currentPathEvents || 'None' }}</span>
      </div>
      <div class="events-demo-example__status-card events-demo-example__status-card--selected">
        <strong class="events-demo-example__status-label">Selected:</strong>
        <span class="events-demo-example__status-value"
          >{{ selectedFilesEvents.length }} item(s)</span
        >
      </div>
      <div class="events-demo-example__status-card events-demo-example__status-card--uploaded">
        <strong class="events-demo-example__status-label">Uploaded:</strong>
        <span class="events-demo-example__status-value"
          >{{ uploadedFilesEvents.length }} file(s)</span
        >
      </div>
      <div class="events-demo-example__status-card events-demo-example__status-card--deleted">
        <strong class="events-demo-example__status-label">Deleted:</strong>
        <span class="events-demo-example__status-value"
          >{{ deletedFilesEvents.length }} item(s)</span
        >
      </div>
    </div>

    <!-- Event log -->
    <div class="events-demo-example__event-log-section">
      <div class="events-demo-example__event-log-header">
        <h3 class="events-demo-example__event-log-title">
          Event Log ({{ eventLog.length }} events)
        </h3>
        <button
          type="button"
          class="events-demo-example__clear-btn"
          :disabled="!eventLog.length"
          @click="clearEventLog"
        >
          Clear Log
        </button>
      </div>
      <div class="events-demo-example__event-log">
        <div v-if="!eventLog.length" class="events-demo-example__log-empty">
          No events yet. Interact with the file manager to see events here.
        </div>
        <div
          v-for="(event, index) in eventLog"
          :key="index"
          :class="['events-demo-example__event-item', getEventTypeClass(event.type)]"
        >
          <div class="events-demo-example__event-header">
            <div class="events-demo-example__event-type-wrapper">
              <strong
                :class="[
                  'events-demo-example__event-type',
                  event.type === 'error' && 'events-demo-example__event-type--error',
                ]"
              >
                {{ event.type.toUpperCase() }}
              </strong>
              <span v-if="event.count !== undefined" class="events-demo-example__event-count">
                {{ event.count }}
              </span>
            </div>
            <small class="events-demo-example__event-timestamp">{{ event.timestamp }}</small>
          </div>
          <div class="events-demo-example__event-message">{{ event.message }}</div>
        </div>
      </div>
    </div>

    <!-- VueFinder with all events -->
    <div class="events-demo-example__viewer">
      <vue-finder
        id="events-demo-vuefinder"
        :driver="driver"
        :config="config"
        :features="features"
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
  </div>
</template>

<style scoped>
.events-demo-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.events-demo-example__header {
  margin-bottom: 0.5rem;
}

.events-demo-example__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.events-demo-example__description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.events-demo-example__status-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.events-demo-example__status-card {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #6b7280;
  border-radius: 8px;
}

.events-demo-example__status-card--ready {
  border-left-color: #4caf50;
}

.events-demo-example__status-card--path {
  border-left-color: #2196f3;
}

.events-demo-example__status-card--selected {
  border-left-color: #ff9800;
}

.events-demo-example__status-card--uploaded {
  border-left-color: #9c27b0;
}

.events-demo-example__status-card--deleted {
  border-left-color: #f44336;
}

.events-demo-example__status-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.625rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.events-demo-example__status-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.events-demo-example__event-log-section {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.events-demo-example__event-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.events-demo-example__event-log-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.events-demo-example__clear-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #ffffff;
  color: #374151;
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.events-demo-example__clear-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

.events-demo-example__clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.events-demo-example__event-log {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
}

.events-demo-example__event-log::-webkit-scrollbar {
  width: 6px;
}

.events-demo-example__event-log::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.events-demo-example__event-log::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.events-demo-example__event-log::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.events-demo-example__event-item {
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #6b7280;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.events-demo-example__event-item:last-child {
  margin-bottom: 0;
}

.events-demo-example__event-item--select {
  border-left-color: #4caf50;
}

.events-demo-example__event-item--path-change {
  border-left-color: #2196f3;
}

.events-demo-example__event-item--upload-complete {
  border-left-color: #9c27b0;
}

.events-demo-example__event-item--delete-complete {
  border-left-color: #f44336;
}

.events-demo-example__event-item--error {
  border-left-color: #ff5722;
}

.events-demo-example__event-item--ready {
  border-left-color: #4caf50;
}

.events-demo-example__event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.events-demo-example__event-type-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.events-demo-example__event-type {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #374151;
}

.events-demo-example__event-type--error {
  color: #f44336;
}

.events-demo-example__event-count {
  padding: 0.125rem 0.375rem;
  background: #f3f4f6;
  border-radius: 10px;
  font-size: 0.625rem;
  font-weight: 600;
  color: #374151;
}

.events-demo-example__event-timestamp {
  font-size: 0.625rem;
  color: #6b7280;
}

.events-demo-example__event-message {
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.5;
}

.events-demo-example__log-empty {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
  font-size: 0.75rem;
}

.events-demo-example__viewer {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}
</style>
