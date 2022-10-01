<template>
  <div>
    <div
        v-if="!hidden"
        ref="strMessage" class="flex mt-1 p-1 px-2 rounded text-sm"
        :class="error ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'">
      <slot></slot>
      <div class="ml-auto cursor-pointer" @click="hide"
      :aria-label="t('Close')" data-microtip-position="top-left" role="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message'
};
</script>

<script setup>
import {inject, ref, watch} from 'vue';

const {t} = inject('i18n');
const props = defineProps({
  error: {
    type: Boolean,
    default: false
  }
});

const hidden = ref(false);
const strMessage = ref(null);
const strSlot = ref(strMessage.value?.strMessage);
const emit = defineEmits(['hidden']);

watch(strSlot, () => hidden.value = false);

const hide = () => {
  emit('hidden');
  hidden.value = true;
};
</script>
