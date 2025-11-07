<script setup lang="ts">
import { ref } from 'vue';
import type { Driver } from '../../src/adapters';
import type { ItemDclickEvent } from '../../src/types';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

const customDclickLog = ref<Array<{ type: string; message: string; timestamp: string }>>([]);

const addCustomDclickLog = (type: string, message: string) => {
  customDclickLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  });
};

const onCustomFileDclick = (event: ItemDclickEvent) => {
  const item = event.item;
  addCustomDclickLog('file-dclick', `Custom file double-click: ${item.basename}`);
  alert(
    `Custom File Double-Click!\n\nFile: ${item.basename}\nPath: ${item.path}\nSize: ${item.file_size ? (item.file_size / 1024).toFixed(2) + ' KB' : 'Unknown'}\nType: ${item.mime_type || 'Unknown'}`
  );
  // Prevent default preview behavior
  event.preventDefault();
};

const onCustomFolderDclick = (event: ItemDclickEvent) => {
  const item = event.item;
  addCustomDclickLog('folder-dclick', `Custom folder double-click: ${item.basename}`);
  alert(
    `Custom Folder Double-Click!\n\nFolder: ${item.basename}\nPath: ${item.path}\nStorage: ${item.storage}`
  );
  // Prevent default navigation behavior
  event.preventDefault();
};

const clearCustomDclickLog = () => {
  customDclickLog.value = [];
};
</script>

<template>
  <div class="custom-dclick-example">
    <div class="custom-dclick-example__header">
      <h2 class="custom-dclick-example__title">Custom Double-Click Events Demo</h2>
      <p class="custom-dclick-example__description">
        This example demonstrates custom double-click behavior. When you double-click files or
        folders, custom events will be triggered instead of the default actions.
      </p>
    </div>

    <!-- VueFinder with custom double-click events -->
    <div class="custom-dclick-example__viewer">
      <vue-finder
        id="custom-dclick-vuefinder"
        :driver="driver"
        :config="config"
        :features="features"
        @file-dclick="onCustomFileDclick"
        @folder-dclick="onCustomFolderDclick"
      />
    </div>

    <div class="custom-dclick-example__section">
      <h3 class="custom-dclick-example__section-title">Custom Behavior:</h3>
      <ul class="custom-dclick-example__behavior-list">
        <li>
          <strong>File double-click:</strong> Shows an alert with file information instead of
          opening preview
        </li>
        <li>
          <strong>Folder double-click:</strong> Shows an alert with folder information instead of
          navigating
        </li>
      </ul>
    </div>

    <!-- Custom event handlers -->
    <div class="custom-dclick-example__event-log-section">
      <div class="custom-dclick-example__event-log-header">
        <h3 class="custom-dclick-example__event-log-title">Event Log</h3>
        <button
          type="button"
          class="custom-dclick-example__clear-btn"
          :disabled="!customDclickLog.length"
          @click="clearCustomDclickLog"
        >
          Clear Log
        </button>
      </div>
      <div class="custom-dclick-example__event-log">
        <div
          v-for="(log, index) in customDclickLog"
          :key="index"
          class="custom-dclick-example__log-item"
        >
          <strong class="custom-dclick-example__log-type">{{ log.type }}:</strong>
          <span class="custom-dclick-example__log-message">{{ log.message }}</span>
          <small class="custom-dclick-example__log-timestamp">{{ log.timestamp }}</small>
        </div>
        <div v-if="!customDclickLog.length" class="custom-dclick-example__log-empty">
          No events yet. Try double-clicking files or folders in the file manager above.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dclick-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.custom-dclick-example__header {
  margin-bottom: 0.5rem;
}

.custom-dclick-example__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.custom-dclick-example__description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.custom-dclick-example__section {
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #4caf50;
  border-radius: 8px;
}

.custom-dclick-example__section-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.custom-dclick-example__behavior-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.6;
}

.custom-dclick-example__behavior-list li {
  margin-bottom: 0.375rem;
}

.custom-dclick-example__behavior-list li:last-child {
  margin-bottom: 0;
}

.custom-dclick-example__behavior-list strong {
  font-weight: 600;
  color: #374151;
}

.custom-dclick-example__event-log-section {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.custom-dclick-example__event-log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.custom-dclick-example__event-log-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.custom-dclick-example__clear-btn {
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

.custom-dclick-example__clear-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
}

.custom-dclick-example__clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-dclick-example__event-log {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
}

.custom-dclick-example__event-log::-webkit-scrollbar {
  width: 6px;
}

.custom-dclick-example__event-log::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.custom-dclick-example__event-log::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.custom-dclick-example__event-log::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.custom-dclick-example__log-item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  margin-bottom: 0.25rem;
}

.custom-dclick-example__log-item:last-child {
  margin-bottom: 0;
}

.custom-dclick-example__log-type {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
}

.custom-dclick-example__log-message {
  flex: 1;
  font-size: 0.6875rem;
  color: #374151;
}

.custom-dclick-example__log-timestamp {
  font-size: 0.625rem;
  color: #6b7280;
}

.custom-dclick-example__log-empty {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  font-size: 0.75rem;
  padding: 1rem;
}

.custom-dclick-example__viewer {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}
</style>
