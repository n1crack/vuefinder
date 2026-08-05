import { describe, it, expect, vi, afterEach } from 'vitest';
import { defineComponent, h, provide } from 'vue';
import { mount } from '@vue/test-utils';
import { atom } from 'nanostores';
import { useMenuItems } from '../composables/useMenuItems';
import { registerApp, unregisterApp, ServiceContainerIdKey } from '../composables/useApp';
import type { App, DirEntry } from '../types';
import type { ConfigState } from '../stores/config';

function file(basename: string, type: 'file' | 'dir' = 'file'): DirEntry {
  return {
    storage: 'local',
    dir: 'local://',
    basename,
    extension: type === 'file' ? (basename.split('.').pop() ?? '') : '',
    path: `local://${basename}`,
    type,
    file_size: type === 'file' ? 1 : null,
    last_modified: Date.now(),
    mime_type: type === 'file' ? 'application/zip' : null,
    visibility: 'public',
  };
}

const DEFAULT_CONFIG_STATE: ConfigState = {
  view: 'grid',
  theme: 'silver',
  fullScreen: false,
  showTreeView: false,
  showHiddenFiles: true,
  metricUnits: false,
  showThumbnails: true,
  persist: false,
  path: '',
  pinnedFolders: [],
  notificationsEnabled: true,
  expandTreeByDefault: false,
  expandedTreePaths: [],
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: 'circular',
  showMenuBar: true,
  showToolbar: true,
  showBreadcrumbBar: true,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: 'bottom-center',
  notificationDuration: 3000,
  notificationVisibleToasts: 4,
  notificationRichColors: true,
};

// A plain in-memory config store (no `@nanostores/persistent`/localStorage
// involved), since composable tests only need `state`/`get`/`set`/`toggle` to
// behave like the real thing - a fresh `atom()` per test is simpler and more
// isolated than mocking the persistence layer.
function createMockConfigStore(overrides: Partial<ConfigState> = {}) {
  const state = atom<ConfigState>({ ...DEFAULT_CONFIG_STATE, ...overrides });

  return {
    state,
    get: <K extends keyof ConfigState>(key: K) => state.get()[key],
    set: (keyOrPatch: any, value?: any) => {
      if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
        state.set({ ...state.get(), ...keyOrPatch });
      } else {
        state.set({ ...state.get(), [keyOrPatch]: value });
      }
    },
    toggle: (key: keyof ConfigState) => {
      state.set({ ...state.get(), [key]: !state.get()[key] });
    },
    all: () => state.get(),
    init: () => {},
    reset: () => {
      state.set({ ...DEFAULT_CONFIG_STATE });
    },
  };
}

function createTestApp(overrides: { features?: Record<string, boolean> } = {}) {
  const app = {
    i18n: { t: (key: string) => key },
    fs: {
      path: atom({ storage: 'local', breadcrumb: [], path: 'local://' }),
      selectedItems: atom<DirEntry[]>([]),
      storages: atom<string[]>(['local']),
      canGoForward: atom(false),
      canGoBack: atom(false),
      goForward: vi.fn(),
      goBack: vi.fn(),
      selectAll: vi.fn(),
      clearSelection: vi.fn(),
      setClipboard: vi.fn(),
      getClipboard: vi.fn(() => ({ type: null, items: new Set() })),
    },
    config: createMockConfigStore(),
    modal: { open: vi.fn(), close: vi.fn() },
    adapter: {
      invalidateListQuery: vi.fn(),
      open: vi.fn(),
      getDownloadUrl: vi.fn(() => 'https://example.test/download'),
    },
    emitter: { emit: vi.fn() },
    features: { newfolder: true, newfile: true, upload: true, search: true, archive: true, ...overrides.features },
    selectionMode: 'multiple',
  } as unknown as App;

  return app;
}

// Runs `setupFn` inside a real component tree so `useApp()` (inject-based)
// resolves the given VueFinder id, mirroring how MenuBar.vue consumes it.
function mountComposable<T>(id: string, setupFn: () => T) {
  let result!: T;
  const Child = defineComponent({
    setup() {
      result = setupFn();
      return () => h('div');
    },
  });
  const Parent = defineComponent({
    setup() {
      provide(ServiceContainerIdKey, id);
      return () => h(Child);
    },
  });
  const wrapper = mount(Parent);
  return { wrapper, get result() {
    return result;
  } };
}

describe('useMenuItems', () => {
  const id = 'menu-items-test';

  afterEach(() => {
    unregisterApp(id);
  });

  it('builds the default File/Edit/View/Go/Help structure', () => {
    registerApp(id, createTestApp());
    const { result } = mountComposable(id, () => useMenuItems());

    expect(result.menuItems.value.map((m) => m.id)).toEqual(['file', 'edit', 'view', 'go', 'help']);
  });

  it('hides feature-gated items when the feature is disabled', () => {
    registerApp(id, createTestApp({ features: { newfolder: false } }));
    const { result } = mountComposable(id, () => useMenuItems());

    const fileMenu = result.menuItems.value.find((m) => m.id === 'file')!;
    const newFolderItem = fileMenu.items!.find((i) => i.id === 'new-folder')!;

    expect(newFolderItem.hidden!()).toBe(true);
  });

  it('reacts to selection changes for single-item actions like rename', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useMenuItems());

    const editMenu = () => result.menuItems.value.find((m) => m.id === 'edit')!;
    const renameItem = () => editMenu().items!.find((i) => i.id === 'rename')!;

    expect(renameItem().enabled!()).toBe(false);

    app.fs.selectedItems.set([file('a.txt')]);
    expect(renameItem().enabled!()).toBe(true);

    app.fs.selectedItems.set([file('a.txt'), file('b.txt')]);
    expect(renameItem().enabled!()).toBe(false);
  });

  it('reuses the exact same action as MenuBar.vue when opening a modal', () => {
    const app = createTestApp();
    registerApp(id, app);
    app.fs.selectedItems.set([file('archive.zip')]);
    const { result } = mountComposable(id, () => useMenuItems());

    const fileMenu = result.menuItems.value.find((m) => m.id === 'file')!;
    const archiveItem = fileMenu.items!.find((i) => i.id === 'archive')!;

    archiveItem.action!();

    expect(app.modal.open).toHaveBeenCalledTimes(1);
    expect(app.modal.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ items: app.fs.selectedItems.get() })
    );
  });

  it('the "refresh" view action invalidates and reopens the current path', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useMenuItems());

    const viewMenu = result.menuItems.value.find((m) => m.id === 'view')!;
    viewMenu.items!.find((i) => i.id === 'refresh')!.action!();

    expect(app.adapter.invalidateListQuery).toHaveBeenCalledWith('local://');
    expect(app.adapter.open).toHaveBeenCalledWith('local://');
  });

  it('the "grid-view" action updates config and "checked" reflects the current view', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useMenuItems());

    const viewMenu = () => result.menuItems.value.find((m) => m.id === 'view')!;
    const listViewItem = viewMenu().items!.find((i) => i.id === 'list-view')!;

    expect(listViewItem.checked!()).toBe(false);
    listViewItem.action!();
    expect(app.config.get('view')).toBe('list');
    expect(viewMenu().items!.find((i) => i.id === 'list-view')!.checked!()).toBe(true);
  });
});
