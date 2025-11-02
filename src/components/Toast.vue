<script setup lang="ts">
import { inject, ref } from 'vue';
import { useApp } from '../composables/useApp';

const app = useApp();
const { getStore } = app.storage;

const fullScreen = ref(getStore('full-screen', false));
const messageQueue = ref<any[]>([]);

const getTypeClass = (type: any) => {
  if (type === 'error') {
    return 'text-red-400 border-red-400 dark:text-red-300 dark:border-red-300';
  }
  return 'text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300';
};

const removeItem = (index: any) => {
  messageQueue.value.splice(index, 1);
};

const removeItemByID = (uid: any) => {
  const index = messageQueue.value.findIndex((x) => x.id === uid);
  if (index !== -1) {
    removeItem(index);
  }
};

app.emitter.on('vf-toast-clear', () => {
  messageQueue.value = [];
});

app.emitter.on('vf-toast-push', (data: any) => {
  const uid = new Date()
    .getTime()
    .toString(36)
    .concat(performance.now().toString(), Math.random().toString())
    .replace(/\./g, '');
  data.id = uid;
  messageQueue.value.push(data);

  setTimeout(() => {
    removeItemByID(uid);
  }, 5000);
});
</script>

<template>
  <div
    :class="[
      'vuefinder__toast',
      fullScreen ? 'vuefinder__toast--fixed' : 'vuefinder__toast--absolute',
    ]"
  >
    <transition-group
      name="vuefinder__toast-item"
      enter-active-class="vuefinder__toast-item--enter-active"
      leave-active-class="vuefinder__toast-item--leave-active"
      leave-to-class="vuefinder__toast-item--leave-to"
    >
      <div
        v-for="(message, index) in messageQueue"
        :key="index"
        :class="['vuefinder__toast__message', getTypeClass(message.type)]"
        @click="removeItem(index)"
      >
        {{ message.label }}
      </div>
    </transition-group>
  </div>
</template>
