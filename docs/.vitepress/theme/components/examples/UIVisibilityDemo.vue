<template>
  <div class="ui-visibility-demo">
    <div class="ui-visibility-demo__controls">
      <div class="ui-visibility-demo__header">
        <h3 class="ui-visibility-demo__title">UI Visibility Settings</h3>
      </div>

      <div class="ui-visibility-demo__toggles">
        <label class="ui-visibility-demo__toggle">
          <input v-model="showMenuBar" type="checkbox" />
          <span class="ui-visibility-demo__toggle-label">Show Menu Bar</span>
          <span class="ui-visibility-demo__toggle-status">
            {{ showMenuBar ? 'Visible' : 'Hidden' }}
          </span>
        </label>
        <label class="ui-visibility-demo__toggle">
          <input v-model="showToolbar" type="checkbox" />
          <span class="ui-visibility-demo__toggle-label">Show Toolbar</span>
          <span class="ui-visibility-demo__toggle-status">
            {{ showToolbar ? 'Visible' : 'Hidden' }}
          </span>
        </label>
      </div>
    </div>

    <div class="ui-visibility-demo__viewer">
      <ClientOnly>
        <vue-finder
          v-if="driver"
          id="demo-ui-visibility"
          :driver="driver"
          :config="{
            initialPath: 'local://',
            persist: false,
            showMenuBar: showMenuBar,
            showToolbar: showToolbar,
          }"
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
const showMenuBar = ref(true);
const showToolbar = ref(true);

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'https://vuefinder-api.ozdemir.be/api/files',
  });
});
</script>

<style scoped>
.ui-visibility-demo {
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
}

.ui-visibility-demo__controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.ui-visibility-demo__header {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.ui-visibility-demo__title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ui-visibility-demo__toggles {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.ui-visibility-demo__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ui-visibility-demo__toggle:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
}

.ui-visibility-demo__toggle input[type='checkbox'] {
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.ui-visibility-demo__toggle-label {
  flex: 1;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.ui-visibility-demo__toggle-status {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.ui-visibility-demo__viewer {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  background: var(--vp-c-bg);
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .ui-visibility-demo__toggles {
    flex-direction: column;
  }

  .ui-visibility-demo__viewer {
    min-height: 300px;
  }
}
</style>

