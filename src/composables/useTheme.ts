import { computed, type ComputedRef } from 'vue';
import { useStore } from '@nanostores/vue';
import type { Theme } from '../stores/theme';
import type { ConfigStore, ConfigState } from '../stores/config';
import type { StoreValue } from 'nanostores';

/**
 * Theme management
 *
 * @param configStore - The config store instance
 * @returns Reactive theme object with current computed and set function
 */
export function useTheme(configStore: ConfigStore) {
  // Make configStore reactive
  const configState: StoreValue<ConfigState> = useStore(configStore.state);

  // Computed current theme - reacts to configStore changes
  const current: ComputedRef<Theme> = computed<Theme>(() => {
    const stored = configState.value.theme;
    // Theme is always defined in config (defaults to 'silver'), so just use it
    return stored || 'silver';
  });

  // Set theme function
  const setTheme = (theme: Theme) => {
    configStore.set('theme', theme);
  };

  return {
    current,
    set: setTheme,
  };
}
