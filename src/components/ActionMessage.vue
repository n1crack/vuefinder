<template>
  <div class="text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out"
       :class="[{ 'opacity-0': !shown }]">
    <slot v-if="$slots.default"/>
    <span v-else>Saved.</span>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted, inject} from 'vue';

export default {
  props: {
    on: {type: String, required: true},
  },
  setup(props, {emit, slots}) {
    const emitter = inject('emitter');
    const shown = ref(false);
    let timeout = null;

    const handleEvent = () => {
      clearTimeout(timeout);
      shown.value = true;
      timeout = setTimeout(() => {
        shown.value = false;
      }, 2000);
    };

    onMounted(() => {
      emitter.on(props.on, handleEvent);
    });

    onUnmounted(() => {
      clearTimeout(timeout);
    });

    return {
      shown,
    };
  },
};
</script>
