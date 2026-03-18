import { type Ref } from 'vue';
import { type ILazyLoadInstance } from 'vanilla-lazyload';
/**
 * Composable for managing lazy loading of images/thumbnails
 */
export declare function useLazyLoad(container: Ref<HTMLElement | null | undefined>, app?: {
    emitter: {
        on: (event: string, handler: () => void) => void;
    };
}): {
    vfLazyLoad: Ref<{
        update: (elements?: NodeListOf<HTMLElement>) => void;
        destroy: () => void;
        loadAll: () => void;
        restoreAll: () => void;
        loadingCount: number;
        toLoadCount: number;
    } | null, ILazyLoadInstance | {
        update: (elements?: NodeListOf<HTMLElement>) => void;
        destroy: () => void;
        loadAll: () => void;
        restoreAll: () => void;
        loadingCount: number;
        toLoadCount: number;
    } | null>;
};
