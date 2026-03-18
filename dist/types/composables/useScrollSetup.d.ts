import { type Ref } from 'vue';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
/**
 * Composable for setting up scroll container with OverlayScrollbars
 */
export declare function useScrollSetup(scrollContainer: Ref<HTMLElement | null | undefined>, handleScroll: (event: Event) => void): {
    osInstance: Ref<{
        options: {
            (): import("overlayscrollbars").Options;
            (newOptions: import("overlayscrollbars").PartialOptions, pure?: boolean): import("overlayscrollbars").Options;
        };
        on: {
            (eventListeners: import("overlayscrollbars").EventListeners, pure?: boolean): () => void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>): () => void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>[]): () => void;
        };
        off: {
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>): void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>[]): void;
        };
        update: (force?: boolean) => boolean;
        state: () => import("overlayscrollbars").State;
        elements: () => import("overlayscrollbars").Elements;
        destroy: () => void;
        plugin: <P extends import("overlayscrollbars").InstancePlugin>(osPlugin: P) => import("overlayscrollbars").InferInstancePluginModuleInstance<P> | undefined;
    } | null, OverlayScrollbars | {
        options: {
            (): import("overlayscrollbars").Options;
            (newOptions: import("overlayscrollbars").PartialOptions, pure?: boolean): import("overlayscrollbars").Options;
        };
        on: {
            (eventListeners: import("overlayscrollbars").EventListeners, pure?: boolean): () => void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>): () => void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>[]): () => void;
        };
        off: {
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>): void;
            <N extends keyof import("overlayscrollbars").EventListenerArgs>(name: N, listener: import("overlayscrollbars").EventListener<N>[]): void;
        };
        update: (force?: boolean) => boolean;
        state: () => import("overlayscrollbars").State;
        elements: () => import("overlayscrollbars").Elements;
        destroy: () => void;
        plugin: <P extends import("overlayscrollbars").InstancePlugin>(osPlugin: P) => import("overlayscrollbars").InferInstancePluginModuleInstance<P> | undefined;
    } | null>;
};
