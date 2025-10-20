import {createApp} from 'vue'
import App from './App.vue'
import VueFinder from '../src/index.js'

const app = createApp(App);

const supportedLocales = Object.fromEntries(
    Object.entries(import.meta.glob(["../src/locales/*.js"])).map(([path, locale]) => {
        return [path.slice(path.lastIndexOf("/") + 1, -3), locale];
    })
);

app.use(VueFinder,
    {
        // you can set the default locale, if you don't set the locale key, it will be the first locale in the i18n object (en in this case)
        // if if you set a locale prop of the vuefinder elements, it will override this default locale
        locale: 'en',
        i18n: {
            ...supportedLocales,
            ar: async () => await import ("../src/locales/ar.js"),
            en: async () => await import ("../src/locales/en.js"),
            fr: async () => await import ("../src/locales/fr.js"),
            de: async () => await import ("../src/locales/de.js"),
            fa: async () => await import ("../src/locales/fa.js"),
            he: async () => await import ("../src/locales/he.js"),
            hi: async () => await import ("../src/locales/hi.js"),
            pl: async () => await import ("../src/locales/pl.js"),
            ru: async () => await import ("../src/locales/ru.js"),
            sv: async () => await import ("../src/locales/sv.js"),
            tr: async () => await import ("../src/locales/tr.js"),
            nl: async () => await import ("../src/locales/nl.js"),
            zh_CN: async () => await import ("../src/locales/zh_CN.js"),
            zh_TW: async () => await import ("../src/locales/zh_TW.js"),
        }
    }
)
app.mount('#app')
