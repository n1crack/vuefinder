<template>
  <ModalLayout>
    <div class="sm:items-start select-none">
      <ModalHeader :icon="AboutSVG" :title="'Vuefinder ' + app.version"></ModalHeader>

      <div class="mt-3 sm:mt-0 sm:text-left w-full">
        <div>
          <div>
            <nav class="flex overflow-auto" aria-label="Tabs">
              <button v-for="tab in tabs" :key="tab.name"
                 @click="selectedTab = tab.key "
                 :class="[tab.key === selectedTab ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-sky-500' : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-600', 'px-3 py-2 border-b font-medium text-sm']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</button>
            </nav>
          </div>
        </div>

        <div class="mt-4" v-if="selectedTab === TAB.ABOUT">
          <div class="m-1 text-sm text-gray-500">{{ t('Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications') }}</div>
          <a href="https://vuefinder.ozdemir.be" class="block mt-2 text-sm text-blue-500 dark:text-blue-400" target="_blank">{{ t('Project home') }}</a>
          <a href="https://github.com/n1crack/vuefinder" class="block mt-2 text-sm text-blue-500 dark:text-blue-400" target="_blank">{{ t('Follow on GitHub') }}</a>
        </div>

        <div class="mt-2" v-if="selectedTab === TAB.SETTINGS">
          <div class="m-1 text-sm text-gray-500">
            {{ t('Customize your experience with the following settings') }}
          </div>
          <div class="mt-3 text-left">
            <fieldset>
              <div class="space-y-2">
                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="metric_unit" name="metric_unit" type="checkbox"
                           v-model="app.metricUnits"
                           @click="handleMetricUnits"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="metric_unit" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t('Use Metric Units') }} <action-message class="ms-3" on="vf-metric-units-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>

                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="large_icons" name="large_icons" type="checkbox"
                           v-model="app.compactListView"
                           @click="handleCompactListView"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="large_icons" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t('Compact list view') }} <action-message class="ms-3" on="vf-compact-view-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>

                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="persist_path" name="persist_path" type="checkbox"
                           v-model="app.persist"
                           @click="handlePersistPath"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="persist_path" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t('Persist path on reload') }} <action-message class="ms-3" on="vf-persist-path-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>

                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="show_thumbnails" name="show_thumbnails" type="checkbox"
                           v-model="app.showThumbnails"
                           @click="handleShowThumbnails"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="show_thumbnails" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t('Show thumbnails') }} <action-message class="ms-3" on="vf-show-thumbnails-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>

                <div class="">
                  <div class="h-6 items-center">
                    <label for="theme" class="flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm">
                      {{ t('Theme') }}
                    </label>
                  </div>
                  <div class="flex text-sm">
                    <select id="theme" v-model="app.theme.value" @change="handleTheme($event.target.value)"
                            class="flex-shrink-0 sm:w-1/2 w-full  text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded">
                      <optgroup :label="t('Theme')">
                        <option v-for="(name, key) in themes" :value="key">{{ name }}</option>
                      </optgroup>
                    </select>
                    <action-message class="ms-3 flex-shrink-0 flex-grow basis-full" on="vf-theme-saved">{{ t('Saved.') }}</action-message>
                  </div>
                </div>

                <div class="" v-if="app.features.includes(FEATURES.LANGUAGE) && Object.keys(supportedLanguages).length > 1">
                  <div class="h-6 items-center">
                    <label for="language" class="flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap">
                      {{ t('Language') }}
                    </label>
                  </div>
                  <div class="flex text-sm">
                    <select id="language" v-model="app.i18n.locale"
                            class="flex-shrink-0 sm:w-1/2 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded">
                      <optgroup :label="t('Language')">
                        <option v-for="(language, code) in supportedLanguages" :value="code">{{ language }}</option>
                      </optgroup>
                    </select>
                    <action-message class="ms-3 flex-shrink-0 flex-grow basis-full" on="vf-language-saved">{{ t('Saved.') }}</action-message>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="mt-3" v-if="selectedTab === TAB.SHORTCUTS">
          <div class="space-y-2 sm:w-1/2">
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>{{ t('Rename') }}</div>
              <kbd>F2</kbd>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>{{ t('Refresh') }}</div>
              <kbd>F5</kbd>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Delete') }}
              <kbd>Del</kbd>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Escape') }}
              <div>
                <kbd>Esc</kbd>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Select All') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>A</kbd>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Search') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>F</kbd>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Toggle Sidebar') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>E</kbd>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Open Settings') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>,</kbd>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              {{ t('Toggle Full Screen') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3" v-if="selectedTab === TAB.RESET">
          <div class="m-1 text-sm text-gray-500">
            {{ t('Reset all settings to default') }}
          </div>
          <button @click="clearLocalStorage" type="button" class="vf-btn vf-btn-secondary">
            {{ t('Reset Settings') }}
          </button>
        </div>
      </div>
    </div>
    <template v-slot:buttons>
      <button type="button" @click="app.modal.close()" class="vf-btn vf-btn-secondary">
        {{ t('Close') }}
      </button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue';
import {computed, inject, ref} from 'vue';
import ActionMessage from "../ActionMessage.vue";
import { format as filesizeDefault, metricFormat as filesizeMetric } from '../../utils/filesize.js'
import AboutSVG from "../icons/gear.svg";

import { FEATURES } from '../../features.js';
import ModalHeader from "./ModalHeader.vue";

const app = inject('ServiceContainer');
const {setStore, clearStore} = app.storage;
const {t} = app.i18n;

const TAB = {
  ABOUT: 'about',
  SETTINGS: 'settings',
  SHORTCUTS: 'shortcuts',
  RESET: 'reset',
};

const tabs = computed(() => [
  {name: t('About'), key: TAB.ABOUT},
  {name: t('Settings'), key: TAB.SETTINGS},
  {name: t('Shortcuts'), key: TAB.SHORTCUTS},
  {name: t('Reset'), key: TAB.RESET},
]);

const selectedTab = ref('about');


const clearLocalStorage = async () => {
  clearStore();
  location.reload();
};

const handleTheme = (key) => {
  app.theme.set(key);
  app.emitter.emit('vf-theme-saved');
}

const handleMetricUnits = () => {
  app.metricUnits = !app.metricUnits;
  app.filesize = app.metricUnits ?  filesizeMetric  : filesizeDefault

  setStore('metricUnits', app.metricUnits);
  app.emitter.emit('vf-metric-units-saved');
}

const handleCompactListView = () => {
  app.compactListView = !app.compactListView;

  setStore('compactListView', app.compactListView);
  app.emitter.emit('vf-compact-view-saved');
}

const handleShowThumbnails = () => {
  app.showThumbnails = !app.showThumbnails;

  setStore('show-thumbnails', app.showThumbnails);
  app.emitter.emit('vf-show-thumbnails-saved');
}

const handlePersistPath = () => {
  app.persist = !app.persist;

  setStore('persist-path', app.persist);
  app.emitter.emit('vf-persist-path-saved');
}


const {i18n} = inject('VueFinderOptions');

const languageList = {
  en: 'English',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  fa: 'Persian (فارسی)',
  he: 'Hebrew (עִברִית)',
  hi: 'Hindi (हिंदी)',
  ru: 'Russian (Pусский)',
  sv: 'Swedish (Svenska)',
  tr: 'Turkish (Türkçe)',
  zhCN: 'Simplified Chinese (简体中文)',
  zhTW: 'Traditional Chinese (繁體中文)',
};

// Filter the supportedLanguages object
const supportedLanguages = Object.fromEntries(
  Object.entries(languageList).filter(([key]) => Object.keys(i18n).includes(key))
);

const themes = computed(() => ({
  system: t('System'),
  light: t('Light'),
  dark: t('Dark'),
}));

</script>
