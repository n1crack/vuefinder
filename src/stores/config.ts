import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

type Viewport = 'grid' | 'list'

export interface ConfigState {
  view: Viewport
  fullScreen: boolean
  showTreeView: boolean
  compactListView: boolean
  metricUnits: boolean
  showThumbnails: boolean
  persist: boolean
  loadingIndicator: 'bar' | 'spinner' | string
  maxFileSize: number | string | null
  pinnedFolders: string[]
  customIcon: unknown
  selectButton: boolean
}

export type ConfigDefaults = Partial<ConfigState>

export const useConfigStore = defineStore('config', () => {
  const state = reactive<ConfigState>({
    // view state
    view: 'grid',
    // full screen state
    fullScreen: false,
    // show tree view state
    showTreeView: false,
    // compact list view state
    compactListView: true,
    // metric units state
    metricUnits: false,
    // show thumbnails state
    showThumbnails: true,
    // persist state
    persist: false,
    // loading indicator state
    loadingIndicator: 'spinner',
    // max file size state
    maxFileSize: null,
    // pinned folders state
    pinnedFolders: [],
    // custom icon state
    customIcon: undefined,
    // select button state
    selectButton: false,
  })

  function init(defaults: ConfigDefaults = {}) {
    Object.assign(state, defaults)
  }

  function get<K extends keyof ConfigState>(key: K): ConfigState[K] {
    return state[key]
  }

  function all(): ConfigState {
    return state
  }

  function set<K extends keyof ConfigState>(key: K, value: ConfigState[K]): void
  function set(patch: Partial<ConfigState>): void
  function set<K extends keyof ConfigState>(
    keyOrPatch: K | Partial<ConfigState>,
    value?: ConfigState[K],
  ): void {
    if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
      Object.assign(state, keyOrPatch)
    } else {
      ;(state as ConfigState)[keyOrPatch] = value as ConfigState[K]
    }
  }


  function toggle(key: keyof ConfigState) {
    set(key, !state[key])
  }

    return {
        ...toRefs(state),
        init,
        get,
        set,
        toggle,
        all
    }
}, {
  persist: true,
})
