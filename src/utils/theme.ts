/**
 * VueFinder Theme System
 * Provides utilities for theme management
 */

export type Theme = 'light' | 'dark' | 'midnight' | 'latte' | 'rose' | 'mythril' | 'lime' | 'dark-plus' | 'ocean' | 'palenight';

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
    name: 'dark-plus',
    displayName: 'Neon',
    description: 'Dark theme with vibrant neon colors'
  },
  {
    name: 'ocean',
    displayName: 'Oceanic',
    description: 'Material Ocean inspired deep blue theme'
  },
  {
    name: 'palenight',
    displayName: 'Palenight',
    description: 'Popular dark theme with purple accents'
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
  
  // Update root CSS variables for selection area
  updateRootSelectionVariables(theme);
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
 * Update root CSS variables for selection area
 * @param theme - The theme to apply
 */
function updateRootSelectionVariables(theme: Theme): void {
  const root = document.documentElement;
  
  switch (theme) {
    case 'light':
      root.style.setProperty('--vf-selection-bg', '#f9fafb');
      root.style.setProperty('--vf-selection-border', '#d1d5db');
      break;
    case 'dark':
      root.style.setProperty('--vf-selection-bg', '#374151');
      root.style.setProperty('--vf-selection-border', '#374151');
      break;
    case 'midnight':
      root.style.setProperty('--vf-selection-bg', '#334155');
      root.style.setProperty('--vf-selection-border', '#334155');
      break;
    case 'latte':
      root.style.setProperty('--vf-selection-bg', '#f5f1e8');
      root.style.setProperty('--vf-selection-border', '#d4c4a8');
      break;
    case 'rose':
      root.style.setProperty('--vf-selection-bg', '#fef7f7');
      root.style.setProperty('--vf-selection-border', '#fecaca');
      break;
    case 'mythril':
      root.style.setProperty('--vf-selection-bg', '#f0f9ff');
      root.style.setProperty('--vf-selection-border', '#0ea5e9');
      break;
    case 'lime':
      root.style.setProperty('--vf-selection-bg', '#1a2e1a');
      root.style.setProperty('--vf-selection-border', '#84cc16');
      break;
    case 'dark-plus':
      root.style.setProperty('--vf-selection-bg', '#49483e');
      root.style.setProperty('--vf-selection-border', '#f92672');
      break;
    case 'ocean':
      root.style.setProperty('--vf-selection-bg', '#263238');
      root.style.setProperty('--vf-selection-border', '#00bcd4');
      break;
    case 'palenight':
      root.style.setProperty('--vf-selection-bg', '#263238');
      root.style.setProperty('--vf-selection-border', '#c792ea');
      break;
  }
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
