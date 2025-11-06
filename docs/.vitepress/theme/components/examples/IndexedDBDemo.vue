<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="indexeddb-demo"
        :driver="driver"
        :config="{ initialPath: 'indexeddb://', persist: true }"
      />
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IndexedDBDriver } from 'vuefinder';
import type { Driver } from 'vuefinder';

const driver = ref<Driver | null>(null);

onMounted(() => {
  driver.value = new IndexedDBDriver({
    dbName: 'vuefinder-demo',
    storage: 'indexeddb',
    readOnly: false,
  });
});
</script>

<style scoped>
.vf-demo-wrapper {
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  min-height: 420px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
