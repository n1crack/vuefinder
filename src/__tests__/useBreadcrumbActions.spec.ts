import { describe, it, expect, vi, afterEach } from 'vitest';
import { defineComponent, h, provide } from 'vue';
import { mount } from '@vue/test-utils';
import { atom } from 'nanostores';
import { useBreadcrumbActions } from '../composables/useBreadcrumbActions';
import { registerApp, unregisterApp, ServiceContainerIdKey } from '../composables/useApp';
import type { App } from '../types';
import type { ConfigState } from '../stores/config';

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

function createTestApp() {
  const app = {
    i18n: { t: (key: string) => key },
    fs: {
      path: atom({
        storage: 'local',
        path: 'local://docs/sub',
        breadcrumb: [
          { name: 'docs', path: 'local://docs' },
          { name: 'sub', path: 'local://docs/sub' },
        ],
      }),
    },
    config: createMockConfigStore(),
    adapter: {
      invalidateListQuery: vi.fn(),
      open: vi.fn(),
    },
  } as unknown as App;

  return app;
}

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

describe('useBreadcrumbActions', () => {
  const id = 'breadcrumb-actions-test';

  afterEach(() => {
    unregisterApp(id);
  });

  it('exposes a reactive currentPath, for bars that replace Breadcrumb.vue entirely', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    expect(result.currentPath.value.path).toBe('local://docs/sub');

    app.fs.path.set({ storage: 'local', path: 'local://docs/sub/deeper', breadcrumb: [] });
    expect(result.currentPath.value.path).toBe('local://docs/sub/deeper');
  });

  it('refresh() invalidates and reopens the current path', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    result.refresh();

    expect(app.adapter.invalidateListQuery).toHaveBeenCalledWith('local://docs/sub');
    expect(app.adapter.open).toHaveBeenCalledWith('local://docs/sub');
  });

  it('goUp() opens the parent path from the breadcrumb trail', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    result.goUp();

    expect(app.adapter.open).toHaveBeenCalledWith('local://docs');
  });

  it('goUp() falls back to the storage root when there is no parent breadcrumb', () => {
    const app = createTestApp();
    app.fs.path.set({ storage: 'local', path: 'local://', breadcrumb: [] });
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    result.goUp();

    expect(app.adapter.open).toHaveBeenCalledWith('local://');
  });

  it('toggleTreeView() flips the showTreeView config flag', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    expect(app.config.get('showTreeView')).toBe(false);
    result.toggleTreeView();
    expect(app.config.get('showTreeView')).toBe(true);
  });

  it('goTo() opens an arbitrary path, e.g. reused from a merged menu/breadcrumb bar', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    result.goTo('local://elsewhere');

    expect(app.adapter.open).toHaveBeenCalledWith('local://elsewhere');
  });

  it('copyCurrentPath() writes the current path to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useBreadcrumbActions());

    await result.copyCurrentPath();

    expect(writeText).toHaveBeenCalledWith('local://docs/sub');
  });
});
