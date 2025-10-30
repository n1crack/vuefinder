import { inject } from 'vue';
import type { App } from '../types';

export const ServiceContainerKey = Symbol('ServiceContainer');

export function useApp(): App {
  const app = inject<App>(ServiceContainerKey);
  if (!app) {
    throw new Error('ServiceContainer was not provided');
  }
  return app;
}


