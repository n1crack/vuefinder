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
  unarchive(params: { item: string; path: string }): Promise<FileOperationResult>;
  createFile(params: { path: string; name: string }): Promise<FileOperationResult>;
  createFolder(params: { path: string; name: string }): Promise<FileOperationResult>;
  getContent(params: { path: string }): Promise<FileContentResult>;
  getPreviewUrl(params: { path: string }): string;
  getDownloadUrl(params: { path: string }): string;
  search(params: SearchParams): Promise<DirEntry[]>;
  save(params: SaveParams): Promise<string>;
}
```

## Method Details

### `list`

List files and folders in a directory.

**Parameters:**

- `params?: ListParams` - Optional parameters including `path`

**Returns:** `Promise<FsData>` - File system data with files array

### `delete`

Delete files or folders.

**Parameters:**

- `params: DeleteParams` - Delete parameters

**Returns:** `Promise<DeleteResult>` - Result with deleted items

### `rename`

Rename a file or folder.

**Parameters:**

- `params: RenameParams` - Rename parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `copy`

Copy files or folders.

**Parameters:**

- `params: TransferParams` - Copy parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `move`

Move files or folders.

**Parameters:**

- `params: TransferParams` - Move parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `archive`

Create a zip archive.

**Parameters:**

- `params: ArchiveParams` - Archive parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `unarchive`

Extract a zip archive.

**Parameters:**

- `params: { item: string; path: string }` - Unarchive parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `createFile`

Create a new file.

**Parameters:**

- `params: { path: string; name: string }` - Create file parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `createFolder`

Create a new folder.

**Parameters:**

- `params: { path: string; name: string }` - Create folder parameters

**Returns:** `Promise<FileOperationResult>` - Operation result

### `getContent`

Get file content.

**Parameters:**

- `params: { path: string }` - File path

**Returns:** `Promise<FileContentResult>` - File content

### `getPreviewUrl`

Get preview URL for a file.

**Parameters:**

- `params: { path: string }` - File path

**Returns:** `string` - Preview URL

### `getDownloadUrl`

Get download URL for a file.

**Parameters:**

- `params: { path: string }` - File path

**Returns:** `string` - Download URL

### `search`

Search for files and folders.

**Parameters:**

- `params: SearchParams` - Search parameters

**Returns:** `Promise<DirEntry[]>` - Search results

### `save`

Save file content.

**Parameters:**

- `params: SaveParams` - Save parameters

**Returns:** `Promise<string>` - Saved file path

## Implementing a Custom Driver

See [Guide - Drivers & Adapters](../guide/drivers-adapters.md) for examples of implementing custom drivers.
