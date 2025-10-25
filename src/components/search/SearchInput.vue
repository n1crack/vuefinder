<script setup lang="ts">
import { ref, inject } from 'vue';
import SearchSVG from '../../assets/icons/search.svg';
import LoadingSVG from '../../assets/icons/loading.svg';
import GearSVG from '../../assets/icons/gear.svg';

defineOptions({ name: 'SearchInput' });

interface Props {
  modelValue: string;
  isSearching: boolean;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'keydown', event: KeyboardEvent): void;
  (e: 'dropdown-click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const emit = defineEmits<Emits>();

const app = inject('ServiceContainer');
const { t } = app.i18n;

const searchInput = ref<HTMLInputElement | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

const handleDropdownClick = (event: MouseEvent) => {
  emit('dropdown-click', event);
};

defineExpose({
  focus: () => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  }
});
</script>

<template>
  <div class="vuefinder__search-modal__search-input">
    <SearchSVG class="vuefinder__search-modal__search-icon" />
    <input
      ref="searchInput"
      :value="modelValue"
      type="text"
      :placeholder="t('Search files and folders...')"
      :disabled="disabled"
      class="vuefinder__search-modal__input"
      @keydown="handleKeydown"
      @keyup.stop
      @input="handleInput"
    />
    <div v-if="isSearching" class="vuefinder__search-modal__loading">
      <LoadingSVG class="vuefinder__search-modal__loading-icon" />
    </div>
    <!-- Mobile dropdown button inside search input -->
    <button 
      @click.stop="handleDropdownClick"
      class="vuefinder__search-modal__dropdown-btn-mobile"
      :disabled="disabled"
      :title="t('Search Options')"
    >
      <GearSVG class="vuefinder__search-modal__dropdown-icon" />
    </button>
  </div>
</template>
