<template>
  <ModalLayout>
    <div class="vuefinder__about-modal__content">
      <ModalHeader :icon="AboutSVG" :title="'Vuefinder ' + app.version"></ModalHeader>

      <div class="vuefinder__about-modal__main">
        <div>
          <div>
            <nav class="vuefinder__about-modal__tabs" aria-label="Tabs">
              <button v-for="tab in tabs" :key="tab.name"
                @click="selectedTab = tab.key"
                :class="[tab.key === selectedTab ? 'vuefinder__about-modal__tab--active' : 'vuefinder__about-modal__tab--inactive', 'vuefinder__about-modal__tab']" :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</button>
            </nav>
          </div>
        </div>

        <div class="vuefinder__about-modal__tab-content" v-if="selectedTab === TAB.ABOUT">
          <div class="vuefinder__about-modal__description">{{ t('Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications') }}</div>
          <a href="https://vuefinder.ozdemir.be" class="vuefinder__about-modal__link" target="_blank">{{ t('Project home') }}</a>
          <a href="https://github.com/n1crack/vuefinder" class="vuefinder__about-modal__link" target="_blank">{{ t('Follow on GitHub') }}</a>
        </div>

        <div class="vuefinder__about-modal__tab-content" v-if="selectedTab === TAB.SETTINGS">
          <div class="vuefinder__about-modal__description">
            {{ t('Customize your experience with the following settings') }}
          </div>
          <div class="vuefinder__about-modal__settings">
            <fieldset>
              <div class="vuefinder__about-modal__setting flex">
                <div class="vuefinder__about-modal__setting-input">
                  <input id="metric_unit" name="metric_unit" type="checkbox"
                         v-model="app.metricUnits"
                         @click="handleMetricUnits"
                         class="vuefinder__about-modal__checkbox">
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <label for="metric_unit" class="vuefinder__about-modal__label">
                    {{ t('Use Metric Units') }} <action-message class="ms-3" on="vf-metric-units-saved">{{ t('Saved.') }}</action-message>
                  </label>
                </div>
              </div>

              <div class="vuefinder__about-modal__setting flex">
                <div class="vuefinder__about-modal__setting-input">
                  <input id="large_icons" name="large_icons" type="checkbox"
                         v-model="app.compactListView"
                         @click="handleCompactListView"
                         class="vuefinder__about-modal__checkbox">
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <label for="large_icons" class="vuefinder__about-modal__label">
                    {{ t('Compact list view') }} <action-message class="ms-3" on="vf-compact-view-saved">{{ t('Saved.') }}</action-message>
                  </label>
                </div>
              </div>

              <div class="vuefinder__about-modal__setting flex">
                <div class="vuefinder__about-modal__setting-input">
                  <input id="persist_path" name="persist_path" type="checkbox"
                         v-model="app.persist"
                         @click="handlePersistPath"
                         class="vuefinder__about-modal__checkbox">
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <label for="persist_path" class="vuefinder__about-modal__label">
                    {{ t('Persist path on reload') }} <action-message class="ms-3" on="vf-persist-path-saved">{{ t('Saved.') }}</action-message>
                  </label>
                </div>
              </div>

              <div class="vuefinder__about-modal__setting flex">
                <div class="vuefinder__about-modal__setting-input">
                  <input id="show_thumbnails" name="show_thumbnails" type="checkbox"
                         v-model="app.showThumbnails"
                         @click="handleShowThumbnails"
                         class="vuefinder__about-modal__checkbox">
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <label for="show_thumbnails" class="vuefinder__about-modal__label">
                    {{ t('Show thumbnails') }} <action-message class="ms-3" on="vf-show-thumbnails-saved">{{ t('Saved.') }}</action-message>
                  </label>
                </div>
              </div>

              <div class="vuefinder__about-modal__setting ">
                <div class="vuefinder__about-modal__setting-input">
                  <label for="theme" class="vuefinder__about-modal__label">
                    {{ t('Theme') }}
                  </label>
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <select id="theme" v-model="app.theme.value" @change="handleTheme($event.target.value)"
                          class="vuefinder__about-modal__select">
                    <optgroup :label="t('Theme')">
                      <option v-for="(name, key) in themes" :value="key">{{ name }}</option>
                    </optgroup>
                  </select>
                  <action-message class="ms-3" on="vf-theme-saved">{{ t('Saved.') }}</action-message>
                </div>
              </div>

              <div class="vuefinder__about-modal__setting" v-if="app.features.includes(FEATURES.LANGUAGE) && Object.keys(supportedLanguages).length > 1">
                <div class="vuefinder__about-modal__setting-input">
                  <label for="language" class="vuefinder__about-modal__label">
                    {{ t('Language') }}
                  </label>
                </div>
                <div class="vuefinder__about-modal__setting-label">
                  <select id="language" v-model="app.i18n.locale"
                          class="vuefinder__about-modal__select">
                    <optgroup :label="t('Language')">
                      <option v-for="(language, code) in supportedLanguages" :value="code">{{ language }}</option>
                    </optgroup>
                  </select>
                  <action-message class="ms-3" on="vf-language-saved">{{ t('Saved.') }}</action-message>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="vuefinder__about-modal__tab-content" v-if="selectedTab === TAB.SHORTCUTS">
          <div class="vuefinder__about-modal__shortcuts">
            <div class="vuefinder__about-modal__shortcut">
              <div>{{ t('Rename') }}</div>
              <kbd>F2</kbd>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              <div>{{ t('Refresh') }}</div>
              <kbd>F5</kbd>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Delete') }}
              <kbd>Del</kbd>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Escape') }}
              <div>
                <kbd>Esc</kbd>
              </div>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Select All') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>A</kbd>
              </div>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Search') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>F</kbd>
              </div>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Toggle Sidebar') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>E</kbd>
              </div>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Open Settings') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>,</kbd>
              </div>
            </div>
            <div class="vuefinder__about-modal__shortcut">
              {{ t('Toggle Full Screen') }}
              <div>
                <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
              </div>
            </div>
          </div>
        </div>

        <div class="vuefinder__about-modal__tab-content" v-if="selectedTab === TAB.RESET">
          <div class="vuefinder__about-modal__description">
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
  ar: 'Arabic (العربيّة)',
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
