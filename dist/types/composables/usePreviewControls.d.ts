import type { PreviewControls } from '../types/preview';
/**
 * Composable used inside a preview component to register its edit-lifecycle
 * contract with the modal chrome. The chrome reads the live reactive fields
 * to render Edit/Save/Cancel and dirty-state, and calls the methods when the
 * user activates them.
 *
 * Call once at setup time with the contract. Cleanup is automatic.
 */
export declare function usePreviewControls(controls: PreviewControls): void;
