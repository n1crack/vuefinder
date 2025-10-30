<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Adapter } from '../../src/adapters';

interface Props {
  adapter: Adapter;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();

const filesFromPopup = ref<{ path: string; name?: string }[]>([]);
const isPopup = computed(() => {
  return new URLSearchParams(window.location.search).get('popup') === 'true';
});

const sendSelectedToParent = (payload: unknown) => {
  try {
    const toPlain = (it: unknown) => {
      const path = typeof it?.path === 'string' ? it.path : undefined;
      const name =
        it?.name ??
        it?.basename ??
        it?.filename ??
        (typeof path === 'string' ? path.split('/').pop() : undefined);
      return { path, name };
    };
    const filesRaw = Array.isArray(payload) ? payload.map(toPlain) : [];
    const files = JSON.parse(JSON.stringify(filesRaw));
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'filesSelected', files }, '*');
    }
  } catch {
    // ignore
  }
  try {
    window.close();
  } catch {
    // ignore
  }
};

// Function to open VueFinder in a popup window
const openPopupWindow = () => {
  const url = new URL(window.location.href);
  url.searchParams.set('popup', 'true');
  window.open(
    url.toString(),
    'vuefinder-popup',
    'width=900,height=600,scrollbars=yes,resizable=yes'
  );
};

const handlePathChange = (path: string) => {
  console.log('handlePathChange called with path:', path);
};

// Listen messages from popup
const handleMessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'filesSelected') {
    filesFromPopup.value = event.data.files;
    console.log(
      'Selection completed:',
      Array.isArray(event.data.files) ? event.data.files.length : 0
    );
    if (event.source && 'postMessage' in event.source) {
      (event.source as Window).postMessage({ type: 'filesReceived' }, '*');
    }
  }
};

onMounted(() => {
  window.addEventListener('message', handleMessage);
  if (isPopup.value && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'popupReady' }, '*');
  }
});

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<template>
  <!-- Popup mode: Show only VueFinder -->
  <div v-if="isPopup" class="popup-container">
    <vue-finder
      id="popup-vuefinder"
      :adapter="adapter"
      style="height: 100%; width: 100%"
      :config="config"
      :features="features"
      :theme="theme"
      @path-change="handlePathChange"
      @select="handlePopupSelect"
    >
      <template #status-bar="{ selected, count }">
        <div class="vuefinder__status-bar__actions">
          <button
            class="border bg-emerald-800 text-white border-gray-300 dark:border-gray-600 rounded-sm px-2 p-0.5 disabled:opacity-50 not-disabled:hover:bg-emerald-700 not-disabled:cursor-pointer"
            :disabled="!count"
            @click="sendSelectedToParent(selected)"
          >
            Select ({{ count ?? 0 }} selected)
          </button>
        </div>
      </template>
    </vue-finder>
  </div>

  <!-- Regular window examples -->
  <div v-else>
    <div style="margin: 20px 0">
      <button class="btn" @click="openPopupWindow">Open VueFinder in Popup Window</button>
    </div>

    <!-- Display selected files -->
    <div
      v-if="filesFromPopup.length"
      style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px"
    >
      <h3>Selected Files from Popup ({{ filesFromPopup.length }} files):</h3>
      <ul>
        <li v-for="file in filesFromPopup" :key="file.path" style="margin: 5px 0">
          <strong>{{ file.name }}</strong> - {{ file.path }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
