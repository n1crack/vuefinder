import {computed, reactive} from "vue";
import mitt from "mitt";
import {buildRequester} from "./utils/ajax.js";
import {useStorage} from "./composables/useStorage.js";
import {useI18n} from "./composables/useI18n.js";
import {FEATURE_ALL_NAMES, FEATURES} from "./components/features.js";
import {version} from './../package.json';
import { format as filesizeDefault, metricFormat as filesizeMetric } from './utils/filesize.js'
import useTheme from './composables/useTheme.js';

export default (props, options) => {
    const storage = useStorage(props.id);
    const emitter = mitt()
    const metricUnits = storage.getStore('metricUnits', false);
    const theme = useTheme(storage, props.theme);
    const supportedLocales = options.i18n;
    const initialLang = props.locale ?? options.locale;
    const i18n = computed(() => useI18n(storage, initialLang, emitter, supportedLocales));

    const setFeatures = (features) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    const path = props.persist ? storage.getStore('path', props.path) : props.path;

    return reactive({
        // app version
        version: version,
        // root element
        root: null,
        // app id
        debug: props.debug,
        // Event Bus
        emitter: emitter,
        // active features
        features: setFeatures(props.features),
        // http object
        requester : buildRequester(props.request),
        // theme state
        theme: theme,
        // view state
        view: storage.getStore('viewport', 'grid'),
        // fullscreen state
        fullScreen: storage.getStore('full-screen', props.fullScreen),
        // selectButton state
        selectButton: props.selectButton,
        // unit state - for example: GB or GiB
        metricUnits: metricUnits,
        // human readable file sizes
        filesize: metricUnits ? filesizeMetric  : filesizeDefault,
        // max file size
        maxFileSize: props.maxFileSize,
        // loading state
        loading: false,
        // default locale
        i18n : i18n,
        // modal state
        modal: {
            active: false,
            type: 'delete',
            data: {}
        },
        // main storage adapter
        adapter: storage.getStore('adapter'),
        // main storage adapter
        path: path,
        // persist state
        persist: props.persist,
        // storage
        storage: storage,
        // fetched items
        data: {adapter: storage.getStore('adapter'), storages: [], dirname: path, files: []},
        // selected items
        selectedItems: [],
    });
}
