import VueFinder from './components/VueFinder.vue';
import 'microtip/microtip.css'
import './assets/css/style.scss';

export default {
    /**
     * @param {import('vue').App} app
     * @param options
     */
    install(app, options = {}) {
        // define main component
        app.component("VueFinder", VueFinder);

        // define global properties with 'options'
        options.i18n = options.i18n ?? {};
        let [firstLanguage] = Object.keys(options.i18n)
        options.locale = options.locale ?? firstLanguage ?? 'en';

        // unique id for the app options
        app.provide('VueFinderOptions', options);
    }
};


