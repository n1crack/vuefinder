import {ref} from 'vue';
import {useStorage} from './useStorage.js';

export async function loadLocale(locale) {
    const messages = await import(`../locales/${locale}.json?raw`);

    return JSON.parse(messages.default);
}

export function useI18n(id, locale, emitter) {
    const {getStore, setStore} = useStorage(id);
    const translations = ref({});

    const changeLocale = (locale) => {
        loadLocale(locale).then((i18n) => {
            translations.value = i18n;
            setStore('locale', locale);
            setStore('translations', i18n);
            emitter.emit('vf-toast-push', {label: 'The language is set to ' + locale});
        }).catch(e => {
            emitter.emit('vf-toast-push', {label: 'The selected locale is not yet supported!', type:'error'});
            changeLocale('en');
        });
    };

    if (!getStore('locale')) {
        changeLocale(locale);
    } else {
        translations.value = getStore('translations');
    }

    const sprintf = (str, ...argv) => !argv.length ? str : sprintf(str = str.replace('%s', argv.shift()), ...argv);

    function t(key, ...params) {
        if (translations.value.hasOwnProperty(key)) {
            return sprintf(translations.value[key], ...params);
        }
        return sprintf(key, ...params);
    };

    return {t, changeLocale};
}

