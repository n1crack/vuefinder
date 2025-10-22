

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { FEATURE_ALL_NAMES } from '../src/features.js';
import { contextMenuItems } from '../src/index.js';
import PDFIcon from './icons/pdf_file.svg'
import TextIcon from './icons/text_file.svg'

const example = ref('default')
const themeBuilderVueFinder = ref<HTMLElement | null>(null)
const examples = {
  default: "Inline select button example",
  externalSelect: "External select example",
  contextmenu: "Custom context menu example",
  customIcons: "Custom Icons (Scoped Slot)",
  windowExamples: "Window Examples (Exit Menu Demo)",
  eventsDemo: "Events Demo - All VueFinder Events",
  customDclick: "Custom Double-Click Events Demo",
  singleSelection: "Single Selection Mode Demo",
  selectionFilter: "Selection Filter Demo",
  themeBuilder: "Theme Builder - Live Theme Customization"
}

// Theme management
const currentTheme = ref('light')
const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'midnight', label: 'Midnight' },
  { value: 'latte', label: 'Latte' },
  { value: 'rose', label: 'Rose' },
  { value: 'mythril', label: 'Mythril' },
  { value: 'lime', label: 'Dark Lime' },
  { value: 'sky', label: 'Sky' },
  { value: 'ocean', label: 'Oceanic' },
  { value: 'palenight', label: 'Palenight' },
  { value: 'arctic', label: 'Arctic' },
  { value: 'code', label: 'Code' }
]

// Theme Builder - Custom theme variables
const customTheme = ref({
  // Background Colors
  '--vf-bg-primary': '#ffffff',
  '--vf-bg-secondary': '#f9fafb',
  '--vf-bg-tertiary': '#f3f4f6',
  '--vf-bg-hover': '#f9fafb',
  '--vf-bg-selected': '#f3f4f6',
  '--vf-bg-disabled': '#f9fafb',
  
  // Text Colors
  '--vf-text-primary': '#374151',
  '--vf-text-secondary': '#6b7280',
  '--vf-text-tertiary': '#9ca3af',
  '--vf-text-disabled': '#d1d5db',
  '--vf-text-inverse': '#ffffff',
  
  // Border Colors
  '--vf-border-primary': '#d1d5db',
  '--vf-border-secondary': '#e5e7eb',
  '--vf-border-focus': '#aabfd7',
  '--vf-border-error': '#ef4444',
  
  // Accent Colors
  '--vf-accent-primary': '#636e7a',
  '--vf-accent-secondary': '#c8d6e6',
  '--vf-accent-success': '#10b981',
  '--vf-accent-warning': '#f59e0b',
  '--vf-accent-error': '#ef4444',
  
  // Interactive Colors
  '--vf-interactive-hover': '#f3f4f6',
  '--vf-interactive-active': '#e5e7eb',
  '--vf-interactive-focus': '#e8eff7',
  
  // Shadow Colors
  '--vf-shadow-sm': 'rgba(0, 0, 0, 0.05)',
  '--vf-shadow-md': 'rgba(0, 0, 0, 0.1)',
  '--vf-shadow-lg': 'rgba(0, 0, 0, 0.15)',
  '--vf-shadow-modal': 'rgba(0, 0, 0, 0.15)',
  
  // Overlay Colors
  '--vf-overlay-bg': 'rgba(17, 24, 39, 0.3)',
  '--vf-overlay-border': 'rgba(75, 85, 99, 0.8)',
  '--vf-overlay-text': '#6b7280',
  
  // Selection Colors
  '--vf-selection-bg': '#f9fafb',
  '--vf-selection-border': '#d1d5db'
})

