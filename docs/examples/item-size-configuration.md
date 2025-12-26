---
outline: deep
---

# Item Size & Spacing Configuration

Learn how to customize item dimensions, spacing, and icon sizes for both grid and list view modes.

## Live Demo

Use the sliders below to adjust grid item dimensions and see the changes in real-time:

<ClientOnly>
  <ItemSizeConfigurationDemo />
</ClientOnly>

## Overview

VueFinder allows you to fine-tune the appearance of file and folder items in both grid and list view modes. You can control:

- **Grid View**: Item width, height, gap between items, and icon size
- **List View**: Item height, gap between items, and icon size

## Configuration Options

### Grid View Settings

| Property        | Type     | Default | Description                          |
| --------------- | -------- | ------- | ------------------------------------ |
| `gridItemWidth` | `number` | `96`    | Width of grid items in pixels        |
| `gridItemHeight` | `number` | `80`    | Height of grid items in pixels       |
| `gridItemGap`   | `number` | `8`     | Gap between grid items in pixels     |
| `gridIconSize`  | `number` | `48`    | Size of icons in grid view (pixels) |

### List View Settings

| Property        | Type     | Default | Description                          |
| --------------- | -------- | ------- | ------------------------------------ |
| `listItemHeight` | `number` | `24`    | Height of list items in pixels       |
| `listItemGap`   | `number` | `2`     | Gap between list items in pixels     |
| `listIconSize`  | `number` | `20`    | Size of icons in list view (pixels) |

## Basic Example

```vue
<template>
  <vue-finder
    id="custom-size"
    :driver="driver"
    :config="{
      gridItemWidth: 120,
      gridItemHeight: 100,
      gridItemGap: 12,
      gridIconSize: 56,
      listItemHeight: 32,
      listItemGap: 4,
      listIconSize: 24,
    }"
  />
</template>
```

## Responsive Custom Icons

Custom icons automatically scale based on the configured icon sizes:

```vue
<template>
  <vue-finder id="responsive-icons" :driver="driver" :config="config">
    <template #icon="{ item }">
      <CustomIcon :item="item" />
    </template>
  </vue-finder>
</template>

<script setup>
import { ref } from 'vue';

const config = ref({
  gridIconSize: 64,
  listIconSize: 28,
});
</script>
```

## Dynamic Configuration

You can update these values dynamically, and VueFinder will reactively update:

```vue
<template>
  <div>
    <div class="controls">
      <label>
        Grid Item Width: {{ gridItemWidth }}px
        <input
          v-model.number="gridItemWidth"
          type="range"
          min="60"
          max="200"
          step="4"
        />
      </label>
      
      <label>
        Grid Icon Size: {{ gridIconSize }}px
        <input
          v-model.number="gridIconSize"
          type="range"
          min="24"
          max="120"
          step="4"
        />
      </label>
    </div>

    <vue-finder
      id="dynamic-size"
      :driver="driver"
      :config="{
        gridItemWidth,
        gridItemHeight: 80,
        gridItemGap: 8,
        gridIconSize,
        listItemHeight: 24,
        listItemGap: 2,
        listIconSize: 20,
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gridItemWidth = ref(96);
const gridIconSize = ref(48);
</script>
```

## Use Cases

### Compact Grid View

Create a more compact grid layout:

```vue
<vue-finder
  id="compact-grid"
  :driver="driver"
  :config="{
    gridItemWidth: 72,
    gridItemHeight: 64,
    gridItemGap: 4,
    gridIconSize: 36,
  }"
/>
```

### Spacious List View

Increase spacing for better readability:

```vue
<vue-finder
  id="spacious-list"
  :driver="driver"
  :config="{
    listItemHeight: 40,
    listItemGap: 6,
    listIconSize: 28,
  }"
/>
```

### Large Icons Grid

Emphasize icons in grid view:

```vue
<vue-finder
  id="large-icons"
  :driver="driver"
  :config="{
    gridItemWidth: 140,
    gridItemHeight: 120,
    gridItemGap: 16,
    gridIconSize: 80,
  }"
/>
```

## Notes

- All size values are in pixels
- Changes are reactive and update immediately
- These settings are persistent (saved to localStorage) by default
- Custom icons in slots automatically scale to match configured sizes
- Switching between grid and list view uses the respective configuration values

## See Also

- [Configuration Guide](../guide/configuration.md) - Complete configuration reference
- [Custom Icons](./custom-icons.md) - Custom icon implementation
- [Theming](../guide/theming.md) - Theme customization
