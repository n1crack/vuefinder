<script setup lang="ts">
// Injected into the delete modal's `body-top` region.
defineProps<{ ctx?: unknown }>();
</script>

<template>
  <div
    style="
      margin: 8px 0;
      padding: 8px 12px;
      border-radius: 6px;
      background: #fee2e2;
      color: #991b1b;
      font-size: 13px;
    "
  >
    ⚠️ Heads up — items under <code>/protected/</code> cannot be deleted (blocked by a plugin hook).
  </div>
</template>
