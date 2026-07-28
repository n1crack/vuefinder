<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Driver } from '../../src/adapters';
import MenuBarCombinedBar from './MenuBarCombinedBar.vue';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

const props = defineProps<Props>();

type Mode = 'default' | 'start-end' | 'combined' | 'all-slots';

const mode = ref<Mode>('default');

const modes: Record<Mode, string> = {
  default: 'Default MenuBar (no slots used)',
  'start-end': 'Add buttons via "menubar-start" / "menubar-end"',
  combined: 'Replace layout via "menu-items" (reuses useMenuItems + useBreadcrumbActions)',
  'all-slots': 'Replace MenuBar, Toolbar AND Breadcrumb independently, each via its own slot',
};

// Independent visibility toggles - same idea as UIVisibilityExample, just
// extended with `showBreadcrumbBar`. Not tied to `mode`: e.g. uncheck
// Toolbar/Breadcrumb Bar in "combined" mode to see MenuBarCombinedBar cover
// the same actions, or uncheck them in "default" mode to see what's lost.
const showMenuBar = ref(true);
const showToolbar = ref(true);
const showBreadcrumbBar = ref(true);

const computedConfig = computed(() => ({
  ...props.config,
  showMenuBar: showMenuBar.value,
  showToolbar: showToolbar.value,
  showBreadcrumbBar: showBreadcrumbBar.value,
}));
</script>

<template>
  <div class="menubar-customization-example">
    <div class="menubar-customization-example__controls">
      <div class="menubar-customization-example__group">
        <label
          v-for="(label, key) in modes"
          :key="key"
          class="menubar-customization-example__option"
        >
          <input v-model="mode" type="radio" :value="key" name="menubar-mode" />
          {{ label }}
        </label>
      </div>

      <div class="menubar-customization-example__group">
        <label class="menubar-customization-example__option">
          <input v-model="showMenuBar" type="checkbox" />
          Show Menu Bar
        </label>
        <label class="menubar-customization-example__option">
          <input v-model="showToolbar" type="checkbox" />
          Show Toolbar
        </label>
        <label class="menubar-customization-example__option">
          <input v-model="showBreadcrumbBar" type="checkbox" />
          Show Breadcrumb Bar
        </label>
      </div>
    </div>

    <div class="menubar-customization-example__viewer">
      <!-- Mode 1: default rendering, no slots passed at all -->
      <vue-finder
        v-if="mode === 'default'"
        id="menubar_custom_default"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      />

      <!-- Mode 2: keep the default File/Edit/View/Go/Help menus, just add extra
           entries before/after them (e.g. a branding element or a shortcut button) -->
      <vue-finder
        v-else-if="mode === 'start-end'"
        id="menubar_custom_start_end"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      >
        <template #menubar-start>
          <div class="menubar-chip">🗂️ My App</div>
        </template>
        <template #menubar-end="{ menuItems }">
          <div class="menubar-chip">{{ menuItems.length }} menus</div>
        </template>
      </vue-finder>

      <!-- Mode 3: fully replace the menu layout. MenuBarCombinedBar calls
           useMenuItems()/useBreadcrumbActions() itself, so it isn't limited to
           what the slot passes in - it mixes in File/Edit/View actions (the
           same ones the default Toolbar exposes) plus Breadcrumb actions
           (refresh/go up/toggle tree/copy path) into one custom bar. Uncheck
           "Show Toolbar" and "Show Breadcrumb Bar" above to see this bar
           fully cover for both. -->
      <vue-finder
        v-else-if="mode === 'combined'"
        id="menubar_custom_combined"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      >
        <template #menu-items>
          <MenuBarCombinedBar />
        </template>
      </vue-finder>

      <!-- Mode 4: MenuBar, Toolbar and the Breadcrumb's action buttons are
           each replaced independently via their own slot (`menu-items`,
           `toolbar-items`, `breadcrumb-actions`) - three separate custom
           components, three separate slots, all still shown
           (showMenuBar/showToolbar/showBreadcrumbBar stay true; the slot
           content replaces what's *inside* each bar, it doesn't hide the
           bar itself). Note: `breadcrumb-actions` only covers the buttons
           shown before the path (tree-view toggle, go up, refresh) - the
           path container itself (overflow measurement, drag & drop, hidden-
           item dropdown, path-copy mode) is intentionally not slotted, since
           reimplementing it wouldn't make sense. -->
      <vue-finder
        v-else
        id="menubar_custom_all_slots"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      >
        <template #menu-items="{ menuItems }">
          <div class="all-slots-chip">Custom MenuBar ({{ menuItems.length }} menus)</div>
        </template>
        <template #toolbar-items>
          <div class="all-slots-chip">Custom Toolbar</div>
        </template>
        <template #breadcrumb-actions>
          <div class="all-slots-chip">Custom Breadcrumb Actions</div>
        </template>
      </vue-finder>
    </div>
  </div>
</template>

<style scoped>
.menubar-customization-example {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menubar-customization-example__controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.menubar-customization-example__group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.menubar-customization-example__option {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #374151;
  cursor: pointer;
}

.menubar-customization-example__viewer {
  flex: 1;
  min-height: 480px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.menubar-chip {
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
}

.all-slots-chip {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #4338ca;
  background: #eef2ff;
  border-bottom: 1px solid #e0e7ff;
}
</style>
