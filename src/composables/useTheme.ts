import {ref} from 'vue';

const THEMES = { SYSTEM: 'system', LIGHT: 'light', DARK: 'dark' } as const;

export default function useTheme(storage: { getStore: (k: string, d?: any) => any; setStore: (k: string, v: any) => void; removeStore: (k: string) => void }, propTheme?: 'system'|'light'|'dark') {
  const theme = ref<'system'|'light'|'dark'>(THEMES.SYSTEM);
  const actualTheme = ref<'system'|'light'|'dark'>(THEMES.LIGHT);
  theme.value = storage.getStore('theme', propTheme ?? THEMES.SYSTEM);

  const matcher = window.matchMedia('(prefers-color-scheme: dark)');

  const updateActualTheme = (matcher: MediaQueryListEvent | MediaQueryList) => {
    if (theme.value === THEMES.DARK || (theme.value === THEMES.SYSTEM && (matcher as MediaQueryList).matches)) {
      actualTheme.value = THEMES.DARK;
    } else {
      actualTheme.value = THEMES.LIGHT;
    }
  }

  updateActualTheme(matcher);
  matcher.addEventListener('change', updateActualTheme as any);

  return {
    value: theme,
    actualValue: actualTheme,
    set(value: 'system'|'light'|'dark') {
      theme.value = value;
      if (value !== THEMES.SYSTEM) {
        storage.setStore('theme', value);
      } else {
        storage.removeStore('theme');
      }
      updateActualTheme(matcher)
    },
  }
}


