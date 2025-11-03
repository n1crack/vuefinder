---
outline: deep
---

# Breaking Changes

Complete list of breaking changes in VueFinder 4.0.

## Removed Props

### `request` (Removed)

The `request` prop has been completely removed. Use the `driver` prop instead.

**Before:**

```vue
<vue-finder :request="'/api/vuefinder'" />
```

**After:**

```vue
<vue-finder :driver="driver" />
```

See [Drivers & Adapters](../guide/drivers-adapters.md) for driver setup.

## Changed Props

### Features Format

**Before:** Array of feature names

```vue
<vue-finder :features="['upload', 'delete']" />
```

**After:** Object or preset string

```vue
<vue-finder :features="{ upload: true, delete: true }" />

<!-- or -->

<vue-finder :features="'simple'" />
```

### Configuration Props

All individual config props are now consolidated into the `config` prop:

**Removed individual props:**

- `persist`
- `theme`
- `max-file-size`
- `max-height`
- `full-screen`
- `loading-indicator`

**Now use `config` prop:**

```vue
<vue-finder
  :config="{
    persist: true,
    theme: 'dark',
    maxFileSize: '50mb',
  }"
/>
```

## Changed Plugin Import

**Before:**

```js
import VueFinder from 'vuefinder/dist/vuefinder';
```

**After:**

```js
import VueFinder from 'vuefinder';
```

## Changed TypeScript Types

Type exports have been reorganized. Update your imports:

**Before (may have worked):**

```ts
// Types may have been inconsistent
```

**After:**

```ts
import type { VueFinderProps, DirEntry, Driver, ConfigDefaults } from 'vuefinder';
```

## Backend API Changes

If you're implementing a custom backend, note these API contract changes:

1. **Response Format:** Some response structures may have minor changes
2. **Error Handling:** Error response format may have changed
3. **Upload Endpoints:** Upload endpoint may require different request format

Refer to the [Drivers Interface](../api-reference/drivers-interface.md) for the complete interface.
