import { defineConfig } from 'vitepress'

// VitePress site config with Google Analytics (gtag.js)
export default defineConfig({
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
gtag('js', new Date());
gtag('config', 'G-6BYQESCJ6R');`
    ]
  ]
})


