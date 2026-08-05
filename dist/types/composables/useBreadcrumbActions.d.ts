/**
 * Breadcrumb-related actions (refresh, navigate up, toggle tree view, copy
 * path) used by `Breadcrumb.vue`.
 *
 * Extracted into a composable so a custom menu/tool bar can reuse the exact
 * same behavior - e.g. to combine menu bar and breadcrumb functionality into
 * a single bar via `MenuBar`'s slots.
 */
export declare function useBreadcrumbActions(): {
    currentPath: any;
    refresh: () => void;
    goTo: (path: string) => void;
    goUp: () => void;
    toggleTreeView: () => void;
    copyCurrentPath: () => Promise<void>;
};
