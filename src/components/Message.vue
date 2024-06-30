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

<style>
.vuefinder__message {
  @apply flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75;
}

.vuefinder__message--error {
  @apply bg-red-100 text-red-600;
}

.vuefinder__message--success {
  @apply bg-emerald-100 text-emerald-600;
}

.vuefinder__message__close {
  @apply ml-auto cursor-pointer;
}

.vuefinder__message__icon {
  @apply w-5 h-5;
}
</style>

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
