<template>
  <div class="ui-visibility-demo">
    <div class="ui-visibility-demo__controls">
      <div class="ui-visibility-demo__header">
        <h3 class="ui-visibility-demo__title">UI Visibility Settings</h3>
      </div>

      <!-- The checked state already says visible/hidden, so the chips carry it
           visually instead of spending a fixed-width word on each one. That
           keeps all three on a single row. -->
      <div class="ui-visibility-demo__toggles">
        <label
          class="ui-visibility-demo__toggle"
          :class="{ 'ui-visibility-demo__toggle--on': showMenuBar }"
        >
          <input v-model="showMenuBar" type="checkbox" class="ui-visibility-demo__input" />
          <span class="ui-visibility-demo__switch" aria-hidden="true"></span>
          <span class="ui-visibility-demo__toggle-label">Menu Bar</span>
        </label>
        <label
          class="ui-visibility-demo__toggle"
          :class="{ 'ui-visibility-demo__toggle--on': showToolbar }"
        >
          <input v-model="showToolbar" type="checkbox" class="ui-visibility-demo__input" />
          <span class="ui-visibility-demo__switch" aria-hidden="true"></span>
          <span class="ui-visibility-demo__toggle-label">Toolbar</span>
        </label>
        <label
          class="ui-visibility-demo__toggle"
          :class="{ 'ui-visibility-demo__toggle--on': showBreadcrumbBar }"
        >
          <input v-model="showBreadcrumbBar" type="checkbox" class="ui-visibility-demo__input" />
          <span class="ui-visibility-demo__switch" aria-hidden="true"></span>
          <span class="ui-visibility-demo__toggle-label">Breadcrumb Bar</span>
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
            showBreadcrumbBar: showBreadcrumbBar,
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
const showBreadcrumbBar = ref(true);

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
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.ui-visibility-demo__toggle {
  display: inline-flex;
  flex: none;
  gap: 0.5rem;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
}

/* The native control stays focusable but invisible; the track below is what
   the user actually sees. */
.ui-visibility-demo__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.ui-visibility-demo__switch {
  position: relative;
  flex: none;
  width: 30px;
  height: 17px;
  background: var(--vp-c-gray-soft);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.ui-visibility-demo__switch::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
  content: '';
  background: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
  transition: transform 0.2s ease;
}

.ui-visibility-demo__toggle--on .ui-visibility-demo__switch {
  background: var(--vp-c-brand-1);
}

.ui-visibility-demo__toggle--on .ui-visibility-demo__switch::after {
  transform: translateX(13px);
}

.ui-visibility-demo__input:focus-visible + .ui-visibility-demo__switch {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.ui-visibility-demo__toggle-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
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
  .ui-visibility-demo__viewer {
    min-height: 300px;
  }
}
</style>

