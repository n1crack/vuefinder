<template>
  <div
      :class="fullScreen.value ?  'fixed' : 'absolute'"
      class=" bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2">
    <transition-group
        name="vf-toast-item"
        leave-active-class="transition-all duration-1000"
        leave-to-class="opacity-0"
    >
      <div v-for="(message, index) in messageQueue" @click="removeItem(index)" :key="message"
           :class="getTypeClass(message.type)"
           class="inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer ">
         {{ message.label }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'VFToast.vue'
};
</script>

<script setup>
import {inject, ref} from 'vue';
const emitter = inject('emitter');
const {getStore} = inject('storage');

const fullScreen = ref(getStore('full-screen', false));

const getTypeClass = (type) => {
  if (type == 'error') {
    return 'text-red-400 border-red-400 dark:text-red-300 dark:border-red-300';
  }
  return 'text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300';
};

const messageQueue = ref([]);

const removeItem = (index) => {
  messageQueue.value.splice(index, 1);
};

const removeItemByID = (uid) => {
  let index = messageQueue.value.findIndex(x => x.id === uid);
  if (index !== -1) {
    removeItem(index);
  }
};

emitter.on('vf-toast-clear', () => {
  messageQueue.value = []
});

emitter.on('vf-toast-push', (data) => {
  let uid= new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g,"");
  data.id = uid;
  messageQueue.value.push(data);
  setTimeout(() => {
    removeItemByID(uid)
  }, 5000)
})
</script>
