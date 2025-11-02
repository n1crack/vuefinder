<script setup lang="ts">
import PDFIcon from '../icons/pdf_file.svg';
import TextIcon from '../icons/text_file.svg';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

defineProps<Props>();
</script>

<template>
  <vue-finder id="my_vuefinder4" :driver="driver" :config="config" :features="features">
    <template #icon="{ item }">
      <TextIcon v-if="item.extension === 'txt'" class="vuefinder__item-icon__file" />
      <PDFIcon v-else-if="item.extension === 'pdf'" class="vuefinder__item-icon__file" />
    </template>
  </vue-finder>
</template>
