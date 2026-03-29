import type { FeatureName } from '../features';
/**
 * Features management composable
 *
 * @returns Reactive features object with enabled function for checking feature state
 */
export declare function useFeature(): {
    enabled: (featureName: FeatureName) => boolean;
};
