import { defineConfig } from 'vitepress';
import { writeFileSync, readdirSync, statSync, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';

// Generate sitemap XML from VitePress pages
function generateSitemap(pages: string[], baseUrl: string): string {
  const urls = pages
    .map((page) => {
      // Handle index.html -> root
      if (page === 'index.html' || page.endsWith('/index.html')) {
        return '/';
      }
      
      // Normalize path: remove leading/trailing slashes, ensure .html exists
      let url = page.replace(/^\/+|\/+$/g, '');
      if (!url.endsWith('.html')) {
        url = url + '.html';
      }
      
      return '/' + url;
    })
    .filter((url) => {
      // Filter out 404 and other non-content pages
      return !url.includes('404') && !url.startsWith('/assets/') && url !== '';
    })
    .sort()
    .map((url) => {
      // Determine priority based on URL depth
      const depth = url.split('/').filter(Boolean).length;
      let priority = '0.8';
      let changefreq = 'monthly';

      if (url === '/') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (depth === 1) {
        priority = '0.9';
      } else if (depth === 2) {
        priority = '0.8';
      } else {
        priority = '0.7';
      }

      // Special priorities for important sections
      if (url.startsWith('/getting-started/')) {
        priority = '0.9';
      } else if (url.startsWith('/api-reference/')) {
        priority = '0.9';
      } else if (url.startsWith('/guide/')) {
        priority = '0.8';
      } else if (url.startsWith('/examples/')) {
        priority = '0.7';
      } else if (url.startsWith('/migration/')) {
        priority = '0.6';
      }

      return `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// https://vitepress.dev/reference/site-config
// outDir is relative to the VitePress project root (docs/ folder)
// So '../public' means: from docs/ go up one level to project root, then into public/
const baseUrl = 'https://vuefinder.ozdemir.be';
const siteTitle = 'VueFinder - Vue File Manager';
const siteDescription = 'A sleek, developer-friendly file manager for Vue.js. Organize, preview, and manage files with ease. Full-featured with upload, download, rename, delete, archive, search, and preview capabilities.';

export default defineConfig({
  outDir: '../public',
  title: 'VueFinder',
  description: siteDescription,
  head: [
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: baseUrl }],
    ['meta', { property: 'og:title', content: siteTitle }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:image', content: `${baseUrl}/vuefinder_preview.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:site_name', content: 'VueFinder' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: baseUrl }],
    ['meta', { name: 'twitter:title', content: siteTitle }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: `${baseUrl}/vuefinder_preview.png` }],
    ['meta', { name: 'twitter:site', content: '@n1crack' }],
    ['meta', { name: 'twitter:creator', content: '@n1crack' }],
    
    // Additional SEO
    ['meta', { name: 'author', content: 'Yusuf Özdemir' }],
    ['meta', { name: 'keywords', content: 'vue, vue3, file-manager, file-explorer, file-browser, file-upload, vue-component, vue-plugin, cloud-storage, media-manager, uploader, finder' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }],
    ['meta', { name: 'revisit-after', content: '7 days' }],
    
    // Canonical URL
    ['link', { rel: 'canonical', href: baseUrl }],
    
    // Favicon (if exists, otherwise will be handled by VitePress default)
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    
    // Google Analytics
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-6BYQESCJ6R' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-6BYQESCJ6R');`
    ],
    
    // Structured Data (JSON-LD)
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'VueFinder',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        description: siteDescription,
        url: baseUrl,
        author: {
          '@type': 'Person',
          name: 'Yusuf Özdemir',
          url: 'https://ozdemir.be'
        },
        publisher: {
          '@type': 'Person',
          name: 'Yusuf Özdemir',
          url: 'https://ozdemir.be'
        },
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/n1crack/vuefinder',
        softwareVersion: '4.0.15',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Vue.js 3'
      })
    ],
  ],
  buildEnd: async ({ outDir }) => {
    // Scan the output directory for HTML files
    const scanDirectory = (dir: string, basePath = ''): string[] => {
      const files: string[] = [];
      try {
        const entries = readdirSync(dir);
        for (const entry of entries) {
          // Skip assets and other non-content directories
          if (entry === 'assets' || entry.startsWith('.')) {
            continue;
          }
          
          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            files.push(...scanDirectory(fullPath, join(basePath, entry)));
          } else if (entry.endsWith('.html')) {
            const url = join(basePath, entry).replace(/\\/g, '/');
            files.push(url);
          }
        }
      } catch (err) {
        // Ignore errors
      }
      return files;
    };
    
    const htmlFiles = scanDirectory(outDir);
    console.log('📄 Found HTML files:', htmlFiles.slice(0, 5), '...');
    const sitemap = generateSitemap(htmlFiles, baseUrl);
    const sitemapPath = resolve(outDir, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf-8');
    console.log('✅ Sitemap generated at', sitemapPath);
    // Debug: show first few URLs
    const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      console.log('🔗 Sample URLs:', urlMatches.slice(0, 3).map(m => m.replace(/<\/?loc>/g, '')));
    }
    
    // Copy robots.txt from public folder to output directory
    const robotsSourcePath = resolve(__dirname, 'public', 'robots.txt');
    const robotsDestPath = resolve(outDir, 'robots.txt');
    if (existsSync(robotsSourcePath)) {
      copyFileSync(robotsSourcePath, robotsDestPath);
      console.log('✅ robots.txt copied to', robotsDestPath);
    } else {
      console.warn('⚠️  robots.txt not found at', robotsSourcePath);
    }

    // Copy OG image from public folder to output directory
    const ogImageSourcePath = resolve(__dirname, 'public', 'vuefinder_preview.png');
    const ogImageDestPath = resolve(outDir, 'vuefinder_preview.png');
    if (existsSync(ogImageSourcePath)) {
      copyFileSync(ogImageSourcePath, ogImageDestPath);
      console.log('✅ OG image copied to', ogImageDestPath);
    } else {
      console.warn('⚠️  OG image not found at', ogImageSourcePath);
    }

    // Copy OpenAPI YAML file to api-reference directory in output
    const yamlSourcePath = resolve(__dirname, '..', 'api-reference', 'openapi.yaml');
    const yamlDestPath = resolve(outDir, 'api-reference', 'openapi.yaml');
    if (existsSync(yamlSourcePath)) {
      // Ensure the api-reference directory exists
      mkdirSync(resolve(outDir, 'api-reference'), { recursive: true });
      copyFileSync(yamlSourcePath, yamlDestPath);
      console.log('✅ OpenAPI YAML copied to', yamlDestPath);
    } else {
      console.warn('⚠️  OpenAPI YAML not found at', yamlSourcePath);
    }
  },
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
            { text: 'Composable API', link: '/guide/composable-api' },
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
            { text: 'Composable API', link: '/guide/composable-api' },
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
            { text: 'Item Size Configuration', link: '/examples/item-size-configuration' },
            { text: 'Feature Presets', link: '/examples/feature-presets' },
            { text: 'UI Visibility', link: '/examples/ui-visibility' },
            { text: 'Single Selection', link: '/examples/single-selection' },
            { text: 'Selection Filters', link: '/examples/selection-filters' },
            { text: 'Custom Double-Click', link: '/examples/custom-double-click' },
            { text: 'External Selection', link: '/examples/external-selection' },
            { text: 'Window Example', link: '/examples/window-example' },
            { text: 'Status Bar Select', link: '/examples/status-bar-select' },
            { text: 'Events', link: '/examples/events-demo' },
            { text: 'Notifications', link: '/examples/notifications' },
            { text: 'Composable API', link: '/examples/composable-api' },
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
