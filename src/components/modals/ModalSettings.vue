<script setup lang="ts">
import { computed, inject } from 'vue';
import { useApp } from '../../composables/useApp';
import { useFeature } from '../../composables/useFeature';
import { useStore } from '@nanostores/vue';
import ModalLayout from '../../components/modals/ModalLayout.vue';
import ModalHeader from '../../components/modals/ModalHeader.vue';
import ActionMessage from '../../components/ActionMessage.vue';
import { themes, type Theme } from '../../stores/theme';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../../stores/config';
import SettingsIcon from '../../assets/icons/gear.svg';

const app = useApp();
const { enabled } = useFeature();
const config = app.config;
const { clearStore } = app.storage;
const { t, localeAtom } = app.i18n;

// Use locale atom directly for reactive binding with computed get/set for v-model
const reactiveLocale = computed({
  get: () => localeAtom.get(),
  set: (value: string) => {
    localeAtom.set(value);
  },
});

// Reactive store for config
const configState: StoreValue<ConfigState> = useStore(config.state);

// Selected theme computed
const selectedTheme = computed<Theme>(() => {
  const stored = configState.value.theme;
  return stored || 'silver';
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
    <div class="vuefinder__settings-modal__content">
      <ModalHeader :icon="SettingsIcon" :title="t('Settings')"></ModalHeader>

      <div class="vuefinder__settings-modal__main">
        <div class="vuefinder__settings-modal__sections">
          <!-- Theme Section -->
          <div v-if="enabled('theme')" class="vuefinder__settings-modal__section">
            <label for="theme" class="vuefinder__settings-modal__label">
              {{ t('Theme') }}

              <ActionMessage class="vuefinder__settings-modal__message" on="vf-theme-saved">
                {{ t('Saved.') }}
              </ActionMessage>
            </label>
            <div class="vuefinder__settings-modal__input-group">
              <select
                id="theme"
                :value="selectedTheme"
                class="vuefinder__settings-modal__select"
                @change="
                  (event) => handleTheme((event.target as HTMLSelectElement)?.value as Theme)
                "
              >
                <option v-for="theme in themes" :key="theme.name" :value="theme.name">
                  {{ theme.displayName }}
                </option>
              </select>
            </div>
          </div>

          <!-- Language Section -->
          <div
            v-if="Object.keys(supportedLanguages).length > 1"
            class="vuefinder__settings-modal__section"
          >
            <label for="language" class="vuefinder__settings-modal__label">
              {{ t('Language') }}
              <ActionMessage class="vuefinder__settings-modal__message" on="vf-language-saved">
                {{ t('Saved.') }}
              </ActionMessage>
            </label>
            <div class="vuefinder__settings-modal__input-group">
              <select
                id="language"
                v-model="reactiveLocale"
                class="vuefinder__settings-modal__select"
              >
                <option v-for="(language, code) in supportedLanguages" :key="code" :value="code">
                  {{ language }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Reset Section -->
        <div class="vuefinder__settings-modal__reset-section">
          <div class="vuefinder__settings-modal__reset-content">
            <div class="vuefinder__settings-modal__reset-title">{{ t('Reset') }}</div>
            <div class="vuefinder__settings-modal__reset-description">
              {{ t('Reset all settings to default') }}
            </div>
          </div>
          <button
            type="button"
            class="vuefinder__settings-modal__reset-button"
            @click="clearLocalStorage"
          >
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
