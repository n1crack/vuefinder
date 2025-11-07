---
outline: deep
---

# Themes

Example showing how to implement a theme selector for VueFinder with all available themes.

## Live Demo

<ClientOnly>
  <ThemeSelectorDemo />
</ClientOnly>

## Code Example

```vue
<template>
  <div class="theme-selector-demo">
    <div class="theme-selector">
      <label class="theme-label">Select Theme:</label>
      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.value"
          :class="['theme-button', { active: currentTheme === theme.value }]"
          @click="currentTheme = theme.value"
        >
          {{ theme.label }}
        </button>
      </div>
    </div>
    <vue-finder
      id="themed-finder"
      :driver="driver"
      :config="{
        initialPath: 'memory://',
        persist: false,
        theme: currentTheme,
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrayDriver } from 'vuefinder';

const currentTheme = ref('light');

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'latte', label: 'Latte' },
  { value: 'rose', label: 'Rose' },
  { value: 'mythril', label: 'Mythril' },
  { value: 'lime', label: 'Lime' },
  { value: 'sky', label: 'Sky' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'palenight', label: 'Palenight' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'code', label: 'Code' },
];

const driver = new ArrayDriver({
  files: [
    {
      dir: 'memory://',
      basename: 'example.txt',
      extension: 'txt',
      path: 'memory://example.txt',
      storage: 'memory',
      type: 'file',
      file_size: 1024,
      last_modified: Date.now(),
      mime_type: 'text/plain',
      visibility: 'public',
    },
  ],
  storage: 'memory',
});
</script>

<style scoped>
.theme-selector {
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.theme-label {
  display: block;
  font-weight: 600;
  margin-bottom: 1rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.theme-button {
  padding: 0.625rem 1rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-button:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.theme-button.active {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  font-weight: 600;
}
</style>
```

## Explanation

VueFinder supports 12 beautiful themes that can be switched dynamically at runtime. This example demonstrates how to create a custom theme selector interface.

**Key Features:**

- **Dynamic Theme Switching**: Change themes instantly by updating the `theme` config property
- **12 Available Themes**: Light, Dark, Midnight, Latte, Rose, Mythril, Lime, Sky, Ocean, Palenight, Arctic, and Code
- **Reactive Updates**: Vue's reactivity system ensures the theme updates immediately when changed

**Implementation Notes:**

1. **Theme Property**: Set the theme via the `config` prop: `:config="{ theme: currentTheme }"`

2. **Reactive Theme**: Use a `ref` to store the current theme, allowing instant updates when users select a different theme

3. **Custom UI**: You can create any UI for theme selection - buttons, dropdowns, cards, or any other design that fits your application

4. **Persistence**: If you want to persist the user's theme choice, you can use `localStorage`:

```vue
<script setup>
import { ref, watch, onMounted } from 'vue';

const currentTheme = ref('light');

// Load saved theme on mount
onMounted(() => {
  const saved = localStorage.getItem('vuefinder-theme');
  if (saved) currentTheme.value = saved;
});

// Save theme when changed
watch(currentTheme, (newTheme) => {
  localStorage.setItem('vuefinder-theme', newTheme);
});
</script>
```

**Alternative: Built-in Theme Switcher**

VueFinder also includes a built-in theme switcher that can be enabled via the `features` prop:

```vue
<template>
  <vue-finder
    :driver="driver"
    :config="{ theme: currentTheme }"
    :features="{ theme: true }"
  />
</template>
```

This enables the theme switcher in VueFinder's settings menu, allowing users to change themes directly within the component.

See [Guide - Theming](../guide/theming.md) for complete theming documentation.

