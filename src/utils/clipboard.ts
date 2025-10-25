/**
 * Clipboard utility functions for copying text to clipboard
 */

/**
 * Copy text to clipboard with fallback for older browsers
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

/**
 * Copy file/folder path to clipboard
 * @param path - The path to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyPath(path: string): Promise<void> {
  await copyToClipboard(path);
}

/**
 * Copy download URL to clipboard
 * @param url - The download URL to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyDownloadUrl(url: string): Promise<void> {
  await copyToClipboard(url);
}
