export type Theme = 'silver' | 'valorite' | 'midnight' | 'latte' | 'rose' | 'mythril' | 'lime' | 'sky' | 'ocean' | 'palenight' | 'arctic' | 'code' | string;
export interface ThemeConfig {
    name: Theme;
    displayName: string;
}
export declare const themes: ThemeConfig[];
