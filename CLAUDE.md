# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

VueFinder is a Vue 3 file-manager **component library** (published to npm as `vuefinder`). It builds as an ES library via `src/index.ts`; `examples/` is the local dev playground (mounted via `index.html` → `examples/main.ts`), not part of the shipped package.

## Commands

```bash
npm run dev            # Vite dev server using examples/ as the host app
npm run build          # vite build (ES lib) + type-gen (vue-tsc emits dist/types)
npm run lint           # eslint .   (lint:fix to autofix)
npm run format         # prettier --write .   (format:check to verify)
npm run type-check     # vue-tsc --noEmit -p tsconfig.app.json

npm run test:unit      # vitest (watch). Add `run` for CI: npm run test:unit run
npm run test:unit run src/__tests__/useVueFinder.spec.ts   # single test file
npm run test:e2e       # build preview + cypress run (headless e2e)
npm run test:e2e:dev   # vite dev + cypress open (interactive)

npm run docs:dev       # VitePress docs site in docs/
```

Note: ESLint ignores `src/__tests__`, `dist`, and `docs`.

## Architecture

VueFinder is **backend-agnostic**. The UI never talks HTTP directly — it goes through a **Driver**, and Drivers are wrapped by **AdapterManager** which adds TanStack Query caching. State lives in **nanostores** atoms, exposed to components through a per-instance **app object** held in a module-level registry. Multiple independent VueFinder instances can coexist on one page, keyed by `id`.

### The app object & dependency injection

- `src/ServiceContainer.ts` builds the per-instance **app object** (a Vue `reactive`) bundling everything: `config`, `fs` (files store), `i18n`, `theme`, `modal`, `adapter` (the `AdapterManager`, wrapped in `markRaw` so TanStack Query isn't made reactive), `emitter` (mitt event bus), `storage`, `features`, etc.
- `src/components/VueFinderProvider.vue` is the entry component. It creates the app object, registers it in the registry under its `id`, and `provide`s the id via `ServiceContainerIdKey`. It also watches `props.config` and `props.locale` to push changes into the stores.
- `src/composables/useApp.ts` holds the **module-level `appRegistry` Map** (`id → app`). `useApp(id?)` resolves the app either from an explicit id or by injecting `ServiceContainerIdKey` from the component tree. This is how any descendant component reaches shared state without prop drilling.
- `src/composables/useVueFinder.ts` (exported as `useVueFinder`) is the **public programmatic API** — `open`, `refresh`, `createFile`, `delete`, `rename`, `copy`, `move`, selection helpers, etc. — a thin wrapper over `app.adapter` + `app.fs`.

### Drivers & AdapterManager (`src/adapters/`)

- `types.ts` defines the **`Driver` interface** — the contract every backend implements (`list`, `delete`, `rename`, `copy`, `move`, `archive`/`unarchive`, `createFile`/`createFolder`, `getContent`/`save`, `getPreviewUrl`/`getDownloadUrl`, `search`, optional `configureUploader`). It also exports `parseBackendError`.
- Built-in drivers: `RemoteDriver` (HTTP, the production backend connector), `ArrayDriver` (in-memory), `IndexedDBDriver` (browser-local). Extend `BaseAdapter` (`Adapter.ts`) for custom backends.
- `AdapterManager.ts` wraps a Driver with a TanStack Query `QueryClient`: `list`/`search`/`getContent` go through `fetchQuery` (with AbortSignal forwarding for cancellation), and mutations call the driver then `invalidateListQueries()`. `QueryKeys` defines the cache key shapes. **All UI file operations go through AdapterManager, not the Driver directly.**
- The `driver` prop is **required**; `ServiceContainer` throws if missing.

### State (`src/stores/`, nanostores)

- `files.ts` — current path, breadcrumb, file list, selection, clipboard (cut/copy), sort, filter, loading. Created per-instance via `createFilesStore()`.
- `config.ts` — split into **`PersistenceConfigState`** (persisted to localStorage via `@nanostores/persistent`: view, theme, pinned folders, etc.) and **`NonPersistenceConfigState`** (runtime only: loading indicator, max file size, toolbar visibility). Prop values are initial defaults; **persisted localStorage values take precedence** so user changes survive reloads.
- `i18n.ts` (locale atom + `@nanostores/i18n`), `theme.ts`.

### Features (`src/features.ts`)

`FeatureName` union gates UI capabilities (edit, upload, delete, search, archive, …). Configure via the `features` prop as a preset (`'simple'` | `'advanced'`) or a partial `FeaturesConfig` object (merged over all-enabled defaults). `normalizeFeatures` resolves it; `useFeature` checks it in components.

### UI

- `src/components/` — `VueFinderView.vue` is the main layout (Toolbar, Breadcrumb, TreeView, Explorer, Statusbar, ContextMenu); plus `modals/`, `previews/` (CodeMirror-based editors, image cropper, CSV, etc.), `search/`.
- `src/composables/` — focused behaviors: `useSelection`, `useDragNDrop` / `useExternalDragDrop`, `useUpload` (Uppy), `useItemOperations`, `useHotkeyActions`, `useVirtualColumns`, `useLazyLoad`, etc.

## Library build conventions

- `vite.config.ts` builds ES-only with most runtime deps **externalized** (vue, nanostores, uppy, tanstack, etc. — see `external` list). Adding a new heavy runtime dependency usually means adding it to that list so it isn't bundled.
- Locale files (`src/locales/*`) are copied to `dist/locales` and imported lazily by consumers (see `examples/main.ts`).
- Public exports are centralized in `src/index.ts` — new public API (components, composables, types, drivers) must be re-exported there.

## Conventions

- TypeScript throughout; Prettier-formatted (`.prettierrc`). ESLint is pragmatic: `no-explicit-any` and `multi-word-component-names` are off; unused vars allowed when prefixed with `_`.
- Unit tests live in `src/__tests__/` (Vitest + jsdom + `@vue/test-utils`); e2e in `cypress/e2e/`.
- Node `^20.19.0 || >=22.12.0`.
