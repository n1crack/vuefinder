import type { DirEntry, App, ItemDclickEvent } from '../types';
import type { Item as ContextMenuItem } from '../utils/contextmenu';

/**
 * Composable for item operations like opening items
 */
export function useItemOperations(app: App) {
  /**
   * Creates an item double-click event object for handlers
   */
  const createCancelableEvent = (item: DirEntry): ItemDclickEvent => {
    const event: ItemDclickEvent = {
      item,
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    };
    return event;
  };

  /**
   * Open an item (file or folder) with custom handlers or default behavior
   */
  const openItem = (
    item: DirEntry,
    onFileDclick?: (event: ItemDclickEvent) => void,
    onFolderDclick?: (event: ItemDclickEvent) => void
  ) => {
    // Create cancelable event object
    const event = createCancelableEvent(item);

    // Emit event if custom handlers are provided
    if (item.type === 'file' && onFileDclick) {
      app.emitter.emit('vf-file-dclick', event);
      // If default was not prevented, continue with default behavior
      if (!event.defaultPrevented) {
        // Fall through to default behavior
      } else {
        return; // Default behavior was prevented
      }
    } else if (item.type === 'dir' && onFolderDclick) {
      app.emitter.emit('vf-folder-dclick', event);
      // If default was not prevented, continue with default behavior
      if (!event.defaultPrevented) {
        // Fall through to default behavior
      } else {
        return; // Default behavior was prevented
      }
    }

    // Default behavior - execute context menu action
    const contextMenuItem = app.contextMenuItems?.find((cmi: ContextMenuItem) => {
      return cmi.show(app, {
        items: [item],
        target: item,
        searchQuery: '',
      });
    });

    if (contextMenuItem) {
      contextMenuItem.action(app, [item]);
    }
  };

  return {
    createCancelableEvent,
    openItem,
  };
}
