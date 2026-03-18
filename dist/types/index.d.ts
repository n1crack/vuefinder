import VueFinder from './components/VueFinderProvider.vue';
import VueFinderProvider from './components/VueFinderProvider.vue';
import './assets/css/style.css';
import { menuItems as contextMenuItems, ContextMenuIds } from './utils/contextmenu';
import { type App } from 'vue';
import { RemoteDriver, ArrayDriver, IndexedDBDriver, BaseAdapter, parseBackendError } from './adapters';
import { useVueFinder } from './composables/useVueFinder';
type VueFinderOptions = {
    i18n?: Record<string, unknown>;
    locale?: string;
};
export declare const VueFinderPlugin: {
    install(app: App, options?: VueFinderOptions): void;
};
export default VueFinderPlugin;
export { VueFinder, VueFinderProvider, contextMenuItems, ContextMenuIds };
export { useVueFinder };
export { RemoteDriver, ArrayDriver, IndexedDBDriver, BaseAdapter, parseBackendError };
export type { DirEntry, ItemDclickEvent, VueFinderProps, FsData, SelectEvent, UpdatePathEvent, NotifyEvent, NotifyPayload, VueFinderComposable, } from './types';
export type { Item } from './utils/contextmenu';
export type { Driver, ListParams, DeleteParams, RenameParams, TransferParams, ArchiveParams, SearchParams, SaveParams, FileContentResult, DeleteResult, FileOperationResult, RemoteDriverConfig, RemoteDriverUrls, UploaderContext, } from './adapters/types';
export type { FeaturesConfig, FeaturesPreset, FeatureName } from './features';
export type { ConfigStore, ConfigState, ConfigDefaults, PersistenceConfigState, NonPersistenceConfigState, } from './stores/config';
export type { Theme } from './stores/theme';
export { createLocaleAtom } from './stores/i18n';
