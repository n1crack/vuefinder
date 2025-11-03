import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import GithubButton from 'vue-github-button';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app }) {
    // Register VueFinder plugin globally only on client side
    if (typeof window !== 'undefined') {
      import('vuefinder').then((module) => {
        app.use(module.default);
      });
      import('vuefinder/dist/style.css');
    }

    // Register GithubButton component globally
    app.component('GithubButton', GithubButton);
  },
} satisfies Theme;
