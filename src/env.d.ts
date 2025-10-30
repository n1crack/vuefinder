/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

import type { App } from './types';

declare module 'vue' {
  export function inject(key: 'ServiceContainer'): App;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

// Minimal types for @nanostores/vue to enable useStore in TS
declare module '@nanostores/vue' {
  export function useStore<T = unknown>(store: unknown): T;
}
