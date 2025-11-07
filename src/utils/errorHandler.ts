/**
 * Standard error handler utility
 * Extracts error message from various error formats and provides fallback
 */

/**
 * Extract error message from an error object
 * Handles Error instances, objects with message property, or plain strings
 */
export function getErrorMessage(error: unknown, fallback: string = 'An error occurred'): string {
  if (!error) {
    return fallback;
  }

  // If it's already a string, return it
  if (typeof error === 'string') {
    return error || fallback;
  }

  // If it's an Error instance, use its message
  if (error instanceof Error) {
    return error.message || fallback;
  }

  // If it's an object with a message property
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (typeof errorObj.message === 'string' && errorObj.message) {
      return errorObj.message;
    }
    // Check for other common error properties
    if (typeof errorObj.error === 'string' && errorObj.error) {
      return errorObj.error;
    }
  }

  return fallback;
}

/**
 * Handle and display error with toast notification
 * Extracts error message and shows it to the user
 */
export function handleError(
  error: unknown,
  fallbackMessage: string = 'An error occurred',
  showToast: (message: string) => void
): void {
  const message = getErrorMessage(error, fallbackMessage);
  showToast(message);
}