// Theme presets for quick testing
const themePresets = {
  light: {
    '--vf-bg-primary': '#ffffff',
    '--vf-bg-secondary': '#f9fafb',
    '--vf-bg-tertiary': '#f3f4f6',
    '--vf-bg-hover': '#f9fafb',
    '--vf-bg-selected': '#f3f4f6',
    '--vf-bg-disabled': '#f9fafb',
    '--vf-text-primary': '#374151',
    '--vf-text-secondary': '#6b7280',
    '--vf-text-tertiary': '#9ca3af',
    '--vf-text-disabled': '#d1d5db',
    '--vf-text-inverse': '#ffffff',
    '--vf-border-primary': '#d1d5db',
    '--vf-border-secondary': '#e5e7eb',
    '--vf-border-focus': '#aabfd7',
    '--vf-border-error': '#ef4444',
    '--vf-accent-primary': '#636e7a',
    '--vf-accent-secondary': '#c8d6e6',
    '--vf-accent-success': '#10b981',
    '--vf-accent-warning': '#f59e0b',
    '--vf-accent-error': '#ef4444',
    '--vf-interactive-hover': '#f3f4f6',
    '--vf-interactive-active': '#e5e7eb',
    '--vf-interactive-focus': '#e8eff7',
    '--vf-shadow-sm': 'rgba(0, 0, 0, 0.05)',
    '--vf-shadow-md': 'rgba(0, 0, 0, 0.1)',
    '--vf-shadow-lg': 'rgba(0, 0, 0, 0.15)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.15)',
    '--vf-overlay-bg': 'rgba(17, 24, 39, 0.3)',
    '--vf-overlay-border': 'rgba(75, 85, 99, 0.8)',
    '--vf-overlay-text': '#6b7280',
    '--vf-selection-bg': '#f9fafb',
    '--vf-selection-border': '#d1d5db'
  },
  dark: {
    '--vf-bg-primary': '#1f2937',
    '--vf-bg-secondary': '#111827',
    '--vf-bg-tertiary': '#374151',
    '--vf-bg-hover': '#374151',
    '--vf-bg-selected': '#4b5563',
    '--vf-bg-disabled': '#374151',
    '--vf-text-primary': '#f9fafb',
    '--vf-text-secondary': '#d1d5db',
    '--vf-text-tertiary': '#9ca3af',
    '--vf-text-disabled': '#6b7280',
    '--vf-text-inverse': '#1f2937',
    '--vf-border-primary': '#374151',
    '--vf-border-secondary': '#4b5563',
    '--vf-border-focus': '#60a5fa',
    '--vf-border-error': '#f87171',
    '--vf-accent-primary': '#60a5fa',
    '--vf-accent-secondary': '#22d3ee',
    '--vf-accent-success': '#34d399',
    '--vf-accent-warning': '#fbbf24',
    '--vf-accent-error': '#f87171',
    '--vf-interactive-hover': '#374151',
    '--vf-interactive-active': '#4b5563',
    '--vf-interactive-focus': '#1e3a8a',
    '--vf-shadow-sm': 'rgba(0, 0, 0, 0.3)',
    '--vf-shadow-md': 'rgba(0, 0, 0, 0.4)',
    '--vf-shadow-lg': 'rgba(0, 0, 0, 0.5)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-bg': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-border': 'rgba(107, 114, 128, 0.9)',
    '--vf-overlay-text': '#9ca3af',
    '--vf-selection-bg': '#374151',
    '--vf-selection-border': '#60a5fa'
  },
  midnight: {
    '--vf-bg-primary': '#0f172a',
    '--vf-bg-secondary': '#1e293b',
    '--vf-bg-tertiary': '#334155',
    '--vf-bg-hover': '#334155',
    '--vf-bg-selected': '#475569',
    '--vf-bg-disabled': '#334155',
    '--vf-text-primary': '#f1f5f9',
    '--vf-text-secondary': '#cbd5e1',
    '--vf-text-tertiary': '#94a3b8',
    '--vf-text-disabled': '#64748b',
    '--vf-text-inverse': '#0f172a',
    '--vf-border-primary': '#334155',
    '--vf-border-secondary': '#475569',
    '--vf-border-focus': '#0ea5e9',
    '--vf-border-error': '#f87171',
    '--vf-accent-primary': '#0ea5e9',
    '--vf-accent-secondary': '#06b6d4',
    '--vf-accent-success': '#22c55e',
    '--vf-accent-warning': '#eab308',
    '--vf-accent-error': '#f87171',
    '--vf-interactive-hover': '#334155',
    '--vf-interactive-active': '#475569',
    '--vf-interactive-focus': '#0c4a6e',
    '--vf-shadow-sm': 'rgba(0, 0, 0, 0.4)',
    '--vf-shadow-md': 'rgba(0, 0, 0, 0.5)',
    '--vf-shadow-lg': 'rgba(0, 0, 0, 0.6)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.5)',
    '--vf-overlay-bg': 'rgba(0, 0, 0, 0.5)',
    '--vf-overlay-border': 'rgba(100, 116, 139, 0.8)',
    '--vf-overlay-text': '#94a3b8',
    '--vf-selection-bg': '#334155',
    '--vf-selection-border': '#0ea5e9'
  },
  latte: {
    '--vf-bg-primary': '#faf7f0',
    '--vf-bg-secondary': '#f5f1e8',
    '--vf-bg-tertiary': '#ede7d9',
    '--vf-bg-hover': '#f5f1e8',
    '--vf-bg-selected': '#ede7d9',
    '--vf-bg-disabled': '#f5f1e8',
    '--vf-text-primary': '#4c2a1a',
    '--vf-text-secondary': '#8b5a3c',
    '--vf-text-tertiary': '#a67c52',
    '--vf-text-disabled': '#c4a484',
    '--vf-text-inverse': '#faf7f0',
    '--vf-border-primary': '#d4c4a8',
    '--vf-border-secondary': '#e2d5c0',
    '--vf-border-focus': '#8b5a3c',
    '--vf-border-error': '#c65d5d',
    '--vf-accent-primary': '#8b5a3c',
    '--vf-accent-secondary': '#a67c52',
    '--vf-accent-success': '#7d8b5a',
    '--vf-accent-warning': '#d4a574',
    '--vf-accent-error': '#c65d5d',
    '--vf-interactive-hover': '#f5f1e8',
    '--vf-interactive-active': '#ede7d9',
    '--vf-interactive-focus': '#e2d5c0',
    '--vf-shadow-sm': 'rgba(76, 42, 26, 0.1)',
    '--vf-shadow-md': 'rgba(76, 42, 26, 0.15)',
    '--vf-shadow-lg': 'rgba(76, 42, 26, 0.2)',
    '--vf-shadow-modal': 'rgba(76, 42, 26, 0.15)',
    '--vf-overlay-bg': 'rgba(76, 42, 26, 0.2)',
    '--vf-overlay-border': 'rgba(139, 90, 60, 0.6)',
    '--vf-overlay-text': '#8b5a3c',
    '--vf-selection-bg': '#f5f1e8',
    '--vf-selection-border': '#8b5a3c'
  },
  rose: {
    '--vf-bg-primary': '#fdf2f8',
    '--vf-bg-secondary': '#fce7f3',
    '--vf-bg-tertiary': '#fbcfe8',
    '--vf-bg-hover': '#f9a8d4',
    '--vf-bg-selected': '#f472b6',
    '--vf-bg-disabled': '#fce7f3',
    '--vf-text-primary': '#831843',
    '--vf-text-secondary': '#be185d',
    '--vf-text-tertiary': '#ec4899',
    '--vf-text-disabled': '#f9a8d4',
    '--vf-text-inverse': '#ffffff',
    '--vf-border-primary': '#f9a8d4',
    '--vf-border-secondary': '#fbcfe8',
    '--vf-border-focus': '#ec4899',
    '--vf-border-error': '#f43f5e',
    '--vf-accent-primary': '#ec4899',
    '--vf-accent-secondary': '#f472b6',
    '--vf-accent-success': '#10b981',
    '--vf-accent-warning': '#f59e0b',
    '--vf-accent-error': '#f43f5e',
    '--vf-interactive-hover': '#f9a8d4',
    '--vf-interactive-active': '#f472b6',
    '--vf-interactive-focus': '#fce7f3',
    '--vf-shadow-sm': 'rgba(236, 72, 153, 0.1)',
    '--vf-shadow-md': 'rgba(236, 72, 153, 0.2)',
    '--vf-shadow-lg': 'rgba(236, 72, 153, 0.3)',
    '--vf-shadow-modal': 'rgba(236, 72, 153, 0.2)',
    '--vf-overlay-bg': 'rgba(131, 24, 67, 0.3)',
    '--vf-overlay-border': 'rgba(190, 24, 93, 0.8)',
    '--vf-overlay-text': '#be185d',
    '--vf-selection-bg': '#fce7f3',
    '--vf-selection-border': '#ec4899'
  },
  mythril: {
    '--vf-bg-primary': '#f8fafc',
    '--vf-bg-secondary': '#f1f5f9',
    '--vf-bg-tertiary': '#e2e8f0',
    '--vf-bg-hover': '#f1f5f9',
    '--vf-bg-selected': '#e2e8f0',
    '--vf-bg-disabled': '#f3f4f6',
    '--vf-text-primary': '#1e293b',
    '--vf-text-secondary': '#475569',
    '--vf-text-tertiary': '#64748b',
    '--vf-text-disabled': '#94a3b8',
    '--vf-text-inverse': '#f8fafc',
    '--vf-border-primary': '#cbd5e1',
    '--vf-border-secondary': '#94a3b8',
    '--vf-border-focus': '#0ea5e9',
    '--vf-border-error': '#ef4444',
    '--vf-accent-primary': '#0ea5e9',
    '--vf-accent-secondary': '#0284c7',
    '--vf-accent-success': '#10b981',
    '--vf-accent-warning': '#f59e0b',
    '--vf-accent-error': '#ef4444',
    '--vf-interactive-hover': '#f0f9ff',
    '--vf-interactive-active': '#0284c7',
    '--vf-interactive-focus': '#e0f2fe',
    '--vf-shadow-sm': 'rgba(14, 165, 233, 0.08)',
    '--vf-shadow-md': 'rgba(14, 165, 233, 0.12)',
    '--vf-shadow-lg': 'rgba(14, 165, 233, 0.16)',
    '--vf-shadow-modal': 'rgba(14, 165, 233, 0.12)',
    '--vf-overlay-bg': 'rgba(14, 165, 233, 0.2)',
    '--vf-overlay-border': 'rgba(14, 165, 233, 0.6)',
    '--vf-overlay-text': '#0369a1',
    '--vf-selection-bg': '#f0f9ff',
    '--vf-selection-border': '#0ea5e9'
  },
  lime: {
    '--vf-bg-primary': '#0f1419',
    '--vf-bg-secondary': '#1a2e1a',
    '--vf-bg-tertiary': '#2d4a2d',
    '--vf-bg-hover': '#1a2e1a',
    '--vf-bg-selected': '#2d4a2d',
    '--vf-bg-disabled': '#374151',
    '--vf-text-primary': '#f0fdf4',
    '--vf-text-secondary': '#dcfce7',
    '--vf-text-tertiary': '#bbf7d0',
    '--vf-text-disabled': '#9ca3af',
    '--vf-text-inverse': '#0f1419',
    '--vf-border-primary': '#2d4a2d',
    '--vf-border-secondary': '#365f32',
    '--vf-border-focus': '#84cc16',
    '--vf-border-error': '#ef4444',
    '--vf-accent-primary': '#84cc16',
    '--vf-accent-secondary': '#a3e635',
    '--vf-accent-success': '#22c55e',
    '--vf-accent-warning': '#eab308',
    '--vf-accent-error': '#ef4444',
    '--vf-interactive-hover': '#365f32',
    '--vf-interactive-active': '#84cc16',
    '--vf-interactive-focus': '#2d4a2d',
    '--vf-shadow-sm': 'rgba(132, 204, 22, 0.15)',
    '--vf-shadow-md': 'rgba(132, 204, 22, 0.2)',
    '--vf-shadow-lg': 'rgba(132, 204, 22, 0.25)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-bg': 'rgba(15, 20, 25, 0.8)',
    '--vf-overlay-border': 'rgba(132, 204, 22, 0.7)',
    '--vf-overlay-text': '#dcfce7',
    '--vf-selection-bg': '#1a2e1a',
    '--vf-selection-border': '#84cc16'
  },
  sky: {
    '--vf-bg-primary': '#0a0e13',
    '--vf-bg-secondary': '#0f1419',
    '--vf-bg-tertiary': '#1a1f2e',
    '--vf-bg-hover': '#0f1419',
    '--vf-bg-selected': '#1a1f2e',
    '--vf-bg-disabled': '#0f1419',
    '--vf-text-primary': '#e0f2fe',
    '--vf-text-secondary': '#bae6fd',
    '--vf-text-tertiary': '#7dd3fc',
    '--vf-text-disabled': '#6b7280',
    '--vf-text-inverse': '#0a0e13',
    '--vf-border-primary': '#1a1f2e',
    '--vf-border-secondary': '#2a3441',
    '--vf-border-focus': '#7dd3fc',
    '--vf-border-error': '#f87171',
    '--vf-accent-primary': '#7dd3fc',
    '--vf-accent-secondary': '#bae6fd',
    '--vf-accent-success': '#86efac',
    '--vf-accent-warning': '#fde047',
    '--vf-accent-error': '#fca5a5',
    '--vf-interactive-hover': '#1a1f2e',
    '--vf-interactive-active': '#7dd3fc',
    '--vf-interactive-focus': '#0f1419',
    '--vf-shadow-sm': 'rgba(125, 211, 252, 0.08)',
    '--vf-shadow-md': 'rgba(125, 211, 252, 0.12)',
    '--vf-shadow-lg': 'rgba(125, 211, 252, 0.16)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.6)',
    '--vf-overlay-bg': 'rgba(0, 0, 0, 0.6)',
    '--vf-overlay-border': 'rgba(125, 211, 252, 0.3)',
    '--vf-overlay-text': '#bae6fd',
    '--vf-selection-bg': '#0f1419',
    '--vf-selection-border': '#7dd3fc'
  },
  ocean: {
    '--vf-bg-primary': '#263238',
    '--vf-bg-secondary': '#37474f',
    '--vf-bg-tertiary': '#455a64',
    '--vf-bg-hover': '#37474f',
    '--vf-bg-selected': '#455a64',
    '--vf-bg-disabled': '#37474f',
    '--vf-text-primary': '#eceff1',
    '--vf-text-secondary': '#b0bec5',
    '--vf-text-tertiary': '#90a4ae',
    '--vf-text-disabled': '#78909c',
    '--vf-text-inverse': '#263238',
    '--vf-border-primary': '#455a64',
    '--vf-border-secondary': '#546e7a',
    '--vf-border-focus': '#00bcd4',
    '--vf-border-error': '#ef4444',
    '--vf-accent-primary': '#00bcd4',
    '--vf-accent-secondary': '#26c6da',
    '--vf-accent-success': '#4caf50',
    '--vf-accent-warning': '#ff9800',
    '--vf-accent-error': '#f44336',
    '--vf-interactive-hover': '#455a64',
    '--vf-interactive-active': '#00bcd4',
    '--vf-interactive-focus': '#455a64',
    '--vf-shadow-sm': 'rgba(0, 188, 212, 0.1)',
    '--vf-shadow-md': 'rgba(0, 188, 212, 0.15)',
    '--vf-shadow-lg': 'rgba(0, 188, 212, 0.2)',
    '--vf-shadow-modal': 'rgba(0, 188, 212, 0.15)',
    '--vf-overlay-bg': 'rgba(38, 50, 56, 0.8)',
    '--vf-overlay-border': 'rgba(0, 188, 212, 0.6)',
    '--vf-overlay-text': '#b0bec5',
    '--vf-selection-bg': '#263238',
    '--vf-selection-border': '#00bcd4'
  },
  palenight: {
    '--vf-bg-primary': '#292d3e',
    '--vf-bg-secondary': '#32374d',
    '--vf-bg-tertiary': '#3c4252',
    '--vf-bg-hover': '#32374d',
    '--vf-bg-selected': '#3c4252',
    '--vf-bg-disabled': '#32374d',
    '--vf-text-primary': '#eeffff',
    '--vf-text-secondary': '#b2ccd6',
    '--vf-text-tertiary': '#89ddff',
    '--vf-text-disabled': '#676e95',
    '--vf-text-inverse': '#292d3e',
    '--vf-border-primary': '#3c4252',
    '--vf-border-secondary': '#434758',
    '--vf-border-focus': '#c792ea',
    '--vf-border-error': '#f78c6c',
    '--vf-accent-primary': '#c792ea',
    '--vf-accent-secondary': '#89ddff',
    '--vf-accent-success': '#c3e88d',
    '--vf-accent-warning': '#ffcb6b',
    '--vf-accent-error': '#f78c6c',
    '--vf-interactive-hover': '#32374d',
    '--vf-interactive-active': '#3c4252',
    '--vf-interactive-focus': '#434758',
    '--vf-shadow-sm': 'rgba(199, 146, 234, 0.1)',
    '--vf-shadow-md': 'rgba(199, 146, 234, 0.15)',
    '--vf-shadow-lg': 'rgba(199, 146, 234, 0.2)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-bg': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-border': 'rgba(199, 146, 234, 0.6)',
    '--vf-overlay-text': '#b2ccd6',
    '--vf-selection-bg': '#32374d',
    '--vf-selection-border': '#c792ea'
  },
  arctic: {
    '--vf-bg-primary': '#f8fafc',
    '--vf-bg-secondary': '#e2e8f0',
    '--vf-bg-tertiary': '#cbd5e1',
    '--vf-bg-hover': '#e2e8f0',
    '--vf-bg-selected': '#cbd5e1',
    '--vf-bg-disabled': '#e2e8f0',
    '--vf-text-primary': '#1e293b',
    '--vf-text-secondary': '#475569',
    '--vf-text-tertiary': '#64748b',
    '--vf-text-disabled': '#94a3b8',
    '--vf-text-inverse': '#f8fafc',
    '--vf-border-primary': '#cbd5e1',
    '--vf-border-secondary': '#94a3b8',
    '--vf-border-focus': '#0ea5e9',
    '--vf-border-error': '#ef4444',
    '--vf-accent-primary': '#0ea5e9',
    '--vf-accent-secondary': '#06b6d4',
    '--vf-accent-success': '#10b981',
    '--vf-accent-warning': '#f59e0b',
    '--vf-accent-error': '#ef4444',
    '--vf-interactive-hover': '#e2e8f0',
    '--vf-interactive-active': '#cbd5e1',
    '--vf-interactive-focus': '#f0f9ff',
    '--vf-shadow-sm': 'rgba(14, 165, 233, 0.05)',
    '--vf-shadow-md': 'rgba(14, 165, 233, 0.1)',
    '--vf-shadow-lg': 'rgba(14, 165, 233, 0.15)',
    '--vf-shadow-modal': 'rgba(14, 165, 233, 0.1)',
    '--vf-overlay-bg': 'rgba(30, 41, 59, 0.3)',
    '--vf-overlay-border': 'rgba(71, 85, 105, 0.8)',
    '--vf-overlay-text': '#64748b',
    '--vf-selection-bg': '#e2e8f0',
    '--vf-selection-border': '#0ea5e9'
  },
  code: {
    '--vf-bg-primary': '#1e1e1e',
    '--vf-bg-secondary': '#252526',
    '--vf-bg-tertiary': '#2d2d30',
    '--vf-bg-hover': '#2d2d30',
    '--vf-bg-selected': '#37373d',
    '--vf-bg-disabled': '#2d2d30',
    '--vf-text-primary': '#cccccc',
    '--vf-text-secondary': '#9cdcfe',
    '--vf-text-tertiary': '#808080',
    '--vf-text-disabled': '#6a6a6a',
    '--vf-text-inverse': '#1e1e1e',
    '--vf-border-primary': '#3c3c3c',
    '--vf-border-secondary': '#464647',
    '--vf-border-focus': '#007acc',
    '--vf-border-error': '#f44747',
    '--vf-accent-primary': '#007acc',
    '--vf-accent-secondary': '#4fc1ff',
    '--vf-accent-success': '#4ec9b0',
    '--vf-accent-warning': '#dcdcaa',
    '--vf-accent-error': '#f44747',
    '--vf-interactive-hover': '#2d2d30',
    '--vf-interactive-active': '#37373d',
    '--vf-interactive-focus': '#094771',
    '--vf-shadow-sm': 'rgba(0, 0, 0, 0.3)',
    '--vf-shadow-md': 'rgba(0, 0, 0, 0.4)',
    '--vf-shadow-lg': 'rgba(0, 0, 0, 0.5)',
    '--vf-shadow-modal': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-bg': 'rgba(0, 0, 0, 0.4)',
    '--vf-overlay-border': 'rgba(60, 60, 60, 0.8)',
    '--vf-overlay-text': '#808080',
    '--vf-selection-bg': '#37373d',
    '--vf-selection-border': '#007acc'
  }
}

