<script setup lang="ts">
import { computed, inject } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeatures } from '../../composables/useFeatures';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import ActionMessage from '../../components/ActionMessage.vue';
import { format as filesizeDefault, metricFormat as filesizeMetric } from '../../utils/filesize';
import { themes, type Theme } from '../../stores/theme';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../../stores/config';
import SettingsIcon from '../../assets/icons/gear.svg';

const app = useApp();
const { enabled } = useFeatures();
const config = app.config;
const { clearStore } = app.storage;
const { t } = app.i18n;

// Reactive store for config
const configState: StoreValue<ConfigState> = useStore(config.state);

// Selected theme computed
const selectedTheme = computed<Theme>(() => {
  const stored = configState.value.theme;
  return stored || 'light';
});

const clearLocalStorage = async () => {
  config.reset();
  clearStore();
  location.reload();
};

const handleTheme = (source: Theme) => {
  config.set('theme', source as Theme);
  app.emitter.emit('vf-theme-saved');
};

const handleMetricUnits = () => {
  config.toggle('metricUnits');
  app.filesize = config.get('metricUnits') ? filesizeMetric : filesizeDefault;
  app.emitter.emit('vf-metric-units-saved');
};

const handleCompactListView = () => {
  config.toggle('compactListView');
  app.emitter.emit('vf-compact-view-saved');
};

const handlePersistPath = () => {
  config.toggle('persist');
  app.emitter.emit('vf-persist-path-saved');
};

const { i18n } = inject('VueFinderOptions') as unknown as { i18n: Record<string, unknown> };

const languageList = {
  ar: 'Arabic (العربيّة)',
  zhCN: 'Chinese-Simplified (简体中文)',
  zhTW: 'Chinese-Traditional (繁體中文)',
  nl: 'Dutch (Nederlands)',
  en: 'English',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  he: 'Hebrew (עִברִית)',
  hi: 'Hindi (हिंदी)',
  it: 'Italian (Italiano)',
  ja: 'Japanese (日本語)',
  fa: 'Persian (فارسی)',
  pl: 'Polish (Polski)',
  pt: 'Portuguese (Português)',
  ru: 'Russian (Pусский)',
  es: 'Spanish (Español)',
  sv: 'Swedish (Svenska)',
  tr: 'Turkish (Türkçe)',
};

const supportedLanguages = Object.fromEntries(
  Object.entries(languageList).filter(([key]) => Object.keys(i18n).includes(key))
);
</script>

<template>
  <ModalLayout>
    <div class="vuefinder__about-modal__content">
      <ModalHeader :icon="SettingsIcon" :title="t('Settings')"></ModalHeader>

      <div class="vuefinder__about-modal__main">
        <div class="vuefinder__about-modal__description">
          {{ t('Customize your experience with the following settings') }}
        </div>

        <div class="vuefinder__about-modal__settings">
          <fieldset class="vuefinder__about-modal__settings__fieldset">
            <div class="vuefinder__about-modal__settings__section-title">{{ t('General') }}</div>

            <div class="vuefinder__about-modal__setting">
              <div class="vuefinder__about-modal__setting-label">
                <label for="metric_unit" class="vuefinder__about-modal__label">{{
                  t('Use Metric Units')
                }}</label>
              </div>
              <div class="vuefinder__about-modal__setting-input justify-end">
                <input
                  id="metric_unit"
                  name="metric_unit"
                  type="checkbox"
                  :checked="config.get('metricUnits')"
                  class="vuefinder__about-modal__checkbox"
                  @change="handleMetricUnits"
                />
                <action-message class="ms-3" on="vf-metric-units-saved">{{
                  t('Saved.')
                }}</action-message>
              </div>
            </div>

            <div class="vuefinder__about-modal__setting">
              <div class="vuefinder__about-modal__setting-label">
                <label for="large_icons" class="vuefinder__about-modal__label">{{
                  t('Compact list view')
                }}</label>
              </div>
              <div class="vuefinder__about-modal__setting-input justify-end">
                <input
                  id="large_icons"
                  name="large_icons"
                  type="checkbox"
                  :checked="config.get('compactListView')"
                  class="vuefinder__about-modal__checkbox"
                  @change="handleCompactListView"
                />
                <action-message class="ms-3" on="vf-compact-view-saved">{{
                  t('Saved.')
                }}</action-message>
              </div>
            </div>

            <div class="vuefinder__about-modal__setting">
              <div class="vuefinder__about-modal__setting-label">
                <label for="persist_path" class="vuefinder__about-modal__label">{{
                  t('Persist path on reload')
                }}</label>
              </div>
              <div class="vuefinder__about-modal__setting-input justify-end">
                <input
                  id="persist_path"
                  name="persist_path"
                  type="checkbox"
                  :checked="config.get('persist')"
                  class="vuefinder__about-modal__checkbox"
                  @change="handlePersistPath"
                />
                <action-message class="ms-3" on="vf-persist-path-saved">{{
                  t('Saved.')
                }}</action-message>
              </div>
            </div>

            <div v-if="enabled('theme')" class="vuefinder__about-modal__settings__section-title">
              {{ t('Theme') }}
            </div>

            <div v-if="enabled('theme')" class="vuefinder__about-modal__setting">
              <div class="vuefinder__about-modal__setting-input justify-end">
                <select
                  id="theme"
                  :value="selectedTheme"
                  class="vuefinder__about-modal__select"
                  @change="
                    (event) => handleTheme((event.target as HTMLSelectElement)?.value as Theme)
                  "
                >
                  <optgroup :label="t('Theme')">
                    <option v-for="theme in themes" :key="theme.name" :value="theme.name">
                      {{ theme.displayName }}
                    </option>
                  </optgroup>
                </select>
                <action-message class="ms-3" on="vf-theme-saved">{{ t('Saved.') }}</action-message>
              </div>
            </div>

            <div
              v-if="enabled('language') && Object.keys(supportedLanguages).length > 1"
              class="vuefinder__about-modal__settings__section-title"
            >
              {{ t('Language') }}
            </div>

            <div
              v-if="enabled('language') && Object.keys(supportedLanguages).length > 1"
              class="vuefinder__about-modal__setting"
            >
              <div class="vuefinder__about-modal__setting-input justify-end">
                <select
                  id="language"
                  v-model="app.i18n.locale"
                  class="vuefinder__about-modal__select"
                >
                  <optgroup :label="t('Language')">
                    <option
                      v-for="(language, code) in supportedLanguages"
                      :key="code"
                      :value="code"
                    >
                      {{ language }}
                    </option>
                  </optgroup>
                </select>
                <action-message class="ms-3" on="vf-language-saved">{{
                  t('Saved.')
                }}</action-message>
              </div>
            </div>
          </fieldset>
        </div>

        <div class="vuefinder__about-modal__tab-content">
          <div class="vuefinder__about-modal__settings__section-title">{{ t('Reset') }}</div>
          <div class="vuefinder__about-modal__description">
            {{ t('Reset all settings to default') }}
          </div>
          <button type="button" class="vf-btn vf-btn-secondary" @click="clearLocalStorage">
            {{ t('Reset Settings') }}
          </button>
        </div>
      </div>
    </div>
    <template #buttons>
      <button type="button" class="vf-btn vf-btn-secondary" @click="app.modal.close()">
        {{ t('Close') }}
      </button>
    </template>
  </ModalLayout>
</template>
