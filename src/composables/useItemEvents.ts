import { type Ref } from 'vue';
import type { StoreValue } from 'nanostores';
import type { DirEntry, App } from '../types';
import type SelectionAraa from '@viselect/vanilla';
import { useItemFilters } from './useItemFilters';
import { useItemOperations } from './useItemOperations';

/**
 * Composable for handling item events (click, double-click, context menu)
 */
export function useItemEvents(
  app: App,
  explorerId: string,
  sortedFiles: StoreValue<DirEntry[]>,
  selectedKeys: StoreValue<Set<string>>,
  selectionObject: Ref<SelectionAraa | null>,
  onFileDclick?: (event: any) => void,
  onFolderDclick?: (event: any) => void
) {
  const fs = app.fs;
  const { canSelectItem } = useItemFilters(app);
  const { openItem } = useItemOperations(app);

  /**
   * Get item from event target
   */
  const getItemFromEvent = (
    event: Event | MouseEvent | TouchEvent
  ): { key: string; item: DirEntry | undefined } | null => {
    const el = (event.target as Element | null)?.closest('.file-item-' + explorerId);
    if (!el) return null;

    const key = String(el.getAttribute('data-key'));
    const item = sortedFiles.value?.find((f: DirEntry) => f.path === key);
    return { key, item };
  };

  /**
   * Get selected items
   */
  const getSelectedItems = (): DirEntry[] => {
    const selected = selectedKeys.value;
    return sortedFiles.value?.filter((f: DirEntry) => selected?.has(f.path)) || [];
  };

  /**
   * Handle item click
   */
  const handleItemClick = (event: Event | MouseEvent | TouchEvent) => {
    const result = getItemFromEvent(event);
    if (!result) return;

    const { key, item } = result;
    const mouse = event as MouseEvent | null;

    // Block selection if not selectable per filters
    if (!canSelectItem(item)) {
      return;
    }

    const selectionMode = app.selectionMode || 'multiple';

    if (
      !mouse?.ctrlKey &&
      !mouse?.metaKey &&
      (event.type !== 'touchstart' || !fs.isSelected(key))
    ) {
      fs.clearSelection();
      selectionObject.value?.clearSelection(true, true);
    }
    selectionObject.value?.resolveSelectables();
    if (event.type === 'touchstart' && fs.isSelected(key)) {
      fs.select(key, selectionMode);
    } else {
      fs.toggleSelect(key, selectionMode);
    }

    fs.setSelectedCount(selectedKeys.value?.size || 0);
  };

  /**
   * Handle item double-click
   */
  const handleItemDblClick = (event: MouseEvent | TouchEvent) => {
    const result = getItemFromEvent(event);
    if (!result) return;

    const { item } = result;

    // Block open if not selectable
    if (!canSelectItem(item)) return;

    if (item) {
      openItem(item, onFileDclick, onFolderDclick);
    }
  };

  /**
   * Handle item context menu
   */
  const handleItemContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    const result = getItemFromEvent(event);
    if (!result) return;

    const { key, item: targetItem } = result;

    // Only allow context menu if item is selectable
    if (!canSelectItem(targetItem)) {
      return; // Don't show context menu for unselectable items
    }

    // Ensure the clicked item is selected if not already
    if (!selectedKeys.value?.has(key)) {
      fs.clearSelection();
      fs.select(key);
    }
    app.emitter.emit('vf-contextmenu-show', {
      event,
      items: getSelectedItems(),
      target: targetItem,
    });
  };

  /**
   * Handle content context menu (blank area)
   */
  const handleContentContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    app.emitter.emit('vf-contextmenu-show', { event, items: getSelectedItems() });
  };

  return {
    handleItemClick,
    handleItemDblClick,
    handleItemContextMenu,
    handleContentContextMenu,
    getSelectedItems,
  };
}
