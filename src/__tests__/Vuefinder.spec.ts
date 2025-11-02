import { describe, it, expect, beforeEach, vi } from 'vitest';
import { computed, ref } from 'vue';

import { mount } from '@vue/test-utils';
import VueFinder from '@/components/VueFinder.vue';
import { LocalDriver } from '@/adapters/LocalDriver';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
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
  OverlayScrollbars: vi.fn().mockImplementation((element, options, callbacks) => {
    if (callbacks?.initialized) {
      callbacks.initialized({
        elements: () => ({
          scrollOffsetElement: document.createElement('div'),
        }),
      });
    }
    return {
      destroy: vi.fn(),
    };
  }),
}));

// Mock ServiceContainer
const mockServiceContainer = {
  storage: {
    getStore: vi.fn().mockImplementation((key, defaultValue) => defaultValue),
    setStore: vi.fn(),
  },
  i18n: {
    t: vi.fn((key) => key),
  },
  emitter: {
    emit: vi.fn(),
    on: vi.fn(),
  },
  fs: {
    data: {},
    loading: false,
    storage: 'local',
    path: '',
    isGoUpAvailable: vi.fn().mockReturnValue(false),
    breadcrumbs: [],
    breadcrumbItems: [],
    hiddenBreadcrumbs: [],
    showHiddenBreadcrumbs: false,
    limitBreadcrumbItems: vi.fn(),
    toggleHiddenBreadcrumbs: vi.fn(),
    parentFolderPath: computed(() => 'local://'),
  },
  theme: {
    actualValue: 'light',
  },
  fullScreen: false,
  features: [],
  pinnedFolders: [],
  modal: {
    visible: false,
    type: null,
    close: vi.fn(),
    open: vi.fn(),
  },
  requester: {
    send: vi.fn().mockResolvedValue({
      storage: 'local',
      dirname: '/',
      files: [],
    }),
  },
};

describe('VueFinder', () => {
  beforeEach(() => {
    // Mock the VueFinderOptions injection
    vi.mock('vue', async () => {
      const actual = await vi.importActual('vue');
      return {
        ...actual,
        inject: vi.fn().mockImplementation((key) => {
          if (key === 'VueFinderOptions') {
            return {
              i18n: {},
              locale: 'en',
            };
          }
          if (key === 'ServiceContainer') {
            return mockServiceContainer;
          }
          return {};
        }),
      };
    });
  });

  it('mounts renders properly', () => {
    // Create a mock driver for testing
    const mockFiles = ref([]);
    const driver = new LocalDriver({
      files: mockFiles,
      storage: 'local',
    });

    const wrapper = mount(VueFinder, {
      props: {
        id: 'test-vuefinder',
        driver: driver,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
