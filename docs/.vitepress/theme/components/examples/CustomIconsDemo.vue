<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="custom-icons-demo"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: false }"
      >
        <template #icon="{ item }">
          <span v-if="item.extension === 'txt'" style="font-size: 1.5em">📄</span>
          <span v-else-if="item.extension === 'pdf'" style="font-size: 1.5em">📕</span>
          <span v-else-if="item.extension === 'jpg' || item.extension === 'png'" style="font-size: 1.5em">🖼️</span>
        </template>
      </vue-finder>
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RemoteDriver } from 'vuefinder';
import type { Driver } from 'vuefinder';

const driver = ref<Driver | null>(null);

onMounted(() => {
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
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
