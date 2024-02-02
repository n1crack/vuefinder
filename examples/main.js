import {createApp} from 'vue'
import App from './App.vue'
import VueFinder from '../src/index.js'

const app = createApp(App);

app.use(VueFinder,
    {
        // you can set the default locale, if you don't set the locale key, it will be the first locale in the i18n object (en in this case)
        // if if you set a locale prop of the vuefinder elements, it will override this default locale
        locale: 'en',
        i18n: {
            en: async () => await import ("../src/locales/en.js"),
            fr: async () => await import ("../src/locales/fr.js"),
            de: async () => await import ("../src/locales/de.js"),
            fa: async () => await import ("../src/locales/fa.js"),
            he: async () => await import ("../src/locales/he.js"),
            hi: async () => await import ("../src/locales/hi.js"),
            ru: async () => await import ("../src/locales/ru.js"),
            sv: async () => await import ("../src/locales/sv.js"),
            tr: async () => await import ("../src/locales/tr.js"),
            zhCN: async () => await import ("../src/locales/zhCN.js"),
            zhTW: async () => await import ("../src/locales/zhTW.js"),
        }
    }
)
app.mount('#app')
