import { h, defineAsyncComponent } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import GithubButton from 'vue-github-button';
import './style.css';
import HomeHeroVueFinderDemo from './components/HomeHeroVueFinderDemo.vue';

// Import demo components
import BasicUsageDemo from './components/examples/BasicUsageDemo.vue';
import MemoryDriverDemo from './components/examples/MemoryDriverDemo.vue';
import FeaturesDemo from './components/examples/FeaturesDemo.vue';
import IndexedDBDemo from './components/examples/IndexedDBDemo.vue';
import ContextMenuDemo from './components/examples/ContextMenuDemo.vue';
import CustomIconsDemo from './components/examples/CustomIconsDemo.vue';
import CustomDclickDemo from './components/examples/CustomDclickDemo.vue';
import EventsDemo from './components/examples/EventsDemo.vue';
import SelectionFilterDemo from './components/examples/SelectionFilterDemo.vue';
import SingleSelectionDemo from './components/examples/SingleSelectionDemo.vue';
import ExternalSelectDemo from './components/examples/ExternalSelectDemo.vue';
import StatusBarSelectDemo from './components/examples/StatusBarSelectDemo.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-features-after': () => h(HomeHeroVueFinderDemo),
    });
  },
  enhanceApp({ app }) {
    // Ensure <vue-finder> is resolvable immediately via async component registration
    if (!app.component('vue-finder')) {
      app.component(
        'vue-finder',
        defineAsyncComponent(async () => {
          await import('vuefinder/dist/style.css');
          const mod = await import('vuefinder');
          return mod.VueFinder;
        })
      );
    }

    // Register VueFinder plugin globally on client side, synchronously
    if (!import.meta.env.SSR) {
      (async () => {
        await import('vuefinder/dist/style.css');
        const { default: VueFinderPlugin } = await import('vuefinder');
        app.use(VueFinderPlugin, {
          locale: 'en',
          i18n: {
              ar:  () =>    import ("../../../dist/locales/ar.js"),
              de:  () =>    import ("../../../dist/locales/de.js"),
              en:  () =>    import ("../../../dist/locales/en.js"),
              es:  () =>    import ("../../../dist/locales/es.js"),
              fa:  () =>    import ("../../../dist/locales/fa.js"),
              fr:  () =>    import ("../../../dist/locales/fr.js"),
              he:  () =>    import ("../../../dist/locales/he.js"),
              hi:  () =>    import ("../../../dist/locales/hi.js"),
              it:  () =>   import ("../../../dist/locales/it.js"),
              ja:  () =>   import ("../../../dist/locales/ja.js"),
              nl:  () =>   import ("../../../dist/locales/nl.js"),
              pl:  () =>   import ("../../../dist/locales/pl.js"),
              pt:  () =>   import ("../../../dist/locales/pt.js"),
              ru:  () =>    import ("../../../dist/locales/ru.js"),
              sv:  () =>    import ("../../../dist/locales/sv.js"),
              tr:  () =>    import ("../../../dist/locales/tr.js"),
              zhCN:  () =>  import ("../../../dist/locales/zhCN.js"),
              zhTW:  () =>  import ("../../../dist/locales/zhTW.js"),
          }
        });
      })();
    }

    // Register GithubButton component globally
    app.component('GithubButton', GithubButton);

    // Register demo components globally (client-side only)
    if (!import.meta.env.SSR) {
      app.component('BasicUsageDemo', BasicUsageDemo);
      app.component('MemoryDriverDemo', MemoryDriverDemo);
      app.component('FeaturesDemo', FeaturesDemo);
      app.component('IndexedDBDemo', IndexedDBDemo);
      app.component('ContextMenuDemo', ContextMenuDemo);
      app.component('CustomIconsDemo', CustomIconsDemo);
      app.component('CustomDclickDemo', CustomDclickDemo);
      app.component('EventsDemo', EventsDemo);
      app.component('SelectionFilterDemo', SelectionFilterDemo);
      app.component('SingleSelectionDemo', SingleSelectionDemo);
      app.component('ExternalSelectDemo', ExternalSelectDemo);
      app.component('StatusBarSelectDemo', StatusBarSelectDemo);
    }
  },
} satisfies Theme;
