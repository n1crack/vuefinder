<template>
  <section class="vf-hero-demo">
    <ClientOnly>
      <vue-finder
        v-if="driver"
        id="home_hero_demo"
        :driver="driver"
        :config="{ initialPath: 'local://', persist: true }"
      />
      <template #fallback>
        <div class="vf-hero-demo__loading">Loading VueFinder…</div>
      </template>
    </ClientOnly>
  </section>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';

const driver = ref(null);

async function initDriver() {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'http://vuefinder-api-php.test/api/files'
  });
}

onMounted(() => {
  initDriver();
});
</script>

<style scoped>
.vf-hero-demo { 
    margin: auto; 
    padding-top: 2rem;
    max-width: 800px; 
    height: 420px;
}
.vf-hero-demo__loading { 
    padding: 16px; text-align: center; opacity: .8; 
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>


