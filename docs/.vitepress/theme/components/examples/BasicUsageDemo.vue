<template>
  <div class="vf-demo-wrapper">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="basic-usage-demo"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: false }"
      >
        <template #status-bar="{ selected, path, count }">
          <div class="vuefinder__status-bar__actions">
            <button
              class="rounded-xs border border-gray-300 p-0.5 not-disabled:cursor-pointer not-disabled:hover:text-sky-400 disabled:opacity-50 dark:border-gray-600"
              :disabled="!count"
              @click="
                () => {
                  console.log(selected);
                  console.log(path);
                  console.log(count);
                }
              "
            >
              Show Selected ({{ count ?? 0 }} selected)
            </button>
          </div>
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
  overflow: hidden;
  background: var(--vp-c-bg);
  min-height: 420px;
}

.vf-demo-loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.vuefinder__status-bar__actions {
  display: flex;
  gap: 0.5rem;
}
</style>
