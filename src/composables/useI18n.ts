import { reactive, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { getErrorMessage } from '../utils/errorHandler';

export async function loadLocale(locale: string, supportedLocales: Record<string, any>) {
  const localeData = supportedLocales[locale];
  return typeof localeData === 'function' ? (await localeData()).default : localeData;
}

export function useI18n(
  storage: { getStore: (k: string, d?: any) => any; setStore: (k: string, v: any) => void },
  initialLocale: string,
  emitter: any,
  supportedLocales: Record<string, any>
) {
  const { getStore, setStore } = storage;
  const translations = ref<Record<string, string>>({});
  const locale = ref<string>(getStore('locale', initialLocale));

  const changeLocale = (newLocale: string, defaultLocale: string | null = initialLocale) => {
    loadLocale(newLocale, supportedLocales)
      .then((i18n) => {
        translations.value = i18n;
        setStore('locale', newLocale);
        locale.value = newLocale;
        setStore('translations', i18n);
        if (Object.values(supportedLocales).length > 1) {
          toast.success('The language is set to ' + newLocale);
          emitter.emit('vf-language-saved');
        }
      })
      .catch((e: unknown) => {
        if (defaultLocale) {
          toast.error('The selected locale is not yet supported!');
          changeLocale(defaultLocale, null);
        } else {
          const errorMessage = getErrorMessage(e, 'Locale cannot be loaded!');
          toast.error(errorMessage);
        }
      });
  };

  watch(locale, (newLocale) => {
    changeLocale(newLocale);
  });

  if (!getStore('locale') && !Object.keys(supportedLocales).length) {
    changeLocale(initialLocale);
  } else {
    translations.value = getStore('translations');
  }
  const sprintf = (str: string, ...argv: any[]): string =>
    !argv.length ? str : sprintf((str = str.replace('%s', String(argv.shift()))), ...argv);

  function t(key: string, ...params: any[]): string {
    if (translations.value && Object.prototype.hasOwnProperty.call(translations.value, key)) {
      return sprintf(translations.value[key] || key, ...params);
    }
    return sprintf(key, ...params);
  }

  return reactive({ t, locale });
}
