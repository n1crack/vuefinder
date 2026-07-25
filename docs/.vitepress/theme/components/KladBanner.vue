<script setup lang="ts">
// Cross-promo for the author's other library, Klad. A single on-brand image
// (docs/public/klad-banner.svg) wrapped in a link — static, SSR-safe.

// UTM tags so Klad's own Google Analytics attributes this traffic to the
// VueFinder docs banner; the click also fires a GA4 `select_promotion` event
// on this site's tag (see docs/.vitepress/config.mts) so it's measurable here.
const KLAD_URL =
  'https://klad.ozdemir.be/?utm_source=vuefinder&utm_medium=referral&utm_campaign=docs-banner'

function trackClick(): void {
  const gtag = (globalThis as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('event', 'select_promotion', {
    creative_name: 'docs_home_banner',
    creative_slot: 'home_after_cta',
    promotion_id: 'klad',
    promotion_name: 'Klad org chart',
  })
}
</script>

<template>
  <aside class="klad-banner">
    <a
      class="klad-banner__link"
      :href="KLAD_URL"
      target="_blank"
      rel="noopener"
      aria-label="Klad — a framework-agnostic org chart built for huge trees"
      @click="trackClick"
    >
      <img
        class="klad-banner__img"
        src="/klad-banner.svg"
        alt="Klad — a framework-agnostic org chart built for huge trees"
        width="1040"
        height="156"
        loading="lazy"
        decoding="async"
      />
    </a>
  </aside>
</template>

<style scoped>
.klad-banner {
  max-width: 1152px;
  margin: 3rem auto 0;
  padding: 0 24px;
}

.klad-banner__link {
  display: block;
  border-radius: 18px;
  /* Matches the SVG's own rounded corners so the focus ring / shadow hugs it. */
  outline-offset: 3px;
  transition: box-shadow 0.25s ease;
}

.klad-banner__link:hover {
  box-shadow: 0 4px 18px -10px rgba(37, 99, 235, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .klad-banner__link {
    transition: none;
  }
}

.klad-banner__img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
}
</style>
