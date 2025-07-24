/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

import type { App } from './types'

declare module 'vue' {
    export function inject(key: 'ServiceContainer'): App | undefined
}