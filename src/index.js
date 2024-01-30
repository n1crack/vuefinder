import VueFinder from './components/VueFinder.vue';
import * as modals from './modals.js';
import 'microtip/microtip.css'
import './assets/css/index.css';

export default {
    /** @param {import('vue').App} app
     * @param options
     */
    install(app, options = {}) {
        // define main component
        app.component("VueFinder", VueFinder);

        // define modals
        for (const modal of Object.values(modals)) {
            app.component(modal.name, modal);
        }

        // define global properties with 'options'

    }
};


