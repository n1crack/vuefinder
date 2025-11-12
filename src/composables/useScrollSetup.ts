import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { OverlayScrollbars, SizeObserverPlugin } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

/**
 * Composable for setting up scroll container with OverlayScrollbars
 */
export function useScrollSetup(
  scrollContainer: Ref<HTMLElement | null | undefined>,
  handleScroll: (event: Event) => void
) {
  const osInstance = ref<ReturnType<typeof OverlayScrollbars> | null>(null);

  onMounted(() => {
    OverlayScrollbars.plugin([SizeObserverPlugin]);

    if (scrollContainer.value) {
      const instance = OverlayScrollbars(
        scrollContainer.value,
        {
          scrollbars: { theme: 'vf-scrollbars-theme' },
        },
        {
          initialized: (inst: ReturnType<typeof OverlayScrollbars>) => {
            osInstance.value = inst;
            // Listen to scroll events on the viewport element (the actual scrolling element)
            const { viewport } = inst.elements();
            if (viewport) {
              viewport.addEventListener('scroll', handleScroll);
            }
          },
          updated: (inst: ReturnType<typeof OverlayScrollbars>) => {
            const { viewport } = inst.elements();
            if (viewport) {
              // Safari / iOS bug: viewport.scrollHeight is not updated when the content height changes
            }
          },
        }
      );
      osInstance.value = instance as unknown as ReturnType<typeof OverlayScrollbars>;
    }
  });

  onUnmounted(() => {
    // Remove scroll listener from viewport before destroying
    if (osInstance.value) {
      const { viewport } = osInstance.value.elements();
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
      osInstance.value.destroy();
      osInstance.value = null;
    }
  });

  return {
    osInstance,
  };
}
