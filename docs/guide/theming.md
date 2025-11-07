---
outline: deep
---

# Theming

VueFinder includes 12 beautiful themes to match your application's design.

## Available Themes

- **silver** - Silver theme (default)

- **valorite** - Valorite theme

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
  <vue-finder id="themed" :driver="driver" :config="{ theme: 'valorite' }" />
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

const currentTheme = ref('silver');
</script>
```

## Examples

### Silver Theme

```vue
<vue-finder :config="{ theme: 'silver' }" />
```

### Valorite Theme

```vue
<vue-finder :config="{ theme: 'valorite' }" />
```

### Midnight Theme

```vue
<vue-finder :config="{ theme: 'midnight' }" />
```

### Custom Theme per Instance

```vue
<template>
  <div>
    <vue-finder id="silver-instance" :driver="driver" :config="{ theme: 'silver' }" />
    <vue-finder id="valorite-instance" :driver="driver" :config="{ theme: 'valorite' }" />
  </div>
</template>
```