// Apply custom theme to VueFinder
const applyCustomTheme = () => {
  // Try to use the ref first
  let targetVuefinder: HTMLElement | null = null
  
  if (themeBuilderVueFinder.value) {
    // Get the root element from the VueFinder component ref
    const vueFinderComponent = themeBuilderVueFinder.value as { $el?: HTMLElement }
    targetVuefinder = vueFinderComponent.$el?.querySelector('.vuefinder') || vueFinderComponent.$el
  }
  
  // Fallback: find by container
  if (!targetVuefinder) {
    const themeBuilderContainer = document.querySelector('.theme-builder-container')
    if (themeBuilderContainer) {
      targetVuefinder = themeBuilderContainer.querySelector('.vuefinder') as HTMLElement
    }
  }
  
  // Final fallback: use the last VueFinder element
  if (!targetVuefinder) {
    const vuefinderElements = document.querySelectorAll('.vuefinder')
    if (vuefinderElements.length > 0) {
      targetVuefinder = vuefinderElements[vuefinderElements.length - 1] as HTMLElement
    }
  }
  
  if (targetVuefinder) {
    // Apply all CSS variables directly to the VueFinder root element
    Object.entries(customTheme.value).forEach(([property, value]) => {
      targetVuefinder!.style.setProperty(property, value)
    })
  }
}

