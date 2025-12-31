<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { createLocaleAtom } from '../../src/stores/i18n';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();

// Use the same global locale atom as VueFinder (automatically reads from localStorage)
const localeAtom = createLocaleAtom('vuefinder_locale', 'en');
const reactiveLocale = useStore(localeAtom);

// Computed property for v-model binding - always returns string, fallback to 'en'
const selectedLocale = computed({
  get: () => String(reactiveLocale.value || 'en'),
  set: (value: string) => localeAtom.set(value || 'en'),
});
</script>

<template>
  <div class="multilang-file-manager">
    <div class="language-selector">
      <label for="language-select">Language:</label>
      <select id="language-select" v-model="selectedLocale">
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

