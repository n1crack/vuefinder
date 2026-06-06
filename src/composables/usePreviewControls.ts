import { onBeforeUnmount, onMounted } from 'vue';
import { useApp } from './useApp';
import type { PreviewControls } from '../types/preview';

/**
 * Composable used inside a preview component to register its edit-lifecycle
 * contract with the modal chrome. The chrome reads the live reactive fields
 * to render Edit/Save/Cancel and dirty-state, and calls the methods when the
 * user activates them.
 *
 * Call once at setup time with the contract. Cleanup is automatic.
 */
export function usePreviewControls(controls: PreviewControls): void {
  const app = useApp();
  onMounted(() => {
    if (typeof app.modal.registerControls !== 'function') {
      // Stale app.modal from before the chrome refactor — typically a Vite
      // HMR side-effect when the upgrade ran without a full page reload.
      // The Edit button stays hidden; a hard refresh restores everything.
      console.warn(
        '[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API.'
      );
      return;
    }
    app.modal.registerControls(controls);
  });
  onBeforeUnmount(() => {
    if (typeof app.modal.unregisterControls === 'function') {
      app.modal.unregisterControls(controls);
    }
  });
}
