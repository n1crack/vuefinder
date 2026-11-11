---
outline: deep
---

# Custom List Columns

The list view shows Name, Size and Date by default. Use the `listColumns` prop to pick which built-in columns are shown, add your own columns (for example the output of `ls -l`), and the `list-cell` slot to render cell content yourself.

## Adding columns

Entries are `DirEntry` objects as returned by your driver. Any extra fields your backend sends are available on `item` at runtime.

```vue
<template>
  <vue-finder id="custom-columns" :driver="driver" :list-columns="columns" />
</template>

<script setup lang="ts">
import type { ListColumnDef } from 'vuefinder';

// Built-in columns are referenced by name: 'size' and 'date'.
const columns: ListColumnDef[] = [
  { key: 'mode', label: 'Permissions', value: (item) => (item as any).mode, width: '8rem' },
  {
    key: 'owner',
    label: 'Owner',
    value: (item) => (item as any).owner,
    sortable: true,
    width: '8rem',
  },
  'size',
  'date',
];
</script>
```

The Name column always comes first, the remaining columns appear in the order of the array.

## Sorting

Set `sortable: true` to make a header clickable. The column sorts by `value` unless you provide `sortValue`, which is useful when the displayed text is not what should be compared:

```ts
{
  key: 'modified-by',
  label: 'Modified by',
  value: (item) => (item as any).modifiedBy?.name,
  sortable: true,
}
{
  key: 'usage',
  label: 'Usage',
  value: (item) => `${(item as any).percent}%`,
  sortValue: (item) => (item as any).percent, // compare numbers, not strings
  sortable: true,
  align: 'right',
}
```

## Rendering cells

The `list-cell` slot receives `{ item, column, value }` for every cell of the configured columns:

```vue
<vue-finder id="custom-columns" :driver="driver" :list-columns="columns">
  <template #list-cell="{ item, column, value }">
    <strong v-if="column === 'owner' && value === 'root'">{{ value }}</strong>
    <template v-else>{{ value }}</template>
  </template>
</vue-finder>
```

See [`listColumns`](../api-reference/props.md#listcolumns) and the [`list-cell` slot](../api-reference/slots.md#list-cell) for the full reference.
