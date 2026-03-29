import type { App } from '../types';
export declare const ServiceContainerIdKey: unique symbol;
/**
 * Register an app instance in the registry
 * @param id - The VueFinder instance id
 * @param app - The app instance to register
 */
export declare function registerApp(id: string, app: App): void;
/**
 * Unregister an app instance from the registry
 * @param id - The VueFinder instance id
 */
export declare function unregisterApp(id: string): void;
/**
 * Get an app instance from the registry
 * @param id - The VueFinder instance id (optional, will auto-detect from context if not provided)
 * @returns The app instance
 * @throws Error if app not found
 */
export declare function useApp(id?: string): App;
