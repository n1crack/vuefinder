import { atom, computed } from 'nanostores'
export interface SearchState {
    query: string
    searchMode: boolean
}

const DEFAULT_SEARCH_STATE: SearchState = {
    query: '',
    searchMode: false,
}

// Search store factory function
export const createSearchStore = () => {
    // Create normal atom with default state (not persistent)
    const state = atom<SearchState>(DEFAULT_SEARCH_STATE)

    // Computed values
    const hasQuery = computed(state, (state) => state.query.length > 0)

    // Helper functions
    const setQuery = (newQuery: string) => {
        const currentState = state.get()
        state.set({ ...currentState, query: newQuery ?? '' })
    }

    const enterSearchMode = () => {
        const currentState = state.get()
        state.set({ ...currentState, searchMode: true })
    }

    const exitSearchMode = () => {
        state.set({ query: '', searchMode: false })
    }

    const get = <K extends keyof SearchState>(key: K): SearchState[K] => {
        return state.get()[key]
    }

    const all = (): SearchState => {
        return state.get()
    }

    const set = <K extends keyof SearchState>(
        keyOrPatch: K | Partial<SearchState>,
        value?: SearchState[K],
    ): void => {
        const currentState = state.get()
        
        if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
            state.set({ ...currentState, ...keyOrPatch })
        } else {
            state.set({ ...currentState, [keyOrPatch]: value as SearchState[K] })
        }
    }

    const reset = () => {
        state.set({ ...DEFAULT_SEARCH_STATE })
    }

    return {
        // Store atom
        state,
        
        // Computed values
        hasQuery,
        
        // Methods
        setQuery,
        enterSearchMode,
        exitSearchMode,
        get,
        set,
        all,
        reset
    }
}
