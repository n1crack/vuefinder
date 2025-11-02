import { reactive, computed, markRaw } from 'vue';
import mitt from 'mitt';
import { useStorage } from './composables/useStorage';
import { useI18n } from './composables/useI18n';
import { normalizeFeatures } from './features';
import { version } from './../package.json';
import { format as filesizeDefault, metricFormat as filesizeMetric } from './utils/filesize';
import useModal from './composables/useModal';
import { createConfigStore } from './stores/config';
import { createFilesStore } from './stores/files.ts';
import { AdapterManager } from './adapters';
import { useTheme } from './composables/useTheme';
import type { ConfigStore } from './stores/config';
import type { VueFinderProps } from './types';

export default (props: VueFinderProps, options: Record<string, unknown>): any => {
  const storage = useStorage(props.id ?? 'vf');
  const emitter = mitt();
  const supportedLocales = options.i18n;
  const initialLang = props.locale ?? options.locale;

  const configStore: ConfigStore = createConfigStore(props.id ?? 'vf', props.config ?? {});
  const filesStore = createFilesStore();

  // Driver is required - VueFinder should provide it via defaults
  if (!props.driver) {
    throw new Error('Driver is required for VueFinder');
  }
  const adapterManager = new AdapterManager(props.driver);

  return reactive({
    // app version
    version: version,
    // config store
    config: configStore,

    // Theme
    theme: (() => {
      const themeCtl = useTheme(configStore);
      return {
        current: themeCtl.current,
        set: themeCtl.set,
      };
    })(),
    // files store
    fs: filesStore,
    // root element
    root: null as HTMLElement | null,
    // app id
    debug: props.debug ?? false,
    // Event Bus
    emitter: emitter,
    // storage
    storage: storage,
    // localization object
    i18n: useI18n(
      storage,
      initialLang as string,
      emitter,
      supportedLocales as Record<string, unknown>
    ),
    // modal state
    modal: useModal(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: markRaw(adapterManager),
    // active features
    features: normalizeFeatures(props.features),
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
    // expose custom uploader if provided
    customUploader: props.customUploader,
  });
};
