---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'VueFinder'
  text: 'Vue File Manager'
  tagline: A sleek, developer-friendly file manager
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/introduction
    - theme: alt
      text: Reference
      link: /api-reference/props
    - theme: alt
      text: View on GitHub
      link: https://github.com/n1crack/vuefinder

features:
  - title: 🚀 Complete File Operations
    details: Full-featured file manager with upload, download, rename, delete, archive, search, and preview. Ready to use out of the box.
  - title: 🎨 Beautiful Modern Interface
    details: Polished UI with context menus, breadcrumbs, thumbnails, and responsive design that works perfectly on desktop and mobile.
  - title: ⚡ Developer-Friendly
    details: TypeScript support, 17 languages, 12 themes, flexible configuration, and easy backend integration. Built for Vue 3.
---

<div class="home-footer">
  Released under the MIT License.<br>
  Copyright © 2018-present <a href="https://ozdemir.be" target="_blank">Yusuf Özdemir</a>
</div>

<style>
.home-footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.home-footer a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.home-footer a:hover {
  color: var(--vp-c-brand-1);
}
</style>
