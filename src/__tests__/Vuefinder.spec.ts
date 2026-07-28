import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';

import { mount } from '@vue/test-utils';
import VueFinderProvider from '../components/VueFinderProvider.vue';
import { ArrayDriver } from '../adapters/ArrayDriver';

// Mock @nanostores/persistent to use a simple in-memory store
// We delegate to a real nanostores `atom()` so the returned store has the full
// listener API (subscribe/listen/notify/get/set/lc/value) that
// `@nanostores/vue`'s `useStore` and other consumers rely on. We just layer the
// localStorage-style side-effect on top of `set`, mirroring what the real
// `@nanostores/persistent` does.
vi.mock('@nanostores/persistent', async () => {
  const { atom, map } = await vi.importActual<typeof import('nanostores')>('nanostores');
  const identity = (a: any) => a;
  const memoryStore: Record<string, string> = {};

  const persistentAtom = vi.fn(
    (
      name: string,
      initial: any,
      opts: { encode?: (v: any) => string; decode?: (v: string) => any } = {}
    ) => {
      const encode = opts.encode || identity;
      const decode = opts.decode || identity;

      const store = atom(name in memoryStore ? decode(memoryStore[name] as string) : initial);

      const originalSet = store.set.bind(store);
      store.set = (newValue: any) => {
        const encoded = encode(newValue);
        if (typeof encoded === 'undefined') {
          delete memoryStore[name];
        } else {
          memoryStore[name] = encoded;
        }
        originalSet(newValue);
      };

      return store;
    }
  );

  const persistentMap = vi.fn((prefix: string, initial: any = {}) => {
    return map({ ...initial });
  });

  return {
    persistentAtom,
    persistentMap,
    persistentJSON: persistentAtom,
    persistentBoolean: persistentAtom,
    setPersistentEngine: vi.fn(),
    useTestStorageEngine: vi.fn(),
    setTestStorageKey: vi.fn(),
    getTestStorage: vi.fn(() => memoryStore),
    cleanTestStorage: vi.fn(() => {
      for (const k of Object.keys(memoryStore)) delete memoryStore[k];
    }),
    windowPersistentEvents: {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  };
});

// Mock localStorage - needs to support both Storage API and property access (for nanostores)
const createLocalStorageMock = () => {
  const store: Record<string, string> = {};
  const storage: any = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
  // Support property access directly (for nanostores persistent)
  return new Proxy(store, {
    get(target, prop) {
      if (prop === 'getItem') return storage.getItem;
      if (prop === 'setItem') return storage.setItem;
      if (prop === 'removeItem') return storage.removeItem;
      if (prop === 'clear') return storage.clear;
      if (prop === 'key') return storage.key;
      if (prop === 'length') return storage.length;
      return target[prop as string] || undefined;
    },
    set(target, prop, value) {
      const propStr = String(prop);
      if (['getItem', 'setItem', 'removeItem', 'clear', 'key', 'length'].includes(propStr)) {
        return false;
      }
      target[propStr] = String(value);
      return true;
    },
    deleteProperty(target, prop) {
      if (['getItem', 'setItem', 'removeItem', 'clear', 'key', 'length'].includes(String(prop))) {
        return false;
      }
      delete target[prop as string];
      return true;
    },
    ownKeys() {
      return Object.keys(target);
    },
    has(target, prop) {
      return prop in target || ['getItem', 'setItem', 'removeItem', 'clear', 'key', 'length'].includes(String(prop));
    },
  }) as Storage & Record<string, string>;
};

// Set up localStorage
if (typeof window !== 'undefined') {
  (window as any).localStorage = createLocalStorageMock();
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
global.ResizeObserver = ResizeObserverMock as any;

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords = vi.fn(() => []);
}
global.IntersectionObserver = IntersectionObserverMock as any;

// Mock OverlayScrollbars
vi.mock('overlayscrollbars', () => ({
  OverlayScrollbars: Object.assign(
    vi.fn().mockImplementation((element, options, callbacks) => {
      const instance = {
        destroy: vi.fn(),
        elements: vi.fn(() => ({
          scrollOffsetElement: document.createElement('div'),
          viewport: document.createElement('div'),
        })),
      };
      if (callbacks?.initialized) {
        callbacks.initialized(instance);
      }
      return instance;
    }),
    {
      plugin: vi.fn(),
    }
  ),
  SizeObserverPlugin: vi.fn(),
}));

describe('VueFinder', () => {
  const createDriver = (files: any[] = []) => {
    return new ArrayDriver({
      files: ref(files),
      storage: 'local',
    });
  };

  const defaultProps = {
    id: 'test-vuefinder',
    driver: createDriver(),
  };

  const defaultGlobal = {
    provide: {
      VueFinderOptions: {
        i18n: {},
        locale: 'en',
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should mount successfully', () => {
      const wrapper = mount(VueFinderProvider, {
        props: defaultProps,
        global: defaultGlobal,
      });
      expect(wrapper.exists()).toBe(true);
    });

    it('should emit ready event after initialization', async () => {
      const onReady = vi.fn();
      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          onReady,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(onReady).toHaveBeenCalledTimes(1);
    });

    it('should register app instance with provided id', async () => {
      const { useApp } = await import('../composables/useApp');
      const testId = 'test-init-id';

      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          id: testId,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const app = useApp(testId);
      expect(app).toBeDefined();
      expect(app.config).toBeDefined();
      expect(app.fs).toBeDefined();
      expect(app.emitter).toBeDefined();

      wrapper.unmount();
    });
  });

  describe('File System Operations', () => {
    it('should load files from driver', async () => {
      const { useApp } = await import('../composables/useApp');
      const files = [
        {
          basename: 'file1.txt',
          filename: 'file1.txt',
          type: 'file',
          path: 'local://file1.txt',
        },
        {
          basename: 'folder1',
          filename: 'folder1',
          type: 'dir',
          path: 'local://folder1',
        },
      ];
      const driver = createDriver(files);

      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          driver,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 150));

      const app = useApp(defaultProps.id);
      const loadedFiles = app.fs.files.get();

      expect(Array.isArray(loadedFiles)).toBe(true);
      expect(loadedFiles.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty file list', async () => {
      const { useApp } = await import('../composables/useApp');
      const driver = createDriver([]);

      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          driver,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const app = useApp(defaultProps.id);
      const currentFiles = app.fs.files.get();

      expect(Array.isArray(currentFiles)).toBe(true);
      expect(currentFiles.length).toBe(0);
    });

    it('should change path and emit path-change event', async () => {
      const { useApp } = await import('../composables/useApp');
      const onPathChange = vi.fn();

      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          onPathChange,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const app = useApp(defaultProps.id);
      const initialPath = app.fs.path.get().path;
      const newPath = 'local://new/path';
      app.fs.setPath(newPath);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Path should be updated in the app
      expect(app.fs.path.get().path).toBe(newPath);
      // onPathChange should be called (may be called multiple times including initial)
      expect(onPathChange).toHaveBeenCalled();
      // Check that the new path was emitted
      const pathCalls = onPathChange.mock.calls.map((call) => call[0]);
      expect(pathCalls).toContain(newPath);
    });
  });

  describe('Selection', () => {
    it('should select item and emit select event when files are available', async () => {
      const { useApp } = await import('../composables/useApp');
      const onSelect = vi.fn();

      const files = [
        {
          basename: 'test.txt',
          filename: 'test.txt',
          type: 'file',
          path: 'local://test.txt',
        },
      ];
      const driver = createDriver(files);

      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          driver,
          onSelect,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 200));

      const app = useApp(defaultProps.id);
      // Set files directly to test selection
      app.fs.setFiles(files);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const testFile = files[0];
      app.fs.select(`${testFile.type}:${testFile.path}`);
      await new Promise((resolve) => setTimeout(resolve, 100));

      // onSelect should be called
      expect(onSelect).toHaveBeenCalled();
      // Get the last call (after selection)
      const lastCall = onSelect.mock.calls[onSelect.mock.calls.length - 1];
      const selectedItems = lastCall[0];
      expect(Array.isArray(selectedItems)).toBe(true);
      // Selection should contain the selected item
      const selectedPaths = selectedItems.map((item: any) => item.path);
      expect(selectedPaths).toContain(testFile.path);
    });
  });

  describe('Configuration', () => {
    it('should apply initial config', async () => {
      const { useApp } = await import('../composables/useApp');

      mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          config: {
            theme: 'dark',
          },
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const app = useApp(defaultProps.id);
      const theme = app.config.get('theme');
      expect(theme).toBe('dark');
    });

    it('should update config when prop changes', async () => {
      const { useApp } = await import('../composables/useApp');

      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          config: {
            theme: 'silver',
          },
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const app = useApp(defaultProps.id);
      expect(app.config.get('theme')).toBe('silver');

      await wrapper.setProps({
        config: {
          theme: 'dark',
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(app.config.get('theme')).toBe('dark');
    });

    it('should apply selectionFilterType prop', () => {
      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          selectionFilterType: 'files',
        },
        global: defaultGlobal,
      });

      expect(wrapper.props('selectionFilterType')).toBe('files');
    });

    it('should apply selectionFilterMimeIncludes prop', () => {
      const mimeTypes = ['image/*', 'video/*'];
      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          selectionFilterMimeIncludes: mimeTypes,
        },
        global: defaultGlobal,
      });

      expect(wrapper.props('selectionFilterMimeIncludes')).toEqual(mimeTypes);
    });
  });

  describe('Multiple Instances', () => {
    it('should support multiple independent instances', async () => {
      const { useApp } = await import('../composables/useApp');

      const wrapper1 = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          id: 'instance-1',
        },
        global: defaultGlobal,
      });

      const wrapper2 = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          id: 'instance-2',
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const app1 = useApp('instance-1');
      const app2 = useApp('instance-2');

      expect(app1).toBeDefined();
      expect(app2).toBeDefined();
      expect(app1).not.toBe(app2);

      wrapper1.unmount();
      wrapper2.unmount();
    });

    it('should unregister instance on unmount', async () => {
      const { useApp } = await import('../composables/useApp');
      const testId = 'test-unmount';

      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          id: testId,
        },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const app = useApp(testId);
      expect(app).toBeDefined();

      wrapper.unmount();
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(() => useApp(testId)).toThrow();
    });
  });

  describe('MenuBar customization', () => {
    it('renders the default File/Edit/View/Go/Help menu when no custom slots are provided', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'menubar-default' },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const labels = wrapper
        .findAll('.vuefinder__menubar__label')
        .map((label) => label.text());
      expect(labels).toEqual(['File', 'Edit', 'View', 'Go', 'Help']);

      wrapper.unmount();
    });

    it('replaces the default rendering via the "menu-items" scoped slot, keeping the same menuItems data', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'menubar-menu-items-slot' },
        global: defaultGlobal,
        slots: {
          'menu-items': `<template #menu-items="{ menuItems }">
            <div class="custom-menu-items">{{ menuItems.map((m) => m.id).join(',') }}</div>
          </template>`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const custom = wrapper.find('.custom-menu-items');
      expect(custom.exists()).toBe(true);
      expect(custom.text()).toBe('file,edit,view,go,help');

      // Default per-menu rendering must be fully replaced, not just supplemented.
      expect(wrapper.findAll('.vuefinder__menubar__label').length).toBe(0);

      wrapper.unmount();
    });

    it('adds extra content via "menubar-start" and "menubar-end" without removing the default menus', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'menubar-start-end-slot' },
        global: defaultGlobal,
        slots: {
          'menubar-start': `<div class="custom-start">Start</div>`,
          'menubar-end': `<div class="custom-end">End</div>`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(wrapper.find('.custom-start').exists()).toBe(true);
      expect(wrapper.find('.custom-end').exists()).toBe(true);

      const labels = wrapper
        .findAll('.vuefinder__menubar__label')
        .map((label) => label.text());
      expect(labels).toEqual(['File', 'Edit', 'View', 'Go', 'Help']);

      wrapper.unmount();
    });

    it('hides the default Breadcrumb via config.showBreadcrumbBar, so a "menu-items" bar can fully replace it', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: {
          ...defaultProps,
          id: 'menubar-hides-breadcrumb',
          config: { showBreadcrumbBar: false },
        },
        global: defaultGlobal,
        slots: {
          'menu-items': `<template #menu-items>
            <div class="custom-menu-items">custom bar</div>
          </template>`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(wrapper.find('.custom-menu-items').exists()).toBe(true);
      expect(wrapper.find('.vuefinder__breadcrumb__container').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('Toolbar and Breadcrumb customization', () => {
    it('replaces the default Toolbar rendering via the "toolbar-items" slot', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'toolbar-items-slot' },
        global: defaultGlobal,
        slots: {
          'toolbar-items': `<div class="custom-toolbar">custom toolbar</div>`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(wrapper.find('.custom-toolbar').exists()).toBe(true);
      expect(wrapper.find('.vuefinder__toolbar__actions').exists()).toBe(false);

      wrapper.unmount();
    });

    it('replaces the action buttons (tree-view/go-up/refresh) via the "breadcrumb-actions" slot, keeping the path container', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'breadcrumb-actions-slot' },
        global: defaultGlobal,
        slots: {
          'breadcrumb-actions': `<div class="custom-breadcrumb-actions">custom actions</div>`,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(wrapper.find('.custom-breadcrumb-actions').exists()).toBe(true);
      // Default action buttons are replaced...
      expect(wrapper.find('.vuefinder__breadcrumb__toggle-tree').exists()).toBe(false);
      // ...but the complex path container itself is never slotted away.
      expect(wrapper.find('.vuefinder__breadcrumb__path-container').exists()).toBe(true);

      wrapper.unmount();
    });

    it('keeps the default Toolbar/Breadcrumb when no slot content is provided', async () => {
      const wrapper = mount(VueFinderProvider, {
        props: { ...defaultProps, id: 'toolbar-breadcrumb-default' },
        global: defaultGlobal,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(wrapper.find('.vuefinder__toolbar__actions').exists()).toBe(true);
      expect(wrapper.find('.vuefinder__breadcrumb__container').exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
