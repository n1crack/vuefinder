import { persistentAtom } from '@nanostores/persistent'
import type { DirEntry } from "@/types.ts"
import type { Theme } from './theme.ts'
import type { Store } from 'nanostores'

type Viewport = 'grid' | 'list'

export interface ConfigStore {
    state: Store<ConfigState>;
    set: <K extends keyof ConfigState>(keyOrPatch: K | Partial<ConfigState>, value?: ConfigState[K]) => void;
}
export interface ConfigState {
    view: Viewport
    theme: Theme | undefined
    fullScreen: boolean
    showTreeView: boolean
    showHiddenFiles: boolean
    compactListView: boolean
    metricUnits: boolean
    showThumbnails: boolean
    persist: boolean
    path: string
    initialPath: string | null
    loadingIndicator: 'linear' | 'circular' | string
    maxFileSize: number | string | null
    pinnedFolders: DirEntry[]
}

export type ConfigDefaults = Partial<ConfigState>

const DEFAULT_STATE: ConfigState = {
    view: 'grid',
    theme: undefined,
    fullScreen: false,
    showTreeView: false,
    showHiddenFiles: true,
    compactListView: true,
    metricUnits: false,
    showThumbnails: true,
    persist: false,
    path: '',
    initialPath: null,
    loadingIndicator: 'circular',
    maxFileSize: null,
    pinnedFolders: [] as DirEntry[],
}

// Config store factory function
export const createConfigStore = (id: string, initialConfig: ConfigDefaults | Record<string, unknown> = {}) => {
    const storeKey = `vuefinder_config_${id}`
    
    // Create persistent atom with default state
    const state = persistentAtom<ConfigState>(storeKey, { ...DEFAULT_STATE, ...initialConfig }, {
        encode: JSON.stringify,
        decode: JSON.parse,
    })

    // Helper functions
    const init = (defaults: ConfigDefaults | Record<string, unknown> = {}) => {
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
