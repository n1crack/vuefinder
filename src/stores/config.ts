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
    const state = persistentAtom<ConfigState>(storeKey, DEFAULT_STATE, {
        encode: JSON.stringify,
        decode: JSON.parse,
    })

    // Helper functions
    const init = (defaults: ConfigDefaults = {}) => {
        const currentState = state.get()
        const newState = { ...DEFAULT_STATE, ...defaults, ...currentState }
        state.set(newState)
    }

    const get = <K extends keyof ConfigState>(key: K): ConfigState[K] => {
        return state.get()[key]
    }

    const all = (): ConfigState => {
        return state.get()
    }

    const set = <K extends keyof ConfigState>(
        keyOrPatch: K | Partial<ConfigState>,
        value?: ConfigState[K],
    ): void => {
        const currentState = state.get()
        
        if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
            state.set({ ...currentState, ...keyOrPatch })
        } else {
            state.set({ ...currentState, [keyOrPatch]: value as ConfigState[K] })
        }
    }

    const toggle = (key: keyof ConfigState) => {
        const currentState = state.get()
        set(key, !currentState[key])
    }

    const reset = () => {
        state.set({ ...DEFAULT_STATE })
    }

    return {
        // Store atom
        state,
        
        // Methods
        init,
        get,
        set,
        toggle,
        all,
        reset
    }
}
