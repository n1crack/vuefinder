import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import GithubButton from 'vue-github-button';
import './style.css';
import HomeHeroVueFinderDemo from './components/HomeHeroVueFinderDemo.vue';
import VueFinderPlugin from 'vuefinder';
import 'vuefinder/dist/style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-features-after': () => h(HomeHeroVueFinderDemo),
    });
  },
  enhanceApp({ app }) {
    // Register VueFinder plugin globally on client side, synchronously
    if (!import.meta.env.SSR) {
      app.use(VueFinderPlugin);
    }

    // Register GithubButton component globally
    app.component('GithubButton', GithubButton);
  },
} satisfies Theme;
