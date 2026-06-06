---
outline: deep
---

# Drivers Interface

Complete reference of the Driver interface that all drivers must implement.

## Driver Interface

```ts
export interface Driver {
  configureUploader?: (uppy: any, context: UploaderContext) => void;
  list(params?: ListParams): Promise<FsData>;
  delete(params: DeleteParams): Promise<DeleteResult>;
  rename(params: RenameParams): Promise<FileOperationResult>;
  copy(params: TransferParams): Promise<FileOperationResult>;
  move(params: TransferParams): Promise<FileOperationResult>;
  archive(params: ArchiveParams): Promise<FileOperationResult>;
  unarchive(params: UnarchiveParams): Promise<FileOperationResult>;
  createFile(params: { path: string; name: string }): Promise<FileOperationResult>;
  createFolder(params: { path: string; name: string }): Promise<FileOperationResult>;
  getContent(params: GetContentParams): Promise<FileContentResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  search(params: SearchParams): Promise<DirEntry[]>;
  save(params: SaveParams): Promise<string>;
}
```

### Built-in drivers

VueFinder ships with ready-to-use drivers that implement this interface:

- ArrayDriver — In-memory, array-backed storage for demos/tests
- IndexedDBDriver — Browser-persistent storage using IndexedDB
- RemoteDriver — HTTP API backend integration

See the guide for usage and configuration of these drivers:
[Guide - Drivers & Adapters](../guide/drivers-adapters.md)

## Cancellation (`AbortSignal`)

The driver contract accepts an optional `signal?: AbortSignal` on the methods that can be cancelled mid-flight:

- `list`
- `search`
- `getContent`
- `save`

`AdapterManager` automatically forwards the `AbortSignal` produced by TanStack Query's `queryFn` context, and prefers any explicit `signal` passed by the caller. The built-in `RemoteDriver` forwards `signal` to `fetch`, so backend requests are aborted as soon as the caller (or query invalidation) signals cancellation.

Custom drivers should accept the optional `signal` field and honor it when running asynchronous work — typically by passing it through to `fetch`, or checking `signal.aborted` between long-running steps.

The search modal is the first consumer in the UI: rapid typing aborts the in-flight request via `AbortController` so a late response can't overwrite the results for the current query.

## Method Details

### `configureUploader`

**Optional.** Configure the Uppy uploader instance for file uploads. This method allows drivers to customize upload behavior, such as setting endpoints, headers, or upload options.

**Parameters:**

- `uppy: any` - The Uppy instance to configure
- `context: UploaderContext` - Context object providing helper methods
  - `getTargetPath: () => string` - Function that returns the current target path for uploads

**Returns:** `void`

**Usage Example:**

```ts
configureUploader(uppy: any, context: UploaderContext) {
  uppy.use(XHR, {
    endpoint: `${this.baseURL}/upload`,
    headers: { Authorization: `Bearer ${this.token}` },
    formData: true,
  });
  
  uppy.on('upload', () => {
    const targetPath = context.getTargetPath();
    uppy.getFiles().forEach((file) => {
      uppy.setFileMeta(file.id, { path: targetPath });
    });
  });
}
```

**Notes:**

- This method is optional. If not implemented, VueFinder will use default upload behavior.
- The `context.getTargetPath()` method returns the current directory path where files should be uploaded.
- Implement this method when you need custom upload logic, authentication, or special handling.

---

### `list`

List files and folders in a directory at the specified path.

**Parameters:**

