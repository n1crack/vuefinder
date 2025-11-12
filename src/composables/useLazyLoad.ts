import { ref, onMounted, onUnmounted, onUpdated, type Ref } from 'vue';
import LazyLoad, { type ILazyLoadInstance } from 'vanilla-lazyload';

/**
 * Composable for managing lazy loading of images/thumbnails
 */
export function useLazyLoad(
  container: Ref<HTMLElement | null | undefined>,
  app?: { emitter: { on: (event: string, handler: () => void) => void } }
) {
  const vfLazyLoad = ref<ILazyLoadInstance | null>(null);

  onMounted(() => {
    // Initialize LazyLoad for thumbnails
    if (container.value) {
      vfLazyLoad.value = new LazyLoad({
        elements_selector: '.lazy',
        container: container.value,
      });
    }

    // Listen for thumbnail refresh events
    if (app?.emitter) {
      app.emitter.on('vf-refresh-thumbnails', () => {
        if (vfLazyLoad.value) {
          vfLazyLoad.value.update();
        }
      });
    }
  });

  onUpdated(() => {
    if (vfLazyLoad.value) {
      vfLazyLoad.value.update();
    }
  });

  onUnmounted(() => {
    if (vfLazyLoad.value) {
      vfLazyLoad.value.destroy();
      vfLazyLoad.value = null;
    }
  });

  return {
    vfLazyLoad,
  };
}
