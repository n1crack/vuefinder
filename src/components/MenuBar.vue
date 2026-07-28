<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useMenuItems } from '../composables/useMenuItems';

const { menuItems } = useMenuItems();

// Menu state
const activeMenu = ref<string | null>(null);
const isMenuOpen = ref(false);

// Menu methods
const toggleMenu = (menuId?: string) => {
  if (activeMenu.value === menuId) {
    // Same menu clicked - close it
    closeMenu();
  } else {
    // Different menu clicked - open it
    activeMenu.value = menuId ?? null;
    isMenuOpen.value = true;
  }
};

const openMenu = (menuId?: string) => {
  if (isMenuOpen.value) {
    // Menu is open, switch to hovered menu
    activeMenu.value = menuId ?? null;
  }
};

const closeMenu = () => {
  activeMenu.value = null;
  isMenuOpen.value = false;
};

const handleMenuAction = (action?: () => void) => {
  // Close menu first
  closeMenu();
  // Then execute action
  action?.();
};

// Click outside to close menu
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.vuefinder__menubar')) {
    closeMenu();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="vuefinder__menubar" @click.stop>
    <div class="vuefinder__menubar__container">
      <!-- Extension point: prepend custom entries (e.g. extra menus, a search box) -->
      <slot name="menubar-start" :menu-items="menuItems" />

      <!--
        Extension point: replace the default File/Edit/View/Go/Help layout entirely.
        Receives the same `menuItems` (and `handleMenuAction`) that power the default
        rendering below, so a custom layout can filter/reorder them or mix in actions
        from elsewhere (e.g. `useBreadcrumbActions`) while keeping all modal actions intact.
      -->
      <slot name="menu-items" :menu-items="menuItems" :handle-menu-action="handleMenuAction">
        <div
          v-for="menu in menuItems"
          :key="menu.id"
          class="vuefinder__menubar__item"
          :class="{ 'vuefinder__menubar__item--active': activeMenu === menu.id }"
          @click="toggleMenu(menu.id)"
          @mouseenter="openMenu(menu.id)"
        >
          <span class="vuefinder__menubar__label">{{ menu.label }}</span>

          <!-- Dropdown menu -->
          <div
            v-if="activeMenu === menu.id"
            class="vuefinder__menubar__dropdown"
            @mouseenter="openMenu(menu.id)"
          >
            <div
              v-for="item in menu.items"
              :key="item.id || item.type"
              class="vuefinder__menubar__dropdown__item"
              :class="{
                'vuefinder__menubar__dropdown__item--separator': item.type === 'separator',
                'vuefinder__menubar__dropdown__item--disabled': item.enabled && !item.enabled(),
                'vuefinder__menubar__dropdown__item--checked': item.checked && item.checked(),
                'vuefinder__menubar__dropdown__item--hidden': item.hidden && item.hidden(),
                'vuefinder__menubar__dropdown__item--has-children': item.items?.length,
              }"
              @click.stop="
                item.type !== 'separator' &&
                !item.items?.length &&
                (!item.enabled || item.enabled())
                  ? handleMenuAction(item.action)
                  : null
              "
            >
              <span v-if="item.type !== 'separator'" class="vuefinder__menubar__dropdown__label">
                {{ item.label }}
              </span>
              <span
                v-if="item.checked && item.checked()"
                class="vuefinder__menubar__dropdown__checkmark"
              >
                ✓
              </span>
              <svg
                v-if="item.items?.length"
                class="vuefinder__menubar__dropdown__chevron"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6 4l4 4-4 4z" />
              </svg>
              <div v-if="item.items?.length" class="vuefinder__menubar__dropdown__submenu">
                <div
                  v-for="child in item.items"
                  :key="child.id"
                  class="vuefinder__menubar__dropdown__item"
                  :class="{
                    'vuefinder__menubar__dropdown__item--disabled':
                      child.enabled && !child.enabled(),
                  }"
                  @click.stop="
                    !child.enabled || child.enabled() ? handleMenuAction(child.action) : null
                  "
                >
                  <span class="vuefinder__menubar__dropdown__label">{{ child.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slot>

      <!-- Extension point: append custom entries after the default menus -->
      <slot name="menubar-end" :menu-items="menuItems" />
    </div>
  </div>
</template>
