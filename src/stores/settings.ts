import { defineStore } from 'pinia';
import { reactive, ref, toRefs } from 'vue';

export interface SettingsDefaults {
  view?: 'grid' | 'list';
  fullScreen?: boolean;
  showTreeView?: boolean;
  pinnedFolders?: string[];
  compactListView?: boolean;
  metricUnits?: boolean;
  showThumbnails?: boolean;
  persist?: boolean;
  loadingIndicator?: 'bar' | 'spinner' | string;
  customIcon?: unknown;
  selectButton?: boolean;
  maxFileSize?: number | string | null;
}

export const useSettingsStore = defineStore('settings', () => {
  const currentId = ref<string>('');

  const settings = reactive({
    view: 'grid' as 'grid' | 'list',
    fullScreen: false as boolean,
    showTreeView: false as boolean,
    pinnedFolders: [] as string[],
    compactListView: true as boolean,
    metricUnits: false as boolean,
    showThumbnails: true as boolean,
    persist: false as boolean,
    loadingIndicator: 'bar' as string,
    customIcon: undefined as unknown,
    selectButton: false as boolean,
    maxFileSize: null as number | string | null,
  });

  function init(id: string, defaults: SettingsDefaults = {}) {
    if (!currentId.value) currentId.value = id;
    if (defaults && Object.keys(defaults).length > 0) {
      Object.assign(settings, defaults);
    }
  }

  return {
    currentId,
    settings,
    ...toRefs(settings),
    init,
  };
}, {
  persist: true,
});


