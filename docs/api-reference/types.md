---
outline: deep
---

# Types

Complete reference of VueFinder TypeScript types.

## Available Types

VueFinder exports the following types:

| Type                  | Description                                    |
|-----------------------| ---------------------------------------------- |
| `VueFinderProps`      | Component props interface                      |
| `DirEntry`            | File/folder entry type                         |
| `Driver`              | Driver interface                               |
| `ConfigDefaults`      | Configuration options                          |
| `ConfigState`         | Complete config state                          |
| `FeaturesConfig`      | Features configuration object                  |
| `FeaturesPreset`      | Feature preset type (`'simple' \| 'advanced'`) |
| `Theme`               | Theme type                                     |
| `FsData`              | File system data response                      |
| `RemoteDriverConfig`  | RemoteDriver configuration                     |
| `ArrayDriverConfig`   | ArrayDriver configuration                      |
| `IndexedDBDriverConfig` | IndexedDBDriver configuration                |
| `ListParams`          | Parameters for list operation                  |
| `DeleteParams`        | Parameters for delete operation                |
| `RenameParams`        | Parameters for rename operation                |
| `TransferParams`      | Parameters for copy/move operations            |
| `ArchiveParams`       | Parameters for archive operation               |
| `SaveParams`          | Parameters for save operation                  |
| `DeleteResult`        | Result of delete operation                     |
| `FileOperationResult` | Result of file operations                      |
| `FileContentResult`   | Result of file content operations              |
| `SelectEvent`         | Selection event type                           |
| `UpdatePathEvent`     | Path change event type                         |
| `ItemDclickEvent`     | Double-click event object type                 |
| `ContextMenuItem`     | Context menu item type                         |

## Type Details

### `DirEntry`

Represents a file or folder entry in the file system.

```ts
export interface DirEntry {
  dir: string;                    // Directory path
  basename: string;               // File/folder name without path
  extension: string;              // File extension (empty for folders)
  path: string;                   // Full path including storage
  storage: string;                // Storage identifier
  type: 'file' | 'dir';           // Entry type
  file_size: number | null;        // File size in bytes (null for folders)
  last_modified: number | null;   // Last modified timestamp (null if unavailable)
  mime_type: string | null;        // MIME type (null for folders or unknown)
  read_only?: boolean;            // Whether the entry is read-only
  visibility: string;              // Visibility status
  previewUrl?: string;            // Optional custom preview URL (falls back to adapter's getPreviewUrl)
}
```

**Properties:**

- `dir` - The directory path containing this entry
- `basename` - The name of the file or folder without the full path
- `extension` - File extension (e.g., `"txt"`, `"jpg"`). Empty string for folders
- `path` - Full path including storage prefix (e.g., `"local://documents/file.txt"`)
- `storage` - Storage identifier (e.g., `"local"`, `"memory"`)
- `type` - Either `"file"` or `"dir"` indicating the entry type
- `file_size` - File size in bytes. `null` for folders or when unavailable
- `last_modified` - Unix timestamp of last modification. `null` if unavailable
- `mime_type` - MIME type string (e.g., `"image/jpeg"`). `null` for folders or unknown types
- `read_only` - Optional flag indicating if the entry is read-only
- `visibility` - Visibility status string (e.g., `"public"`, `"private"`)
- `previewUrl` - Optional custom preview URL. If provided, this URL will be used for image thumbnails instead of calling `adapter.getPreviewUrl()`

**Usage Example:**

```ts
import type { DirEntry } from 'vuefinder';

const handleSelect = (items: DirEntry[]) => {
  items.forEach(item => {
    console.log(`${item.type === 'file' ? 'File' : 'Folder'}: ${item.basename}`);
    console.log(`Path: ${item.path}`);
    console.log(`Size: ${item.file_size ?? 'N/A'} bytes`);
    
    // Use custom preview URL if available
    if (item.previewUrl) {
      console.log(`Preview: ${item.previewUrl}`);
    }
  });
};
```

### `ItemDclickEvent`

Event object passed to `@file-dclick` and `@folder-dclick` handlers.

```ts
export interface ItemDclickEvent {
  item: DirEntry;              // The file or folder that was double-clicked
  defaultPrevented: boolean;   // Whether the default behavior was prevented
  preventDefault(): void;      // Method to prevent the default behavior
}
```

**Properties:**

- `item` - The `DirEntry` object representing the file or folder that was double-clicked
- `defaultPrevented` - Boolean indicating whether `preventDefault()` has been called
- `preventDefault()` - Method to prevent the default behavior (preview for files, navigation for folders)

**Usage Example:**

```ts
import type { ItemDclickEvent } from 'vuefinder';

const handleFileDclick = (event: ItemDclickEvent) => {
  const file = event.item;
  console.log('File double-clicked:', file.basename);
  
  // Custom behavior here
  // ...
  
  // Prevent default preview behavior
  event.preventDefault();
};

const handleFolderDclick = (event: ItemDclickEvent) => {
  const folder = event.item;
  console.log('Folder double-clicked:', folder.basename);
  
  // Custom behavior here
  // ...
  
  // Allow default navigation by not calling preventDefault()
};
```

### `ContextMenuItem` (also exported as `Item`)

Represents a context menu item that can be added to VueFinder's right-click context menu.

```ts
export type ContextMenuItem = {
  id: string;                                                      // Unique identifier (required)
  title: (i18n: App['i18n']) => string;                          // Function that returns display text
  action: (app: App, selectedItems: DirEntry[]) => void;          // Function called on click
  link?: (app: App, selectedItems: DirEntry[]) => string | void; // Optional link URL function
  show: (app: App, ctx: MenuContext) => boolean;                  // Function to determine visibility
  order?: number;                                                 // Optional sort order (lower = first)
}
```

**Properties:**

- `id` - Unique identifier for the menu item (required)
- `title` - Function that receives the i18n object and returns the display text for the menu item
- `action` - Function called when the menu item is clicked. Receives the app instance and array of selected items
- `link` - Optional function that returns a URL string. If provided, the menu item becomes a link (useful for download actions)
- `show` - Function that determines whether the menu item should be displayed. Receives the app instance and menu context, returns a boolean
- `order` - Optional number to control the position in the menu. Lower numbers appear first. Items without an `order` value are sorted last. Built-in items use values like 10, 20, 30, etc.

**MenuContext:**

```ts
type MenuContext = {
  searchQuery: string;      // Current search query
  items: DirEntry[];        // All selected items
  target: DirEntry | null;  // The item under the cursor (if any)
}
```

**Usage Example:**

```ts
import type { Item as ContextMenuItem } from 'vuefinder';
import { contextMenuItems } from 'vuefinder';

const customMenuItems: ContextMenuItem[] = [
  ...contextMenuItems,
  {
    id: 'custom-action',
    title: ({ t }) => t('Custom Action'), // or: title: () => 'Custom Action'
    action: (app, selectedItems) => {
      console.log('Selected items:', selectedItems);
      // Perform custom action
    },
    show: (app, ctx) => {
      // Only show for files
      return ctx.target?.type === 'file';
    },
    order: 15, // Appears between items with order 10 and 20
  },
];
```

## Usage

Import types in your TypeScript files:

```ts
import type {
  VueFinderProps,
  DirEntry,
  Driver,
  ConfigDefaults,
  FeaturesConfig,
  Theme,
  ItemDclickEvent,
  Item as ContextMenuItem,
} from 'vuefinder';
```

See [Guide - TypeScript Support](../guide/typescript-support.md) for usage examples.
