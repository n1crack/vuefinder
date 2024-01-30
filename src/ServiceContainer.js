import {reactive} from "vue";
import mitt from "mitt";
import {buildRequester} from "./utils/ajax.js";
import {useStorage} from "./composables/useStorage.js";
import {useI18n} from "./composables/useI18n.js";
import {FEATURE_ALL_NAMES} from "./components/features.js";
import {version} from './../package.json';
import { format as filesizeDefault, metricFormat as filesizeMetric } from './utils/filesize.js'

export default (props) => {
    const storage = useStorage(props.id);
    const emitter = mitt()
    const metricUnits = storage.getStore('metricUnits', false);

    const setFeatures = (features) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    return reactive({
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
        darkMode: storage.getStore('darkMode', props.dark),
        // view state
        view: storage.getStore('viewport', 'grid'),
        // fullscreen state
        fullscreen: storage.getStore('full-screen', false),
        // unit state - for example: GB or GiB
        metricUnits: metricUnits,
        // human readable file sizes
        filesize: metricUnits ? filesizeMetric  : filesizeDefault,
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
        adapter: storage.getStore('adapter'),
        // storage
        storage: storage,
        // fetched items
        data: {adapter: app.adapter, storages: [], dirname: '.', files: []}
    });
}
