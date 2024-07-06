<template>
  <div>
    <div
      v-if="!hidden"
      ref="strMessage"
      class="vuefinder__message"
      :class="error ? 'vuefinder__message--error' : 'vuefinder__message--success'">
      <slot></slot>
      <div class="vuefinder__message__close" @click="hide" :title="t('Close')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="vuefinder__message__icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, inject} from 'vue';

const emit = defineEmits(['hidden']);
const props = defineProps({
  error: {
    type: Boolean,
    default: false
  }
});

const app = inject('ServiceContainer');
const {t} = app.i18n;

const hidden = ref(false);
const strMessage = ref(null);
const strSlot = ref(strMessage.value?.strMessage);

watch(strSlot, () => hidden.value = false);

const hide = () => {
  emit('hidden');
  hidden.value = true;
};
</script>
