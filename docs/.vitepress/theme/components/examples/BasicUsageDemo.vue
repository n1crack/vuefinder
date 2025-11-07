<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="basic-usage-demo"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: false }"
      /> 
      <template #fallback>
        <div class="vf-demo-loading">Loading demo...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RemoteDriver } from 'vuefinder';

const driver = ref<InstanceType<typeof RemoteDriver> | null>(null);

onMounted(() => {
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
});
</script>

<style scoped>
.vf-demo-wrapper {
  border-radius: 8px;
  background: var(--vp-c-bg);
  height: 340px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
