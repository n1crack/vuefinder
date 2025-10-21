<template>
  <div class="vuefinder__theme-selector">
    <div class="vuefinder__theme-selector__dropdown">
      <button 
        class="vuefinder__theme-selector__trigger"
        @click="toggleDropdown"
        :aria-expanded="isOpen"
        aria-haspopup="true"
      >
        <svg class="vuefinder__theme-selector__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <span class="vuefinder__theme-selector__label">{{ currentThemeConfig?.displayName }}</span>
        <svg class="vuefinder__theme-selector__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="6,9 12,15 18,9"/>
        </svg>
      </button>
      
      <div 
        v-if="isOpen" 
        class="vuefinder__theme-selector__menu"
        @click.stop
      >
        <div 
          v-for="theme in themes" 
          :key="theme.name"
          class="vuefinder__theme-selector__option"
          :class="{ 'vuefinder__theme-selector__option--active': currentTheme === theme.name }"
          @click="selectTheme(theme.name)"
        >
          <div class="vuefinder__theme-selector__option-preview" :data-theme="theme.name"></div>
          <div class="vuefinder__theme-selector__option-content">
            <div class="vuefinder__theme-selector__option-name">{{ theme.displayName }}</div>
            <div class="vuefinder__theme-selector__option-description">{{ theme.description }}</div>
          </div>
          <div v-if="currentTheme === theme.name" class="vuefinder__theme-selector__option-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted } from 'vue';
import { themes, getThemeConfig, type Theme } from '../utils/theme';

const currentTheme = inject<{ value: Theme }>('currentTheme');
const setTheme = inject<(theme: Theme) => void>('setTheme');

const isOpen = ref(false);

const currentThemeConfig = computed(() => {
  if (!currentTheme?.value) return null;
  return getThemeConfig(currentTheme.value);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (theme: Theme) => {
  if (setTheme) {
    setTheme(theme);
  }
  isOpen.value = false;
};

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.vuefinder__theme-selector')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
@reference "tailwindcss";

.vuefinder__theme-selector {
  @apply relative;
}

.vuefinder__theme-selector__dropdown {
  @apply relative;
}

.vuefinder__theme-selector__trigger {
  @apply flex items-center gap-2 px-3 py-2 rounded border cursor-pointer transition-all duration-200;
  background-color: var(--vf-bg-primary);
  border-color: var(--vf-border-primary);
  color: var(--vf-text-primary);
}

.vuefinder__theme-selector__trigger:hover {
  background-color: var(--vf-bg-hover);
  border-color: var(--vf-border-focus);
}

.vuefinder__theme-selector__trigger:focus {
  outline: none;
  border-color: var(--vf-border-focus);
  box-shadow: 0 0 0 2px var(--vf-interactive-focus);
}

.vuefinder__theme-selector__icon {
  @apply w-4 h-4;
  stroke: var(--vf-text-secondary);
}

.vuefinder__theme-selector__label {
  @apply text-sm font-medium;
  color: var(--vf-text-primary);
}

.vuefinder__theme-selector__chevron {
  @apply w-4 h-4 transition-transform duration-200;
  stroke: var(--vf-text-secondary);
}

.vuefinder__theme-selector__trigger[aria-expanded="true"] .vuefinder__theme-selector__chevron {
  @apply rotate-180;
}

.vuefinder__theme-selector__menu {
  @apply absolute top-full left-0 mt-1 w-64 rounded border shadow-lg z-50;
  background-color: var(--vf-bg-primary);
  border-color: var(--vf-border-primary);
  box-shadow: 0 10px 15px -3px var(--vf-shadow-md), 0 4px 6px -2px var(--vf-shadow-sm);
}

.vuefinder__theme-selector__option {
  @apply flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150;
}

.vuefinder__theme-selector__option:hover {
  background-color: var(--vf-bg-hover);
}

.vuefinder__theme-selector__option--active {
  background-color: var(--vf-bg-selected);
}

.vuefinder__theme-selector__option-preview {
  @apply w-8 h-8 rounded border-2 flex-shrink-0;
  border-color: var(--vf-border-primary);
}

.vuefinder__theme-selector__option-preview[data-theme="default-light"] {
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%);
}

.vuefinder__theme-selector__option-preview[data-theme="default-dark"] {
  background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #374151 100%);
}

.vuefinder__theme-selector__option-preview[data-theme="midnight"] {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.vuefinder__theme-selector__option-preview[data-theme="latte"] {
  background: linear-gradient(135deg, #faf7f0 0%, #f5f1e8 50%, #ede7d9 100%);
}

.vuefinder__theme-selector__option-content {
  @apply flex-1 min-w-0;
}

.vuefinder__theme-selector__option-name {
  @apply text-sm font-medium;
  color: var(--vf-text-primary);
}

.vuefinder__theme-selector__option-description {
  @apply text-xs mt-0.5;
  color: var(--vf-text-secondary);
}

.vuefinder__theme-selector__option-check {
  @apply w-4 h-4 flex-shrink-0;
  color: var(--vf-accent-primary);
}
</style>
