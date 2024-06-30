<template>
  <div class="vuefinder__modal-layout" aria-labelledby="modal-title" role="dialog" aria-modal="true" @keyup.esc="app.modal.close()" tabindex="0">
    <div class="vuefinder__modal-layout__overlay"></div>

    <div class="vuefinder__modal-layout__container">
      <div class="vuefinder__modal-layout__wrapper" @mousedown.self="app.modal.close()">
        <div ref="modalBody" class="vuefinder__modal-layout__body">
          <div class="vuefinder__modal-layout__content">

            <slot/>

          </div>
          <div class="vuefinder__modal-layout__footer">
            <slot name="buttons"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.vuefinder__modal-layout {
  @apply relative z-30;
}

.vuefinder__modal-layout__overlay {
  @apply fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity;
}

.vuefinder__modal-layout__container {
  @apply fixed z-10 inset-0 overflow-hidden;
}

.vuefinder__modal-layout__wrapper {
  @apply flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0;
}

.vuefinder__modal-layout__body {
  @apply relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full;
}

.vuefinder__modal-layout__content {
  @apply bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4;
}

.vuefinder__modal-layout__footer {
  @apply bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
}
</style>

<script setup>
import {inject, nextTick, onMounted, ref} from 'vue';

const modalBody = ref(null);
const app = inject('ServiceContainer')

onMounted(() => {
  // Select the first input element in the modal
  const inputElements = document.querySelector('.v-f-modal input')

  // If there is an input element, focus it
  inputElements && inputElements.focus();

  nextTick(() => {
    // If the modal has an input element and the screen width is less than 768px
    if (document.querySelector('.v-f-modal input')) {
      // if the screen width is less than 768px
      if (window.innerWidth < 768) {

        // Get the height of the modal body
        const scrollY = modalBody.value.getBoundingClientRect().bottom + 16;
        // Scroll to the top of the modal
        window.scrollTo({
          top: scrollY,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  });
});
</script>

