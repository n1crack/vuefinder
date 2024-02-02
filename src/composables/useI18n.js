import {ref} from 'vue';

export async function loadLocale(locale, supportedLocales) {
    const localeData = supportedLocales[locale];
    return typeof localeData === 'function' ? (await localeData()).default : localeData;
}

export function useI18n(storage, initialLocale, emitter, supportedLocales) {
    const {getStore, setStore} = storage;
    const translations = ref({});
    const locale = ref(getStore('locale', initialLocale));

    const changeLocale = (newLocale, defaultLocale = initialLocale) => {
        loadLocale(newLocale, supportedLocales).then((i18n) => {
            translations.value = i18n;
            setStore('locale', newLocale);
            locale.value = newLocale;
            setStore('translations', i18n);
            if (Object.values(supportedLocales).length > 1) {
                emitter.emit('vf-toast-push', {label: 'The language is set to ' + newLocale});
                emitter.emit('vf-language-saved');
            }
        }).catch(e => {
            if (defaultLocale) {
                emitter.emit('vf-toast-push', {label: 'The selected locale is not yet supported!', type: 'error'});
                changeLocale(defaultLocale, null);
            } else {
                emitter.emit("vf-toast-push", {label: "Locale cannot be loaded!", type: "error"});
            }
        });
    };

    if (!getStore('locale') && !supportedLocales.length) {
        changeLocale(initialLocale);
    } else {
        translations.value = getStore('translations');
    }
    const sprintf = (str, ...argv) => !argv.length ? str : sprintf(str = str.replace('%s', argv.shift()), ...argv);

    function t(key, ...params) {
        if (translations.value && translations.value.hasOwnProperty(key)) {
            return sprintf(translations.value[key], ...params);
        }
        return sprintf(key, ...params);
    };


    return {t, changeLocale, locale};
}

