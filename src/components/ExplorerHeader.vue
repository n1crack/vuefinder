<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import type { StoreValue } from 'nanostores';
import type { SortState } from '../stores/files';
import SortIcon from './SortIcon.vue';
import { useApp } from '../composables/useApp';

const app = useApp();
const fs = app.fs;
const { t } = app.i18n;
const fsSortState: StoreValue<SortState> = useStore(fs.sort);

// null = default Name / Size / Date layout
const listColumns = computed(() => app.listColumns);
</script>

<template>
  <div
    class="vuefinder__explorer__header"
    :class="{ 'vuefinder__explorer__header--custom': listColumns }"
    :style="listColumns ? { gridTemplateColumns: listColumns.gridTemplate } : undefined"
  >
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
    <template v-if="listColumns">
      <div
        v-for="column in listColumns.columns"
        :key="column.key"
        class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--custom"
        :class="[
          `vuefinder__explorer__cell--${column.align}`,
          column.sortKey ? 'vf-sort-button' : 'vuefinder__explorer__sort-button--static',
        ]"
        :data-column="column.key"
        @click="column.sortKey && fs.toggleSort(column.sortKey)"
      >
        {{ t(column.label) }}
        <SortIcon
          v-if="column.sortKey"
          v-show="fsSortState.active && fsSortState.column === column.sortKey"
          :direction="fsSortState.order"
        />
      </div>
    </template>
    <template v-else>
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
    </template>
  </div>
</template>
