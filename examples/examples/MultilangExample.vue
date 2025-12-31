<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

const selectedLocale = ref('en');

// Load saved language preference
onMounted(() => {
  const savedLocale = localStorage.getItem('vuefinder-locale');
  if (savedLocale) {
    selectedLocale.value = savedLocale;
  }
});

const updateLanguage = () => {
  // Save language preference
  localStorage.setItem('vuefinder-locale', selectedLocale.value);
  console.log('Language changed to:', selectedLocale.value);
};
</script>

<template>
  <div class="multilang-file-manager">
    <div class="language-selector">
      <label for="language-select">Language:</label>
      <select id="language-select" v-model="selectedLocale" @change="updateLanguage">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="ru">Русский</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="it">Italiano</option>
        <option value="ja">日本語</option>
      </select>
    </div>

    <vue-finder id="multilang_manager" :driver="driver" :locale="selectedLocale" :config="config" :features="features" />
  </div>
</template>

<style scoped>
.multilang-file-manager {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.language-selector label {
  font-weight: 500;
}

.language-selector select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}
</style>

