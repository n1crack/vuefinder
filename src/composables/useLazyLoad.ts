import { ref, onMounted, onUnmounted, onUpdated, type Ref } from 'vue';
import LazyLoad, { type ILazyLoadInstance } from 'vanilla-lazyload';

const MAX_THUMBNAIL_RETRIES = 4;
const RETRY_BASE_DELAY = 600;

/**
 * Composable for managing lazy loading of images/thumbnails
 */
export function useLazyLoad(
  container: Ref<HTMLElement | null | undefined>,
  app?: { emitter: { on: (event: string, handler: () => void) => void } }
) {
  const vfLazyLoad = ref<ILazyLoadInstance | null>(null);
  // Per-element retry counter. WeakMap so detached nodes are GC'd.
  const retryCounts = new WeakMap<HTMLElement, number>();
  const retryTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

  onMounted(() => {
    // Initialize LazyLoad for thumbnails
    if (container.value) {
      vfLazyLoad.value = new LazyLoad({
        elements_selector: '.lazy',
        container: container.value,
        // Put the placeholder back so the browser doesn't show a broken-image
        // icon (the "?" thumbnail) while we retry.
        restore_on_error: true,
        callback_error: (el, instance) => {
          const count = (retryCounts.get(el) ?? 0) + 1;
          if (count > MAX_THUMBNAIL_RETRIES) return;
          retryCounts.set(el, count);
          // Exponential backoff with jitter to spread the retry burst on hard refresh.
          const delay = RETRY_BASE_DELAY * 2 ** (count - 1) + Math.random() * 250;
          const existing = retryTimers.get(el);
          if (existing) clearTimeout(existing);
          retryTimers.set(
            el,
            setTimeout(() => {
              if (!el.isConnected) return;
              LazyLoad.resetStatus(el);
              instance.update();
            }, delay)
          );
        },
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