- `params?: ListParams` - Optional parameters object
  - `path?: string` - The directory path to list. If omitted, lists the root directory. Path format can be `"storage://path/to/dir"` or just `"path/to/dir"` depending on the driver implementation.
  - `signal?: AbortSignal` - Optional cancellation signal. When the signal aborts, the driver should cancel any in-flight request and reject. See [Cancellation](#cancellation-abortsignal).

**Returns:** `Promise<FsData>` - Promise resolving to file system data object containing:
  - `storages: string[]` - Array of available storage names
  - `dirname: string` - Current directory name/path
  - `files: DirEntry[]` - Array of file and folder entries in the directory
  - `read_only?: boolean` - Optional flag indicating if the current path is read-only

**Usage Example:**

```ts
// List root directory
const data = await driver.list();
console.log(data.files); // Array of files and folders

// List specific directory
const data = await driver.list({ path: 'local://documents' });
```

**Error Handling:**

- Throws error if path is invalid or inaccessible
- Returns empty files array if directory doesn't exist (behavior may vary by driver)

---

### `delete`

Delete one or more files or folders from the specified path.

**Parameters:**

- `params: DeleteParams` - Required parameters object
  - `path: string` - The current directory path where items are located
  - `items: { path: string; type: string }[]` - Array of items to delete, each containing:
    - `path: string` - Full path to the item (including storage prefix if applicable)
    - `type: string` - Item type: `'file'` or `'dir'`

**Returns:** `Promise<DeleteResult>` - Promise resolving to deletion result:
  - `files: DirEntry[]` - Updated file list for the current directory after delete
  - `storages: string[]` - Available storage identifiers
  - `read_only: boolean` - Whether the current path is read-only
  - `dirname: string` - Current directory name/path
  - `deleted?: DirEntry[]` - Optional array of deleted items (if provided by the driver/backend)

**Usage Example:**

```ts
const result = await driver.delete({
  path: 'local://documents',
  items: [
    { path: 'local://documents/file.txt', type: 'file' },
    { path: 'local://documents/old-folder', type: 'dir' }
  ]
});
console.log(result.files); // refreshed current folder listing
console.log(result.deleted ?? []); // optional deleted items list
```

**Error Handling:**

- Throws error if items cannot be deleted (permissions, locked files, etc.)
- May partially succeed - if available, check `result.deleted` to see which items were deleted

---

### `rename`

Rename a file or folder to a new name.

**Parameters:**

- `params: RenameParams` - Required parameters object
  - `path: string` - The current directory path where the item is located
  - `item: string` - Current name/path of the item to rename (relative to path)
  - `name: string` - New name for the item (without path)

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list after rename
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the path is read-only
  - `dirname: string` - Current directory name

**Usage Example:**

```ts
const result = await driver.rename({
  path: 'local://documents',
  item: 'old-name.txt',
  name: 'new-name.txt'
});
// File renamed from 'old-name.txt' to 'new-name.txt'
```

**Error Handling:**

- Throws error if item doesn't exist or cannot be renamed
- Validates that new name doesn't conflict with existing items

---

### `copy`

Copy one or more files or folders to a destination path.

**Parameters:**

- `params: TransferParams` - Required parameters object
  - `sources: string[]` - Array of full paths to items to copy (including storage prefix)
  - `destination: string` - Full destination path where items should be copied to

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list after copy operation
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the destination path is read-only
  - `dirname: string` - Destination directory name

**Usage Example:**

```ts
const result = await driver.copy({
  sources: [
    'local://documents/file1.txt',
    'local://documents/file2.txt'
  ],
  destination: 'local://backup'
});
// Files copied to backup directory
```

**Error Handling:**

- Throws error if source items don't exist or destination is invalid
- May partially succeed if some items cannot be copied

---

### `move`

Move (cut) one or more files or folders to a destination path.

**Parameters:**

- `params: TransferParams` - Required parameters object
  - `sources: string[]` - Array of full paths to items to move (including storage prefix)
  - `destination: string` - Full destination path where items should be moved to

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list after move operation
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the destination path is read-only
  - `dirname: string` - Destination directory name

**Usage Example:**

```ts
const result = await driver.move({
  sources: ['local://documents/file.txt'],
  destination: 'local://archive'
});
// File moved from documents to archive
```

**Error Handling:**

- Throws error if source items don't exist or destination is invalid
- Unlike `copy`, items are removed from source location after successful move

---

### `archive`

Create a zip archive containing the specified files and folders.

**Parameters:**

- `params: ArchiveParams` - Required parameters object
  - `items: { path: string; type: string }[]` - Array of items to include in archive, each containing:
    - `path: string` - Full path to the item
    - `type: string` - Item type: `'file'` or `'dir'`
  - `path: string` - Current directory path (the folder the operation was invoked from)
  - `name: string` - Name for the archive file (typically `.zip` extension)
  - `destination?: string` - Optional folder where the resulting archive should be written. When omitted, the archive is written into `path`. Sent forward-compatibly so backends that don't support it can ignore the field.

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list including the new archive
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the path is read-only
  - `dirname: string` - Current directory name

**Usage Example:**

```ts
const result = await driver.archive({
  items: [
    { path: 'local://documents/file1.txt', type: 'file' },
    { path: 'local://documents/folder', type: 'dir' }
  ],
  path: 'local://documents',
  name: 'my-archive.zip'
});
// Archive created with specified files and folders
```

**Error Handling:**

- Throws error if items don't exist or archive cannot be created
- Archive creation may fail for very large files or insufficient storage

---

### `unarchive`

Extract files and folders from a zip archive.

**Parameters:**

- `params: UnarchiveParams` - Required parameters object
  - `item: string` - Full path to the archive file to extract
  - `path: string` - Current directory path (the folder the operation was invoked from)
  - `destination?: string` - Optional folder where the archive contents should be extracted. When omitted, contents are extracted into `path`. Sent forward-compatibly so backends that don't support it can ignore the field.

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list with extracted files
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the destination path is read-only
  - `dirname: string` - Extraction directory name

**Usage Example:**

```ts
const result = await driver.unarchive({
  item: 'local://documents/archive.zip',
  path: 'local://documents/extracted'
});
// Archive extracted to specified directory
```

**Error Handling:**

- Throws error if archive doesn't exist, is corrupted, or extraction fails
- May fail if destination path is invalid or read-only

---

### `createFile`

Create a new empty file at the specified path.

**Parameters:**

- `params: { path: string; name: string }` - Required parameters object
  - `path: string` - Directory path where the file should be created
  - `name: string` - Name for the new file (with or without extension)

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list including the new file
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the path is read-only
  - `dirname: string` - Current directory name

**Usage Example:**

```ts
const result = await driver.createFile({
  path: 'local://documents',
  name: 'new-file.txt'
});
// Empty file created
```

**Error Handling:**

- Throws error if file already exists or path is invalid
- May fail if path is read-only or insufficient permissions

---

### `createFolder`

Create a new empty folder at the specified path.

**Parameters:**

- `params: { path: string; name: string }` - Required parameters object
  - `path: string` - Parent directory path where the folder should be created
  - `name: string` - Name for the new folder

**Returns:** `Promise<FileOperationResult>` - Promise resolving to operation result:
  - `files: DirEntry[]` - Updated file list including the new folder
  - `storages: string[]` - Available storages
  - `read_only: boolean` - Whether the path is read-only
  - `dirname: string` - Current directory name

**Usage Example:**

```ts
const result = await driver.createFolder({
  path: 'local://documents',
  name: 'new-folder'
});
// Empty folder created
```

**Error Handling:**

- Throws error if folder already exists or path is invalid
- May fail if path is read-only or insufficient permissions

---

### `getContent`

Retrieve the text content of a file.

**Parameters:**

- `params: GetContentParams` - Required parameters object
  - `path: string` - Full path to the file (including storage prefix if applicable)
  - `signal?: AbortSignal` - Optional cancellation signal. See [Cancellation](#cancellation-abortsignal).

**Returns:** `Promise<FileContentResult>` - Promise resolving to file content:
  - `content: string` - The file content as a string
  - `mimeType?: string` - Optional MIME type of the file content

**Usage Example:**

```ts
const result = await driver.getContent({
  path: 'local://documents/file.txt'
});
console.log(result.content); // File text content
console.log(result.mimeType); // e.g., 'text/plain'
```

**Error Handling:**

- Throws error if file doesn't exist or cannot be read
- May fail for binary files or very large files
- Content is returned as string - binary files may not be handled correctly

---

### `getPreviewUrl`

Get a URL that can be used to preview a file (e.g., in an iframe or image tag).

**Parameters:**

- `params: { path: string }` - Required parameters object
  - `path: string` - Full path to the file (including storage prefix if applicable)

**Returns:** `string` - A URL string that can be used to access the file for preview

**Usage Example:**

```ts
const previewUrl = driver.getPreviewUrl({
  path: 'local://documents/image.jpg'
});
// Returns: 'https://api.example.com/preview?path=local://documents/image.jpg'
```

**Notes:**

- This is a synchronous method that returns a URL string
- The URL format depends on driver implementation
- URL may include query parameters for authentication or path encoding

---

### `getDownloadUrl`

Get a URL that can be used to download a file.

**Parameters:**

- `params: { path: string }` - Required parameters object
  - `path: string` - Full path to the file (including storage prefix if applicable)

**Returns:** `string` - A URL string that can be used to download the file

**Usage Example:**

```ts
const downloadUrl = driver.getDownloadUrl({
  path: 'local://documents/file.pdf'
});
// Returns: 'https://api.example.com/download?path=local://documents/file.pdf'
// Can be used in <a href> tag or fetched programmatically
```

**Notes:**

- This is a synchronous method that returns a URL string
- The URL format depends on driver implementation
- URL may include query parameters for authentication or path encoding

---

### `search`

Search for files and folders matching the specified criteria.

**Parameters:**

- `params: SearchParams` - Required parameters object
  - `filter: string` - Search query string (filename or content search, driver-dependent)
  - `path?: string` - Optional base path to search within. If omitted, searches from root.
  - `deep?: boolean` - Optional flag to search in subdirectories recursively. Defaults to `false`.
  - `size?: 'all' | 'small' | 'medium' | 'large'` - Optional file size filter:
    - `'all'` - No size filter (default)
    - `'small'` - Small files only
    - `'medium'` - Medium files only
    - `'large'` - Large files only
  - `signal?: AbortSignal` - Optional cancellation signal. The search modal passes a signal that aborts on each new keystroke so stale responses can't overwrite the current results. See [Cancellation](#cancellation-abortsignal).

**Returns:** `Promise<DirEntry[]>` - Promise resolving to array of matching file/folder entries

**Usage Example:**

```ts
// Simple search
const results = await driver.search({
  filter: 'document',
  path: 'local://documents'
});

// Deep recursive search
const results = await driver.search({
  filter: 'image',
  path: 'local://',
  deep: true,
  size: 'large'
});
// Returns all large image files recursively
```

**Error Handling:**

- Returns empty array if no matches found
- Throws error if search path is invalid
- Search behavior (filename vs content) depends on driver implementation

---

### `save`

Save text or binary content to a file at the specified path.

**Parameters:**

- `params: SaveParams` - Required parameters object
  - `path: string` - Full file path where content should be saved (including storage prefix, e.g., `'local://documents/file.txt'`)
  - `content: string` - The content to save (as string, may contain binary data encoded)
  - `signal?: AbortSignal` - Optional cancellation signal. See [Cancellation](#cancellation-abortsignal).

**Returns:** `Promise<string>` - Promise resolving to the saved file path

**Usage Example:**

```ts
const savedPath = await driver.save({
  path: 'local://documents/new-file.txt',
  content: 'Hello, World!\nThis is the file content.'
});
console.log(`File saved to: ${savedPath}`);
```

**Error Handling:**

- Throws error if path is invalid or cannot be written
- May fail if parent directory doesn't exist
- May fail if file is read-only or insufficient permissions
- Overwrites existing file if it already exists

## Implementing a Custom Driver

See [Guide - Drivers & Adapters](../guide/drivers-adapters.md) for examples of implementing custom drivers.
