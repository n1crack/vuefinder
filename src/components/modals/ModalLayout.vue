<script setup lang="ts">
import {inject, nextTick, onMounted, ref} from 'vue';
import { useApp } from '../../composables/useApp';

const modalBody = ref<HTMLElement | null>(null);
const app = useApp()
const config = app.config;

// Props for drag overlay
const props = defineProps<{
  showDragOverlay?: boolean;
  dragOverlayText?: string;
}>()

onMounted(() => {
  // Select the first input element in the modal
  const inputElements = document.querySelector('.v-f-modal input') as HTMLInputElement

  // If there is an input element, focus it
  if (inputElements) {
    inputElements.focus();
  }

  nextTick(() => {
    // If the modal has an input element and the screen width is less than 768px
    if (document.querySelector('.v-f-modal input')) {
      // if the screen width is less than 768px
      if (window.innerWidth < 768) {

        // Get the height of the modal body
        if (modalBody.value) {
          const scrollY = modalBody.value.getBoundingClientRect().bottom + 16;
          // Scroll to the top of the modal
          window.scrollTo({
            top: scrollY,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    }
  });
});

const handleContextMenu = (event: MouseEvent) => { 
    const isWrapper = (event.target as HTMLElement).classList.contains('vuefinder__modal-layout__wrapper');
    if (isWrapper) {
        event.preventDefault();
        event.stopPropagation(); 
    }
} 

</script>

<template>  
    <div :data-theme="app.theme.current" class="vuefinder__themer vuefinder__modal-layout" aria-labelledby="modal-title" role="dialog" aria-modal="true"
        @keyup.esc="app.modal.close()" tabindex="0" >
        <div class="vuefinder__modal-layout__overlay"></div>

        <div class="vuefinder__modal-layout__container">
            <div class="vuefinder__modal-layout__wrapper"  @contextmenu="handleContextMenu" @mousedown.self="app.modal.close()" >
                <div ref="modalBody" class="vuefinder__modal-layout__body">
                <div class="vuefinder__modal-layout__content">
                    <slot/>
                </div>
                <div class="vuefinder__modal-layout__footer" v-if="$slots.buttons">
                    <slot name="buttons"/>
                </div>
                </div>
            </div>
        </div>
        
        <!-- Full screen drag overlay (similar to VueFinder external drop overlay) -->
        <div
          v-if="props.showDragOverlay"
          class="vuefinder__modal-drag-overlay"
        >
          <div class="vuefinder__modal-drag-message">
            {{ props.dragOverlayText || 'Drag and drop the files/folders to here.' }}
          </div>
        </div>
    </div>
</template>
