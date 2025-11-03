---
outline: deep
---

# Slots

VueFinder provides slots that allow you to customize specific parts of the component.

## Available Slots

### `status-bar` Slot

Customize the status bar with your own content. This is useful for adding custom buttons or displaying additional information.

**Scoped Props:**

- `selected` - `DirEntry[]` - Currently selected items
- `count` - `number` - Number of selected items
- `path` - `string` - Current path

#### Example: Custom Action Button

```vue
<template>
  <vue-finder id="status-example" :driver="driver">
    <template #status-bar="{ selected, count, path }">
      <div class="custom-status">
        <button @click="handleAction(selected)">Process Selected ({{ count }})</button>
        <span class="path-info">Current: {{ path }}</span>
      </div>
    </template>
  </vue-finder>
</template>

<script setup>
const handleAction = (selected) => {
  if (selected.length === 0) {
    alert('No items selected');
    return;
  }
  console.log('Processing:', selected);
  // Your custom logic here
};
</script>
```

#### Example: Multiple Actions

```vue
<template>
  <vue-finder id="multi-action" :driver="driver">
    <template #status-bar="{ selected, count }">
      <div class="action-buttons">
        <button :disabled="count === 0" @click="downloadSelected(selected)">
          Download ({{ count }})
        </button>
        <button :disabled="count === 0" @click="shareSelected(selected)">Share</button>
        <button :disabled="count === 0" @click="deleteSelected(selected)">Delete</button>
      </div>
    </template>
  </vue-finder>
</template>
```

### `icon` Slot

Customize the icon displayed for files and folders. This allows you to use custom icons or styling.

**Scoped Props:**

- `item` - `DirEntry` - The file or folder entry

#### Example: Custom Icon Component

```vue
<template>
  <vue-finder id="icon-example" :driver="driver">
    <template #icon="{ item }">
      <CustomIcon :item="item" />
    </template>
  </vue-finder>
</template>

<script setup>
import CustomIcon from './CustomIcon.vue';

// CustomIcon receives the item and can render custom icons
</script>
```

#### Example: Conditional Icons

```vue
<template>
  <vue-finder id="conditional-icons" :driver="driver">
    <template #icon="{ item }">
      <TextIcon v-if="item.extension === 'txt'" />
      <PDFIcon v-else-if="item.extension === 'pdf'" />
    </template>
  </vue-finder>
</template>

<script setup>
import TextIcon from './TextIcon.vue';
import PDFIcon from './PDFIcon.vue';
</script>
```

If the condition doesn't match, the default icon will be shown automatically.

For complete slot reference, see [API Reference - Slots](../api-reference/slots.md).
