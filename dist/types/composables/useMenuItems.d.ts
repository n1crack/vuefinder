import type { MenuItem } from '../types';
/**
 * Default menu bar structure (File/Edit/View/Go/Help) as used by `MenuBar.vue`.
 *
 * Extracted into a composable so the same items (and, importantly, the same
 * modal-opening actions) can be reused to build a custom menu bar layout via
 * `MenuBar`'s slots, without duplicating any business logic.
 */
export declare function useMenuItems(): {
    menuItems: import("vue").ComputedRef<MenuItem[]>;
    shouldShowExit: import("vue").ComputedRef<boolean>;
};
