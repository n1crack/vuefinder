import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
// outDir is relative to the VitePress project root (docs/ folder)
// So '../public' means: from docs/ go up one level to project root, then into public/
export default defineConfig({
  outDir: '../public',
  title: 'VueFinder',
  description:
    'Empower your Vue.js applications with this versatile and customizable file manager component',
  head: [
    [
      'script',
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-6BYQESCJ6R' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-6BYQESCJ6R');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/getting-started/introduction' },
      { text: 'API Reference', link: '/api-reference/props' },
      { text: 'Examples', link: '/examples/basic-usage' },
      { text: 'Migration', link: '/migration/from-2-7-to-4-0' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Features', link: '/guide/features' },
            { text: 'Drivers & Adapters', link: '/guide/drivers-adapters' },
            { text: 'TypeScript Support', link: '/guide/typescript-support' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Localization', link: '/guide/localization' },
            { text: 'Selection Modes', link: '/guide/selection-modes' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Slots', link: '/guide/slots' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Features', link: '/guide/features' },
            { text: 'Drivers & Adapters', link: '/guide/drivers-adapters' },
            { text: 'TypeScript Support', link: '/guide/typescript-support' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Localization', link: '/guide/localization' },
            { text: 'Selection Modes', link: '/guide/selection-modes' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Slots', link: '/guide/slots' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic-usage' },
            { text: 'Custom Icons', link: '/examples/custom-icons' },
            { text: 'Feature Presets', link: '/examples/feature-presets' },
            { text: 'Single Selection', link: '/examples/single-selection' },
            { text: 'Selection Filters', link: '/examples/selection-filters' },
            { text: 'Custom Double-Click', link: '/examples/custom-double-click' },
            { text: 'External Selection', link: '/examples/external-selection' },
            { text: 'Status Bar Select', link: '/examples/status-bar-select' },
            { text: 'Events', link: '/examples/events-demo' },
            { text: 'Context Menu', link: '/examples/context-menu' },
            { text: 'Memory Driver', link: '/examples/memory-driver' },
            { text: 'Large Dataset', link: '/examples/large-dataset' },
            { text: 'IndexedDB Driver', link: '/examples/indexeddb-driver' },
            { text: 'Themes', link: '/examples/themes' },
          ],
        },
      ],
      '/api-reference/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api-reference/props' },
            { text: 'Events', link: '/api-reference/events' },
            { text: 'Slots', link: '/api-reference/slots' },
            { text: 'Types', link: '/api-reference/types' },
            { text: 'Drivers Interface', link: '/api-reference/drivers-interface' },
            { text: 'OpenAPI Specification', link: '/api-reference/openapi' },
          ],
        },
      ],
      '/migration/': [
        {
          text: 'Migration',
          items: [
            { text: 'From 2.7 to 4.0', link: '/migration/from-2-7-to-4-0' },
            { text: 'Breaking Changes', link: '/migration/breaking-changes' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/n1crack/vuefinder' }],

    search: {
      provider: 'local',
    },
  },
});
