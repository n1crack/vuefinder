/**
 * VueFinder Theme System
 * Provides utilities for theme management
 */

export type Theme = 'light' | 'dark' | 'midnight' | 'latte' | 'rose' | 'mythril' | 'lime' | 'sky' | 'ocean' | 'palenight' | 'arctic' | 'code';

export interface ThemeConfig {
  name: Theme;
  displayName: string;
  description: string;
}

export const themes: ThemeConfig[] = [
  {
    name: 'light',
    displayName: 'Light',
    description: 'Clean and bright interface'
  },
  {
    name: 'dark',
    displayName: 'Dark',
    description: 'Dark interface for low-light environments'
  },
  {
    name: 'midnight',
    displayName: 'Midnight',
    description: 'Deep dark theme with blue accents'
  },
  {
    name: 'latte',
    displayName: 'Latte',
    description: 'Warm coffee-inspired theme'
  },
  {
    name: 'rose',
    displayName: 'Rose',
    description: 'Sweet pastel pink theme'
  },
  {
    name: 'mythril',
    displayName: 'Mythril',
    description: 'Modern blue-gray theme'
  },
  {
    name: 'lime',
    displayName: 'Night Bright Lime',
    description: 'Dark theme with bright lime accents'
  },
  {
    name: 'sky',
    displayName: 'Sky',
    description: 'Dark theme with soft sky colors'
  },
  {
    name: 'ocean',
    displayName: 'Oceanic',
    description: 'Deep blue ocean inspired theme'
  },
  {
    name: 'palenight',
    displayName: 'Palenight',
    description: 'Popular dark theme with purple accents'
  },
  {
    name: 'arctic',
    displayName: 'Arctic',
    description: 'Cool arctic-inspired color palette'
  },
  {
    name: 'code',
    displayName: 'Code',
    description: 'Clean code editor inspired theme'
  }
];

/**
 * Set the theme for VueFinder
 * @param theme - The theme to apply
 * @param element - The VueFinder element (defaults to document)
 */
export function setTheme(theme: Theme, element?: HTMLElement): void {
  const targetElement = element || document.documentElement;
  
  // Set data-theme attribute for CSS targeting
  const vuefinderElement = targetElement.querySelector('.vuefinder') as HTMLElement;
  if (vuefinderElement) {
    vuefinderElement.setAttribute('data-theme', theme);
  } else if (targetElement.classList.contains('vuefinder')) {
    targetElement.setAttribute('data-theme', theme);
  }
}

/**
 * Get the current theme
 * @param element - The VueFinder element (defaults to document)
 * @returns The current theme or light if none is set
 */
export function getCurrentTheme(element?: HTMLElement): Theme {
  const targetElement = element || document.documentElement;
  const vuefinderElement = targetElement.querySelector('.vuefinder') as HTMLElement;
  
  if (vuefinderElement) {
    const theme = vuefinderElement.getAttribute('data-theme') as Theme;
    if (theme && themes.some(t => t.name === theme)) {
      return theme;
    }
  } else if (targetElement.classList.contains('vuefinder')) {
    const theme = targetElement.getAttribute('data-theme') as Theme;
    if (theme && themes.some(t => t.name === theme)) {
      return theme;
    }
  }
  
  return 'light';
}

/**
 * Initialize theme system
 * @param element - The VueFinder element (defaults to document)
 */
export function initializeTheme(element?: HTMLElement): void {
  const theme = getCurrentTheme(element);
  setTheme(theme, element);
}

/**
 * Get theme configuration
 * @param theme - The theme name
 * @returns Theme configuration or undefined if not found
 */
export function getThemeConfig(theme: Theme): ThemeConfig | undefined {
  return themes.find(t => t.name === theme);
}

/**
 * Check if a theme exists
 * @param theme - The theme name to check
 * @returns True if theme exists
 */
export function isValidTheme(theme: string): theme is Theme {
  return themes.some(t => t.name === theme);
}
