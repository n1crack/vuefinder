import {reactive, ref} from "vue";
import mitt from "mitt";
import {version} from './../package.json';
import {FEATURE_ALL_NAMES} from "./components/features.js";
import {useStorage} from "./composables/useStorage.js";
import {buildRequester} from "./utils/ajax.js";
import {useI18n} from "./composables/useI18n.js";

export default (props) => {
    const storage = useStorage(props.id);

    const {setStore, getStore, clearStore} = storage;

    const setFeatures = (features) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    const emitter = mitt()

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
        emitter: emitter,
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
        // max file size
        maxFileSize: props.maxFileSize,
        // loading state
        loading: false,
        // locale state
        locale: props.locale ?? 'en',
        // default locale
        i18n : useI18n(props.id, props.locale, emitter),
        // modal state
        modal: {
            active: false,
            type: 'delete',
            data: {}
        },
        // main storage adapter
        adapter: getStore('adapter'),
        // storage
        storage: storage,
        // fetched items
        items: {adapter: app.adapter, storages: [], dirname: '.', files: []}
    });
}