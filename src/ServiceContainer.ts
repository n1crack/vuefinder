import {reactive, useTemplateRef, computed, markRaw} from "vue";
import mitt from "mitt";
import {useStorage} from "./composables/useStorage";
import {useI18n} from "./composables/useI18n";
import {FEATURE_ALL_NAMES} from "./features.js";
import {version} from './../package.json';
import { format as filesizeDefault, metricFormat as filesizeMetric } from './utils/filesize'
import useModal from "./composables/useModal";
import { createConfigStore } from "./stores/config";
import {createFilesStore} from "./stores/files.ts";
import type { Adapter } from "./adapters";
import { AdapterManager } from "./adapters";

export default (props: Record<string, unknown>, options: Record<string, unknown>) => {
    const storage = useStorage(props.id as string);
    const emitter = mitt();
    const supportedLocales = options.i18n;
    const initialLang = props.locale ?? options.locale;

    const configStore = createConfigStore(props.id as string, props.config ?? {});
    const filesStore = createFilesStore();

    const setFeatures = (features: unknown) => {
        if (Array.isArray(features)) {
            return features;
        }
        return FEATURE_ALL_NAMES;
    }

    // Wrap adapter with AdapterManager internally
    const rawAdapter = props.adapter as Adapter;
    const adapterManager = new AdapterManager(rawAdapter);

    return reactive({
        // app version
        version: version,
        // config store
        config: configStore,
        // files store
        fs: filesStore,
        // root element
        root: useTemplateRef("root"),
        // app id
        debug: props.debug,
        // Event Bus
        emitter: emitter,
        // storage
        storage: storage,
        // localization object
        i18n: useI18n(storage, initialLang as string, emitter, supportedLocales as Record<string, unknown>),
        // modal state
        modal: useModal(),
        // adapter for file operations (always wrapped with AdapterManager)
        // Use markRaw to prevent TanStack Query from being made reactive
        adapter: markRaw(adapterManager),
        // active features
        features: setFeatures(props.features),
        // selection mode
        selectionMode: props.selectionMode || 'multiple',
        // selection filters - computed properties for better reactivity
        selectionFilterType: computed(() => props.selectionFilterType || 'both'),
        selectionFilterMimeIncludes: computed(() => props.selectionFilterMimeIncludes || []),
        // treeViewData - temp. opened folders
        treeViewData: [],
        // human readable file sizes
        filesize: configStore.get('metricUnits') ? filesizeMetric : filesizeDefault,
        // possible items of the context menu
        contextMenuItems: props.contextMenuItems,
    });
}
