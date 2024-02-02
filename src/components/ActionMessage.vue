<template>
  <div class="text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out"
       :class="[{ 'opacity-0': !shown }]">
    <slot v-if="$slots.default"/>
    <span v-else>{{ t('Saved.') }}</span>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted, inject} from 'vue';

export default {
  props: {
    on: {type: String, required: true},
  },
  setup(props, {emit, slots}) {
    const app = inject('ServiceContainer');
    const shown = ref(false);
    const {t} = app.i18n;

    let timeout = null;

    const handleEvent = () => {
      clearTimeout(timeout);
      shown.value = true;
      timeout = setTimeout(() => {
        shown.value = false;
      }, 2000);
    };

    onMounted(() => {
      app.emitter.on(props.on, handleEvent);
    });

    onUnmounted(() => {
      clearTimeout(timeout);
    });

    return {
      shown, t
    };
  },
};
</script>
