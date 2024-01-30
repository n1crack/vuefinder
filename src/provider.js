import {reactive, ref} from "vue";
import mitt from "mitt";
import {version} from './../package.json';
import {FEATURE_ALL_NAMES} from "./components/features.js";
import {useStorage} from "./composables/useStorage.js";
import {buildRequester} from "./utils/ajax.js";
import {useI18n} from "./composables/useI18n.js";

export default (props) => {
    const {setStore, getStore, clearStore} = useStorage(props.id);

    const setFeatures = (features) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    return reactive({
        // app id
        id: null,
        // app version
        version: version,
        // root element
        root: null,
        // app id
        debug: props.debug,
        // Event Bus
        emitter: mitt(),
        // modals
        features: setFeatures(props.features),
        // http object
        requester : buildRequester(props.request),
        // theme state
        darkMode: getStore('darkMode', props.dark),
        // view state
        view: 'grid',
        // fullscreen state
        fullscreen: false,
        // unit state - for example: GB or GiB
        metricUnits: getStore('metricUnits', false),
        // human readable file sizes
        filesize: null,
        // loading state
        loading: false,
        // locale state
        locale: props.locale ?? 'en',
        // defaılt locale
        i18n : useI18n(props.id, props.locale, app.emitter),
        // modal state
        modal: {
            active: false,
            type: 'delete',
            data: {}
        },
        adapter: getStore('adapter'),

    });
}
