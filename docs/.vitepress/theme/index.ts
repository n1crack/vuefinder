// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import ClientOnly from '../components/ClientOnly.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    // Register ClientOnly component globally
    app.component('ClientOnly', ClientOnly);

    // Register VueFinder plugin globally only on client side
    if (typeof window !== 'undefined') {
      import('vuefinder').then((module) => {
        app.use(module.default);
      });
      import('vuefinder/dist/style.css');
    }
  },
} satisfies Theme;
