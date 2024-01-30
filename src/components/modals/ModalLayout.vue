<template>
  <div class="v-f-modal relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true"
       @keyup.esc="app.emitter.emit('vf-modal-close')" tabindex="0">
    <div class="fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity"></div>

    <div class="fixed z-10 inset-0 overflow-hidden">
      <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0" @mousedown.self="app.emitter.emit('vf-modal-close')">
        <div class="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full">
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

            <slot />

          </div>
          <div class="bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="buttons"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, onMounted} from 'vue';

const app = inject('ServiceContainer')

onMounted(() => {
  const inputElements = document.querySelector('.v-f-modal input')
  if (inputElements) {
    inputElements.focus();
  }
})
</script>

