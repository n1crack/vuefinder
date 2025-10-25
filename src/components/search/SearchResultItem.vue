<script setup lang="ts">
import { ref, inject, nextTick, watch } from 'vue';
import { getCurrentTheme } from '../../utils/theme.ts';
import FileSVG from '../../assets/icons/file.svg';
import FolderSVG from '../../assets/icons/folder.svg';
import DotsSVG from '../../assets/icons/dots.svg';
import ModalPreview from '../modals/ModalPreview.vue';
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
  (e: 'togglePathExpansion', path: string): void;
  (e: 'toggleItemDropdown', path: string, event: MouseEvent): void;
  (e: 'update:selectedItemDropdownOption', value: string | null): void;
  (e: 'copyPath', item: DirEntry): void;
  (e: 'openContainingFolder', item: DirEntry): void;
  (e: 'preview', item: DirEntry): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const app = inject('ServiceContainer');
const { t } = app.i18n;

// Get current theme for teleported dropdowns
const currentTheme = getCurrentTheme();

// Store button element reference for positioning
const buttonElementRef = ref<HTMLElement | null>(null);

// Watch for activeDropdown changes to position the dropdown
watch(() => props.activeDropdown, (newActiveDropdown) => {
  if (newActiveDropdown === props.item.path && buttonElementRef.value) {
    nextTick(() => {
      setupItemDropdownPositioning(props.item.path, buttonElementRef.value!);
    });
  }
});

// Utility functions
const shortenPath = (path: string, max: number = 40): string => {
  const match = path.match(/^([^:]+:\/\/)(.*)$/);
  if (!match) return path;

  const prefix = match[1];
  const rest = match[2] ?? "";
  const parts = rest.split("/").filter(Boolean); // remove empty segments
  const filename = parts.pop();
  if (!filename) return prefix + rest;

  let short = `${prefix}${parts.join("/")}${parts.length ? "/" : ""}${filename}`;
  if (short.length <= max) return short;

  // Safely split filename and extension
  const split = filename.split(/\.(?=[^\.]+$)/);
  const name = split[0] ?? "";
  const ext = split[1] ?? "";

  const shortName =
    name.length > 10 ? `${name.slice(0, 6)}...${name.slice(-5)}` : name;

  const shortFilename = ext ? `${shortName}.${ext}` : shortName;

  short = `${prefix}${parts.join("/")}${parts.length ? "/" : ""}${shortFilename}`;

  // Collapse folders if still too long
  if (short.length > max) {
    short = `${prefix}.../${shortFilename}`;
  }

  return short;
};

const isPathExpanded = (path: string): boolean => {
  return props.expandedPaths.has(path);
};

const toggleItemDropdown = (itemPath: string, event: MouseEvent) => {
  event.stopPropagation();
  emit('toggleItemDropdown', itemPath, event);
};

const setupItemDropdownPositioning = (itemPath: string, buttonElement: HTMLElement) => {
  // Use nextTick instead of setTimeout for more immediate positioning
  nextTick(() => {
    const itemDropdownElement = document.querySelector(`[data-item-dropdown="${itemPath}"]`) as HTMLElement;
    
    if (!itemDropdownElement) return;
    
    const rect = buttonElement.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const dropdownWidth = isMobile ? 160 : 180; // Responsive width
    
    let leftPosition: string;
    
    if (isMobile) {
      const leftPos = rect.left - dropdownWidth - 4;
      leftPosition = `${Math.max(8, leftPos)}px`;
    } else {
      leftPosition = `${rect.right + 4}px`;
    }
    
    Object.assign(itemDropdownElement.style, {
      position: 'fixed',
      left: leftPosition,
      top: `${rect.top - 4}px`,
      zIndex: '10001'
    });
  });
};

const selectItemDropdownOption = (option: string) => {
  emit('update:selectedItemDropdownOption', option);
};

const copyItemPath = async (item: DirEntry) => {
  try {
    await navigator.clipboard.writeText(item.path);
  } catch (error) {
    console.error('Failed to copy path:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = item.path;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
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
  
  const currentIndex = options.findIndex(opt => 
    currentSelection?.includes(opt)
  );
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % options.length;
    emit('update:selectedItemDropdownOption', `${options[nextIndex] || ''}-${props.activeDropdown}`);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    emit('update:selectedItemDropdownOption', `${options[prevIndex] || ''}-${props.activeDropdown}`);
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
      </div>
      <div 
        class="vuefinder__search-modal__result-path"
        @click.stop="emit('select', index); emit('togglePathExpansion', item.path)"
        :title="item.path"
      >
        {{ isPathExpanded(item.path) ? item.path : shortenPath(item.path) }}
      </div>
    </div>
    <button
      ref="buttonElementRef"
      class="vuefinder__search-modal__result-actions"
      @click="emit('select', index); toggleItemDropdown(item.path, $event)"
      :title="t('More actions')"
    >
      <DotsSVG class="vuefinder__search-modal__result-actions-icon" />
    </button>
    
    <!-- Item Dropdown Menu -->
    <Teleport to="body">
      <div 
        v-if="activeDropdown === item.path"
        :data-item-dropdown="item.path"
        class="vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible"
        :data-theme="currentTheme"
        @click.stop
        @keydown="handleDropdownKeydown"
        tabindex="-1"
      >
      <div class="vuefinder__search-modal__item-dropdown-content">
        <div 
          class="vuefinder__search-modal__item-dropdown-option"
          :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `copy-path-${item.path}` }"
          @click="selectItemDropdownOption(`copy-path-${item.path}`); copyItemPath(item)"
          @focus="selectItemDropdownOption(`copy-path-${item.path}`)"
        >
          <svg class="vuefinder__search-modal__item-dropdown-icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
            <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
          </svg>
          <span>{{ t('Copy Path') }}</span>
        </div>
        <div 
          class="vuefinder__search-modal__item-dropdown-option"
          :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `open-folder-${item.path}` }"
          @click="selectItemDropdownOption(`open-folder-${item.path}`); openContainingFolder(item)"
          @focus="selectItemDropdownOption(`open-folder-${item.path}`)"
        >
          <FolderSVG class="vuefinder__search-modal__item-dropdown-icon" />
          <span>{{ t('Open Containing Folder') }}</span>
        </div>
        <div 
          class="vuefinder__search-modal__item-dropdown-option"
          :class="{ 'vuefinder__search-modal__item-dropdown-option--selected': selectedItemDropdownOption === `preview-${item.path}` }"
          @click="selectItemDropdownOption(`preview-${item.path}`); previewItem(item)"
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
