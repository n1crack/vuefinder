<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  adapter: Adapter;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
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
</script>

<template>
  <div style="margin: 20px 0">
    <h2>VueFinder Events Demo</h2>
    <p>
      This example demonstrates all VueFinder events. Interact with the file manager below to see
      events in action.
    </p>

    <!-- Status indicators -->
    <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap">
      <div
        style="
          padding: 10px;
          background: #e8f5e8;
          border-radius: 5px;
          border-left: 4px solid #4caf50;
        "
      >
        <strong>Ready:</strong> {{ isReadyEvents ? '✅ Yes' : '❌ No' }}
      </div>
      <div
        style="
          padding: 10px;
          background: #e3f2fd;
          border-radius: 5px;
          border-left: 4px solid #2196f3;
        "
      >
        <strong>Current Path:</strong> {{ currentPathEvents || 'None' }}
      </div>
      <div
        style="
          padding: 10px;
          background: #fff3e0;
          border-radius: 5px;
          border-left: 4px solid #ff9800;
        "
      >
        <strong>Selected:</strong> {{ selectedFilesEvents.length }} item(s)
      </div>
      <div
        style="
          padding: 10px;
          background: #f3e5f5;
          border-radius: 5px;
          border-left: 4px solid #9c27b0;
        "
      >
        <strong>Uploaded:</strong> {{ uploadedFilesEvents.length }} file(s)
      </div>
      <div
        style="
          padding: 10px;
          background: #ffebee;
          border-radius: 5px;
          border-left: 4px solid #f44336;
        "
      >
        <strong>Deleted:</strong> {{ deletedFilesEvents.length }} item(s)
      </div>
    </div>

    <!-- Event log -->
    <div style="margin: 20px 0">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        "
      >
        <h3>Event Log ({{ eventLog.length }} events)</h3>
        <button class="btn" :disabled="!eventLog.length" @click="clearEventLog">Clear Log</button>
      </div>
      <div
        style="
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 5px;
        "
      >
        <div v-if="!eventLog.length" style="text-align: center; color: #666; padding: 20px">
          No events yet. Interact with the file manager to see events here.
        </div>
        <div
          v-for="(event, index) in eventLog"
          :key="index"
          :style="{
            marginBottom: '8px',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: 'white',
            borderLeft: `4px solid ${
              event.type === 'select'
                ? '#4caf50'
                : event.type === 'path-change'
                  ? '#2196f3'
                  : event.type === 'upload-complete'
                    ? '#9c27b0'
                    : event.type === 'delete-complete'
                      ? '#f44336'
                      : event.type === 'error'
                        ? '#ff5722'
                        : event.type === 'ready'
                          ? '#4caf50'
                          : '#666'
            }`,
          }"
        >
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div>
              <strong :style="{ color: event.type === 'error' ? '#f44336' : '#333' }">
                {{ event.type.toUpperCase() }}
              </strong>
              <span
                v-if="event.count !== undefined"
                style="
                  margin-left: 8px;
                  padding: 2px 6px;
                  background: #e0e0e0;
                  border-radius: 10px;
                  font-size: 0.8em;
                "
              >
                {{ event.count }}
              </span>
            </div>
            <small style="color: #666">{{ event.timestamp }}</small>
          </div>
          <div style="margin-top: 4px; font-size: 0.9em; color: #555">
            {{ event.message }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- VueFinder with all events -->
  <vue-finder
    id="events-demo-vuefinder"
    :adapter="adapter"
    :config="config"
    :features="features"
    :theme="theme"
    @select="onSelectEvents"
    @path-change="onPathChangeEvents"
    @upload-complete="onUploadCompleteEvents"
    @delete-complete="onDeleteCompleteEvents"
    @error="onErrorEvents"
    @ready="onReadyEvents"
    @file-dclick="onFileDclickEvents"
    @folder-dclick="onFolderDclickEvents"
  />
</template>
