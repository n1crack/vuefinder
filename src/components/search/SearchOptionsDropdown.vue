<script setup lang="ts">
import { ref, inject, nextTick, watch, onUnmounted } from 'vue';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import { getCurrentTheme } from '../../utils/theme.ts';
import GearSVG from '../../assets/icons/gear.svg';

defineOptions({ name: 'SearchOptionsDropdown' });

interface Props {
  visible: boolean;
  disabled?: boolean;
  typeFilter: 'all' | 'files' | 'folders';
  sizeFilter: 'all' | 'small' | 'medium' | 'large';
  selectedOption: string | null;
}

interface Emits {
  (e: 'update:visible', value: boolean): void;
  (e: 'update:typeFilter', value: 'all' | 'files' | 'folders'): void;
  (e: 'update:sizeFilter', value: 'all' | 'small' | 'medium' | 'large'): void;
  (e: 'update:selectedOption', value: string | null): void;
  (e: 'keydown', event: KeyboardEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const emit = defineEmits<Emits>();

const app = inject('ServiceContainer');
const { t } = app.i18n;

const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdownContent = ref<HTMLElement | null>(null);

// Get current theme for teleported dropdowns
const currentTheme = getCurrentTheme();

// Floating UI cleanup functions
let cleanupDropdown: (() => void) | null = null;

const selectDropdownOption = (option: string) => {
  emit('update:selectedOption', option);
};

const toggleDropdown = async () => {
  if (props.disabled) {
    return;
  }
  
  if (!props.visible) {
    // Opening dropdown
    emit('update:visible', true);
    await nextTick();
    await setupDropdownPositioning();
  } else {
    // Closing dropdown
    emit('update:visible', false);
    // Cleanup Floating UI when closing
    if (cleanupDropdown) {
      cleanupDropdown();
      cleanupDropdown = null;
    }
  }
};

// Floating UI positioning functions
const setupDropdownPositioning = async () => {
  if (!dropdownBtn.value || !dropdownContent.value) return;
  
  // Wait for DOM to be ready
  await nextTick();
  
  // Double-check elements still exist after nextTick
  if (!dropdownBtn.value || !dropdownContent.value) return;
  
  // Calculate initial position immediately
  try {
    const { x, y } = await computePosition(dropdownBtn.value, dropdownContent.value, {
      placement: 'bottom-end',
      middleware: [
        offset(12),
        flip({ padding: 16 }),
        shift({ padding: 16 })
      ]
    });
    
    // Set initial position before dropdown becomes visible
    Object.assign(dropdownContent.value.style, {
      left: `${x}px`,
      top: `${y}px`,
      position: 'fixed',
      zIndex: '10001'
    });
  } catch (error) {
    console.warn('Floating UI initial positioning error:', error);
    return;
  }
  
  // Then setup auto-update for dynamic positioning
  try {
    cleanupDropdown = autoUpdate(dropdownBtn.value, dropdownContent.value, async () => {
      // Safety check inside the update function
      if (!dropdownBtn.value || !dropdownContent.value) return;
      
      try {
        const { x: newX, y: newY } = await computePosition(dropdownBtn.value, dropdownContent.value, {
          placement: 'bottom-end',
          middleware: [
            offset(12),
            flip({ padding: 16 }),
            shift({ padding: 16 })
          ]
        });
        
        Object.assign(dropdownContent.value.style, {
          left: `${newX}px`,
          top: `${newY}px`
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

const handleDropdownKeydown = (e: KeyboardEvent) => {
  if (!props.visible) return;
  
  const options = ['type-all', 'type-files', 'type-folders', 'size-all', 'size-small', 'size-medium', 'size-large'];
  const currentIndex = options.findIndex(opt => opt === props.selectedOption);
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % options.length;
    emit('update:selectedOption', options[nextIndex] || null);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    emit('update:selectedOption', options[prevIndex] || null);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    // Handle main dropdown option selection
    if (props.selectedOption?.startsWith('type-')) {
      emit('update:typeFilter', props.selectedOption.split('-')[1] as 'all' | 'files' | 'folders');
    } else if (props.selectedOption?.startsWith('size-')) {
      emit('update:sizeFilter', props.selectedOption.split('-')[1] as 'all' | 'small' | 'medium' | 'large');
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    emit('update:visible', false);
    // Cleanup Floating UI when closing
    if (cleanupDropdown) {
      cleanupDropdown();
      cleanupDropdown = null;
    }
  }
};

// Cleanup on unmount
const cleanup = () => {
  if (cleanupDropdown) {
    cleanupDropdown();
    cleanupDropdown = null;
  }
};

// Watch for visible prop changes to handle cleanup
watch(() => props.visible, (newVisible) => {
  if (!newVisible && cleanupDropdown) {
    cleanupDropdown();
    cleanupDropdown = null;
  }
});

onUnmounted(() => {
  cleanup();
});

defineExpose({
  cleanup
});
</script>

<template>
  <button 
    ref="dropdownBtn"
    @click.stop="toggleDropdown"
    class="vuefinder__search-modal__dropdown-btn"
    :class="{ 'vuefinder__search-modal__dropdown-btn--active': visible }"
    :disabled="disabled"
    :title="t('Search Options')"
  >
    <GearSVG class="vuefinder__search-modal__dropdown-icon" />
  </button>
  
  <!-- Dropdown Menu -->
  <Teleport to="body">
    <div 
      v-if="visible" 
      ref="dropdownContent"
      class="vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible" 
      :data-theme="currentTheme"
      @click.stop
      @keydown="handleDropdownKeydown"
      tabindex="-1"
    >
    <div class="vuefinder__search-modal__dropdown-content">
      <!-- Type Filter -->
      <div class="vuefinder__search-modal__dropdown-section">
        <div class="vuefinder__search-modal__dropdown-title">{{ t('Type') }}</div>
        <div class="vuefinder__search-modal__dropdown-options">
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'type-all' }"
            @click.stop="selectDropdownOption('type-all')"
          >
            <input 
              :checked="typeFilter === 'all'"
              type="radio" 
              value="all" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('All') }}</span>
          </label>
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'type-files' }"
            @click.stop="selectDropdownOption('type-files')"
          >
            <input 
              :checked="typeFilter === 'files'"
              type="radio" 
              value="files" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('Files') }}</span>
          </label>
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'type-folders' }"
            @click.stop="selectDropdownOption('type-folders')"
          >
            <input 
              :checked="typeFilter === 'folders'"
              type="radio" 
              value="folders" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('Folders') }}</span>
          </label>
        </div>
      </div>

      <!-- Size Filter -->
      <div class="vuefinder__search-modal__dropdown-section">
        <div class="vuefinder__search-modal__dropdown-title">{{ t('Size') }}</div>
        <div class="vuefinder__search-modal__dropdown-options">
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'size-all' }"
            @click.stop="selectDropdownOption('size-all')"
          >
            <input 
              :checked="sizeFilter === 'all'"
              type="radio" 
              value="all" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('All') }}</span>
          </label>
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'size-small' }"
            @click.stop="selectDropdownOption('size-small')"
          >
            <input 
              :checked="sizeFilter === 'small'"
              type="radio" 
              value="small" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('Small') }}</span>
          </label>
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'size-medium' }"
            @click.stop="selectDropdownOption('size-medium')"
          >
            <input 
              :checked="sizeFilter === 'medium'"
              type="radio" 
              value="medium" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('Medium') }}</span>
          </label>
          <label 
            class="vuefinder__search-modal__dropdown-option" 
            :class="{ 'vuefinder__search-modal__dropdown-option--selected': selectedOption === 'size-large' }"
            @click.stop="selectDropdownOption('size-large')"
          >
            <input 
              :checked="sizeFilter === 'large'"
              type="radio" 
              value="large" 
              class="vuefinder__search-modal__radio"
              @click.stop
            />
            <span>{{ t('Large') }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>
