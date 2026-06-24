<script setup lang="ts">
import { ref, watch } from 'vue';

// A field injected into the zip (archive) modal's `body-bottom` region.
// Receives the outlet `ctx` { app, data, close, extras } as a prop. Writing to
// `ctx.extras` makes the archive handler forward the value to the backend
// (RemoteDriver sends each extras key as an extra request field).
const props = defineProps<{ ctx?: { extras: Record<string, unknown> } }>();

const level = ref(6);

watch(
  level,
  (value) => {
    // `extras` is a shared bag, not part of this component's own props, so
    // writing into it is intentional (and how the value reaches the backend).
    const extras = props.ctx?.extras;
    if (extras) extras.compressionLevel = value;
  },
  { immediate: true }
);
</script>

<template>
  <div style="margin: 8px 0; padding: 8px; border: 1px dashed var(--vf-border-color, #ccc)">
    <label style="display: flex; align-items: center; gap: 8px; font-size: 13px">
      <span>Compression level (plugin):</span>
      <input v-model.number="level" type="range" min="0" max="9" />
      <strong>{{ level }}</strong>
    </label>
  </div>
</template>