// Enhanced theme application with MutationObserver
const applyCustomThemeWithObserver = () => {
  // Try to apply theme immediately
  applyCustomTheme()
  
  // If no VueFinder found, set up observer
  const themeBuilderContainer = document.querySelector('.theme-builder-container')
  if (!themeBuilderContainer) {
    return
  }
  
  // Use MutationObserver to watch for VueFinder to be added
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const vuefinderRoot = themeBuilderContainer.querySelector('.vuefinder') as HTMLElement
        if (vuefinderRoot) {
          applyCustomTheme()
          observer.disconnect() // Stop observing once we find it
        }
      }
    })
  })
  
  observer.observe(themeBuilderContainer, {
    childList: true,
    subtree: true
  })
  
  // Fallback timeout
  setTimeout(() => {
    observer.disconnect()
    applyCustomTheme()
  }, 2000)
}

// Load preset theme
const loadPresetTheme = (presetName: string) => {
  if (themePresets[presetName]) {
    customTheme.value = { ...themePresets[presetName] }
    // The watcher will automatically apply the theme
  }
}

// Export theme as CSS
const exportTheme = () => {
  const css = Object.entries(customTheme.value)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n')
  
  const fullCSS = `.vuefinder[data-theme="custom"] {\n${css}\n}`
  
  const blob = new Blob([fullCSS], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'custom-theme.css'
  a.click()
  URL.revokeObjectURL(url)
}

// Import theme from file
const importTheme = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const css = e.target?.result as string
        const matches = css.matchAll(/--vf-[^:]+:\s*([^;]+);/g)
        const importedTheme: Record<string, string> = {}
        
        for (const match of matches) {
          const property = match[0].split(':')[0].trim()
          const value = match[1].trim()
          importedTheme[property] = value
        }
        
        customTheme.value = { ...customTheme.value, ...importedTheme }
        applyCustomTheme()
      } catch {
        alert('Error importing theme file')
      }
    }
    reader.readAsText(file)
  }
}

// Watch for changes in custom theme and apply them
watch(customTheme, () => {
  applyCustomThemeWithObserver()
}, { deep: true })

// Watch for example changes to apply theme when switching to theme builder
watch(example, (newExample) => {
  if (newExample === 'themeBuilder') {
    setTimeout(() => {
      applyCustomThemeWithObserver()
    }, 500)
  }
})

// Check if we're in a popup window
const isPopup = computed(() => {
  return new URLSearchParams(window.location.search).get('popup') === 'true';
})

/** @type {import('../src/utils/ajax.js').RequestConfig} */

const request = {
  // ----- CHANGE ME! -----
  // [REQUIRED] Url for development server endpoint
  baseUrl: "http://inertia-vuefinder.test/vuefinder",
  // ----- CHANGE ME! -----

  // Additional headers & params & body
  headers: { "X-ADDITIONAL-HEADER": 'yes' },
  params: { additionalParam1: 'yes' },
  body: { additionalBody1: ['yes'] },

  // And/or transform request callback
  transformRequest: req => {
    if (req.method === 'get') {
      req.params.vf = "1"
    }
    return req;
  },

  // XSRF Token header name
  xsrfHeaderName: "CSRF-TOKEN",
}
const maxFileSize = ref("500MB")

