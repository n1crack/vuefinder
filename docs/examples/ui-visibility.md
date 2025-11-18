---
outline: deep
---

# UI Visibility

Control the visibility of menu bar and toolbar components in VueFinder.

## Live Demo

<ClientOnly>
  <UIVisibilityDemo />
</ClientOnly>

## Basic Usage

### Hide Menu Bar

```vue
<template>
  <vue-finder
    id="no-menubar"
    :driver="driver"
    :config="{
      showMenuBar: false,
    }"
  />
</template>
```

### Hide Toolbar

```vue
<template>
  <vue-finder
    id="no-toolbar"
    :driver="driver"
    :config="{
      showToolbar: false,
    }"
  />
</template>
```

### Hide Both

```vue
<template>
  <vue-finder
    id="minimal-ui"
    :driver="driver"
    :config="{
      showMenuBar: false,
      showToolbar: false,
    }"
  />
</template>
```

## Reactive Toggles

You can create reactive toggles to show/hide the menu bar and toolbar dynamically:

```vue
<script setup>
import { ref } from 'vue';

const showMenuBar = ref(true);
const showToolbar = ref(true);

const toggleMenuBar = () => {
  showMenuBar.value = !showMenuBar.value;
};

const toggleToolbar = () => {
  showToolbar.value = !showToolbar.value;
};
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem">
      <button @click="toggleMenuBar">
        {{ showMenuBar ? 'Hide' : 'Show' }} Menu Bar
      </button>
      <button @click="toggleToolbar" style="margin-left: 0.5rem">
        {{ showToolbar ? 'Hide' : 'Show' }} Toolbar
      </button>
    </div>
    <vue-finder
      id="toggle-example"
      :driver="driver"
      :config="{
        showMenuBar: showMenuBar,
        showToolbar: showToolbar,
      }"
    />
  </div>
</template>
```

## Using Checkboxes

You can also use checkboxes for a more intuitive UI:

```vue
<script setup>
import { ref } from 'vue';

const showMenuBar = ref(true);
const showToolbar = ref(true);
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem">
      <label>
        <input type="checkbox" v-model="showMenuBar" />
        Show Menu Bar
      </label>
      <label style="margin-left: 1rem">
        <input type="checkbox" v-model="showToolbar" />
        Show Toolbar
      </label>
    </div>
    <vue-finder
      id="checkbox-example"
      :driver="driver"
      :config="{
        showMenuBar: showMenuBar,
        showToolbar: showToolbar,
      }"
    />
  </div>
</template>
```

## Important Notes

### Non-Persistent Behavior

These settings are **non-persistent**, which means:

- They are **not saved** to localStorage
- They **reset to default values** (`true`) when the page is reloaded
- They are useful for temporary UI customization during a session

### Default Values

Both `showMenuBar` and `showToolbar` default to `true`, so the menu bar and toolbar are visible by default unless explicitly set to `false`.

### Reactivity

The config prop is reactive, so changes to `showMenuBar` or `showToolbar` will immediately update the UI. You can use Vue's reactive refs or computed properties to control these values dynamically.

## Use Cases

### Minimal UI Mode

Create a clean, minimal interface by hiding both components:

```vue
<template>
  <vue-finder
    id="minimal"
    :driver="driver"
    :config="{
      showMenuBar: false,
      showToolbar: false,
    }"
  />
</template>
```

### Custom Toolbar

Hide the default toolbar and create your own custom toolbar:

```vue
<template>
  <div>
    <!-- Custom toolbar -->
    <div class="custom-toolbar">
      <!-- Your custom toolbar content -->
    </div>
    <vue-finder
      id="custom-toolbar"
      :driver="driver"
      :config="{
        showToolbar: false,
      }"
    />
  </div>
</template>
```

### Conditional Display

Show/hide based on user permissions or preferences:

```vue
<script setup>
import { computed } from 'vue';

const userRole = ref('admin');
const showMenuBar = computed(() => userRole.value === 'admin');
</script>

<template>
  <vue-finder
    id="conditional"
    :driver="driver"
    :config="{
      showMenuBar: showMenuBar,
    }"
  />
</template>
```

