import { atom } from 'nanostores'
import { computed } from 'nanostores'

export interface SearchState {
    query: string
    searchMode: boolean
}

const DEFAULT_SEARCH_STATE: SearchState = {
    query: '',
    searchMode: false,
}

// Search store factory function
export const createSearchStore = (id: string) => {
    // Create normal atom with default state (not persistent)
    const searchAtom = atom<SearchState>(DEFAULT_SEARCH_STATE)

    // Computed values
    const hasQuery = computed(searchAtom, (state) => state.query.length > 0)

    // Helper functions
    const setQuery = (newQuery: string) => {
        const currentState = searchAtom.get()
        searchAtom.set({ ...currentState, query: newQuery ?? '' })
    }

    const enterSearchMode = () => {
        const currentState = searchAtom.get()
        searchAtom.set({ ...currentState, searchMode: true })
    }

    const exitSearchMode = () => {
        searchAtom.set({ query: '', searchMode: false })
    }

    const get = <K extends keyof SearchState>(key: K): SearchState[K] => {
        return searchAtom.get()[key]
    }

    const all = (): SearchState => {
        return searchAtom.get()
    }

    const set = <K extends keyof SearchState>(
        keyOrPatch: K | Partial<SearchState>,
        value?: SearchState[K],
    ): void => {
        const currentState = searchAtom.get()
        
        if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
            searchAtom.set({ ...currentState, ...keyOrPatch })
        } else {
            searchAtom.set({ ...currentState, [keyOrPatch]: value as SearchState[K] })
        }
    }

    const reset = () => {
        searchAtom.set({ ...DEFAULT_SEARCH_STATE })
    }

    return {
        // Store atom
        searchAtom,
        
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

// Legacy compatibility - create a default search store
export const useSearchStore = (id: string) => createSearchStore(id)
