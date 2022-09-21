import {ref} from 'vue';
import {useStorage} from './useStorage.js';

export async function loadLocale(locale) {
    const messages = await import(`../locales/${locale}.json?raw`);

    return JSON.parse(messages.default);
}

export function useI18n(id, locale) {
    const {getStore, setStore} = useStorage(id);
    const support_locales = ['en', 'tr'];
    const translations = ref({});

    const changeLocale = (locale) => {
        if (!support_locales.includes(locale)) {
            console.log('The selected locale is not yet supported. The fallback language is set as \'en\'');
            locale = 'en';
        }

        loadLocale(locale).then((i18n) => {
            translations.value = i18n;
            setStore('locale', locale);
            setStore('translations', i18n);
            console.log(locale + ' is loaded.');
        });
    };

    if (!getStore('locale')) {
        changeLocale(locale);
    } else {
        translations.value = getStore('translations');
    }

    function t(key) {
        if (translations.value.hasOwnProperty(key)) {
            return translations.value[key];
        }
        return '';
    };

    return {t, support_locales, changeLocale};
}

