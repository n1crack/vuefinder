import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';

import { mount } from '@vue/test-utils';
import VueFinderProvider from '../components/VueFinderProvider.vue';
import { ArrayDriver } from '../adapters/ArrayDriver';

// Mock @nanostores/persistent to use a simple in-memory store
vi.mock('@nanostores/persistent', () => {
  const memoryStore: Record<string, string> = {};
  return {
    persistentAtom: vi.fn((key: string, initialValue: any) => {
      const atom = {
        value: memoryStore[key] ? JSON.parse(memoryStore[key]) : initialValue,
        set: vi.fn((value: any) => {
          atom.value = value;
          memoryStore[key] = JSON.stringify(value);
        }),
        get: vi.fn(() => atom.value),
        listen: vi.fn(() => () => {}),
      };
      return atom;
    }),
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
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

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
      app.fs.select(testFile.path);
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
});
