import { persistentAtom } from '@nanostores/persistent'
import type { DirEntry } from "@/types.ts"

type Viewport = 'grid' | 'list'

export interface ConfigState {
    view: Viewport
    fullScreen: boolean
    showTreeView: boolean
    compactListView: boolean
    metricUnits: boolean
    showThumbnails: boolean
    persist: boolean
    path: string
    loadingIndicator: 'linear' | 'circular' | string
    maxFileSize: number | string | null
    pinnedFolders: DirEntry[]
    customIcon: unknown
    selectButton: boolean
}

export type ConfigDefaults = Partial<ConfigState>

const DEFAULT_STATE: ConfigState = {
    view: 'grid',
    fullScreen: false,
    showTreeView: false,
    compactListView: true,
    metricUnits: false,
    showThumbnails: true,
    persist: false,
    path: '',
    loadingIndicator: 'circular',
    maxFileSize: null,
    pinnedFolders: [] as DirEntry[],
    customIcon: undefined,
    selectButton: false,
}

// Config store factory function
export const createConfigStore = (id: string) => {
    const storeKey = `vuefinder_config_${id}`
    
    // Create persistent atom with default state
    const configAtom = persistentAtom<ConfigState>(storeKey, DEFAULT_STATE, {
        encode: JSON.stringify,
        decode: JSON.parse,
    })

    // Helper functions
    const init = (defaults: ConfigDefaults = {}) => {
        const currentState = configAtom.get()
        const newState = { ...DEFAULT_STATE, ...defaults, ...currentState }
        configAtom.set(newState)
    }

    const get = <K extends keyof ConfigState>(key: K): ConfigState[K] => {
        return configAtom.get()[key]
    }

    const all = (): ConfigState => {
        return configAtom.get()
    }

    const set = <K extends keyof ConfigState>(
        keyOrPatch: K | Partial<ConfigState>,
        value?: ConfigState[K],
    ): void => {
        const currentState = configAtom.get()
        
        if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
            configAtom.set({ ...currentState, ...keyOrPatch })
        } else {
            configAtom.set({ ...currentState, [keyOrPatch]: value as ConfigState[K] })
        }
    }

    const toggle = (key: keyof ConfigState) => {
        const currentState = configAtom.get()
        set(key, !currentState[key])
    }

    const reset = () => {
        configAtom.set({ ...DEFAULT_STATE })
    }

    return {
        // Store atom
        configAtom,
        
        // Methods
        init,
        get,
        set,
        toggle,
        all,
        reset
    }
}

// Legacy compatibility - create a default config store
export const useConfigStore = (id: string) => createConfigStore(id)
