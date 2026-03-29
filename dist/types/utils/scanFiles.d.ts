/**
 * Recursively scan dropped entries (files/folders)
 * Converts callback-based FileSystem API to Promise-based
 */
export declare const scanFiles: (resultCallback: (entry: any, file: File) => void, item: any) => Promise<void>;
