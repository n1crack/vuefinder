<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  adapter: Adapter;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
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

const onCustomFileDclick = (item: {
  basename: string;
  path: string;
  file_size?: number;
  mime_type?: string;
}) => {
  addCustomDclickLog('file-dclick', `Custom file double-click: ${item.basename}`);
  alert(
    `Custom File Double-Click!\n\nFile: ${item.basename}\nPath: ${item.path}\nSize: ${item.file_size ? (item.file_size / 1024).toFixed(2) + ' KB' : 'Unknown'}\nType: ${item.mime_type || 'Unknown'}`
  );
};

const onCustomFolderDclick = (item: { basename: string; path: string; storage?: string }) => {
  addCustomDclickLog('folder-dclick', `Custom folder double-click: ${item.basename}`);
  alert(
    `Custom Folder Double-Click!\n\nFolder: ${item.basename}\nPath: ${item.path}\nStorage: ${item.storage}`
  );
};

const clearCustomDclickLog = () => {
  customDclickLog.value = [];
};
</script>

<template>
  <div style="margin: 20px 0">
    <h2>Custom Double-Click Events Demo</h2>
    <p>
      This example demonstrates custom double-click behavior. When you double-click files or
      folders, custom events will be triggered instead of the default actions.
    </p>

    <div
      style="
        margin: 20px 0;
        padding: 15px;
        background: #e8f5e8;
        border-radius: 5px;
        border-left: 4px solid #4caf50;
      "
    >
      <h3>Custom Behavior:</h3>
      <ul>
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
    <div style="margin: 20px 0">
      <h3>Event Log:</h3>
      <div
        style="
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ddd;
          padding: 10px;
          background: #f9f9f9;
        "
      >
        <div
          v-for="(log, index) in customDclickLog"
          :key="index"
          style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px"
        >
          <strong>{{ log.type }}:</strong> {{ log.message }}
          <small style="color: #666; margin-left: 10px">{{ log.timestamp }}</small>
        </div>
        <div v-if="!customDclickLog.length" style="color: #666; font-style: italic">
          No events yet. Try double-clicking files or folders above.
        </div>
      </div>
      <button
        class="btn"
        :disabled="!customDclickLog.length"
        style="margin-top: 10px"
        @click="clearCustomDclickLog"
      >
        Clear Log
      </button>
    </div>
  </div>

  <!-- VueFinder with custom double-click events -->
  <vue-finder
    id="custom-dclick-vuefinder"
    :adapter="adapter"
    :config="config"
    :features="features"
    :theme="theme"
    @file-dclick="onCustomFileDclick"
    @folder-dclick="onCustomFolderDclick"
  />
</template>
