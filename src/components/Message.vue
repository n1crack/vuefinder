<template>
  <div>
    <div
        ref="strMessage" class="mt-1 p-1 px-2 rounded text-sm"
        :class="error ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message'
};
</script>

<script setup>
const props = defineProps({
  error: {
    type: Boolean,
    default: false
  }
});
</script>
