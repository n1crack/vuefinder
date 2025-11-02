import { inject } from 'vue';
import type { App } from '../types';

// Module-level registry to store app instances by id
const appRegistry = new Map<string, App>();

// Symbol for provide/inject of VueFinder id
export const ServiceContainerIdKey = Symbol('ServiceContainerId');

/**
 * Register an app instance in the registry
 * @param id - The VueFinder instance id
 * @param app - The app instance to register
 */
export function registerApp(id: string, app: App): void {
  appRegistry.set(id, app);
}

/**
 * Unregister an app instance from the registry
 * @param id - The VueFinder instance id
 */
export function unregisterApp(id: string): void {
  appRegistry.delete(id);
}

/**
 * Get an app instance from the registry
 * @param id - The VueFinder instance id (optional, will auto-detect from context if not provided)
 * @returns The app instance
 * @throws Error if app not found
 */
export function useApp(id?: string): App {
  // If id is provided explicitly, use it
  // Otherwise, try to inject it from context
  const appId = id ?? inject<string>(ServiceContainerIdKey);

  if (!appId) {
    throw new Error(
      'No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree.'
    );
  }

  const app = appRegistry.get(appId);

  if (!app) {
    throw new Error(
      `VueFinder app instance with id "${appId}" was not found. Make sure the VueFinder component with id="${appId}" is mounted.`
    );
  }
  return app;
}
