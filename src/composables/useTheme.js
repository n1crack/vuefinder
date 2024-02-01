import { ref } from 'vue';

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
     */
    set(value) {
      theme.value = value;
      if (value !== THEMES.SYSTEM) {
        actualTheme.value = value;
        storage.setStore('theme', value);
      } else {
        if (propTheme) {
          actualTheme.value = propTheme;
        } else {
          actualTheme.value = matcher.matches ? THEMES.DARK : THEMES.LIGHT
        }
        storage.removeStore('theme');
      }
    },
  }
}
