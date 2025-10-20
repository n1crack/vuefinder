import {reactive, ref, watch} from 'vue';

/**
 * @param {string} locale 
 * @returns 
 */
export function sanitizeLocale(locale) {
    return locale.toLowerCase().replace("_", "-")
}

/**
 * @param {string} locale 
 * @param {Record<string, any>} supportedLocales 
 * @param {false | string} fallback
 * @returns 
 */
function findLocale(locale, supportedLocales, fallback=false) {
    const exactMatch = Object.keys(supportedLocales).find(
        (supported) => sanitizeLocale(supported) === sanitizeLocale(locale)
    );
    if (exactMatch) {
        return supportedLocales[exactMatch];
    }
    const sameLanguage = Object.keys(supportedLocales).find(
        (supported) =>
            sanitizeLocale(supported).split("-")[0] ===
            sanitizeLocale(locale).split("-")[0]
    );

    if(!sameLanguage && fallback) {
        return findLocale(fallback, supportedLocales)
    }

    return supportedLocales[sameLanguage];
}

export async function loadLocale(locale, supportedLocales) {
    const localeLoader = findLocale(locale, supportedLocales);
    return typeof localeLoader === 'function' ? (await localeLoader()).default : localeLoader;
}

export function useI18n(storage, localeProp, emitter, supportedLocales) {
    const [initialLocale, overrideStorage] = [localeProp.replace('!', ''), localeProp.includes('!')]
    const {getStore, setStore} = storage;
    const translations = ref({});
    const locale = overrideStorage 
        ? ref(supportedLocales[initialLocale] === undefined ? 'en' : initialLocale) 
        : ref(getStore('locale', initialLocale));

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
            console.error(e)
            if (defaultLocale) {
                emitter.emit('vf-toast-push', {label: 'The selected locale is not yet supported!', type: 'error'});
                changeLocale(defaultLocale, null);
            } else {
                emitter.emit("vf-toast-push", {label: "Locale cannot be loaded!", type: "error"});
            }
        });
    };

    watch(locale, (newLocale) => {
        changeLocale(newLocale);
    });

    if (!getStore('locale') || getStore('locale') !== locale.value) {
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


    return reactive({t, locale});
}