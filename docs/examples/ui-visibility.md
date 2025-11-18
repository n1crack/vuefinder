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

