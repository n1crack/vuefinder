import VueFinder from './components/VueFinderProvider.vue';
import VueFinderProvider from './components/VueFinderProvider.vue';
import './assets/css/style.css';
import { menuItems as contextMenuItems, ContextMenuIds } from './utils/contextmenu';
import { type App } from 'vue';
import {
  RemoteDriver,
  ArrayDriver,
  IndexedDBDriver,
  BaseAdapter,
  parseBackendError,
} from './adapters';
import { useVueFinder } from './composables/useVueFinder';
import { useMenuItems } from './composables/useMenuItems';
import { useBreadcrumbActions } from './composables/useBreadcrumbActions';

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
export { useVueFinder, useMenuItems, useBreadcrumbActions };

export { RemoteDriver, ArrayDriver, IndexedDBDriver, BaseAdapter, parseBackendError };

// Export types from types.ts
export type {
  DirEntry,
  ItemDclickEvent,
  VueFinderProps,
  FsData,
  SelectEvent,
  UpdatePathEvent,
  NotifyEvent,
  NotifyPayload,
  VueFinderComposable,
  MenuItem,
} from './types';

// Export context menu item type
export type { Item } from './utils/contextmenu';

// Export driver config types
export type { ArrayDriverConfig } from './adapters/ArrayDriver';
export type { IndexedDBDriverConfig } from './adapters/IndexedDBDriver';

// Export types from adapters/types.ts
export type {
  Driver,
  ListParams,
  DeleteParams,
  RenameParams,
  TransferParams,
  ArchiveParams,
  UnarchiveParams,
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

// Export i18n utilities
export { createLocaleAtom } from './stores/i18n';
