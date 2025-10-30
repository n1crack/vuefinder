import VueFinder from './components/VueFinder.vue';
import './assets/css/style.css';
import { menuItems, ContextMenuIds } from './utils/contextmenu';

export const VueFinderPlugin = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(app, options = {}) {
    // define global properties with 'options'
    options.i18n = options.i18n ?? {};
    let [firstLanguage] = Object.keys(options.i18n);
    options.locale = options.locale ?? firstLanguage ?? 'en';

    // unique id for the app options
    app.provide('VueFinderOptions', options);

    // define main component
    app.component('VueFinder', VueFinder);
  },
};

export default VueFinderPlugin;

export { VueFinder, menuItems as contextMenuItems, ContextMenuIds };
