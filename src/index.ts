import VueFinder from './components/VueFinderProvider.vue';
import VueFinderProvider from './components/VueFinderProvider.vue';
import './assets/css/style.css';
import { menuItems as contextMenuItems, ContextMenuIds } from './utils/contextmenu';
import { type App } from 'vue';
import { RemoteDriver, ArrayDriver, IndexedDBDriver } from './adapters';

type VueFinderOptions = {
  i18n?: Record<string, unknown>;
  locale?: string;
};

export const VueFinderPlugin = {
  install(app: App, options: VueFinderOptions = {}) {
    // define global properties with 'options'
    options.i18n = options.i18n ?? {};
    const [firstLanguage] = Object.keys(options.i18n);
    options.locale = options.locale ?? firstLanguage ?? 'en';

    // unique id for the app options
    app.provide('VueFinderOptions', options);

    // define main components
    app.component('VueFinder', VueFinder);
  },
};

export default VueFinderPlugin;

export { VueFinder, VueFinderProvider, contextMenuItems, ContextMenuIds };

export { RemoteDriver, ArrayDriver, IndexedDBDriver };

// Export types from types.ts
export type {
  DirEntry,
  ItemDclickEvent,
  VueFinderProps,
  FsData,
  SelectEvent,
  UpdatePathEvent,
} from './types';

// Export context menu item type
export type { Item } from './utils/contextmenu';

// Export types from adapters/types.ts
export type {
  Driver,
  ListParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  SearchParams,
  SaveParams,
  FileContentResult,
  DeleteResult,
  FileOperationResult,
  RemoteDriverConfig,
  RemoteDriverUrls,
  UploaderContext,
} from './adapters/types';

// Export types from features
export type { FeaturesConfig, FeaturesPreset, FeatureName } from './features';

// Export types from stores/config
export type {
  ConfigStore,
  ConfigState,
  ConfigDefaults,
  PersistenceConfigState,
  NonPersistenceConfigState,
} from './stores/config';

// Export types from stores/theme
export type { Theme } from './stores/theme';
