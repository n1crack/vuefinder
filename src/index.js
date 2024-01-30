import VueFinder from './components/VueFinder.vue';
import * as modals from './modals.js';
import 'microtip/microtip.css'
import './assets/css/index.css';
import {reactive, ref} from "vue";
import mitt from "mitt";
import {version} from './../package.json';
import {FEATURE_ALL_NAMES} from "./components/features.js";
import {useStorage} from "./composables/useStorage.js";

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

        // provide god object
        app.provide('VueFinder', reactive({
            // app id
            id: null,
            // app version
            version: version,
            // root element
            root: null,
            // Event Bus
            emitter: mitt(),

            // modals
            features: [...FEATURE_ALL_NAMES],

            darkMode: false,

            view: 'grid',

            fullscreen: false,

            metricUnits: false,

            filesize: null,

            // loading state
            loading: false,

            // modal state
            locale: options.locale ?? 'en',

            // modal state
            modal: {
                active: false,
                type: 'delete',
                data: {}
            }
        }));
    }
};


