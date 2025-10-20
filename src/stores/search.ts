import { atom } from 'nanostores'
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

    // Helper functions
    const setQuery = (newQuery: string, updateSearchMode: false) => {
        const query = newQuery ?? ''
        const searchMode = updateSearchMode ? query.length > 0 : state.get().searchMode;
        state.set({ query, searchMode})
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
