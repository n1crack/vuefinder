---
outline: deep
---

# Theming

VueFinder includes 12 beautiful themes to match your application's design.

## Available Themes

- **light** - Light theme (default)

- **dark** - Dark theme

- **midnight** - Deep dark theme

- **latte** - Warm light theme

- **rose** - Rose-tinted theme

- **mythril** - Silver-blue theme

- **lime** - Green-tinted theme

- **sky** - Sky blue theme

- **ocean** - Ocean blue theme

- **palenight** - Pale night theme

- **arctic** - Cool blue-white theme

- **code** - Code editor inspired theme

## Usage

Set the theme via the `config` prop:

```vue
<template>
  <vue-finder id="themed" :driver="driver" :config="{ theme: 'dark' }" />
</template>
```

## Dynamic Theme Switching

Users can switch themes at runtime if the `theme` feature is enabled:

```vue
<template>
  <vue-finder
    id="dynamic"
    :driver="driver"
    :config="{ theme: currentTheme }"
    :features="{ theme: true }"
  />
</template>

<script setup>
import { ref } from 'vue';

const currentTheme = ref('light');
</script>
```

## Examples

### Light Theme

```vue
<vue-finder :config="{ theme: 'light' }" />
```

### Dark Theme

```vue
<vue-finder :config="{ theme: 'dark' }" />
```

### Midnight Theme

```vue
<vue-finder :config="{ theme: 'midnight' }" />
```

### Custom Theme per Instance

```vue
<template>
  <div>
    <vue-finder id="light-instance" :driver="driver" :config="{ theme: 'light' }" />
    <vue-finder id="dark-instance" :driver="driver" :config="{ theme: 'dark' }" />
  </div>
</template>
```
