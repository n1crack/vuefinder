import {reactive} from "vue";
import mitt from "mitt";
import {buildRequester} from "./utils/ajax";
import {useStorage} from "./composables/useStorage";
import {useI18n} from "./composables/useI18n";
import {FEATURE_ALL_NAMES} from "./features.js";
import {version} from './../package.json';
import { format as filesizeDefault, metricFormat as filesizeMetric } from './utils/filesize'
import useTheme from './composables/useTheme';
import useModal from "./composables/useModal";
import { useConfigStore } from "./stores/config";

/**
 * @param {import('./types.js').VueFinderProps} props
 * @param options
 */
export default (props, options) => {
    const storage = useStorage(props.id);
    const emitter = mitt();
    const config = useConfigStore();
    const theme = useTheme(storage, props.theme);
    const supportedLocales = options.i18n;
    const initialLang = props.locale ?? options.locale;

    const setFeatures = (features) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    return reactive({
        /** 
        * Core properties
        * */

        // app version
        version: version,
        // root element
        root: null,
        // app id
        debug: props.debug,
        // Event Bus
        emitter: emitter,
        // storage
        storage: storage,
        // localization object
        i18n: useI18n(storage, initialLang, emitter, supportedLocales),
        // modal state
        modal: useModal(),
        // http object
        requester : buildRequester(props.request),
        // active features
        features: setFeatures(props.features),
        // pinnedFolders
        pinnedFolders: storage.getStore('pinned-folders', props.pinnedFolders),
        // treeViewData
        treeViewData: [], 

        /**
        * Settings
        * */

        // theme state
        theme: theme,
        // human readable file sizes
        filesize: config.metricUnits ? filesizeMetric : filesizeDefault,
        // possible items of the context menu
        contextMenuItems: props.contextMenuItems,
        // custom icon
        customIcon: props.icon,
        // selectButton state
        selectButton: props.selectButton,
    });
}
