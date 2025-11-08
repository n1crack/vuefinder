import { persistentAtom } from '@nanostores/persistent';
import { atom, computed } from 'nanostores';
import type { DirEntry } from '../types';
import type { Theme } from './theme.ts';
import type { Store } from 'nanostores';
import { unref } from 'vue';

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
  compactListView: boolean;
  metricUnits: boolean;
  showThumbnails: boolean;
  persist: boolean;
  path: string;
  loadingIndicator: 'linear' | 'circular' | string;
  maxFileSize: number | string | null;
  pinnedFolders: DirEntry[];
}

/**
 * Non-persistent config state (runtime only)
 * These values are not saved to localStorage and reset on page reload
 */
export interface NonPersistenceConfigState {
  initialPath: string | null;
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
  set: <K extends keyof PersistenceConfigState>(
    keyOrPatch: K | Partial<PersistenceConfigState>,
    value?: PersistenceConfigState[K]
  ) => void;
  // Convenience accessors used across the app
  get: <K extends keyof ConfigState>(key: K) => ConfigState[K];
  all: () => ConfigState;
  toggle: (key: keyof PersistenceConfigState) => void;
  reset: () => void;
  init: (defaults?: ConfigDefaults | Record<string, unknown>) => void;
}

export type ConfigDefaults = Partial<ConfigState>;

const DEFAULT_PERSISTENCE_STATE: PersistenceConfigState = {
  view: 'grid',
  theme: 'silver',
  fullScreen: false,
  showTreeView: false,
  showHiddenFiles: true,
  compactListView: true,
  metricUnits: false,
  showThumbnails: true,
  persist: false,
  path: '',
  loadingIndicator: 'circular',
  maxFileSize: null,
  pinnedFolders: [] as DirEntry[],
};

const DEFAULT_NON_PERSISTENCE_STATE: NonPersistenceConfigState = {
  initialPath: null,
};

// Cached non-persistence keys for performance
const NON_PERSISTENCE_KEYS = new Set<keyof NonPersistenceConfigState>(
  Object.keys(DEFAULT_NON_PERSISTENCE_STATE) as Array<keyof NonPersistenceConfigState>
);

/**
 * Normalizes theme value to ensure it defaults to 'silver' if not provided or undefined
 */
function normalizeTheme(theme: Theme | undefined | null): Theme {
  return theme || 'silver';
}

/**
 * Checks if a key belongs to non-persistence config state
 */
function isNonPersistenceKey(key: string): key is keyof NonPersistenceConfigState {
  return NON_PERSISTENCE_KEYS.has(key as keyof NonPersistenceConfigState);
}

/**
 * Separates persistent and non-persistent config values
 */
function separateConfig(config: ConfigDefaults | Record<string, unknown>) {
  const persistenceConfig: Partial<PersistenceConfigState> = {};
  const nonPersistenceConfig: Partial<NonPersistenceConfigState> = {};

  // Type guard to ensure config is indexable
  const configRecord = config as Record<string, unknown>;

  for (const key in configRecord) {
    if (isNonPersistenceKey(key)) {
      nonPersistenceConfig[key] = configRecord[key] as NonPersistenceConfigState[typeof key];
    } else if (key in DEFAULT_PERSISTENCE_STATE) {
      const persistenceKey = key as keyof PersistenceConfigState;
      const value = configRecord[key] as PersistenceConfigState[typeof persistenceKey];
      (persistenceConfig as Record<string, unknown>)[persistenceKey] = value;
    }
  }

  return { persistenceConfig, nonPersistenceConfig };
}

/**
 * Merges persistence config with defaults, ensuring theme is normalized
 */
function mergePersistenceConfig(
  defaults: Partial<PersistenceConfigState>,
  current: PersistenceConfigState
): PersistenceConfigState {
  const merged = { ...DEFAULT_PERSISTENCE_STATE, ...defaults, ...current };
  merged.theme = normalizeTheme(merged.theme);
  return merged;
}

/**
 * Merges non-persistence config with defaults
 */
function mergeNonPersistenceConfig(
  defaults: Partial<NonPersistenceConfigState>,
  current: NonPersistenceConfigState
): NonPersistenceConfigState {
  return { ...DEFAULT_NON_PERSISTENCE_STATE, ...current, ...defaults };
}

/**
 * Creates a config store with separate persistent and non-persistent state management
 *
 * @param id - Unique identifier for this config store instance (used for localStorage key)
 * @param initialConfig - Initial configuration values (can include both persistent and non-persistent)
 * @returns ConfigStore instance with methods to get/set config values
 */
