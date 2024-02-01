import {ref} from 'vue';

const THEMES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
}

/**
 * @typedef Theme
 * @type {"system"|"light"|"dark"} theme
 */

export default function(storage, propTheme) {
  const theme = ref(THEMES.SYSTEM);
  const actualTheme = ref(THEMES.LIGHT);
  theme.value = storage.getStore('theme', propTheme ?? THEMES.SYSTEM);

  const matcher = window.matchMedia('(prefers-color-scheme: dark)');

  const updateActualTheme = (matcher) => {
    if (theme.value === THEMES.DARK || (theme.value === THEMES.SYSTEM && matcher.matches)) {
      actualTheme.value = THEMES.DARK;
    } else {
      actualTheme.value = THEMES.LIGHT;
    }
  }

  updateActualTheme(matcher);
  matcher.addEventListener('change', updateActualTheme);

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
     */
    set(value) {
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
