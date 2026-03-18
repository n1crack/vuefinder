/**
 * Standard error handler utility
 * Extracts error message from various error formats and provides fallback
 */
/**
 * Extract error message from an error object
 * Handles Error instances, objects with message property, or plain strings
 */
export declare function getErrorMessage(error: unknown, fallback?: string): string;
/**
 * Handle and display error with toast notification
 * Extracts error message and shows it to the user
 */
export declare function handleError(error: unknown, fallbackMessage: string | undefined, showToast: (message: string) => void): void;
