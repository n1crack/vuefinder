---
outline: deep
---

# Features

VueFinder provides a flexible features system that allows you to enable or disable specific functionality. You can use presets for quick setup or configure features individually.

## Feature Presets

VueFinder comes with two built-in presets:

### Simple Preset

Basic features only, suitable for simple file browsing:

```vue
<vue-finder :features="'simple'" />
```

Includes:

- `search` - File search
- `preview` - File preview
- `rename` - Rename items
- `upload` - File upload
- `delete` - Delete items
- `newfile` - Create new files
- `newfolder` - Create new folders
- `download` - Download files

### Advanced Preset

All features enabled (default):

```vue
<vue-finder :features="'advanced'" />
```

## All Available Features

| Feature      | Description               |
| ------------ | ------------------------- |
| `edit`       | Text file editing         |
| `newfile`    | Create new files          |
| `newfolder`  | Create new folders        |
| `preview`    | File preview modal        |
| `archive`    | Create zip archives       |
| `unarchive`  | Extract zip archives      |
| `search`     | File search functionality |
| `rename`     | Rename files and folders  |
| `upload`     | File upload               |
| `delete`     | Delete files and folders  |
| `fullscreen` | Full screen toggle        |
| `download`   | Download files            |
| `language`   | Language switcher         |
| `move`       | Move files/folders        |
| `copy`       | Copy files/folders        |
| `history`    | Navigation history        |
| `theme`      | Theme switcher            |
| `pinned`     | Pin folders feature       |

## Preview

The preview modal handles common file types out of the box. Renderers are split into lazy chunks so they don't ship in the main bundle.

### Text preview (CodeMirror 6)

Text files open in a real editor with syntax highlighting, line numbers, fold gutter, bracket matching, undo/redo, and find (Ctrl+F). View / Edit is toggled via a CodeMirror compartment — the editor is not recreated when you flip modes.

CodeMirror itself and each language pack are lazy-loaded (separate chunks per language), so they only cost bandwidth the first time a user actually opens a matching file.

Highlighted languages: `json`, `js`, `ts`, `tsx`, `jsx`, `vue`, `html`, `css`, `scss`, `md`, `yaml`, `xml`.

Auto-detected as text (CodeMirror without highlighting if no language pack matches): `vue`, `tsx`, `jsx`, `mjs`, `cjs`, `svelte`, `sh`, `bash`, `py`, `rb`, `php`, `go`, `rs`, `java`, `kt`, `swift`, `c`, `h`, `cpp`, `cs`, `sql`, `graphql`, `toml`, `ini`, `conf`, `env`, `dockerfile`, `gitignore`, `editorconfig`, and more.

If a file's reported MIME type doesn't match its extension, VueFinder falls back to the extension when deciding which preview to use — so a `.json` or `.yaml` file served as `application/octet-stream` still opens as text.

### Table view for CSV / TSV

`.csv` and `.tsv` files open as text by default. The preview header has a **Table** toggle next to **Edit** — clicking it renders the file as a real table with a sticky header row and a sticky row-number column. The delimiter (`,`, `;`, `\t`, `|`) is auto-detected. Files larger than 1,000 rows show a "first 1,000 shown" note; the text view still has all rows.

Papaparse is loaded as its own lazy chunk on the first Table-view open.

### "Preview as ▸ Text / Image" override

Right-click any file (or use the **File** menu in the menubar) to force a previewer when auto-detection guesses wrong or the MIME is missing. The submenu has **Text** and **Image** options.

### Image preview: zoom + pan

The image previewer has a floating toolbar in the bottom-right with zoom in / zoom out / reset. Also supported:

- Mouse-wheel to zoom
- `+` / `-` / `0` keyboard shortcuts
- Click-and-drag to pan when zoomed in

## Search

The search modal has been expanded with sort, folder navigation, pinning, and request cancellation.

- **Sort by name / size / date** (asc/desc) inside the search options dropdown — scoped to search only, your explorer sort is unaffected.
- **Navigate into folder results** — double-click a folder hit (or pick **Open** from the row menu) to jump into it and close the modal.
- **Pin folders from results** — every folder row has a Pin / Unpin action. Pinned folders show with a small amber pin badge so you can tell at a glance which ones are already pinned. Practical on stores with tens of thousands of folders, where walking the tree to pin is impractical.
- **Stale-response cancellation** — rapid typing aborts the in-flight request via `AbortController` so a slow late response can't overwrite the result for what you're typing now.

## Upload

The upload dialog supports inline rename. Each queue row has a pencil button that swaps the filename for an editable input.

- **Pending entries** are renamed locally — the file is removed from Uppy and re-added with the new name in the same queue position.
- **Completed entries** call `driver.rename` against the upload target folder.
- If Uppy rejects the new name (restriction, duplicate, anything), the original entry is restored atomically so nothing disappears from the queue.

## Archive / Unarchive

Both modals include an inline, tree-based **target folder picker**. The current folder is the default, so existing behavior is unchanged — but the user can expand the picker and write the resulting `.zip` (or extract its contents) into a different folder.

The frontend is fully wired; the destination is sent as a `destination` field on `archive` / `unarchive` calls. Backends that ignore the field fall back to the current folder. The official PHP backend will add support in a follow-up release.

## Menus

The context menu and the menubar dropdowns support **submenus**. Today this is used for the **Preview as ▸ Text / Image** group; the same infrastructure can be used to group future menu entries.

## Custom Configuration

You can configure features individually by passing an object:

```vue
<template>
  <vue-finder
    id="custom"
    :driver="driver"
    :features="{
      search: true,
      upload: true,
      delete: true,
      preview: false,
      archive: false,
      edit: true,
    }"
  />
</template>
```

## Examples

### Minimal Setup

```vue
<template>
  <vue-finder id="minimal" :driver="driver" :features="'simple'" />
</template>
```

### Full Featured

```vue
<template>
  <vue-finder id="full" :driver="driver" :features="'advanced'" />
</template>
```

### Custom Selection

```vue
<template>
  <vue-finder id="custom" :driver="driver" :features="customFeatures" />
</template>

<script setup>
import { ref } from 'vue';

const customFeatures = ref({
  search: true,
  upload: true,
  delete: true,
  rename: true,
  preview: true,
  // Disable all other features
  edit: false,
  archive: false,
  unarchive: false,
  newfile: false,
  newfolder: false,
  fullscreen: false,
  download: false,
  language: false,
  move: false,
  copy: false,
  history: false,
  theme: false,
  pinned: false,
});
</script>
```
