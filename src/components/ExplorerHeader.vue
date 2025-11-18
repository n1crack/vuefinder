<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { SortState } from '../stores/files';
import SortIcon from './SortIcon.vue';
import { useApp } from '../composables/useApp';

const app = useApp();
const fs = app.fs;
const { t } = app.i18n;
const fsSortState: StoreValue<SortState> = useStore(fs.sort);
</script>

<template>
  <div class="vuefinder__explorer__header">
    <div
      class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
      @click="fs.toggleSort('basename')"
    >
      {{ t('Name') }}
      <SortIcon
        v-show="fsSortState.active && fsSortState.column === 'basename'"
        :direction="fsSortState.order"
      />
    </div>
    <div
      class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
      @click="fs.toggleSort('file_size')"
    >
      {{ t('Size') }}
      <SortIcon
        v-show="fsSortState.active && fsSortState.column === 'file_size'"
        :direction="fsSortState.order"
      />
    </div>
    <div
      class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
      @click="fs.toggleSort('last_modified')"
    >
      {{ t('Date') }}
      <SortIcon
        v-show="fsSortState.active && fsSortState.column === 'last_modified'"
        :direction="fsSortState.order"
      />
    </div>
  </div>
</template>
