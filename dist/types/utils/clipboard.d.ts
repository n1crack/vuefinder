/**
 * Clipboard utility functions for copying text to clipboard
 */
/**
 * Copy text to clipboard with fallback for older browsers
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves when copy is complete
 */
export declare function copyToClipboard(text: string): Promise<void>;
/**
 * Copy file/folder path to clipboard
 * @param path - The path to copy
 * @returns Promise that resolves when copy is complete
 */
export declare function copyPath(path: string): Promise<void>;
/**
 * Copy download URL to clipboard
 * @param url - The download URL to copy
 * @returns Promise that resolves when copy is complete
 */
export declare function copyDownloadUrl(url: string): Promise<void>;
