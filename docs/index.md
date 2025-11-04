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

<ClientOnly>
  <section class="cta">
    <p class="cta-text">
      If you like this library, please consider giving it a star on GitHub or sponsoring the project.
    </p>
    <div class="cta-actions">
      <GithubButton
        href="https://github.com/n1crack/vuefinder"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star n1crack/vuefinder on GitHub"
      >Star</GithubButton>
      <GithubButton
        href="https://github.com/sponsors/n1crack"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-heart"
        data-size="large"
        aria-label="Sponsor @n1crack on GitHub"
      >Sponsor</GithubButton>
    </div>
  </section>
</ClientOnly>

<div class="home-footer">
  Released under the MIT License.<br>
  Copyright © 2018-present <a href="https://ozdemir.be" target="_blank">Yusuf Özdemir</a>
</div>

<style>
.cta {
  margin: 2.5rem auto 2rem;
  padding: 1.25rem 1.5rem;
  max-width: 880px;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.cta-text {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.cta-actions {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.home-footer {
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
