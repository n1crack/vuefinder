import 'pinia-plugin-persistedstate';

declare module 'pinia' {
  // Allow persist option on both options and setup stores
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | import('pinia-plugin-persistedstate').PersistedStateOptions | import('pinia-plugin-persistedstate').PersistedStateOptions[];
  }
}


