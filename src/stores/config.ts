import {defineStore} from 'pinia'
import {reactive, toRefs} from 'vue'
import type {DirEntry} from "@/types.ts";

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
    pinnedFolders: DirEntry[],
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

export const useConfigStore = defineStore('config', () => {
    const state = reactive<ConfigState>(Object.assign({}, DEFAULT_STATE))

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

    function reset() {
        init(Object.assign({}, DEFAULT_STATE))
    }

    return {
        ...toRefs(state),
        init,
        get,
        set,
        toggle,
        all,
        reset
    }
}, {
    persist: true,
})
