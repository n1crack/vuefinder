import type { DirEntry, App } from '../types';

/**
 * Composable for checking if an item is selectable based on filters
 */
export function useItemFilters(app: App) {
  /**
   * Check if an item is selectable based on type and MIME filters
   * @param item - The item to check
   * @returns Object with typeAllowed and mimeAllowed flags
   */
  const isItemSelectable = (
    item: DirEntry | undefined
  ): { typeAllowed: boolean; mimeAllowed: boolean } => {
    if (!item) {
      return { typeAllowed: false, mimeAllowed: false };
    }

    const filterType = app.selectionFilterType;
    const allowedMimes = app.selectionFilterMimeIncludes;

    // Check type filter
    const typeAllowed =
      !filterType ||
      filterType === 'both' ||
      (filterType === 'files' && item.type === 'file') ||
      (filterType === 'dirs' && item.type === 'dir');

    // Check MIME filter - only apply to files, not directories
    let mimeAllowed = true;
    if (allowedMimes && Array.isArray(allowedMimes) && allowedMimes.length > 0) {
      // If it's a directory, MIME filters don't apply - it's always selectable
      if (item.type === 'dir') {
        mimeAllowed = true;
      } else {
        // For files, check MIME type
        if (!item.mime_type) {
          mimeAllowed = false; // No MIME type means not selectable when MIME filters are active
        } else {
          mimeAllowed = allowedMimes.some((p: string) => (item.mime_type as string).startsWith(p));
        }
      }
    }

    return { typeAllowed, mimeAllowed };
  };

  /**
   * Check if an item can be selected (both type and MIME filters pass)
   * @param item - The item to check
   * @returns true if the item is selectable
   */
  const canSelectItem = (item: DirEntry | undefined): boolean => {
    const { typeAllowed, mimeAllowed } = isItemSelectable(item);
    return typeAllowed && mimeAllowed;
  };

  return {
    isItemSelectable,
    canSelectItem,
  };
}
