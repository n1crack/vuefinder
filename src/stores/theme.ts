export type Theme = 'default' | 'light' | 'dark' | 'midnight' | 'latte' | 'rose' | 'mythril' | 'lime' | 'sky' | 'ocean' | 'palenight' | 'arctic' | 'code' | string

export interface ThemeConfig {
    name: Theme
    displayName: string
}

export const themes: ThemeConfig[] = [
    { name: 'default', displayName: 'Default'},
    { name: 'light', displayName: 'Light'},
    { name: 'dark', displayName: 'Dark'},
    { name: 'midnight', displayName: 'Midnight'},
    { name: 'latte', displayName: 'Latte'},
    { name: 'rose', displayName: 'Rose'},
    { name: 'mythril', displayName: 'Mythril'},
    { name: 'lime', displayName: 'lime'},
    { name: 'sky', displayName: 'Sky'},
    { name: 'ocean', displayName: 'Oceanic'},
    { name: 'palenight', displayName: 'Palenight'},
    { name: 'arctic', displayName: 'Arctic'},
    { name: 'code', displayName: 'Code'},
]
