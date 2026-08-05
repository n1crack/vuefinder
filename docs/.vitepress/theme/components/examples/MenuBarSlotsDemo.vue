<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { Driver } from 'vuefinder';
import MenuBarSlotsCombinedBar from './MenuBarSlotsCombinedBar.vue';

type Mode = 'default' | 'around' | 'replace' | 'each';

const modes: { id: Mode; tab: string; title: string; description: string }[] = [
  {
    id: 'default',
    tab: 'No slots',
    title: 'Default menu bar',
    description:
      'The starting point: File / Edit / View / Go / Help rendered by VueFinder, with no slot passed.',
  },
  {
    id: 'around',
    tab: 'Add around',
    title: 'menubar-start / menubar-end',
    description:
      'Keep the default menus and add your own content before and after them — branding, a shortcut, a counter. menubar-end receives the resolved menuItems.',
  },
  {
    id: 'replace',
    tab: 'Replace layout',
    title: 'menu-items',
    description:
      'Replace the menu layout entirely. The custom bar calls useMenuItems() and useBreadcrumbActions() itself rather than relying on the scoped props, so it drives the real actions — modals included.',
  },
  {
    id: 'each',
    tab: 'Each bar',
    title: 'menu-items + toolbar-items + breadcrumb-actions',
    description:
      'Every bar replaced independently through its own slot. The slot content replaces what is inside a bar — to remove a bar altogether, use the visibility options instead.',
  },
];

const mode = ref<Mode>('default');
const active = computed(() => modes.find((m) => m.id === mode.value)!);

const config = {
  initialPath: 'local://',
  persist: false,
};

const driver = ref<Driver | null>(null);

onMounted(async () => {
  const { RemoteDriver } = await import('vuefinder');
  driver.value = new RemoteDriver({
    baseURL: 'https://vuefinder-api.ozdemir.be/api/files',
  });
});
</script>

<template>
  <div class="slots-demo">
    <div class="slots-demo__tabs" role="tablist">
      <button
        v-for="item in modes"
        :key="item.id"
        class="slots-demo__tab"
        :class="{ 'slots-demo__tab--active': mode === item.id }"
        role="tab"
        :aria-selected="mode === item.id"
        @click="mode = item.id"
      >
        {{ item.tab }}
      </button>
    </div>

    <div class="slots-demo__intro">
      <h4 class="slots-demo__title">{{ active.title }}</h4>
      <p class="slots-demo__description">{{ active.description }}</p>
    </div>

    <div class="slots-demo__viewer">
      <ClientOnly>
        <vue-finder v-if="driver && mode === 'default'" id="demo-slots-default" :driver="driver" :config="config" />

        <vue-finder v-else-if="driver && mode === 'around'" id="demo-slots-around" :driver="driver" :config="config">
          <template #menubar-start>
            <span class="slots-demo__chip">🗂️ My App</span>
          </template>
          <template #menubar-end="{ menuItems }">
            <span class="slots-demo__chip">{{ menuItems.length }} menus</span>
          </template>
        </vue-finder>

        <vue-finder v-else-if="driver && mode === 'replace'" id="demo-slots-replace" :driver="driver" :config="config">
          <template #menu-items>
            <MenuBarSlotsCombinedBar />
          </template>
        </vue-finder>

        <vue-finder v-else-if="driver" id="demo-slots-each" :driver="driver" :config="config">
          <template #menu-items="{ menuItems }">
            <div class="slots-demo__chip slots-demo__chip--block">
              Custom MenuBar ({{ menuItems.length }} menus)
            </div>
          </template>
          <template #toolbar-items>
            <div class="slots-demo__chip slots-demo__chip--block">Custom Toolbar</div>
          </template>
          <template #breadcrumb-actions>
            <div class="slots-demo__chip">Custom Breadcrumb Actions</div>
          </template>
        </vue-finder>

        <template #fallback>
          <div class="slots-demo__loading">Loading demo...</div>
        </template>
      </ClientOnly>
    </div>

    <!-- The snippets come in as slots so VitePress renders them through Shiki,
         matching the site's own code blocks in both light and dark themes. -->
    <div class="slots-demo__code">
      <div v-show="mode === 'default'"><slot name="code-default" /></div>
      <div v-show="mode === 'around'"><slot name="code-around" /></div>
      <div v-show="mode === 'replace'"><slot name="code-replace" /></div>
      <div v-show="mode === 'each'"><slot name="code-each" /></div>
    </div>
  </div>
</template>

<style scoped>
.slots-demo {
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.slots-demo__tabs {
  display: flex;
  overflow-x: auto;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.slots-demo__tab {
  padding: 0.6rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.slots-demo__tab:hover {
  color: var(--vp-c-text-1);
}

.slots-demo__tab--active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.slots-demo__intro {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.slots-demo__title {
  margin: 0 0 0.35rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.slots-demo__description {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* A definite height, not min-height: VueFinder sizes itself with height:100%,
   which only resolves against a parent whose own height is definite. */
.slots-demo__viewer {
  height: 440px;
  background: var(--vp-c-bg);
}

.slots-demo__chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.slots-demo__chip--block {
  width: 100%;
  padding: 6px 10px;
}

.slots-demo__loading {
  padding: 2rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

/* The snippets arrive as VitePress code blocks, which bring their own
   background and rounding - just host them and drop the outer margins. */
.slots-demo__code {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
}

.slots-demo__code :deep(div[class*='language-']) {
  margin: 0;
}

.slots-demo__code :deep(div[class*='language-'] + div[class*='language-']) {
  margin-top: 0.75rem;
}

@media (max-width: 768px) {
  /* Taller than the desktop shrink would suggest: a replaced menu bar costs
     several rows on a narrow screen, and the file list still needs room. */
  .slots-demo__viewer {
    height: 420px;
  }

  /* Tighter tabs so all four fit without a horizontal scroll on a phone. */
  .slots-demo__tab {
    padding: 0.55rem 0.6rem;
    font-size: 0.75rem;
  }

  .slots-demo__intro,
  .slots-demo__code {
    padding: 0.75rem;
  }
}
</style>
