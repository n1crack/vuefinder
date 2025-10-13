/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

import type { App } from './types'

declare module 'vue' {
    export function inject(key: 'ServiceContainer'): App | undefined
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// Minimal types for @nanostores/vue to enable useStore in TS
declare module '@nanostores/vue' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function useStore<T = any>(store: unknown): { value: T }
}
