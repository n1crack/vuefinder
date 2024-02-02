import {ref} from 'vue';

export async function loadLocale(locale, supportedLocales) {
    let messages;
    if (typeof supportedLocales[locale] === 'function') {
        messages = (await supportedLocales[locale]()).default;
    } else {
        messages = supportedLocales[locale];
    }

    return messages;
}


export function useI18n(storage, initialLocale, emitter, supportedLocales) {
    const {getStore, setStore} = storage;
    const translations = ref({});
    const locale = ref(getStore('locale', initialLocale));

    const changeLocale = (newLocale, defaultLocale = "en") => {
        loadLocale(newLocale, supportedLocales).then((i18n) => {
            translations.value = i18n;
            setStore('locale', newLocale);
            locale.value = newLocale;
            setStore('translations', i18n);
            emitter.emit('vf-toast-push', {label: 'The language is set to ' + newLocale});
            emitter.emit('vf-language-saved');
        }).catch(e => {
            if (defaultLocale) {
                emitter.emit('vf-toast-push', {label: 'The selected locale is not yet supported!', type: 'error'});
                changeLocale(defaultLocale, null);
            } else {
                emitter.emit("vf-toast-push", {label: "Locale cannot be loaded!", type: "error"});
            }
        });
    };

    if (!getStore('locale')) {
        changeLocale(initialLocale);
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


    return {t, changeLocale, locale};
}

