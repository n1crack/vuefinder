<script setup lang="ts">
import { nextTick, onMounted, ref, type StyleValue } from 'vue';
import { useApp } from '../../composables/useApp';

const modalBody = ref<HTMLElement | null>(null);
const app = useApp();
const config = app.config;

// Props for drag overlay
const props = defineProps<{
  showDragOverlay?: boolean;
  dragOverlayText?: string;
  /**
   * Intercept Esc / overlay-click. If provided, called instead of
   * `app.modal.close()`. Owner is responsible for actually closing once
   * any guard (e.g. dirty-discard confirm) passes.
   */
  onRequestClose?: () => void;
  /**
   * Inline style applied to the modal body card. Used by ModalPreview to
   * translate the entire box during swipe-to-navigate. Touch event handlers
   * also forward here so the whole card responds to drag.
   */
  bodyStyle?: StyleValue;
  bodyClass?: string;
  onBodyTouchstart?: (e: TouchEvent) => void;
  onBodyTouchmove?: (e: TouchEvent) => void;
  onBodyTouchend?: (e: TouchEvent) => void;
  onBodyTouchcancel?: (e: TouchEvent) => void;
}>();

const requestClose = () => {
  if (props.onRequestClose) props.onRequestClose();
  else app.modal.close();
};

onMounted(() => {
  // Select the first input element in the modal
  const inputElements = document.querySelector('.v-f-modal input') as HTMLInputElement;

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
            behavior: 'smooth',
          });
        }
      }
    }
  });
});

const handleContextMenu = (event: MouseEvent) => {
  const isWrapper = (event.target as HTMLElement).classList.contains(
    'vuefinder__modal-layout__wrapper'
  );
  if (isWrapper) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<template>
  <div
    :data-theme="app.theme.current"
    class="vuefinder__themer vuefinder__modal-layout"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    @keyup.esc="requestClose()"
  >
    <div class="vuefinder__modal-layout__overlay"></div>

    <div class="vuefinder__modal-layout__container">
      <div
        class="vuefinder__modal-layout__wrapper"
        @contextmenu="handleContextMenu"
        @mousedown.self="requestClose()"
      >
        <div
          ref="modalBody"
          class="vuefinder__modal-layout__body"
          :class="props.bodyClass"
          :style="props.bodyStyle"
          @touchstart="props.onBodyTouchstart"
          @touchmove="props.onBodyTouchmove"
          @touchend="props.onBodyTouchend"
          @touchcancel="props.onBodyTouchcancel"
        >
          <div class="vuefinder__modal-layout__content">
            <slot />
          </div>
          <div v-if="$slots.buttons" class="vuefinder__modal-layout__footer">
            <slot name="buttons" />
          </div>
        </div>
      </div>
    </div>

    <!-- Full screen drag overlay (similar to VueFinder external drop overlay) -->
    <div v-if="props.showDragOverlay" class="vuefinder__modal-drag-overlay">
      <div class="vuefinder__modal-drag-message">
        {{ props.dragOverlayText || 'Drag and drop the files/folders to here.' }}
      </div>
    </div>
  </div>
</template>