const features = [
  ...FEATURE_ALL_NAMES,
  // Or remove the line above, specify the features want to include
  // Like...
  //FEATURES.LANGUAGE,
]

const selectedFiles = ref<{path: string, name?: string}[]>([]);
const filesFromPopup = ref<{path: string, name?: string}[]>([]);

// an example how to show selected files, outside of vuefinder
// you can create a ref object and assign the items to it,
// then with a button click, you can get the selected items easily
const handleSelect = (selection) => {
  selectedFiles.value = selection
}

const handlePopupSelect = (selection) => {
  filesFromPopup.value = selection
}

// Send selected items to parent from popup (normalizes payload)
const sendSelectedToParent = (payload) => {
  try {
    const toPlain = (it) => {
      const path = typeof it?.path === 'string' ? it.path : undefined
      const name = it?.name ?? it?.basename ?? it?.filename ?? (typeof path === 'string' ? path.split('/').pop() : undefined)
      return { path, name }
    }
    const filesRaw = Array.isArray(payload) ? payload.map(toPlain) : []
    // Strip proxies/reactivity to avoid DataCloneError
    const files = JSON.parse(JSON.stringify(filesRaw))
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'filesSelected', files }, '*')
    }
  } catch {
    // ignore
  }
  // Close the popup right after sending the selection
  try { window.close() } catch {
    // ignore
  }
}

const handleButton = () => {
  console.log(selectedFiles.value)
}

const handlePathChange = (path) => {
  console.log('handlePathChange called with path:', path);
}

// Events Demo - Event handlers and state
const eventLog = ref<Array<{type: string, message: string, timestamp: string, count?: number}>>([]);
const selectedFilesEvents = ref<{path: string, name?: string}[]>([]);
const currentPathEvents = ref<string>('');
const uploadedFilesEvents = ref<{path: string, name?: string}[]>([]);
const deletedFilesEvents = ref<{path: string, name?: string}[]>([]);
const isReadyEvents = ref<boolean>(false);

const addEventLog = (type: string, message: string, count?: number) => {
  eventLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
    count
  });
  // Keep only last 20 events
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20);
  }
};

// Event handlers for the events demo
const onSelectEvents = (items: {path: string, basename: string, type: string}[]) => {
  selectedFilesEvents.value = items;
  addEventLog('select', `Selected ${items.length} item(s): ${items.map(item => item.basename).join(', ')}`, items.length);
};

const onPathChangeEvents = (path: string) => {
  currentPathEvents.value = path;
  addEventLog('path-change', `Path changed to: ${path}`);
};

const onUploadCompleteEvents = (files: {path: string, basename: string, type: string}[]) => {
  uploadedFilesEvents.value = files;
  addEventLog('upload-complete', `Uploaded ${files.length} file(s): ${files.map(file => file.basename).join(', ')}`, files.length);
};

const onDeleteCompleteEvents = (deletedItems: {path: string, basename: string, type: string}[]) => {
  deletedFilesEvents.value = deletedItems;
  addEventLog('delete-complete', `Deleted ${deletedItems.length} item(s): ${deletedItems.map(item => item.basename).join(', ')}`, deletedItems.length);
};

const onErrorEvents = (error: {message?: string} | string | null) => {
  const errorMessage = typeof error === 'object' && error?.message ? error.message : 
                      typeof error === 'string' ? error : 'Unknown error occurred';
  addEventLog('error', `Error: ${errorMessage}`);
};

const onReadyEvents = () => {
  isReadyEvents.value = true;
  addEventLog('ready', 'VueFinder is ready and initialized');
};

const onFileDclickEvents = (item) => {
  addEventLog('file-dclick', `Double-clicked file: ${item.basename}`, 1);
  console.log('File double-clicked:', item);
};

const onFolderDclickEvents = (item) => {
  addEventLog('folder-dclick', `Double-clicked folder: ${item.basename}`, 1);
  console.log('Folder double-clicked:', item);
};

// Custom double-click demo
const customDclickLog = ref<Array<{type: string, message: string, timestamp: string}>>([]);

// Single selection demo
const singleSelectionFiles = ref<Array<{basename: string, path: string}>>([]);

const addCustomDclickLog = (type: string, message: string) => {
  customDclickLog.value.unshift({
    type,
    message,
    timestamp: new Date().toLocaleTimeString()
  });
};

const onCustomFileDclick = (item) => {
  addCustomDclickLog('file-dclick', `Custom file double-click: ${item.basename}`);
  alert(`Custom File Double-Click!\n\nFile: ${item.basename}\nPath: ${item.path}\nSize: ${item.file_size ? (item.file_size / 1024).toFixed(2) + ' KB' : 'Unknown'}\nType: ${item.mime_type || 'Unknown'}`);
};

const onCustomFolderDclick = (item) => {
  addCustomDclickLog('folder-dclick', `Custom folder double-click: ${item.basename}`);
  alert(`Custom Folder Double-Click!\n\nFolder: ${item.basename}\nPath: ${item.path}\nStorage: ${item.storage}`);
};

const clearCustomDclickLog = () => {
  customDclickLog.value = [];
};

const clearEventLog = () => {
  eventLog.value = [];
};

// Single selection handler
const handleSingleSelection = (files) => {
  singleSelectionFiles.value = files;
  console.log('Single selection changed:', files);
};

// Selection filter demo
const selectionFilterType = ref<'files' | 'dirs' | 'both'>('both');
const selectionFilterMimeIncludes = ref<string[]>([]);
const selectionFilteredFiles = ref<{path: string, name?: string}[]>([]);

const handleSelectionFilter = (selection) => {
  selectionFilteredFiles.value = selection;
  console.log('Selection filter changed:', selection);
};

const clearMimeFilter = () => {
  selectionFilterMimeIncludes.value = [];
};

const addMimeFilter = (mimeType: string) => {
  if (!selectionFilterMimeIncludes.value.includes(mimeType)) {
    selectionFilterMimeIncludes.value.push(mimeType);
  }
};

const removeMimeFilter = (mimeType: string) => {
  const index = selectionFilterMimeIncludes.value.indexOf(mimeType);
  if (index > -1) {
    selectionFilterMimeIncludes.value.splice(index, 1);
  }
};

// Listen messages from popup
const handleMessage = (event) => {
  if (event.data && event.data.type === 'filesSelected') {
    filesFromPopup.value = event.data.files;
    console.log('Selection completed:', Array.isArray(event.data.files) ? event.data.files.length : 0)
    if (event.source && 'postMessage' in event.source) {
        (event.source as Window).postMessage({ type: 'filesReceived' }, '*');
    }
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
  if (isPopup.value && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'popupReady' }, '*');
  }
  
  // Initialize custom theme for theme builder
  if (example.value === 'themeBuilder') {
    // Wait for VueFinder to be mounted and rendered
    setTimeout(() => {
      applyCustomThemeWithObserver()
    }, 500)
  }
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
})

