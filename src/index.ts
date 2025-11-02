import VueFinder from './components/VueFinderProvider.vue';
import VueFinderProvider from './components/VueFinderProvider.vue';
import './assets/css/style.css';
import { menuItems as contextMenuItems, ContextMenuIds } from './utils/contextmenu';
import { type App } from 'vue';

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
