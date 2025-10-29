<script setup lang="ts">
import { ref, inject, nextTick, watch, onUnmounted } from 'vue';
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';
import GearSVG from '../../assets/icons/gear.svg';

defineOptions({ name: 'SearchOptionsDropdown' });

interface Props {
  visible: boolean;
  disabled?: boolean;
  sizeFilter: 'all' | 'small' | 'medium' | 'large';
  selectedOption: string | null;
}
interface Emits {
  (e: 'update:visible', value: boolean): void;
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
// Floating UI cleanup functions
let cleanupDropdown: (() => void) | null = null;

const selectDropdownOption = (option: string) => {
  emit('update:selectedOption', option);
  
  // Handle the actual filter selection
  if (option.startsWith('size-')) {
    const filterValue = option.split('-')[1] as 'all' | 'small' | 'medium' | 'large';
    emit('update:sizeFilter', filterValue);
  }
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
  
  // Set initial styles to prevent flash
  Object.assign(dropdownContent.value.style, {
    position: 'fixed',
    zIndex: '10001',
    opacity: '0',
    transform: 'translateY(-8px)',
    transition: 'opacity 150ms ease-out, transform 150ms ease-out'
  });
  
  // Calculate position immediately
  try {
    const { x, y } = await computePosition(dropdownBtn.value, dropdownContent.value, {
      placement: 'bottom-start',
      strategy: 'fixed',
      middleware: [
        offset(8),
        flip({ padding: 16 }),
        shift({ padding: 16 })
      ]
    });
    
    // Set the correct position
    Object.assign(dropdownContent.value.style, {
      left: `${x}px`,
      top: `${y}px`
    });
    
    // Now make it visible with animation
    requestAnimationFrame(() => {
      if (dropdownContent.value) {
        Object.assign(dropdownContent.value.style, {
          opacity: '1',
          transform: 'translateY(0)'
        });
      }
    });
  } catch (error) {
    console.warn('Floating UI initial positioning error:', error);
    return;
  }
  
  // Setup auto-update for dynamic positioning
  try {
    cleanupDropdown = autoUpdate(dropdownBtn.value, dropdownContent.value, async () => {
      if (!dropdownBtn.value || !dropdownContent.value) return;
      
      try {
        const { x: newX, y: newY } = await computePosition(dropdownBtn.value, dropdownContent.value, {
          placement: 'bottom-start',
          strategy: 'fixed',
          middleware: [
            offset(8),
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
  
  const options = ['size-all', 'size-small', 'size-medium', 'size-large'];
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
    // Handle size filter selection
    if (props.selectedOption?.startsWith('size-')) {
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
      class="vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible"
      :data-theme="app.theme.current"
      @click.stop
      @keydown="handleDropdownKeydown"
      tabindex="-1"
    >
      <div class="vuefinder__search-modal__dropdown-content">
        <!-- Size Filter Section -->
        <div class="vuefinder__search-modal__dropdown-section">
          <div class="vuefinder__search-modal__dropdown-title">{{ t('File Size') }}</div>
          <div class="vuefinder__search-modal__dropdown-options">
            <div
              class="vuefinder__search-modal__dropdown-option"
              :class="{ 'vuefinder__search-modal__dropdown-option--selected': sizeFilter === 'all' }"
              @click.stop="selectDropdownOption('size-all')"
            >
              <span>{{ t('All Files') }}</span>
              <div class="vuefinder__search-modal__dropdown-option-check" v-if="sizeFilter === 'all'">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
            </div>
            
            <div 
              class="vuefinder__search-modal__dropdown-option" 
              :class="{ 'vuefinder__search-modal__dropdown-option--selected': sizeFilter === 'small' }"
              @click.stop="selectDropdownOption('size-small')"
            >
              <span>{{ t('Small (< 1MB)') }}</span>
              <div class="vuefinder__search-modal__dropdown-option-check" v-if="sizeFilter === 'small'">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
            </div>
            
            <div 
              class="vuefinder__search-modal__dropdown-option" 
              :class="{ 'vuefinder__search-modal__dropdown-option--selected': sizeFilter === 'medium' }"
              @click.stop="selectDropdownOption('size-medium')"
            >
              <span>{{ t('Medium (1-10MB)') }}</span>
              <div class="vuefinder__search-modal__dropdown-option-check" v-if="sizeFilter === 'medium'">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
            </div>
            
            <div 
              class="vuefinder__search-modal__dropdown-option" 
              :class="{ 'vuefinder__search-modal__dropdown-option--selected': sizeFilter === 'large' }"
              @click.stop="selectDropdownOption('size-large')"
            >
              <span>{{ t('Large (> 10MB)') }}</span>
              <div class="vuefinder__search-modal__dropdown-option-check" v-if="sizeFilter === 'large'">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
