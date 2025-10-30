import { computed, type ComputedRef, type Ref, unref } from 'vue';
import { useStore } from '@nanostores/vue';
import type { Theme } from '../stores/theme';
import type { ConfigStore } from '../stores/config';

/**
 * Theme management
 *
 * @param configStore - The config store instance
 * @param defaultTheme - Default theme from props (optional, can be reactive ref)
 * @returns Reactive theme object with current computed and set function
 */
export function useTheme(configStore: ConfigStore, defaultTheme?: Theme | Ref<Theme> | (() => Theme)) {
    // Make configStore reactive
    const configState = useStore(configStore.state);

    // Computed current theme - reacts to both configStore and props changes
    const current: ComputedRef<Theme> = computed<Theme>(() => {
        const stored = configState.value.theme;
        
        // If user manually set a theme (not 'default'), use it
        if (stored && stored !== 'default') {
            return stored;
        }
        
        // Get defaultTheme value (supports ref, function, or plain value)
        const defaultThemeValue = typeof defaultTheme === 'function' 
            ? defaultTheme() 
            : unref(defaultTheme);
        
        // If 'default' or undefined, use props.theme or fallback to 'light'
        return defaultThemeValue || 'light';
    });

    // Set theme function
    const setTheme = (theme: Theme) => {
        configStore.set('theme', theme);
    };

    return {
        current,
        set: setTheme
    };
}
