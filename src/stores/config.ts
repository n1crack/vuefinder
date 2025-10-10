import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

type Viewport = 'grid' | 'list'

export interface ConfigState {
  view: Viewport
  fullScreen: boolean
  showTreeView: boolean
  pinnedFolders: string[]
  compactListView: boolean
  metricUnits: boolean
  showThumbnails: boolean
  persist: boolean
  loadingIndicator: 'bar' | 'spinner' | string
  customIcon: unknown
  selectButton: boolean
  maxFileSize: number | string | null
}

export type ConfigDefaults = Partial<ConfigState>

export const useConfigStore = defineStore('config', () => {
  // 🧠 1. reactive state (Pinia persist ile tam uyumlu)
  const state = reactive<ConfigState>({
    view: 'grid',
    fullScreen: false,
    showTreeView: false,
    pinnedFolders: [],
    compactListView: true,
    metricUnits: false,
    showThumbnails: true,
    persist: false,
    loadingIndicator: 'spinner',
    customIcon: undefined,
    selectButton: false,
    maxFileSize: null,
  })

  // ⚙️ 2. Varsayılan ayarları başlat
  function init(defaults: ConfigDefaults = {}) {
    Object.assign(state, defaults)
  }

  // 🎯 3. Tip güvenli getter
  function get<K extends keyof ConfigState>(key: K): ConfigState[K] {
    return state[key]
  }

  // 🧩 4. Tip güvenli setter (tek anahtar veya patch)
  function set<K extends keyof ConfigState>(key: K, value: ConfigState[K]): void
  function set(patch: Partial<ConfigState>): void
  function set<K extends keyof ConfigState>(
    keyOrPatch: K | Partial<ConfigState>,
    value?: ConfigState[K],
  ): void {
    if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
      Object.assign(state, keyOrPatch)
    } else {
      // Type-safe assignment for a specific config key
      ;(state as ConfigState)[keyOrPatch] = value as ConfigState[K]
    }
  }
      return {
        ...toRefs(state),
        init,
        get,
        set,
      }
}, {
  persist: true,
})