export const createConfigStore = (
  id: string,
  initialConfig: ConfigDefaults | Record<string, unknown> = {}
) => {
  const storeKey = `vuefinder_config_${id}`;

  // Separate persistent and non-persistent config
  const { persistenceConfig, nonPersistenceConfig } = separateConfig(initialConfig);

  const mergedPersistenceConfig = mergePersistenceConfig(
    persistenceConfig,
    DEFAULT_PERSISTENCE_STATE
  );

  const mergedNonPersistenceConfig = mergeNonPersistenceConfig(
    nonPersistenceConfig,
    DEFAULT_NON_PERSISTENCE_STATE
  );

  // Create two separate stores
  const persistenceState = persistentAtom<PersistenceConfigState>(
    storeKey,
    mergedPersistenceConfig,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
  );

  const nonPersistenceState = atom<NonPersistenceConfigState>(mergedNonPersistenceConfig);

  // Combined state (computed from both stores)
  const state = computed(
    [persistenceState, nonPersistenceState],
    (persistence, nonPersistence): ConfigState => ({
      ...persistence,
      ...nonPersistence,
    })
  );

  /**
   * Override localStorage values with props.config values if provided
   */
  if (Object.keys(persistenceConfig).length > 0) {
    const currentState = persistenceState.get();
    
    // Unwrap Vue ref values (same as theme handling in VueFinderView)
    const unwrappedConfig: Record<string, unknown> = {};
    for (const key in persistenceConfig) {
      const value = persistenceConfig[key as keyof typeof persistenceConfig];
      unwrappedConfig[key] = unref(value as unknown);
    }
    
    const updatedState = { ...currentState, ...unwrappedConfig } as PersistenceConfigState;
    // Only update if there are actual changes to avoid unnecessary writes
    if (JSON.stringify(currentState) !== JSON.stringify(updatedState)) {
      persistenceState.set(updatedState);
    }
  }

  /**
   * Initializes config store with new defaults, merging with current state
   */
  const init = (defaults: ConfigDefaults | Record<string, unknown> = {}) => {
    const currentPersistence = persistenceState.get();
    const currentNonPersistence = nonPersistenceState.get();

    // Separate defaults
    const { persistenceConfig: persistenceDefaults, nonPersistenceConfig: nonPersistenceDefaults } =
      separateConfig(defaults);

    const persistenceFromDefaults = mergePersistenceConfig(persistenceDefaults, currentPersistence);
    const nonPersistenceFromDefaults = mergeNonPersistenceConfig(
      nonPersistenceDefaults,
      currentNonPersistence
    );

    persistenceState.set(persistenceFromDefaults);
    nonPersistenceState.set(nonPersistenceFromDefaults);
  };

  /**
   * Gets a config value by key, checking non-persistence state first
   */
  const get = <K extends keyof ConfigState>(key: K): ConfigState[K] => {
    // Use direct property access for better performance
    if (isNonPersistenceKey(key)) {
      return nonPersistenceState.get()[key] as ConfigState[K];
    }
    // Otherwise, get from persistence state
    return persistenceState.get()[key as keyof PersistenceConfigState] as ConfigState[K];
  };

  /**
   * Gets all config values (both persistent and non-persistent)
   */
  const all = (): ConfigState => {
    return {
      ...persistenceState.get(),
      ...nonPersistenceState.get(),
    };
  };

  /**
   * Sets a persistent config value or multiple values
   */
  const set = <K extends keyof PersistenceConfigState>(
    keyOrPatch: K | Partial<PersistenceConfigState>,
    value?: PersistenceConfigState[K]
  ): void => {
    const currentPersistence = persistenceState.get();

    if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
      persistenceState.set({ ...currentPersistence, ...keyOrPatch });
    } else {
      persistenceState.set({
        ...currentPersistence,
        [keyOrPatch]: value as PersistenceConfigState[K],
      });
    }
  };

  /**
   * Toggles a boolean persistent config value
   */
  const toggle = (key: keyof PersistenceConfigState) => {
    const currentPersistence = persistenceState.get();
    set(key, !currentPersistence[key]);
  };

  /**
   * Resets all config values to defaults
   */
  const reset = () => {
    persistenceState.set({ ...DEFAULT_PERSISTENCE_STATE });
    nonPersistenceState.set({ ...DEFAULT_NON_PERSISTENCE_STATE });
  };

  return {
    // Store atom (combined)
    state,

    // Methods
    init,
    get,
    set,
    toggle,
    all,
    reset,
  };
};
