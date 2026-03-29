import { type ComputedRef } from 'vue';
import type { Theme } from '../stores/theme';
import type { ConfigStore } from '../stores/config';
/**
 * Theme management
 *
 * @param configStore - The config store instance
 * @returns Reactive theme object with current computed and set function
 */
export declare function useTheme(configStore: ConfigStore): {
    current: ComputedRef<string>;
    set: (theme: Theme) => void;
};
