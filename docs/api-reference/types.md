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
| `UnarchiveParams`     | Parameters for unarchive operation             |
| `SearchParams`        | Parameters for search operation                |
| `SaveParams`          | Parameters for save operation                  |
| `DeleteResult`        | Result of delete operation                     |
| `FileOperationResult` | Result of file operations                      |
| `FileContentResult`   | Result of file content operations              |
| `VueFinderComposable` | Programmatic control API for mounted instance  |
| `SelectEvent`         | Selection event type                           |
| `UpdatePathEvent`     | Path change event type                         |
| `NotifyPayload`       | Notification event payload                     |
| `NotifyEvent`         | Notify callback/event function type            |
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

### `DeleteResult`

Delete operation result shape used by drivers.

```ts
export interface DeleteResult extends FileOperationResult {
  deleted?: DirEntry[];
}
```

**Notes:**

- Includes the same refreshed directory payload as `FileOperationResult` (`files`, `storages`, `read_only`, `dirname`).
- `deleted` is optional and may be provided by drivers/backends that return deleted item details.

### `ArrayDriverConfig`

```ts
export interface ArrayDriverConfig {
  files: DirEntry[] | { value: DirEntry[] };
  storage?: string;
  storages?: string[];
  readOnly?: boolean;
}
```

**Notes:**

- `storage` is the default storage prefix used when a path does not specify one.
- `storages` enables multi-storage mode for ArrayDriver.

### `IndexedDBDriverConfig`

```ts
export interface IndexedDBDriverConfig {
  dbName?: string;
  storage?: string;
  storages?: string[];
  readOnly?: boolean;
  version?: number;
}
```

**Notes:**

- `storages` defines which storage prefixes this driver manages.
- Existing data in other storage prefixes is preserved.

### Driver parameter types

All driver-method parameter types live here. The methods that perform asynchronous work accept an optional `signal?: AbortSignal` — `AdapterManager` forwards TanStack Query's signal automatically, and a custom `signal` from the caller takes precedence. See [Drivers Interface – Cancellation](./drivers-interface.md#cancellation-abortsignal).

```ts
export interface ListParams {
  path?: string;
  signal?: AbortSignal;
}

export interface SearchParams {
  path?: string;
  filter: string;
  deep?: boolean;
  size?: 'all' | 'small' | 'medium' | 'large';
  signal?: AbortSignal;
}

// Parameter type for `Driver.getContent` — used internally by AdapterManager.
// Not exported as a public type today; reference the shape inline when implementing a custom driver.
type GetContentParams = {
  path: string;
  signal?: AbortSignal;
};

export interface SaveParams {
  path: string;     // full file path including storage
  content: string;
  signal?: AbortSignal;
}

export interface ArchiveParams {
  items: { path: string; type: string }[];
  path: string;
  name: string;
  /**
   * Optional destination folder for the resulting archive.
   * Defaults to `path` (the current folder).
   */
  destination?: string;
}

export interface UnarchiveParams {
  item: string;
  path: string;
  /**
   * Optional destination folder for the extracted contents.
   * Defaults to `path` (the current folder).
   */
  destination?: string;
}
```

### `VueFinderComposable`

Programmatic API returned by `useVueFinder(id)` for controlling a mounted VueFinder instance.

```ts
export interface VueFinderComposable {
  refresh(): Promise<void>;
  open(path: string): Promise<void>;
  preview(path: string): void;
  notify(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
  getPath(): string;
  select(paths: string[]): void;
  selectOne(path: string): void;
  clearSelection(): void;
  getSelectedPaths(): string[];
  createFolder(name: string, path?: string): Promise<void>;
  createFile(name: string, path?: string): Promise<void>;
  delete(paths: string[], path?: string): Promise<void>;
  rename(itemPath: string, newName: string, path?: string): Promise<void>;
  copy(sources: string[], destination: string, path?: string): Promise<void>;
  move(sources: string[], destination: string, path?: string): Promise<void>;
  getFiles(): DirEntry[];
  getStorages(): string[];
  isLoading(): boolean;
  isReadOnly(): boolean;
}
```

**Behavior notes:**

- `useVueFinder(id)` throws if the target instance is not mounted.
- `select(paths)` only selects items that exist in the current loaded directory.
- Mutating methods delegate to the driver and sync the in-memory file list from returned `files`.

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

### `NotifyPayload`

```ts
export interface NotifyPayload {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
```

### `NotifyEvent`

```ts
export type NotifyEvent = (notification: NotifyPayload) => void;
```

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
