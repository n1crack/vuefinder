<script setup lang="ts">
// A practical use of the MenuBar slots: replace the menu bar with a single
// compact toolbar and hide the default toolbar and breadcrumb bar, so an
// embedded file manager costs one row of chrome instead of three.
import { computed, ref, onMounted } from 'vue';
import type { Driver } from 'vuefinder';
import CustomMenuBarBar from './CustomMenuBarBar.vue';

const compact = ref(true);

const config = computed(() => ({
  initialPath: 'local://',
  persist: false,
  // The slot replaces what is *inside* the menu bar; these remove the other
  // two bars entirely.
  showToolbar: !compact.value,
  showBreadcrumbBar: !compact.value,
}));

const driver = ref<Driver | null>(null);

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'https://vuefinder-api.ozdemir.be/api/files',
  });
});
</script>

<template>
  <div class="cmb-demo">
    <div class="cmb-demo__bar">
      <span class="cmb-demo__hint">
        One custom bar replaces three default ones — the actions are the real
        ones, driven by <code>useMenuItems()</code>.
      </span>
      <label class="cmb-demo__switch">
        <input v-model="compact" type="checkbox" />
        Compact layout
      </label>
    </div>

    <div class="cmb-demo__viewer">
      <ClientOnly>
        <vue-finder v-if="driver" id="demo-custom-menu-bar" :driver="driver" :config="config">
          <template #menu-items>
            <CustomMenuBarBar />
          </template>
        </vue-finder>
        <template #fallback>
          <div class="cmb-demo__loading">Loading demo...</div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.cmb-demo {
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.cmb-demo__bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.cmb-demo__hint {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.cmb-demo__hint code {
  font-size: 0.75rem;
}

.cmb-demo__switch {
  display: flex;
  flex: none;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

/* Definite height: VueFinder sizes itself with height:100%, which only
   resolves against a parent whose own height is definite. */
.cmb-demo__viewer {
  height: 420px;
}

.cmb-demo__loading {
  padding: 2rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (max-width: 768px) {
  .cmb-demo__viewer {
    height: 340px;
  }
}
</style>
