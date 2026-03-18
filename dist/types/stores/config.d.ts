import type { DirEntry } from '../types';
import type { Theme } from './theme.ts';
import type { Store } from 'nanostores';
type Viewport = 'grid' | 'list';
/**
 * Persistent config state (saved to localStorage)
 * These values are persisted across page reloads
 */
export interface PersistenceConfigState {
    view: Viewport;
    theme: Theme;
    fullScreen: boolean;
    showTreeView: boolean;
    showHiddenFiles: boolean;
    metricUnits: boolean;
    showThumbnails: boolean;
    persist: boolean;
    path: string;
    pinnedFolders: DirEntry[];
    notificationsEnabled: boolean;
    expandTreeByDefault: boolean;
    expandedTreePaths: string[];
}
/**
 * Non-persistent config state (runtime only)
 * These values are not saved to localStorage and reset on page reload
 */
export interface NonPersistenceConfigState {
    loadingIndicator: 'linear' | 'circular' | null;
    initialPath: string | null;
    maxFileSize: number | string | null;
    showMenuBar: boolean;
    showToolbar: boolean;
    gridItemWidth: number;
    gridItemHeight: number;
    gridItemGap: number;
    gridIconSize: number;
    listItemHeight: number;
    listItemGap: number;
    listIconSize: number;
    notificationPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    notificationDuration: number;
    notificationVisibleToasts: number;
    notificationRichColors: boolean;
}
/**
 * Combined config state (for convenience)
 * Union of persistent and non-persistent config states
 */
export type ConfigState = PersistenceConfigState & NonPersistenceConfigState;
/**
 * Config store interface providing access to both persistent and non-persistent config
 */
export interface ConfigStore {
    state: Store<ConfigState>;
    set: <K extends keyof PersistenceConfigState>(keyOrPatch: K | Partial<PersistenceConfigState>, value?: PersistenceConfigState[K]) => void;
    get: <K extends keyof ConfigState>(key: K) => ConfigState[K];
    all: () => ConfigState;
    toggle: (key: keyof PersistenceConfigState) => void;
    reset: () => void;
    init: (defaults?: ConfigDefaults | Record<string, unknown>) => void;
}
export type ConfigDefaults = Partial<ConfigState>;
/**
 * Creates a config store with separate persistent and non-persistent state management
 *
 * @param id - Unique identifier for this config store instance (used for localStorage key)
 * @param initialConfig - Initial configuration values (can include both persistent and non-persistent)
 * @returns ConfigStore instance with methods to get/set config values
 */
export declare const createConfigStore: (id: string, initialConfig?: ConfigDefaults | Record<string, unknown>) => {
    state: import("nanostores").ReadableAtom<ConfigState>;
    init: (defaults?: ConfigDefaults | Record<string, unknown>) => void;
    get: <K extends keyof ConfigState>(key: K) => ConfigState[K];
    set: <K extends keyof PersistenceConfigState>(keyOrPatch: K | Partial<PersistenceConfigState>, value?: PersistenceConfigState[K]) => void;
    toggle: (key: keyof PersistenceConfigState) => void;
    all: () => ConfigState;
    reset: () => void;
};
export {};
