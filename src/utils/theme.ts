/**
 * VueFinder Theme System
 * Provides utilities for theme management
 */

export type Theme = 'default-light' | 'default-dark' | 'midnight' | 'latte';

export interface ThemeConfig {
  name: Theme;
  displayName: string;
  description: string;
}

export const themes: ThemeConfig[] = [
  {
    name: 'default-light',
    displayName: 'Default Light',
    description: 'Clean and bright interface'
  },
  {
    name: 'default-dark',
    displayName: 'Default Dark',
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
  
  // Store theme preference
  localStorage.setItem('vuefinder-theme', theme);
}

/**
 * Get the current theme
 * @param element - The VueFinder element (defaults to document)
 * @returns The current theme or default-light if none is set
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
  
  // Check localStorage
  const storedTheme = localStorage.getItem('vuefinder-theme') as Theme;
  if (storedTheme && themes.some(t => t.name === storedTheme)) {
    return storedTheme;
  }
  
  return 'default-light';
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
