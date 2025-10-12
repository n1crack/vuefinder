import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSearchStore = (id:string) => defineStore('search_' + id, () => {
  const query = ref<string>('');
  const searchMode = ref<boolean>(false);

  const hasQuery = computed(() => query.value.length > 0);

  function setQuery(newQuery: string) {
    query.value = newQuery ?? '';
  }

  function enterSearchMode() {
    searchMode.value = true;
  }

  function exitSearchMode() {
    searchMode.value = false;
    query.value = '';
  }

  return {
    // state
    query,
    searchMode,
    // getters
    hasQuery,
    // actions
    setQuery,
    enterSearchMode,
    exitSearchMode,
  };
});


