import VueFinder from './components/VueFinder.vue';
import './assets/css/style.css';
import { menuItems, ContextMenuIds } from './utils/contextmenu';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


export const VueFinderPlugin = {
    /**
     * @param {import('vue').App} app
     * @param options
     */
    install(app, options = {}) {
        // Reuse pinia if present, otherwise create it
        const existing = app.config && app.config.globalProperties ? app.config.globalProperties.$pinia : null;
        const pinia = existing || createPinia();
        if (!pinia.__vf_persisted) {
            pinia.use(piniaPluginPersistedstate);
            pinia.__vf_persisted = true;
        }
        if (!existing) app.use(pinia);
 
        // define global properties with 'options'
        options.i18n = options.i18n ?? {};
        let [firstLanguage] = Object.keys(options.i18n)
        options.locale = options.locale ?? firstLanguage ?? 'en';

        // unique id for the app options
        app.provide('VueFinderOptions', options);

        // define main component
        app.component("VueFinder", VueFinder);
    }
};

export default VueFinderPlugin;

export {
    VueFinder,
    menuItems as contextMenuItems,
    ContextMenuIds,
}