const customContextMenuItems = [
  ...contextMenuItems,
  {
    id: 'loginfo',
    title: () => 'Log Info',
    action: (app, selectedItems) => {
    const info = selectedItems.map((i) => `Name: ${i.basename}, Type: ${i.type}, Path: ${i.path}`)
    console.log(selectedItems.length + " item(s) selected:\n", info.join('\n'))
    console.log(selectedItems)
    },
    show: () => true,
  }
]

// Function to open VueFinder in a popup window
const openPopupWindow = () => {
  // Build popup url robustly (preserve existing query params)
  const url = new URL(window.location.href);
  url.searchParams.set('popup', 'true');
  window.open(url.toString(), 'vuefinder-popup', 'width=900,height=600,scrollbars=yes,resizable=yes');
}

</script>


<template>
  <div class="wrapper">
    
    <!-- Show example selector only if not in popup -->
    <div v-if="!isPopup">
      <label for="example">
        Example
      </label>
      <div>
        <select id="example" v-model="example">
          <option v-for="(name, key) in examples" :value="key" :key="key">{{ name }}</option>
        </select>
      </div>

      <div style="font-weight: bold;padding: 10px">{{ examples[example] }}</div>
      
      <!-- Theme Selector -->
      <div style="margin-top: 1rem; margin-bottom: 1rem;">
        <label for="theme">
          Theme
        </label>
        <div>
          <select id="theme" v-model="currentTheme">
            <option v-for="theme in themes" :key="theme.value" :value="theme.value">{{ theme.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Popup mode: Show only VueFinder -->
    <div v-if="isPopup" class="popup-container">
      <vue-finder
        id='popup-vuefinder'
        :request="request"
        style="height: 100%; width: 100%;"
        :config="{
            maxFileSize: maxFileSize,
        }"
        :features="features"
        :theme="currentTheme"
        @path-change="handlePathChange"
        @select="handlePopupSelect"
      >
        <template #status-bar="{ selected, count }">
          <div class="vuefinder__status-bar__actions">
            <button
              class="border bg-emerald-800 text-white border-gray-300 dark:border-gray-600 rounded-sm px-2 p-0.5 disabled:opacity-50 not-disabled:hover:bg-emerald-700 not-disabled:cursor-pointer"
              @click="sendSelectedToParent(selected)"
              :disabled="!count"
            >
              Select  ({{ count ?? 0 }} selected)
            </button>
          </div>
        </template>
      </vue-finder>
       
    </div>

    <!-- Regular examples (only show if not in popup) -->
    <div v-if="!isPopup">
      <vue-finder
        v-if="example === 'default'"
        id='my_vuefinder'
        :request="request"
        :config="{
            maxFileSize: maxFileSize, 
        }"
        :features="features"
        :theme="currentTheme"
        @path-change="handlePathChange"
      >
      
        <template #status-bar="{ selected, path, count }">
          <div class="vuefinder__status-bar__actions">
            <button
                class="border border-gray-300 dark:border-gray-600 rounded-xs p-0.5 disabled:opacity-50 not-disabled:hover:text-sky-400 not-disabled:cursor-pointer"
                @click="() => {
                       console.log(selected);
                       console.log(path);
                       console.log(count);
                  }"
                :disabled="!count"
            >
              Show Selected  ({{ count ?? 0 }} selected)
            </button>
          </div>
        </template>

      </vue-finder>

      <div v-if="example === 'externalSelect'">
        <vue-finder
          id='my_vuefinder2'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
            loadingIndicator: 'linear'
          }"
          :features="features"
          :theme="currentTheme"
          @select="handleSelect"
        />

        <button class="btn" @click="handleButton" :disabled="!selectedFiles.length">Show Selected  ({{ selectedFiles.length ?? 0 }} selected)</button>
        <div v-show="selectedFiles.length">

          <h3>Selected Files ({{ selectedFiles.length }} selected)</h3>
          <ul>
            <li v-for="file in selectedFiles" :key="file.path">
              {{ file.path }}
            </li>
          </ul>
        </div>
      </div>

      <vue-finder
        v-if="example === 'contextmenu'"
        id='my_vuefinder3'
        :request="request"
        :config="{
          maxFileSize: maxFileSize,
        }"
        :features="features"
        :theme="currentTheme"
        :context-menu-items="customContextMenuItems"
      />

      <vue-finder
        v-if="example === 'customIcons'"
        id='my_vuefinder4'
        :request="request"
        :config="{
          maxFileSize: maxFileSize
        }"
        :features="features"
        :theme="currentTheme"
      >
        <template #icon="{ item }">
            <TextIcon class="vuefinder__item-icon__file" v-if="item.extension === 'txt'" />
            <PDFIcon class="vuefinder__item-icon__file" v-else-if="item.extension === 'pdf'" />
        </template>
      </vue-finder>

      <div v-if="example === 'windowExamples'">
        
        <div style="margin: 20px 0;">
          <button 
            class="btn" 
            @click="openPopupWindow"
          >
            Open VueFinder in Popup Window
          </button>
        </div>

        <!-- Display selected files -->
        <div v-if="filesFromPopup.length" style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
          <h3>Selected Files from Popup ({{ filesFromPopup.length }} files):</h3>
          <ul>
            <li v-for="file in filesFromPopup" :key="file.path" style="margin: 5px 0;">
              <strong>{{ file.name }}</strong> - {{ file.path }}
            </li>
          </ul>
        </div>
  
      </div>

      <!-- Events Demo -->
      <div v-if="example === 'eventsDemo'">
        <div style="margin: 20px 0;">
          <h2>VueFinder Events Demo</h2>
          <p>This example demonstrates all VueFinder events. Interact with the file manager below to see events in action.</p>
          
          <!-- Status indicators -->
          <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
            <div style="padding: 10px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
              <strong>Ready:</strong> {{ isReadyEvents ? '✅ Yes' : '❌ No' }}
            </div>
            <div style="padding: 10px; background: #e3f2fd; border-radius: 5px; border-left: 4px solid #2196f3;">
              <strong>Current Path:</strong> {{ currentPathEvents || 'None' }}
            </div>
            <div style="padding: 10px; background: #fff3e0; border-radius: 5px; border-left: 4px solid #ff9800;">
              <strong>Selected:</strong> {{ selectedFilesEvents.length }} item(s)
            </div>
            <div style="padding: 10px; background: #f3e5f5; border-radius: 5px; border-left: 4px solid #9c27b0;">
              <strong>Uploaded:</strong> {{ uploadedFilesEvents.length }} file(s)
            </div>
            <div style="padding: 10px; background: #ffebee; border-radius: 5px; border-left: 4px solid #f44336;">
              <strong>Deleted:</strong> {{ deletedFilesEvents.length }} item(s)
            </div>
          </div>

          <!-- Event log -->
          <div style="margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h3>Event Log ({{ eventLog.length }} events)</h3>
              <button class="btn" @click="clearEventLog" :disabled="!eventLog.length">
                Clear Log
              </button>
            </div>
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <div v-if="!eventLog.length" style="text-align: center; color: #666; padding: 20px;">
                No events yet. Interact with the file manager to see events here.
              </div>
              <div v-for="(event, index) in eventLog" :key="index" 
                   :style="{
                     marginBottom: '8px',
                     padding: '8px',
                     borderRadius: '4px',
                     backgroundColor: 'white',
                     borderLeft: `4px solid ${
                       event.type === 'select' ? '#4caf50' :
                       event.type === 'path-change' ? '#2196f3' :
                       event.type === 'upload-complete' ? '#9c27b0' :
                       event.type === 'delete-complete' ? '#f44336' :
                       event.type === 'error' ? '#ff5722' :
                       event.type === 'ready' ? '#4caf50' : '#666'
                     }`
                   }">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong :style="{ color: event.type === 'error' ? '#f44336' : '#333' }">
                      {{ event.type.toUpperCase() }}
                    </strong>
                    <span v-if="event.count !== undefined" style="margin-left: 8px; padding: 2px 6px; background: #e0e0e0; border-radius: 10px; font-size: 0.8em;">
                      {{ event.count }}
                    </span>
                  </div>
                  <small style="color: #666;">{{ event.timestamp }}</small>
                </div>
                <div style="margin-top: 4px; font-size: 0.9em; color: #555;">
                  {{ event.message }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VueFinder with all events -->
        <vue-finder
          id='events-demo-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          @select="onSelectEvents"
          @path-change="onPathChangeEvents"
          @upload-complete="onUploadCompleteEvents"
          @delete-complete="onDeleteCompleteEvents"
          @error="onErrorEvents"
          @ready="onReadyEvents"
          @file-dclick="onFileDclickEvents"
          @folder-dclick="onFolderDclickEvents"
        />
      </div>

      <!-- Custom Double-Click Demo -->
      <div v-if="example === 'customDclick'">
        <div style="margin: 20px 0;">
          <h2>Custom Double-Click Events Demo</h2>
          <p>This example demonstrates custom double-click behavior. When you double-click files or folders, custom events will be triggered instead of the default actions.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
            <h3>Custom Behavior:</h3>
            <ul>
              <li><strong>File double-click:</strong> Shows an alert with file information instead of opening preview</li>
              <li><strong>Folder double-click:</strong> Shows an alert with folder information instead of navigating</li>
            </ul>
          </div>

          <!-- Custom event handlers -->
          <div style="margin: 20px 0;">
            <h3>Event Log:</h3>
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: #f9f9f9;">
              <div v-for="(log, index) in customDclickLog" :key="index" style="margin: 5px 0; padding: 5px; background: white; border-radius: 3px;">
                <strong>{{ log.type }}:</strong> {{ log.message }}
                <small style="color: #666; margin-left: 10px;">{{ log.timestamp }}</small>
              </div>
              <div v-if="!customDclickLog.length" style="color: #666; font-style: italic;">
                No events yet. Try double-clicking files or folders above.
              </div>
            </div>
            <button class="btn" @click="clearCustomDclickLog" :disabled="!customDclickLog.length" style="margin-top: 10px;">
              Clear Log
            </button>
          </div>
        </div>

        <!-- VueFinder with custom double-click events -->
        <vue-finder
          id='custom-dclick-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          @file-dclick="onCustomFileDclick"
          @folder-dclick="onCustomFolderDclick"
        />
      </div>

      <!-- Single Selection Mode Demo -->
      <div v-if="example === 'singleSelection'">
        <div style="margin: 20px 0;">
          <h2>Single Selection Mode Demo</h2>
          <p>This example demonstrates the single selection mode. In this mode, only one file or folder can be selected at a time.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #e8f4fd; border-radius: 5px; border-left: 4px solid #2196f3;">
            <h3>Single Selection Features:</h3>
            <ul>
              <li><strong>Single selection:</strong> Only one item can be selected at a time</li>
              <li><strong>Click behavior:</strong> Clicking a new item deselects the previous one</li>
              <li><strong>Ctrl/Cmd+A:</strong> Selects only the first item instead of all items</li>
              <li><strong>Drag selection:</strong> Mouse drag selection is disabled in single mode</li>
              <li><strong>Context menu:</strong> "Select All" option is hidden in single mode</li>
              <li><strong>Menu bar:</strong> "Select All" and "Deselect All" options are hidden in single mode</li>
            </ul>
          </div>

          <!-- Selection info -->
          <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <h3>Current Selection:</h3>
            <div v-if="singleSelectionFiles.length" style="padding: 10px; background: white; border-radius: 3px; margin-top: 10px;">
              <strong>Selected:</strong> {{ singleSelectionFiles[0]?.basename }} 
              <small style="color: #666; margin-left: 10px;">({{ singleSelectionFiles[0]?.path }})</small>
            </div>
            <div v-else style="color: #666; font-style: italic;">
              No file selected
            </div>
          </div>
        </div>

        <!-- VueFinder with single selection mode -->
        <vue-finder
          id='single-selection-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          selection-mode="single"
          @select="handleSingleSelection"
        />
      </div>

      <!-- Selection Filter Demo -->
      <div v-if="example === 'selectionFilter'">
        <div style="margin: 20px 0;">
          <h2>Selection Filter Demo</h2>
          <p>This example demonstrates selection filtering by file type and MIME type. Unselectable items appear dimmed and cannot be selected.</p>
          
          <!-- Filter controls -->
          <div style="margin: 20px 0; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
            <h3>Filter Controls:</h3>
            
            <!-- Type filter -->
            <div style="margin: 10px 0;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">Filter by Type:</label>
              <select v-model="selectionFilterType" style="padding: 5px; border: 1px solid #ccc; border-radius: 3px;">
                <option value="both">Both Files & Directories</option>
                <option value="files">Files Only</option>
                <option value="dirs">Directories Only</option>
              </select>
            </div>

            <!-- MIME type filter -->
            <div style="margin: 10px 0;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">Filter by MIME Type:</label>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                <button 
                  class="btn" 
                  @click="addMimeFilter('image/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Images
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('text/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Text Files
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('application/pdf')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + PDFs
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('video/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Videos
                </button>
                <button 
                  class="btn" 
                  @click="addMimeFilter('audio/')"
                  style="padding: 5px 10px; font-size: 12px; margin: 0;"
                >
                  + Audio
                </button>
                <button 
                  class="btn" 
                  @click="clearMimeFilter()"
                  style="padding: 5px 10px; font-size: 12px; margin: 0; background: #f44336; color: white;"
                >
                  Clear All
                </button>
              </div>
              
              <!-- Active filters -->
              <div v-if="selectionFilterMimeIncludes.length" style="margin-top: 10px;">
                <strong>Active MIME Filters:</strong>
                <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px;">
                  <span 
                    v-for="mime in selectionFilterMimeIncludes" 
                    :key="mime"
                    style="background: #2196f3; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; display: flex; align-items: center; gap: 5px;"
                  >
                    {{ mime }}
                    <button 
                      @click="removeMimeFilter(mime)"
                      style="background: none; border: none; color: white; cursor: pointer; font-weight: bold;"
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>



        <!-- VueFinder with selection filters -->
        <vue-finder
          id='selection-filter-vuefinder'
          :request="request"
          :config="{
            maxFileSize: maxFileSize,
          }"
          :features="features"
          :theme="currentTheme"
          :selection-filter-type="selectionFilterType"
          :selection-filter-mime-includes="selectionFilterMimeIncludes"
          @select="handleSelectionFilter"
        />

          <!-- Selection info -->
          <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px;">
            <h3>Current Selection ({{ selectionFilteredFiles.length }} items):</h3>
            <div v-if="selectionFilteredFiles.length" style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
              <div v-for="file in selectionFilteredFiles" :key="file.path" style="padding: 5px; background: white; margin: 2px 0; border-radius: 3px;">
                <strong>{{ file.name || file.path.split('/').pop() }}</strong>
                <small style="color: #666; margin-left: 10px;">{{ file.path }}</small>
              </div>
            </div>
            <div v-else style="color: #666; font-style: italic;">
              No files selected
            </div>
          </div>

          <!-- Instructions -->
          <div style="margin: 20px 0; padding: 15px; background: #fff3e0; border-radius: 5px; border-left: 4px solid #ff9800;">
            <h3>How to Test:</h3>
            <ol>
              <li>Select "Files Only" to see only files selectable (directories will be dimmed)</li>
              <li>Select "Directories Only" to see only directories selectable (files will be dimmed)</li>
              <li>Add MIME type filters to restrict selection to specific file types</li>
              <li>Try selecting dimmed items - they should not be selectable</li>
              <li>Clear filters to make all items selectable again</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Theme Builder -->
      <div v-if="example === 'themeBuilder'" class="theme-builder-container">
        <div style="margin: 20px 0;">
          <h2>VueFinder Theme Builder</h2>
          <p>Customize VueFinder's appearance in real-time. Adjust colors on the left and see the changes instantly on the right.</p>
          
          <!-- Preset buttons and Theme Management in same row -->
          <div style="margin: 20px 0; display: flex; gap: 20px; flex-wrap: wrap;">
            <!-- Quick Presets -->
            <div style="flex: 1; min-width: 300px; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
              <h3>Quick Presets:</h3>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                <button 
                  class="btn" 
                  @click="loadPresetTheme('light')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #f0f0f0; color: #333;"
                >
                  Light
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('dark')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #333; color: white;"
                >
                  Dark
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('midnight')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #0f172a; color: #f1f5f9;"
                >
                  Midnight
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('latte')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #faf7f0; color: #4c2a1a;"
                >
                  Latte
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('rose')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #fce7f3; color: #831843;"
                >
                  Rose
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('mythril')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #f8fafc; color: #1e293b;"
                >
                  Mythril
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('lime')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #0f1419; color: #84cc16;"
                >
                  Lime
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('sky')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #0a0e13; color: #7dd3fc;"
                >
                  Sky
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('ocean')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #263238; color: #00bcd4;"
                >
                  Ocean
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('palenight')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #292d3e; color: #c792ea;"
                >
                  Palenight
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('arctic')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #f8fafc; color: #0ea5e9;"
                >
                  Arctic
                </button>
                <button 
                  class="btn" 
                  @click="loadPresetTheme('code')"
                  style="padding: 6px 12px; font-size: 12px; margin: 0; background: #1e1e1e; color: #007acc;"
                >
                  Code
                </button>
              </div>
            </div>

            <!-- Theme Management -->
            <div style="flex: 0 0 200px; padding: 15px; background: #e3f2fd; border-radius: 5px; border-left: 4px solid #2196f3;">
              <h3>Theme Management:</h3>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                <button 
                  class="btn" 
                  @click="exportTheme"
                  style="padding: 8px 12px; font-size: 12px; margin: 0; background: #4caf50; color: white;"
                >
                  Export CSS
                </button>
                <label 
                  class="btn" 
                  style="padding: 8px 12px; font-size: 12px; margin: 0; background: #ff9800; color: white; cursor: pointer;"
                >
                  Import CSS
                  <input 
                    type="file" 
                    accept=".css" 
                    @change="importTheme" 
                    style="display: none;"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Side-by-side layout -->
        <div class="theme-builder-layout">
          <!-- Left side - Color controls -->
          <div class="theme-controls">
            <h3>Color Controls</h3>
            
            <!-- Background Colors -->
            <div class="color-group">
              <h4>Background Colors</h4>
              <div class="color-control">
                <label>Primary Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-bg-primary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-bg-primary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Secondary Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-bg-secondary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-bg-secondary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Tertiary Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-bg-tertiary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-bg-tertiary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Hover Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-bg-hover']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-bg-hover']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Selected Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-bg-selected']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-bg-selected']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>

            <!-- Text Colors -->
            <div class="color-group">
              <h4>Text Colors</h4>
              <div class="color-control">
                <label>Primary Text</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-text-primary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-text-primary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Secondary Text</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-text-secondary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-text-secondary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Tertiary Text</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-text-tertiary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-text-tertiary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Disabled Text</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-text-disabled']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-text-disabled']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>

            <!-- Border Colors -->
            <div class="color-group">
              <h4>Border Colors</h4>
              <div class="color-control">
                <label>Primary Border</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-border-primary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-border-primary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Secondary Border</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-border-secondary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-border-secondary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Focus Border</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-border-focus']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-border-focus']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Error Border</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-border-error']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-border-error']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>

            <!-- Accent Colors -->
            <div class="color-group">
              <h4>Accent Colors</h4>
              <div class="color-control">
                <label>Primary Accent</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-accent-primary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-accent-primary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Secondary Accent</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-accent-secondary']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-accent-secondary']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Success Accent</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-accent-success']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-accent-success']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Warning Accent</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-accent-warning']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-accent-warning']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Error Accent</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-accent-error']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-accent-error']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>

            <!-- Interactive Colors -->
            <div class="color-group">
              <h4>Interactive Colors</h4>
              <div class="color-control">
                <label>Hover State</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-interactive-hover']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-interactive-hover']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Active State</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-interactive-active']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-interactive-active']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Focus State</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-interactive-focus']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-interactive-focus']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>

            <!-- Selection Colors -->
            <div class="color-group">
              <h4>Selection Colors</h4>
              <div class="color-control">
                <label>Selection Background</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-selection-bg']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-selection-bg']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
              <div class="color-control">
                <label>Selection Border</label>
                <input 
                  type="color" 
                  v-model="customTheme['--vf-selection-border']"
                  @input="applyCustomTheme"
                />
                <input 
                  type="text" 
                  v-model="customTheme['--vf-selection-border']"
                  @input="applyCustomTheme"
                  class="color-text-input"
                />
              </div>
            </div>
          </div>

          <!-- Right side - VueFinder preview -->
          <div class="theme-preview overflow-hidden">
            <h3>Live Preview</h3>
            <vue-finder
              ref="themeBuilderVueFinder"
              :request="request"
              :config="{
                maxFileSize: maxFileSize,
              }"
              :features="features"
              :theme="'light'"
              style="height: 600px; border: 1px solid #ddd; border-radius: 8px;"
            />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  max-width: 800px;
  margin: 80px auto;
}
.popup-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
}
.popup-container vue-finder {
  height: 100%;
  width: 100%;
}
.btn{
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.btn:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary:disabled {
  background: #ccc !important;
  color: white !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}

/* Theme Builder Styles */
.theme-builder-container {
  max-width: 1400px;
  margin: 0 auto;
}

.theme-builder-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.theme-controls {
  flex: 0 0 400px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  max-height: 80vh;
  overflow-y: auto;
}

.theme-preview {
  flex: 1;
  min-width: 0;
}

.color-group {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.color-group:last-child {
  border-bottom: none;
}

.color-group h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.color-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.color-control label {
  flex: 0 0 120px;
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.color-control input[type="color"] {
  width: 40px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.color-text-input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
}

.color-text-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.theme-controls h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.theme-preview h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 1200px) {
  .theme-builder-layout {
    flex-direction: column;
  }
  
  .theme-controls {
    flex: none;
    max-height: none;
  }
}
</style>
