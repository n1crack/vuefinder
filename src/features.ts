export type FeatureName =
  | 'edit'
  | 'newfile'
  | 'newfolder'
  | 'preview'
  | 'archive'
  | 'unarchive'
  | 'search'
  | 'rename'
  | 'upload'
  | 'delete'
  | 'fullscreen'
  | 'download'
  | 'language'
  | 'move'
  | 'copy'
  | 'history'
  | 'theme'
  | 'pinned';

export type FeaturesConfig = Partial<Record<FeatureName, boolean>>;

export type FeaturesPreset = 'simple' | 'advanced';

const ALL_FEATURES: FeatureName[] = [
  'edit',
  'newfile',
  'newfolder',
  'preview',
  'archive',
  'unarchive',
  'search',
  'rename',
  'upload',
  'delete',
  'fullscreen',
  'download',
  'language',
  'move',
  'copy',
  'history',
  'theme',
  'pinned',
];

export const FEATURE_PRESETS: Record<FeaturesPreset, FeaturesConfig> = {
  simple: {
    search: true,
    preview: true,
    rename: true,
    upload: true,
    delete: true,
    newfile: true,
    newfolder: true,
    download: true,
  },
  advanced: ALL_FEATURES.reduce((acc, feature) => {
    acc[feature] = true;
    return acc;
  }, {} as FeaturesConfig),
};

export function getDefaultFeatures(): FeaturesConfig {
  return FEATURE_PRESETS.advanced;
}

export function normalizeFeatures(
  features?: FeaturesPreset | FeaturesConfig
): FeaturesConfig {
  if (!features) {
    return getDefaultFeatures();
  }

  if (features === 'simple' || features === 'advanced') {
    return { ...FEATURE_PRESETS[features] };
  }

  // Partial config object - merge with defaults (all enabled)
  const defaultFeatures = getDefaultFeatures();
  return { ...defaultFeatures, ...features };
}
