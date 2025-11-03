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
| `ContextMenuItem`     | Context menu item type                         |

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
} from 'vuefinder';
```

See [Guide - TypeScript Support](../guide/typescript-support.md) for usage examples.
