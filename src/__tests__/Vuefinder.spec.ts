import { describe, it, expect, beforeEach, vi } from 'vitest'
import { computed, ref } from 'vue'

import { mount } from '@vue/test-utils'
import VueFinder from '@/components/VueFinder.vue'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock OverlayScrollbars
vi.mock('overlayscrollbars', () => ({
  OverlayScrollbars: vi.fn().mockImplementation((element, options, callbacks) => {
    if (callbacks?.initialized) {
      callbacks.initialized({
        elements: () => ({
          scrollOffsetElement: document.createElement('div')
        })
      })
    }
    return {
      destroy: vi.fn()
    }
  })
}))

// Mock DragSelect
vi.mock('dragselect', () => ({
  default: vi.fn().mockImplementation(() => ({
    subscribe: vi.fn(),
    clearSelection: vi.fn(),
    getSelection: vi.fn().mockReturnValue([]),
    getSelectables: vi.fn().mockReturnValue([]),
    addSelection: vi.fn(),
    setSettings: vi.fn(),
    stop: vi.fn(),
    Interaction: {
      _reset: vi.fn()
    },
    Area: {
      reset: vi.fn()
    }
  }))
}))

// Mock useDragSelect composable
vi.mock('@/composables/useDragSelect', () => ({
  default: vi.fn().mockReturnValue({
    area: ref(null),
    explorerId: 1,
    isDraggingRef: ref(false),
    scrollBar: ref(null),
    scrollBarContainer: ref(null),
    getSelected: vi.fn().mockReturnValue([]),
    getSelection: vi.fn().mockReturnValue([]),
    selectAll: vi.fn(),
    clearSelection: vi.fn(),
    refreshSelection: vi.fn(),
    getCount: vi.fn().mockReturnValue(0),
    onSelect: vi.fn()
  })
}))

// Mock ServiceContainer
const mockServiceContainer = {
  storage: {
    getStore: vi.fn().mockImplementation((key, defaultValue) => defaultValue),
    setStore: vi.fn()
  },
  i18n: {
    t: vi.fn((key) => key)
  },
  emitter: {
    emit: vi.fn(),
    on: vi.fn()
  },
  fs: {
    data: {},
    loading: false,
    adapter: 'local',
    path: '',
    isGoUpAvailable: vi.fn().mockReturnValue(false),
    breadcrumbs: [],
    breadcrumbItems: [],
    hiddenBreadcrumbs: [],
    showHiddenBreadcrumbs: false,
    limitBreadcrumbItems: vi.fn(),
    toggleHiddenBreadcrumbs: vi.fn(),
    parentFolderPath: computed(() => 'local://')
  },
  theme: {
    actualValue: 'light'
  },
  fullScreen: false,
  features: [],
  pinnedFolders: [],
  selectButton: {
    active: false,
    multiple: false,
    click: vi.fn()
  },
  modal: {
    visible: false,
    type: null,
    close: vi.fn(),
    open: vi.fn()
  },
  dragSelect: {
    clearSelection: vi.fn(),
    refreshSelection: vi.fn(),
    onSelect: vi.fn(),
    getSelected: vi.fn().mockReturnValue([]),
    getCount: vi.fn().mockReturnValue(0),
    getSelection: vi.fn().mockReturnValue([]),
    selectAll: vi.fn(),
    area: ref(null),
    explorerId: 1,
    isDraggingRef: ref(false),
    scrollBar: ref(null),
    scrollBarContainer: ref(null)
  },
  requester: {
    send: vi.fn().mockResolvedValue({
      adapter: 'local',
      dirname: '/',
      files: []
    })
  }
}

describe('VueFinder', () => {
  beforeEach(() => {
    // Mock the VueFinderOptions injection
    vi.mock('vue', async () => {
      const actual = await vi.importActual('vue')
      return {
        ...actual,
        inject: vi.fn().mockImplementation((key) => {
          if (key === 'VueFinderOptions') {
            return {
              i18n: {},
              locale: 'en'
            }
          }
          if (key === 'ServiceContainer') {
            return mockServiceContainer
          }
          return {}
        })
      }
    })
  })

  it('mounts renders properly', () => {
    const wrapper = mount(VueFinder, {
      props: {
        request: 'http://localhost:8000/api'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
