---
outline: deep
---

# UI Visibility

Control the visibility of the menu bar, toolbar and breadcrumb bar in VueFinder.

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

### Hide Breadcrumb Bar

```vue
<template>
  <vue-finder
    id="no-breadcrumb"
    :driver="driver"
    :config="{
      showBreadcrumbBar: false,
    }"
  />
</template>
```

### Hide All Three

```vue
<template>
  <vue-finder
    id="minimal-ui"
    :driver="driver"
    :config="{
      showMenuBar: false,
      showToolbar: false,
      showBreadcrumbBar: false,
    }"
  />
</template>
```

Hiding the toolbar takes the full-screen control with it — see
[Keep a Way Out of Full Screen](/examples/custom-menu-bar#keep-a-way-out-of-full-screen).

## Important Notes

### Non-Persistent Behavior

These settings are **non-persistent**, which means:

- They are **not saved** to localStorage
- They **reset to default values** (`true`) when the page is reloaded
- They are useful for temporary UI customization during a session

### Default Values

`showMenuBar`, `showToolbar` and `showBreadcrumbBar` all default to `true`, so the menu bar, toolbar and breadcrumb bar are visible unless explicitly set to `false`.

### Reactivity

The config prop is reactive, so changing any of these values immediately updates the UI. You can use Vue's reactive refs or computed properties to control them dynamically.

### Hiding vs. Replacing

These options remove a bar entirely. To keep a bar but change what it contains, use the slots instead — see [Slots](/guide/slots) for `menubar-start`, `menu-items`, `menubar-end`, `toolbar-items` and `breadcrumb-actions`.

## Use Cases

### Minimal UI Mode

Create a clean, minimal interface by hiding every bar, leaving just the file list:

```vue
<template>
  <vue-finder
    id="minimal"
    :driver="driver"
    :config="{
      showMenuBar: false,
      showToolbar: false,
      showBreadcrumbBar: false,
    }"
  />
</template>
```

