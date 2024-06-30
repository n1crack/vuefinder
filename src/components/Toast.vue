<template>
  <div :class="['vuefinder__toast', fullScreen.value ? 'vuefinder__toast--fixed' : 'vuefinder__toast--absolute']">
    <transition-group
        name="vuefinder__toast-item"
        enter-active-class="vuefinder__toast-item--enter-active"
        leave-active-class="vuefinder__toast-item--leave-active"
        leave-to-class="vuefinder__toast-item--leave-to"
    >
      <div v-for="(message, index) in messageQueue"
           :key="index"
           @click="removeItem(index)"
           :class="['vuefinder__toast__message', getTypeClass(message.type)]">
         {{ message.label }}
      </div>
    </transition-group>
  </div>
</template>

<style>
.vuefinder__toast {
  @apply max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2 z-10;
}

.vuefinder__toast--fixed {
  @apply fixed;
}

.vuefinder__toast--absolute {
  @apply absolute;
}

.vuefinder__toast__message {
  @apply inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer;
}

/* Transition classes */
.vuefinder__toast-item--enter-active {
  @apply transition-all duration-1000;
}

.vuefinder__toast-item--leave-active {
  @apply transition-all duration-1000 opacity-0;
}

.vuefinder__toast-item--leave-to {
  @apply opacity-0;
}
</style>

<script setup>
import {inject, ref} from 'vue';

const app = inject('ServiceContainer');
const {getStore} = app.storage;

const fullScreen = ref(getStore('full-screen', false));
const messageQueue = ref([]);

const getTypeClass = (type) => {
  if (type === 'error') {
    return 'text-red-400 border-red-400 dark:text-red-300 dark:border-red-300';
  }
  return 'text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300';
};

const removeItem = (index) => {
  messageQueue.value.splice(index, 1);
};

const removeItemByID = (uid) => {
  let index = messageQueue.value.findIndex(x => x.id === uid);
  if (index !== -1) {
    removeItem(index);
  }
};

app.emitter.on('vf-toast-clear', () => {
  messageQueue.value = []
});

app.emitter.on('vf-toast-push', (data) => {
  let uid = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
  data.id = uid;
  messageQueue.value.push(data);

  setTimeout(() => {
    removeItemByID(uid)
  }, 5000)
})
</script>
