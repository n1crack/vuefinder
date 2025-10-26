<script setup lang="ts">
import PDFIcon from '../icons/pdf_file.svg'
import TextIcon from '../icons/text_file.svg'

interface Props {
  request: Record<string, unknown>;
  config: Record<string, unknown>;
  features: unknown;
  theme: string;
}

defineProps<Props>();
</script>

<template>
  <vue-finder
    id='my_vuefinder4'
    :request="request"
    :config="config"
    :features="features"
    :theme="theme"
  >
    <template #icon="{ item }">
      <TextIcon class="vuefinder__item-icon__file" v-if="item.extension === 'txt'" />
      <PDFIcon class="vuefinder__item-icon__file" v-else-if="item.extension === 'pdf'" />
    </template>
  </vue-finder>
</template>

