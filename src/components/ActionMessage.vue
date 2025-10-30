<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useApp } from '../composables/useApp';

export default {
  props: {
    on: { type: String, required: true },
  },
  setup(props, { emit, slots }) {
    const app = useApp();
    const shown = ref(false);
    const { t } = app.i18n;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const handleEvent = () => {
      if (timeout) clearTimeout(timeout);
      shown.value = true;
      timeout = setTimeout(() => {
        shown.value = false;
      }, 2000);
    };

    onMounted(() => {
      app.emitter.on(props.on, handleEvent);
    });

    onUnmounted(() => {
      if (timeout) clearTimeout(timeout);
    });

    return {
      shown,
      t,
    };
  },
};
</script>

<template>
  <div class="vuefinder__action-message" :class="{ 'vuefinder__action-message--hidden': !shown }">
    <slot v-if="$slots.default" />
    <span v-else>{{ t('Saved.') }}</span>
  </div>
</template>
