import { computed } from 'vue';
import { useApp } from './useApp';
import type { FeatureName } from '../features';

/**
 * Features management composable
 *
 * @returns Reactive features object with enabled function for checking feature state
 */
export function useFeature() {
  const app = useApp();
  const features = computed(() => app.features);

  /**
   * Check if a feature is enabled
   *
   * @param featureName - The name of the feature to check
   * @returns true if the feature is enabled, false otherwise
   */
  const enabled = (featureName: FeatureName): boolean => {
    return features.value[featureName] ?? false;
  };

  return {
    enabled,
  };
}
