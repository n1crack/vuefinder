export type FeatureName = 'edit' | 'newfile' | 'newfolder' | 'preview' | 'archive' | 'unarchive' | 'search' | 'rename' | 'upload' | 'delete' | 'fullscreen' | 'download' | 'language' | 'move' | 'copy' | 'history' | 'theme' | 'pinned';
export type FeaturesConfig = Partial<Record<FeatureName, boolean>>;
export type FeaturesPreset = 'simple' | 'advanced';
export declare const FEATURE_PRESETS: Record<FeaturesPreset, FeaturesConfig>;
export declare function getDefaultFeatures(): FeaturesConfig;
export declare function normalizeFeatures(features?: FeaturesPreset | FeaturesConfig): FeaturesConfig;
