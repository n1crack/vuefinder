import { reactive, ref, computed, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { toast } from 'vue-sonner';
import { getErrorMessage } from '../utils/errorHandler';
import { createLocaleAtom } from '../stores/i18n';

// Store locale atoms per instance (keyed by storage instance)
const localeAtoms = new Map<string, ReturnType<typeof createLocaleAtom>>();

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
  // Storage parameter kept for API compatibility but not used (using global cache instead)
  // Use global storage key for locale - shared across all VueFinder instances
  const globalStorageKey = 'vuefinder_locale';
  const instanceKey = 'global';

  // Get or create global locale atom (shared across all instances)
  let localeAtom: ReturnType<typeof createLocaleAtom>;

  if (localeAtoms.has(instanceKey)) {
    localeAtom = localeAtoms.get(instanceKey)!;
    // If prop locale is provided and different from current, use prop locale
    if (initialLocale && initialLocale !== localeAtom.get()) {
      localeAtom.set(initialLocale);
    }
  } else {
    // Priority: prop locale > stored locale (from global cache) > default 'en'
    const storedLocale = localStorage.getItem(globalStorageKey)
      ? JSON.parse(localStorage.getItem(globalStorageKey)!)
      : null;
    const effectiveLocale = initialLocale || storedLocale || 'en';

    // Create global atom with effective locale (prop takes priority)
    localeAtom = createLocaleAtom(globalStorageKey, effectiveLocale);
    localeAtoms.set(instanceKey, localeAtom);
  }

  // Global translations cache key
  const globalTranslationsKey = 'vuefinder_translations';

  // Helper functions to get/set global translations cache
  const getGlobalTranslations = (locale: string): Record<string, string> | null => {
    try {
      const cached = localStorage.getItem(globalTranslationsKey);
      if (cached) {
        const allTranslations = JSON.parse(cached);
        return allTranslations[locale] || null;
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  };

  const setGlobalTranslations = (locale: string, translations: Record<string, string>) => {
    try {
      const cached = localStorage.getItem(globalTranslationsKey);
      const allTranslations = cached ? JSON.parse(cached) : {};
      allTranslations[locale] = translations;
      localStorage.setItem(globalTranslationsKey, JSON.stringify(allTranslations));
    } catch {
      // Ignore storage errors
    }
  };

  // Use nanostores/vue to make locale reactive
  const reactiveLocale = useStore(localeAtom);
  const currentLocale = String(reactiveLocale.value);

  // Load initial translations from global cache
  const cachedTranslations = getGlobalTranslations(currentLocale);
  const translations = ref<Record<string, string>>(cachedTranslations || {});

  // Track if watcher has been initialized (to skip first change notification)
  let watcherInitialized = false;

  // Load initial translations if not cached (silently, no toast)
  if (!cachedTranslations && Object.keys(supportedLocales).length > 0) {
    loadLocale(currentLocale, supportedLocales)
      .then((loadedTranslations) => {
        translations.value = loadedTranslations;
        setGlobalTranslations(currentLocale, loadedTranslations);
      })
      .catch(() => {
        // Silently fail on initial load
      });
  }

  // Watch locale changes and load translations
  watch(
    reactiveLocale,
    async (newLocale, oldLocale) => {
      // Skip if locale hasn't actually changed
      if (oldLocale && newLocale === oldLocale) {
        return;
      }

      // Skip first change (initialization) - don't show toast
      if (!watcherInitialized) {
        watcherInitialized = true;
        // Still load translations if needed, but silently
        const cached = getGlobalTranslations(String(newLocale));
        if (cached) {
          translations.value = cached;
        } else if (Object.keys(supportedLocales).length > 0) {
          try {
            const loadedTranslations = await loadLocale(String(newLocale), supportedLocales);
            translations.value = loadedTranslations;
            setGlobalTranslations(String(newLocale), loadedTranslations);
          } catch {
            // Silently fail
          }
        }
        return;
      }

      // This is a user-initiated change - load translations and show toast
      const cachedTranslations = getGlobalTranslations(String(newLocale));

      if (cachedTranslations) {
        translations.value = cachedTranslations;
      } else {
        // Load translations from source
        try {
          const loadedTranslations = await loadLocale(String(newLocale), supportedLocales);
          translations.value = loadedTranslations;
          setGlobalTranslations(String(newLocale), loadedTranslations);
        } catch (e: unknown) {
          const errorMessage = getErrorMessage(e, 'Locale cannot be loaded!');
          toast.error(errorMessage);
          return;
        }
      }

      // Show toast for user-initiated changes
      if (Object.values(supportedLocales).length > 1) {
        toast.success('The language is set to ' + newLocale);
        emitter.emit('vf-language-saved');
      }
    },
    { immediate: false }
  );

  // sprintf function for parameter replacement
  const sprintf = (str: string, ...argv: any[]): string =>
    !argv.length ? str : sprintf((str = str.replace('%s', String(argv.shift()))), ...argv);

  // Translation function - maintains same API
  function t(key: string, ...params: any[]): string {
    if (translations.value && Object.prototype.hasOwnProperty.call(translations.value, key)) {
      return sprintf(translations.value[key] || key, ...params);
    }
    return sprintf(key, ...params);
  }

  // Expose locale as computed that reads from atom
  const locale = computed({
    get: () => reactiveLocale.value,
    set: (value: string) => {
      localeAtom.set(value);
    },
  });

  return reactive({ t, locale, localeAtom });
}
