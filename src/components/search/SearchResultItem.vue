<script setup lang="ts">
import { ref, inject, nextTick, watch, onUnmounted } from 'vue';
import { useApp } from '../../composables/useApp';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { shortenPath } from '../../utils/path.ts';
import { copyPath } from '../../utils/clipboard.ts';
import { format } from '../../utils/filesize.ts';
import FileSVG from '../../assets/icons/file.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import DotsSVG from '../../assets/icons/dots.svg';
import type { DirEntry } from '../../types.ts';

defineOptions({ name: 'SearchResultItem' });

interface Props {
  item: DirEntry;
  index: number;
  selectedIndex: number;
  expandedPaths: Set<string>;
  activeDropdown: string | null;
  selectedItemDropdownOption: string | null;
}

interface Emits {
  (e: 'select', index: number): void;
  (e: 'selectWithDropdown', index: number): void;
  (e: 'togglePathExpansion', path: string): void;
  (e: 'toggleItemDropdown', path: string, event: MouseEvent): void;
  (e: 'update:selectedItemDropdownOption', value: string | null): void;
  (e: 'copyPath', item: DirEntry): void;
  (e: 'openContainingFolder', item: DirEntry): void;
  (e: 'preview', item: DirEntry): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const app = useApp();
const { t } = app.i18n;

// Store button element reference for positioning
const buttonElementRef = ref<HTMLElement | null>(null);

// Floating UI cleanup functions
let cleanupDropdown: (() => void) | null = null;

// Watch for activeDropdown changes to position the dropdown
watch(
  () => props.activeDropdown,
  (newActiveDropdown) => {
    // Clean up previous dropdown if it exists
    if (cleanupDropdown) {
      cleanupDropdown();
      cleanupDropdown = null;
    }

    if (newActiveDropdown === props.item.path && buttonElementRef.value) {
      nextTick(() => {
        setupItemDropdownPositioning(props.item.path, buttonElementRef.value!);
      });
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  if (cleanupDropdown) {
    cleanupDropdown();
    cleanupDropdown = null;
  }
});

// Utility functions
const isPathExpanded = (path: string): boolean => {
  return props.expandedPaths.has(path);
};

const formatFileSize = (item: DirEntry): string => {
  if (item.type === 'dir') return '';
  if (!item.file_size) return '';
  return format(item.file_size);
};

const toggleItemDropdown = (itemPath: string, event: MouseEvent) => {
  event.stopPropagation();
  emit('toggleItemDropdown', itemPath, event);
};

const setupItemDropdownPositioning = async (itemPath: string, buttonElement: HTMLElement) => {
  const itemDropdownElement = document.querySelector(
    `[data-item-dropdown="${itemPath}"]`
  ) as HTMLElement;

  if (!itemDropdownElement || !buttonElement) return;

  // Wait for DOM to be ready
  await nextTick();

  // Double-check elements still exist after nextTick
  if (!itemDropdownElement || !buttonElement) return;

  // Set initial styles to prevent flash
  Object.assign(itemDropdownElement.style, {
    position: 'fixed',
    zIndex: '10001',
    opacity: '0',
    transform: 'translateY(-8px)',
    transition: 'opacity 150ms ease-out, transform 150ms ease-out',
  });

  // Calculate position immediately
  try {
    const { x, y } = await computePosition(buttonElement, itemDropdownElement, {
      placement: 'left-start',
      strategy: 'fixed',
      middleware: [offset(8), flip({ padding: 16 }), shift({ padding: 16 })],
    });

    // Set the correct position
    Object.assign(itemDropdownElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // Now make it visible with animation
    requestAnimationFrame(() => {
      if (itemDropdownElement) {
        Object.assign(itemDropdownElement.style, {
          opacity: '1',
          transform: 'translateY(0)',
        });
      }
    });
  } catch (error) {
    console.warn('Floating UI initial positioning error:', error);
    return;
  }

  // Setup auto-update for dynamic positioning
  try {
    cleanupDropdown = autoUpdate(buttonElement, itemDropdownElement, async () => {
      if (!buttonElement || !itemDropdownElement) return;

      try {
        const { x: newX, y: newY } = await computePosition(buttonElement, itemDropdownElement, {
          placement: 'left-start',
          strategy: 'fixed',
          middleware: [offset(8), flip({ padding: 16 }), shift({ padding: 16 })],
        });

        Object.assign(itemDropdownElement.style, {
          left: `${newX}px`,
          top: `${newY}px`,
        });
      } catch (error) {
        console.warn('Floating UI positioning error:', error);
      }
    });
  } catch (error) {
    console.warn('Floating UI autoUpdate setup error:', error);
    cleanupDropdown = null;
  }
};

const selectItemDropdownOption = (option: string) => {
  emit('update:selectedItemDropdownOption', option);
};

const copyItemPath = async (item: DirEntry) => {
  await copyPath(item.path);
  emit('copyPath', item);
};

const openContainingFolder = (item: DirEntry) => {
  emit('openContainingFolder', item);
};

const previewItem = (item: DirEntry) => {
  emit('preview', item);
};

// Enhanced keyboard navigation for item dropdowns
const handleDropdownKeydown = (e: KeyboardEvent) => {
  if (!props.activeDropdown) return;

  const options = ['copy-path', 'open-folder', 'preview'];
  const currentSelection = props.selectedItemDropdownOption;

  const currentIndex = options.findIndex((opt) => currentSelection?.includes(opt));

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % options.length;
    emit(
      'update:selectedItemDropdownOption',
      `${options[nextIndex] || ''}-${props.activeDropdown}`
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    emit(
      'update:selectedItemDropdownOption',
      `${options[prevIndex] || ''}-${props.activeDropdown}`
    );
  } else if (e.key === 'Enter') {
    e.preventDefault();
    // Handle item dropdown option selection
    if (currentSelection) {
      if (currentSelection.includes('copy-path')) {
        copyItemPath(props.item);
      } else if (currentSelection.includes('open-folder')) {
        openContainingFolder(props.item);
      } else if (currentSelection.includes('preview')) {
        previewItem(props.item);
      }
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    emit('update:selectedItemDropdownOption', null);
  }
};
</script>

<template>
  <div
    class="vuefinder__search-modal__result-item"
    :class="{ 'vuefinder__search-modal__result-item--selected': index === selectedIndex }"
    :title="item.basename"
    @click="emit('select', index)"
  >
    <div class="vuefinder__search-modal__result-icon">
      <FolderSVG v-if="item.type === 'dir'" />
      <FileSVG v-else />
    </div>
    <div class="vuefinder__search-modal__result-content">
      <div class="vuefinder__search-modal__result-name">
        {{ item.basename }}
        <span v-if="formatFileSize(item)" class="vuefinder__search-modal__result-size">
          {{ formatFileSize(item) }}
        </span>
      </div>
      <div
        class="vuefinder__search-modal__result-path"
        :title="item.path"
        @click.stop="
          emit('select', index);
          emit('togglePathExpansion', item.path);
        "
      >
        {{ isPathExpanded(item.path) ? item.path : shortenPath(item.path) }}
      </div>
    </div>
    <button
      ref="buttonElementRef"
      class="vuefinder__search-modal__result-actions"
      :title="t('More actions')"
      @click="
        emit('selectWithDropdown', index);
        toggleItemDropdown(item.path, $event);
      "
    >
      <DotsSVG class="vuefinder__search-modal__result-actions-icon" />
    </button>

    <!-- Item Dropdown Menu -->
    <Teleport to="body">
      <div
        v-if="activeDropdown === item.path"
        :data-item-dropdown="item.path"
        class="vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible"
        :data-theme="app.theme.current"
        tabindex="-1"
        @click.stop
        @keydown="handleDropdownKeydown"
      >
        <div class="vuefinder__search-modal__item-dropdown-content">
          <div
            class="vuefinder__search-modal__item-dropdown-option"
            :class="{
              'vuefinder__search-modal__item-dropdown-option--selected':
                selectedItemDropdownOption === `copy-path-${item.path}`,
            }"
            @click="
              selectItemDropdownOption(`copy-path-${item.path}`);
              copyItemPath(item);
            "
            @focus="selectItemDropdownOption(`copy-path-${item.path}`)"
          >
            <svg
              class="vuefinder__search-modal__item-dropdown-icon"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"
              />
              <path
                d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"
              />
            </svg>
            <span>{{ t('Copy Path') }}</span>
          </div>
          <div
            class="vuefinder__search-modal__item-dropdown-option"
            :class="{
              'vuefinder__search-modal__item-dropdown-option--selected':
                selectedItemDropdownOption === `open-folder-${item.path}`,
            }"
            @click="
              selectItemDropdownOption(`open-folder-${item.path}`);
              openContainingFolder(item);
            "
            @focus="selectItemDropdownOption(`open-folder-${item.path}`)"
          >
            <FolderSVG class="vuefinder__search-modal__item-dropdown-icon" />
            <span>{{ t('Open Containing Folder') }}</span>
          </div>
          <div
            class="vuefinder__search-modal__item-dropdown-option"
            :class="{
              'vuefinder__search-modal__item-dropdown-option--selected':
                selectedItemDropdownOption === `preview-${item.path}`,
            }"
            @click="
              selectItemDropdownOption(`preview-${item.path}`);
              previewItem(item);
            "
            @focus="selectItemDropdownOption(`preview-${item.path}`)"
          >
            <FileSVG class="vuefinder__search-modal__item-dropdown-icon" />
            <span>{{ t('Preview') }}</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
