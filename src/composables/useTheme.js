import { computed, ref } from 'vue';
import { useStorage } from './useStorage.js';

const THEMES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
}

/**
 * @typedef Theme
 * @type {"system"|"light"|"dark"} theme
 */
const ALL_THEMES = Object.values(THEMES)

export default function(propId, propTheme) {
  const storage = useStorage(propId);
  const theme = ref(THEMES.SYSTEM);
  const actualTheme = ref(THEMES.LIGHT);
  theme.value = storage.getStore('theme', propTheme ?? THEMES.SYSTEM);
  actualTheme.value = theme.value === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;

  const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  matcher.addEventListener('change', e => {
    if (theme.value === THEMES.SYSTEM) {
      actualTheme.value = e.matches ? THEMES.DARK : THEMES.LIGHT;
    }
  });

  return {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: theme,

    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: actualTheme,

    /**
     * @param {Theme} value
     * @param {Boolean} dontSaveToStorage
     */
    setValue(value, dontSaveToStorage = false) {
      theme.value = value;
      if (value !== THEMES.SYSTEM) {
        actualTheme.value = value;
      } else {
        actualTheme.value = matcher.matches ? THEMES.DARK : THEMES.LIGHT
      }
      if (!dontSaveToStorage) {
        storage.setStore('theme', value);
      }
    },
  }
}
